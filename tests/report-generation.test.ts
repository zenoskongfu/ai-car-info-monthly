import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { generateReport } from "../scripts/generate-report.js";

describe("report generation", () => {
  it("generates a monthly report with required sections", async () => {
    await generateReport("2026-07");
    const report = await readFile("docs/monthly/2026-07.md", "utf8");
    expect(report).toContain("数据截止时间：");
    expect(report).toContain("## 七、算力对比");
    expect(report).toContain("## 十、传闻和待确认信息");
    expect(report).toContain("不同精度");
  });
});
