# MZ 调制器实验 - 设计文档

## 概述

马赫-曾德干涉仪 (Mach-Zehnder Interferometer) 调制器可视化。支持三种调制模式：单臂、双臂、推挽，实时展示光波在波导中的传播和调制过程。

## 组件结构

| 文件 | 职责 |
|------|------|
| `MZCanvas.tsx` | Canvas 2D 绘制：波导结构、电极信号、迷你波形、转移函数曲线 |
| `MZModulatorPage.tsx` | 页面布局：模式切换、参数控制、输出参数显示、原理说明 |
| `useMZStore.ts` | Zustand 状态管理 |
| `modulationMath.ts` | 工具函数：`mzOutputPower`、`mzTransferFunction` |

## 参数说明

### Store 状态 (`useMZStore`)

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `mode` | ModulationMode | `'single-arm'` | single-arm / dual-arm / push-pull | 调制模式 |
| `modulationDepth` | number | 1 | 0-π | 调制深度（弧度） |
| `modulationDepth2` | number | 1 | 0-π | 上臂调制深度（仅双臂模式） |
| `phaseShift` | number | 0 | 0-2π | 直流偏置相位 |
| `inputPower` | number | 1 | 0-2 mW | 输入光功率 |
| `frequency` | number | 1 | 0.1-5 Hz | 调制信号频率 |
| `isPlaying` | boolean | true | - | 动画播放状态 |
| `time` | number | 0 | - | 动画时间累计 |

### 类型定义

```typescript
type ModulationMode = 'single-arm' | 'dual-arm' | 'push-pull';
```

## Canvas 绘制逻辑

### 布局（X 轴）

```
inputX    = 40              // 输入端
splitterX = W * 0.25        // 分束器
combinerX = W * 0.75        // 合束器
outputX   = W - 40          // 输出端
```

### 布局（Y 轴）

```
centerY = H / 2
upperY  = centerY - 90      // 上臂波导
lowerY  = centerY + 90      // 下臂波导
```

### 可视元素命名表

| 元素名称 | 位置 | 颜色 | 描述 | 代码位置 |
|----------|------|------|------|----------|
| `background-grid` | 全画布 | `rgba(51,65,85,0.3)` | 40px 间距背景网格 | `drawGrid` |
| `input-waveguide` | (inputX, centerY) → (splitterX, centerY) | `#00d4ff` | 输入段波导，发光线宽 6 圆角 | `drawWaveguide` 输入段 |
| `upper-arm-waveguide` | (splitterX, upperY) → (combinerX, upperY) | 模式相关 | 上臂波导：单臂/推挽 `#00d4ff`，双臂 `#a855f7` | `drawWaveguide` 上臂段 |
| `lower-arm-waveguide` | (splitterX, lowerY) → (combinerX, lowerY) | 模式相关 | 下臂波导：单臂 `#ff3366`，双臂 `#ff3366`，推挽 `#ff8800` | `drawWaveguide` 下臂段 |
| `output-waveguide` | (combinerX, centerY) → (outputX, centerY) | `#00ff88` | 输出段波导，仅 `outputP > 0.01` 时高亮 | `drawWaveguide` 输出段 |
| `splitter-node` | (splitterX, centerY) | `#00d4ff` | 分束器圆形节点，半径 12 | `drawSplitterCombiner` |
| `combiner-node` | (combinerX, centerY) | `#00ff88` | 合束器圆形节点，半径 12 | `drawSplitterCombiner` |
| `upper-electrode` | 上臂上方 | `#a855f7` | 上臂电极信号：虚线 + 迷你正弦波，双臂/推挽模式显示 | `drawElectrode` |
| `lower-electrode` | 下臂下方 | `#ff3366` | 下臂电极信号：虚线 + 迷你正弦波，所有模式显示 | `drawElectrode` |
| `input-mini-wave` | 输入段上方 | `#00d4ff` | 输入端 30px 宽迷你正弦波形 | `drawMiniWave` |
| `upper-mini-wave` | 上臂段上方 | 模式相关 | 上臂迷你波形，颜色随模式 | `drawMiniWave` |
| `lower-mini-wave` | 下臂段上方 | 模式相关 | 下臂迷你波形，颜色随模式 | `drawMiniWave` |
| `output-mini-wave` | 输出段上方 | `#00ff88` | 输出端迷你波形，亮度随输出功率 | `drawMiniWave` |
| `transfer-function-plot` | 右下角 140×80 窗口 | 多色 | 转移函数曲线窗口，绘制 `cos²(Δφ/2)` 曲线 | `drawTransferFunction` |
| `transfer-function-curve` | 转移函数窗口内 | `#64748b` | 灰色理论转移函数曲线 | `drawTransferFunction` 内 `lineTo` |
| `transfer-function-marker` | 转移函数曲线上 | `#fbbf24` | 黄色圆点，标记当前工作点位置 | `drawTransferFunction` 内 `arc` |
| `mode-label` | 顶部 | `#94a3b8` | 当前模式文字标签 | `fillText` |
| `phase-diff-label` | 中部 | `#94a3b8` | 相位差数值显示 | `fillText` |

### 调制模式逻辑

```typescript
// single-arm: 上臂仅偏置，下臂调制
upperPhase = phaseShift
lowerPhase = modulationDepth * sin(2π·f·t) + phaseShift

// dual-arm: 两臂独立调制
upperPhase = modulationDepth2 * sin(2π·f·t + 0.5) + phaseShift
lowerPhase = modulationDepth * sin(2π·f·t) + phaseShift

// push-pull: 反相驱动
upperPhase = -modulationDepth * sin(2π·f·t) + phaseShift
lowerPhase =  modulationDepth * sin(2π·f·t) + phaseShift
```

### 输出计算

- 总相位差：`Δφ = lowerPhase - upperPhase`
- 输出功率：`P_out = P_in · cos²(Δφ/2)`（`mzOutputPower` 函数）
- 消光比：`ER = 10·log₁₀(P_in / max(P_out, 0.001))`

## 数据流

```
用户切换模式/拖动滑块 → Store 更新
  → MZCanvas useEffect 重绘
    → 根据模式计算 upperPhase/lowerPhase
    → 绘制波导、电极、波形、转移函数
  → MZModulatorPage 重算
    → totalPhaseDiff, outputPower, extinctionRatio
    → 更新信息面板 + 原理说明卡片（随模式切换）
```

## 数学公式

- **转移函数**：`P_out = P_in · cos²(Δφ/2)`
- **单臂相位**：`Δφ = πV/V_π`
- **双臂相位**：`Δφ = π(V₁-V₂)/V_π`
- **推挽相位**：`Δφ = 2πV/V_π`（V_π 减半）

## 依赖关系

- `useAnimationFrame` — 动画帧驱动
- `useCanvasResize` — Canvas 尺寸响应
- `setupCanvas` / `drawGrid` — Canvas 工具
- `PlaygroundLayout` / `ControlPanel` / `SliderControl` / `SelectControl` / `InfoItem`
- `MathRenderer` — KaTeX 公式渲染
- `mzOutputPower` / `mzTransferFunction` — 调制数学函数
