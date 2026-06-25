import { motion } from 'framer-motion';
import { CircuitBoard, Info } from 'lucide-react';
import { useMZStore } from '@/stores/useMZStore';
import ControlPanel, { SliderControl, InfoItem } from '@/components/common/ControlPanel';
import MZCanvas from '@/components/mz-modulator/MZCanvas';
import { mzOutputPower, mzTransferFunction } from '@/utils/modulationMath';
import MathRenderer from '@/components/common/MathRenderer';

export default function MZModulatorPage() {
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
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-laser-green/20 text-laser-green flex items-center justify-center">
          <CircuitBoard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-lab-text">MZ 调制器</h1>
          <p className="text-sm text-lab-muted">马赫-曾德电光调制器原理演示</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 h-[50vh] lg:h-[60vh]">
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
    </motion.div>
  );
}
