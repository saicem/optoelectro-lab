import { CircuitBoard, Info } from 'lucide-react';
import { useMZStore } from '@/stores/useMZStore';
import ControlPanel, { SliderControl, SelectControl, InfoItem } from '@/components/common/ControlPanel';
import MZCanvas from '@/components/mz-modulator/MZCanvas';
import { mzOutputPower, mzTransferFunction } from '@/utils/modulationMath';
import MathRenderer from '@/components/common/MathRenderer';
import PlaygroundLayout from '@/components/common/PlaygroundLayout';
import { ROUTES } from '@/constants/routes';

export default function MZModulatorPage() {
  const {
    modulationDepth,
    modulationDepth2,
    phaseShift,
    inputPower,
    frequency,
    mode,
    isPlaying,
    setModulationDepth,
    setModulationDepth2,
    setPhaseShift,
    setInputPower,
    setFrequency,
    setMode,
    setIsPlaying,
    reset,
  } = useMZStore();

  let upperPhase: number;
  let lowerPhase: number;

  switch (mode) {
    case 'single-arm':
      upperPhase = phaseShift;
      lowerPhase = mzTransferFunction(modulationDepth, 1) + phaseShift;
      break;
    case 'dual-arm':
      upperPhase = mzTransferFunction(modulationDepth2, 1) + phaseShift;
      lowerPhase = mzTransferFunction(modulationDepth, 1) + phaseShift;
      break;
    case 'push-pull':
      upperPhase = -mzTransferFunction(modulationDepth, 1) + phaseShift;
      lowerPhase = mzTransferFunction(modulationDepth, 1) + phaseShift;
      break;
  }

  const totalPhaseDiff = lowerPhase - upperPhase;
  const outputPower = mzOutputPower(inputPower, totalPhaseDiff);
  const extinctionRatio = inputPower > 0 ? 10 * Math.log10(inputPower / Math.max(outputPower, 0.001)) : 0;

  const formatPiRad = (v: number) => (v / Math.PI).toFixed(2) + ' π rad';

  const modeLabels: Record<string, string> = {
    'single-arm': '单臂调制',
    'dual-arm': '双臂调制',
    'push-pull': '推挽调制',
  };

  return (
    <PlaygroundLayout
      icon={<CircuitBoard className="w-5 h-5" />}
      iconColor="#22c55e"
      title="MZ 调制器"
      subtitle={
        mode === 'single-arm'
          ? '仅调制下臂，上臂为参考臂'
          : mode === 'dual-arm'
            ? '两臂独立调制，分别施加不同驱动信号'
            : '两臂施加反相信号 (V, -V)，相位差加倍'
      }
      learnPath={ROUTES.LEARN.MZ_MODULATOR}
      canvas={<MZCanvas />}
      canvasMinHeight={480}
      controlPanel={
        <>
          <ControlPanel
            title="参数调节"
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={reset}
          >
            <SelectControl
              label="调制模式"
              value={mode}
              options={[
                { value: 'single-arm', label: '单臂' },
                { value: 'dual-arm', label: '双臂' },
                { value: 'push-pull', label: '推挽' },
              ]}
              onChange={setMode}
            />
            <SliderControl
              label="调制深度"
              value={modulationDepth}
              min={0}
              max={Math.PI}
              step={0.01}
              onChange={setModulationDepth}
              color="#f59e0b"
              valueFormatter={formatPiRad}
            />
            {mode === 'dual-arm' && (
              <SliderControl
                label="上臂调制深度"
                value={modulationDepth2}
                min={0}
                max={Math.PI}
                step={0.01}
                onChange={setModulationDepth2}
                color="#a855f7"
                valueFormatter={formatPiRad}
              />
            )}
            <SliderControl
              label="直流偏置"
              value={phaseShift}
              min={0}
              max={Math.PI * 2}
              step={0.01}
              onChange={setPhaseShift}
              color="#00d4ff"
              valueFormatter={formatPiRad}
            />
            <SliderControl
              label="输入光功率"
              value={inputPower}
              min={0}
              max={2}
              step={0.01}
              unit=" mW"
              onChange={setInputPower}
              color="#00d4ff"
            />
            <SliderControl
              label="调制频率"
              value={frequency}
              min={0.1}
              max={5}
              step={0.1}
              unit=" Hz"
              onChange={setFrequency}
              color="#a855f7"
            />
          </ControlPanel>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-green" />
              <h3 className="font-display font-semibold text-lab-text">输出参数</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="调制模式" value={modeLabels[mode]} color="#00d4ff" />
              <InfoItem label="输出光功率" value={outputPower.toFixed(3) + ' mW'} color="#00ff88" />
              <InfoItem label="两臂相位差" value={formatPiRad(totalPhaseDiff)} color="#f59e0b" />
              <InfoItem
                label="有效 V_π"
                value={mode === 'single-arm' ? 'V_π' : mode === 'push-pull' ? 'V_π/2' : 'V_π (单臂)'}
                color="#a855f7"
              />
              <InfoItem label="消光比" value={extinctionRatio.toFixed(1) + ' dB'} color="#ff3366" />
            </div>
          </div>
        </>
      }
    >
      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">工作原理</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-green font-semibold">马赫-曾德干涉仪：</span>
              输入光通过分束器分成两束，分别经过两臂传输后在合束器重新汇合。
              通过电光效应改变其中一臂的折射率，从而控制两臂的相位差。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$E_{out} = E_{in} \\cdot \\cos\\left(\\frac{\\Delta\\phi}{2}\\right)$'}</MathRenderer>
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-cyan font-semibold">强度调制：</span>
              输出光强随相位差呈余弦平方关系，这就是 MZ 调制器的转移函数。
              模式切换改变了两臂的驱动方式，但基本原理不变。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$P_{out} = P_{in} \\cdot \\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right)$$'}</MathRenderer>
            </div>
          </div>
        </div>
      </div>

      {mode === 'single-arm' && (
        <div className="bg-lab-surface/30 border border-laser-green/30 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-2">单臂调制</h3>
          <p className="text-sm text-lab-muted leading-relaxed">
            仅在其中一臂施加调制电压，另一臂作为纯光程参考臂。 相位差 Δφ = φ₁ - φ₂ 完全由调制臂决定。等效半波电压等于
            V_π。 结构最简单，但调制效率最低，且会产生啁啾。
          </p>
          <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2">
            <MathRenderer>{'$$\\Delta\\phi = \\frac{\\pi V}{V_\\pi}$$'}</MathRenderer>
          </div>
        </div>
      )}
      {mode === 'dual-arm' && (
        <div className="bg-lab-surface/30 border border-laser-purple/30 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-2">双臂调制</h3>
          <p className="text-sm text-lab-muted leading-relaxed">
            两臂分别独立施加调制电压 V₁ 和 V₂。相位差 Δφ = φ₁ - φ₂ 由两臂信号共同决定。
            双臂调制提供了最大的灵活性——可以独立控制每臂的相位，为 IQ 调制奠定基础。
          </p>
          <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2">
            <MathRenderer>{'$$\\Delta\\phi = \\frac{\\pi \\cdot (V_1 - V_2)}{V_\\pi}$$'}</MathRenderer>
          </div>
        </div>
      )}
      {mode === 'push-pull' && (
        <div className="bg-lab-surface/30 border border-laser-orange/30 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-2">推挽调制</h3>
          <p className="text-sm text-lab-muted leading-relaxed">
            双臂调制的特例：V₂ = -V₁（即反相驱动）。此时 Δφ = 2·π·V/V_π， 等效半波电压降至
            V_π/2，调制效率翻倍。推挽结构还能有效抑制啁啾， 是高速光通信系统中最常用的 MZM 驱动方案。
          </p>
          <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2">
            <MathRenderer>{'$$\\Delta\\phi = \\frac{2\\pi V}{V_\\pi}$$'}</MathRenderer>
          </div>
        </div>
      )}

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">推挽结构与偏置控制</h3>
        <div className="space-y-3 text-sm text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">推挽结构 (Push-Pull)：</span>
            传统单臂调制仅在其中一臂施加电压，而推挽结构在两臂上施加极性相反的电压 (V 和 -V)。 两臂相位变化量分别为
            +Δφ/2 和 -Δφ/2，总相位差 Δφ 加倍，从而使所需驱动电压减半。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {
                '$$\\Delta\\phi = \\frac{2\\pi}{\\lambda} \\cdot [n(V) \\cdot L - n(-V) \\cdot L] = 2 \\cdot \\frac{2\\pi}{\\lambda} \\cdot \\Delta n \\cdot L$$'
              }
            </MathRenderer>
          </div>
          <p>
            推挽结构的关键优势：
            <span className="text-laser-cyan">
              降低 V<sub>π</sub>
            </span>
            （半波电压减半）、
            <span className="text-laser-cyan">消除残余啁啾</span>（两臂相位变化对称）、
            <span className="text-laser-cyan">提高调制带宽</span>（差分驱动降低 RC 常数）。
          </p>

          <div className="pt-2 border-t border-lab-border/30">
            <p className="mb-1">
              <span className="text-laser-purple font-semibold">偏置控制方法：</span>
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <span className="text-lab-text">热光调相 (Thermo-Optic)：</span>{' '}
                通过微型加热器改变波导温度，从而改变折射率。功耗约数 mW，响应时间约 μs 级
              </li>
              <li>
                <span className="text-lab-text">电光调相 (Electro-Optic)：</span> 利用 Pockels
                效应或载流子色散效应实现快速相位调制，响应时间可达 ns 甚至 ps 级
              </li>
              <li>
                <span className="text-lab-text">闭环反馈控制：</span> 通过监测输出光功率或导频信号，利用 PID
                算法动态调整偏置点，补偿温度和老化漂移
              </li>
              <li>
                <span className="text-lab-text">差分驱动 (Differential Drive)：</span> 使用高速 DAC
                产生互补的差分信号，提高信号质量并抑制共模噪声
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-3">常见问题与优化方法</h3>
          <div className="space-y-3 text-sm text-lab-muted leading-relaxed">
            <p>
              <span className="text-laser-red font-semibold">偏置点漂移 (Bias Drift)：</span>
              温度变化、波导老化、光折变效应会导致偏置点缓慢移动，使调制器偏离最佳工作点。 解决方法：使用 dithering
              信号探测偏置点，通过锁相放大反馈稳定偏置。
            </p>
            <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
              <MathRenderer>
                {'$$\\text{锁定偏置点：} \\frac{dP_{out}}{dV}\\bigg|_{V=V_b} = 0 \\quad \\text{（工作于 Q 点）}$$'}
              </MathRenderer>
            </div>
            <p>
              <span className="text-laser-red font-semibold">啁啾 (Chirp)：</span>
              调制过程中产生的瞬时频率漂移会导致脉冲展宽，限制传输距离。
              推挽结构可有效抑制啁啾。不对称结构会产生残余啁啾，有时也利用啁啾补偿光纤色散。
            </p>
            <p>
              <span className="text-laser-orange font-semibold">插入损耗与带宽：</span>
              设计中需在损耗和带宽之间权衡：长波导可降低 V<sub>π</sub> 但增加损耗和寄生电容。 行波电极 (Travelling-Wave
              Electrode) 设计可突破 RC 限制，实现 40 GHz 以上调制带宽。
            </p>
          </div>
        </div>

        <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-3">三种调制模式对比</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-2 text-lab-text font-semibold">特性</th>
                  <th className="text-left py-2 px-2 text-lab-text font-semibold">单臂</th>
                  <th className="text-left py-2 px-2 text-lab-text font-semibold">双臂</th>
                  <th className="text-left py-2 px-2 text-lab-text font-semibold">推挽</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-2 text-lab-muted">等效 V_π</td>
                  <td className="py-2 px-2 text-laser-cyan">V_π</td>
                  <td className="py-2 px-2 text-laser-purple">V_π</td>
                  <td className="py-2 px-2 text-laser-green">V_π/2</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-2 text-lab-muted">啁啾</td>
                  <td className="py-2 px-2 text-laser-red">有</td>
                  <td className="py-2 px-2 text-laser-orange">可控</td>
                  <td className="py-2 px-2 text-laser-green">无</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-2 text-lab-muted">驱动复杂度</td>
                  <td className="py-2 px-2 text-laser-green">低</td>
                  <td className="py-2 px-2 text-laser-red">中</td>
                  <td className="py-2 px-2 text-laser-orange">中</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-2 text-lab-muted">灵活性</td>
                  <td className="py-2 px-2 text-laser-red">低</td>
                  <td className="py-2 px-2 text-laser-green">高</td>
                  <td className="py-2 px-2 text-laser-orange">中</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 text-lab-muted">典型应用</td>
                  <td className="py-2 px-2">低速 / 传感</td>
                  <td className="py-2 px-2">IQ 调制器</td>
                  <td className="py-2 px-2 text-laser-green">高速通信</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
