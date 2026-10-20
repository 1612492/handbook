export interface Chip {
  id: string;
  label: string;
}

export type StepContainers<C extends string> = Record<C, Chip[]>;

export interface Step<C extends string> {
  id: string;
  activeLine: number;
  narration: string;
  containers: StepContainers<C>;
  outputAppend?: string;
  focus: C | "none";
}

export interface Example<C extends string> {
  id: string;
  title: string;
  code: string;
  steps: Step<C>[];
  expectedOutput: string[];
}

export interface DerivedState<C extends string> {
  step: Step<C>;
  stepIndex: number;
  totalSteps: number;
  output: string[];
  isFirst: boolean;
  isLast: boolean;
}

export function emptyContainers<C extends string>(
  containers: readonly C[],
): StepContainers<C> {
  const out = {} as StepContainers<C>;
  for (const id of containers) out[id] = [];
  return out;
}

/**
 * Build a step container map from a partial record of chip labels. Keeps
 * example files terse while guaranteeing every container key exists.
 */
export function makeContainers<C extends string>(
  containers: readonly C[],
  entries: Partial<Record<C, string[]>> = {},
): StepContainers<C> {
  const out = {} as StepContainers<C>;
  for (const id of containers) {
    out[id] = (entries[id] ?? []).map((label) => ({ id: label, label }));
  }
  return out;
}

export function deriveState<C extends string>(
  example: Example<C>,
  stepIndex: number,
): DerivedState<C> {
  const clamped = clampIndex(stepIndex, example.steps.length);
  const step = example.steps[clamped];
  const output: string[] = [];
  for (let i = 0; i <= clamped; i++) {
    const s = example.steps[i];
    if (s.outputAppend) output.push(s.outputAppend);
  }
  return {
    step,
    stepIndex: clamped,
    totalSteps: example.steps.length,
    output,
    isFirst: clamped === 0,
    isLast: clamped === example.steps.length - 1,
  };
}

export function clampIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(index, length - 1));
}
