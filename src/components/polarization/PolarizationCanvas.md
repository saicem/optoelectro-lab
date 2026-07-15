# 偏振复用实验 - 设计文档

## 概述

光波偏振态可视化与双通道偏振复用技术演示。通过庞加莱球、斯托克斯参数、偏振椭圆等工具展示偏振态变化，支持单偏振和偏振复用两种模式。

## 组件结构

| 文件 | 职责 |
|------|------|
| `PolarizationCanvas.tsx` | Canvas 2D 绘制：庞加莱球投影、偏振波形、复用示意、偏振椭圆 |
| `PolarizationPage.tsx` | 页面布局：偏振参数控制、斯托克斯参数显示、复用模式切换 |
| `usePolarizationStore.ts` | Zustand 状态管理 |
| `polarizationMath.ts` | 工具函数：`polarizationState`、`stokesToPoincare`、`calculateDOP`、`rotateStokes`、`phaseRetarder` |

## 参数说明

### Store 状态 (`usePolarizationStore`)

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `ex` | number | 1 | 0-1.5 | X 分量振幅 (Eₓ) |
| `ey` | number | 1 | 0-1.5 | Y 分量振幅 (E_y) |
| `delta` | number | π/4 | 0-2π | X/Y 分量相位差 (δ) |
| `rotationAngle` | number | 0 | 0-π | 偏振旋转角 |
| `xPower` | number | 1 | 0-2 mW | X 通道功率（复用模式） |
| `yPower` | number | 0.8 | 0-2 mW | Y 通道功率（复用模式） |
| `multiplexing` | boolean | true | - | 偏振复用模式开关 |
| `isPlaying` | boolean | true | - | 动画播放状态 |
| `time` | number | 0 | - | 动画时间累计 |

### 计算属性

- `getStokes()` — 通过 `polarizationState(ex, ey, delta)` 计算斯托克斯参数

## Canvas 绘制逻辑

### 布局

```
// 庞加莱球区域（左侧）
poincareCX = W * 0.25    // 球心 X
poincareCY = H / 2       // 球心 Y
poincareR  = min(W*0.2, H*0.38)  // 球半径

// 波形区域（右侧）
waveX = W * 0.5
waveW = W * 0.45
waveCenterY = H / 2

// 复用示意（右上）
muxX = W * 0.5
muxY = H * 0.12
muxW = W * 0.45
```

### 可视元素命名表

| 元素名称 | 位置 | 颜色 | 描述 | 代码位置 |
|----------|------|------|------|----------|
| `background-grid` | 全画布 | `rgba(51,65,85,0.3)` | 40px 间距背景网格 | `drawGrid` |
| `poincare-sphere-circle` | (poincareCX, poincareCY) | `#1e293b` 填充 / `#475569` 描边 | 庞加莱球外圈圆轮廓，半径 `poincareR` | `arc` |
| `poincare-sphere-fill` | 球内 | `rgba(0,212,255,0.05)` | 庞加莱球内部填充（淡蓝） | `fill` |
| `poincare-horizontal-ellipse` | 球心 | `#475569` 虚线 | 水平椭圆（模拟球体赤道线） | `ellipse` |
| `poincare-vertical-ellipse` | 球心 | `#475569` 虚线 | 垂直椭圆（模拟球体经线） | `ellipse` |
| `poincare-axis-s1` | 球心水平 | `#64748b` 虚线 | S₁ 轴（水平方向），标注 "+S₁" | `lineTo` + `fillText` |
| `poincare-axis-s2` | 球心垂直 | `#64748b` 虚线 | S₂ 轴（垂直方向），标注 "+S₂" | `lineTo` + `fillText` |
| `poincare-state-point` | 球面投影位置 | `#ef4444` | 红色偏振态标记点，半径 5，带辉光 | `arc` |
| `poincare-state-line` | 球心→偏振态点 | `#ef4444` 虚线 | 从球心到偏振态点的连线 | `lineTo` |
| `poincare-dop-label` | 球下方 | `#94a3b8` | DOP（偏振度）数值标注 | `fillText` |
| `poincare-title` | 球上方 | `#94a3b8` | 标题 "庞加莱球投影" | `fillText` |
| `mux-diagram-box` | (muxX, muxY) | `#334155` 描边 | 复用/单偏振示意圆角矩形框 | `roundRect` |
| `mux-x-channel` | 示意框内 | `#00d4ff` | X 偏振通道（蓝色线段/箭头） | `lineTo` |
| `mux-y-channel` | 示意框内 | `#ff3366` | Y 偏振通道（红色线段/箭头） | `lineTo` |
| `mux-combined` | 示意框内 | `#a855f7` | 合波输出（紫色线段/箭头） | `lineTo` |
| `mux-label` | 示意框旁 | `#94a3b8` | 模式标签："偏振复用" 或 "单偏振" | `fillText` |
| `waveform-x` | Y=`waveCenterY-30` | `#00d4ff` | X 偏振波形（复用模式）：`-exAmp·cos(t)` | `drawWaveform` |
| `waveform-y` | Y=`waveCenterY+30` | `#ff3366` | Y 偏振波形（复用模式）：`-eyAmp·cos(t+δ)` | `drawWaveform` |
| `waveform-combined` | Y=`waveCenterY` | `#00ff88` | 合成偏振波形（单偏振模式）：`-(exAmp·cos(t)+eyAmp·cos(t+δ))·0.5` | `drawWaveform` |
| `waveform-label-x` | 波形左侧 | `#94a3b8` | X 偏振标签 "X 偏振 (TE)" | `fillText` |
| `waveform-label-y` | 波形左侧 | `#94a3b8` | Y 偏振标签 "Y 偏振 (TM)" | `fillText` |
| `waveform-label-combined` | 波形左侧 | `#94a3b8` | 合成波形标签 "合成偏振态" | `fillText` |
| `polarization-ellipse-box` | 右下角 60×60 | `#334155` 描边 | 偏振椭圆方框（仅复用模式） | `roundRect` |
| `polarization-ellipse-curve` | 椭圆框内 | `#00ff88` | Lissajous 图形：`x=exAmp·cos(t), y=eyAmp·cos(t+δ)` | `lineTo` 循环 |
| `polarization-ellipse-label` | 椭圆框旁 | `#94a3b8` | 标签 "偏振椭圆" | `fillText` |

