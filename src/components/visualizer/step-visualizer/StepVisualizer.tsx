import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
import { useEffect, useReducer, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { clampIndex, deriveState } from "@/features/topics/shared/model";
import { cn } from "@/lib/utils";
import { CodeView } from "./CodeView";
import { ContainerStage } from "./ContainerStage";
import { NarrationText } from "./NarrationText";
import type { StageProps, StepVisualizerConfig } from "./types";

type Speed = 0.25 | 0.5 | 1 | 2;

interface State<C extends string> {
  exampleId: string;
  stepIndex: number;
  playing: boolean;
  speed: Speed;
  quizMode: boolean;
  quizGuess: C | null;
  quizRevealed: boolean;
  quizCorrect: boolean;
  lastAction: "seek" | "step";
}

type Action<C extends string> =
  | { type: "SET_EXAMPLE"; id: string }
  | { type: "STEP_NEXT" }
  | { type: "STEP_PREV" }
  | { type: "SEEK"; index: number }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_SPEED"; speed: Speed }
  | { type: "TOGGLE_QUIZ" }
  | { type: "GUESS"; guess: C };

function initialState<C extends string>(exampleId: string): State<C> {
  return {
    exampleId,
    stepIndex: 0,
    playing: false,
    speed: 1,
    quizMode: false,
    quizGuess: null,
    quizRevealed: false,
    quizCorrect: false,
    lastAction: "step",
  };
}

function baseReducer<C extends string>(
  config: StepVisualizerConfig<C>,
  state: State<C>,
  action: Action<C>,
): State<C> {
  const example = config.getExample(state.exampleId) ?? config.examples[0];
  const total = example.steps.length;
  switch (action.type) {
    case "SET_EXAMPLE":
      return { ...initialState<C>(action.id), speed: state.speed };
    case "STEP_NEXT":
      if (state.stepIndex >= total - 1) return { ...state, playing: false };
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
        quizGuess: null,
        quizRevealed: false,
        quizCorrect: false,
      };
    case "STEP_PREV":
      return {
        ...state,
        stepIndex: clampIndex(state.stepIndex - 1, total),
        playing: false,
        quizGuess: null,
        quizRevealed: false,
        quizCorrect: false,
      };
    case "SEEK":
      return {
        ...state,
        stepIndex: clampIndex(action.index, total),
        playing: false,
        quizGuess: null,
        quizRevealed: false,
        quizCorrect: false,
      };
    case "PLAY":
      return { ...state, playing: true };
    case "PAUSE":
      return { ...state, playing: false };
    case "SET_SPEED":
      return { ...state, speed: action.speed };
    case "TOGGLE_QUIZ":
      return {
        ...state,
        quizMode: !state.quizMode,
        quizGuess: null,
        quizRevealed: false,
        quizCorrect: false,
        playing: false,
      };
    case "GUESS": {
      if (state.stepIndex >= total - 1) return state;
      const correct =
        action.guess === config.getNextDestination(example, state.stepIndex);
      return {
        ...state,
        quizGuess: action.guess,
        quizRevealed: true,
        quizCorrect: correct,
        stepIndex: state.stepIndex + 1,
      };
    }
    default:
      return state;
  }
}

