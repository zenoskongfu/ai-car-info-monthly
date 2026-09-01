# 国内智驾芯片与车型月报：2026 年 07 月

> 数据截止时间：2026-09-01  
> 本报告区分已量产、已发布未量产和未经证实的传闻信息。

## 阅读入口

- [芯片篇](./chips.md)：聚焦芯片/计算平台本体、单芯片或平台算力、精度口径、量产状态和已确认搭载车型。
- [装载车型篇](./vehicles.md)：聚焦车型年款、实际装车芯片数量、整车总算力、传感器、智驾系统和交付状态。

## 一、本月摘要

- 首次建立结构化跟踪数据，新增 8 个芯片/计算平台实体、10 个车型实体。
- 本期将不同算力精度、稀疏/稠密口径和单芯片/整车总算力分开记录，不做绝对排名。
- 理想马赫 M100、小鹏图灵 AI 芯片、蔚来神玑 NX9031、NVIDIA Orin/Thor、地平线征程6、黑芝麻 A1000、华为 MDC 均进入基础数据集。
- 小米新一代 SU7/YU7、理想 L9 Livis、小鹏 G7/G9/MONA M03/P7、蔚来 ET9、问界 M9、比亚迪汉智驾版进入车型基础数据集。
- 对没有官方公开芯片或传感器数量的车型，字段保留为空并写入待核验说明。

## 二、本月关键变化

