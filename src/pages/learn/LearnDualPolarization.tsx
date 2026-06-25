import { BarChart3, Compass, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';

export default function LearnDualPolarization() {
  return (
    <LearnLayout
      title="双偏振 IQ 调制器"
      subtitle="DP-IQM：现代高速相干光通信的核心引擎，集成偏振复用与 IQ 调制"
      currentIndex={5}
      totalChapters={6}
      prevChapter={{ path: '/learn/polarization', title: '偏振复用', icon: <Compass className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-laser-cyan" />
          什么是双偏振 IQ 调制器？
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">双偏振 IQ 调制器 (Dual-Polarization IQ Modulator, DP-IQM)</span>
            是将两个独立的 IQ 调制器集成在一起，并结合偏振合束器，
            实现对 X 和 Y 两个正交偏振态独立调制的器件。
            它是现代 100G+ 相干光通信系统的核心器件。
          </p>
          <p>
            DP-IQM 结合了我们前面学到的所有技术：
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-laser-green">✓</span>
              <span>MZ 调制器 —— 电光相位/强度调制的基础</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple">✓</span>
              <span>IQ 正交调制 —— 同时控制幅度和相位</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red">✓</span>
              <span>偏振复用 —— 两个偏振态独立传输，容量翻倍</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          DP-IQM 的结构
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            一个典型的 DP-IQM 由以下主要部分组成：
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">输入偏振分束器 (PBS)</h4>
                <p className="text-sm">
                  将输入的连续波 (CW) 激光分成 X 和 Y 两个正交偏振态，
                  分别送入两路 IQ 调制器。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">X 偏振 IQ 调制器</h4>
                <p className="text-sm">
                  由两个子 MZM 和一个光 90° 混合组成，调制 X 偏振态的光信号。
                  包含 I_x 和 Q_x 两个驱动输入。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">Y 偏振 IQ 调制器</h4>
                <p className="text-sm">
                  与 X 路结构相同，独立调制 Y 偏振态的光信号。
                  包含 I_y 和 Q_y 两个驱动输入。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-red/20 text-laser-red flex items-center justify-center flex-shrink-0">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">偏振旋转器 (PS)</h4>
                <p className="text-sm">
                  将其中一路（通常是 Y 路）的偏振态旋转 90°，
                  使得两路光的偏振态正交。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">偏振合束器 (PBC)</h4>
                <p className="text-sm">
                  将 X 和 Y 两个正交偏振态的光合路输出，形成偏振复用信号。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <div className="text-center mb-4 font-semibold text-lab-text">DP-IQM 结构框图</div>
            <div className="text-xs space-y-2">
              <div className="flex items-center justify-center">
                <span className="text-lab-muted">输入光 (CW Laser)</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-laser-cyan">↓</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-1.5 border border-laser-cyan/50 rounded bg-laser-cyan/10">偏振分束器 (PBS)</span>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-2">
                <div className="text-center">
                  <div className="text-laser-green text-xs mb-1">X 偏振</div>
                  <div className="px-2 py-1 border border-laser-green/50 rounded bg-laser-green/10 text-xs">IQ Modulator X</div>
                  <div className="text-xs text-lab-muted mt-1">I_x / Q_x 驱动</div>
                </div>
                <div className="text-center">
                  <div className="text-laser-purple text-xs mb-1">Y 偏振</div>
                  <div className="px-2 py-1 border border-laser-purple/50 rounded bg-laser-purple/10 text-xs">IQ Modulator Y</div>
                  <div className="text-xs text-lab-muted mt-1">I_y / Q_y 驱动</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-laser-green">↓</span>
                <span className="text-laser-purple">↓</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-xs">直通</span>
                <span className="px-2 py-1 border border-laser-purple/50 rounded bg-laser-purple/10 text-xs">偏振旋转 90°</span>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-laser-cyan">↓</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-1.5 border border-laser-cyan/50 rounded bg-laser-cyan/10">偏振合束器 (PBC)</span>
              </div>
              <div className="flex items-center justify-center mt-1">
                <span className="text-lab-muted">↓ DP-QPSK / DP-16QAM 输出</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          加热器与偏置控制
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在硅基光电子 (Silicon Photonics) 等集成光电子平台中，
            <span className="text-laser-green font-semibold">热光效应 (Thermo-optic Effect)</span>
            被广泛用于调节相位。加热器通过改变波导的温度来改变其折射率，
            从而实现对光相位的精确控制。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta n = \\frac{dn}{dT} \\cdot \\Delta T$$'}</MathRenderer>
          </div>
          <p>
            对于硅材料，热光系数 dn/dT 约为 1.8×10⁻⁴ /°C。
            通过调整加热器的电压和电流，可以精确控制温度，进而控制相位。
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">DP-IQM 中的加热器：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">X-I MZM 偏置加热器：</span>控制 X 路 I 臂 MZM 的偏置点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">X-Q MZM 偏置加热器：</span>控制 X 路 Q 臂 MZM 的偏置点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span><span className="text-laser-purple font-medium">X 正交相位加热器：</span>控制 X 路 I/Q 之间的 90° 相位差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span><span className="text-laser-red font-medium">Y-I MZM 偏置加热器：</span>控制 Y 路 I 臂 MZM 的偏置点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">Y-Q MZM 偏置加热器：</span>控制 Y 路 Q 臂 MZM 的偏置点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">Y 正交相位加热器：</span>控制 Y 路 I/Q 之间的 90° 相位差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span><span className="text-laser-purple font-medium">偏振旋转加热器：</span>微调偏振态，确保正交</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">加热器功率：</h3>
              <p className="text-sm mb-2">
                加热器的功耗与电压和电流的关系：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$P = V \\cdot I = \\frac{V^2}{R} = I^2 R$$'}</MathRenderer>
              </div>
              <p className="text-sm mt-2">
                其中 R 是加热器的电阻。通过调整电压或电流，
                可以精确控制加热器的功率，进而控制相位偏移量。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          典型应用场景
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">100G/400G 相干光通信</h4>
              <p className="text-sm">
                DP-QPSK 和 DP-16QAM 是 100G 和 400G 光传输系统的标准调制格式，
                广泛应用于城域网和骨干网。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">800G/1.6T 超高速传输</h4>
              <p className="text-sm">
                采用 DP-64QAM 甚至 DP-256QAM 等高阶调制格式，
                结合更大的波特率，实现单波长 800G 甚至 1.6T 的传输容量。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">数据中心互联 (DCI)</h4>
              <p className="text-sm">
                用于数据中心之间的高速互联，满足云计算和大数据业务对带宽的巨大需求。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">相干光接入网</h4>
              <p className="text-sm">
                下一代无源光网络 (PON) 可能采用相干技术，
                大幅提升接入网的速率和功率预算。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          动手实验
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            恭喜你完成了全部理论学习！现在，你已经掌握了从光波基础到双偏振 IQ 调制器的完整知识体系。
          </p>
          <p>
            是时候去 <span className="text-laser-purple font-semibold">Playground</span> 亲自体验了！
            在双偏振 IQ 调制器的互动实验中，你可以：
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan">🎛️</span>
              <span>调节各个加热器的电压和电流</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green">📊</span>
              <span>观察 X 和 Y 偏振态的输出星座图</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple">🔧</span>
              <span>调整偏置点，体验偏置控制的重要性</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red">⚡</span>
              <span>理解加热器功耗与相位控制的关系</span>
            </li>
          </ul>
          <div className="mt-6 text-center">
            <Link
              to="/playground/dual-polarization"
              className="inline-flex items-center gap-2 px-6 py-3 bg-laser-purple text-white font-semibold rounded-xl hover:bg-laser-purple/90 transition-all hover:shadow-glow-purple"
            >
              <FlaskConical className="w-5 h-5" />
              进入双偏振 IQ 调制器实验
            </Link>
          </div>
        </div>
      </section>
    </LearnLayout>
  );
}
