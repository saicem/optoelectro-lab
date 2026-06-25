import { CircuitBoard, BarChart3, Waves } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';

export default function LearnMZModulator() {
  return (
    <LearnLayout
      title="MZ 调制器"
      subtitle="马赫-曾德电光调制器的工作原理、结构与性能指标"
      currentIndex={2}
      totalChapters={6}
      prevChapter={{ path: '/learn/interference', title: '干涉原理', icon: <Waves className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/iq-modulator', title: 'IQ 调制器', icon: <BarChart3 className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-laser-green" />
          MZ 调制器的基本结构
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">马赫-曾德调制器 (MZM)</span>
            是基于马赫-曾德干涉仪结构的电光调制器。它将输入光分成两束，
            分别通过两个相位调制臂，然后重新汇合产生干涉，通过控制两臂的相位差来调制输出光强。
          </p>
          <div className="bg-lab-bg/50 p-6 rounded-xl">
            <div className="text-center mb-4 font-semibold text-lab-text">MZM 结构示意图</div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-lab-muted">输入</div>
              <div className="w-6 h-6 rounded bg-laser-cyan/30 border border-laser-cyan/50" title="分束器" />
              <div className="grid grid-rows-2 gap-3">
                <div className="h-1 w-16 bg-laser-green/50 rounded" />
                <div className="h-1 w-16 bg-laser-purple/50 rounded" />
              </div>
              <div className="w-6 h-6 rounded bg-laser-cyan/30 border border-laser-cyan/50" title="合束器" />
              <div className="text-lab-muted">输出</div>
            </div>
            <div className="text-xs text-lab-muted text-center mt-3">
              上臂（相位调制臂） 下臂（参考臂）
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">核心组成部分：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">3dB 分束器：</span>将输入光等功率分为两束</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">相位调制臂：</span>通过电光效应改变光的相位</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span><span className="text-laser-purple font-medium">3dB 合束器：</span>将两束光重新汇合</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">材料平台：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span><span className="text-laser-red font-medium">铌酸锂 (LiNbO₃)：</span>传统方案，电光系数大</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">硅光 (Si)：</span>集成度高，CMOS 兼容</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">磷化铟 (InP)：</span>可单片集成激光器</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          工作原理与转移函数
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZM 的核心原理是：通过施加电压改变相位调制臂的折射率，
            从而改变两臂的相位差，进而控制输出光的强度。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_{out} = \\frac{E_{in}}{2} \\left[ e^{j\\phi_1} + e^{j\\phi_2} \\right]$$'}</MathRenderer>
          </div>
          <p>
            设两臂的相位分别为 φ₁ 和 φ₂，令 Δφ = φ₁ - φ₂ 为两臂相位差，则输出光强为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$P_{out} = P_{in} \\cdot \\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right) = \\frac{P_{in}}{2} \\left[ 1 + \\cos(\\Delta\\phi) \\right]$$'}</MathRenderer>
          </div>
          <p>
            相位差 Δφ 与施加的电压 V 成正比：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta\\phi = \\pi \\cdot \\frac{V}{V_\\pi}$$'}</MathRenderer>
          </div>
          <p>
            其中 V_π 是半波电压——使相位差变化 π 所需的电压。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          工作点与偏置
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZM 的转移函数是周期性的余弦平方曲线。直流偏置电压决定了调制器的静态工作点，
            不同的工作点有不同的特性。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">正交点 (Quadrature)</h4>
              <div className="text-sm text-lab-muted mb-2">
                V_bias = V_π/2，Δφ = π/2
              </div>
              <div className="text-sm">
                <span className="text-lab-text">特点：</span>
                线性度最好，适合模拟调制。输出光强为输入的一半。
              </div>
            </div>
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">正交点 (Null)</h4>
              <div className="text-sm text-lab-muted mb-2">
                V_bias = V_π，Δφ = π
              </div>
              <div className="text-sm">
                <span className="text-lab-text">特点：</span>
                输出光强最小（消光状态）。适合数字调制的"0"电平。
              </div>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">峰值点 (Peak)</h4>
              <div className="text-sm text-lab-muted mb-2">
                V_bias = 0，Δφ = 0
              </div>
              <div className="text-sm">
                <span className="text-lab-text">特点：</span>
                输出光强最大。适合数字调制的"1"电平。
              </div>
            </div>
          </div>
          <p className="mt-4">
            在实际应用中，MZM 通常偏置在正交点以获得最大的线性调制范围。
            偏置点的稳定性直接影响系统性能，因此需要偏置控制电路来维持稳定的工作点。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          性能指标
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">半波电压 V_π</h4>
              <p className="text-sm">
                使输出光强从最大变到最小（或反之）所需的电压。
                V_π 越小，调制效率越高，驱动功耗越低。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">消光比 ER</h4>
              <p className="text-sm">
                输出最大光功率与最小光功率的比值，通常用 dB 表示。
                消光比越高，"0"和"1"的区分度越好。
              </p>
              <div className="bg-lab-surface/50 px-3 py-1.5 rounded-lg mt-2 text-xs font-mono">
                ER = 10·log₁₀(P_max/P_min)
              </div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">调制带宽</h4>
              <p className="text-sm">
                调制器能够有效工作的最高频率。由电极结构、微波损耗等决定。
                现代高速调制器带宽可达 100 GHz 以上。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">插入损耗</h4>
              <p className="text-sm">
                光通过调制器后的功率损失。包括耦合损耗、传播损耗等。
                插入损耗越低，系统功率预算越充足。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          推挽式 MZM：双驱动结构
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            单驱动 MZM 只有一个调制臂，而<span className="text-laser-purple font-semibold">双驱动 MZM（推挽式）</span>
            的两个臂都可以独立调制。当两臂施加反相的电信号时，
            可以在相同电压下获得两倍的相位差，等效于半波电压减半。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta\\phi = \\frac{\\pi}{V_\\pi} (V_1 - V_2) = \\frac{2\\pi V}{V_\\pi} \\quad (\\text{推挽，} V_1 = -V_2 = V)$$'}</MathRenderer>
          </div>
          <p>
            推挽结构的优势：
          </p>
          <ul className="space-y-2 text-sm ml-4">
            <li className="flex items-start gap-2">
              <span className="text-laser-green">✓</span>
              <span>等效半波电压降低一半，驱动更省力</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan">✓</span>
              <span>可以抑制啁啾（chirp），改善传输性能</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple">✓</span>
              <span>更灵活的调制方式，为 IQ 调制奠定基础</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          从 MZM 到 IQ 调制器
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZM 只能调制光的强度（幅度），但光作为电磁波，还有相位、偏振等维度可以利用。
            为了进一步提高频谱效率，我们需要更复杂的调制方式——
            <span className="text-laser-purple font-semibold">IQ 正交调制</span>。
          </p>
          <p>
            在下一章中，我们将学习如何用两个 MZM 构建一个 IQ 调制器，
            实现对光信号幅度和相位的独立控制，从而支持 QPSK、QAM 等高阶调制格式。
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
