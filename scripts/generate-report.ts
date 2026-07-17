import { existsSync } from "node:fs";
import path from "node:path";
import {
  currentDate,
  currentReportMonth,
  displayName,
  monthTitle,
  readJson,
  rootDir,
  sourceLabel,
  writeText,
  type Entity,
  type MonthlyDiff
} from "./lib.js";
import { buildMonthlyDiff } from "./compare-monthly.js";

type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: string;
  reliability: string;
};

type Chip = Entity & {
  name: string;
  manufacturer: string;
  status: string;
  processNode: string | null;
  compute: {
    value: number | null;
    unit: string;
    precision: string;
    sparse: boolean | null;
    scope: string;
    comparable: boolean;
    notes: string;
  };
  massProductionDate: string | null;
  sourceIds: string[];
};

type Vehicle = Entity & {
  brand: string;
  model: string;
  releaseDate: string | null;
  deliveryDate: string | null;
  chipIds: string[];
  chipCount: number | null;
  totalCompute: { value: number | null; unit: string; precision: string; notes: string };
  drivingSystem: string | null;
  sensors: {
    lidar: number | null;
    camera: number | null;
    millimeterWaveRadar: number | null;
    fourDRadar: number | null;
    ultrasonicRadar: number | null;
    notes: string;
  };
  capabilities: string[];
  status: string;
  sourceIds: string[];
};

type Platform = Entity & {
  name: string;
  vendor: string;
  status: string;
  sourceIds: string[];
};

type OtaUpdate = Entity & {
  manufacturer: string;
  system: string;
  version: string;
  vehicleIds: string[];
  status: string;
  highlights: string[];
};

function formatCompute(compute: { value: number | null; unit: string; precision: string; sparse?: boolean | null }) {
  if (compute.value === null) return "官方未公开";
  const sparseText = compute.sparse === null ? "稀疏/稠密未说明" : compute.sparse ? "稀疏" : "稠密";
  return `${compute.value} ${compute.unit} / ${compute.precision} / ${sparseText}`;
}

function formatStatus(status: string) {
  const map: Record<string, string> = {
    rumored: "传闻",
    announced: "已发布",
    pre_production: "预量产",
    mass_production: "已量产",
    discontinued: "已停用"
  };
  return map[status] ?? status;
}

function formatNullable(value: string | number | null) {
  return value === null ? "未公开" : String(value);
}

function bulletSources(sourceIds: string[], sourceMap: Map<string, Source>) {
  return sourceIds.map((id) => sourceLabel(id, sourceMap)).join("；");
}

function rowsForDiff(diff: MonthlyDiff, chips: Chip[], vehicles: Vehicle[], platforms: Platform[], otaUpdates: OtaUpdate[]) {
  const rows: string[] = [];
  const chipMap = new Map(chips.map((item) => [item.id, item]));
  const vehicleMap = new Map(vehicles.map((item) => [item.id, item]));
  const platformMap = new Map(platforms.map((item) => [item.id, item]));
  const otaMap = new Map(otaUpdates.map((item) => [item.id, item]));

  for (const id of diff.chips.added) {
    const item = chipMap.get(id);
    if (item) rows.push(`| ${item.manufacturer} | 新增芯片 | ${item.name} | 首次纳入结构化跟踪 | ${formatStatus(item.status)} |`);
  }
  for (const id of diff.vehicles.added) {
    const item = vehicleMap.get(id);
    if (item) rows.push(`| ${item.brand} | 新增车型 | ${item.model} | 首次纳入结构化跟踪 | ${formatStatus(item.status)} |`);
  }
  for (const id of diff.platforms.added) {
    const item = platformMap.get(id);
    if (item) rows.push(`| ${item.vendor} | 新增平台 | ${item.name} | 首次纳入结构化跟踪 | ${formatStatus(item.status)} |`);
  }
  for (const id of diff.otaUpdates.added) {
    const item = otaMap.get(id);
    if (item) rows.push(`| ${item.manufacturer} | 新增OTA | ${item.system} ${item.version} | 首次纳入结构化跟踪 | ${formatStatus(item.status)} |`);
  }
  return rows.length ? rows.join("\n") : "| - | - | - | 本月未发现经过可靠来源确认的重大芯片或车型平台变化。 | - |";
}

