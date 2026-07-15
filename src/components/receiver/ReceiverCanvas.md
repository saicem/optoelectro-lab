# 光接收器实验 - 设计文档

## 概述

光接收器性能分析实验。模拟 AWGN（加性高斯白噪声）信道下的信号传输，实时展示发送/接收星座图、误码率 (BER) 曲线，支持 QPSK / 16QAM / 64QAM 调制格式。

## 组件结构

| 文件 | 职责 |
|------|------|
| `ReceiverCanvas.tsx` | Canvas 2D 绘制：发送/接收星座图、BER 曲线、状态栏 |
| `ReceiverPage.tsx` | 页面布局：调制格式选择、噪声控制、预设场景、接收性能面板 |
| `useReceiverStore.ts` | Zustand 状态管理 + AWGN 噪声生成 + 最近符号判决 |
| `modulationMath.ts` | 工具函数：`getSymbols`、`calculateEVM`、`theoreticalBer`、`generateBerCurve`、`awgnNoiseStd` |

## 参数说明

### Store 状态 (`useReceiverStore`)

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `modulationFormat` | ModulationFormat | `'16QAM'` | QPSK / 16QAM / 64QAM | 调制格式 |
| `snr` | number | 15 | 0-30 dB | 信噪比 |
| `noiseEnabled` | boolean | true | - | 噪声开关 |
| `isPlaying` | boolean | true | - | 动画播放状态 |
| `receivedPoints` | IQPoint[] | [] | - | 接收点缓存（最多 500 个） |
| `maxReceivedPoints` | number | 500 | - | 缓存上限 |
| `errorCount` | number | 0 | - | 错误符号计数 |
| `totalSymbols` | number | 0 | - | 总发送符号计数 |

### 预设场景

| 预设 | SNR | 说明 |
|------|-----|------|
| `back-to-back` | 30 dB | 背靠背，高 SNR，几乎无误差 |
| `critical` | 10.5 dB | 临界工作点，BER ≈ 10⁻³ |
| `low-snr` | 5 dB | 低信噪比，高误码率 |

### 导出函数 (useReceiverStore.ts)

| 函数 | 说明 |
|------|------|
| `addAwgnNoise(i, q, snrDb, noiseEnabled, format)` | 添加高斯白噪声，使用 Box-Muller 变换生成高斯随机数 |
| `nearestSymbol(point, format)` | 最近邻判决，返回最近星座点及索引 |

## Canvas 绘制逻辑

### 布局

```
// 星座图区域
txConstX = W * 0.25    // 发送端星座图中心
rxConstX = W * 0.75    // 接收端星座图中心
constellationY = H * 0.32
constellationR = min(W*0.17, H*0.2) - 10

// BER 曲线区域
berChartW = min(W - 40, 560)
berChartH = min(H * 0.28, 160)
berChartX = (W - berChartW) / 2
berChartY = H * 0.62
```

### 可视元素命名表

| 元素名称 | 位置 | 颜色 | 描述 | 代码位置 |
|----------|------|------|------|----------|
| `background-grid` | 全画布 | `rgba(51,65,85,0.3)` | 40px 间距背景网格 | `drawGrid` |
| `tx-constellation-circle` | (txConstX, constellationY) | `#334155` | 发送端星座图外圈圆，半径 `constellationR` | `drawConstellation` 内 `arc` |
| `tx-constellation-axes` | (txConstX, constellationY) | `#475569` | 发送端 I/Q 坐标轴（十字线） | `drawConstellation` 内 `lineTo` |
| `tx-constellation-label` | 星座图上方 | `#94a3b8` | 发送端标题 "发送端星座图" | `fillText` |
| `tx-ideal-symbols` | 星座图内 | `#64748b` | 发送端理想符号点（灰色小圆点） | `for` 循环 `arc` |
| `rx-constellation-circle` | (rxConstX, constellationY) | `#334155` | 接收端星座图外圈圆，半径 `constellationR` | `drawConstellation` |
| `rx-constellation-axes` | (rxConstX, constellationY) | `#475569` | 接收端 I/Q 坐标轴（十字线） | `drawConstellation` |
| `rx-constellation-label` | 星座图上方 | `#94a3b8` | 接收端标题 "接收端星座图" | `fillText` |
| `rx-ideal-symbols` | 星座图内 | `#64748b` | 接收端理想符号点（灰色小圆点） | `for` 循环 `arc` |
| `rx-scatter-points` | 星座图内 | `rgba(0,255,136,α)` | 接收端散点，透明度按时间渐变（旧的更透明） | `for` 循环 `arc` |
| `rx-latest-point` | 最新接收位置 | `#ef4444` | 最新接收点（红色高亮圆点） | `arc` 高亮 |
| `rx-decision-line` | 接收点→最近星座点 | `#fbbf24` 虚线 | 判决连线（虚线），连接接收点到最近星座点 | `setLineDash` + `lineTo` |
| `rx-decision-circle` | 最近星座点 | `#fbbf24` | 黄色判决圆圈，标记最近邻判决结果 | `arc` |
| `channel-arrow` | txConstX → rxConstX | `#64748b` | 信道传输方向箭头，标注 "AWGN 噪声信道" | `lineTo` + `fillText` |
| `ber-chart-frame` | (berChartX, berChartY) | `#334155` | BER 曲线图边框，尺寸 `berChartW × berChartH` | `strokeRect` |
| `ber-chart-grid` | BER 图内 | `rgba(51,65,85,0.3)` | BER 图表内部网格线 | `lineTo` 循环 |
| `ber-chart-x-axis` | BER 图底部 | `#64748b` | X 轴：SNR (0-30 dB)，带刻度标签 | `lineTo` + `fillText` |
| `ber-chart-y-axis` | BER 图左侧 | `#64748b` | Y 轴：BER (0-0.5)，对数刻度标签 | `lineTo` + `fillText` |
| `ber-curve-qpsk` | BER 图内 | `#00d4ff` | QPSK 理论 BER 曲线 | `theoreticalBer` + `lineTo` |
| `ber-curve-16qam` | BER 图内 | `#a855f7` | 16QAM 理论 BER 曲线 | `theoreticalBer` + `lineTo` |
| `ber-curve-64qam` | BER 图内 | `#ff3366` | 64QAM 理论 BER 曲线 | `theoreticalBer` + `lineTo` |
| `ber-working-point` | 当前 SNR 对应位置 | `#fbbf24` | 当前工作点：交叉线 + 高亮圆点 | `lineTo` + `arc` |
| `ber-legend` | BER 图右上角 | 多色 | 图例：QPSK(蓝) / 16QAM(紫) / 64QAM(红) | `fillRect` + `fillText` |
| `ber-chart-title` | BER 图上方 | `#94a3b8` | BER 图表标题 "误码率 (BER) 曲线" | `fillText` |
| `status-bar` | 画布底部 | `#94a3b8` | 状态栏：幅度、相位、SNR、采样数 | `fillText` |
| `status-amplitude` | 状态栏内 | `#e2e8f0` | 当前符号幅度值 | `fillText` |
| `status-phase` | 状态栏内 | `#e2e8f0` | 当前符号相位值 | `fillText` |
| `status-snr` | 状态栏内 | `#e2e8f0` | 当前 SNR 值 | `fillText` |
| `status-samples` | 状态栏内 | `#e2e8f0` | 采样总数 | `fillText` |

