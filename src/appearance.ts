import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

export type SystemAppearance = {
  accent: string;
  dark: boolean;
};

function isTauriRuntime() {
  return "__TAURI_INTERNALS__" in globalThis;
}

function applyDocumentTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

async function syncWindowTheme(isDark: boolean) {
  if (!isTauriRuntime()) {
    return;
  }
  await getCurrentWindow().setTheme(isDark ? "dark" : "light");
}

function applyAppearance(appearance: SystemAppearance) {
  applyDocumentTheme(appearance.dark);
  void syncWindowTheme(appearance.dark);
}

export function getPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export async function initAppearance() {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  applyDocumentTheme(media.matches);

  if (!isTauriRuntime()) {
    media.addEventListener("change", (event) => {
      applyDocumentTheme(event.matches);
    });
    return;
  }

  try {
    applyAppearance(await invoke<SystemAppearance>("system_appearance"));
    await listen<SystemAppearance>("system-appearance-changed", (event) => {
      applyAppearance(event.payload);
    });
  } catch {
    applyDocumentTheme(media.matches);
    await syncWindowTheme(media.matches);
  }
}

export function useSystemAppearance(): SystemAppearance {
  const [appearance, setAppearance] = useState<SystemAppearance>(() => ({
    accent: "",
    dark: getPrefersDark(),
  }));

  useEffect(() => {
    if (!isTauriRuntime()) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (event: MediaQueryListEvent) => {
        setAppearance((current) => ({ ...current, dark: event.matches }));
      };
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    let unlisten: (() => void) | undefined;
    let disposed = false;

    void (async () => {
      try {
        const next = await invoke<SystemAppearance>("system_appearance");
        if (!disposed) {
          setAppearance(next);
        }
        unlisten = await listen<SystemAppearance>(
          "system-appearance-changed",
          (event) => {
            setAppearance(event.payload);
          },
        );
      } catch {
        if (!disposed) {
          setAppearance({
            accent: "",
            dark: getPrefersDark(),
          });
        }
      }
    })();

    return () => {
      disposed = true;
      unlisten?.();
    };
  }, []);

  return appearance;
}

export async function revealWindow() {
  if (!isTauriRuntime()) {
    return;
  }
  const current = getCurrentWindow();
  await current.show();
  await current.setFocus();
}