### 斯托克斯参数计算流程

```typescript
// 1. 基础斯托克斯参数
stokes = polarizationState(ex, ey, delta)
// S0 = ex² + ey², S1 = ex² - ey², S2 = 2·ex·ey·cos(δ), S3 = 2·ex·ey·sin(δ)

// 2. 旋转
rotated = rotateStokes(stokes, rotationAngle)
// S1' = S1·cos(2θ) + S2·sin(2θ), S2' = -S1·sin(2θ) + S2·cos(2θ)

// 3. 相位延迟（仅复用模式）
finalStokes = phaseRetarder(rotated, delta)
// S2'' = S2'·cos(δ) - S3'·sin(δ), S3'' = S2'·sin(δ) + S3'·cos(δ)

// 4. 映射到庞加莱球坐标
poincare = stokesToPoincare(finalStokes)  // {x: S1/S0, y: S2/S0, z: S3/S0}

// 5. 偏振度
dop = calculateDOP(finalStokes)  // √(S1²+S2²+S3²) / S0
```

### 庞加莱球点投影

```typescript
// 2D 投影：x 轴 → 水平，y/z 轴 → 混合垂直
pointX = poincareCX + poincare.x * poincareR
pointY = poincareCY - poincare.y * poincareR * 0.3 - poincare.z * poincareR * 0.5
```

## 数据流

```
用户调节 ex/ey/delta/rotationAngle → Store 更新
  → getStokes() 重新计算斯托克斯参数
  → PolarizationCanvas useEffect 重绘
    → rotateStokes → (phaseRetarder) → stokesToPoincare → calculateDOP
    → 绘制庞加莱球点 + 波形 + 复用示意
  → PolarizationPage 重算 stokes + dop
    → 更新斯托克斯参数面板
```

## 数学公式

- **偏振态**：`E(t) = Eₓ·cos(ωt)·x̂ + E_y·cos(ωt + δ)·ŷ`
- **斯托克斯参数**：`S0 = Eₓ²+E_y²`, `S1 = Eₓ²-E_y²`, `S2 = 2EₓE_y·cos(δ)`, `S3 = 2EₓE_y·sin(δ)`
- **偏振度**：`DOP = √(S1²+S2²+S3²) / S0`

## 依赖关系

- `useAnimationFrame` — 动画帧驱动
- `useCanvasResize` — Canvas 尺寸响应
- `setupCanvas` / `drawGrid` — Canvas 工具
- `PlaygroundLayout` / `ControlPanel` / `SliderControl` / `InfoItem`
- `MathRenderer` — KaTeX 公式渲染
- `polarizationState` / `stokesToPoincare` / `calculateDOP` / `rotateStokes` / `phaseRetarder` — 偏振数学函数
