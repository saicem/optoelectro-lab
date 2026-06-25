# 光通信调制实验室

一个基于 React 的交互式光通信学习与实验平台，通过精美的动画和实时参数控制，帮助理解光调制器件的工作原理。

分为 **Learn（学习）** 和 **Playground（实验）** 两大部分，从基础概念到高阶调制技术，循序渐进。

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## 在线访问

**GitHub Pages**: https://saicem.github.io/photoelectricity-visualization/

## 功能模块

### 📚 Learn · 学习路径

共 9 个章节，从光波基础到光接收器，形成完整学习路径：

| 章节 | 内容 |
|------|------|
| 光波基础 | 光的本质、电磁波模型、波长与频率 |
| 激光器 | 受激辐射、粒子数反转、谐振腔原理 |
| 干涉原理 | 双光束干涉、相干条件、条纹可见度 |
| MZ 调制器 | 马赫-曾德干涉仪、电光效应、强度调制 |
| IQ 调制器 | 正交幅度调制、星座图、调制格式 |
| 偏振复用 | 斯托克斯矢量、庞加莱球、偏振态 |
| 双偏振 IQ | DP-IQM 结构、偏振旋转、双通道调制 |
| 光接收器 | 相干接收、SNR、BER、EVM |
| 术语表 | 30+ 光通信常用术语查询 |

### 🧪 Playground · 交互实验

6 个可交互的仿真实验，支持实时参数调节：

| 实验 | 功能特点 |
|------|----------|
| 光波干涉 | 调节波长/振幅/相位差，观察干涉条纹变化 |
| MZ 调制器 | 电光调制原理演示，转移曲线实时绘制 |
| IQ 调制器 | QPSK/16QAM/64QAM 星座图，编码解码可视化 |
| 偏振复用 | 庞加莱球与偏振椭圆，斯托克斯参数实时计算 |
| 双偏振 IQ | 加热器电压调节，偏振旋转与串扰分析 |
| 光接收器 | AWGN 信道、BER vs SNR 曲线、EVM 计算 |

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **状态管理**：Zustand
- **样式方案**：Tailwind CSS
- **动画库**：Framer Motion
- **数学渲染**：KaTeX
- **路由管理**：React Router v6 (HashRouter)
- **可视化**：Canvas 2D + requestAnimationFrame

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
