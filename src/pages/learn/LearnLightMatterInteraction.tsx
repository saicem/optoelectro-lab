import { Sun, Atom, Sigma, TrendingUp, Activity, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面分区：按文档 ## 顺序对应（含"总结"）
const pageSections = [
  { id: 's-0', title: '光子的能量与动量' },
  { id: 's-1', title: '三种基本过程' },
  { id: 's-2', title: '爱因斯坦 A/B 系数' },
  { id: 's-3', title: '粒子数反转' },
  { id: 's-4', title: '吸收系数与增益' },
  { id: 's-5', title: '总结' },
];

export default function LearnLightMatterInteraction() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } =
    useChapterNavigation(ROUTES.LEARN.LIGHT_MATTER_INTERACTION);
  const prev = prevChapter
    ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> }
    : undefined;
  const next = nextChapter
    ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> }
    : undefined;

  return (
    <LearnLayout
      title="光与物质相互作用"
      subtitle="吸收、自发辐射与受激辐射——光电器件的物理起点"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      {/* 光子的能量与动量 */}
      <LearnSection id="s-0" icon={<Sun className="w-5 h-5 text-laser-cyan" />} title="光子的能量与动量">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>光既具有波动性又具有粒子性，其能量与动量由基本关系给出：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E = h\\nu = \\frac{hc}{\\lambda}$$'}</MathRenderer>
          </div>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$p = \\frac{h}{\\lambda}$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">h</span> 为普朗克常数，
            <span className="text-laser-cyan font-mono">ν</span> 为光子频率，
            <span className="text-laser-cyan font-mono">λ</span> 为波长，
            <span className="text-laser-cyan font-mono">c</span> 为真空光速。
          </p>
          <p>当光子与半导体中的电子相互作用时，必须同时满足：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">能量守恒</span>：电子跃迁前后的能量差等于光子能量（或光子能量加上/减去声子能量）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">动量守恒</span>：跃迁前后电子的波矢变化必须由光子或声子提供
              </span>
            </li>
          </ul>
          <p>
            在<span className="font-semibold text-laser-green">直接带隙</span>
            材料中，价带顶与导带底在 k 空间同一位置，光子动量很小可以忽略，电子可以直接垂直跃迁——这是高效发光与吸收的前提。在
            <span className="font-semibold text-laser-red">间接带隙</span>
            材料中，跃迁需要声子参与以满足动量守恒，概率大大降低。
          </p>
        </div>
      </LearnSection>

      {/* 三种基本过程 */}
      <LearnSection id="s-1" icon={<Atom className="w-5 h-5 text-laser-green" />} title="三种基本过程">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光与半导体中电子的相互作用可归结为三个基本过程：<TermNote term="受激吸收" />、
            <TermNote term="自发辐射" />和<TermNote term="受激辐射" />。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">受激吸收（Stimulated Absorption）</h3>
          <p>
            价带中的电子在入射光子激发下跃迁到导带，消耗一个光子并产生一个电子-空穴对。这一过程需要：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>
                光子能量 <span className="text-laser-cyan font-mono">hν ≥ E_g</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>价带存在可被激发的电子，导带存在可占据的空态</span>
            </li>
          </ul>
          <p>吸收速率正比于：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{abs}} \\propto \\rho(\\nu) \\cdot f_v \\cdot (1 - f_c)$$'}</MathRenderer>
          </div>
          <p>
            即光子密度 <span className="text-laser-cyan font-mono">ρ(ν)</span>、价带电子占据概率{' '}
            <span className="text-laser-cyan font-mono">f_v</span> 与导带空态概率{' '}
            <span className="text-laser-cyan font-mono">(1 - f_c)</span> 的乘积。
          </p>
          <p>
            受激吸收是<span className="font-semibold text-laser-cyan">光电探测器</span>
            工作的物理基础——光子被吸收后产生的电子-空穴对在外加电场下分离形成光电流。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">自发辐射（Spontaneous Emission）</h3>
          <p>
            导带中的电子自发地跃迁到价带的空态，释放一个光子。这一过程无需外界光场诱发，是随机的：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>发射方向各向同性</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>
                发射光子的相位、偏振彼此独立（<span className="font-semibold text-laser-purple">非相干光</span>）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>发光强度正比于上能级电子数</span>
            </li>
          </ul>
          <p>在两能级原子体系中，自发辐射速率：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{spont}} = A \\cdot n$$'}</MathRenderer>
          </div>
          <p>在半导体中通常写为：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{spont}} = B \\cdot n \\cdot p$$'}</MathRenderer>
          </div>
          <p>
            自发辐射是 <span className="font-semibold text-laser-green">LED</span>{' '}
            工作的物理基础——注入的载流子在有源区复合，向各方向发射非相干光。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">受激辐射（Stimulated Emission）</h3>
          <p>
            当入射光子与处于上能级的电子相互作用时，光子会诱导电子跃迁到下能级，并发射一个
            <span className="font-semibold text-laser-cyan">与入射光子完全相同</span>的光子：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>相同的频率</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>相同的相位</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>相同的传播方向</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>相同的偏振态</span>
            </li>
          </ul>
          <p>
            这是产生<span className="font-semibold text-laser-cyan">相干光</span>的过程，也是光放大的核心机制。
          </p>
          <p>受激辐射速率：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{stim}} = B_{\\text{stim}} \\cdot \\rho(\\nu) \\cdot n$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">ρ(ν)</span> 为光场能量密度，
            <span className="text-laser-cyan font-mono">n</span> 为上能级电子数。
          </p>
          <p>
            受激辐射是<span className="font-semibold text-laser-purple">半导体激光器和光放大器</span>
            工作的物理基础——通过粒子数反转实现光放大，再借助谐振腔形成激光振荡。
          </p>
        </div>
      </LearnSection>

      {/* 爱因斯坦 A/B 系数 */}
      <LearnSection id="s-2" icon={<Sigma className="w-5 h-5 text-laser-purple" />} title="爱因斯坦 A/B 系数">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>爱因斯坦在 1917 年用统计物理统一描述了上述三种过程，引入两个系数：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-purple">
                  <span className="font-mono">A</span> 系数
                </span>
                ：自发辐射系数，描述无外场时的跃迁
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-purple">
                  <span className="font-mono">B</span> 系数
                </span>
                ：受激跃迁系数，描述在外光场作用下的受激吸收和受激辐射
              </span>
            </li>
          </ul>
          <p>爱因斯坦推导出两个关键关系：</p>

          <h4 className="font-semibold text-lab-text pt-2">
            1. 受激吸收与受激辐射的 <span className="font-mono text-laser-cyan">B</span> 系数相等
          </h4>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$B_{12} = B_{21} = B$$'}</MathRenderer>
          </div>
          <p>即一个光子诱发向上跃迁和向下跃迁的概率相同，差别仅在于上下能级的粒子数分布。</p>

          <h4 className="font-semibold text-lab-text pt-2">
            2. 自发辐射系数与受激辐射系数之比由普朗克公式决定
          </h4>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{A}{B} = \\frac{8\\pi h \\nu^3}{c^3}$$'}</MathRenderer>
          </div>
          <p>
            这个比值正比于 <span className="text-laser-cyan font-mono">ν³</span>
            ，说明频率越高，自发辐射相对于受激辐射越占优势——这是高频段难以实现激光的物理原因之一。
          </p>
          <p>
            在热平衡状态下，三种过程同时存在，光子数分布满足玻色-爱因斯坦分布，这正是黑体辐射的普朗克公式。
          </p>
        </div>
      </LearnSection>

      {/* 粒子数反转 */}
      <LearnSection id="s-3" icon={<TrendingUp className="w-5 h-5 text-laser-red" />} title="粒子数反转">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">热平衡下的吸收</h3>
          <p>
            在热平衡时，上能级（导带）粒子数 <span className="text-laser-cyan font-mono">N₂</span>{' '}
            远小于下能级（价带）粒子数 <span className="text-laser-cyan font-mono">N₁</span>：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{N_2}{N_1} = \\exp\\left(-\\frac{E_g}{k_B T}\\right) \\ll 1$$'}</MathRenderer>
          </div>
          <p>
            由于 <span className="text-laser-cyan font-mono">B₁₂ = B₂₁</span>，受激吸收速率{' '}
            <span className="text-laser-cyan font-mono">∝ N₁</span> 大于受激辐射速率{' '}
            <span className="text-laser-cyan font-mono">∝ N₂</span>，净效果是光被吸收。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">实现光放大——粒子数反转</h3>
          <p>要实现光放大，必须让受激辐射大于受激吸收，即要求：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$N_2 > N_1$$'}</MathRenderer>
          </div>
          <p>
            这种状态称为<TermNote term="粒子数反转" />（Population Inversion），是非热平衡态，必须依靠外界能量输入来维持。
          </p>
          <p>在半导体中，粒子数反转体现为：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">导带底</span>被电子大量填充
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">价带顶</span>被空穴大量填充（即价带电子被掏空）
              </span>
            </li>
          </ul>
          <p>
            这就要求通过<TermNote term="泵浦" />（通常是注入电流）持续向有源区提供电子和空穴，并依靠异质结对载流子的限制作用维持高浓度。
          </p>
          <p>
            粒子数反转是<span className="font-semibold text-laser-purple">激光器和光放大器的起振条件</span>
            ——只有反转才能提供净增益，克服腔内损耗形成激光振荡。
          </p>
        </div>
      </LearnSection>

      {/* 吸收系数与增益 */}
      <LearnSection id="s-4" icon={<Activity className="w-5 h-5 text-laser-orange" />} title="吸收系数与增益">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">吸收系数</h3>
          <p>
            <span className="font-semibold text-laser-orange">吸收系数</span>{' '}
            <span className="text-laser-cyan font-mono">α(λ)</span>
            描述材料对特定波长光的吸收能力，定义为光强随传播距离的衰减常数：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$I(x) = I_0 \\cdot e^{-\\alpha x}$$'}</MathRenderer>
          </div>
          <p>
            <span className="text-laser-cyan font-mono">α(λ)</span> 与波长强相关：当{' '}
            <span className="text-laser-cyan font-mono">hν &gt; E_g</span> 时吸收显著，当{' '}
            <span className="text-laser-cyan font-mono">hν &lt; E_g</span>{' '}
            时材料透明。吸收边的形状由带间跃迁的态密度决定。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">增益</h3>
          <p>
            当材料处于粒子数反转状态时，受激辐射大于受激吸收，光通过材料时不是衰减而是被放大。定义
            <span className="font-semibold text-laser-orange">增益</span>：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$g(\\lambda) = -\\alpha(\\lambda)$$'}</MathRenderer>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-1">•</span>
              <span>
                <span className="text-laser-cyan font-mono">g &gt; 0</span>：材料对光放大（反转态）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-1">•</span>
              <span>
                <span className="text-laser-cyan font-mono">g &lt; 0</span>：材料对光吸收（平衡态）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-1">•</span>
              <span>
                <span className="text-laser-cyan font-mono">g = 0</span>：材料对该波长透明
              </span>
            </li>
          </ul>

          <h3 className="font-semibold text-lab-text pt-2">增益与载流子浓度的关系</h3>
          <p>
            增益谱 <span className="text-laser-cyan font-mono">g(λ, n)</span>{' '}
            随注入载流子浓度 <span className="text-laser-cyan font-mono">n</span> 变化：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">注入载流子越多 → 增益越高</span>（反转更强）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">增益峰值波长随注入增加而蓝移</span>
                （高能态被填充更多，跃迁能量变大）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">透明载流子浓度</span>{' '}
                <span className="text-laser-cyan font-mono">n_tr</span>：使{' '}
                <span className="text-laser-cyan font-mono">g = 0</span> 的载流子浓度。注入必须超过{' '}
                <span className="text-laser-cyan font-mono">n_tr</span> 才能获得净增益。
              </span>
            </li>
          </ul>
          <p>
            透明载流子浓度和增益饱和特性是设计半导体激光器有源区的关键参数——它们直接决定阈值电流和最大输出功率。
          </p>
        </div>
      </LearnSection>

      {/* 总结 */}
      <LearnSection id="s-5" icon={<Lightbulb className="w-5 h-5 text-laser-cyan" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">吸收</span>（光电探测器）、
                <span className="font-semibold text-laser-green">自发辐射</span>（LED）、
                <span className="font-semibold text-laser-purple">受激辐射</span>
                （激光器/放大器）是光与物质相互作用的三种基本过程，对应三类核心光电器件。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-purple">爱因斯坦 A/B 系数</span>
                将三者定量联系起来：受激吸收与受激辐射的 <span className="text-laser-cyan font-mono">B</span>{' '}
                系数相等，<span className="text-laser-cyan font-mono">A/B</span> 比值由普朗克公式给出。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-red">粒子数反转</span>
                是光放大的必要条件，需要泵浦（注入电流）维持。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-orange">增益</span>{' '}
                <span className="text-laser-cyan font-mono">g(λ)</span>
                是反转态下材料对光的放大能力，随载流子浓度增加而增大并蓝移。
              </span>
            </li>
          </ul>
          <p>
            这些概念是{' '}
            <Link to={ROUTES.LEARN.LASER} className="text-laser-cyan hover:underline">
              Part 2 激光器章节
            </Link>{' '}
            的物理起点，将在那里进一步展开阈值条件、速率方程和调制特性等内容。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
