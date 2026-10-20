# Proposal

## Why

The topic catalog currently ships only the event-loop visualizer, but the project is intended to be a suite of JavaScript interview-topic visualizers, and `this` binding is the next most common source of "why is `this` what it is?" confusion after the event loop. The rules (default, implicit, explicit via `call`/`apply`/`bind`, `new`, and lexical/arrow) are easy to state but hard to apply at a call site, and static explanations do not make the resolution visible. We need a step-by-step, animated, scrubbable visualization that shows, for each call, which binding rule applies and what value `this` resolves to.

## What Changes

- Add a `this`-binding topic module under `src/features/topics/this-binding/`, registered through the existing topic registry (no navigation or catalog changes required).
- Add a client-only visualizer island rendering candidate `this`-binding targets (global/undefined-in-strict, implicit base object, explicit bound target, `new` instance, lexical/arrow enclosure), with a chip representing the resolved `this` moving between them per step.
- Add a curated, annotated example set covering default, implicit, explicit (`call`/`apply`/`bind`), `new`, arrow/lexical binding, strict mode, and common pitfalls (detached methods, callbacks losing `this`), where each step carries a narration citing the applicable rule.
- Reuse the established step-timeline model: playback controls (play/pause, step forward/back, speed 0.25x–2x, scrubber, reset), synchronized code highlight, narration panel, and a `this`-value output log.
- Add a "predict next" quiz mode asking which binding target the next `this` resolves to, revealing the answer and correctness on response.
- Add unit tests for timeline derivation and quiz logic, plus a Playwright smoke test for catalog navigation and a basic playback flow.
- Update `ARCHITECTURE.md` with the new topic module and data flow.

## Capabilities

### New Capabilities

- `this-binding-visualization`: Step-by-step animated visualization of how `this` is determined in JavaScript function calls, including curated examples, playback controls, code highlighting, narration, and quiz mode.

### Modified Capabilities

<!-- None: topic-catalog already supports registering new topics without requirement changes. -->

## Impact

- Affected code: new module under `src/features/topics/this-binding/`, new visualizer component under `src/components/visualizer/`, side-effect registration in `src/features/topics/index.ts`, tests under the module and `e2e/`, and `ARCHITECTURE.md`.
- Dependencies: none new — reuses `motion` and existing UI primitives.
- SSR: visualizer island is client-only; route shell, catalog, and explanatory text remain SSR-rendered.
- Tests: Vitest unit tests for pure timeline/quiz logic; Playwright e2e for catalog navigation and a smoke playback flow.