export function StepVisualizer<C extends string>({
  config,
}: {
  config: StepVisualizerConfig<C>;
}) {
  const [state, dispatch] = useReducer(
    (current: State<C>, action: Action<C>): State<C> => {
      const next = baseReducer(config, current, action);
      return {
        ...next,
        lastAction: action.type === "SEEK" ? "seek" : "step",
      };
    },
    config.examples[0].id,
    (id) => initialState<C>(id),
  );

  const example = config.getExample(state.exampleId) ?? config.examples[0];
  const derived = deriveState(example, state.stepIndex);
  const reduced = useReducedMotion();
  const Stage = (config.stage ?? ContainerStage) as ComponentType<
    StageProps<C>
  >;

  useEffect(() => {
    if (!state.playing || state.quizMode) return;
    if (state.stepIndex >= example.steps.length - 1) {
      dispatch({ type: "PAUSE" });
      return;
    }
    const delay = 700 / state.speed;
    const timer = setTimeout(() => dispatch({ type: "STEP_NEXT" }), delay);
    return () => clearTimeout(timer);
  }, [
    state.playing,
    state.stepIndex,
    state.speed,
    state.quizMode,
    example.steps.length,
  ]);

  const revealedDest = state.quizRevealed
    ? config.getNextDestination(example, state.stepIndex - 1)
    : null;

  const highlightTerms = config.containers.map((cid) => ({
    term: config.containerDefs[cid].label,
    className: "rounded bg-muted px-0.5 text-foreground",
  }));

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="mx-auto flex w-full flex-col gap-6 px-4 py-8 sm:px-6"
        data-testid="step-visualizer"
      >
        <header className="flex flex-col gap-3">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {config.heading}
            </h1>
            <p className="text-sm text-muted-foreground">{config.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.examples.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => dispatch({ type: "SET_EXAMPLE", id: ex.id })}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  state.exampleId === ex.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {ex.title}
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <CodeView
              code={example.code}
              activeLine={derived.step.activeLine}
              language={config.language}
            />
            <div className="shrink-0 rounded-2xl border border-border/70 bg-card/80 p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {derived.stepIndex + 1}
                </span>
                <p
                  className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
                  data-testid="step-counter"
                >
                  Step {derived.stepIndex + 1} of {derived.totalSteps}
                </p>
              </div>
              <p className="mt-3 text-base leading-7">
                <NarrationText
                  text={derived.step.narration}
                  terms={highlightTerms}
                />
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-border/70 bg-card/80 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {config.outputLabel}
              </p>
              <pre className="mt-2 min-h-[3rem] text-sm">
                {derived.output.join("\n")}
              </pre>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Stage
              example={example}
              step={derived.step}
              derived={derived}
              containers={config.containers}
              containerDefs={config.containerDefs}
              reduced={reduced ?? false}
              lastAction={state.lastAction}
            />

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="rounded-md border border-border px-3 py-1.5 text-sm"
                onClick={() => dispatch({ type: "STEP_PREV" })}
                disabled={derived.isFirst}
              >
                Prev
              </Button>
              {state.playing ? (
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="rounded-md border border-border px-3 py-1.5 text-sm"
                  onClick={() => dispatch({ type: "PAUSE" })}
                >
                  Pause
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="rounded-md border border-border px-3 py-1.5 text-sm"
                  onClick={() => dispatch({ type: "PLAY" })}
                  disabled={derived.isLast || state.quizMode}
                >
                  Play
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="rounded-md border border-border px-3 py-1.5 text-sm"
                onClick={() => dispatch({ type: "STEP_NEXT" })}
                disabled={derived.isLast}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="rounded-md border border-border px-3 py-1.5 text-sm"
                onClick={() => dispatch({ type: "SEEK", index: 0 })}
              >
                Reset
              </Button>
              <Select
                value={String(state.speed)}
                onValueChange={(v) => {
                  if (v) {
                    dispatch({
                      type: "SET_SPEED",
                      speed: Number(v) as Speed,
                    });
                  }
                }}
              >
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.25">0.25x</SelectItem>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="rounded-md border border-border px-3 py-1.5 text-sm"
                onClick={() => dispatch({ type: "TOGGLE_QUIZ" })}
              >
                {state.quizMode ? "Exit quiz" : "Quiz mode"}
              </Button>
            </div>

            <Slider
              min={0}
              max={derived.totalSteps - 1}
              value={[derived.stepIndex]}
              onValueChange={(v) => {
                const arr = Array.isArray(v) ? v : [v];
                dispatch({ type: "SEEK", index: Number(arr[0]) });
              }}
              className="w-full"
              aria-label="Step scrubber"
            />

            {state.quizMode && !derived.isLast && (
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
                <p className="text-sm font-medium" data-testid="quiz-prompt">
                  {config.quizPrompt}
                </p>
                {!state.quizRevealed ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {config.containers.map((cid) => (
                      <Button
                        variant="outline"
                        size="sm"
                        key={cid}
                        type="button"
                        className="rounded-md border border-border px-3 py-1.5 text-sm"
                        onClick={() => dispatch({ type: "GUESS", guess: cid })}
                      >
                        {config.containerDefs[cid].label}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm">
                    {state.quizCorrect
                      ? (config.correctMessage ?? "Correct!")
                      : `Incorrect. It went to ${
                          revealedDest
                            ? config.containerDefs[revealedDest].label
                            : "—"
                        }.`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <details className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <summary className="cursor-pointer font-medium">
            {config.footer.title}
          </summary>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {config.footer.body}
          </div>
        </details>
      </div>
    </LazyMotion>
  );
}
