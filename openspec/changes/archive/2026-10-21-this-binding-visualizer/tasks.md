# Tasks

## 1. Setup and Scaffolding

- [x] 1.1 Create directory `src/features/topics/this-binding/` and verify paths resolve under `@/*`
- [x] 1.2 Create barrel entry `src/features/topics/this-binding/index.tsx` registering the topic (placeholder component) and verify it compiles
- [x] 1.3 Add side-effect import in `src/features/topics/index.ts` and verify the topic appears in the catalog at `/topics`

## 2. Step-Timeline Model and Examples

- [x] 2.1 Define TypeScript types (`ContainerId`, `Chip`, `Step`, `StepContainers`, `Example`, `DerivedState`) in `model.ts` and verify `pnpm typecheck` passes
- [x] 2.2 Implement `deriveState`, `clampIndex`, and `emptyContainers` helpers and verify unit tests cover initial, mid, and final steps
- [x] 2.3 Author curated examples (default, implicit, explicit via `call`/`apply`/`bind`, `new`, arrow/lexical, strict mode, detached-method and callback pitfalls) with narration and active lines, and verify each example's output order matches its expected array via unit test
- [x] 2.4 Implement `quiz.ts` `getNextDestination` and verify unit tests cover a representative move and the last-step null case
- [x] 2.5 Add invariants tests (exactly one container holds the chip per step; output order matches expected) and verify they pass

## 3. Visualizer Island (Core UI)

- [x] 3.1 Implement `ClientOnly`-wrapped visualizer island rendering five binding-target containers and verify no hydration warnings in dev
- [x] 3.2 Render the resolved-`this` chip in containers driven by step state and verify chips reflect the active step
- [x] 3.3 Implement playback controls (play/pause, next, previous, reset) and speed selector and verify each control changes step/state as specified
- [x] 3.4 Implement scrubber seeking to an arbitrary step and verify seeking updates state without auto-advancing
- [x] 3.5 Implement code view with moving highlight bar synced to active line and verify highlight tracks step changes
- [x] 3.6 Implement narration panel and `this`-value output log and verify output appends in production order
- [x] 3.7 Add Playwright smoke test for catalog navigation and a basic playback flow and verify it passes

## 4. Motion Animation Layer

- [x] 4.1 Wrap visualizer in `LazyMotion` + `domAnimation` and apply `layout` to chips and verify cross-container moves animate
- [x] 4.2 Add `AnimatePresence` enter/exit transitions for chips and verify enqueue/dequeue animate without layout jumps
- [x] 4.3 Implement tween/spring timing split (move tween, arrival spring) and instant step-back and verify manual scrubbing stays responsive
- [x] 4.4 Wire `useReducedMotion` to disable non-essential movement and verify reduced-motion mode keeps state changes but no movement
- [x] 4.5 Add e2e or visual check for reduced-motion behavior and verify no console errors

## 5. Quiz Mode

- [x] 5.1 Implement predict-next mode hiding the next step and prompting for a binding target and verify prompt appears and input is captured
- [x] 5.2 Reveal answer and correctness on response and verify correct/incorrect indications match the next step
- [x] 5.3 Add tests for quiz correctness logic and verify they pass

## 6. Integration and Verification

- [x] 6.1 Update `ARCHITECTURE.md` with the new topic module and data flow and verify documented paths match created files
- [x] 6.2 Run `pnpm typecheck`, `pnpm lint`, `pnpm build` and verify all pass
- [x] 6.3 Run `pnpm test:e2e` and verify all specs pass

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
