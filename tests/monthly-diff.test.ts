import { describe, expect, it } from "vitest";
import { buildMonthlyDiff } from "../scripts/compare-monthly.js";

describe("monthly diff", () => {
  it("marks first-run data as added when no previous snapshot exists", async () => {
    const diff = await buildMonthlyDiff("2026-07");
    expect(diff.chips.added.length).toBeGreaterThan(0);
    expect(diff.vehicles.added.length).toBeGreaterThan(0);
    expect(diff.month).toBe("2026-07");
  });
});
