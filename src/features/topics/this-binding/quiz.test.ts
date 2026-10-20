import { describe, expect, it } from "vitest";
import { examples } from "./examples";
import { getNextDestination } from "./quiz";

describe("getNextDestination", () => {
  const ex = examples[0];
  it("returns null at last step", () => {
    expect(getNextDestination(ex, ex.steps.length - 1)).toBeNull();
  });
  const exImplicit = examples[1];
  it("implicit binding: call site step moves to implicit", () => {
    const dest = getNextDestination(exImplicit, 0);
    expect(dest).toBe("implicit");
  });
});
