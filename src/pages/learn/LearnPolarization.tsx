import { Compass, Zap, BarChart3 } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';

export default function LearnPolarization() {
  return (
    <LearnLayout
      title="偏振复用"
      subtitle="光的偏振态、斯托克斯矢量与偏振复用技术，让容量再翻一倍"
      currentIndex={5}
      totalChapters={9}
      playgroundPath="/playground/polarization"
      prevChapter={{ path: '/learn/iq-modulator', title: 'IQ 调制器', icon: <BarChart3 className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/dual-polarization', title: '高级调制', icon: <Zap className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5 text-laser-red" />
          光的偏振态
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光是横电磁波，电场矢量的振动方向与传播方向垂直。
            <span className="text-laser-red font-semibold">偏振 (Polarization)</span>
            描述的是电场矢量的振动方向随时间变化的方式。
          </p>
          <p>
            沿 z 方向传播的单色平面波，其电场可以分解为 x 和 y 两个正交分量：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{E}(t) = E_x\\cos(\\omega t)\\hat{x} + E_y\\cos(\\omega t + \\delta)\\hat{y}$$'}</MathRenderer>
          </div>
          <p>
            其中 E_x 和 E_y 是两个分量的振幅，δ 是 y 分量相对于 x 分量的相位差。
            根据这两个参数的不同，光可以呈现不同的偏振态：
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">线偏振</h4>
              <div className="text-sm text-lab-muted">
                当 δ = 0 或 π 时，电场矢量的端点在一条直线上运动。
                <br /><br />
                E_x 和 E_y 同相或反相。
              </div>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">圆偏振</h4>
              <div className="text-sm text-lab-muted">
                当 E_x = E_y 且 δ = ±π/2 时，电场矢量的端点做圆周运动。
                <br /><br />
                δ = π/2 右旋，δ = -π/2 左旋。
              </div>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">椭圆偏振</h4>
              <div className="text-sm text-lab-muted">
                一般情况下，电场矢量的端点做椭圆运动。
                <br /><br />
                线偏振和圆偏振是椭圆偏振的特例。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          斯托克斯矢量与庞加莱球
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">斯托克斯矢量 (Stokes Vector)</span>
            是描述偏振态的一种常用方式，它由四个参数 (S₀, S₁, S₂, S₃) 组成，
            可以方便地测量和计算。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{S} = \\begin{bmatrix} S_0 \\\\ S_1 \\\\ S_2 \\\\ S_3 \\end{bmatrix} = \\begin{bmatrix} I_x + I_y \\\\ I_x - I_y \\\\ I_{45} - I_{135} \\\\ I_R - I_L \\end{bmatrix}$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">参数含义：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan font-mono">S₀</span>
                  <span>— 总光强，总是非负的</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green font-mono">S₁</span>
                  <span>— 0° 和 90° 线偏振分量的光强差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple font-mono">S₂</span>
                  <span>— 45° 和 135° 线偏振分量的光强差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red font-mono">S₃</span>
                  <span>— 右旋和左旋圆偏振分量的光强差</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">归一化与偏振度：</h3>
              <p className="text-sm mb-2">
                对于完全偏振光，有 S₀² = S₁² + S₂² + S₃²。
                对于部分偏振光或自然光，这个等式不成立。
              </p>
              <p className="text-sm mb-2">
                <span className="text-laser-cyan font-medium">偏振度 DOP</span>
                描述光的偏振程度：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$\\text{DOP} = \\frac{\\sqrt{S_1^2 + S_2^2 + S_3^2}}{S_0}$$'}</MathRenderer>
              </div>
              <p className="text-sm mt-2">
                DOP = 1 完全偏振光；DOP = 0 自然光。
              </p>
            </div>
          </div>

          {/* 庞加莱球示意图 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">庞加莱球：偏振态的几何表示</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                {/* 简化的庞加莱球示意图 */}
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-laser-purple/50 bg-laser-purple/10" />
                  {/* 坐标轴 */}
                  <div className="absolute top-1/2 left-0 w-full flex justify-center">
                    <span className="absolute left-0 text-xs text-laser-cyan">S₁</span>
                    <span className="absolute right-0 text-xs text-laser-cyan">-S₁</span>
                  </div>
                  <div className="absolute top-0 left-1/2 h-full flex flex-col justify-center">
                    <span className="absolute top-0 text-xs text-laser-green">S₂</span>
                    <span className="absolute bottom-0 text-xs text-laser-green">-S₂</span>
                  </div>
                  <span className="absolute top-1/2 left-1/2 text-xs text-laser-red">S₃</span>
                  {/* 特殊点标注 */}
                  <div className="absolute top-1/2 left-1 w-2 h-2 rounded-full bg-laser-cyan" title="水平线偏振" />
                  <div className="absolute top-1/2 right-1 w-2 h-2 rounded-full bg-laser-cyan" title="垂直线偏振" />
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-laser-purple font-semibold">庞加莱球 (Poincaré Sphere)</span>
                  是偏振态的几何表示：将归一化的 (S₁, S₂, S₃) 作为三维坐标，
                  所有完全偏振态都分布在单位球面上。
                </p>
                <div className="bg-lab-surface/50 p-3 rounded-lg">
                  <h5 className="font-medium text-lab-text mb-1">球面上特殊点：</h5>
                  <ul className="text-xs space-y-1">
                    <li><span className="text-laser-cyan">• 赤道上：</span>各种线偏振态</li>
                    <li><span className="text-laser-cyan">• 北极 (S₃=1)：</span>右旋圆偏振</li>
                    <li><span className="text-laser-cyan">• 南极 (S₃=-1)：</span>左旋圆偏振</li>
                    <li><span className="text-laser-cyan">• 其他点：</span>椭圆偏振态</li>
                    <li><span className="text-lab-muted">• 对径点：</span>正交偏振态（如 X 和 Y）</li>
                  </ul>
                </div>
                <p className="text-xs text-lab-muted">
                  偏振态的变化可以用球面上的轨迹表示，
                  光纤中的偏振演化对应于球面上的旋转。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          偏振控制器件
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在光通信系统中，经常需要对光的偏振态进行控制和转换。
            以下是几种常见的偏振控制器件：
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">偏振片 (Polarizer)</h4>
              <p className="text-sm">
                只允许特定方向的线偏振光通过，将任意偏振态转换为线偏振光。
                常用于偏振分析和偏振分束器中。
              </p>
              <p className="text-xs text-lab-muted mt-2">
                透过轴方向决定输出偏振方向。
              </p>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">λ/4 波片 (Quarter-Wave Plate)</h4>
              <p className="text-sm">
                对两个正交偏振分量产生 π/2 (90°) 的相位差。
                可以将线偏振转换为圆偏振，或反过来。
              </p>
              <p className="text-xs text-lab-muted mt-2">
                轴与入射线偏振成 45° 时，输出为圆偏振。
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">λ/2 波片 (Half-Wave Plate)</h4>
              <p className="text-sm">
                对两个正交偏振分量产生 π (180°) 的相位差。
                可以旋转线偏振的方向，不改变偏振类型。
              </p>
              <p className="text-xs text-lab-muted mt-2">
                轴与入射偏振成 θ 时，输出偏振旋转 2θ。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">偏振控制器与偏振分束器</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">偏振控制器 (PC)</h5>
                <p className="text-sm">
                  由多个波片（或光纤挤压元件）组成的可调器件，
                  可以将任意输入偏振态转换为所需的输出偏振态。
                </p>
                <p className="text-xs text-lab-muted mt-2">
                  在光通信中用于手动或自动调整信号偏振，
                  使其与接收机的偏振要求匹配。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">偏振分束器 (PBS)</h5>
                <p className="text-sm">
                  将输入光分解为两个正交的线偏振分量，
                  分别从两个端口输出。
                </p>
                <p className="text-xs text-lab-muted mt-2">
                  在偏振复用系统中用于分离 X 和 Y 偏振信号，
                  或将它们合路。
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm">
            <span className="text-laser-red font-medium">保偏光纤 (PM Fiber)</span>
            是一种特殊光纤，其结构设计使得光在其中传播时保持特定的偏振态。
            常用于需要偏振稳定性的应用，如光纤传感器和某些调制器。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          偏振复用 (PDM) 技术
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">偏振复用 (Polarization Division Multiplexing, PDM)</span>
            利用光的两个正交偏振态作为独立的信道传输数据，
            可以在不增加频谱宽度的前提下，使系统的传输容量翻倍。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="text-center mb-3 font-semibold text-lab-text">偏振复用系统示意图</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-laser-cyan">X 通道数据</span>
                <span className="text-lab-muted">→</span>
                <span className="px-2 py-1 border border-laser-cyan/50 rounded bg-laser-cyan/10">IQ 调制器 X</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-laser-purple">Y 通道数据</span>
                <span className="text-lab-muted">→</span>
                <span className="px-2 py-1 border border-laser-purple/50 rounded bg-laser-purple/10">IQ 调制器 Y</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lab-muted">↓</span>
                <span className="text-lab-muted">↓</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 border border-laser-green/50 rounded bg-laser-green/10">偏振合束器 (PBC)</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-lab-muted">↓</span>
              </div>
              <div className="text-center text-laser-green">X+Y 偏振复用信号 → 光纤传输</div>
            </div>
          </div>
          <p>
            在接收端，使用 <TermNote term="偏振分束器" /> (PBS) 将两个偏振态分开，分别进行检测和处理。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          实际挑战：<TermNote term="偏振模色散 (PMD)" />与<TermNote term="偏振相关损耗" />
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在实际的光纤传输中，偏振态并不是一成不变的。光纤的不完善性
            （如纤芯椭圆度、应力不对称等）会导致两个正交偏振模的传输特性不同，
            给偏振复用系统带来挑战。
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">偏振模色散 (PMD)</h4>
              <p className="text-sm">
                两个正交偏振模在光纤中传输速度不同，导致脉冲展宽。
                高速系统中需要用数字信号处理 (DSP) 来补偿。
              </p>
            </div>
            <div className="border border-amber-500/30 bg-amber-500/5 p-4 rounded-xl">
              <h4 className="font-semibold text-amber-400 mb-2">偏振相关损耗 (PDL)</h4>
              <p className="text-sm">
                器件对不同偏振态的损耗不同，导致两个信道的信噪比不平衡。
              </p>
            </div>
          </div>
          <p className="mt-4">
            幸运的是，现代高速光通信系统利用强大的数字信号处理 (DSP) 技术，
            可以在接收端实时跟踪和补偿偏振态的变化，使偏振复用成为实用的技术。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          总结：从偏振复用走向高级调制
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            让我们回顾一下光调制技术的演进路径：
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">强度调制 (OOK)</h4>
                <p className="text-sm">
                  最简单的调制方式，只利用光的强度。频谱效率 ~1 bit/s/Hz。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">IQ 正交调制</h4>
                <p className="text-sm">
                  同时利用幅度和相位，支持 QPSK/QAM 等高阶格式。
                  频谱效率提升到 2-8 bit/s/Hz 甚至更高。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">偏振复用 (PDM)</h4>
                <p className="text-sm">
                  利用两个正交偏振态作为独立信道，容量再翻一倍。
                  PDM-16QAM 的频谱效率可达 ~8 bit/s/Hz。
                </p>
              </div>
            </div>
          </div>
          <p>
            下一章，我们将这些技术整合起来，认识现代高速光通信的核心器件——
            <span className="text-laser-cyan font-semibold">高级调制</span>。
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
