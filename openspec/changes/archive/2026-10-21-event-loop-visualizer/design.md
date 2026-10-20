# Design

## Context

The app is a TanStack Start SSR starter with file-based routing, TanStack Query, shadcn/ui, Tailwind v4, and no state library. There are no product routes yet beyond `/`. The visualizer is inherently client-side (timers, animation, scrubbing), so it must be isolated as a client-only island while its surrounding route shell stays SSR-rendered for content/SEO. See `proposal.md` for motivation and scope.

## Goals / Non-Goals

**Goals:**

- A reusable step-timeline model that drives the visualizer purely from data (containers, chips, active line, narration, output).
- Cross-container chip animation via `motion` `layout`, with enter/exit via `AnimatePresence`.
- A topic catalog + dynamic route so future topics plug in as modules.
- Playback that is scrubbable, reversible, and accessible (reduced motion).

**Non-Goals:**

- Executing arbitrary user code to derive event-loop order (curated examples only).
- Real browser-engine fidelity (render phase, rAF, microtask ordering beyond Promise/setTimeout) in v1 — the model stays at stack / Web APIs / microtask queue / task queue.
- Persisting user progress or quiz scores (local, ephemeral state only).
- Server-side rendering of the animated visualizer.

## Decisions

### D1: Animation library — `motion`

Use `motion` (import from `motion/react`), loaded via `LazyMotion` + `domAnimation`.

- **Why over CSS transitions:** chips move between different parent containers; CSS cannot animate across parents without manual FLIP measurement. `motion`'s `layout` prop handles FLIP automatically, which is the difference between tractable and intractable here.
- **Why `motion` over `framer-motion`:** same API, modern package name, smaller.
- **Alternatives considered:** pure CSS + manual FLIP (too much measurement code, error-prone); GSAP (heavier, less idiomatic with React 19). Rejected.
- **Bundle mitigation:** `LazyMotion` + `domAnimation` (~15KB gzipped) instead of the full bundle.

### D2: Motion scope and timing

- `layout` on chips only (not containers) to avoid reflow jank.
- Cross-container moves: tween, ease-out, ~200ms (deterministic, readable for teaching).
- Enqueue pop-in and output flash: spring (stiffness 300, damping 25) for arrival feel.
- Manual step-back: 0ms (instant) so scrubbing stays responsive.
- Auto-play uses `await animate(...)` chains per step, enabling pause/resume and reversal.

### D3: Client-only island

The visualizer component is rendered inside a `ClientOnly` boundary (or `useEffect`-gated). Route shell, catalog, and explanatory text remain SSR. This avoids hydration mismatches from animation/timer state and keeps content indexable.

### D4: Step timeline as pure data

Each example is an array of `Step` objects:

```
Step = {
  id, activeLine, narration,
  containers: { stack, webApis, microtaskQueue, taskQueue }, // arrays of Chip
  outputAppend?: string,
  focus: "stack" | "microtask" | "task" | "webapi" // which container the loop is consulting
}
```

The visualizer derives its rendered state purely from `stepIndex`. This makes scrubbing, step-back, and tests trivial, and keeps animation orchestration separate from state logic.

### D5: State management — `useReducer`

Playback state (`stepIndex`, `playing`, `speed`, `exampleId`, `quizMode`) lives in a `useReducer` inside the visualizer. No new state library. TanStack Query is not used for this (no server data).

### D6: Routing and topic registry

- `src/routes/topics/index.tsx` — catalog.
- `src/routes/topics/$topicId.tsx` — dynamic topic route resolving from a `topics` registry module (`src/features/topics/registry.ts`).
- Each topic module exports `{ id, title, description, Component }`. The event loop module is the first.
- Unknown `topicId` renders the route's `notFoundComponent`.

### D7: Motion + reduced motion

Use `motion`'s `useReducedMotion()` to swap animated variants for instant state changes when requested. Navigation and state updates remain functional; only movement is suppressed.

### D8: Code highlighting

A moving highlight bar positioned by `top` (CSS transition) over a `<pre>` of the example source, driven by `step.activeLine`. Avoids re-rendering the code block per step.

## Risks / Trade-offs

- [Risk] `layout` animation jank if too many chips animate at once → Mitigation: scope `layout` to chips only; keep example step sizes small (≤ ~12 steps).
- [Risk] Hydration mismatch if island boundary is misconfigured → Mitigation: strict `ClientOnly` wrapping; no animation state in SSR output.
- [Risk] Curated examples may not cover a learner's specific confusion → Mitigation: quiz mode + narration; examples chosen for the most common misconceptions (setTimeout vs Promise, nested microtasks, async/await).
- [Risk] Bundle growth from `motion` → Mitigation: `LazyMotion` + `domAnimation`; measure in build.
- [Risk] Step-timeline authoring is manual and error-prone → Mitigation: TypeScript types for `Step`/`Chip`; unit tests asserting invariants (e.g., output order matches expected).

## Migration Plan

1. Add `motion` dependency.
2. Add topic registry + routes (catalog + dynamic).
3. Implement step-timeline types and curated examples.
4. Implement visualizer island with containers, chips, playback controls, code highlight, narration, output log.
5. Add motion animation layer and reduced-motion handling.
6. Add quiz mode.
7. Add e2e smoke test and unit tests for timeline invariants.
8. Update `ARCHITECTURE.md`.

Rollback: remove new routes/modules; no data migration (ephemeral state).

## Open Questions

- None blocking. (Example copy and exact step counts can be refined during implementation without changing specs.)
