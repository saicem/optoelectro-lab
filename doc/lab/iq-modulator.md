# IQ 调制器实验 - 设计文档

## 概述

同相正交 (I/Q) 调制器可视化。展示 IQ 调制、星座图、波形合成与相干解调全过程，支持 QPSK / 16QAM / 64QAM 三种调制格式。

## 组件结构

| 文件 | 职责 |
|------|------|
| `IQCanvas.tsx` | Canvas 2D 绘制：发送/接收星座图、I/Q 波形、合成信号、解码波形 |
| `IQModulatorPage.tsx` | 页面布局：格式选择、符号循环、手动 I/Q 调节、信号参数显示 |
| `useIQStore.ts` | Zustand 状态管理 |
| `modulationMath.ts` | 工具函数：`getSymbols`、`iqAmplitude` |

## 参数说明

### Store 状态 (`useIQStore`)

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `modulationFormat` | ModulationFormat | `'QPSK'` | QPSK / 16QAM / 64QAM | 调制格式 |
| `symbolIndex` | number | 0 | 0 ~ symbols.length-1 | 当前符号索引 |
| `autoCycle` | boolean | false | - | 自动循环切换符号 |
| `iComponent` | number | 符号[0].i | -1 ~ 1 | I 路分量 |
| `qComponent` | number | 符号[0].q | -1 ~ 1 | Q 路分量 |
| `pPhaseDiff` | number | π/2 | 0 ~ π | I/Q 路相位差（标准 IQ 为 π/2） |
| `isPlaying` | boolean | true | - | 动画播放状态 |
| `time` | number | 0 | - | 动画时间累计 |

### 类型定义

```typescript
type ModulationFormat = 'QPSK' | '16QAM' | '64QAM';
interface IQPoint { i: number; q: number; }
```

### 星座点定义 (`modulationMath.ts`)

- **QPSK** (4 点)：`{(±1, ±1)}`
- **16QAM** (16 点)：`{(±1/3, ±1/3), (±1, ±1/3), (±1/3, ±1), (±1, ±1)}`，步进 2/3
- **64QAM** (64 点)：`i,q ∈ {-7,-5,-3,-1,1,3,5,7}/7`

## Canvas 绘制逻辑

### 布局

```
// 星座图区域
txX = W * 0.18    // 发送端星座图中心 X
rxX = W * 0.82    // 接收端星座图中心 X
constY = H * 0.28 // 星座图中心 Y
r = min(W*0.28, H*0.4) / 2 - 20  // 星座图半径

// 波形区域
wX = W * 0.05     // 波形起点
wW = W * 0.9      // 波形宽度
waveTop = H * 0.55
wH = 40           // 单波形半高
wGap = 12         // 波形间距
```

### 可视元素命名表

