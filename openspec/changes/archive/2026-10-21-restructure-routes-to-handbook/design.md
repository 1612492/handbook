# Design

## Context

Current routing uses `src/routes/index.tsx` (TanStack starter landing) and `src/routes/topics/*` (layout + catalog + `/$topicId`). The sidebar already lives in `topics.tsx`, so the separate catalog is redundant. TanStack Router file-based routing supports pathless layout routes via an underscore prefix, which lets us share the sidebar across `/` and `/$slug` without putting app chrome in `__root.tsx`.

## Goals / Non-Goals

**Goals:**

- Replace starter landing and `/topics` catalog with an intro at `/`.
- Move topics to top-level `/$slug` with a persistent shared sidebar.
- Extract sidebar into a reusable `TopicsShell`.
- Rename product to "Handbook" in user-facing metadata and docs.

**Non-Goals:**

- No redirect from old `/topics/*` URLs (breaking by design).
- No changes to topic visualizer components or feature modules.
- No theming or content changes beyond the intro welcome.

## Decisions

### Pathless layout for shared shell

Use `src/routes/_app.tsx` as a pathless layout wrapping `_app.index.tsx` and `_app.$slug.tsx`. This keeps `__root.tsx` as the document shell and makes the sidebar persistent across `/` and `/$slug`.

Alternatives: put `TopicsShell` in `__root.tsx` (simpler but mixes app chrome into the document shell and affects every route including 404). Rejected for cleanliness.

### Reusable TopicsShell component

Extract the sidebar + `md:flex-row` wrapper from `topics.tsx` into `src/components/visualizer/TopicsShell.tsx` accepting `children`. Both `_app.tsx` (via `<Outlet />`) and any future surface reuse it. Sidebar links use `to="/$slug"` with `params={{ slug: topic.id }}`.

### Param name `slug`

Rename route param from `topicId` to `slug` for cleaner top-level URLs. Topic lookup becomes `getTopic(slug)`. Topic ids remain unchanged.

### Intro content

Intro is "app welcome only": heading "Handbook" + short description. No topic cards; discovery happens via sidebar.

### Product name

Rename "Starter template" to "Handbook": `package.json` name, README title, `__root.tsx` title/meta, Playwright config comment, ARCHITECTURE opening line. Archived OpenSpec changes are left untouched as history.

## Risks / Trade-offs

- [Pathless layout naming] Mistyped underscore prefix could create a normal route instead of a layout. → Verify generated `routeTree.gen.ts` and run typecheck/build.
- [Slug route greediness] `/$slug` matches any single segment, including unknown ids; handled by the topic component's not-found branch. → Keep not-found logic in `_app.$slug.tsx`.
- [Broken old URLs] `/topics/*` no longer resolves; acceptable per breaking change.
- [E2E churn] Multiple specs reference `/topics`; update all to `/$slug` and `/`.

## Migration Plan

1. Add `TopicsShell`, `_app.tsx`, `_app.index.tsx`, `_app.$slug.tsx`.
2. Remove old route files and `topics/` directory.
3. Update sidebar links and `__root` metadata.
4. Update e2e tests and ARCHITECTURE.md.
5. Regenerate route tree via build; run typecheck, lint, format, e2e.

## Open Questions

- None.
