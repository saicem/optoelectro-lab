import { Atom, FlaskConical, Activity, Wind, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面章节：与文档 ## 二级标题一一对应（含"总结"）
const pageSections = [
  { id: 's-0', title: '能带结构' },
  { id: 's-1', title: '本征半导体与掺杂' },
  { id: 's-2', title: '费米能级' },
  { id: 's-3', title: '载流子输运' },
  { id: 's-4', title: '总结' },
];

export default function LearnSemiconductorBasics() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } =
    useChapterNavigation(ROUTES.LEARN.SEMICONDUCTOR_BASICS);
  // 上一章 / 下一章均包裹图标
  const prev = prevChapter
    ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> }
    : undefined;
  const next = nextChapter
    ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> }
    : undefined;

  return (
    <LearnLayout
      title="半导体基础"
      subtitle="从能带到载流子：理解半导体材料为何能成为光电器件的基石"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      {/* 能带结构 */}
      <LearnSection id="s-0" icon={<Atom className="w-5 h-5 text-laser-cyan" />} title="能带结构">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="font-semibold text-laser-cyan">半导体材料</span>
            是光通信系统的基石。从激光器到光电探测器，从调制器到光放大器，几乎所有核心器件都建立在半导体物理的基础之上。
          </p>
          <p>
            半导体材料的电子在<span className="font-semibold text-laser-cyan">价带（Valence Band）</span>和
            <span className="font-semibold text-laser-cyan">导带（Conduction Band）</span>
            之间运动，中间被一个能量间隙（<TermNote term="带隙" />，Bandgap）隔开。
          </p>

          {/* 能带结构示意：导带 / 带隙 Eg / 价带 */}
          <div className="bg-lab-bg/50 p-5 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 w-full max-w-xs">
                <span className="text-xs text-laser-cyan font-semibold w-10">导带</span>
                <div className="flex-1 h-3 bg-laser-cyan/25 border border-laser-cyan/50 rounded" />
                <span className="text-xs text-laser-cyan font-mono">E_c</span>
              </div>
              <div className="flex items-center justify-center h-14">
                <div className="w-px h-full bg-laser-purple/40" />
                <span className="text-xs text-laser-purple font-mono mx-2">E_g</span>
                <div className="w-px h-full bg-laser-purple/40" />
              </div>
              <div className="flex items-center gap-3 w-full max-w-xs">
                <span className="text-xs text-laser-green font-semibold w-10">价带</span>
                <div className="flex-1 h-3 bg-laser-green/25 border border-laser-green/50 rounded" />
                <span className="text-xs text-laser-green font-mono">E_v</span>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_g = E_c - E_v$$'}</MathRenderer>
          </div>
          <p>带隙能量决定材料的导电性和光学特性。</p>

          <h3 className="font-semibold text-lab-text pt-2">直接带隙与间接带隙</h3>
          <p>根据导带底和价带顶在 k 空间中的位置关系，半导体分为两类：</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">直接带隙</h4>
              <p className="text-sm">
                <span className="text-lab-muted">（如 GaAs、InP）：</span>
                导带底和价带顶在 k 空间同一位置，电子-空穴可直接复合并发光，适合制作激光器和 LED。
              </p>
            </div>
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">间接带隙</h4>
              <p className="text-sm">
                <span className="text-lab-muted">（如 Si、Ge）：</span>
                导带底和价带顶在 k 空间不同位置，复合需要声子参与以守恒动量，发光效率低，但适合集成电路。
              </p>
            </div>
          </div>
          <p>这一区别是为什么硅可以做成极其强大的电子芯片，却难以做成高效激光器的根本原因。</p>
        </div>
      </LearnSection>

      {/* 本征半导体与掺杂 */}
      <LearnSection id="s-1" icon={<FlaskConical className="w-5 h-5 text-laser-green" />} title="本征半导体与掺杂">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">本征半导体</h3>
          <p>
            纯半导体中，价带电子受热激发跃迁到导带，产生
            <span className="font-semibold text-laser-green">电子-空穴对</span>。此时电子浓度 <MathRenderer>{'$n$'}</MathRenderer> 等于空穴浓度 <MathRenderer>{'$p$'}</MathRenderer>，均等于本征载流子浓度 <MathRenderer>{'$n_i$'}</MathRenderer>：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$n_i = \\sqrt{N_c N_v} \\exp\\left(-\\frac{E_g}{2k_B T}\\right)$$'}</MathRenderer>
          </div>
          <p>
            其中 <MathRenderer>{'$N_c$'}</MathRenderer> 和 <MathRenderer>{'$N_v$'}</MathRenderer> 分别为导带和价带的有效态密度，<MathRenderer>{'$k_B$'}</MathRenderer> 为玻尔兹曼常数，<MathRenderer>{'$T$'}</MathRenderer> 为绝对温度。
          </p>
          <p>
            <MathRenderer>{'$n_i$'}</MathRenderer> 随温度升高而急剧增大——这是半导体器件温度敏感的根源。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">掺杂半导体</h3>
          <p>通过引入杂质原子，可以精确控制半导体的载流子类型和浓度：</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">N 型半导体</h4>
              <p className="text-sm">掺杂磷、砷等五价元素（施主），提供额外自由电子。多子为电子，少子为空穴。</p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">P 型半导体</h4>
              <p className="text-sm">掺杂硼、镓等三价元素（受主），提供空穴。多子为空穴，少子为电子。</p>
            </div>
          </div>
          <p>
            在完全电离近似下（室温下通常成立），多子浓度近似等于掺杂浓度：<MathRenderer>{'$n \\approx N_D$'}</MathRenderer>（N 型），<MathRenderer>{'$p \\approx N_A$'}</MathRenderer>（P 型）。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">质量作用定律</h3>
          <p>无论怎么掺杂，平衡时电子和空穴浓度的乘积恒定：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$n \\cdot p = n_i^2$$'}</MathRenderer>
          </div>
          <p>这意味着掺杂越多多子，少子就越少。少子浓度虽低，却在 PN 结和光电器件中扮演关键角色。</p>
        </div>
      </LearnSection>

      {/* 费米能级 */}
      <LearnSection id="s-2" icon={<Activity className="w-5 h-5 text-laser-purple" />} title="费米能级">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">费米-狄拉克分布</h3>
          <p>
            电子占据能级 <MathRenderer>{'$E$'}</MathRenderer> 的概率由费米-狄拉克分布描述：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$f(E) = \\frac{1}{1 + \\exp\\left(\\frac{E - E_F}{k_B T}\\right)}$$'}</MathRenderer>
          </div>
          <p>
            其中 <MathRenderer>{'$E_F$'}</MathRenderer> 为<span className="font-semibold text-laser-purple">费米能级</span>，是概率为 1/2 的能级位置。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">费米能级的物理直觉</h3>
          <p>费米能级可以理解为“电子填充能级的水平面”：</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-sm font-semibold text-laser-cyan mb-1">N 型</div>
              <p className="text-xs text-lab-muted">费米能级靠近导带 <MathRenderer>{'$E_c$'}</MathRenderer> —— 电子多，水面高</p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-sm font-semibold text-laser-purple mb-1">P 型</div>
              <p className="text-xs text-lab-muted">费米能级靠近价带 <MathRenderer>{'$E_v$'}</MathRenderer> —— 空穴多，水面低</p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-sm font-semibold text-laser-green mb-1">本征</div>
              <p className="text-xs text-lab-muted">费米能级 <MathRenderer>{'$E_F = E_i$'}</MathRenderer>，位于带隙中央附近</p>
            </div>
          </div>
          <p>
            当两种半导体接触时（如 PN 结或异质结），电子会从费米能级高的一侧流向低的一侧，直到两侧费米能级对齐——这是理解 PN 结和异质结能带图的关键。
          </p>
        </div>
      </LearnSection>

      {/* 载流子输运 */}
      <LearnSection id="s-3" icon={<Wind className="w-5 h-5 text-laser-red" />} title="载流子输运">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>半导体中的载流子通过两种机制运动：漂移和扩散。</p>

          <h3 className="font-semibold text-lab-text">漂移运动</h3>
          <p>
            在外加电场 <MathRenderer>{'$\\mathbf{E}$'}</MathRenderer> 作用下，载流子定向运动。漂移速度与电场成正比：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$v_d = \\mu \\cdot E$$'}</MathRenderer>
          </div>
          <p>
            其中 <MathRenderer>{'$\\mu$'}</MathRenderer> 为<span className="font-semibold text-laser-red">迁移率</span>（Mobility），单位 <span className="font-mono text-laser-red">cm²/(V·s)</span>，反映载流子在晶格中运动的难易程度。迁移率受两种散射机制限制：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-orange mt-0.5">●</span>
              <span>
                <span className="font-semibold text-laser-orange">晶格散射</span>
                <span className="text-lab-muted">（高温主导）：</span>
                晶格振动对载流子的碰撞，温度越高越严重
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-0.5">●</span>
              <span>
                <span className="font-semibold text-laser-red">电离杂质散射</span>
                <span className="text-lab-muted">（低温主导）：</span>
                电离的掺杂离子对载流子的偏转，掺杂越浓越严重
              </span>
            </li>
          </ul>
          <p>漂移电流密度：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$J_{drift} = q(n\\mu_n + p\\mu_p)E$$'}</MathRenderer>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">扩散运动</h3>
          <p>
            即使没有电场，载流子也会因为浓度不均匀而从高浓度区域向低浓度区域扩散——就像墨水滴入水中自然散开。扩散电流密度：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$J_{n,diff} = q D_n \\frac{dn}{dx}, \\quad J_{p,diff} = -q D_p \\frac{dp}{dx}$$'}</MathRenderer>
          </div>
          <p>
            其中 <MathRenderer>{'$D_n$'}</MathRenderer>、<MathRenderer>{'$D_p$'}</MathRenderer> 为扩散系数。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">爱因斯坦关系</h3>
          <p>
            漂移和扩散看似是两个独立的过程，实际上它们是同一热运动的两个方面，通过<span className="font-semibold text-laser-red">爱因斯坦关系</span>联系：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$D = \\frac{k_B T}{q} \\mu$$'}</MathRenderer>
          </div>
          <p>
            热电压 <MathRenderer>{'$V_T = k_B T / q \\approx 26\\,\\text{mV}$'}</MathRenderer>（<span className="font-mono text-laser-red">300 K</span>）。这一关系表明：迁移率高的材料，扩散系数也必然大。
          </p>
        </div>
      </LearnSection>

      {/* 总结 */}
      <LearnSection id="s-4" icon={<Sparkles className="w-5 h-5 text-laser-orange" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>半导体物理的核心概念可以归纳为三组关系：</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">能带与掺杂</h4>
                <p className="text-sm">带隙决定材料本征性质，掺杂调节载流子浓度</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">费米能级</h4>
                <p className="text-sm">标志电子填充水平，决定载流子分布和结的特性</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-red/20 text-laser-red flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">漂移与扩散</h4>
                <p className="text-sm">电场驱动漂移，浓度梯度驱动扩散，两者由爱因斯坦关系统一</p>
              </div>
            </div>
          </div>
          <p>
            这些概念是理解 PN 结、光电二极管和激光器的直觉基础。更深入的数学推导（泊松方程、连续性方程等）将在{' '}
            <Link to={ROUTES.LEARN.SEMICONDUCTOR_EQUATIONS} className="text-laser-cyan hover:underline">
              半导体基本方程
            </Link>{' '}
            中展开。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
