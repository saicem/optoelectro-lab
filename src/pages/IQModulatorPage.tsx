import { motion } from 'framer-motion';
import { BarChart3, Info, Shuffle } from 'lucide-react';
import { useIQStore } from '@/stores/useIQStore';
import ControlPanel, { SliderControl, SelectControl, InfoItem } from '@/components/common/ControlPanel';
import IQCanvas from '@/components/iq-modulator/IQCanvas';
import { getSymbols, iqAmplitude, iqPhase } from '@/utils/modulationMath';
import type { ModulationFormat } from '@/utils/modulationMath';

export default function IQModulatorPage() {
  const {
    modulationFormat,
    symbolIndex,
    autoCycle,
    iComponent,
    qComponent,
    isPlaying,
    setModulationFormat,
    setSymbolIndex,
    setAutoCycle,
    setIComponent,
    setQComponent,
    setIsPlaying,
    reset,
  } = useIQStore();

  const symbols = getSymbols(modulationFormat);
  const amplitude = iqAmplitude(iComponent, qComponent);
  const phase = iqPhase(iComponent, qComponent);
  const bitsPerSymbol = { QPSK: 2, '16QAM': 4, '64QAM': 6 }[modulationFormat];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-laser-purple/20 text-laser-purple flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-lab-text">IQ 调制器</h1>
          <p className="text-sm text-lab-muted">同相正交调制与星座图分析</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 aspect-video min-h-[400px]">
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
                手动调节分量
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
            </div>
          </ControlPanel>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-purple" />
              <h3 className="font-display font-semibold text-lab-text">信号参数</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="I 分量" value={iComponent.toFixed(3)} color="#00d4ff" />
              <InfoItem label="Q 分量" value={qComponent.toFixed(3)} color="#a855f7" />
              <InfoItem label="幅度" value={amplitude.toFixed(3)} color="#00ff88" />
              <InfoItem label="相位" value={(phase * 180 / Math.PI).toFixed(1) + '°'} color="#f59e0b" />
              <InfoItem label="星座点数" value={symbols.length.toString()} />
              <InfoItem label="每符号比特" value={bitsPerSymbol + ' bit'} color="#ff3366" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">IQ 调制原理</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-purple font-semibold">正交调制：</span>
              IQ 调制将两个独立的基带信号（I 路和 Q 路）分别调制到相位相差 90° 的两个载波上，
              然后合成为一个信号传输，频谱效率翻倍。
            </p>
            <div className="font-mono text-lab-text bg-lab-bg/50 px-3 py-2 rounded-lg overflow-x-auto text-sm">
              $$s(t) = I\cos(\omega t) + Q\sin(\omega t)$$
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-cyan font-semibold">星座图：</span>
              以 I 为横轴、Q 为纵轴的复平面表示。每个符号对应星座图上的一个点，
              其位置决定了信号的幅度和相位。
            </p>
            <div className="font-mono text-lab-text bg-lab-bg/50 px-3 py-2 rounded-lg overflow-x-auto text-sm">
              $$A = \sqrt{I^2 + Q^2}, \quad \phi = \arctan\left(\frac{Q}{I}\right)$$
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
