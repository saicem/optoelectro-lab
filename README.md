# 光电效应可视化平台

一个基于 React 的交互式光学可视化平台，通过精美的动画和实时参数控制，帮助理解光电子器件的工作原理。

![平台预览](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## 在线访问

**GitHub Pages**: https://saicem.github.io/photoelectricity-visualization/

## 功能模块

### 1. 光波干涉

实时演示双光束干涉现象，支持调节波长、振幅和相位差。

**核心公式**：

双光束干涉强度：
$$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos(\Delta\phi)$$

其中相位差：
$$\Delta\phi = \frac{2\pi}{\lambda}\Delta x + \Delta\phi_0$$

条纹可见度：
$$V = \frac{I_{max} - I_{min}}{I_{max} + I_{min}}$$

### 2. MZ 调制器

马赫-曾德电光调制器原理演示，展示光信号调制过程。

**核心公式**：

输出电场：
$$E_{out} = E_{in} \cdot \cos\left(\frac{\Delta\phi}{2}\right) e^{i\Delta\phi/2}$$

输出功率：
$$P_{out} = P_{in} \cdot \cos^2\left(\frac{\Delta\phi}{2}\right)$$

调制关系：
$$\Delta\phi = \frac{\pi V}{V_\pi}$$

### 3. IQ 调制器

正交幅度调制可视化，支持 QPSK、16QAM、64QAM 等调制格式。

**核心公式**：

IQ 调制信号：
$$s(t) = I \cdot \cos(\omega t) + Q \cdot \sin(\omega t) = A \cdot \cos(\omega t - \phi)$$

幅度与相位：
$$A = \sqrt{I^2 + Q^2}, \quad \phi = \arctan\left(\frac{Q}{I}\right)$$

### 4. XY 偏振复用

偏振态可视化与双通道复用技术，基于斯托克斯矢量分析。

**核心公式**：

斯托克斯矢量：
$$S_0 = E_x^2 + E_y^2$$
$$S_1 = E_x^2 - E_y^2$$
$$S_2 = 2E_x E_y \cos\delta$$
$$S_3 = 2E_x E_y \sin\delta$$

偏振度（DOP）：
$$DOP = \frac{\sqrt{S_1^2 + S_2^2 + S_3^2}}{S_0}$$

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 项目结构

```
src/
├── components/
│   ├── common/          # 通用组件（导航栏、控制面板、模块卡片）
│   ├── interference/    # 干涉模块 Canvas 组件
│   ├── mz-modulator/    # MZ 调制器 Canvas 组件
│   ├── iq-modulator/    # IQ 调制器 Canvas 组件
│   └── polarization/    # 偏振复用 Canvas 组件
├── pages/               # 页面组件
├── stores/              # Zustand 状态管理
├── hooks/               # 自定义 Hooks
├── utils/               # 数学公式与工具函数
└── App.tsx              # 应用入口
```

## License

MIT License
