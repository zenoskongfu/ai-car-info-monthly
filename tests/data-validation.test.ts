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

  it("uses current official sources for current Xiaomi SU7 compute", async () => {
    const vehicles = await readJson<
      Array<{ id: string; modelYear: number; chipIds: string[]; totalCompute: { value: number | null; notes: string }; sourceIds: string[] }>
    >("data/vehicles.json");
    const su7 = vehicles.find((vehicle) => vehicle.id === "xiaomi-su7-2026");
    const staleSu7 = vehicles.find((vehicle) => vehicle.id === "xiaomi-su7-2024");

    expect(staleSu7).toBeUndefined();
    expect(su7?.modelYear).toBe(2026);
    expect(su7?.chipIds).toEqual(["nvidia-thor"]);
    expect(su7?.totalCompute.value).toBe(700);
    expect(su7?.totalCompute.notes).toContain("装车口径");
    expect(su7?.sourceIds).toEqual(["source-xiaomi-su7-2026", "source-xiaomi-pilot"]);
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
    expect(g9?.totalCompute.value).toBe(2250);
  });

  it("does not use stale model-year sources for current vehicles", async () => {
    const vehicles = await readJson<Array<{ id: string; modelYear: number; sourceIds: string[] }>>("data/vehicles.json");
    const sources = await readJson<Array<{ id: string; title: string; url: string; publishedAt: string; sourceType: string }>>(
      "data/sources.json"
    );
    const sourceMap = new Map(sources.map((source) => [source.id, source]));
    const stalePattern = /2024|2025款|g92025|suet|news\/company_news\/5355/;

    for (const vehicle of vehicles.filter((item) => item.modelYear >= 2026)) {
      const vehicleSources = vehicle.sourceIds.map((sourceId) => sourceMap.get(sourceId));
      expect(vehicleSources.some((source) => source?.sourceType === "official" && source.publishedAt >= "2026-01-01")).toBe(true);
      for (const source of vehicleSources) {
        expect(`${source?.id} ${source?.title} ${source?.url}`).not.toMatch(stalePattern);
      }
    }
  });
});