| 元素名称 | 位置 | 颜色 | 描述 | 代码位置 |
|----------|------|------|------|----------|
| `background-grid` | 全画布 | `rgba(51,65,85,0.2)` | 手绘背景网格 | `for` 循环 `moveTo/lineTo` |
| `tx-constellation-circle` | (txX, constY) | `#334155` | 发送端星座图外圈圆，半径 `r` | `drawCircleAndAxes` 内 `arc` |
| `tx-constellation-axes` | (txX, constY) | `#475569` | 发送端 I/Q 坐标轴（十字线） | `drawCircleAndAxes` 内 `lineTo` |
| `tx-constellation-label` | 星座图上方 | `#94a3b8` | 发送端标题 "发送端星座图" | `fillText` |
| `tx-symbols` | 星座图内 | `#475569` | 发送端所有可能符号点（灰色小圆点） | `for` 循环 `arc` |
| `tx-active-symbol` | 当前符号位置 | `#00ff88` | 发送端当前激活符号（绿色高亮圆点） | `arc` 高亮 |
| `tx-marker` | (txX+i·r, constY-q·r) | `#f97316` | 发送端标记点（橙色实心圆），带 I/Q 投影虚线 | `drawMarker` |
| `tx-marker-i-line` | 标记→I轴 | `#f97316` 虚线 | I 分量投影线 | `drawMarker` 内 `setLineDash` |
| `tx-marker-q-line` | 标记→Q轴 | `#f97316` 虚线 | Q 分量投影线 | `drawMarker` 内 `setLineDash` |
| `rx-constellation-circle` | (rxX, constY) | `#334155` | 接收端星座图外圈圆，半径 `r` | `drawCircleAndAxes` |
| `rx-constellation-axes` | (rxX, constY) | `#475569` | 接收端 I/Q 坐标轴（十字线） | `drawCircleAndAxes` |
| `rx-constellation-label` | 星座图上方 | `#94a3b8` | 接收端标题 "接收端星座图" | `fillText` |
| `rx-symbols` | 星座图内 | `#475569` | 接收端所有可能符号点 | `for` 循环 `arc` |
| `rx-active-symbol` | 解码位置 | `#00ff88` | 接收端解码后的符号位置 | `arc` 高亮 |
| `rx-marker` | (rxX+decodedI·r, constY-decodedQ·r) | `#22c55e` | 接收端标记点（绿色），带 I/Q 投影虚线 | `drawMarker` |
| `rx-marker-i-line` | 标记→I轴 | `#22c55e` 虚线 | 解码 I 分量投影线 | `drawMarker` |
| `rx-marker-q-line` | 标记→Q轴 | `#22c55e` 虚线 | 解码 Q 分量投影线 | `drawMarker` |
| `transfer-arrow` | txX → rxX | `#64748b` | 传输方向箭头，标注 "光纤传输 + 相干接收" | `lineTo` + `fillText` |
| `i-waveform` | Y=`waveTop` | `#00d4ff` | I 路波形：`I·cos(ωt)`，蓝色 | `drawWave` |
| `i-waveform-label` | 波形左侧 | `#94a3b8` | I 路标签 "I 路" | `fillText` |
| `q-waveform` | Y=`waveTop+wH+gap` | `#a855f7` | Q 路波形：`Q·cos(ωt - P)`，紫色 | `drawWave` |
| `q-waveform-label` | 波形左侧 | `#94a3b8` | Q 路标签 "Q 路" | `fillText` |
| `combined-waveform` | Y=`waveTop+2(wH+gap)` | `#00ff88` | 合成信号：`s(t) = I·cos(ωt) + Q·cos(ωt-P)`，绿色 | `drawWave` |
| `combined-waveform-label` | 波形左侧 | `#94a3b8` | 合成信号标签 "合成信号 s(t)" | `fillText` |
| `i-decode-waveform` | Y=`waveTop+3(wH+gap)` | `#00d4ff` | I 解码波形：`s(t)·2cos(ωt)`，虚线标示直流分量 I | `drawDecodeWave` |
| `i-decode-label` | 波形左侧 | `#94a3b8` | I 解码标签 "I 解码" | `fillText` |
| `i-decode-dc-line` | 解码波形内 | `#00d4ff` 虚线 | I 解码直流分量参考线 | `drawDecodeWave` 内 `setLineDash` |
| `q-decode-waveform` | Y=`waveTop+4(wH+gap)` | `#a855f7` | Q 解码波形：`s(t)·2sin(ωt)`，虚线标示直流分量 Q | `drawDecodeWave` |
| `q-decode-label` | 波形左侧 | `#94a3b8` | Q 解码标签 "Q 解码" | `fillText` |
| `q-decode-dc-line` | 解码波形内 | `#a855f7` 虚线 | Q 解码直流分量参考线 | `drawDecodeWave` 内 `setLineDash` |

### 解码计算

```typescript
// 相位差 P 影响解码结果
decodedI = I + Q * cos(P)
decodedQ = Q * sin(P)
// 当 P = π/2 时：decodedI = I, decodedQ = Q（标准 IQ 解调）
```

### 自动循环

- `autoCycle` 开启时，每 0.8 秒自动切换到下一个符号
- 切换时自动更新 `iComponent` 和 `qComponent`

## 数据流

```
用户选择格式 → Store 更新 modulationFormat + 重置 symbolIndex/iComponent/qComponent
用户拖动符号索引 → Store 更新 symbolIndex + 同步 iComponent/qComponent
用户手动调节 I/Q → Store 更新 iComponent/qComponent（独立于符号）
  → IQCanvas useEffect 重绘
    → 计算解码 I/Q → 绘制星座图 + 波形 + 解码波形
  → IQModulatorPage 重算 amplitude + signalValue + bitsPerSymbol
```

## 数学公式

- **调制信号**：`s(t) = I·cos(ωt) + Q·cos(ωt - Δφ)`
- **标准 IQ**（Δφ=π/2）：`s(t) = I·cos(ωt) + Q·sin(ωt)`
- **相干解调**：`s(t)·2cos(ωt) →低通→ I`，`s(t)·2sin(ωt) →低通→ Q`
- **幅度/相位**：`A = √(I²+Q²)`，`φ = arctan(Q/I)`

## 依赖关系

- `useAnimationFrame` — 动画帧驱动
- `useCanvasResize` — Canvas 尺寸响应
- `setupCanvas` — DPR 缩放（无 `drawGrid`，手绘网格）
- `PlaygroundLayout` / `ControlPanel` / `SliderControl` / `SelectControl` / `InfoItem`
- `MathRenderer` — KaTeX 公式渲染
- `getSymbols` / `iqAmplitude` — 调制数学函数
