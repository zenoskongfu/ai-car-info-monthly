# 国内智驾芯片与车型跟踪

持续跟踪国内智能驾驶芯片、车型搭载、算力平台、辅助驾驶系统和量产进展。

最新月报：[2026 年 09 月 月报总览](./docs/monthly/2026-09/)

## 项目用途

本仓库用于维护“国内智驾芯片与车型月报”的结构化数据、月度差异、Markdown 报告和自动化工作流。目标是让每月更新可复查、可追溯、可持续维护。

## 数据范围

- 国内重点车企：理想、小米、小鹏、蔚来、华为鸿蒙智行、比亚迪等。
- 芯片与计算平台：NVIDIA Orin/Thor、地平线征程、黑芝麻华山、华为 MDC，以及车企自研芯片。
- 信息类型：芯片发布/量产、车型搭载、算力口径、传感器配置、城市 NOA/高速 NOA、端到端/VLA/世界模型、OTA 与交付进度。

## 数据更新时间

2026-09-01

## 月报入口

- [2026 年 09 月 月报总览](./docs/monthly/2026-09/)
- [2026 年 09 月 芯片篇](./docs/monthly/2026-09/chips.md)
- [2026 年 09 月 装载车型篇](./docs/monthly/2026-09/vehicles.md)
- [2026 年 07 月 月报总览](./docs/monthly/2026-07/)
- [2026 年 07 月 芯片篇](./docs/monthly/2026-07/chips.md)
- [2026 年 07 月 装载车型篇](./docs/monthly/2026-07/vehicles.md)

## 数据文件结构

- `data/chips.json`：芯片与计算平台实体。
- `data/vehicles.json`：车型与智驾配置。
- `data/platforms.json`：芯片系列、计算平台、智驾系统。
- `data/ota-updates.json`：重大 OTA 与模型升级。
- `data/sources.json`：来源索引。
- `data/monthly-diffs/`：机器可读月度差异。

## 状态字段说明

- `rumored`：传闻，不能作为确认事实。
- `announced`：已发布但未确认量产。
- `pre_production`：预量产或流片/测试阶段。
- `mass_production`：已量产或已随车型交付。
- `discontinued`：已停用。

## 算力口径说明

每条算力必须记录数值、单位、计算精度、稀疏/稠密、单芯片或整车总算力、是否官方来源、是否可比较。INT8、INT4、FP8、FP4、稀疏算力和未说明精度的宣传数值不得直接排名。

## 本地运行方法

```bash
npm install
npm run validate
npm test
npm run generate
```

可通过 `REPORT_MONTH=YYYY-MM` 指定生成月份。

## 自动化运行方式

GitHub Actions 每月 1 日北京时间约 8:00 触发，也支持 `workflow_dispatch` 手动运行。默认创建 `report/YYYY-MM` 分支并提交 Pull Request，不直接合并到 `main`。

## 数据可靠性原则

官方来源优先；关键参数尽量双来源交叉验证；单一来源必须在报告中标注；传闻不得混入正式数据；冲突信息优先采用官方最新口径并保留说明。

## 如何贡献和纠错

请修改对应 JSON 数据并补充 `data/sources.json` 来源，再运行校验、测试和生成脚本。纠错应在当月月报的“数据修正”章节中说明。