### 实时采样逻辑

```typescript
// 每帧检查是否到达采样间隔 (0.04s)
if (time - lastSample > 0.04) {
  // 1. 轮询下一个符号
  currentSymbolIdx = (currentSymbolIdx + 1) % symbols.length
  sym = symbols[currentSymbolIdx]

  // 2. 添加 AWGN 噪声
  noisy = addAwgnNoise(sym.i, sym.q, snr, noiseEnabled, format)

  // 3. 最近邻判决
  nearest = nearestSymbol(noisy, format)
  isError = nearest.index !== currentSymbolIdx

  // 4. 存入缓存
  addReceivedPoint(noisy, isError)
}
```

### 噪声计算

```typescript
// Box-Muller 变换生成高斯随机数
function gaussianRandom(): number {
  u1 = Math.random()
  u2 = Math.random()
  return sqrt(-2·ln(u1)) · cos(2π·u2)
}

// 噪声标准差
awgnNoiseStd(snrDb, format) = sqrt(avgSymbolEnergy(format) / (2 · 10^(snrDb/10)))

// 加噪
i_noisy = i + gaussianRandom() · noiseStd
q_noisy = q + gaussianRandom() · noiseStd
```

### BER 理论计算

- **QPSK**：`SER = erfc(√(Es/N0 / 2))`
- **M-QAM**：`SER = 4·(1-1/√M)·0.5·erfc(√(3·Es/N0 / (2·(M-1))))`
- **BER** = SER / bitsPerSymbol

### 性能指标

- **EVM** (误差矢量幅度)：`√(Σ|误差|² / N) / √(Σ|理想|² / N)`
- **理论 BER**：由 `theoreticalBer(format, snr)` 计算
- **实测 BER**：`errorCount / totalSymbols / bitsPerSymbol`

## 数据流

```
useAnimationFrame 每帧回调
  → 每 0.04s 采样一次
    → 轮询符号 → addAwgnNoise → nearestSymbol → addReceivedPoint
    → Store 更新 receivedPoints / errorCount / totalSymbols
      → ReceiverCanvas useEffect 重绘（散点 + BER 工作点）
      → ReceiverPage 重算 EVM / 理论BER / 实测BER
        → 更新接收性能面板

用户切换格式/SNR/噪声 → Store 清空 receivedPoints 重新统计
用户点击预设 → Store 设置 snr + 清空统计
```

## 数学公式

- **SNR**：`SNR(dB) = 10·log₁₀(P_signal / P_noise)`
- **BER**：`BER = 错误比特数 / 总比特数`
- **M-QAM 理论 BER**：`BER ≈ [2(√M-1)/(√M·log₂√M)] · Q(√(3·log₂M/(M-1) · SNR))`
- **EVM**：`EVM = RMSE(误差) / RMSE(理想信号)`

## 依赖关系

- `useAnimationFrame` — 动画帧驱动 + 定时采样
- `useCanvasResize` — Canvas 尺寸响应
- `setupCanvas` / `drawGrid` — Canvas 工具
- `PlaygroundLayout` / `ControlPanel` / `SliderControl` / `SelectControl` / `InfoItem`
- `MathRenderer` — KaTeX 公式渲染
- `getSymbols` / `calculateEVM` / `theoreticalBer` / `generateBerCurve` / `awgnNoiseStd` / `iqAmplitude` / `iqPhase` — 调制数学函数
- `addAwgnNoise` / `nearestSymbol` — Store 导出的噪声与判决函数
