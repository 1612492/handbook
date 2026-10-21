# Design

## Context

See `proposal.md` for motivation. The app is a TanStack Start SSR React app with Tailwind v4 tokens and shadcn/ui (base-nova). Dark-mode CSS variables already exist under `.dark`, but no provider applies that class. `next-themes` is installed and already used by `sonner`. Navigation lives in `TopicsShell`, which renders an inline sidebar. `CodeView` is a client component that lazy-loads Shiki with only `github-light`. Playwright runs three desktop browser projects.

## Goals / Non-Goals

**Goals:**

- Activate and control dark mode without flash of incorrect theme.
- Keep topic navigation and controls usable on phone-width viewports.
- Make code blocks theme-aware and horizontally scrollable.
- Preserve existing desktop behavior and tests.

**Non-Goals:**

- Reworking topic content or visualizer logic.
- Adding a fully custom theme system beyond light/dark/system.
- Changing route structure or data loading.

## Decisions

### 1. Use next-themes ThemeProvider in the root document

Wrap the body content in `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, and `enableSystem`. Add `suppressHydrationWarning` to `<html>` because the theme class is applied by the injected script before hydration. This reuses the installed dependency and matches the existing `sonner` usage.

Alternative considered: a custom cookie/localStorage provider. Rejected because it duplicates `next-themes` and increases FOUC risk.

### 2. Theme toggle in the app shell

Add a small control in `TopicsShell` (top row, right-aligned) using `useTheme`, rendered only after mount to avoid hydration mismatch. Use a 3-way choice (Light / Dark / System) rather than a binary toggle to honor system preference.

Alternative considered: binary toggle. Rejected because it cannot represent "follow system," which is the recommended default.

### 3. Dual Shiki themes in CodeView

Extend the highlighter to load `github-light` and `github-dark`, and choose the theme based on `resolvedTheme` from `next-themes`. Re-run highlighting when the resolved theme changes. Update container classes with `dark:` variants and change the highlight bar color for dark mode. Add `overflow-x-auto` to the code container.

Alternative considered: CSS-only inversion. Rejected because Shiki output carries inline colors that do not respond to CSS variables.

### 4. Responsive navigation via mobile drawer

Keep the existing inline sidebar on `md` and above. On smaller screens, render a topics button that opens a `Sheet` (already available in `src/components/ui/sheet.tsx`) containing the same navigation. Selecting a topic closes the drawer. This avoids a long stacked list above content while reusing existing primitives.

Alternative considered: stacked sidebar only. Rejected because it pushes visualizer content below a long topic list on phones.

### 5. Component-level dark fixes

Update `Slider` thumb to use a theme-aware background (`bg-background` with border) instead of hardcoded `bg-white`. Audit stages for hardcoded opacity colors and add `dark:` variants where contrast is poor. Code blocks use theme tokens plus dark variants.

### 6. Testing

Add a mobile project to `playwright.config.ts` using a phone viewport, and add smoke tests for theme toggling and mobile navigation. Keep existing desktop tests unchanged.

## Risks / Trade-offs

- [next-themes SSR script injection] → Mitigation: follow documented pattern and add `suppressHydrationWarning` to `<html>`.
- [Shiki bundle size increases with a second theme] → Mitigation: lazy-load both in the existing dynamic import; acceptable for a docs/learning app.
- [Mobile drawer state hydration] → Mitigation: initialize closed and open only on client interaction.
- [Existing tests reference `aside` visibility] → Mitigation: keep `aside` in the desktop layout; mobile drawer uses a separate control and does not remove desktop markup.

## Migration Plan

1. Wire theme provider and toggle.
2. Update `CodeView` and slider.
3. Update `TopicsShell` for responsive drawer.
4. Audit stages and fix dark gaps.
5. Update Playwright config and tests.
6. Run typecheck, lint, and e2e.

Rollback: revert the change; no data migration or API changes.

## Open Questions

- None.
