import { motion } from 'framer-motion';
import { CircuitBoard, Info, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMZStore } from '@/stores/useMZStore';
import ControlPanel, { SliderControl, InfoItem } from '@/components/common/ControlPanel';
import MZCanvas from '@/components/mz-modulator/MZCanvas';
import { mzOutputPower, mzTransferFunction } from '@/utils/modulationMath';
import MathRenderer from '@/components/common/MathRenderer';

export default function MZModulatorPage() {
  const navigate = useNavigate();
  const {
    modulationDepth,
    phaseShift,
    inputPower,
    frequency,
    isPlaying,
    setModulationDepth,
    setPhaseShift,
    setInputPower,
    setFrequency,
    setIsPlaying,
    reset,
  } = useMZStore();

  const currentPhase = mzTransferFunction(modulationDepth, 1) + phaseShift;
  const outputPower = mzOutputPower(inputPower, currentPhase);
  const extinctionRatio = inputPower > 0 ? 10 * Math.log10(inputPower / Math.max(outputPower, 0.001)) : 0;

  const formatPiRad = (v: number) => (v / Math.PI).toFixed(2) + ' π rad';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-laser-green/20 text-laser-green flex items-center justify-center">
            <CircuitBoard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-lab-text">MZ 调制器</h1>
            <p className="text-sm text-lab-muted">马赫-曾德电光调制器原理演示</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/learn/mz-modulator')}
          className="flex items-center gap-2 px-4 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted hover:text-laser-green hover:border-laser-green/30 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          学习原理
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 min-h-[400px]">
          <MZCanvas />
        </div>

        <div className="space-y-6">
          <ControlPanel
            title="参数调节"
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={reset}
          >
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
              <InfoItem label="输出光功率" value={outputPower.toFixed(3) + ' mW'} color="#00ff88" />
              <InfoItem label="相对相移" value={formatPiRad(currentPhase)} color="#f59e0b" />
              <InfoItem label="消光比" value={extinctionRatio.toFixed(1) + ' dB'} color="#ff3366" />
              <InfoItem label="调制效率" value={((outputPower / Math.max(inputPower, 0.001)) * 100).toFixed(1) + '%'} color="#00d4ff" />
            </div>
          </div>
        </div>
      </div>

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
              通过施加电压控制相位，实现对光强的调制。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$P_{out} = P_{in} \\cdot \\cos^2\\left(\\frac{\\pi V}{2V_\\pi}\\right)$$'}</MathRenderer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">常见适应波段</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-green font-semibold">光通信波段分布：</span>
              MZM 的工作波段取决于电光材料（如 LiNbO₃、硅、InP 等）的透明窗口。
              常见光纤通信波段如下：
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg space-y-1">
              <p><span className="text-laser-cyan font-semibold">O 波段</span> (1260-1360 nm) ─ 低色散，适用于数据中心短距离传输</p>
              <p><span className="text-laser-green font-semibold">C 波段</span> (1530-1565 nm) ─ 最低衰减，长距离骨干网和 DWDM 系统</p>
              <p><span className="text-laser-red font-semibold">L 波段</span> (1565-1625 nm) ─ 扩展波段，与 C 波段配合实现超大容量传输</p>
              <p><span className="text-laser-purple font-semibold">U 波段</span> (1625-1675 nm) ─ 特殊应用波段</p>
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-cyan font-semibold">材料适配性：</span>
              不同材料体系的 MZM 适用的典型波段不同：
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg space-y-1">
              <p><span className="text-laser-cyan font-semibold">LiNbO₃ (铌酸锂)</span> ─ 主要工作在 C+L 波段 (1530-1625 nm)</p>
              <p><span className="text-laser-green font-semibold">Silicon (硅基)</span> ─ O 波段 (1310 nm) 和 C 波段 (1550 nm)</p>
              <p><span className="text-laser-purple font-semibold">InP (磷化铟)</span> ─ 可覆盖 O 到 L 波段，通常集成激光器</p>
              <p><span className="text-laser-red font-semibold">SiN (氮化硅)</span> ─ 可见光到近红外波段，多用于传感领域</p>
            </div>
            <p className="mt-2 text-xs">选择 MZM 时需要确保其工作波段与系统光源和光纤传输窗口匹配。</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-3">推挽结构与偏置控制</h3>
          <div className="space-y-3 text-sm text-lab-muted leading-relaxed">
            <p>
              <span className="text-laser-green font-semibold">推挽结构 (Push-Pull)：</span>
              传统单臂调制仅在其中一臂施加电压，而推挽结构在两臂上施加极性相反的电压 (V 和 -V)。
              两臂相位变化量分别为 +Δφ/2 和 -Δφ/2，总相位差 Δφ 加倍，从而使所需驱动电压减半。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$\\Delta\\phi = \\frac{2\\pi}{\\lambda} \\cdot [n(V) \\cdot L - n(-V) \\cdot L] = 2 \\cdot \\frac{2\\pi}{\\lambda} \\cdot \\Delta n \\cdot L$$'}</MathRenderer>
            </div>
            <p>
              推挽结构的关键优势：<span className="text-laser-cyan">降低 V<sub>π</sub></span>（半波电压减半）、
              <span className="text-laser-cyan">消除残余啁啾</span>（两臂相位变化对称）、
              <span className="text-laser-cyan">提高调制带宽</span>（差分驱动降低 RC 常数）。
            </p>

            <div className="pt-2 border-t border-lab-border/30">
              <p className="mb-1">
                <span className="text-laser-purple font-semibold">偏置控制方法：</span>
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li><span className="text-lab-text">热光调相 (Thermo-Optic)：</span> 通过微型加热器改变波导温度，从而改变折射率。功耗约数 mW，响应时间约 μs 级</li>
                <li><span className="text-lab-text">电光调相 (Electro-Optic)：</span> 利用 Pockels 效应或载流子色散效应实现快速相位调制，响应时间可达 ns 甚至 ps 级</li>
                <li><span className="text-lab-text">闭环反馈控制：</span> 通过监测输出光功率或导频信号，利用 PID 算法动态调整偏置点，补偿温度和老化漂移</li>
                <li><span className="text-lab-text">差分驱动 (Differential Drive)：</span> 使用高速 DAC 产生互补的差分信号，提高信号质量并抑制共模噪声</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-3">常见问题与优化方法</h3>
          <div className="space-y-3 text-sm text-lab-muted leading-relaxed">
            <p>
              <span className="text-laser-red font-semibold">偏置点漂移 (Bias Drift)：</span>
              温度变化、波导老化、光折变效应会导致偏置点缓慢移动，使调制器偏离最佳工作点。
              解决方法：使用 dithering 信号探测偏置点，通过锁相放大反馈稳定偏置。
            </p>
            <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
              <MathRenderer>{'$$\\text{锁定偏置点：} \\frac{dP_{out}}{dV}\\bigg|_{V=V_b} = 0 \\quad \\text{（工作于 Q 点）}$$'}</MathRenderer>
            </div>
            <p>
              <span className="text-laser-red font-semibold">啁啾 (Chirp)：</span>
              调制过程中产生的瞬时频率漂移会导致脉冲展宽，限制传输距离。
              推挽结构可有效抑制啁啾。不对称结构会产生残余啁啾，有时也利用啁啾补偿光纤色散。
            </p>
            <p>
              <span className="text-laser-orange font-semibold">插入损耗与带宽：</span>
              设计中需在损耗和带宽之间权衡：长波导可降低 V<sub>π</sub> 但增加损耗和寄生电容。
              行波电极 (Travelling-Wave Electrode) 设计可突破 RC 限制，实现 40 GHz 以上调制带宽。
            </p>
            <p>
              <span className="text-laser-purple font-semibold">其他保证准确性的方法：</span>
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li><span className="text-lab-text">预失真补偿 (Pre-distortion)：</span> 利用 DSP 对驱动信号进行非线性预补偿，抵消 MZM 转移函数的非线性</li>
              <li><span className="text-lab-text">温度控制：</span> 使用 TEC (热电冷却器) 保持芯片温度恒定，减少热致漂移</li>
              <li><span className="text-lab-text">导频监控：</span> 在驱动信号中叠加低频导频信号，实时提取偏置状态信息</li>
              <li><span className="text-lab-text">背向光监测 (BPD)：</span> 在 MZM 输出端耦合少量光至光电探测器，形成反馈环路</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
