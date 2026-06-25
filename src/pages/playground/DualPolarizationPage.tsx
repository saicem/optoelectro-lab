import { motion } from 'framer-motion';
import { BarChart3, Info, Zap, ThermometerSun, RefreshCw } from 'lucide-react';
import { useDualPolarizationStore } from '@/stores/useDualPolarizationStore';
import ControlPanel, { SliderControl, SelectControl, InfoItem } from '@/components/common/ControlPanel';
import DualPolarizationCanvas from '@/components/dual-polarization/DualPolarizationCanvas';
import { getSymbols, heaterPower, iqAmplitude } from '@/utils/dualPolarizationMath';
import type { ModulationFormat } from '@/utils/dualPolarizationMath';
import MathRenderer from '@/components/common/MathRenderer';

export default function DualPolarizationPage() {
  const {
    modulationFormat,
    xSymbolIndex,
    ySymbolIndex,
    autoCycle,
    inputPower,
    isPlaying,
    setModulationFormat,
    setXSymbolIndex,
    setYSymbolIndex,
    setAutoCycle,
    setInputPower,
    setIsPlaying,
    setXIHeaterVoltage,
    setXQHeaterVoltage,
    setXQuadratureHeaterVoltage,
    setYIHeaterVoltage,
    setYQHeaterVoltage,
    setYQuadratureHeaterVoltage,
    setPolRotationHeaterVoltage,
    getXIBiasPhase,
    getXQBiasPhase,
    getXQuadraturePhase,
    getYIBiasPhase,
    getYQBiasPhase,
    getYQuadraturePhase,
    getPolRotation,
    getXSymbol,
    getYSymbol,
    getTotalPower,
    xIHeater,
    xQHeater,
    xQuadratureHeater,
    yIHeater,
    yQHeater,
    yQuadratureHeater,
    polRotationHeater,
    reset,
    resetHeaters,
    autoCalibrate,
  } = useDualPolarizationStore();

  const symbols = getSymbols(modulationFormat);
  const xSymbol = getXSymbol();
  const ySymbol = getYSymbol();
  const xAmp = iqAmplitude(xSymbol.i, xSymbol.q);
  const yAmp = iqAmplitude(ySymbol.i, ySymbol.q);
  const bitsPerSymbol = { QPSK: 2, '16QAM': 4, '64QAM': 6 }[modulationFormat];

  const formatPiRad = (v: number) => (v / Math.PI).toFixed(2) + ' π rad';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-laser-cyan/20 text-laser-cyan flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-lab-text">双偏振 IQ 调制器</h1>
          <p className="text-sm text-lab-muted">DP-IQM 交互实验：调节加热器电压，观察输出变化</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-4">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-3 h-[560px]">
          <DualPolarizationCanvas />
        </div>

        <div className="space-y-5">
          <ControlPanel
            title="调制信号"
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
              <>
                <SliderControl
                  label="X 符号索引"
                  value={xSymbolIndex}
                  min={0}
                  max={symbols.length - 1}
                  step={1}
                  onChange={setXSymbolIndex}
                  color="#00d4ff"
                />
                <SliderControl
                  label="Y 符号索引"
                  value={ySymbolIndex}
                  min={0}
                  max={symbols.length - 1}
                  step={1}
                  onChange={setYSymbolIndex}
                  color="#ff3366"
                />
              </>
            )}

            <SliderControl
              label="输入光功率"
              value={inputPower}
              min={0}
              max={5}
              step={0.1}
              unit=" mW"
              onChange={setInputPower}
              color="#a855f7"
            />
          </ControlPanel>

          <ControlPanel
            title="X 偏振加热器"
          >
            <SliderControl
              label="X-I 偏置电压"
              value={xIHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setXIHeaterVoltage}
              color="#00d4ff"
            />
            <SliderControl
              label="X-Q 偏置电压"
              value={xQHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setXQHeaterVoltage}
              color="#00d4ff"
            />
            <SliderControl
              label="X 正交相位电压"
              value={xQuadratureHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setXQuadratureHeaterVoltage}
              color="#00d4ff"
            />
          </ControlPanel>

          <ControlPanel
            title="Y 偏振加热器"
          >
            <SliderControl
              label="Y-I 偏置电压"
              value={yIHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setYIHeaterVoltage}
              color="#ff3366"
            />
            <SliderControl
              label="Y-Q 偏置电压"
              value={yQHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setYQHeaterVoltage}
              color="#ff3366"
            />
            <SliderControl
              label="Y 正交相位电压"
              value={yQuadratureHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setYQuadratureHeaterVoltage}
              color="#ff3366"
            />
            <SliderControl
              label="偏振旋转电压"
              value={polRotationHeater.voltage}
              min={0}
              max={5}
              step={0.01}
              unit=" V"
              onChange={setPolRotationHeaterVoltage}
              color="#a855f7"
            />
          </ControlPanel>

          <div className="flex gap-2">
            <button
              onClick={resetHeaters}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted hover:text-lab-text hover:border-lab-border/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              复位加热器
            </button>
            <button
              onClick={autoCalibrate}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-laser-green/10 border border-laser-green/30 rounded-xl text-sm text-laser-green hover:bg-laser-green/20 transition-colors"
            >
              <Zap className="w-4 h-4" />
              自动校准
            </button>
          </div>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ThermometerSun className="w-4 h-4 text-amber-500" />
              <h3 className="font-display font-semibold text-lab-text">加热器功耗</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="X-I 加热器" value={heaterPower(xIHeater).toFixed(2) + ' mW'} color="#00d4ff" />
              <InfoItem label="X-Q 加热器" value={heaterPower(xQHeater).toFixed(2) + ' mW'} color="#00d4ff" />
              <InfoItem label="X-Φ 加热器" value={heaterPower(xQuadratureHeater).toFixed(2) + ' mW'} color="#00d4ff" />
              <InfoItem label="Y-I 加热器" value={heaterPower(yIHeater).toFixed(2) + ' mW'} color="#ff3366" />
              <InfoItem label="Y-Q 加热器" value={heaterPower(yQHeater).toFixed(2) + ' mW'} color="#ff3366" />
              <InfoItem label="Y-Φ 加热器" value={heaterPower(yQuadratureHeater).toFixed(2) + ' mW'} color="#ff3366" />
              <InfoItem label="偏振旋转" value={heaterPower(polRotationHeater).toFixed(2) + ' mW'} color="#a855f7" />
              <div className="pt-2 border-t border-lab-border/50">
                <InfoItem label="总功耗" value={getTotalPower().toFixed(2) + ' mW'} color="#f59e0b" />
              </div>
            </div>
          </div>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-purple" />
              <h3 className="font-display font-semibold text-lab-text">信号参数</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="X I 分量" value={xSymbol.i.toFixed(3)} color="#00d4ff" />
              <InfoItem label="X Q 分量" value={xSymbol.q.toFixed(3)} color="#00d4ff" />
              <InfoItem label="X 幅度" value={xAmp.toFixed(3)} color="#00ff88" />
              <InfoItem label="Y I 分量" value={ySymbol.i.toFixed(3)} color="#ff3366" />
              <InfoItem label="Y Q 分量" value={ySymbol.q.toFixed(3)} color="#ff3366" />
              <InfoItem label="Y 幅度" value={yAmp.toFixed(3)} color="#00ff88" />
              <InfoItem label="每符号比特" value={bitsPerSymbol + ' bit'} color="#a855f7" />
              <div className="pt-2 border-t border-lab-border/50">
                <InfoItem label="X I 偏置" value={formatPiRad(getXIBiasPhase())} color="#00d4ff" />
                <InfoItem label="X Q 偏置" value={formatPiRad(getXQBiasPhase())} color="#00d4ff" />
                <InfoItem label="X 正交相移" value={formatPiRad(getXQuadraturePhase())} color="#00d4ff" />
                <InfoItem label="Y I 偏置" value={formatPiRad(getYIBiasPhase())} color="#ff3366" />
                <InfoItem label="Y Q 偏置" value={formatPiRad(getYQBiasPhase())} color="#ff3366" />
                <InfoItem label="Y 正交相移" value={formatPiRad(getYQuadraturePhase())} color="#ff3366" />
                <InfoItem label="偏振旋转" value={formatPiRad(getPolRotation())} color="#a855f7" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">双偏振 IQ 调制器原理</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-cyan font-semibold">结构组成：</span>
              DP-IQM 由两个独立的 IQ 调制器（X 和 Y 偏振）、偏振分束器 (PBS)、
              偏振旋转器和偏振合束器 (PBC) 组成。输入光被分成 X 和 Y 两个正交偏振态，
              分别调制后再合路输出。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$C = 2 \\cdot \\log_2(M) \\quad (\\text{bit/s/Hz, PDM-MQAM})$$'}</MathRenderer>
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-purple font-semibold">热光调相：</span>
              硅基调制器常用热光效应来控制相位。加热器通过改变波导温度来改变折射率，
              从而调节偏置点和正交相位。功耗 P = V²/R，相位变化与功耗成正比。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$P_{heater} = V \\cdot I = \\frac{V^2}{R}, \\quad \\Delta\\phi \\propto P$$'}</MathRenderer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