| 车企或厂商 | 变化类型 | 芯片或车型 | 本月变化 | 算力说明 | 当前状态 |
|---|---|---|---|---|---|
| 黑芝麻智能 | 新增芯片 | 华山二号 A1000 | 首次纳入结构化跟踪 | 70 TOPS / unknown / 稀疏/稠密未说明；口径：single_chip；公开报道为 40-70 TOPS 区间，暂以区间上限记录并在 notes 标明；缺少稳定官方参数页时不参与排名。 | 已量产 |
| 地平线 | 新增芯片 | 征程6P | 首次纳入结构化跟踪 | 560 TOPS / unknown / 稀疏/稠密未说明；口径：single_chip；官方页披露征程6系列覆盖 10 TOPS 至 560 TOPS；公开页面未标明精度与稀疏口径。 | 已量产 |
| 华为 | 新增芯片 | MDC 610 智能驾驶计算平台 | 首次纳入结构化跟踪 | 160 TOPS / unknown / 稀疏/稠密未说明；口径：platform；华为官方新闻披露平台算力 160 TOPS，但未标明计算精度；该条为计算平台而非单芯片。 | 已发布 |
| 理想汽车 | 新增芯片 | 马赫 M100 | 首次纳入结构化跟踪 | 1280 TOPS / unknown / 稀疏/稠密未说明；口径：single_chip；官方披露单芯片 1280 TOPS，但公开页面未标明 INT8/INT4/FP8 等精度与稀疏口径，因此不得与其他 TOPS 直接排名。 | 已量产 |
| 蔚来 | 新增芯片 | 神玑 NX9031 | 首次纳入结构化跟踪 | 官方未公开；口径：single_chip；官方披露相当于四颗业界旗舰芯片性能、NPU TPP < 4800 等表述，但未给出可直接比较的 TOPS 精度口径。 | 已量产 |
| NVIDIA | 新增芯片 | DRIVE Orin-X | 首次纳入结构化跟踪 | 254 TOPS / INT8 / 稀疏/稠密未说明；口径：single_chip；官方 PDF 写作 254 INT8 TOPS，未在同一处充分说明稠密/稀疏口径；谨慎标记为不可直接横向排名。 | 已量产 |
| NVIDIA | 新增芯片 | DRIVE AGX Thor | 首次纳入结构化跟踪 | 1000 TOPS / INT8 / 稀疏/稠密未说明；口径：single_chip；NVIDIA 官方页面披露最高 1000 INT8 TOPS / 2000 FP4 FLOPs；不同精度不能混排。 | 已量产 |
| 小鹏汽车 | 新增芯片 | 图灵AI芯片 | 首次纳入结构化跟踪 | 750 TOPS / unknown / 稀疏/稠密未说明；口径：single_chip；小鹏当前车型页/配置表披露1颗图灵AI芯片对应750 TOPS有效算力，2颗对应1500 TOPS，3颗对应2250 TOPS；该值为小鹏“有效算力”口径，未披露INT8/稀疏等可横向比较精度。 | 已量产 |
| 问界 | 新增车型 | M9 | 首次纳入结构化跟踪 | 官方未公开；官方车型页披露 HUAWEI ADS 辅助驾驶系统，但未公开本车型芯片与算力参数。 | 已量产 |
| 比亚迪 | 新增车型 | 汉 智驾版 | 首次纳入结构化跟踪 | 官方未公开；比亚迪官方新闻确认天神之眼体系与车型覆盖，具体芯片版本需按配置表继续核验。 | 已量产 |
| 理想 | 新增车型 | L9 Livis | 首次纳入结构化跟踪 | 2560 TOPS / unknown / 稀疏/稠密未说明；理想官方新闻披露两颗马赫M100总算力2560 TOPS；单芯片精度未披露，因此整车总算力也不可直接比较。 | 已量产 |
| 蔚来 | 新增车型 | ET9 | 首次纳入结构化跟踪 | 官方未公开；官方未公开可直接比较的 TOPS 口径。 | 已量产 |
| 小米 | 新增车型 | 新一代SU7 | 首次纳入结构化跟踪 | 700 TOPS / unknown / 稀疏/稠密未说明；小米官方智能驾驶页披露新一代SU7全系标配搭载小米XLA认知大模型的小米辅助驾驶，并披露700 TOPS辅助驾驶算力、采用NVIDIA DRIVE AGX Thor车载计算平台；报告采用当前车型装车口径。 | 已量产 |
| 小米 | 新增车型 | YU7 | 首次纳入结构化跟踪 | 700 TOPS / unknown / 稀疏/稠密未说明；小米官方智能驾驶页披露实际装车辅助驾驶算力为700 TOPS，并说明采用NVIDIA DRIVE AGX Thor车载计算平台；这不同于NVIDIA开发者页Thor SoC最高1000 INT8 TOPS平台上限，报告采用车型装车口径。 | 已量产 |
| 小鹏 | 新增车型 | G7 Ultra | 首次纳入结构化跟踪 | 2250 TOPS / unknown / 稀疏/稠密未说明；小鹏当前官方G7车型页披露3颗图灵AI芯片，车端有效算力2250 TOPS；该值为小鹏有效算力口径，未披露INT8/稀疏等精度。 | 已量产 |
| 小鹏 | 新增车型 | G9 Ultra（2026款） | 首次纳入结构化跟踪 | 2250 TOPS / unknown / 稀疏/稠密未说明；小鹏当前官方2026款G9车型页披露全球第一车端有效算力2250TOPS，并称搭载3颗图灵AI芯片；该值为有效算力口径，未披露INT8/稀疏等精度。 | 已量产 |
| 小鹏 | 新增车型 | MONA M03 Ultra SE | 首次纳入结构化跟踪 | 1500 TOPS / unknown / 稀疏/稠密未说明；小鹏官方MONA M03配置表披露Ultra SE版本搭载2颗图灵AI芯片，整车有效算力1500 TOPS；Max版本1颗图灵AI芯片对应750 TOPS。 | 已量产 |
| 小鹏 | 新增车型 | 全新P7 | 首次纳入结构化跟踪 | 2250 TOPS / unknown / 稀疏/稠密未说明；小鹏当前官方P7车型页/配置表披露最高/Ultra配置共3颗图灵AI芯片，有效算力2250 TOPS；该值为有效算力口径，未披露INT8/稀疏等精度。 | 已量产 |
| 比亚迪 | 新增平台 | 天神之眼 | 首次纳入结构化跟踪 | 官方未公开；口径：unknown；不同版本与车型芯片平台不同，需按车型配置单独核验。 | 已量产 |
| 地平线 | 新增平台 | 征程6系列 | 首次纳入结构化跟踪 | 560 TOPS / unknown / 稀疏/稠密未说明；口径：single_chip；系列覆盖 10-560 TOPS，记录上限；精度未公开。 | 已量产 |
| 华为 | 新增平台 | 华为乾崑智驾 ADS | 首次纳入结构化跟踪 | 官方未公开；口径：platform；ADS 系统跨车型配置差异较大，平台级不汇总算力。 | 已量产 |
| 理想汽车 | 新增平台 | 理想 AD5.0 / Livis | 首次纳入结构化跟踪 | 1280 TOPS / unknown / 稀疏/稠密未说明；口径：single_chip；平台搭载 M100；算力精度未公开。 | 已量产 |
| NVIDIA | 新增平台 | NVIDIA DRIVE AGX | 首次纳入结构化跟踪 | 官方未公开；口径：platform；DRIVE AGX 覆盖 Orin 与 Thor 等不同平台，不能用单一数值代表。 | 已量产 |
| 小鹏汽车 | 新增平台 | XNGP | 首次纳入结构化跟踪 | 官方未公开；口径：unknown；不同车型/世代芯片平台不同，平台级不汇总算力。 | 已量产 |
| 理想汽车 | 新增OTA | Livis / AD5.0 2026 roadmap | 首次纳入结构化跟踪 | 不涉及新增算力口径 | 已发布 |

