import { Lightbulb, Waves } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';

export default function LearnLightBasics() {
  return (
    <LearnLayout
      title="光波基础"
      subtitle="从光的本质出发，理解电磁波、波长、频率与相位"
      currentIndex={0}
      totalChapters={6}
      nextChapter={{ path: '/learn/interference', title: '干涉原理', icon: <Waves className="w-4 h-4" /> }}
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
            其中 <span className="text-laser-cyan">ΔL</span> 是两束光的光程差。
            当光程差为波长的整数倍时，相位差为 2π 的整数倍，两束光同相，干涉相长；
            当光程差为半波长的奇数倍时，相位差为 π 的奇数倍，两束光反相，干涉相消。
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
            光调制器是实现这一功能的核心器件。
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">直接调制 vs 外部调制</h4>
                <p className="text-sm">
                  直接调制通过改变激光器的注入电流来调制光强，简单但速率受限。
                  外部调制器则对连续输出的激光进行调制，可实现更高的调制速率和更好的性能。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">电光效应</h4>
                <p className="text-sm">
                  大多数光调制器基于电光效应：某些晶体材料（如铌酸锂 LiNbO₃、硅）
                  的折射率会随外加电场变化，从而改变光的相位。通过巧妙的结构设计，
                  可以将相位调制转化为强度调制、偏振调制等。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">调制器的发展</h4>
                <p className="text-sm">
                  从简单的强度调制，到复杂的 IQ 正交调制，再到偏振复用，
                  光调制技术不断进步，使得单根光纤的传输容量从 Gb/s 量级提升到 Pb/s 量级。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LearnLayout>
  );
}
