# Design

## Context

The app is a TanStack Start SSR starter with file-based routing, TanStack Query, shadcn/ui, Tailwind v4, and no state library. The event-loop topic established the pattern: a topic module under `src/features/topics/<topic>/` registered via side-effect import, a client-only visualizer island, and a pure step-timeline data model driving a `useReducer`. See `proposal.md` for motivation and scope, and `openspec/specs/this-binding-visualization/spec.md` for requirements.

## Goals / Non-Goals

**Goals:**

- A reusable step-timeline model (containers, chips, active line, narration, output) driving the visualizer purely from data, mirroring the event-loop model so authoring and tests stay consistent.
- Cross-container chip animation via `motion` `layout`, with enter/exit via `AnimatePresence` and reduced-motion support.
- Curated examples that make the `this`-binding precedence rules (new > explicit > implicit > default; arrow/lexical override) observable at real call sites, including pitfalls.
- Playback that is scrubbable, reversible, and accessible.

**Non-Goals:**

- Executing arbitrary user code to derive `this` (curated examples only), consistent with the event-loop topic.
- Full language spec fidelity (e.g., `Function.prototype.bind` partial application, `super`, class fields, `with`/`eval` edge cases) in v1 — the model stays at the five binding rules.
- Persisting user progress or quiz scores (local, ephemeral state only).
- Server-side rendering of the animated visualizer.

## Decisions

### D1: Reuse the event-loop step-timeline model

Use the same `Step`/`Chip`/`StepContainers`/`deriveState` shape, with container ids for the five binding targets. The visualizer component logic (reducer, controls, scrubber, code highlight, narration, output log, quiz) is structurally identical to the event-loop visualizer; only container labels, chip colors, and example data differ.

- **Why reuse:** keeps a single mental model for authors and tests, and lets the existing e2e smoke patterns apply unchanged.
- **Alternative considered:** a bespoke "rule ladder" UI without container movement. Rejected: loses the cross-container animation that makes resolution visible and breaks consistency with the catalog's other topic.

### D2: Binding-target containers

Containers (chips represent the resolved `this` value moving to the ruling target):

- `global` — Global object / `undefined` in strict mode (default binding).
- `implicit` — the base object at the call site (implicit binding).
- `explicit` — the target passed to `call`/`apply`/`bind` (explicit binding).
- `newInstance` — the newly created object for `new` calls.
- `lexical` — the enclosing lexical `this` (arrow functions / bound closures).

Each step's `containers` places a single `this` chip in exactly one container, indicating the resolved binding; other containers are empty for that step. Narration cites the rule and precedence.

- **Why five containers:** one per binding rule keeps the resolution unambiguous and the quiz predictive ("which container?").
- **Alternative considered:** collapsing explicit + bind into one. Rejected: `bind` creates a persistent bound function distinct from a one-off `call`, worth distinguishing for teaching.

### D3: Client-only island

The visualizer component is rendered inside a `ClientOnly` boundary (mirroring the event-loop topic). Route shell, catalog, and explanatory text remain SSR. Avoids hydration mismatches from animation/timer state.

### D4: Topic registration and routing

- Add `src/features/topics/this-binding/index.tsx` calling `defineTopic({ id: "this-binding", title: "How `this` Works", description, Component })`.
- Add side-effect import in `src/features/topics/index.ts`.
- No route changes: `/topics` and `/topics/$topicId` already resolve from the registry.

### D5: Quiz mode

Reuse the predict-next pattern: hide the next step, prompt which binding target the next `this` resolves to, reveal the step and correctness on response. `getNextDestination` compares containers between consecutive steps (identical logic to event loop).

### D6: Code highlighting

Reuse the moving highlight bar over a `<pre>` driven by `step.activeLine`, with Shiki highlighting for JavaScript. Avoids re-rendering code per step.

### D7: Motion and reduced motion

Use `motion` via `LazyMotion` + `domAnimation`, `layout` on chips only, `AnimatePresence` for enter/exit, and `useReducedMotion()` to disable non-essential movement. Manual step-back is instant (0ms).

## Risks / Trade-offs

- [Risk] Curated examples may not cover a learner's specific confusion → Mitigation: quiz mode + narration citing rules; examples chosen for the most common pitfalls (detached methods, callbacks, arrow vs regular).
- [Risk] Five containers increase quiz option count and cognitive load → Mitigation: keep examples short (≤ ~10 steps) and narration explicit about which rule applied.
- [Risk] Step-timeline authoring is manual and error-prone → Mitigation: TypeScript types for `Step`/`Chip`; unit tests asserting output order and that exactly one container holds the chip per step.
- [Risk] Hydration mismatch if island boundary is misconfigured → Mitigation: strict `ClientOnly` wrapping; no animation state in SSR output.
- [Risk] Bundle growth from reusing `motion` → Mitigation: already added for event loop; `LazyMotion` + `domAnimation`.

## Migration Plan

1. Create directory scaffolding `src/features/topics/this-binding/` and `src/components/visualizer/` reuse.
2. Implement step-timeline types and curated examples.
3. Implement visualizer island (containers, chips, playback controls, code highlight, narration, output log).
4. Add motion animation layer and reduced-motion handling.
5. Add quiz mode.
6. Register topic in barrel; update `ARCHITECTURE.md`.
7. Add unit tests and Playwright smoke test.
8. Run `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm test:e2e`.

Rollback: remove new module/import; no data migration (ephemeral state).

## Open Questions

- None blocking. (Example copy and exact step counts can be refined during implementation without changing specs.)
