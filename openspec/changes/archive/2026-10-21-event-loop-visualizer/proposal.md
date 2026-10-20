# Proposal

## Why

The project is intended to become a visualizer for JavaScript interview topics, but today it ships only the TanStack starter landing page — there is no topic surface, no visualization, and no animation infrastructure. The first and most impactful topic is the event loop: it is the single most common source of "why did this run in this order?" confusion in JS interviews, and static explanations (or toy animations that don't show cross-container movement) fail to convey the decisive rule — microtasks drain fully before the next macrotask. We need a step-by-step, animated, scrubbable visualization that makes queue movement and ordering rules visible, plus a small topic catalog so future topics (closures, hoisting, `this`, prototypes) can be added without restructuring.

## What Changes

- Add a topic catalog: a `/topics` index listing available topics and a `/topics/$topicId` route, with the event loop as the first entry.
- Add the event loop visualizer: a client-only island rendering the Call Stack, Web APIs, Microtask Queue, and Task Queue, with a chip that animates between containers per step.
- Add a curated, annotated example set (at least: `setTimeout` vs `Promise`, nested microtasks, `async`/`await` desugaring) where each step carries a narration explaining why it happens.
- Add playback controls: play/pause, step forward/back, speed (0.25x–2x), scrubber, reset, and a synchronized code highlight.
- Add motion-based animation: `motion` (from `motion/react`) via `LazyMotion` + `domAnimation`, using `layout` for cross-container chip movement, `AnimatePresence` for enter/exit, and reduced-motion support.
- Add a "predict next" quiz mode that hides the next step and checks the user's guess of which container the chip moves to.

## Capabilities

### New Capabilities

- `topic-catalog`: Browsing and navigating available interview topics; topic metadata (id, title, description) and routing.
- `event-loop-visualization`: Step-by-step animated visualization of the JavaScript event loop, including curated examples, playback controls, code highlighting, narration, and quiz mode.

### Modified Capabilities

<!-- None: no existing specs in this project. -->

## Impact

- Affected code: new routes under `src/routes/topics/`, new components under `src/components/visualizer/` (or `src/features/`), new example/timeline data modules, root navigation updates.
- Dependencies: adds `motion` (animation). No other new runtime dependencies; playback state uses `useReducer`/`useState`.
- SSR: visualizer island is client-only to avoid hydration mismatches; route shells and catalog remain SSR-rendered.
- Tests: Playwright e2e for catalog navigation and a smoke playback flow; unit tests for the pure step-timeline derivation.
- Docs: `ARCHITECTURE.md` updated with new routes and data flow.
