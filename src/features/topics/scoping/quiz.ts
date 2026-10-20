import { getNextDestination as sharedGetNextDestination } from "../shared/quiz";
import { ALL_CONTAINERS, type ContainerId, type Example } from "./model";

export function getNextDestination(
  example: Example,
  fromIndex: number,
): ContainerId | null {
  return sharedGetNextDestination(example, fromIndex, ALL_CONTAINERS);
}
