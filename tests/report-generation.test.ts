import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { generateReport } from "../scripts/generate-report.js";

describe("report generation", () => {
  it("generates a monthly report with required sections", async () => {
    await generateReport("2026-07");
    const report = await readFile("docs/monthly/2026-07.md", "utf8");
    expect(report).toContain("数据截止时间：");
    expect(report).toContain("| 车企或厂商 | 变化类型 | 芯片或车型 | 本月变化 | 算力说明 | 当前状态 |");
    expect(report).toContain("## 七、算力对比");
    expect(report).toContain("| 芯片 | 厂商 | 单芯片算力 | 精度 | 稀疏或稠密 | 算力说明 | 搭载车型 | 状态 |");
    expect(report).toContain("## 十、传闻和待确认信息");
    expect(report).toContain("不同精度");
  });
});
