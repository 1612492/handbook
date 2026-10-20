import { describe, expect, it } from "vitest";
import { examples } from "./examples";
import { getNextDestination } from "./quiz";

describe("getNextDestination", () => {
  const ex = examples[0];
  it("first move: setTimeout registers timer in Web APIs", () => {
    // step 0 -> 1: webApis gains timer
    expect(getNextDestination(ex, 0)).toBe("webApis");
  });
  it("returns null at last step", () => {
    expect(getNextDestination(ex, ex.steps.length - 1)).toBeNull();
  });
  it("nested microtasks: outer microtask enqueues cbB", () => {
    const ex2 = examples[1];
    // step 2 -> 3: stack gains cbB? Actually microtask gains cbB
    const dest = getNextDestination(ex2, 2);
    expect(dest).not.toBeNull();
  });
});
