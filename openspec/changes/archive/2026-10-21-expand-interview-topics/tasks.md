# Tasks

## 1. Refactor Foundation

- [x] 1.1 Add `src/features/topics/shared/model.ts` with generic `Chip`, `StepContainers<C>`, `Step<C>`, `Example<C>`, `deriveState`, `clampIndex`, and `emptyContainers`; verify shared unit tests for initial/mid/final/clamped steps pass
- [x] 1.2 Add `src/features/topics/shared/quiz.ts` with generic `getNextDestination`; verify unit tests cover a representative container move and the last-step null case
- [x] 1.3 Extract the playback shell into `src/components/visualizer/StepVisualizer.tsx` (reducer, controls, scrubber, auto-play, code highlight, narration, output log, quiz, reduced motion); verify `pnpm typecheck` passes and a temporary harness renders it
- [x] 1.4 Implement the default `ContainerStage` under `src/components/visualizer/stages/` driven by `StageProps<C>`; verify containers, chips, focus emphasis, and reduced-motion behavior match the existing event-loop UI
- [x] 1.5 Prototype one CSS stage (`BoxModelStage`) against `StageProps` to validate the pluggable-stage boundary; verify it renders nested box layers from step data without owning playback state
- [x] 1.6 Migrate `event-loop` to a thin wrapper (topic `model.ts`/`quiz.ts` re-export shared types, `index.tsx` renders `StepVisualizer` + `ContainerStage`); verify `e2e/event-loop.spec.ts` and its unit tests pass unchanged
- [x] 1.7 Migrate `this-binding` to a thin wrapper; verify `e2e/this-binding.spec.ts` and its unit tests pass unchanged
- [x] 1.8 Add `src/features/topics/topic-manifest.ts` with `{ id, title }` for every registered topic and a unit test asserting ids match `listTopics()`; verify the test fails when an id is removed
- [x] 1.9 Add parametrized `e2e/topics.spec.ts` covering catalog navigation, Next/Reset, scrubber, and quiz prompt for manifest entries; verify it passes for `event-loop` and `this-binding`
- [x] 1.10 Update `ARCHITECTURE.md` with the shared engine, stage slot, and topic-module shape; verify documented paths match the files created

## 2. JavaScript Runtime Topics

- [x] 2.1 Add the `closures` module (`model.ts`, `examples.ts`, `quiz.ts`, `index.tsx`) with scope-chain containers and curated closure examples; verify `model.test.ts` output-order invariants and `quiz.test.ts` pass
- [x] 2.2 Register `closures` via the barrel and manifest; verify `/topics/closures` renders and the parametrized e2e passes
- [x] 2.3 Add the `hoisting` module with TDZ/declaration/initialization containers and curated examples; verify unit tests pass
- [x] 2.4 Register `hoisting` and verify `/topics/hoisting` plus e2e pass
- [x] 2.5 Add the `scoping` module with global/function/block/loop containers and `var` vs `let`/`const` examples; verify unit tests pass
- [x] 2.6 Register `scoping` and verify `/topics/scoping` plus e2e pass
- [x] 2.7 Add the `prototypes` module with chain containers and `Object.create`/constructor examples; verify unit tests pass
- [x] 2.8 Register `prototypes` and verify `/topics/prototypes` plus e2e pass
- [x] 2.9 Add the `coercion` module with `ToPrimitive`/string/number/result containers and `==` vs `===` examples; verify unit tests pass
- [x] 2.10 Register `coercion` and verify `/topics/coercion` plus e2e pass
- [x] 2.11 Add the `event-propagation` module with capture/target/bubble/document containers and delegation examples; verify unit tests pass
- [x] 2.12 Register `event-propagation` and verify `/topics/event-propagation` plus e2e pass
- [x] 2.13 Add the `promises` module with pending/fulfilled/rejected/microtask containers and chaining/error examples; verify unit tests pass
- [x] 2.14 Register `promises` and verify `/topics/promises` plus e2e pass
- [x] 2.15 Add the `async-await` module with sync/suspended/microtask/resumed containers and suspension examples; verify unit tests pass
- [x] 2.16 Register `async-await` and verify `/topics/async-await` plus e2e pass

## 3. CSS Topics

- [x] 3.1 Add the `css-box-model` module and `BoxModelStage` rendering content/padding/border/margin with `box-sizing` examples; verify unit tests pass and `/topics/css-box-model` renders
- [x] 3.2 Register `css-box-model` in the barrel/manifest and verify the parametrized e2e passes
- [x] 3.3 Add the `css-positioning` module and `PositioningStage` covering static/relative/absolute/fixed and containing blocks; verify unit tests pass and `/topics/css-positioning` renders
- [x] 3.4 Register `css-positioning` and verify e2e passes
- [x] 3.5 Add the `css-specificity` module and `SpecificityStage` showing the (a,b,c,d) matrix and cascade resolution; verify unit tests pass and `/topics/css-specificity` renders
- [x] 3.6 Register `css-specificity` and verify e2e passes
- [x] 3.7 Add the `css-flexbox` module and `FlexboxStage` covering main/cross axis, grow/shrink/basis, and alignment; verify unit tests pass and `/topics/css-flexbox` renders
- [x] 3.8 Register `css-flexbox` and verify e2e passes
- [x] 3.9 Add the `css-grid` module and `GridStage` covering tracks, placement, and areas; verify unit tests pass and `/topics/css-grid` renders
- [x] 3.10 Register `css-grid` and verify e2e passes
- [x] 3.11 Add the `css-bfc` module and `BfcStage` covering float containment and margin collapse; verify unit tests pass and `/topics/css-bfc` renders
- [x] 3.12 Register `css-bfc` and verify e2e passes
- [x] 3.13 Add the `css-stacking` module and `StackingStage` covering stacking contexts, z-index, and paint order; verify unit tests pass and `/topics/css-stacking` renders
- [x] 3.14 Register `css-stacking` and verify e2e passes

## 4. DOM Topics

- [x] 4.1 Add the `dom-lifecycle` module with parsing/DOMContentLoaded/load/readyState containers and lifecycle examples; verify unit tests pass
- [x] 4.2 Register `dom-lifecycle` and verify `/topics/dom-lifecycle` plus e2e pass
- [x] 4.3 Add the `dom-attr-vs-prop` module with attribute/property/reflected/live containers and reflection examples; verify unit tests pass
- [x] 4.4 Register `dom-attr-vs-prop` and verify `/topics/dom-attr-vs-prop` plus e2e pass

## 5. Integration And Verification

- [x] 5.1 Audit every new topic's narration and examples against its spec scenarios; verify each requirement has at least one corresponding step or UI behavior
- [x] 5.2 Run `pnpm typecheck`, `pnpm lint`, and `pnpm format:check`; verify all pass
- [x] 5.3 Run `pnpm test` and verify all shared and per-topic unit tests pass
- [x] 5.4 Run `pnpm build` and verify the production build succeeds
- [x] 5.5 Run `pnpm test:e2e` and verify existing plus parametrized specs pass across configured browsers
- [x] 5.6 Verify `/topics` lists all 19 topics with titles and descriptions and each link resolves to its visualizer

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result and that the new capabilities appear under `openspec/specs/`.
