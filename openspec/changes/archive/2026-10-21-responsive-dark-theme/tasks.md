# Tasks

## 1. Theme provider and toggle

- [x] 1.1 Wire `next-themes` `ThemeProvider` into `src/routes/__root.tsx` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `suppressHydrationWarning` on `<html>`; verify `pnpm typecheck` passes and the app boots in dev.
- [x] 1.2 Add a theme toggle control to `src/components/visualizer/TopicsShell.tsx` that selects Light / Dark / System using `useTheme`, rendered after mount; verify the toggle changes the `.dark` class on `<html>` in the browser.
- [x] 1.3 Update `src/components/ui/sonner.tsx` usage if needed so toasts follow the resolved theme; verify a toast renders with dark styling when dark mode is active.

## 2. Theme-aware code view

- [x] 2.1 Extend `src/components/visualizer/step-visualizer/CodeView.tsx` to load both `github-light` and `github-dark` Shiki themes and choose based on `resolvedTheme`; verify highlighting re-runs when the theme changes.
- [x] 2.2 Add `dark:` variants to the `CodeView` container, pre, and highlight bar; verify contrast in both themes.
- [x] 2.3 Add `overflow-x-auto` to the code container and verify a long line scrolls horizontally instead of clipping.

## 3. Component dark-mode fixes

- [x] 3.1 Update the `Slider` thumb in `src/components/ui/slider.tsx` to use a theme-aware background; verify it is visible in dark mode.
- [x] 3.2 Audit visualizer stages for hardcoded colors and add `dark:` variants where needed; verify each stage in dark mode.

## 4. Responsive navigation

- [x] 4.1 Update `src/components/visualizer/TopicsShell.tsx` to keep the inline sidebar on `md+` and add a topics button plus `Sheet` drawer on smaller screens; verify the drawer opens, lists topics, and closes on selection.
- [x] 4.2 Ensure the mobile drawer does not break desktop sidebar tests; verify `pnpm test:e2e` passes for existing specs.

## 5. Testing and verification

- [x] 5.1 Add a mobile viewport project to `playwright.config.ts`; verify it runs without breaking existing projects.
- [x] 5.2 Add Playwright smoke tests for theme toggling and mobile navigation; verify they pass on desktop and mobile projects.
- [x] 5.3 Run `pnpm typecheck`, `pnpm lint`, and `pnpm test:e2e`; verify all pass.

## Workflow follow-up

- Archive the change after review requirements are satisfied.
- Verify the archived result.
