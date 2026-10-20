# Design

## Context

The current visualizers (`EventLoopVisualizer.tsx`, `ThisBindingVisualizer.tsx`) are ~690 lines each and differ only in container configuration, copy, and the example/model/quiz modules they import. The topic registry and catalog are already generic: `defineTopic({ id, title, description, Component })` plus a side-effect import in `src/features/topics/index.ts` is enough to make a topic appear at `/topics` and `/topics/$topicId`. See `proposal.md` for motivation and the 17 new capability specs for required behavior.

Constraints:

- Existing `event-loop` and `this-binding` behavior and e2e specs must keep passing unchanged.
- Visualizers are client-only islands (`ClientOnly`) inside an SSR route shell.
- Pure steps are data-driven (`Chip`, `Step`, `StepContainers`, `Example`, `deriveState`, `clampIndex`, `getNextDestination`), with no code execution.
- CSS topics need stage rendering that is not "chips in labeled containers" (boxes, tracks, layers), so the engine must not hard-code the container stage.

## Goals / Non-Goals

**Goals:**

- One playback shell that owns reducer/state, controls, scrubber, auto-play, code highlight, narration, output log, quiz mode, and reduced-motion behavior.
- A pluggable stage so JS topics keep the container/chip stage and CSS topics can render real boxes/tracks/layers.
- A shared step-timeline model and quiz helper so per-topic modules are data + a thin wrapper.
- Add all 17 topics with unit tests and one parametrized e2e suite, without duplicating the ~690-line component.

**Non-Goals:**

- Executing arbitrary user code to derive state (curated examples only).
- Persisting progress/quiz scores.
- Changing the `topic-catalog` contract or the existing `event-loop-visualization` / `this-binding-visualization` requirements.
- Non-visualizable trivia, system design, coding exercises, and optional low-priority topics (`currying`, `mutable-vs-immutable`).

## Decisions

### D1: Playback shell + pluggable stage

`StepVisualizer` becomes the single shell. It accepts a config object and a `stage` renderer:

```ts
interface StepVisualizerConfig<C extends string> {
  containers: readonly C[]; // order shown in the stage/quiz
  containerDefs: Record<
    C,
    { label: string; className: string; dotClassName: string }
  >;
  examples: Example<C>[];
  getExample: (id: string) => Example<C> | undefined;
  getNextDestination: (example: Example<C>, fromIndex: number) => C | null;
  heading: string;
  subtitle: string;
  outputLabel: string;
  quizPrompt: string;
  footer: { title: string; body: string; href: string; linkLabel: string };
  stage?: (props: StageProps<C>) => ReactNode; // defaults to ContainerStage
}
```

- `ContainerStage` is the existing containers-with-chips UI (used by JS and DOM topics).
- CSS topics pass a custom `stage` (e.g. `BoxModelStage`, `FlexboxStage`) that renders boxes/tracks from the same `Step` data. The shell still owns controls, code, narration, output, and quiz.
- **Why:** preserves the existing visual language for JS topics while allowing CSS topics to be genuinely visual instead of forcing boxes into queue-like containers.
- **Alternative considered:** one config-only engine with chips for every topic. Rejected: CSS layout/paint topics would be misleading.

### D2: Shared timeline model

Add `src/features/topics/shared/model.ts` and `shared/quiz.ts` with the generic types/helpers currently duplicated in each topic:

```ts
type Chip = { id: string; label: string };
type StepContainers<C extends string> = Record<C, Chip[]>;
type Step<C extends string> = {
  id;
  activeLine;
  narration;
  containers;
  outputAppend?;
  focus: C | "none";
};
type Example<C extends string> = { id; title; code; steps; expectedOutput };
```

`deriveState`, `clampIndex`, `emptyContainers`, and `getNextDestination` move there. Each topic's `model.ts` re-exports the shared types specialized to its own `ContainerId` union, so existing imports keep working.

- **Why:** removes the second copy of timeline logic and guarantees identical playback semantics across topics.
- **Alternative considered:** keep per-topic model copies. Rejected: 17 more copies would drift.

### D3: Thin per-topic wrappers

Each topic directory keeps the established shape:

```
src/features/topics/<topic>/
  model.ts      // ContainerId union + re-exported shared types
  examples.ts   // curated steps, code, narration, expected output
  quiz.ts       // re-export shared getNextDestination (or topic-specific override)
  index.tsx     // defineTopic({...}) + <ClientOnly><StepVisualizer .../></ClientOnly>
  model.test.ts // invariants
  quiz.test.ts  // destination logic
```

The wrapper supplies static imports (examples/model/quiz) and copy. No dynamic imports, so SSR and tree-shaking stay predictable.

- **Why:** type-safe per-topic `ContainerId`s while keeping the engine generic.
- **Alternative considered:** a runtime topic registry with dynamic imports. Rejected: unnecessary complexity and harder type safety.

### D4: Container definitions and stage ownership

JS/DOM topics use `ContainerStage` with these container sets:

