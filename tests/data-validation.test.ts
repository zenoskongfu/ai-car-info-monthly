import { describe, expect, it } from "vitest";
import { readJson } from "../scripts/lib.js";
import { validateAll } from "../scripts/validate-data.js";

describe("data validation", () => {
  it("passes schema and cross-file checks", async () => {
    await expect(validateAll()).resolves.toBeUndefined();
  });

  it("keeps vehicle-installed compute separate from chip platform maximums", async () => {
    const vehicles = await readJson<Array<{ id: string; totalCompute: { value: number | null; precision: string; notes: string } }>>(
      "data/vehicles.json"
    );
    const yu7 = vehicles.find((vehicle) => vehicle.id === "xiaomi-yu7-2026");

    expect(yu7?.totalCompute.value).toBe(700);
    expect(yu7?.totalCompute.precision).toBe("unknown");
    expect(yu7?.totalCompute.notes).toContain("装车");
    expect(yu7?.totalCompute.notes).toContain("1000 INT8 TOPS平台上限");
  });
});
