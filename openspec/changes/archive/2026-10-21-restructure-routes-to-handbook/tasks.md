# Tasks

## 1. Shared shell extraction

- [x] 1.1 Create `src/components/visualizer/TopicsShell.tsx` extracting the sidebar and `md:flex-row` wrapper from `src/routes/topics.tsx`, accepting `children` for the main area, and verify it renders the sidebar with topic links.
- [x] 1.2 Update sidebar links in `TopicsShell` to use `to="/$slug"` with `params={{ slug: topic.id }}` and verify generated route types include `/$slug`.

## 2. New route structure

- [x] 2.1 Create `src/routes/_app.tsx` as a pathless layout wrapping `<Outlet />` in `<TopicsShell>` and verify `routeTree.gen.ts` treats it as a pathless layout.
- [x] 2.2 Create `src/routes/_app.index.tsx` rendering the intro ("Handbook" heading + short description) and verify `/` renders intro with sidebar.
- [x] 2.3 Create `src/routes/_app.$slug.tsx` moved from `src/routes/topics/$topicId.tsx`, reading `Route.useParams().slug` and resolving via `getTopic(slug)`, with not-found handling, and verify `/this-binding` renders its visualizer.
- [x] 2.4 Delete `src/routes/index.tsx`, `src/routes/topics.tsx`, `src/routes/topics/index.tsx`, `src/routes/topics/$topicId.tsx`, and the `src/routes/topics/` directory, then run `pnpm build` to regenerate `routeTree.gen.ts` and verify no dangling imports.

## 3. Product rename to Handbook

- [x] 3.1 Update `package.json` name to `handbook`, README title/description, and `playwright.config.ts` comment, and verify metadata reads "Handbook".
- [x] 3.2 Update `src/routes/__root.tsx` title to "Handbook" and meta description to the visualizer app, and verify SSR head output.
- [x] 3.3 Update the first line of `ARCHITECTURE.md` to reflect the Handbook app and verify docs consistency.

## 4. Tests and docs

- [x] 4.1 Update `e2e/topics.spec.ts` to navigate from `/`, click the sidebar link by topic title, and assert URL `/$slug` and step visualizer presence.
- [x] 4.2 Update `e2e/this-binding.spec.ts` and `e2e/event-loop.spec.ts` to use `/$slug` URLs and sidebar navigation.
- [x] 4.3 Replace `e2e/example.spec.ts` landing-hero test with an intro smoke test asserting the "Handbook" heading.
- [x] 4.4 Update `openspec/specs/topic-catalog/spec.md` is already captured as a delta in this change; verify the delta matches implemented behavior.

## 5. Verification

- [x] 5.1 Run `pnpm typecheck`, `pnpm lint`, and `pnpm format:check`, and fix any reported issues.
- [x] 5.2 Run `pnpm build` and `pnpm test:e2e`, and verify all specs pass.
