import { Layers, GitMerge, Boxes, Zap, Atom, BookOpen } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面章节，按文档 ## 顺序对应（含"总结"）
const pageSections = [
  { id: 's-0', title: '同质结与异质结' },
  { id: 's-1', title: '能带对准类型' },
  { id: 's-2', title: '晶格匹配与应变' },
  { id: 's-3', title: '异质结在光电器件中的作用' },
  { id: 's-4', title: '常见异质结材料体系' },
  { id: 's-5', title: '总结' },
];

// 常见异质结材料体系表
const materialSystems = [
  {
    system: 'GaAs/AlGaAs',
    substrate: 'GaAs',
    match: '完美',
    matchColor: 'text-laser-green',
    bandgap: '1.42–2.0 eV',
    application: '850 nm 激光器、HEMT',
  },
  {
    system: 'InP/InGaAsP',
    substrate: 'InP',
    match: '良好',
    matchColor: 'text-laser-green',
    bandgap: '0.75–1.35 eV',
    application: '1310/1550 nm 激光器、探测器',
  },
  {
    system: 'InP/InGaAs',
    substrate: 'InP',
    match: '良好',
    matchColor: 'text-laser-green',
    bandgap: '0.75 eV (InGaAs)',
    application: '1550 nm 探测器',
  },
  {
    system: 'GaN/InGaN/AlGaN',
    substrate: 'GaN/蓝宝石/SiC',
    match: '较差',
    matchColor: 'text-laser-red',
    bandgap: '0.7–3.4 eV',
    application: '蓝光 LED、紫外探测器',
  },
  {
    system: 'Si/SiGe',
    substrate: 'Si',
    match: '应变',
    matchColor: 'text-laser-orange',
    bandgap: '0.66–1.12 eV',
    application: '近红外探测器、HBT',
  },
];