| Topic             | Container ids                                            |
| ----------------- | -------------------------------------------------------- |
| closures          | `global`, `outer`, `inner`, `closure`                    |
| hoisting          | `tdz`, `hoisted`, `initialized`, `executed`              |
| scoping           | `global`, `function`, `block`, `loop`                    |
| prototypes        | `instance`, `prototype`, `objectPrototype`, `endOfChain` |
| coercion          | `input`, `primitive`, `string`, `number`, `result`       |
| event-propagation | `capture`, `target`, `bubble`, `document`                |
| promises          | `pending`, `fulfilled`, `rejected`, `microtask`          |
| async-await       | `sync`, `suspended`, `microtask`, `resumed`              |
| dom-lifecycle     | `parsing`, `domContentLoaded`, `load`, `readyState`      |
| dom-attr-vs-prop  | `attribute`, `property`, `reflected`, `live`             |

CSS topics use custom stages:

| Topic           | Stage                                   | Containers                                 |
| --------------- | --------------------------------------- | ------------------------------------------ |
| css-box-model   | `BoxModelStage` (nested layers)         | `content`, `padding`, `border`, `margin`   |
| css-positioning | `PositioningStage` (flow + offsets)     | `static`, `relative`, `absolute`, `fixed`  |
| css-specificity | `SpecificityStage` (a,b,c,d columns)    | `inline`, `id`, `class`, `type`            |
| css-flexbox     | `FlexboxStage` (main/cross axis tracks) | `main`, `cross`, `grow`, `shrink`          |
| css-grid        | `GridStage` (rows/columns/areas)        | `rows`, `columns`, `placement`, `areas`    |
| css-bfc         | `BfcStage` (float containment)          | `flow`, `float`, `bfc`, `cleared`          |
| css-stacking    | `StackingStage` (layers)                | `context`, `zIndex`, `paint`, `composited` |

Each stage receives `{ example, step, derived, containerDefs, reduced }` and is responsible only for rendering; it never owns playback state. `focus` drives emphasis. Chips/boxes animate with `motion` `layout` where applicable, gated by `useReducedMotion`.

### D5: Copy and labels are config, not code

Heading (`X Visualizer`), subtitle, output label, quiz prompt, and the "What is X?" footer link move into config. The shell renders them consistently. This removes the remaining hard-coded differences between the two existing visualizers.

### D6: Testing strategy

- Shared unit tests in `src/features/topics/shared/*.test.ts`: `deriveState`, `clampIndex`, `getNextDestination`.
- Per-topic `model.test.ts`: expected output order, first/last step flags, and that each step is well-formed (at most one focus target for single-value topics).
- Per-topic `quiz.test.ts`: a representative move and the last-step null case.
- One parametrized `e2e/topics.spec.ts` over a manifest of `{ id, title }` covering catalog navigation, Next/Reset, scrubber, and quiz prompt. Keep the manifest in `src/features/topics/topic-manifest.ts` and add a unit test asserting `listTopics()` ids match it, to prevent drift.
- Existing `e2e/event-loop.spec.ts` and `e2e/this-binding.spec.ts` must pass unchanged after the refactor.

### D7: Phasing

1. Refactor: shared model/quiz, `StepVisualizer` shell, `ContainerStage`, migrate `event-loop` and `this-binding`, keep specs green.
2. JS runtime topics: closures, hoisting, scoping, prototypes, coercion, event-propagation, promises, async-await.
3. CSS topics: box model, positioning, specificity, flexbox, grid, BFC, stacking (with custom stages).
4. DOM topics: lifecycle, attribute vs property.
5. Docs (`ARCHITECTURE.md`) and full verification.

Each topic is independently shippable; tasks are ordered to allow stopping between phases.

## Risks / Trade-offs

- [Risk] Refactor regresses the two shipping visualizers → Mitigation: migrate first, run existing e2e + unit tests before adding topics; keep behavior and DOM roles identical.
- [Risk] CSS stages expand scope beyond the chip model → Mitigation: stage is a render slot; keep each stage presentational and driven by the same `Step` data; start with simple static boxes + focus emphasis, then add motion.
- [Risk] 17 topics × curated narration is a large authoring surface and errors are easy → Mitigation: per-topic invariants (output order, expected arrays), small step counts, reviewable examples, and a shared authoring shape.
- [Risk] e2e manifest drifts from the registry → Mitigation: unit test compares `topic-manifest.ts` ids to `listTopics()`.
- [Risk] Bundle growth from 17 client islands → Mitigation: islands are route-split by the router; each topic imports only its own data and the shared shell; motion stays behind `LazyMotion`/`domAnimation`.
- [Risk] Generic engine over-fits JS topics and CSS stages feel bolted on → Mitigation: define `StageProps` early and prototype one CSS stage during the refactor phase before authoring the rest.

## Migration Plan

1. Add shared model/quiz and `StepVisualizer` + `ContainerStage`; no topic changes yet.
2. Move `event-loop` and `this-binding` to thin wrappers; run `pnpm test`, `pnpm typecheck`, `pnpm test:e2e` to confirm parity.
3. Add topics in phases (JS → CSS → DOM), running unit tests per topic and the parametrized e2e at phase boundaries.
4. Update `ARCHITECTURE.md`.
5. Rollback: the refactor is internal; reverting the change directory and the touched topic folders restores the prior state. No data migration.

## Open Questions

- None blocking. Exact example copy, step counts, and CSS stage visual details can be refined during implementation without changing the specs or the phased task breakdown.
