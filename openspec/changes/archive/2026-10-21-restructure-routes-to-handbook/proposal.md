# Proposal

## Why

The app has outgrown its starter shell: the landing page is still the TanStack starter template, and topic discovery lives on a separate `/topics` catalog even though the sidebar already navigates topics. Consolidating the welcome surface into an intro at `/`, moving topics to top-level `/$slug` routes, and renaming the product to "Handbook" makes the app a focused, browsable handbook of visualizers with a single, persistent navigation surface.

## What Changes

- **BREAKING**: Remove the `/topics` catalog route and the TanStack starter landing page. The welcome surface becomes the intro at `/`.
- **BREAKING**: Move topic visualizers from `/topics/$topicId` to top-level `/$slug` (param renamed from `topicId` to `slug`).
- Add a pathless `_app` layout route that wraps `/` and `/$slug` in a shared `TopicsShell` (persistent topics sidebar).
- Add an intro page at `/` (app welcome only: heading + short description), rendered inside the shared shell.
- Extract the topics sidebar + layout wrapper from `topics.tsx` into a reusable `TopicsShell` component.
- Rename product from "Starter template" to "Handbook" across package metadata, README, app shell title/meta, Playwright config, and architecture docs.
- Update e2e tests and the `topic-catalog` spec to the new routes.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `topic-catalog`: route surface changes — intro at `/`, topics at `/$slug`, no `/topics` catalog page; unknown slug yields not-found.

## Impact

- Affected routes: `src/routes/index.tsx`, `src/routes/topics.tsx`, `src/routes/topics/index.tsx`, `src/routes/topics/$topicId.tsx` (removed/replaced), new `_app*` routes and `TopicsShell`.
- Affected tests: `e2e/topics.spec.ts`, `e2e/this-binding.spec.ts`, `e2e/event-loop.spec.ts`, `e2e/example.spec.ts`.
- Affected metadata: `package.json`, `README.md`, `src/routes/__root.tsx`, `playwright.config.ts`, `ARCHITECTURE.md`.
- OpenSpec spec: `openspec/specs/topic-catalog/spec.md` (delta).
