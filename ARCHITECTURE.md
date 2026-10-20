# ARCHITECTURE.md

## Overview

Minimal SSR React starter: TanStack Start app served by Nitro, built with Vite, routed with TanStack Router, fetching with TanStack Query, styled with Tailwind CSS v4 + shadcn/ui (base-nova).

## Runtime layers

| Layer     | Tool / file                                                                      | Role                                                                  |
| --------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Dev/build | Vite (`vite.config.ts`) + Nitro plugin                                           | Dev server `:3000`; `vite build` emits to `.output/`                  |
| Server    | Nitro 3 beta (`pnpm start` → `.output/server/index.mjs`)                         | SSR + static serving                                                  |
| App shell | `src/routes/__root.tsx`                                                          | `<html>` document, head links, `TooltipProvider`, `Toaster`, devtools |
| Router    | TanStack Router file-based (`src/routes/`, `routeTree.gen.ts`, `src/router.tsx`) | Type-safe routes, preload `intent`, scroll restoration                |
| Data      | TanStack Query + `setupRouterSsrQueryIntegration`                                | `QueryClient` in router context; SSR-dehydrated to client             |
| UI        | shadcn/ui (`src/components/ui/*`), Base UI, Lucide                               | Accessible primitives; `next-themes` + `sonner` for toasts            |
| Styling   | Tailwind v4 (`src/styles.css`, `@tailwindcss/vite`)                              | CSS-first tokens, `dark` variant, Inter Variable font                 |
| Quality   | oxlint, oxfmt, `tsc --noEmit`                                                    | Lint/format/typecheck                                                 |
| E2E       | Playwright (`playwright.config.ts`, `e2e/`)                                      | Chromium/Firefox/WebKit vs `http://localhost:3000`                    |

## Request lifecycle

1. Nitro receives request → TanStack Start SSR renders matching route (`__root.tsx` → route component, e.g. `index.tsx`).
2. Route `loader`s / query prefetches run server-side; Query cache dehydrates into HTML.
3. Client hydrates via `getRouter()` (`src/router.tsx:6`); `setupRouterSsrQueryIntegration` reuses SSR cache, then Router takes over navigation with `intent` preloading.
4. Static assets from `public/` (favicon) and bundled CSS served alongside.

## Directory map

- `src/routes/` — routes only; add `about.tsx` → `/about` automatically.
- `src/router.tsx`, `src/routeTree.gen.ts` — router wiring (generated tree, do not edit).
- `src/components/ui/` — generated shadcn components (`components.json` aliases: `@/components`, `@/lib/utils`, `@/hooks`).
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `src/hooks/use-mobile.ts` — client breakpoint hook.
- `e2e/example.spec.ts` — smoke spec for `/` hero + `#stack` anchor flow.
- `e2e/topics.spec.ts` — parametrized spec over every manifest topic (catalog navigation, playback, scrubber, reset, quiz prompt).

## Topics

- `src/routes/topics/index.tsx` — `/topics` catalog of registered topics, grouped by category.
- `src/routes/topics/$topicId.tsx` — `/topics/$topicId` resolves a topic from the registry; renders not-found for unknown ids.
- `src/routes/topics.tsx` — layout for `/topics/*`: a sticky sidebar that groups topics by category and scrolls vertically (`max-h-[calc(100vh-2rem)]` + `overflow-y-auto`).
- `src/features/topics/categories.ts` — `TopicCategory` (`javascript`, `html`, `css`), category labels, and `groupTopicsByCategory()`.
- `src/features/topics/` — topic registry (`registry.ts`) plus one module per topic under `src/features/topics/<topic>/`. Each module calls `defineStepTopic` with `{ id, title, description, category }` plus a `StepVisualizerConfig`. Importing the barrel (`src/features/topics/index.ts`) registers all topics via side-effect imports.
- `src/features/topics/shared/` — shared timeline model (`model.ts`: `Chip`, `Step`, `Example`, `deriveState`, `clampIndex`, `makeContainers`), shared quiz helper (`quiz.ts`), the `defineStepTopic` wrapper (`define-step-topic.tsx`), and the shared test helpers (`invariants.ts`, `quiz-helpers.ts`).
- `src/features/topics/topic-manifest.ts` — static `{ id, title, category }` list of every topic; kept in sync with the registry by `topic-manifest.test.ts` and used to parametrize `e2e/topics.spec.ts`.

### Visualizer engine

- `src/components/visualizer/step-visualizer/StepVisualizer.tsx` — the single playback shell: reducer/state, play/pause, step forward/back, reset, speed, scrubber, code highlight, narration, output log, predict-next quiz, and reduced-motion handling.
- `src/components/visualizer/step-visualizer/ContainerStage.tsx` — default stage; renders the topic's containers as labeled panels with animated chips.
- `src/components/visualizer/stages/` — topic-specific stages (`BoxModelStage`, `PositioningStage`, `SpecificityStage`, `FlexboxStage`, `GridStage`, `BfcStage`, `StackingStage`) that draw CSS concepts instead of chip queues. A stage receives `StageProps<C>` and never owns playback state.
- `src/components/visualizer/EventLoopVisualizer.tsx`, `ThisBindingVisualizer.tsx` — thin per-topic wrappers that supply config only.

### Registered topics

| Area       | Topics                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| JS runtime | `event-loop`, `this-binding`, `closures`, `hoisting`, `scoping`, `prototypes`, `coercion`, `event-propagation`, `promises`, `async-await` |
| CSS        | `css-box-model`, `css-positioning`, `css-specificity`, `css-flexbox`, `css-grid`, `css-bfc`, `css-stacking`                               |
| DOM        | `dom-lifecycle`, `dom-attr-vs-prop`                                                                                                       |

Each topic owns its `model.ts` (container ids + re-exported shared types), `examples.ts` (curated steps, code, narration, expected output), `quiz.ts`, `index.tsx` (registration), and unit tests under `src/features/topics/<topic>/`.

## Key decisions

- SSR by default (Start), not SPA: keep components SSR-safe; isolate browser APIs.
- Single `QueryClient` per router instance in context — enables request-scoped caching on server, shared cache on client.
- Tailwind v4 CSS-first config (no `tailwind.config.js`); theme tokens live in `styles.css`.
- Playwright `webServer` reuses local dev server, builds+starts in CI — no hardcoded ports beyond `vite.config.ts:10` and `playwright.config.ts` `baseURL`.
