import { BarChart3, Compass, CircuitBoard } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';

export default function LearnIQModulator() {
  return (
    <LearnLayout
      title="IQ 调制器"
      subtitle="正交幅度调制、星座图与高阶调制格式，现代光通信的核心技术"
      currentIndex={3}
      totalChapters={6}
      prevChapter={{ path: '/learn/mz-modulator', title: 'MZ 调制器', icon: <CircuitBoard className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/polarization', title: '偏振复用', icon: <Compass className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-laser-purple" />
          什么是 IQ 调制？
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">IQ 调制（同相正交调制）</span>
            是一种将两个独立的基带信号（I 路和 Q 路）分别调制到相位相差 90°
            的两个光载波上，然后合成一个信号的调制方式。
            IQ 调制可以同时控制光信号的幅度和相位，从而大大提高频谱效率。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_{out}(t) = I(t) \\cdot \\cos(\\omega t) + Q(t) \\cdot \\sin(\\omega t)$$'}</MathRenderer>
          </div>
          <p>
            其中 I 是同相 (in-phase) 分量，Q 是正交 (quadrature) 分量，两者相位差 90° (π/2)。
            利用三角函数的恒等式，上式可以改写为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_{out}(t) = A(t) \\cdot \\cos(\\omega t + \\phi(t))$$'}</MathRenderer>
          </div>
          <p>
            其中幅度 A 和相位 φ 分别为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$A = \\sqrt{I^2 + Q^2}, \\quad \\phi = -\\arctan\\left(\\frac{Q}{I}\\right)$$'}</MathRenderer>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          IQ 调制器的结构
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            一个典型的光 IQ 调制器由以下部分组成：
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">光分束器</h4>
                <p className="text-sm">将输入光分成两路，分别进入 I 臂和 Q 臂的 MZM。</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">两个子 MZM（I-MZM 和 Q-MZM）</h4>
                <p className="text-sm">
                  分别对 I 路和 Q 路信号进行调制。每个子 MZM 工作在推挽模式，
                  偏置在正交点以实现线性的电光转换。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">90° 光移相器（π/2 相移）</h4>
                <p className="text-sm">
                  在 Q 臂上引入一个额外的 π/2 相位偏移，使得 Q 路光与 I 路光正交。
                  这个相移通常由偏置电压提供。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-red/20 text-laser-red flex items-center justify-center flex-shrink-0">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">光合束器</h4>
                <p className="text-sm">将调制后的 I 路和 Q 路光合路输出。</p>
              </div>
            </div>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="text-center mb-3 font-semibold text-lab-text">IQ 调制器结构框图</div>
            <div className="text-xs space-y-2 text-lab-muted">
              <div className="flex items-center justify-center gap-2">
                <span>输入光</span>
                <span className="text-laser-cyan">→</span>
                <span className="px-2 py-1 border border-laser-cyan/50 rounded bg-laser-cyan/10">分束器</span>
                <span className="text-laser-cyan">→</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 border border-laser-green/50 rounded bg-laser-green/10">I-MZM</span>
                  <span className="text-laser-green">→</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 border border-laser-purple/50 rounded bg-laser-purple/10">Q-MZM</span>
                  <span className="text-laser-purple">→</span>
                  <span className="px-2 py-1 border border-laser-purple/50 rounded bg-laser-purple/10">π/2相移</span>
                  <span className="text-laser-purple">→</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-laser-cyan">→</span>
                <span className="px-2 py-1 border border-laser-cyan/50 rounded bg-laser-cyan/10">合束器</span>
                <span className="text-laser-cyan">→</span>
                <span>输出光</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          星座图：直观理解 IQ 调制
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">星座图 (Constellation Diagram)</span>
            是表示 IQ 调制信号的一种直观方式。它以 I 为横轴、Q 为纵轴建立复平面，
            每个符号对应星座图上的一个点，其位置由 I 和 Q 的值决定。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">星座图的信息：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">幅度：</span>点到原点的距离</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">相位：</span>点与横轴的夹角</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span><span className="text-laser-purple font-medium">点数：</span>调制阶数（每个符号携带的比特数）</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">常见调制格式：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span><span className="text-laser-red font-medium">QPSK：</span>4 个星座点，每符号 2 bit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">16QAM：</span>16 个星座点，每符号 4 bit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">64QAM：</span>64 个星座点，每符号 6 bit</span>
                </li>
              </ul>
            </div>
          </div>
          <p>
            调制阶数越高，频谱效率越高，但对信噪比的要求也越高。
            在实际系统中，需要根据信道条件选择合适的调制格式。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          调制格式与频谱效率
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            频谱效率 (Spectral Efficiency, SE) 是衡量调制技术优劣的重要指标，
            表示单位带宽内能够传输的数据速率，单位是 bit/s/Hz。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 text-lab-muted font-medium">调制格式</th>
                  <th className="text-center py-2 text-lab-muted font-medium">星座点数</th>
                  <th className="text-center py-2 text-lab-muted font-medium">每符号比特</th>
                  <th className="text-center py-2 text-lab-muted font-medium">频谱效率 (bit/s/Hz)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 text-lab-text">OOK (开关键控)</td>
                  <td className="py-2 text-center">2</td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-center">~1</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 text-lab-text">QPSK</td>
                  <td className="py-2 text-center">4</td>
                  <td className="py-2 text-center">2</td>
                  <td className="py-2 text-center">~2</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 text-lab-text">16QAM</td>
                  <td className="py-2 text-center">16</td>
                  <td className="py-2 text-center">4</td>
                  <td className="py-2 text-center">~4</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 text-lab-text">64QAM</td>
                  <td className="py-2 text-center">64</td>
                  <td className="py-2 text-center">6</td>
                  <td className="py-2 text-center">~6</td>
                </tr>
                <tr>
                  <td className="py-2 text-lab-text">256QAM</td>
                  <td className="py-2 text-center">256</td>
                  <td className="py-2 text-center">8</td>
                  <td className="py-2 text-center">~8</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            * 实际频谱效率还与脉冲整形、编码开销等因素有关。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          IQ 调制器的偏置控制
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            IQ 调制器有三个需要精确控制的偏置点，它们对调制器的性能至关重要：
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                I
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">I-MZM 偏置</h4>
                <p className="text-sm">
                  控制 I 路子 MZM 的工作点，通常偏置在正交点（Null 点）
                  以实现线性的强度-电压转换。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                Q
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">Q-MZM 偏置</h4>
                <p className="text-sm">
                  控制 Q 路子 MZM 的工作点，同样偏置在正交点。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                φ
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">正交相位偏置</h4>
                <p className="text-sm">
                  控制 I 路和 Q 路之间的相位差，确保为精确的 90° (π/2)。
                  这个偏置的误差会导致 I/Q 不平衡，降低系统性能。
                </p>
              </div>
            </div>
          </div>
          <p>
            由于温度变化、老化等因素，偏置点会发生漂移。
            因此商用 IQ 调制器都配有自动偏置控制 (ABC) 电路，
            通过监测输出光的特性来动态调整偏置电压，维持最佳工作状态。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          下一步：偏振复用
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            IQ 调制利用了光的幅度和相位维度，将频谱效率提升了数倍。
            但光还有一个重要的维度可以利用——<span className="text-laser-red font-semibold">偏振</span>。
          </p>
          <p>
            光有两个正交的偏振态（X 和 Y），它们可以作为独立的信道传输不同的数据。
            这种技术叫做<span className="text-laser-purple font-semibold">偏振复用 (PDM, Polarization Division Multiplexing)</span>，
            可以在不增加频谱宽度的前提下，使传输容量再翻一倍！
          </p>
          <p>
            下一章我们将学习偏振的基本概念和偏振复用技术，
            然后将所有知识整合起来，认识现代高速光通信的核心——
            <span className="text-laser-cyan font-semibold">双偏振 IQ 调制器 (DP-IQM)</span>。
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