export default function LearnHeterojunction() {
  const { currentIndex, totalChapters, nextChapter, prevChapter, IconNext, IconPrev } =
    useChapterNavigation(ROUTES.LEARN.HETEROJUNCTION);
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;

  return (
    <LearnLayout
      title="异质结与能带对准"
      subtitle="从同质结到异质结——现代光电器件的结构基础"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      {/* 同质结与异质结 */}
      <LearnSection id="s-0" icon={<Layers className="w-5 h-5 text-laser-cyan" />} title="同质结与异质结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">同质结（Homojunction）</h3>
          <p>
            <span className="font-semibold text-laser-cyan">同质结</span>
            由同种半导体材料的 P 型和 N 型接触形成，最典型的例子是{' '}
            <span className="font-mono text-laser-cyan">Si PN 结</span>。两侧材料带隙相同，结区仅由掺杂类型变化产生，能带差异仅来自费米能级位置的不同。
          </p>

          <h3 className="font-semibold text-lab-text">异质结（Heterojunction）</h3>
          <p>
            <span className="font-semibold text-laser-cyan">异质结</span>
            由两种不同<TermNote term="带隙" />的半导体材料接触形成，例如{' '}
            <span className="font-mono text-laser-cyan">InP/InGaAs</span>、
            <span className="font-mono text-laser-cyan">GaAs/AlGaAs</span>。由于两种材料的带隙、电子亲和能、介电常数、晶格常数等参数不同，异质结呈现出同质结所不具备的电学和光学特性。
          </p>

          <h3 className="font-semibold text-lab-text">为什么需要异质结</h3>
          <p>
            同质结的根本局限在于
            <span className="font-semibold text-laser-red">无法同时优化载流子限制和光场限制</span>
            ：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>载流子注入后可在结区两侧自由扩散，复合区域宽、效率低</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>同质结两侧折射率差小，无法形成有效的光场波导限制</span>
            </li>
          </ul>
          <p>
            异质结通过<span className="font-semibold text-laser-green">“能带工程”</span>
            将载流子和光场同时限制在窄带隙有源区，是现代激光器和高效 LED 的结构基础。
          </p>
        </div>
      </LearnSection>

      {/* 能带对准类型 */}
      <LearnSection id="s-1" icon={<GitMerge className="w-5 h-5 text-laser-green" />} title="能带对准类型">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            当两种半导体接触时，导带和价带的相对位置关系决定异质结的电学和光学特性，称为
            <span className="font-semibold text-laser-green">能带对准（Band Alignment）</span>
            。根据带边相对位置，异质结能带对准分为三种类型。
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-2">
            {/* Type I */}
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">Type I（跨立型 / Straddling）</h4>
              <p className="text-sm mb-3">
                窄带隙材料的导带底低于宽带隙材料的导带底，价带顶高于宽带隙材料的价带顶——即窄带隙完全“嵌套”在宽带隙带隙之内。
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">载流子分布</span>：电子和空穴都被限制在窄带隙材料中</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">复合特性</span>：直接辐射复合效率高</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">典型应用</span>：量子阱激光器、LED 有源区</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">代表体系</span>：GaAs/AlGaAs、InP/InGaAsP</span>
                </li>
              </ul>
            </div>

            {/* Type II */}
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">Type II（错开型 / Staggered）</h4>
              <p className="text-sm mb-3">
                两种材料的导带底和价带顶交错排列——一种材料的导带底较低（电子聚集于此），另一种材料的价带顶较高（空穴聚集于此）。
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">载流子分布</span>：电子和空穴分别限制在不同材料中</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">复合特性</span>：空间间接复合，波函数重叠小，发光效率较低</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">典型应用</span>：长波长探测器、级联激光器</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">代表体系</span>：InAs/GaSb</span>
                </li>
              </ul>
            </div>

            {/* Type III */}
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">Type III（破隙型 / Broken-gap）</h4>
              <p className="text-sm mb-3">
                一种材料的价带顶高于另一种材料的导带底，导带和价带在界面处“破开”重叠。
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-red mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">载流子分布</span>：电子和空穴在界面处能量上重叠，隧穿效应显著</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">复合特性</span>：界面处载流子重叠强，过程由隧穿主导</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">典型应用</span>：隧穿二极管（Esaki 二极管）、红外探测器</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red mt-1">•</span>
                  <span><span className="font-semibold text-lab-text">代表体系</span>：InAs/GaSb（某些组分配置）</span>
                </li>
              </ul>
            </div>
          </div>

          <p>
            Type I 是激光器和 LED 最希望获得的对准类型：电子和空穴被同时限制在同一区域，辐射复合效率最大化。
          </p>
        </div>
      </LearnSection>

      {/* 晶格匹配与应变 */}
      <LearnSection id="s-2" icon={<Boxes className="w-5 h-5 text-laser-purple" />} title="晶格匹配与应变">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">晶格匹配</h3>
          <p>
            外延生长异质结时，两种材料的
            <span className="font-semibold text-laser-purple">晶格常数</span>
            必须接近，否则界面处会产生大量位错，严重恶化器件性能。晶格失配度定义为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{\\Delta a}{a} = \\frac{a_{\\text{外延层}} - a_{\\text{衬底}}}{a_{\\text{衬底}}}$$'}</MathRenderer>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-mono text-laser-cyan">Δa / a &lt; 0.1%</span>：晶格匹配良好，可生长高质量厚层
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                典型匹配体系：<span className="font-mono text-laser-cyan">GaAs/AlGaAs</span>（几乎完美匹配）、
                <span className="font-mono text-laser-cyan">InP/InGaAsP</span>
              </span>
            </li>
          </ul>

          <h3 className="font-semibold text-lab-text pt-2">应变异质结</h3>
          <p>
            小幅晶格失配（约 <span className="font-mono text-laser-cyan">1–3%</span>）可以通过弹性应变 accommodate——外延层发生弹性形变以贴合衬底晶格，这种结构称为
            <span className="font-semibold text-laser-purple">应变异质结</span>
            。
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">压应变（Compressive Strain）</span>：外延层晶格常数 &gt; 衬底，外延层被横向压缩
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">张应变（Tensile Strain）</span>：外延层晶格常数 &lt; 衬底，外延层被横向拉伸
              </span>
            </li>
          </ul>
          <p>应变会改变能带结构，带来重要的工程价值：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-green">降低激光器阈值电流</span>：应变改变有效质量，降低载流子浓度对应的准费米能级分裂
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-green">改变偏振特性</span>：TE/TM 模式增益发生变化
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-green">调节带隙能量</span>：可用于精细波长调谐
              </span>
            </li>
          </ul>

          <h4 className="font-semibold text-lab-text pt-2">临界厚度</h4>
          <p>
            应变外延层存在一个
            <span className="font-semibold text-laser-purple">临界厚度</span>{' '}
            <span className="font-mono text-laser-cyan">h_c</span>：当外延层厚度小于{' '}
            <span className="font-mono text-laser-cyan">h_c</span> 时，应变能以弹性形变方式储存；一旦超过{' '}
            <span className="font-mono text-laser-cyan">h_c</span>，应变将通过产生位错的方式释放，导致晶体质量劣化。临界厚度随晶格失配度增大而迅速减小。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">晶格失配的后果</h3>
          <p>当外延层厚度超过临界厚度，或晶格失配过大时：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                应变释放 → 产生<span className="font-semibold text-laser-red">位错</span>（threading dislocation）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                位错充当<span className="font-semibold text-laser-red">非辐射复合中心</span> → 内部量子效率下降
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>位错形成漏电路径 → 反向漏电流增大</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>器件长期可靠性退化</span>
            </li>
          </ul>
          <p>
            这正是 <span className="font-semibold text-laser-orange">GaN 基激光器</span> 发展困难的历史原因：GaN 与常用蓝宝石衬底晶格失配大（约{' '}
            <span className="font-mono text-laser-orange">16%</span>），早期外延层位错密度高达{' '}
            <span className="font-mono text-laser-orange">10⁸–10¹⁰ cm⁻²</span>。后来通过缓冲层技术与衬底改进，GaN 蓝光 LED 才得以产业化（2014 年诺贝尔物理学奖）。
          </p>
        </div>
      </LearnSection>

      {/* 异质结在光电器件中的作用 */}
      <LearnSection id="s-3" icon={<Zap className="w-5 h-5 text-laser-red" />} title="异质结在光电器件中的作用">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">载流子限制</h3>
          <p>
            异质结最核心的功能是
            <span className="font-semibold text-laser-red">载流子限制</span>
            ：宽带隙材料构成势垒，将电子和空穴限制在窄带隙有源区内。
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                电子势垒：<span className="font-mono text-laser-cyan">ΔE_c</span> 阻挡电子外溢
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                空穴势垒：<span className="font-mono text-laser-cyan">ΔE_v</span> 阻挡空穴外溢
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>结果：载流子在有源区浓度升高 → 辐射复合效率提升 → 激光器阈值电流降低</span>
            </li>
          </ul>
          <p>
            <span className="font-semibold text-laser-red">双异质结（Double Heterostructure, DH）</span>
            结构于 <span className="font-mono text-laser-cyan">1970 年</span> 由 Alferov 和 Kroemer 等提出（2000 年诺贝尔物理学奖），用两个异质结将窄带隙有源层夹在中间，同时限制电子和空穴。DH 结构是现代半导体激光器的标志性结构。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">光场限制</h3>
          <p>
            窄带隙材料折射率通常高于宽带隙材料，因此异质结天然形成
            <span className="font-semibold text-laser-red">介质波导</span>
            ，将光场限制在有源区附近。光场限制因子定义为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Gamma = \\frac{\\text{有源区内的光场能量}}{\\text{总光场能量}}$$'}</MathRenderer>
          </div>
          <p>
            <span className="font-mono text-laser-cyan">Γ</span> 越大，有源区对光场的增益利用越充分。典型半导体激光器{' '}
            <span className="font-mono text-laser-cyan">Γ ≈ 0.1–0.3</span>。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">异质结能带图绘制要点</h3>
          <p>绘制异质结能带图时遵循以下规则：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">真空能级连续</span>：界面处真空能级{' '}
                <span className="font-mono text-laser-cyan">E_vac</span> 不发生突变
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">费米能级统一</span>：平衡状态下整个结构费米能级{' '}
                <span className="font-mono text-laser-cyan">E_F</span> 拉平
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">电子亲和能</span>{' '}
                <span className="font-mono text-laser-cyan">χ</span>：真空能级与导带底之差，{' '}
                <span className="font-mono text-laser-cyan">χ = E_vac − E_c</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">功函数</span>{' '}
                <span className="font-mono text-laser-cyan">Φ</span>：真空能级与费米能级之差，{' '}
                <span className="font-mono text-laser-cyan">Φ = E_vac − E_F</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-lab-text">Anderson 规则</span>：用电子亲和能差确定导带偏移{' '}
                <span className="font-mono text-laser-cyan">ΔE_c</span>
              </span>
            </li>
          </ul>
          <p>
            导带偏移 <span className="font-mono text-laser-cyan">ΔE_c</span> 与价带偏移{' '}
            <span className="font-mono text-laser-cyan">ΔE_v</span> 满足：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta E_c = \\chi_1 - \\chi_2$$'}</MathRenderer>
          </div>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta E_v = E_{g2} - E_{g1} - \\Delta E_c$$'}</MathRenderer>
          </div>
          <p>
            带隙差在导带和价带间的分配比例（<span className="font-mono text-laser-cyan">ΔE_c : ΔE_v</span>）是异质结设计的关键参数，直接影响载流子限制的对称性。
          </p>
        </div>
      </LearnSection>

      {/* 常见异质结材料体系 */}
      <LearnSection id="s-4" icon={<Atom className="w-5 h-5 text-laser-orange" />} title="常见异质结材料体系">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>下表汇总了光电器件中常见的异质结材料体系、衬底、晶格匹配状况、带隙范围与典型应用。</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-lab-border/40 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-lab-bg/70 text-lab-text">
                  <th className="text-left px-3 py-2 font-semibold">材料体系</th>
                  <th className="text-left px-3 py-2 font-semibold">衬底</th>
                  <th className="text-left px-3 py-2 font-semibold">晶格匹配</th>
                  <th className="text-left px-3 py-2 font-semibold">带隙范围</th>
                  <th className="text-left px-3 py-2 font-semibold">典型应用</th>
                </tr>
              </thead>
              <tbody>
                {materialSystems.map((row) => (
                  <tr key={row.system} className="border-t border-lab-border/30">
                    <td className="px-3 py-2 font-mono text-laser-cyan">{row.system}</td>
                    <td className="px-3 py-2 font-mono text-lab-text">{row.substrate}</td>
                    <td className={`px-3 py-2 font-semibold ${row.matchColor}`}>{row.match}</td>
                    <td className="px-3 py-2 font-mono text-laser-purple">{row.bandgap}</td>
                    <td className="px-3 py-2 text-lab-muted">{row.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </LearnSection>

      {/* 总结 */}
      <LearnSection id="s-5" icon={<BookOpen className="w-5 h-5 text-laser-cyan" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">异质结通过能带工程</span>
                实现同质结无法实现的功能：载流子限制 + 光场限制双重作用
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-green">能带对准类型</span>
                （Type I / II / III）决定异质结的电学和光学特性，Type I 是激光器和 LED 的首选
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-purple">晶格匹配</span>
                是异质结外延生长的关键约束，应变可被工程化利用但必须控制在临界厚度之内
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red mt-1">•</span>
              <span>
                <span className="font-semibold text-laser-red">双异质结（DH）</span>
                结构是现代激光器和高效 LED 的基础结构，奠定了光电子产业的技术根基
              </span>
            </li>
          </ul>
          <p>
            理解异质结与能带对准，是进一步学习量子阱激光器、分布反馈激光器（DFB）、电吸收调制器等具体器件的必要前提。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
