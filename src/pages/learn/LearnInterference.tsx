import { Waves } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '波的叠加原理' },
  { id: 's-1', title: '相干条件与相干长度' },
  { id: 's-2', title: '双光束干涉' },
  { id: 's-3', title: '分振幅干涉：马赫-曾德干涉仪' },
  { id: 's-4', title: '从干涉到调制：关键洞察' },
];

export default function LearnInterference() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN.INTERFERENCE,
  );
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="干涉原理"
      subtitle="理解光波的叠加与干涉现象，这是光调制器的物理基础"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 3 · 调制器篇"
      playgroundPath={ROUTES.PLAYGROUND.INTERFERENCE}
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Waves className="w-5 h-5 text-laser-cyan" />} title="波的叠加原理">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            当两列或多列波在空间相遇时，在相遇区域内每一点的振动是各列波单独作用于该点所产生的振动的合成。 这就是
            <span className="text-laser-cyan font-semibold">波的叠加原理</span>。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{E} = \\vec{E_1} + \\vec{E_2} + \\dots + \\vec{E_n}$$'}</MathRenderer>
          </div>
          <p>对于沿同一方向振动的两束同频率单色光，它们的电场可以分别表示为：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {'$$E_1 = A_1\\cos(\\omega t + \\phi_1), \\quad E_2 = A_2\\cos(\\omega t + \\phi_2)$$'}
            </MathRenderer>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" title="相干条件与相干长度">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            要观察到稳定的干涉现象，两束光必须满足三个<span className="text-laser-cyan font-semibold">相干条件</span>：
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">频率相同</h4>
              <p className="text-sm">两束光的频率必须完全相同，否则相位差会随时间变化，干涉条纹无法稳定。</p>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">振动方向相同</h4>
              <p className="text-sm">两束光的电场振动方向必须平行，否则干涉项会减弱。 垂直振动的两束光不产生干涉。</p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">相位差恒定</h4>
              <p className="text-sm">相位差 Δφ 必须在观测时间内保持恒定， 否则干涉项会平均为零，看不到条纹。</p>
            </div>
          </div>

          {/* 相干长度 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">
              <TermNote term="相干长度" />
              与时间相干性
            </h4>
            <p className="text-sm mb-3">
              实际光源发出的光不是严格单色的，具有一定的谱线宽度 Δλ。 这限制了能够产生干涉的最大光程差，称为相干长度。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <div className="font-semibold text-laser-cyan mb-1">相干长度公式</div>
                <MathRenderer>{'$$L_c = \\frac{\\lambda^2}{\\Delta\\lambda}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">Δλ 越小（单色性越好），相干长度越长。</p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <div className="font-semibold text-laser-green mb-1">相干时间公式</div>
                <MathRenderer>{'$$t_c = \\frac{L_c}{c} = \\frac{1}{\\Delta f}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">相干时间是光保持相位相关的最大时间。</p>
              </div>
            </div>
          </div>

          {/* 时间相干性与空间相干性 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">时间相干性 vs 空间相干性</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-cyan mb-2">时间相干性</h5>
                <p className="text-sm">描述光源在不同时刻发出的光之间的相位相关性。 与光源的谱线宽度（单色性）有关。</p>
                <ul className="text-xs space-y-1 mt-2">
                  <li>
                    <span className="text-laser-cyan">•</span> 激光：相干长度可达数米甚至数公里
                  </li>
                  <li>
                    <span className="text-lab-muted">•</span> 白光：相干长度仅几微米
                  </li>
                </ul>
              </div>
              <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-green mb-2">空间相干性</h5>
                <p className="text-sm">描述光源不同空间位置发出的光之间的相位相关性。 与光源的大小和形状有关。</p>
                <ul className="text-xs space-y-1 mt-2">
                  <li>
                    <span className="text-laser-green">•</span> 点光源：空间相干性最好
                  </li>
                  <li>
                    <span className="text-lab-muted">•</span> 扩展光源：空间相干性受限
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-4">
            <span className="text-laser-red font-semibold">激光</span>同时具有极好的时间相干性（窄线宽）
            和空间相干性（小光斑），因此是产生清晰干涉现象的理想光源。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-2" title="双光束干涉">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            当两束
            <TermNote term="相干光" />
            （频率相同、振动方向相同、相位差恒定）相遇时， 叠加后的光强在空间中形成稳定的强弱分布，这就是
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
              <p className="text-sm mb-2">干涉条纹的清晰程度用可见度 V 表示：</p>
              <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
                <MathRenderer>{'$$V = \\frac{I_{max} - I_{min}}{I_{max} + I_{min}}$$'}</MathRenderer>
              </div>
              <p className="text-sm mt-2">当 I₁ = I₂ 时，V = 1，条纹最清晰； 当两束光强相差悬殊时，可见度下降。</p>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" title="分振幅干涉：马赫-曾德干涉仪">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">
              <TermNote term="马赫-曾德干涉仪" /> (MZI)
            </span>
            是一种典型的分振幅干涉装置，它通过分束器将一束光分成两束， 让它们经过不同的路径后再重新汇合，产生干涉。
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
            那么两臂之间的相位差就会改变，输出光强也会随之变化。 这就是 MZ 调制器的基本原理！
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$P_{out} = P_{in} \\cdot \\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right)$$'}</MathRenderer>
          </div>
          <p>
            当两臂相位差 Δφ = 0 时，输出光强最大（
            <TermNote term="相长干涉" />
            ）； 当 Δφ = π 时，输出光强为零（
            <TermNote term="相消干涉" />
            ）。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-4" title="从干涉到调制：关键洞察">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>干涉现象为我们提供了一个强大的工具：通过控制相位差来精确控制光强。 这正是光调制器的核心思想。</p>
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
                  使相位变化 π 所需的电压称为半波电压。这是调制器的一个重要参数， 半波电压越低，调制效率越高。
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
                  有了干涉原理的基础，下一章我们将详细学习马赫-曾德调制器 (MZM) 的结构、工作原理和性能指标。MZM
                  是最基本也是应用最广泛的电光调制器。
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