function renderChip(chip: Chip, vehicles: Vehicle[], sourceMap: Map<string, Source>) {
  const models = vehicles.filter((vehicle) => vehicle.chipIds.includes(chip.id)).map((vehicle) => `${vehicle.brand}${vehicle.model}`);
  return `### ${chip.name}

- 厂商：${chip.manufacturer}
- 制程：${formatNullable(chip.processNode)}
- 标称算力：${formatCompute(chip.compute)}
- 计算精度：${chip.compute.precision}
- 单芯片或平台：${chip.compute.scope}
- 当前状态：${formatStatus(chip.status)}
- 量产时间：${formatNullable(chip.massProductionDate)}
- 主要搭载车型：${models.length ? models.join("、") : "未确认量产搭载车型"}
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：${bulletSources(chip.sourceIds, sourceMap)}
- 口径说明：${chip.compute.notes}
`;
}

function renderVehicle(vehicle: Vehicle, chipMap: Map<string, Chip>, sourceMap: Map<string, Source>) {
  const chipNames = vehicle.chipIds.map((id) => chipMap.get(id)?.name ?? id);
  return `### ${vehicle.brand}${vehicle.model}

- 发布时间：${formatNullable(vehicle.releaseDate)}
- 交付时间：${formatNullable(vehicle.deliveryDate)}
- 智驾芯片：${chipNames.length ? chipNames.join("、") : "官方未公开"}
- 芯片数量：${formatNullable(vehicle.chipCount)}
- 整车总算力：${formatCompute(vehicle.totalCompute)}
- 智驾系统：${formatNullable(vehicle.drivingSystem)}
- 传感器配置：激光雷达 ${formatNullable(vehicle.sensors.lidar)}；摄像头 ${formatNullable(vehicle.sensors.camera)}；毫米波雷达 ${formatNullable(vehicle.sensors.millimeterWaveRadar)}；4D毫米波雷达 ${formatNullable(vehicle.sensors.fourDRadar)}
- 支持能力：${vehicle.capabilities.join("、") || "未公开"}
- 当前状态：${formatStatus(vehicle.status)}
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：${bulletSources(vehicle.sourceIds, sourceMap)}
- 备注：${vehicle.notes}
`;
}

function groupProgress(vehicles: Vehicle[], brand: string) {
  const matched = vehicles.filter((vehicle) => vehicle.brand.includes(brand) || brand.includes(vehicle.brand));
  if (!matched.length) return `### ${brand}\n\n- 本月未记录经过可靠来源确认的新变化。\n`;
  return `### ${brand}\n\n${matched.map((vehicle) => `- ${vehicle.model}：${formatStatus(vehicle.status)}，智驾系统 ${formatNullable(vehicle.drivingSystem)}。`).join("\n")}\n`;
}

