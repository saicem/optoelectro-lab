import { BarChart3, Compass, CircuitBoard } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';

export default function LearnIQModulator() {
  return (
    <LearnLayout
      title="IQ 调制器"
      subtitle="正交幅度调制、星座图与高阶调制格式，现代光通信的核心技术"
      currentIndex={4}
      totalChapters={9}
      playgroundPath="/playground/iq-modulator"
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
            <span className="text-laser-purple font-semibold">IQ 调制（<TermNote term="QAM 调制" />正交调制）</span>
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
            一个典型的光 <TermNote term="IQ 调制器" />由以下部分组成：
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

          {/* IQ 信号与星座点映射 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">IQ 信号与星座点的映射关系</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-laser-cyan mb-2">QPSK 映射示例</h5>
                <div className="bg-lab-surface/50 p-4 rounded-lg">
                  <div className="text-xs mb-3 text-center">
                    {/* 简化的 QPSK 星座图 */}
                    <div className="flex justify-center">
                      <div className="relative w-24 h-24">
                        {/* 坐标轴 */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-lab-border" />
                        <div className="absolute top-0 left-1/2 h-full w-px bg-lab-border" />
                        {/* 星座点 */}
                        <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-laser-cyan text-xs flex items-center justify-center" title="00">00</div>
                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-laser-green text-xs flex items-center justify-center" title="01">01</div>
                        <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-laser-purple text-xs flex items-center justify-center" title="10">10</div>
                        <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-laser-red text-xs flex items-center justify-center" title="11">11</div>
                        {/* 轴标签 */}
                        <span className="absolute left-0 top-1/2 text-xs">-I</span>
                        <span className="absolute right-0 top-1/2 text-xs">+I</span>
                        <span className="absolute top-0 left-1/2 text-xs">+Q</span>
                        <span className="absolute bottom-0 left-1/2 text-xs">-Q</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-lab-muted mt-2">
                    <p><span className="text-laser-cyan">00</span> → I=-1, Q=-1 → 相位 225°</p>
                    <p><span className="text-laser-green">01</span> → I=+1, Q=-1 → 相位 315°</p>
                    <p><span className="text-laser-purple">10</span> → I=-1, Q=+1 → 相位 135°</p>
                    <p><span className="text-laser-red">11</span> → I=+1, Q=+1 → 相位 45°</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-laser-green mb-2">16QAM 映射原理</h5>
                <div className="bg-lab-surface/50 p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    16QAM 使用 4 个电平（±1, ±3）来表示 16 个星座点：
                  </p>
                  <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                    <MathRenderer>{'$$I, Q \\in \\{-3, -1, +1, +3\\}$$'}</MathRenderer>
                  </div>
                  <p className="text-xs text-lab-muted mt-2">
                    每个星座点的坐标 (I, Q) 由 2 bit 决定：
                    <br />
                    • 第 1-2 bit → I 值（00=-3, 01=-1, 11=+1, 10=+3）
                    <br />
                    • 第 3-4 bit → Q 值（同上）
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-lab-muted mt-4">
              驱动电压 V_I 和 V_Q 与 I/Q 值成正比。
              例如，对于 QPSK：V_I = +Vπ/2 或 -Vπ/2 分别对应 I = +1 或 -1。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">星座图的信息：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">幅度：</span>点到原点的距离 = √(I²+Q²)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">相位：</span>点与横轴的夹角 = arctan(Q/I)</span>
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
          IQ 不平衡及其影响
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            实际 IQ 调制器中，I 和 Q 两路可能存在幅度或相位的不平衡，
            这会导致星座图畸变，降低系统性能。
          </p>

          {/* IQ 不平衡类型 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">IQ 不平衡的两种类型</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-cyan mb-2">幅度不平衡 (Gain Imbalance)</h5>
                <p className="text-sm">
                  I 路和 Q 路的增益不同，导致星座图在某一方向拉伸或压缩。
                </p>
                <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-2 text-xs">
                  <MathRenderer>{'$$g = \\frac{|I|}{|Q|} \\neq 1$$'}</MathRenderer>
                </div>
                <p className="text-xs text-lab-muted mt-2">
                  表现为星座图椭圆化，两个轴的半径不相等。
                </p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-purple mb-2">相位不平衡 (Phase Imbalance)</h5>
                <p className="text-sm">
                  I 路和 Q 路之间的相位差偏离 90°，导致星座图旋转或扭曲。
                </p>
                <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-2 text-xs">
                  <MathRenderer>{'$$\\theta \\neq 90^\\circ$$'}</MathRenderer>
                </div>
                <p className="text-xs text-lab-muted mt-2">
                  表现为星座点偏离理想位置，形成菱形或不规则形状。
                </p>
              </div>
            </div>
          </div>

          {/* IQ 不平衡的影响 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">IQ 不平衡的影响</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-laser-red">•</span>
                <span><span className="text-laser-red font-medium">镜像干扰：</span>
                IQ 不平衡会产生镜像信号，在解调时干扰原始信号。
                镜像抑制比 (IRR) 用于衡量这一影响：
                <div className="bg-lab-surface/50 px-3 py-1.5 rounded-lg mt-1 text-xs inline-block">
                  <MathRenderer>{'$$\\text{IRR} = \\frac{P_{image}}{P_{signal}}$$'}</MathRenderer>
                </div>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-green">•</span>
                <span><span className="text-laser-green font-medium">误码率升高：</span>
                星座点偏离理想位置，判决边界不准确，导致误判概率增加。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-purple">•</span>
                <span><span className="text-laser-purple font-medium">频谱效率下降：</span>
                为补偿 IQ 不平衡，可能需要降低调制阶数或增加纠错码开销。</span>
              </li>
            </ul>
          </div>

          {/* 补偿方法 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">IQ 不平衡补偿方法</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-1">发射端预补偿</h5>
                <p className="text-xs text-lab-muted">
                  在驱动信号中预先加入反向不平衡，抵消调制器的非理想特性。
                  需要精确测量调制器的不平衡参数。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-1">接收端后补偿</h5>
                <p className="text-xs text-lab-muted">
                  在 DSP 中使用自适应算法估计和补偿 IQ 不平衡。
                  CMA/MMA 算法可以同时均衡信道和补偿 IQ 不平衡。
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm">
            高性能 IQ 调制器通常将 IQ 不平衡控制在 &lt; 1% 范围内，
            配合接收端 DSP 补偿，可以有效抑制其影响。
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
            <span className="text-laser-cyan font-semibold">高级调制 (Advanced Modulation)</span>。
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
