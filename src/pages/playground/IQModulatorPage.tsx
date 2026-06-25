import { motion } from 'framer-motion';
import { BarChart3, Info, Shuffle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIQStore } from '@/stores/useIQStore';
import ControlPanel, { SliderControl, SelectControl, InfoItem } from '@/components/common/ControlPanel';
import IQCanvas from '@/components/iq-modulator/IQCanvas';
import { getSymbols, iqAmplitude } from '@/utils/modulationMath';
import type { ModulationFormat } from '@/utils/modulationMath';
import MathRenderer from '@/components/common/MathRenderer';

export default function IQModulatorPage() {
  const navigate = useNavigate();
  const {
    modulationFormat,
    symbolIndex,
    autoCycle,
    iComponent,
    qComponent,
    isPlaying,
    pPhaseDiff,
    setModulationFormat,
    setSymbolIndex,
    setAutoCycle,
    setIComponent,
    setQComponent,
    setIsPlaying,
    setPPhaseDiff,
    reset,
  } = useIQStore();

  const symbols = getSymbols(modulationFormat);
  const decodedI = iComponent + qComponent * Math.cos(pPhaseDiff);
  const decodedQ = qComponent * Math.sin(pPhaseDiff);
  const amplitude = iqAmplitude(decodedI, decodedQ);
  const bitsPerSymbol = { QPSK: 2, '16QAM': 4, '64QAM': 6 }[modulationFormat];

  const signalValue = symbolIndex.toString(2).padStart(bitsPerSymbol, '0');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-laser-purple/20 text-laser-purple flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-lab-text">IQ 调制器</h1>
            <p className="text-sm text-lab-muted">同相正交调制与星座图分析</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/learn/iq-modulator')}
          className="flex items-center gap-2 px-4 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted hover:text-laser-purple hover:border-laser-purple/30 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          学习原理
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 min-h-[900px]">
          <IQCanvas />
        </div>

        <div className="space-y-6">
          <ControlPanel
            title="参数调节"
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={reset}
          >
            <SelectControl
              label="调制格式"
              value={modulationFormat}
              options={[
                { value: 'QPSK' as ModulationFormat, label: 'QPSK' },
                { value: '16QAM' as ModulationFormat, label: '16QAM' },
                { value: '64QAM' as ModulationFormat, label: '64QAM' },
              ]}
              onChange={setModulationFormat}
            />

            <div className="flex items-center justify-between">
              <span className="text-sm text-lab-muted">自动循环符号</span>
              <button
                onClick={() => setAutoCycle(!autoCycle)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  autoCycle ? 'bg-laser-purple' : 'bg-lab-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    autoCycle ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {!autoCycle && (
              <SliderControl
                label="符号索引"
                value={symbolIndex}
                min={0}
                max={symbols.length - 1}
                step={1}
                onChange={setSymbolIndex}
                color="#00ff88"
              />
            )}

            <div className="pt-2 border-t border-lab-border/50">
              <p className="text-xs text-lab-muted mb-3 flex items-center gap-1">
                <Shuffle className="w-3 h-3" />
                手动调节
              </p>
              <SliderControl
                label="I 分量"
                value={iComponent}
                min={-1}
                max={1}
                step={0.01}
                onChange={setIComponent}
                color="#00d4ff"
              />
              <SliderControl
                label="Q 分量"
                value={qComponent}
                min={-1}
                max={1}
                step={0.01}
                onChange={setQComponent}
                color="#a855f7"
              />
              <SliderControl
                label="P 相位差"
                value={pPhaseDiff / Math.PI}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => setPPhaseDiff(v * Math.PI)}
                color="#f59e0b"
                valueFormatter={(v) => v.toFixed(2) + 'π'}
              />
            </div>
          </ControlPanel>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-purple" />
              <h3 className="font-display font-semibold text-lab-text">信号参数</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="幅度" value={amplitude.toFixed(3)} color="#00ff88" />
              <InfoItem label="信号值" value={signalValue} color="#00ff88" />
              <InfoItem label="星座点数" value={symbols.length.toString()} />
              <InfoItem label="每符号比特" value={bitsPerSymbol + ' bit'} color="#ff3366" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-4">IQ 调制与解调原理</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-purple font-semibold">调制（发送端）：</span>
              IQ 调制将两个独立的基带信号（I 路和 Q 路）分别调制到相位相差 π/2 的两个载波上，
              然后合成为一个信号传输，频谱效率翻倍。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$s(t) = I\\cos(\\omega t) + Q\\cos(\\omega t - \\Delta\\phi)$$'}</MathRenderer>
              <div className="text-xs text-lab-muted mt-1">
                当 Δφ = π/2 时，cos(ωt - π/2) = sin(ωt)，退化为标准 IQ 调制形式
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-cyan font-semibold">解调（接收端）：</span>
              相干接收时，将接收信号分别与同相和正交的本振光相乘，
              再经过低通滤波滤除二倍频分量，即可恢复出原始的 I 和 Q 信号。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$s(t) \\cdot 2\\cos(\\omega t) \\xrightarrow{\\text{低通}} I$$'}</MathRenderer>
              <MathRenderer>{'$$s(t) \\cdot 2\\sin(\\omega t) \\xrightarrow{\\text{低通}} Q$$'}</MathRenderer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">星座图与解调</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-green font-semibold">星座图：</span>
              以 I 为横轴、Q 为纵轴的复平面表示。每个符号对应星座图上的一个点，
              其位置决定了信号的幅度和相位。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$A = \\sqrt{I^2 + Q^2}, \\quad \\phi = \\arctan\\left(\\frac{Q}{I}\\right)$$'}</MathRenderer>
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-red font-semibold">硬判决：</span>
              接收端将收到的 I、Q 值与理想星座点比较，选择最近的星座点作为判决结果，
              完成信号的恢复。噪声越大，误判的概率越高。
            </p>
            <p className="text-xs mt-2 text-lab-muted">
              想了解噪声、SNR、BER 等接收器性能指标？去
              <span className="text-laser-purple font-semibold"> 接收器 Playground </span>
              深入学习！
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
