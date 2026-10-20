import type { ComponentType, ReactNode } from "react";
import type {
  DerivedState,
  Example,
  Step,
} from "@/features/topics/shared/model";

export interface ContainerDef {
  label: string;
  /** Tailwind classes for the container frame. */
  className: string;
  /** Tailwind class for the container's status dot. */
  dotClassName: string;
}

export interface StageProps<C extends string> {
  example: Example<C>;
  step: Step<C>;
  derived: DerivedState<C>;
  containers: readonly C[];
  containerDefs: Record<C, ContainerDef>;
  reduced: boolean;
  lastAction: "seek" | "step";
}

export interface TopicFooter {
  title: string;
  body: ReactNode;
}

export interface StepVisualizerConfig<C extends string> {
  containers: readonly C[];
  containerDefs: Record<C, ContainerDef>;
  examples: Example<C>[];
  getExample: (id: string) => Example<C> | undefined;
  getNextDestination: (example: Example<C>, fromIndex: number) => C | null;
  heading: string;
  subtitle: string;
  outputLabel: string;
  quizPrompt: string;
  correctMessage?: string;
  footer: TopicFooter;
  /** Optional custom stage. Defaults to the container/chip stage. */
  stage?: ComponentType<StageProps<C>>;
  /** Shiki language for the code panel. Defaults to javascript. */
  language?: "javascript" | "css" | "html";
}