function renderReport(
  month: string,
  diff: MonthlyDiff,
  chips: Chip[],
  vehicles: Vehicle[],
  platforms: Platform[],
  otaUpdates: OtaUpdate[],
  sources: Source[]
) {
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const chipMap = new Map(chips.map((chip) => [chip.id, chip]));
  const addedCount = diff.chips.added.length + diff.vehicles.added.length + diff.platforms.added.length + diff.otaUpdates.added.length;
  const summary =
    addedCount === 0
      ? "- 本月未发现经过可靠来源确认的重大芯片或车型平台变化。"
      : [
          `- 首次建立结构化跟踪数据，新增 ${diff.chips.added.length} 个芯片/计算平台实体、${diff.vehicles.added.length} 个车型实体。`,
          "- 本期将不同算力精度、稀疏/稠密口径和单芯片/整车总算力分开记录，不做绝对排名。",
          "- 理想马赫 M100、小鹏图灵 AI 芯片、蔚来神玑 NX9031、NVIDIA Orin/Thor、地平线征程6、黑芝麻 A1000、华为 MDC 均进入基础数据集。",
          "- 小米 SU7/YU7、理想 L9 Livis、小鹏 G9、蔚来 ET9、问界 M9、比亚迪汉智驾版进入车型基础数据集。",
          "- 对没有官方公开芯片或传感器数量的车型，字段保留为空并写入待核验说明。"
        ].join("\n");

  const uncertain = [
    "- 黑芝麻 A1000 当前规格来源为高可信媒体报道，仍需补充稳定官方参数页。",
    "- 多数车企未在车型页完整披露算力精度、稀疏/稠密口径和传感器数量，不能自行推算。",
    "- 小米 YU7、理想 L9 Livis 等 2026 年车型的交付进度需按后续官方交付公告更新。",
    "- 比亚迪天神之眼不同版本芯片平台差异较大，本期仅记录官方系统与代表车型，不混填版本参数。"
  ].join("\n");

  return `# 国内智驾芯片与车型月报：${monthTitle(month)}

> 数据截止时间：${currentDate()}  
> 本报告区分已量产、已发布未量产和未经证实的传闻信息。

## 一、本月摘要

${summary}

## 二、本月关键变化

| 车企或厂商 | 变化类型 | 芯片或车型 | 本月变化 | 当前状态 |
|---|---|---|---|---|
${rowsForDiff(diff, chips, vehicles, platforms, otaUpdates)}

## 三、新增或更新的智驾芯片

${chips.map((chip) => renderChip(chip, vehicles, sourceMap)).join("\n")}

## 四、新增或更新的车型

${vehicles.map((vehicle) => renderVehicle(vehicle, chipMap, sourceMap)).join("\n")}

## 五、主要车企进展

${["理想", "小米", "小鹏", "蔚来", "华为鸿蒙智行", "比亚迪"].map((brand) => groupProgress(vehicles, brand)).join("\n")}
### 其他车企

- 本期尚未纳入新增的吉利、极氪、长安、广汽、上汽、长城、零跑车型级变化，后续月报继续补充。

## 六、主要芯片厂商进展

### 英伟达

- Orin-X 继续作为多款量产车型的高阶辅助驾驶计算平台；Thor 已进入小米 YU7 官方车型页，需持续跟踪更多量产交付。

### 地平线

- 征程6系列进入基础跟踪，官方披露系列算力覆盖 10 TOPS 至 560 TOPS。

### 黑芝麻智能

- 华山二号 A1000 进入基础跟踪；规格需要继续补官方来源。

### 高通

- 本期未记录可靠来源确认的 Snapdragon Ride 新增车型变化。

### 华为

- MDC 与乾崑智驾 ADS 进入平台跟踪；车型页通常不披露芯片与算力，需要按官方技术资料继续核验。

### 车企自研芯片

- 理想马赫 M100、蔚来神玑 NX9031 已记录为量产相关实体；小鹏图灵 AI 芯片记录为预量产/未确认量产上车。

## 七、算力对比

| 芯片 | 厂商 | 单芯片算力 | 精度 | 稀疏或稠密 | 搭载车型 | 状态 |
|---|---|---:|---|---|---|---|
${chips
  .map((chip) => {
    const models = vehicles.filter((vehicle) => vehicle.chipIds.includes(chip.id)).map((vehicle) => `${vehicle.brand}${vehicle.model}`);
    return `| ${chip.name} | ${chip.manufacturer} | ${chip.compute.value ?? "未公开"} ${chip.compute.unit === "unknown" ? "" : chip.compute.unit} | ${chip.compute.precision} | ${chip.compute.sparse === null ? "未说明" : chip.compute.sparse ? "稀疏" : "稠密"} | ${models.join("、") || "未确认"} | ${formatStatus(chip.status)} |`;
  })
  .join("\n")}

不同精度、不同统计口径、稀疏与稠密算力不得直接做绝对排名。本期多数公开资料没有完整披露精度和稀疏口径，因此仅做事实表列，不做强弱排序。

## 八、重大OTA与模型升级

| 车企 | 系统版本 | 车型 | 主要升级 | 推送状态 |
|---|---|---|---|---|
${otaUpdates.map((update) => `| ${update.manufacturer} | ${update.system} ${update.version} | ${update.vehicleIds.join("、")} | ${update.highlights.join("、")} | ${formatStatus(update.status)} |`).join("\n")}

## 九、量产与交付进度

- 已量产：${chips.filter((chip) => chip.status === "mass_production").map((chip) => chip.name).join("、") || "无"}
- 已开始交付：${vehicles.filter((vehicle) => vehicle.deliveryDate).map((vehicle) => `${vehicle.brand}${vehicle.model}`).join("、") || "无"}
- 已发布未量产：${chips.filter((chip) => chip.status === "announced").map((chip) => chip.name).join("、") || "无"}
- 计划量产：${chips.filter((chip) => chip.status === "pre_production").map((chip) => chip.name).join("、") || "无"}
- 未经证实：本期未将传闻写入结构化事实字段。

## 十、传闻和待确认信息

本章节内容均为“未经官方确认”或“尚未完成双来源核验”，不得作为已确认事实引用。

${uncertain}

## 十一、相比上月的变化

### 新增

- 芯片/平台：${diff.chips.added.map((id) => displayName(chips.find((chip) => chip.id === id) ?? { id })).join("、") || "无"}
- 车型：${diff.vehicles.added.map((id) => displayName(vehicles.find((vehicle) => vehicle.id === id) ?? { id })).join("、") || "无"}

### 更新

- 本次为首次初始化，暂无相对上月的数据字段更新。

### 状态变化

- 本次为首次初始化，暂无状态迁移。

### 数据修正

- 本次为首次初始化，暂无历史数据修正。

### 已撤回或无法确认的信息

- 暂无撤回条目；未核验信息保留在第十节。

## 十二、趋势判断

以下为基于公开信息的分析，不写入结构化事实字段：

- 车企自研芯片正在从展示能力进入量产验证阶段，但各家披露口径差异极大，短期内 TOPS 排名意义有限。
- Orin 仍是大量量产高阶辅助驾驶车型的主力平台，Thor 开始进入新车型官方配置。
- 国产智驾芯片从单点算力宣传转向与模型、操作系统、传感器和整车电子电气架构协同。
- 端到端、VLA 和多模态模型已成为车企发布会核心叙事，但仍需要以 OTA 效果、交付范围和安全边界持续验证。

## 十三、主要来源

${sources
  .filter((source) => source.reliability === "high")
  .map((source) => `- [${source.publisher}：《${source.title}》](${source.url})`)
  .join("\n")}
`;
}

export async function generateReport(month = currentReportMonth()) {
  const chips = await readJson<Chip[]>("data/chips.json");
  const vehicles = await readJson<Vehicle[]>("data/vehicles.json");
  const platforms = await readJson<Platform[]>("data/platforms.json");
  const otaUpdates = await readJson<OtaUpdate[]>("data/ota-updates.json");
  const sources = await readJson<Source[]>("data/sources.json");
  const diffPath = `data/monthly-diffs/${month}.json`;
  const diff = existsSync(path.join(rootDir, diffPath)) ? await readJson<MonthlyDiff>(diffPath) : await buildMonthlyDiff(month);

  const content = renderReport(month, diff, chips, vehicles, platforms, otaUpdates, sources);
  await writeText(`docs/monthly/${month}.md`, content);
  console.log(`Report written to docs/monthly/${month}.md`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await generateReport();
}
