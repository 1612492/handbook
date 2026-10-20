# Proposal

## Why

The visualizer currently ships only two interview topics (`event-loop`, `this-binding`), but the Front End Interview Handbook covers many more concepts that are commonly misunderstood and benefit from step-by-step visualization. Adding topics one-by-one by copy-pasting the ~690-line visualizer would duplicate logic and drift; the two existing visualizers are already near-identical except for container configuration and example data. We need a generic, data-driven step-player plus a curated, broad set of visualizable topics so interviewees can build deep intuition across JavaScript runtime semantics, CSS layout/rendering, and DOM lifecycle.

## What Changes

- Refactor the two existing visualizers into a single generic `StepVisualizer` engine parameterized by a per-topic config (container definitions, example/model/quiz modules, heading/subtitle/footer, output label, quiz prompt, grid columns). Migrate `event-loop` and `this-binding` onto it so there is one source of truth. Each topic then ships a thin (~30-line) wrapper.
- Add 18 new visualizable topics (see Capabilities), each following the established pattern: feature module (`model`/`examples`/`quiz`), thin visualizer wrapper, OpenSpec spec, unit tests, and Playwright smoke test.
- Update `ARCHITECTURE.md` topic list and data-flow notes; keep `topic-catalog` unchanged (it already resolves topics from the registry).

## Capabilities

### New Capabilities

- `closures-visualization`: Step-by-step visualization of lexical scope chains, variable capture, and closure lifetime.
- `hoisting-visualization`: Declaration vs. initialization, temporal dead zone, function vs. `var` hoisting.
- `scoping-visualization`: `var` (function) vs. `let`/`const` (block) scoping, loop closures.
- `prototypes-visualization`: `[[Prototype]]` lookup chain, `constructor`/`prototype`, `Object.create`.
- `coercion-visualization`: `==` abstract equality and `ToPrimitive`/`ToString`/`ToNumber`; contrast with `===`.
- `event-propagation-visualization`: capture/target/bubble phases and event delegation.
- `promises-visualization`: promise state machine (pending/fulfilled/rejected), chaining, error propagation.
- `async-await-visualization`: desugaring to promise chains, suspension and resumption.
- `css-box-model-visualization`: content/padding/border/margin and `box-sizing`.
- `css-positioning-visualization`: static/relative/absolute/fixed/sticky and containing blocks.
- `css-specificity-visualization`: (a,b,c,d) scoring and cascade order.
- `css-flexbox-visualization`: main/cross axis, grow/shrink/basis, alignment.
- `css-grid-visualization`: tracks, placement, grid areas.
- `css-bfc-visualization`: block formatting contexts, float containment, margin collapse.
- `css-stacking-visualization`: stacking contexts, z-index, paint order.
- `dom-lifecycle-visualization`: parsing, `DOMContentLoaded`, `load`, `readyState` phases.
- `dom-attr-vs-prop-visualization`: attributes vs. properties and reflection.

### Modified Capabilities

<!-- None: topic-catalog already supports registering new topics without requirement changes; event-loop and this-binding specs are unchanged (only their implementation is refactored). -->

## Impact

- Affected code: new `src/components/visualizer/StepVisualizer.tsx` engine; refactor of `EventLoopVisualizer.tsx` and `ThisBindingVisualizer.tsx` into thin wrappers; 18 new modules under `src/features/topics/<topic>/`; side-effect registrations in `src/features/topics/index.ts`; unit tests and Playwright specs per topic; `ARCHITECTURE.md`.
- Dependencies: none new — reuses `motion` and existing UI primitives.
- SSR: visualizer islands remain client-only; route shell and catalog stay SSR-rendered.
- Validation: each topic's pure timeline/quiz logic covered by Vitest; catalog navigation and a basic playback flow covered by Playwright.
- Out of scope: non-visualizable trivia (Ajax/JSONP, modules, IIFE, host/native, etc.), system design, coding exercises, and the optional low-priority topics (`currying`, `mutable-vs-immutable`).
