# OptoElectro Lab — 产品规格

> 基于 React 的交互式光通信学习与实验平台。

## 产品概述

通过精美的动画和实时参数控制，帮助理解光调制器件的工作原理。分为 **Learn（学习）** 和 **Playground（实验）** 两大部分。

### 目标用户

- 光学工程、电子工程专业学生
- 光通信领域研究人员
- 对光电技术感兴趣的工程师和爱好者

### 核心价值

- 将抽象的光电效应原理可视化
- 通过交互式参数调节增强学习体验
- 提供直观的调制器工作流程演示

---

## 文档体系与优先级

### 文档目录结构

```
doc/
├── lab/                          # 实验设计文档（5 个实验）
│   ├── interference.md
│   ├── mz-modulator.md
│   ├── iq-modulator.md
│   ├── polarization.md
│   └── receiver.md
└── learn/                        # 学习页面内容文档（按大章节分目录，序号表示章节顺序）
    ├── part1-basics/             # Part 1 · 基础篇
    │   ├── 01-wave-basics.md
    │   ├── 02-semiconductor-physics.md
    │   ├── 03-pn-junction.md
    │   └── 04-optoelectronic-materials.md
    ├── part2-source-transmission/ # Part 2 · 光源与传输篇
    │   ├── 01-laser.md
    │   └── 02-fiber-optics.md
    ├── part3-modulator/          # Part 3 · 调制器篇
    │   ├── 01-modulation-basics.md
    │   ├── 02-interference.md
    │   ├── 03-mz-modulator.md
    │   ├── 04-iq-modulator.md
    │   ├── 05-polarization.md
    │   ├── 06-nyquist-ofdm.md
    │   └── 07-pcs-coding.md
    ├── part4-system/             # Part 4 · 系统篇
    │   ├── 01-receiver.md
    │   ├── 02-wdm-amplifier.md
    │   └── 03-system-overview.md
    └── glossary.md               # 附录 · 术语表
```

### 文档优先级原则

1. **`doc/` 中的 Markdown 文档为内容唯一权威来源（Single Source of Truth）**
2. 当 `doc/` 中的 md 文档与 `src/pages/` 中的 React 页面组件内容发生冲突时，**以 `doc/` 中的 md 文档为准**
3. `spec/` 中的文档描述系统设计、架构和规范；`doc/` 中的文档描述具体学习和实验内容

### 文档优先工作流

内容变更时遵循以下顺序：

1. **先更新文档**：在 `doc/` 中修改对应的 md 文档，确定内容正确性
2. **再更新页面**：根据文档内容同步修改 `src/pages/` 中的 React 页面组件
3. **最后提交**：文档和页面一起提交，保持一致性

---

## 文档索引

### spec/ — 系统设计文档

| 文档 | 内容 |
|------|------|
| [architecture.md](architecture.md) | 技术选型、架构图、性能优化 |
| [routes.md](routes.md) | 完整路由定义（含常量管理说明） |
| [components.md](components.md) | 组件目录结构与公共组件说明 |
| [stores.md](stores.md) | 各模块状态管理接口 |
| [design.md](design.md) | UI 设计风格、配色、字体 |
| [math.md](math.md) | 核心数学函数与公式 |
| [deploy.md](deploy.md) | 部署方案与 CI/CD 配置 |

### doc/ — 学习与实验内容文档

| 目录 | 内容 |
|------|------|
| `doc/learn/` | 15 个学习章节的 Markdown 文档，按 Part 分目录 |
| `doc/lab/` | 5 个交互实验的设计文档（组件、参数、协同关系） |

---

## 功能模块

### Learn · 学习路径

共 14 个章节，按 4 个 Part + 附录分组：

**Part 1 · 基础篇**
| 章节 | 内容 |
|------|------|
| 光波基础与物理量 | 光的本质、电磁波模型、波长与频率、相位与相位差 |

**Part 2 · 光源与传输篇**
| 章节 | 内容 |
|------|------|
| 激光器 | 受激辐射、粒子数反转、谐振腔原理、激光器类型 |
| 光纤与光波导 | 全内反射、损耗谱、色散、非线性效应 |
| 光电材料 | 半导体能带结构、光电子材料特性 |

**Part 3 · 调制器篇**
| 章节 | 内容 |
|------|------|
| 光调制基础 | 模拟/数字调制、AM/PM/FM、IM/DD、调制性能指标 |
| 干涉原理 | 双光束干涉、相干条件、条纹可见度、MZI 结构 |
| MZ 调制器 | 马赫-曾德干涉仪、电光效应、三种调制模式、转移函数 |
| IQ 调制器 | 正交幅度调制、星座图、QPSK/16QAM/64QAM |
| 偏振复用 | 斯托克斯矢量、庞加莱球、偏振态 |
| Nyquist 与 OFDM | 脉冲整形、多载波调制 |
| 概率星座整形与编码 | PCS、LDPC/FEC、逼近香农极限 |

**Part 4 · 系统篇**
| 章节 | 内容 |
|------|------|
| 光接收器 | 相干接收、SNR、BER、EVM、DSP |
| WDM 与光放大器 | 波分复用、EDFA、ASE 噪声、Flex-Grid |
| 完整光通信系统 | 400G DP-16QAM 端到端链路全景 |

**附录**
| 章节 | 内容 |
|------|------|
| 术语表 | 70+ 光通信术语，支持搜索与分类筛选 |

### Playground · 交互实验

5 个交互式仿真实验，支持实时参数调节：

| 实验 | 功能特点 |
|------|----------|
| 光波干涉 | 调节波长/振幅/相位差，观察干涉条纹变化 |
| MZ 调制器 | 三种模式切换（单臂/双臂/推挽），转移曲线实时绘制 |
| IQ 调制器 | QPSK/16QAM/64QAM 星座图，I/Q/P 全分量调节，发送/接收端对比 |
| 偏振复用 | 庞加莱球与偏振椭圆，斯托克斯参数实时计算 |
| 光接收器 | AWGN 信道、BER vs SNR 曲线、EVM 计算 |

### 核心交互功能

1. **参数实时调节**：通过滑块控制参数，实时更新可视化效果
2. **动画播放控制**：播放、暂停、重置
3. **页内注释**：专业术语悬停弹出解释（TermNote 组件 + 术语表联动）
4. **学习/实验联动**：页面内互相跳转，Learn 和 Playground 形成完整学习闭环

---

## 技术栈

| 技术 | 用途 |
|------|------|
| React 19 + TypeScript | UI 框架 + 类型安全 |
| Vite 8 | 构建工具 |
| Tailwind CSS v4 | 样式方案 |
| Zustand 5 | 状态管理 |
| React Router v7 (HashRouter) | 路由管理 |
| KaTeX | 数学公式渲染 |
| Canvas 2D + requestAnimationFrame | 可视化渲染 |
| Lucide React | 图标库 |

---

## 开发规范

- **包管理器**：仅使用 pnpm
- **提交格式**：遵循 Conventional Commits
- **类型覆盖**：TypeScript strict mode 未启用
- **代码风格**：使用 Tailwind CSS v4 工具类，Zustand 状态管理
