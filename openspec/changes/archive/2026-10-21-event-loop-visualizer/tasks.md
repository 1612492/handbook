# Tasks

## 1. Setup and Dependencies

- [x] 1.1 Add `motion` to `package.json` and install; verify `pnpm install` succeeds and `pnpm typecheck` passes
- [x] 1.2 Create directory scaffolding (`src/features/topics/`, `src/components/visualizer/`) and verify paths resolve under `@/*`

## 2. Topic Catalog and Routing

- [x] 2.1 Implement topic registry module exporting topic metadata and components; verify a topic can be registered and looked up by id
- [x] 2.2 Add `/topics` index route rendering the catalog with titles and descriptions; verify route renders all registered topics
- [x] 2.3 Add `/topics/$topicId` dynamic route resolving from the registry with a not-found component for unknown ids; verify unknown id shows not-found
- [x] 2.4 Register the event loop topic in the registry (placeholder component) and verify catalog navigation reaches its route
- [x] 2.5 Update `ARCHITECTURE.md` with new routes and topic data flow; verify documented paths match created files

## 3. Step-Timeline Model and Examples

- [x] 3.1 Define TypeScript types for `Chip`, `Step`, and container state; verify typecheck passes
- [x] 3.2 Implement pure reducer/derivation from `stepIndex` to rendered state; verify unit tests cover initial, mid, and final steps
- [x] 3.3 Author curated examples (setTimeout vs Promise, nested microtasks, async/await) with narration and active lines; verify each example's output order matches its expected array via unit test
- [x] 3.4 Add invariants tests (output order, microtask-drain rule) and verify they pass

## 4. Visualizer Island (Core UI)

- [x] 4.1 Implement `ClientOnly`-wrapped visualizer island rendering four containers; verify no hydration warnings in dev
- [x] 4.2 Render chips in containers driven by step state; verify chips reflect the active step's containers
- [x] 4.3 Implement playback controls (play/pause, next, previous, reset) and speed selector; verify each control changes step/state as specified
- [x] 4.4 Implement scrubber seeking to an arbitrary step; verify seeking updates state without auto-advancing
- [x] 4.5 Implement code view with moving highlight bar synced to active line; verify highlight tracks step changes
- [x] 4.6 Implement narration panel and output log; verify output appends in production order
- [x] 4.7 Add Playwright smoke test for catalog navigation and a basic playback flow; verify test passes

## 5. Motion Animation Layer

- [x] 5.1 Wrap visualizer in `LazyMotion` + `domAnimation` and apply `layout` to chips; verify cross-container moves animate
- [x] 5.2 Add `AnimatePresence` enter/exit transitions for chips; verify enqueue/dequeue animate without layout jumps
- [x] 5.3 Implement tween/spring timing split (move tween, arrival spring) and instant step-back; verify manual scrubbing stays responsive
- [x] 5.4 Wire `useReducedMotion` to disable non-essential movement; verify reduced-motion mode keeps state changes but no movement
- [x] 5.5 Add e2e or visual check for reduced-motion behavior; verify no console errors

## 6. Quiz Mode

- [x] 6.1 Implement predict-next mode hiding the next step and prompting for destination container; verify prompt appears and input is captured
- [x] 6.2 Reveal answer and correctness on response; verify correct/incorrect indications match the next step
- [x] 6.3 Add tests for quiz correctness logic; verify they pass

## 7. Integration and Verification

- [x] 7.1 Run `pnpm typecheck`, `pnpm lint`, `pnpm build` and verify all pass
- [x] 7.2 Run `pnpm test:e2e` and verify all specs pass
- [x] 7.3 Manual smoke: load `/topics`, open event loop, play full example, scrub, quiz; verify no errors and smooth animation
