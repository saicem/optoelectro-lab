import { Lightbulb, Flame } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';

export default function LearnLightBasics() {
  return (
    <LearnLayout
      title="光波基础"
      subtitle="从光的本质出发，理解电磁波、波长、频率与相位"
      currentIndex={0}
      totalChapters={9}
      nextChapter={{ path: '/learn/laser', title: '激光器', icon: <Flame className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-laser-cyan" />
          光的本质：电磁波
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光是一种电磁波，由相互垂直的电场和磁场在空间中传播而形成。
            在真空中，光以恒定的速度 <span className="text-laser-cyan font-mono">c ≈ 3×10⁸ m/s</span> 传播。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$c = \\lambda \\cdot f$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan">λ (lambda)</span> 是波长，
            <span className="text-laser-green"> f </span> 是频率。波长和频率成反比关系，
            波长越短，频率越高，光子携带的能量也越大。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-laser-red mb-1">~380-780 nm</div>
              <div className="text-sm text-lab-muted">可见光波长范围</div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-laser-cyan mb-1">~430-790 THz</div>
              <div className="text-sm text-lab-muted">可见光频率范围</div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-laser-purple mb-1">~1.6-3.3 eV</div>
              <div className="text-sm text-lab-muted">光子能量范围</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          简谐光波的数学描述
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            单色平面波可以用简谐函数来描述。在空间某一固定点，电场随时间的变化为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E(t) = A \\cos(\\omega t + \\phi_0)$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">各参数含义：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan font-mono">A</span>
                  <span>— 振幅，决定光的强度（I ∝ A²）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green font-mono">ω = 2πf</span>
                  <span>— 角频率，单位 rad/s</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple font-mono">φ₀</span>
                  <span>— 初相位，决定 t=0 时刻的振动状态</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">光强与振幅：</h3>
              <p className="text-sm mb-2">
                光的强度（能流密度）与振幅的平方成正比：
              </p>
              <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
                <MathRenderer>{'$$I \\propto A^2$$'}</MathRenderer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          相位与相位差
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            相位是波动的一个核心概念，它描述了振动在某一时刻所处的状态（波峰、波谷或中间状态）。
            两束光之间的<span className="text-laser-cyan font-semibold">相位差</span>
            决定了它们相遇时是相互加强还是相互削弱。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta\\phi = \\phi_1 - \\phi_2 = \\frac{2\\pi}{\\lambda} \\cdot \\Delta L$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan">ΔL</span> 是两束光的<TermNote term="光程差" />。
            当光程差为波长的整数倍时，相位差为 2π 的整数倍，两束光同相，<TermNote term="相长干涉" />；
            当光程差为半波长的奇数倍时，相位差为 π 的奇数倍，两束光反相，<TermNote term="相消干涉" />。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">相长干涉（加强）</h4>
              <div className="text-sm text-lab-muted">
                相位差 Δφ = 2kπ (k 为整数)
                <br />
                光程差 ΔL = kλ
              </div>
            </div>
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">相消干涉（削弱）</h4>
              <div className="text-sm text-lab-muted">
                相位差 Δφ = (2k+1)π
                <br />
                光程差 ΔL = (2k+1)λ/2
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          为什么需要光调制器？
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在光通信系统中，我们需要将电信号加载到光载波上进行传输，
            这个过程就叫做<span className="text-laser-purple font-semibold">光调制</span>。
            光调制器是实现这一功能的核心器件，它利用光的可控属性来编码信息。
          </p>

          {/* 光调制的三个维度 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">光调制的三个维度</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-laser-cyan/10 p-4 rounded-lg border border-laser-cyan/30">
                  <div className="text-sm font-semibold text-laser-cyan mb-2">强度（幅度）</div>
                  <p className="text-xs text-lab-muted">
                    最简单的调制方式。控制光的亮/暗来表示 0/1。
                    直接调制和强度调制器都属于这类。
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-green/10 p-4 rounded-lg border border-laser-green/30">
                  <div className="text-sm font-semibold text-laser-green mb-2">相位</div>
                  <p className="text-xs text-lab-muted">
                    控制光的相位来编码信息。结合强度调制可实现 IQ 正交调制，
                    大幅提升频谱效率。
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-purple/10 p-4 rounded-lg border border-laser-purple/30">
                  <div className="text-sm font-semibold text-laser-purple mb-2">偏振</div>
                  <p className="text-xs text-lab-muted">
                    利用光的两个正交偏振态作为独立信道。
                    偏振复用可使容量再翻一倍。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text"><TermNote term="直接调制" /> vs <TermNote term="外部调制" /></h4>
                <p className="text-sm">
                  直接调制通过改变激光器的注入电流来调制光强，简单但速率受限、会产生<TermNote term="啁啾" />。
                  外部调制器则对连续输出的激光进行调制，可实现更高的调制速率和更好的性能。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">电光效应简介</h4>
                <p className="text-sm">
                  大多数光调制器基于<span className="text-laser-green font-medium">电光效应</span>：
                  当外加电场作用于某些晶体材料时，材料的折射率会发生变化，从而改变光的相位。
                </p>
                <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-2 text-xs">
                  <MathRenderer>{'$$\\Delta n = -\\frac{1}{2} n^3 r E$$'}</MathRenderer>
                  <p className="text-lab-muted mt-1">
                    n 是折射率，r 是电光系数（材料特性），E 是电场强度。
                  </p>
                </div>
                <p className="text-sm mt-2">
                  通过巧妙的结构设计（如马赫-曾德干涉仪），可以将相位调制转化为强度调制。
                  后续章节将详细讲解这一原理。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">调制技术的发展路径</h4>
                <p className="text-sm">
                  从简单的强度调制（OOK），到复杂的 IQ 正交调制（QPSK/QAM），再到偏振复用（PDM），
                  光调制技术不断进步，使得单根光纤的传输容量从 Gb/s 量级提升到 Tb/s 甚至 Pb/s 量级。
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="px-2 py-1 bg-laser-cyan/10 rounded">OOK</span>
                  <span className="text-laser-cyan">→</span>
                  <span className="px-2 py-1 bg-laser-green/10 rounded">QPSK</span>
                  <span className="text-laser-cyan">→</span>
                  <span className="px-2 py-1 bg-laser-purple/10 rounded">16QAM</span>
                  <span className="text-laser-cyan">→</span>
                  <span className="px-2 py-1 bg-laser-red/10 rounded">PDM-16QAM</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm">
            接下来的章节，我们将从光源开始，逐步学习激光器原理、干涉现象，
            最终理解各种光调制器的工作原理。
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
