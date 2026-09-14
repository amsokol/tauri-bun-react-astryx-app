# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
While the major version is 0, compatible additions bump the patch; breaking
API or on-disk format changes bump the minor.

## [Unreleased]

## [0.1.1] - 2026-09-14

### Added

- Astryx CLI and `AGENTS.md` so agents can look up components, templates, and theme docs.
- Astryx 0.6.1 (core, Neutral theme, StyleX) on the welcome screen.
- Official Astryx mark on the home screen, linking to the design system docs.

### Changed

- markdownlint ignores generated `AGENTS.md`.
- Windows light/dark mode and accent color drive the Astryx `Theme` provider.

### Fixed

- Close caption glyph stays white on the red hover background.

## [0.1.0] - 2026-09-14

### Added

- WinUI-style custom title bar with Windows 11 caption buttons.
- The UI follows Windows light/dark theme and accent color while the app is running.
- Windows 11 Snap Layouts on the custom maximize button.
- The window restores its last position and size, and stays on a visible display if a monitor was unplugged.
- mimalloc as the Rust global allocator, with C `malloc` override on Unix/macOS.
- Biome for frontend linting and formatting, with React recommended rules.
- Clippy and rustfmt for the Tauri Rust crate, pinned via `rust-toolchain.toml`.
- markdownlint-cli2 for Markdown and Cursor rule files.
- Cursor rule that requires changelog, lint, build, and test checks before a commit.
- Cursor rule that defines publishing a release as changelog, commit, tag, and GitHub release.
- Cursor rule that forbids installing software on the host machine.
- Cursor rule that requires a 2-day quarantine before adopting external dependency versions.

### Changed

- Dependencies in `package.json` and `Cargo.toml` are listed in alphabetical order.

[unreleased]: https://github.com/amsokol/tauri-bun-react-astryx-app/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/amsokol/tauri-bun-react-astryx-app/releases/tag/v0.1.1
[0.1.0]: https://github.com/amsokol/tauri-bun-react-astryx-app/releases/tag/v0.1.0
