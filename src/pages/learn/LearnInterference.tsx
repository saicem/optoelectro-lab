import { Waves, CircuitBoard } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';

export default function LearnInterference() {
  return (
    <LearnLayout
      title="干涉原理"
      subtitle="理解光波的叠加与干涉现象，这是光调制器的物理基础"
      currentIndex={1}
      totalChapters={6}
      prevChapter={{ path: '/learn/light-basics', title: '光波基础', icon: <Waves className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/mz-modulator', title: 'MZ 调制器', icon: <CircuitBoard className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Waves className="w-5 h-5 text-laser-cyan" />
          波的叠加原理
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            当两列或多列波在空间相遇时，在相遇区域内每一点的振动是各列波单独作用于该点所产生的振动的合成。
            这就是<span className="text-laser-cyan font-semibold">波的叠加原理</span>。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{E} = \\vec{E_1} + \\vec{E_2} + \\dots + \\vec{E_n}$$'}</MathRenderer>
          </div>
          <p>
            对于沿同一方向振动的两束同频率单色光，它们的电场可以分别表示为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_1 = A_1\\cos(\\omega t + \\phi_1), \\quad E_2 = A_2\\cos(\\omega t + \\phi_2)$$'}</MathRenderer>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          双光束干涉
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            当两束相干光（频率相同、振动方向相同、相位差恒定）相遇时，
            叠加后的光强在空间中形成稳定的强弱分布，这就是
            <span className="text-laser-green font-semibold">干涉现象</span>。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$I = I_1 + I_2 + 2\\sqrt{I_1 I_2}\\cos(\\Delta\\phi)$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">其中：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan font-mono">I₁, I₂</span>
                  <span>— 两束光各自的光强</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green font-mono">Δφ = φ₁ - φ₂</span>
                  <span>— 两束光的相位差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple font-mono">2√(I₁I₂)cos(Δφ)</span>
                  <span>— 干涉项</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">条纹可见度：</h3>
              <p className="text-sm mb-2">
                干涉条纹的清晰程度用可见度 V 表示：
              </p>
              <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
                <MathRenderer>{'$$V = \\frac{I_{max} - I_{min}}{I_{max} + I_{min}}$$'}</MathRenderer>
              </div>
              <p className="text-sm mt-2">
                当 I₁ = I₂ 时，V = 1，条纹最清晰；
                当两束光强相差悬殊时，可见度下降。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          分振幅干涉：马赫-曾德干涉仪
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">马赫-曾德干涉仪 (MZI)</span>
            是一种典型的分振幅干涉装置，它通过分束器将一束光分成两束，
            让它们经过不同的路径后再重新汇合，产生干涉。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="grid grid-cols-5 gap-2 items-center text-center text-sm">
              <div className="text-lab-text font-semibold">输入光</div>
              <div className="text-laser-cyan">→</div>
              <div className="text-lab-text font-semibold">分束器</div>
              <div className="text-laser-cyan">→</div>
              <div className="grid grid-rows-2 gap-2">
                <div className="text-laser-green">上臂</div>
                <div className="text-laser-purple">下臂</div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 items-center text-center text-sm mt-2">
              <div className="text-laser-red">输出光</div>
              <div className="text-laser-cyan">←</div>
              <div className="text-lab-text font-semibold">合束器</div>
              <div className="text-laser-cyan">←</div>
              <div className="grid grid-rows-2 gap-2">
                <div className="text-laser-green">上臂</div>
                <div className="text-laser-purple">下臂</div>
              </div>
            </div>
          </div>
          <p>
            如果在其中一臂上引入相位变化（例如通过电光效应改变折射率），
            那么两臂之间的相位差就会改变，输出光强也会随之变化。
            这就是 MZ 调制器的基本原理！
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$P_{out} = P_{in} \\cdot \\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right)$$'}</MathRenderer>
          </div>
          <p>
            当两臂相位差 Δφ = 0 时，输出光强最大（相长干涉）；
            当 Δφ = π 时，输出光强为零（相消干涉）。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          从干涉到调制：关键洞察
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            干涉现象为我们提供了一个强大的工具：通过控制相位差来精确控制光强。
            这正是光调制器的核心思想。
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">?</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">如何控制相位？</h4>
                <p className="text-sm">
                  利用电光效应：在电光晶体上施加电压，电场会改变晶体的折射率，
                  从而改变光在其中传播的相位。相位变化量与电压成正比。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">π</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">半波电压 V_π</h4>
                <p className="text-sm">
                  使相位变化 π 所需的电压称为半波电压。这是调制器的一个重要参数，
                  半波电压越低，调制效率越高。
                </p>
                <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2">
                  <MathRenderer>{'$$V_\\pi = \\frac{\\lambda d}{n^3 r L}$$'}</MathRenderer>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">→</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">下一步：MZ 调制器</h4>
                <p className="text-sm">
                  有了干涉原理的基础，下一章我们将详细学习马赫-曾德调制器 (MZM)
                  的结构、工作原理和性能指标。MZM 是最基本也是应用最广泛的电光调制器。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LearnLayout>
  );
}
