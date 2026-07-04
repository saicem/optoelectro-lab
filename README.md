# OptoElectro Lab - 光电实验室

一个基于 React 的交互式光通信学习与实验平台，通过精美的动画和实时参数控制，帮助理解光调制器件的工作原理。

分为 **Learn（学习）** 和 **Playground（实验）** 两大部分，从基础概念到完整光通信系统，循序渐进。

## 在线访问

**GitHub Pages**: https://saicem.github.io/optoelectro-lab/

## 功能模块

### 📚 Learn · 学习路径

共 14 个章节，按 4 个篇章 + 附录分组，形成完整学习体系：

**Part 1 · 基础篇**
- 01 光波基础与物理量 — 电磁波谱、光波物理量、相位与折射率

**Part 2 · 光源与传输篇**
- 02 激光器 — 受激辐射、粒子数反转、谐振腔、DFB/VCSEL
- 03 光纤与光波导 — 全内反射、损耗谱、色散、非线性效应
- 04 光电材料 — 半导体的能带结构和光电子特性

**Part 3 · 调制器篇**
- 05 光调制基础 — 模拟/数字调制、AM/PM/FM、IM/DD、调制性能指标
- 06 干涉原理 — 双光束干涉、相干条件、MZI 结构
- 07 MZ 调制器 — 马赫-曾德电光调制器、三种调制模式、行波电极
- 08 IQ 调制器 — 正交幅度调制、星座图、格雷编码
- 09 偏振复用 — 斯托克斯矢量、琼斯矩阵、庞加莱球
- 10 Nyquist 与 OFDM — 脉冲整形、多载波调制
- 11 概率星座整形与编码 — PCS、LDPC/FEC、逼近香农极限

**Part 4 · 系统篇**
- 12 光接收器 — 相干接收、噪声分析、功率预算、BER
- 13 WDM 与光放大器 — 波分复用、EDFA、ASE 噪声、Flex-Grid
- 14 完整光通信系统 — 400G DP-16QAM 端到端链路全景、综合回顾

**附录**
- 术语表 — 70+ 光通信常用术语查询

### 🧪 Playground · 交互实验

5 个可交互的仿真实验，支持实时参数调节：

| 实验 | 功能特点 |
|------|----------|
| 光波干涉 | 调节波长/振幅/相位差，观察干涉条纹变化 |
| MZ 调制器 | 电光调制原理演示，转移曲线实时绘制，单臂/双臂/推挽三种模式 |
| IQ 调制器 | QPSK/16QAM/64QAM 星座图，I/Q/P 全分量调节，发送/接收端对比分析 |
| 偏振复用 | 庞加莱球与偏振椭圆，斯托克斯参数实时计算 |
| 光接收器 | AWGN 信道、BER vs SNR 曲线、EVM 计算 |

## 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite 8
- **状态管理**：Zustand 5
- **样式方案**：Tailwind CSS v4
- **数学渲染**：KaTeX
- **路由管理**：React Router v7 (HashRouter)
- **可视化**：Canvas 2D + requestAnimationFrame
- **图标库**：Lucide React

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 代码检查
pnpm lint

# 类型检查
pnpm check

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages，详见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。
