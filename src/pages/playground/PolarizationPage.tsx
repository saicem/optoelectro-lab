import { motion } from 'framer-motion';
import { Compass, Info, ToggleLeft, ToggleRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePolarizationStore } from '@/stores/usePolarizationStore';
import ControlPanel, { SliderControl, InfoItem } from '@/components/common/ControlPanel';
import PolarizationCanvas from '@/components/polarization/PolarizationCanvas';
import { calculateDOP } from '@/utils/polarizationMath';
import MathRenderer from '@/components/common/MathRenderer';

export default function PolarizationPage() {
  const navigate = useNavigate();
  const {
    ex,
    ey,
    delta,
    rotationAngle,
    xPower,
    yPower,
    multiplexing,
    isPlaying,
    setEx,
    setEy,
    setDelta,
    setRotationAngle,
    setXPower,
    setYPower,
    setMultiplexing,
    setIsPlaying,
    reset,
    getStokes,
  } = usePolarizationStore();

  const stokes = getStokes();
  const dop = calculateDOP(stokes);

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
          <div className="w-10 h-10 rounded-xl bg-laser-red/20 text-laser-red flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-lab-text">XY 偏振复用</h1>
            <p className="text-sm text-lab-muted">偏振态可视化与双通道复用技术</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/learn/polarization')}
          className="flex items-center gap-2 px-4 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted hover:text-laser-red hover:border-laser-red/30 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          学习原理
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 min-h-[400px]">
          <PolarizationCanvas />
        </div>

        <div className="space-y-6">
          <ControlPanel
            title="参数调节"
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={reset}
          >
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-lab-muted">偏振复用模式</span>
              <button
                onClick={() => setMultiplexing(!multiplexing)}
                className={`text-2xl transition-colors ${
                  multiplexing ? 'text-laser-purple' : 'text-lab-border'
                }`}
              >
                {multiplexing ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>

            <SliderControl
              label="X 分量振幅 (Eₓ)"
              value={ex}
              min={0}
              max={1.5}
              step={0.01}
              onChange={setEx}
              color="#00d4ff"
            />
            <SliderControl
              label="Y 分量振幅 (E_y)"
              value={ey}
              min={0}
              max={1.5}
              step={0.01}
              onChange={setEy}
              color="#ff3366"
            />
            <SliderControl
              label="相位差 (δ)"
              value={delta}
              min={0}
              max={Math.PI * 2}
              step={0.01}
              onChange={setDelta}
              color="#a855f7"
              valueFormatter={formatPiRad}
            />
            <SliderControl
              label="偏振旋转角"
              value={rotationAngle}
              min={0}
              max={Math.PI}
              step={0.01}
              onChange={setRotationAngle}
              color="#00ff88"
              valueFormatter={formatPiRad}
            />

            {multiplexing && (
              <div className="pt-2 border-t border-lab-border/50">
                <p className="text-xs text-lab-muted mb-3">通道功率</p>
                <SliderControl
                  label="X 通道功率"
                  value={xPower}
                  min={0}
                  max={2}
                  step={0.01}
                  unit=" mW"
                  onChange={setXPower}
                  color="#00d4ff"
                />
                <SliderControl
                  label="Y 通道功率"
                  value={yPower}
                  min={0}
                  max={2}
                  step={0.01}
                  unit=" mW"
                  onChange={setYPower}
                  color="#ff3366"
                />
              </div>
            )}
          </ControlPanel>

          <div className="bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-laser-red" />
              <h3 className="font-display font-semibold text-lab-text">斯托克斯参数</h3>
            </div>
            <div className="space-y-1">
              <InfoItem label="S₀ (总功率)" value={stokes.S0.toFixed(3)} color="#e2e8f0" />
              <InfoItem label="S₁ (0°/90°)" value={stokes.S1.toFixed(3)} color="#00d4ff" />
              <InfoItem label="S₂ (45°/135°)" value={stokes.S2.toFixed(3)} color="#00ff88" />
              <InfoItem label="S₃ (旋向)" value={stokes.S3.toFixed(3)} color="#ff3366" />
              <InfoItem label="偏振度 DOP" value={(dop * 100).toFixed(1) + '%'} color="#a855f7" />
              {multiplexing && (
                <InfoItem label="总功率" value={(xPower + yPower).toFixed(2) + ' mW'} color="#f59e0b" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lab-text mb-3">偏振复用原理</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-lab-muted leading-relaxed">
          <div>
            <p className="mb-2">
              <span className="text-laser-red font-semibold">偏振态表示：</span>
              完全偏振光的偏振态可由斯托克斯矢量 (S₀, S₁, S₂, S₃) 描述，
              对应庞加莱球面上的一个点。偏振度 DOP 表示光的偏振程度。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$\\text{DOP} = \\frac{\\sqrt{S_1^2 + S_2^2 + S_3^2}}{S_0}$$'}</MathRenderer>
            </div>
          </div>
          <div>
            <p className="mb-2">
              <span className="text-laser-purple font-semibold">偏振复用：</span>
              利用光的两个正交偏振态（X 和 Y）作为独立信道传输数据，
              可使光纤通信系统的容量翻倍，是现代高速光通信的关键技术。
            </p>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$\\vec{E}(t) = E_x\\cos(\\omega t)\\hat{x} + E_y\\cos(\\omega t + \\delta)\\hat{y}$$'}</MathRenderer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
