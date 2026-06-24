import { motion } from 'framer-motion';
import { Waves, Info } from 'lucide-react';
import { useInterferenceStore } from '@/stores/useInterferenceStore';
import ControlPanel, { SliderControl, InfoItem } from '@/components/common/ControlPanel';
import InterferenceCanvas from '@/components/interference/InterferenceCanvas';
import { wavelengthToColor, interferenceIntensity } from '@/utils/waveMath';

export default function InterferencePage() {
  const {
    wavelength,
    amplitude1,
    amplitude2,
    phaseDiff,
    isPlaying,
    setWavelength,
    setAmplitude1,
    setAmplitude2,
    setPhaseDiff,
    setIsPlaying,
    reset,
  } = useInterferenceStore();

  const color = wavelengthToColor(wavelength);
  const I1 = amplitude1 ** 2;
  const I2 = amplitude2 ** 2;
  const maxIntensity = interferenceIntensity(I1, I2, 0);
  const minIntensity = interferenceIntensity(I1, I2, Math.PI);
  const visibility = maxIntensity + minIntensity > 0
    ? (maxIntensity - minIntensity) / (maxIntensity + minIntensity)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-laser-cyan/20 text-laser-cyan flex items-center justify-center">
          <Waves className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-lab-text">光波干涉</h1>
          <p className="text-sm text-lab-muted">双光束干涉的实时可视化</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 aspect-video min-h-[400px]">
          <InterferenceCanvas />
        </div>

        <div className="space-y-6">
          <ControlPanel
            title="参数调节"
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={reset}
          >
            <SliderControl
              label="波长"
              value={wavelength}
              min={380}
              max={780}
              step={1}
              unit=" nm"
              onChange={setWavelength}
              color={color}
            />
            <SliderControl
              label="振幅 1"
              value={amplitude1}
              min={0}
              max={2}
              step={0.01}
              onChange={setAmplitude1}
              color={color}
            />
            <SliderControl
              label="振幅 2"
              value={amplitude2}
              min={0}
              max={2}
              step={0.01}
              onChange={setAmplitude2}
              color="#a855f7"
            />
            <SliderControl
              label="相位差"
              value={phaseDiff}
              min={0}
              max={Math.PI * 2}
              step={0.01}
              unit=" rad"
              onChange={setPhaseDiff}
              color="#00ff88"
            />
          </ControlPanel>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-cyan" />
              <h3 className="font-display font-semibold text-lab-text">物理参数</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="频率" value={(3e8 / (wavelength * 1e-9) / 1e12).toFixed(2) + ' THz'} />
              <InfoItem label="强度 1 (I₁)" value={I1.toFixed(3)} color={color} />
              <InfoItem label="强度 2 (I₂)" value={I2.toFixed(3)} color="#a855f7" />
              <InfoItem label="最大强度" value={maxIntensity.toFixed(3)} color="#00ff88" />
              <InfoItem label="最小强度" value={minIntensity.toFixed(3)} color="#ff3366" />
              <InfoItem label="条纹可见度" value={(visibility * 100).toFixed(1) + '%'} color="#00d4ff" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">干涉原理</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-cyan font-semibold">光波叠加原理：</span>
              当两列或多列波在空间相遇时，在相遇区域内每一点的振动是各列波单独作用于该点所产生的振动的合成。
            </p>
            <div className="font-mono text-lab-text bg-lab-bg/50 px-3 py-2 rounded-lg overflow-x-auto text-sm">
              $E = E_1 + E_2 = A_1\cos(\omega t + \phi_1) + A_2\cos(\omega t + \phi_2)$
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-green font-semibold">干涉强度：</span>
              两束相干光叠加后的光强不仅取决于各自的强度，还与它们之间的相位差有关。
            </p>
            <div className="font-mono text-lab-text bg-lab-bg/50 px-3 py-2 rounded-lg overflow-x-auto text-sm">
              $$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos(\Delta\phi)$$
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
