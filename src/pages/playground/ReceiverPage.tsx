import { Radio, Info, RefreshCw, Zap, Gauge, Volume2 } from 'lucide-react';
import { useReceiverStore } from '@/stores/useReceiverStore';
import ControlPanel, { SliderControl, SelectControl, InfoItem } from '@/components/common/ControlPanel';
import ReceiverCanvas from '@/components/receiver/ReceiverCanvas';
import type { ModulationFormat } from '@/types';
import { calculateEVM, theoreticalBer } from '@/utils/modulationMath';
import MathRenderer from '@/components/common/MathRenderer';
import PlaygroundLayout from '@/components/common/PlaygroundLayout';
import { ROUTES } from '@/constants/routes';

export default function ReceiverPage() {
  const {
    modulationFormat,
    snr,
    noiseEnabled,
    isPlaying,
    errorCount,
    totalSymbols,
    receivedPoints,
    setModulationFormat,
    setSnr,
    setNoiseEnabled,
    setIsPlaying,
    clearReceivedPoints,
    reset,
    applyPreset,
  } = useReceiverStore();

  const theoreticalBerValue = theoreticalBer(modulationFormat, snr);
  const measuredBer = totalSymbols > 0 ? errorCount / totalSymbols : 0;
  const bitsPerSymbol = { QPSK: 2, '16QAM': 4, '64QAM': 6 }[modulationFormat];
  const symbolCount = { QPSK: 4, '16QAM': 16, '64QAM': 64 }[modulationFormat];
  const evm = calculateEVM(receivedPoints, modulationFormat);
  const evmPercent = evm * 100;

  function formatBer(ber: number): string {
    if (ber === 0) return '0';
    if (ber > 1) return '>1';
    const exp = Math.floor(Math.log10(ber));
    const mant = ber / Math.pow(10, exp);
    return `${mant.toFixed(2)} × 10^${exp}`;
  }

  return (
    <PlaygroundLayout
      icon={<Radio className="w-5 h-5" />}
      iconColor="#22c55e"
      title="光接收器"
      subtitle="AWGN 信道、星座图与误码率分析"
      learnPath={ROUTES.LEARN.RECEIVER}
      canvas={<ReceiverCanvas />}
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
              <span className="text-sm text-lab-muted">启用噪声</span>
              <button
                onClick={() => setNoiseEnabled(!noiseEnabled)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  noiseEnabled ? 'bg-laser-purple' : 'bg-lab-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    noiseEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {noiseEnabled && (
              <SliderControl
                label="SNR (信噪比)"
                value={snr}
                min={0}
                max={30}
                step={0.5}
                unit="dB"
                onChange={setSnr}
                color="#ff6b6b"
              />
            )}

            <button
              onClick={clearReceivedPoints}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-lab-bg/50 border border-lab-border rounded-lg text-sm text-lab-muted hover:text-lab-text hover:border-lab-border/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              清除统计
            </button>

            <div className="pt-4 border-t border-lab-border/50">
              <p className="text-sm text-lab-muted mb-3">预设场景</p>
              <div className="space-y-2">
                <button
                  onClick={() => applyPreset('back-to-back')}
                  className="w-full flex items-center gap-3 py-2 px-3 bg-lab-bg/50 border border-lab-border rounded-lg text-sm text-lab-muted hover:text-laser-green hover:border-laser-green/30 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <div className="text-lab-text font-medium">背靠背</div>
                    <div className="text-xs">高 SNR，几乎无误差</div>
                  </div>
                </button>
                <button
                  onClick={() => applyPreset('critical')}
                  className="w-full flex items-center gap-3 py-2 px-3 bg-lab-bg/50 border border-lab-border rounded-lg text-sm text-lab-muted hover:text-laser-cyan hover:border-laser-cyan/30 transition-colors"
                >
                  <Gauge className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <div className="text-lab-text font-medium">临界工作点</div>
                    <div className="text-xs">BER ≈ 10⁻³</div>
                  </div>
                </button>
                <button
                  onClick={() => applyPreset('low-snr')}
                  className="w-full flex items-center gap-3 py-2 px-3 bg-lab-bg/50 border border-lab-border rounded-lg text-sm text-lab-muted hover:text-laser-red hover:border-laser-red/30 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <div className="text-lab-text font-medium">低信噪比</div>
                    <div className="text-xs">高误码率</div>
                  </div>
                </button>
              </div>
            </div>
          </ControlPanel>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-green" />
              <h3 className="font-display font-semibold text-lab-text">接收性能</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="调制格式" value={modulationFormat} color="#a855f7" />
              <InfoItem label="星座点数" value={symbolCount.toString()} />
              <InfoItem label="每符号比特" value={`${bitsPerSymbol} bit`} color="#ff3366" />
              <InfoItem label="SNR" value={`${snr.toFixed(1)} dB`} color="#ff6b6b" />
              <InfoItem label="EVM" value={totalSymbols > 0 ? `${evmPercent.toFixed(2)} %` : '—'} color="#a855f7" />
              <div className="pt-2 mt-2 border-t border-lab-border/50">
                <InfoItem label="理论 BER" value={formatBer(theoreticalBerValue)} color="#f59e0b" />
                <InfoItem label="实测 BER" value={totalSymbols > 0 ? formatBer(measuredBer) : '—'} color="#00ff88" />
                <InfoItem label="发送符号数" value={totalSymbols.toString()} />
                <InfoItem label="错误符号数" value={errorCount.toString()} color="#ff6b6b" />
              </div>
            </div>
          </div>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-3">AWGN 信道模型</h3>
          <div className="space-y-3 text-sm text-lab-muted leading-relaxed">
            <p>
              <span className="text-laser-red font-semibold">加性高斯白噪声 (AWGN)</span>
              是通信系统中最基本的噪声模型。噪声功率与信号功率的比值用信噪比 (SNR) 表示：
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>
                {'$$\\text{SNR (dB)} = 10 \\log_{10}\\left(\\frac{P_{signal}}{P_{noise}}\\right)$$'}
              </MathRenderer>
            </div>
            <p>
              SNR 越高，噪声越小，接收信号越清晰，误码率越低。 不同调制格式对 SNR 的要求不同：高阶调制（如
              64QAM）频谱效率更高， 但需要更高的 SNR 才能达到相同的误码率。
            </p>
          </div>
        </div>

        <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lab-text mb-3">误码率 (BER)</h3>
          <div className="space-y-3 text-sm text-lab-muted leading-relaxed">
            <p>
              <span className="text-laser-cyan font-semibold">误码率</span>
              是衡量通信系统性能的核心指标，表示错误比特数与总比特数的比值。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$\\text{BER} = \\frac{\\text{错误比特数}}{\\text{总比特数}}$$'}</MathRenderer>
            </div>
            <p>对于 QAM 调制，理论 BER 近似为：</p>
            <div className="bg-lab-bg/50 px-4 py-2 rounded-lg text-xs">
              <MathRenderer>
                {
                  '$$\\text{BER} \\approx \\frac{2(\\sqrt{M}-1)}{\\sqrt{M} \\log_2\\sqrt{M}} Q\\left(\\sqrt{\\frac{3 \\log_2 M}{M-1} \\cdot \\text{SNR}}\\right)$$'
                }
              </MathRenderer>
            </div>
            <p className="text-xs">其中 M 是星座点数，Q 函数是高斯误差函数的补函数。</p>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-4">调制格式对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lab-border">
                <th className="text-left py-2 px-3 text-lab-muted font-medium">调制格式</th>
                <th className="text-center py-2 px-3 text-lab-muted font-medium">星座点数</th>
                <th className="text-center py-2 px-3 text-lab-muted font-medium">频谱效率</th>
                <th className="text-center py-2 px-3 text-lab-muted font-medium">BER=10⁻³ 所需 SNR</th>
                <th className="text-center py-2 px-3 text-lab-muted font-medium">应用场景</th>
              </tr>
            </thead>
            <tbody className="text-lab-muted">
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-lab-text font-medium">QPSK</td>
                <td className="text-center py-2 px-3">4</td>
                <td className="text-center py-2 px-3">2 bit/s/Hz</td>
                <td className="text-center py-2 px-3">~6.8 dB</td>
                <td className="py-2 px-3">长距传输、卫星通信</td>
              </tr>
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-lab-text font-medium">16QAM</td>
                <td className="text-center py-2 px-3">16</td>
                <td className="text-center py-2 px-3">4 bit/s/Hz</td>
                <td className="text-center py-2 px-3">~10.5 dB</td>
                <td className="py-2 px-3">中距传输、城域网</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-lab-text font-medium">64QAM</td>
                <td className="text-center py-2 px-3">64</td>
                <td className="text-center py-2 px-3">6 bit/s/Hz</td>
                <td className="text-center py-2 px-3">~14.5 dB</td>
                <td className="py-2 px-3">短距高速、数据中心</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
