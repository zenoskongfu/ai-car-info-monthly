# 国内智驾芯片与车型月报：2026 年 09 月 芯片篇

> 数据截止时间：2026-09-01  
> 本篇只讨论芯片/计算平台本体，不把车型实际装车算力与芯片平台上限混用。

## 一、阅读说明

- 单芯片或平台算力记录在芯片实体中，实际装车/整车总算力请看[装载车型篇](./vehicles.md)。
- 不同精度、不同统计口径、稀疏与稠密算力不得直接做绝对排名。
- 无法确认精度或稀疏口径时，保留为 `unknown` 或“未说明”。

## 二、新增或更新的智驾芯片

### 华山二号 A1000

- 厂商：黑芝麻智能
- 制程：16nm
- 标称算力：70 TOPS / unknown / 稀疏/稠密未说明
- 计算精度：unknown
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2021-01-01
- 主要搭载车型：未确认量产搭载车型
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[中国日报网：《支持L3级自动驾驶，黑芝麻华山二号A1000芯片正式发布》](https://cn.chinadaily.com.cn/a/202006/16/WS5ee8908aa31027ab2a8d0791.html)
- 口径说明：公开报道为 40-70 TOPS 区间，暂以区间上限记录并在 notes 标明；缺少稳定官方参数页时不参与排名。

### 征程6P

- 厂商：地平线
- 制程：未公开
- 标称算力：560 TOPS / unknown / 稀疏/稠密未说明
- 计算精度：unknown
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2024-12-01
- 主要搭载车型：未确认量产搭载车型
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[地平线 Horizon Robotics：《征程6系列》](https://www.horizon.auto/solutions/horizon-journey/horizon-journey6)
- 口径说明：官方页披露征程6系列覆盖 10 TOPS 至 560 TOPS；公开页面未标明精度与稀疏口径。

### MDC 610 智能驾驶计算平台

- 厂商：华为
- 制程：未公开
- 标称算力：160 TOPS / unknown / 稀疏/稠密未说明
- 计算精度：unknown
- 单芯片或平台：platform
- 当前状态：已发布
- 量产时间：未公开
- 主要搭载车型：未确认量产搭载车型
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[华为：《安全优先：华为MDC 610设计通过ASIL D级功能安全评估》](https://www.huawei.com/cn/news/2020/12/huawei-passes-asild-certification-mdc-610-design)；[华为：《MDC：使能自动驾驶的汽车大脑》](https://www.huawei.com/cn/huaweitech/publication/81/self-driving-ai-brain)
- 口径说明：华为官方新闻披露平台算力 160 TOPS，但未标明计算精度；该条为计算平台而非单芯片。

### 马赫 M100

- 厂商：理想汽车
- 制程：5nm
- 标称算力：1280 TOPS / unknown / 稀疏/稠密未说明
- 计算精度：unknown
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2026-06-15
- 主要搭载车型：理想L9 Livis
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[理想汽车：《理想高级辅助驾驶》](https://www.lixiang.com/tech/autodrive)
- 口径说明：官方披露单芯片 1280 TOPS，但公开页面未标明 INT8/INT4/FP8 等精度与稀疏口径，因此不得与其他 TOPS 直接排名。

### 神玑 NX9031

- 厂商：蔚来
- 制程：5nm
- 标称算力：官方未公开
- 计算精度：unknown
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2025-04-23
- 主要搭载车型：蔚来ET9
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[蔚来：《蔚来自研芯片「神玑」和「杨戬」，为智能出行装上“中国芯”》](https://www.nio.cn/smart-technology/20250710011)
- 口径说明：官方披露相当于四颗业界旗舰芯片性能、NPU TPP < 4800 等表述，但未给出可直接比较的 TOPS 精度口径。

### DRIVE Orin-X

- 厂商：NVIDIA
- 制程：未公开
- 标称算力：254 TOPS / INT8 / 稀疏/稠密未说明
- 计算精度：INT8
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2022-01-01
- 主要搭载车型：未确认量产搭载车型
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[NVIDIA Developer：《DRIVE AGX Autonomous Vehicle Development Platform》](https://developer.nvidia.com/drive/agx)；[NVIDIA Developer：《NVIDIA DRIVE AGX Orin Platform for Developers》](https://developer.nvidia.com/downloads/drive/docs/nvidia-drive-agx-orin-platform-for-developers.pdf)
- 口径说明：官方 PDF 写作 254 INT8 TOPS，未在同一处充分说明稠密/稀疏口径；谨慎标记为不可直接横向排名。

### DRIVE AGX Thor

- 厂商：NVIDIA
- 制程：未公开
- 标称算力：1000 TOPS / INT8 / 稀疏/稠密未说明
- 计算精度：INT8
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2026-01-01
- 主要搭载车型：小米新一代SU7、小米YU7
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[NVIDIA Developer：《DRIVE AGX Autonomous Vehicle Development Platform》](https://developer.nvidia.com/drive/agx)；[小米汽车：《智能驾驶》](https://www.xiaomiev.com/pilot)
- 口径说明：NVIDIA 官方页面披露最高 1000 INT8 TOPS / 2000 FP4 FLOPs；不同精度不能混排。

### 图灵AI芯片

- 厂商：小鹏汽车
- 制程：未公开
- 标称算力：750 TOPS / unknown / 稀疏/稠密未说明
- 计算精度：unknown
- 单芯片或平台：single_chip
- 当前状态：已量产
- 量产时间：2025-07-03
- 主要搭载车型：小鹏G7 Ultra、小鹏G9 Ultra（2026款）、小鹏MONA M03 Ultra SE、小鹏全新P7
- 相比上月变化：首次纳入结构化跟踪
- 信息来源：[小鹏汽车：《小鹏图灵AI芯片》](https://www.xiaopeng.com/turingaichip.html)；[小鹏汽车：《小鹏MONA M03参数配置表》](https://www.xiaopeng.com/m03_2026/configuration.html)；[小鹏汽车：《2026款小鹏G7 AI智能家庭SUV》](https://www.xiaopeng.com/g7_2026.html)；[小鹏汽车：《2026款小鹏G9 AI智能豪华SUV》](https://www.xiaopeng.com/g9_2026.html)；[小鹏汽车：《P7参数配置表》](https://www.xiaopeng.com/p7n/configuration.html)
- 口径说明：小鹏当前车型页/配置表披露1颗图灵AI芯片对应750 TOPS有效算力，2颗对应1500 TOPS，3颗对应2250 TOPS；该值为小鹏“有效算力”口径，未披露INT8/稀疏等可横向比较精度。


## 三、主要芯片厂商进展

### 英伟达

- Orin-X 继续作为多款量产车型的高阶辅助驾驶计算平台；Thor 已进入小米当前车型官方资料，需持续跟踪更多量产交付。

### 地平线

- 征程6系列进入基础跟踪，官方披露系列算力覆盖 10 TOPS 至 560 TOPS。

### 黑芝麻智能

- 华山二号 A1000 进入基础跟踪；规格需要继续补官方来源。

### 高通

- 本期未记录可靠来源确认的 Snapdragon Ride 新增车型变化。

### 华为

- MDC 与乾崑智驾 ADS 进入平台跟踪；车型页通常不披露芯片与算力，需要按官方技术资料继续核验。

### 车企自研芯片

- 理想马赫 M100、蔚来神玑 NX9031、小鹏图灵 AI 芯片均已记录为量产相关实体；小鹏图灵已按当前车型页/配置表确认多款量产车型搭载。

## 四、算力对比

| 芯片 | 厂商 | 单芯片算力 | 精度 | 稀疏或稠密 | 算力说明 | 搭载车型 | 状态 |
|---|---|---:|---|---|---|---|---|
| 华山二号 A1000 | 黑芝麻智能 | 70 TOPS | unknown | 未说明 | 公开报道为 40-70 TOPS 区间，暂以区间上限记录并在 notes 标明；缺少稳定官方参数页时不参与排名。 | 未确认 | 已量产 |
| 征程6P | 地平线 | 560 TOPS | unknown | 未说明 | 官方页披露征程6系列覆盖 10 TOPS 至 560 TOPS；公开页面未标明精度与稀疏口径。 | 未确认 | 已量产 |
| MDC 610 智能驾驶计算平台 | 华为 | 160 TOPS | unknown | 未说明 | 华为官方新闻披露平台算力 160 TOPS，但未标明计算精度；该条为计算平台而非单芯片。 | 未确认 | 已发布 |
| 马赫 M100 | 理想汽车 | 1280 TOPS | unknown | 未说明 | 官方披露单芯片 1280 TOPS，但公开页面未标明 INT8/INT4/FP8 等精度与稀疏口径，因此不得与其他 TOPS 直接排名。 | 理想L9 Livis | 已量产 |
| 神玑 NX9031 | 蔚来 | 未公开  | unknown | 未说明 | 官方披露相当于四颗业界旗舰芯片性能、NPU TPP < 4800 等表述，但未给出可直接比较的 TOPS 精度口径。 | 蔚来ET9 | 已量产 |
| DRIVE Orin-X | NVIDIA | 254 TOPS | INT8 | 未说明 | 官方 PDF 写作 254 INT8 TOPS，未在同一处充分说明稠密/稀疏口径；谨慎标记为不可直接横向排名。 | 未确认 | 已量产 |
| DRIVE AGX Thor | NVIDIA | 1000 TOPS | INT8 | 未说明 | NVIDIA 官方页面披露最高 1000 INT8 TOPS / 2000 FP4 FLOPs；不同精度不能混排。 | 小米新一代SU7、小米YU7 | 已量产 |
| 图灵AI芯片 | 小鹏汽车 | 750 TOPS | unknown | 未说明 | 小鹏当前车型页/配置表披露1颗图灵AI芯片对应750 TOPS有效算力，2颗对应1500 TOPS，3颗对应2250 TOPS；该值为小鹏“有效算力”口径，未披露INT8/稀疏等可横向比较精度。 | 小鹏G7 Ultra、小鹏G9 Ultra（2026款）、小鹏MONA M03 Ultra SE、小鹏全新P7 | 已量产 |

## 五、主要来源

- [中国日报网：《支持L3级自动驾驶，黑芝麻华山二号A1000芯片正式发布》](https://cn.chinadaily.com.cn/a/202006/16/WS5ee8908aa31027ab2a8d0791.html)
- [地平线 Horizon Robotics：《征程6系列》](https://www.horizon.auto/solutions/horizon-journey/horizon-journey6)
- [华为：《MDC：使能自动驾驶的汽车大脑》](https://www.huawei.com/cn/huaweitech/publication/81/self-driving-ai-brain)
- [华为：《安全优先：华为MDC 610设计通过ASIL D级功能安全评估》](https://www.huawei.com/cn/news/2020/12/huawei-passes-asild-certification-mdc-610-design)
- [理想汽车：《理想高级辅助驾驶》](https://www.lixiang.com/tech/autodrive)
- [蔚来：《蔚来自研芯片「神玑」和「杨戬」，为智能出行装上“中国芯”》](https://www.nio.cn/smart-technology/20250710011)
- [NVIDIA Developer：《DRIVE AGX Autonomous Vehicle Development Platform》](https://developer.nvidia.com/drive/agx)
- [NVIDIA Developer：《NVIDIA DRIVE AGX Orin Platform for Developers》](https://developer.nvidia.com/downloads/drive/docs/nvidia-drive-agx-orin-platform-for-developers.pdf)
- [小米汽车：《智能驾驶》](https://www.xiaomiev.com/pilot)
- [小鹏汽车：《2026款小鹏G7 AI智能家庭SUV》](https://www.xiaopeng.com/g7_2026.html)
- [小鹏汽车：《2026款小鹏G9 AI智能豪华SUV》](https://www.xiaopeng.com/g9_2026.html)
- [小鹏汽车：《小鹏MONA M03参数配置表》](https://www.xiaopeng.com/m03_2026/configuration.html)
- [小鹏汽车：《P7参数配置表》](https://www.xiaopeng.com/p7n/configuration.html)
- [小鹏汽车：《小鹏图灵AI芯片》](https://www.xiaopeng.com/turingaichip.html)
