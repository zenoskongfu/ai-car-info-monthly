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

  it("tracks XPeng Turing single-chip effective compute and installed vehicle compute separately", async () => {
    const chips = await readJson<Array<{ id: string; compute: { value: number | null; precision: string; notes: string } }>>(
      "data/chips.json"
    );
    const vehicles = await readJson<Array<{ id: string; chipCount: number | null; totalCompute: { value: number | null } }>>(
      "data/vehicles.json"
    );
    const turing = chips.find((chip) => chip.id === "xpeng-turing-ai");
    const mona = vehicles.find((vehicle) => vehicle.id === "xpeng-mona-m03-ultra-se-2026");
    const p7 = vehicles.find((vehicle) => vehicle.id === "xpeng-p7-2026");
    const g7 = vehicles.find((vehicle) => vehicle.id === "xpeng-g7-ultra-2026");
    const g9 = vehicles.find((vehicle) => vehicle.id === "xpeng-g9-2026-ultra");

    expect(turing?.compute.value).toBe(750);
    expect(turing?.compute.precision).toBe("unknown");
    expect(turing?.compute.notes).toContain("有效算力");
    expect(mona?.chipCount).toBe(2);
    expect(mona?.totalCompute.value).toBe(1500);
    expect(p7?.chipCount).toBe(3);
    expect(p7?.totalCompute.value).toBe(2250);
    expect(g7?.chipCount).toBe(3);
    expect(g7?.totalCompute.value).toBe(2250);
    expect(g9?.chipCount).toBe(3);
    expect(g9?.totalCompute.value).toBeNull();
  });
});
