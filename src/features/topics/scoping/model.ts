import {
  emptyContainers as sharedEmptyContainers,
  type Chip as SharedChip,
  type DerivedState as SharedDerivedState,
  type Example as SharedExample,
  type Step as SharedStep,
  type StepContainers as SharedStepContainers,
} from "../shared/model";

export type ContainerId =
  | "global"
  | "functionScope"
  | "blockScope"
  | "loopScope";

export const ALL_CONTAINERS: ContainerId[] = [
  "global",
  "functionScope",
  "blockScope",
  "loopScope",
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