## 三、主要车企进展

### 理想

- L9 Livis：已量产，智驾系统 AD5.0 / Livis。

### 小米

- 新一代SU7：已量产，智驾系统 小米XLA / 小米辅助驾驶。
- YU7：已量产，智驾系统 小米HAD辅助驾驶。

### 小鹏

- G7 Ultra：已量产，智驾系统 XNGP / 第二代VLA。
- G9 Ultra（2026款）：已量产，智驾系统 XNGP / 第二代VLA。
- MONA M03 Ultra SE：已量产，智驾系统 小鹏AI辅助驾驶 / 第二代VLA。
- 全新P7：已量产，智驾系统 XNGP / 第二代VLA。

### 蔚来

- ET9：已量产，智驾系统 NAD / 蔚来智能驾驶。

### 华为鸿蒙智行

- 本月未记录经过可靠来源确认的新变化。

### 比亚迪

- 汉 智驾版：已量产，智驾系统 天神之眼。

### 其他车企

- 本期尚未纳入新增的吉利、极氪、长安、广汽、上汽、长城、零跑车型级变化，后续月报继续补充。

## 四、重大OTA与模型升级

| 车企 | 系统版本 | 车型 | 主要升级 | 算力说明 | 推送状态 |
|---|---|---|---|---|---|
| 理想汽车 | Livis / AD5.0 2026 roadmap | li-auto-l9-livis-2026 | 智驾效率提升、倒车能力升级、安全和效率持续优化 | 不涉及新增算力口径 | 已发布 |

## 五、量产与交付进度

- 已量产：华山二号 A1000、征程6P、马赫 M100、神玑 NX9031、DRIVE Orin-X、DRIVE AGX Thor、图灵AI芯片
- 已开始交付：理想L9 Livis、蔚来ET9
- 已发布未量产：MDC 610 智能驾驶计算平台
- 计划量产：无
- 未经证实：本期未将传闻写入结构化事实字段。

## 六、传闻和待确认信息

本章节内容均为“未经官方确认”或“尚未完成双来源核验”，不得作为已确认事实引用。

- 黑芝麻 A1000 当前规格来源为高可信媒体报道，仍需补充稳定官方参数页。
- 多数车企未在车型页完整披露算力精度、稀疏/稠密口径和传感器数量，不能自行推算。
- 小米、理想、小鹏等 2026 年当前车型需持续以官网当前车型页/配置表复核，不沿用旧款配置。
- 比亚迪天神之眼不同版本芯片平台差异较大，本期仅记录官方系统与代表车型，不混填版本参数。

## 七、相比上月的变化

### 新增

- 芯片/平台：华山二号 A1000、征程6P、MDC 610 智能驾驶计算平台、马赫 M100、神玑 NX9031、DRIVE Orin-X、DRIVE AGX Thor、图灵AI芯片
- 车型：问界M9、比亚迪汉 智驾版、理想L9 Livis、蔚来ET9、小米新一代SU7、小米YU7、小鹏G7 Ultra、小鹏G9 Ultra（2026款）、小鹏MONA M03 Ultra SE、小鹏全新P7

