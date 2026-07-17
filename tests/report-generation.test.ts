import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { generateReport } from "../scripts/generate-report.js";

describe("report generation", () => {
  it("generates split monthly reports with required sections", async () => {
    await generateReport("2026-07");
    const overview = await readFile("docs/monthly/2026-07/index.md", "utf8");
    const chips = await readFile("docs/monthly/2026-07/chips.md", "utf8");
    const vehicles = await readFile("docs/monthly/2026-07/vehicles.md", "utf8");

    expect(existsSync("docs/monthly/2026-07.md")).toBe(false);
    expect(overview).toContain("数据截止时间：");
    expect(overview).toContain("[芯片篇](./chips.md)");
    expect(overview).toContain("[装载车型篇](./vehicles.md)");
    expect(overview).toContain("| 车企或厂商 | 变化类型 | 芯片或车型 | 本月变化 | 算力说明 | 当前状态 |");
    expect(overview).toContain("## 六、传闻和待确认信息");

    expect(chips).toContain("芯片篇");
    expect(chips).toContain("| 芯片 | 厂商 | 单芯片算力 | 精度 | 稀疏或稠密 | 算力说明 | 搭载车型 | 状态 |");
    expect(chips).toContain("不同精度");

    expect(vehicles).toContain("装载车型篇");
    expect(vehicles).toContain("| 车企 | 车型 | 车型年款 | 智驾芯片 | 芯片数量 | 整车总算力 | 算力说明 | 当前状态 |");
    expect(vehicles).toContain("小米新一代SU7");
    expect(vehicles).toContain("700 TOPS");
    expect(`${overview}\n${chips}\n${vehicles}`).not.toContain("小米SU7、小鹏G9");
    expect(`${overview}\n${chips}\n${vehicles}`).not.toContain("小鹏图灵 AI 芯片记录为预量产/未确认量产上车");
  });
});
