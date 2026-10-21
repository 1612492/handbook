# Proposal

## Why

The app already defines dark-mode tokens and ships `next-themes`, but no theme provider or toggle is wired, so dark mode never activates. Navigation is also desktop-oriented: the topic sidebar stacks above content on phones and code blocks clip instead of scrolling. This change makes the visualizers usable across themes and screen sizes.

## What Changes

- Wire `next-themes` `ThemeProvider` into the root document with system-aware default and no-flash handling.
- Add a theme toggle (Light / Dark / System) in the app shell.
- Make `CodeView` theme-aware: dual Shiki themes, dark container styling, and horizontal scrolling.
- Fix dark-mode gaps in shared components (slider thumb, stage color treatments).
- Make topic navigation responsive: keep the sidebar on desktop, expose it through a mobile drawer with a toggle.
- Add mobile viewport coverage and smoke tests for theme toggling and mobile navigation.

## Capabilities

### New Capabilities

- `theme-switching`: User-selectable light/dark/system theme with persistence and no flash of unstyled content.
- `responsive-layout`: Responsive app shell and topic navigation that remains usable on small screens, including a mobile drawer and scrollable code blocks.

### Modified Capabilities

<!-- None: existing topic-catalog requirements are unchanged. -->

## Impact

- Affected code: `src/routes/__root.tsx`, `src/components/visualizer/TopicsShell.tsx`, `src/components/visualizer/step-visualizer/CodeView.tsx`, `src/components/ui/slider.tsx`, visualizer stages, `playwright.config.ts`.
- Dependencies: uses already-installed `next-themes`; no new runtime dependencies.
- Tests: Playwright desktop suites remain valid; new mobile project and theme smoke tests added.
