# 光波干涉实验 - 设计文档

## 概述

双光束干涉的实时可视化实验。展示两束相干光波的叠加过程及干涉强度分布。

## 组件结构

| 文件 | 职责 |
|------|------|
| `InterferenceCanvas.tsx` | Canvas 2D 绘制：波 1、波 2、叠加波、干涉强度分布 |
| `InterferencePage.tsx` | 页面布局：参数控制面板、物理参数显示、干涉原理说明 |
| `useInterferenceStore.ts` | Zustand 状态管理 |
| `waveMath.ts` | 工具函数：`sineWave`、`superposeWaves`、`interferenceIntensity`、`wavelengthToColor` |

## 参数说明

### Store 状态 (`useInterferenceStore`)

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `wavelength` | number | 550 | 380-780 nm | 光波长，决定波的颜色和空间周期 |
| `amplitude1` | number | 1 | 0-2 | 波 1 振幅 |
| `amplitude2` | number | 1 | 0-2 | 波 2 振幅 |
| `phaseDiff` | number | 0 | 0-2π | 两波相位差 |
| `isPlaying` | boolean | true | - | 动画播放状态 |
| `time` | number | 0 | - | 动画时间累计 |

## Canvas 绘制逻辑

### 布局（Y 轴）

```
centerY = H / 2
waveY1   = centerY - 110   // 波 1 (E₁)
waveY2   = centerY - 30    // 波 2 (E₂)
resultY  = centerY + 50    // 叠加波 (E₁+E₂)
intensityBaseY = resultY   // 干涉强度分布底线（与叠加波中轴对齐）
```

### 可视元素命名表

| 元素名称 | 位置 | 颜色 | 描述 | 代码位置 |
|----------|------|------|------|----------|
| `background-grid` | 全画布 | `rgba(51,65,85,0.3)` | 40px 间距背景网格 | `drawGrid(ctx, W, H, 40, ...)` |
| `wave-1` | Y=`waveY1` | `wavelengthToColor(λ)` | 波 1 (E₁)，实线，线宽 2，带辉光 | `drawWave(waveY1, ...)` |
| `wave-1-label` | (10, waveY1-35) | `#94a3b8` | 波 1 文字标签 "波 1 (E₁)" | `drawWave` 内 `fillText` |
| `wave-2` | Y=`waveY2` | `#a855f7` | 波 2 (E₂)，紫色虚线 `[5,5]`，线宽 2，带辉光 | `drawWave(waveY2, ...)` |
| `wave-2-label` | (10, waveY2-35) | `#94a3b8` | 波 2 文字标签 "波 2 (E₂)" | `drawWave` 内 `fillText` |
| `superposition-wave` | Y=`resultY` | `#00ff88` | 叠加波 (E₁+E₂)，绿色实线，线宽 2.5，强辉光 | `superposeWaves` 循环 |
| `superposition-label` | (10, resultY-35) | `#00ff88` | 叠加波文字标签 "叠加波 (E₁ + E₂)"，加粗 | `fillText` |
| `intensity-bars` | Y=`intensityBaseY` 向下 | `color` → `color+44` 渐变 | 干涉强度分布柱状图，柱宽 3px 间距 1px，从底线向下生长 | `for` 循环 `fillRect` |
| `intensity-label` | (10, intensityBaseY+70) | `#94a3b8` | 强度分布文字标签 "干涉强度分布" | `fillText` |
| `intensity-baseline` | Y=`intensityBaseY` | `#334155` | 强度零线参考虚线 `[3,3]`，线宽 1 | `setLineDash` + `lineTo` |

### 绘制公式

1. **波 1** (`wave-1`)：`y = waveY1 + A₁·25·sin(2π·x/(λ·2) + ω·t)`
2. **波 2** (`wave-2`)：`y = waveY2 + A₂·25·sin(2π·x/(λ·2) + phaseDiff + ω·t)`
3. **叠加波** (`superposition-wave`)：`y = resultY + superposeWaves(x, [波1, 波2])`
4. **干涉强度** (`intensity-bars`)：

   > **物理修正**：两束波空间频率相同（同一 `k = 2π/(λ·2)`），相位差恒为 `phaseDiff`，不随位置 `x` 变化。强度公式为：
   >
   > `I = (A₁² + A₂² + 2·A₁·A₂·cos(phaseDiff)) / (A₁+A₂)²`
   >
   > 强度在空间上均匀分布，柱状图各处等高。调节 `phaseDiff` 可见整体亮度变化（构造/消光干涉）。

### 动画驱动

- `useAnimationFrame` 每帧回调，`isPlaying` 时累加 `time`
- `time` 乘以 2 作为相位演化的 `t` 值
- `omega = 2π / (wavelength * 2)` 控制波的传播速度

## 数据流

```
用户拖动滑块 → Store 更新参数
  → InterferenceCanvas useEffect 依赖项变化
    → 重新绘制 Canvas
  → InterferencePage 重新计算物理参数 (I₁, I₂, 叠加光强, 可见度)
    → 更新右侧信息面板
```

## 数学公式

- **光波叠加**：`E = E₁ + E₂ = A₁cos(ωt) + A₂cos(ωt + Δφ)`
- **干涉强度**：`I = I₁ + I₂ + 2√(I₁I₂)·cos(Δφ)`，其中 `Δφ = phaseDiff`（恒定）
- **条纹可见度**：`V = (I_max - I_min) / (I_max + I_min) = 2A₁A₂ / (A₁² + A₂²)`

## 依赖关系

- `useAnimationFrame` — 动画帧驱动
- `useCanvasResize` — Canvas 尺寸响应
- `setupCanvas` — DPR 缩放
- `drawGrid` — 背景网格
- `PlaygroundLayout` — 页面布局框架
- `ControlPanel` / `SliderControl` / `InfoItem` — 控制面板组件
- `MathRenderer` — KaTeX 公式渲染