### 更新

- 本次为首次初始化，暂无相对上月的数据字段更新。

### 状态变化

- 本次为首次初始化，暂无状态迁移。

### 数据修正

- 本次为首次初始化，暂无历史数据修正。

### 已撤回或无法确认的信息

- 暂无撤回条目；未核验信息保留在“传闻和待确认信息”章节。

## 八、趋势判断

以下为基于公开信息的分析，不写入结构化事实字段：

- 车企自研芯片正在从展示能力进入量产验证阶段，但各家披露口径差异极大，短期内 TOPS 排名意义有限。
- Orin 仍是大量量产高阶辅助驾驶车型的主力平台，Thor 开始进入新车型官方配置。
- 国产智驾芯片从单点算力宣传转向与模型、操作系统、传感器和整车电子电气架构协同。
- 端到端、VLA 和多模态模型已成为车企发布会核心叙事，但仍需要以 OTA 效果、交付范围和安全边界持续验证。

## 九、主要来源

- [中国日报网：《支持L3级自动驾驶，黑芝麻华山二号A1000芯片正式发布》](https://cn.chinadaily.com.cn/a/202006/16/WS5ee8908aa31027ab2a8d0791.html)
- [比亚迪：《比亚迪天神之眼开创全民智驾时代》](https://www.byd.com/cn/news/2025/detail563)
- [鸿蒙智行：《问界M9》](https://hima.auto/wenjie/m9-new/)
- [地平线 Horizon Robotics：《征程6系列》](https://www.horizon.auto/solutions/horizon-journey/horizon-journey6)
- [华为：《MDC：使能自动驾驶的汽车大脑》](https://www.huawei.com/cn/huaweitech/publication/81/self-driving-ai-brain)
- [华为：《安全优先：华为MDC 610设计通过ASIL D级功能安全评估》](https://www.huawei.com/cn/news/2020/12/huawei-passes-asild-certification-mdc-610-design)
- [华为乾崑：《华为乾崑智能汽车解决方案》](https://auto.huawei.com/cn/)
- [理想汽车：《理想高级辅助驾驶》](https://www.lixiang.com/tech/autodrive)
- [理想汽车：《全新一代理想L9正式发布》](https://www.lixiang.com/news/159.html)
- [蔚来：《蔚来ET9 智能电动行政旗舰轿车》](https://www.nio.cn/et9)
- [蔚来：《蔚来自研芯片「神玑」和「杨戬」，为智能出行装上“中国芯”》](https://www.nio.cn/smart-technology/20250710011)
- [NVIDIA Developer：《DRIVE AGX Autonomous Vehicle Development Platform》](https://developer.nvidia.com/drive/agx)
- [NVIDIA Developer：《NVIDIA DRIVE AGX Orin Platform for Developers》](https://developer.nvidia.com/downloads/drive/docs/nvidia-drive-agx-orin-platform-for-developers.pdf)
- [小米汽车：《智能驾驶》](https://www.xiaomiev.com/pilot)
- [小米汽车：《新一代SU7》](https://www.xiaomiev.com/su7)
- [小米汽车：《YU7》](https://www.xiaomiev.com/yu7)
- [小鹏汽车：《2026款小鹏G7 AI智能家庭SUV》](https://www.xiaopeng.com/g7_2026.html)
- [小鹏汽车：《2026款小鹏G7参数配置表》](https://www.xiaopeng.com/g7_2026/configuration.html)
- [小鹏汽车：《2026款小鹏G9 AI智能豪华SUV》](https://www.xiaopeng.com/g9_2026.html)
- [小鹏汽车：《2026款G9参数配置表》](https://www.xiaopeng.com/g9_2026/configuration.html)
- [小鹏汽车：《小鹏MONA M03参数配置表》](https://www.xiaopeng.com/m03_2026/configuration.html)
- [小鹏汽车：《小鹏P7 未来AI豪华轿跑》](https://www.xiaopeng.com/p7n.html)
- [小鹏汽车：《P7参数配置表》](https://www.xiaopeng.com/p7n/configuration.html)
- [小鹏汽车：《小鹏图灵AI芯片》](https://www.xiaopeng.com/turingaichip.html)
