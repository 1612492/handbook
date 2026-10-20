import {
  emptyContainers as sharedEmptyContainers,
  type Chip as SharedChip,
  type DerivedState as SharedDerivedState,
  type Example as SharedExample,
  type Step as SharedStep,
  type StepContainers as SharedStepContainers,
} from "../shared/model";

export type ContainerId = "static" | "relative" | "absolute" | "fixed";

export const ALL_CONTAINERS: ContainerId[] = [
  "static",
  "relative",
  "absolute",
  "fixed",
];

export type Chip = SharedChip;
export type StepContainers = SharedStepContainers<ContainerId>;
export type Step = SharedStep<ContainerId>;
export type Example = SharedExample<ContainerId>;
export type DerivedState = SharedDerivedState<ContainerId>;

export function emptyContainers(): StepContainers {
  return sharedEmptyContainers(ALL_CONTAINERS);
}

export { deriveState, clampIndex, makeContainers } from "../shared/model";
