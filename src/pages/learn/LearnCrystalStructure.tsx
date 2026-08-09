import { Atom, Layers, Activity, FlaskConical, Sparkles, BookOpen } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '晶体结构基础' },
  { id: 's-1', title: '晶体缺陷' },
  { id: 's-2', title: '缺陷对光电器件的影响' },
  { id: 's-3', title: '晶体生长与质量控制' },
  { id: 's-4', title: '总结' },
];

export default function LearnCrystalStructure() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } =
    useChapterNavigation(ROUTES.LEARN.CRYSTAL_STRUCTURE);
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;

  return (
    <LearnLayout
      title="晶体结构与缺陷"
      subtitle="晶格、晶面指数与晶体缺陷对光电器件的影响"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      {/* ===== s-0 晶体结构基础 ===== */}
      <LearnSection id="s-0" icon={<Atom className="w-5 h-5 text-laser-cyan" />} title="晶体结构基础">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            半导体材料的宏观电学、光学性质，归根结底都源于其内部原子的周期性排列方式——
            <span className="font-semibold text-laser-cyan">晶体结构</span>。理解晶体结构，是理解材料能带、
            载流子行为和器件可靠性的物理起点。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">晶格、原胞与晶胞</h3>
          <p>
            <span className="font-semibold text-laser-cyan">晶格（Lattice）</span>
            是晶体中原子（或离子）在空间中呈周期性规则排列所形成的网格。为描述这种周期性，
            我们用一个抽象的数学框架——<span className="font-semibold text-laser-green">布拉维格子（Bravais Lattice）</span>
            ——来表示：在每个格点处按相同方式放置原子（或原子基元），就得到实际晶体。
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">原胞（Primitive Cell）</span>
                ：晶格中最小的重复单元，每个原胞只含一个格点。平移原胞向量可以铺满整个晶格。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">晶胞（Conventional Unit Cell）</span>
                ：为了直观体现晶体对称性而选取的较大单元，可能包含多个格点。例如面心立方（FCC）晶胞含 4 个格点，
                但其最小原胞只含 1 个。
              </span>
            </li>
          </ul>
          <div className="border-l-2 border-laser-cyan/50 bg-laser-cyan/5 px-4 py-3 rounded-r-lg text-sm">
            <span className="text-laser-cyan font-medium">直觉：</span>
            原胞像"最小包装"，晶胞像"标准展示盒"。工程上常以晶胞为参考，因为它直观反映对称性。
          </div>

          <h3 className="font-semibold text-lab-text pt-2">常见半导体晶体结构</h3>
          <p>光电半导体主要采用三种晶体结构：</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">结构类型</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">子晶格排列</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">典型材料</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">特点</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-cyan">金刚石结构</span></td>
                  <td className="py-2.5 px-3">两个 FCC 子晶格沿体对角线偏移 1/4</td>
                  <td className="py-2.5 px-3 font-mono text-laser-cyan">Si、Ge</td>
                  <td className="py-2.5 px-3">同种原子（共价键），对称性高</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-green">闪锌矿结构</span></td>
                  <td className="py-2.5 px-3">两个不同 FCC 子晶格沿体对角线偏移 1/4</td>
                  <td className="py-2.5 px-3 font-mono text-laser-green">GaAs、InP、InGaAs</td>
                  <td className="py-2.5 px-3">不同种原子（离子-共价混合键），具极性</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-purple">纤锌矿结构</span></td>
                  <td className="py-2.5 px-3">两个 HCP 子晶格</td>
                  <td className="py-2.5 px-3 font-mono text-laser-purple">GaN、SiC、ZnO</td>
                  <td className="py-2.5 px-3">六方对称，存在自发极化和压电极化</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <span className="font-semibold text-laser-cyan">金刚石结构</span>与
            <span className="font-semibold text-laser-green">闪锌矿结构</span>
            在几何上几乎相同（同为四面体配位），区别仅在于两个子晶格上的原子是否相同：相同则为金刚石结构（如 Si），
            不同则为闪锌矿结构（如 GaAs）。这一"是否相同"看似微小，却带来了 GaAs 的直接带隙与极性光学性质，
            而 Si 是间接带隙——这是 Si 难以做激光器的根本原因之一。
          </p>
          <p>
            <span className="font-semibold text-laser-purple">纤锌矿结构</span>
            沿 c 轴缺乏中心对称，使得 GaN 等材料具有强自发极化和压电效应，
            这正是 GaN 基 LED 和高电子迁移率晶体管（HEMT）的关键物理基础。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">晶向与晶面指数（Miller 指数）</h3>
          <p>
            为了指认晶格中的方向和平面，工程上使用
            <span className="font-semibold text-laser-cyan">Miller 指数</span>。它的核心思想是：用一个三元整数
            <MathRenderer>{'$(h\\,k\\,l)$'}</MathRenderer> 标记一族平行等距的晶面。
          </p>
          <h4 className="font-semibold text-lab-text mb-2 text-sm">简单求法（立方晶系）</h4>
          <ol className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
              <span>找到晶面在三个晶轴上的截距（以晶格常数为单位）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
              <span>取倒数</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
              <span>化为最小整数比，加圆括号 <MathRenderer>{'$(h\\,k\\,l)$'}</MathRenderer></span>
            </li>
          </ol>
          <p>
            例如对边长为 <MathRenderer>{'$a$'}</MathRenderer> 的立方晶胞：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">(100) 面</span>：平行于 y-z 平面，截 x 轴于
                <MathRenderer>{'$a$'}</MathRenderer>，截距 <MathRenderer>{'$(1,\\infty,\\infty)$'}</MathRenderer>，
                倒数 <MathRenderer>{'$(1,0,0)$'}</MathRenderer>。即晶胞的一个面。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">(110) 面</span>：截 x、y 轴于
                <MathRenderer>{'$a$'}</MathRenderer>，不截 z 轴，截距
                <MathRenderer>{'$(1,1,\\infty)$'}</MathRenderer>，倒数
                <MathRenderer>{'$(1,1,0)$'}</MathRenderer>。即过对角线切开的斜面。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-purple">(111) 面</span>：截三个轴于
                <MathRenderer>{'$a$'}</MathRenderer>，截距 <MathRenderer>{'$(1,1,1)$'}</MathRenderer>，
                倒数 <MathRenderer>{'$(1,1,1)$'}</MathRenderer>。即垂直于体对角线的面，
                是金刚石/闪锌矿结构的自然解理面。
              </span>
            </li>
          </ul>
          <p>
            晶向用方括号 <MathRenderer>{'$[h\\,k\\,l]$'}</MathRenderer> 表示，与同名晶面族垂直（立方晶系中）。
            一组等价晶面用花括号 <MathRenderer>{'$\\{h\\,k\\,l\\}$'}</MathRenderer> 表示，
            等价晶向用尖括号 <MathRenderer>{'$\\langle h\\,k\\,l\\rangle$'}</MathRenderer> 表示。
          </p>
          <div className="border-l-2 border-laser-orange/50 bg-laser-orange/5 px-4 py-3 rounded-r-lg text-sm">
            <span className="text-laser-orange font-medium">工程意义：</span>
            (100) Si 衬底是 CMOS 工业的标准切向；(111) 面原子密度最高、生长慢但解理容易；
            不同晶面的化学腐蚀速率、氧化速率、外延生长速率都不同——这就是"晶向工程"。
          </div>

          <h3 className="font-semibold text-lab-text pt-2">晶格常数与晶格匹配</h3>
          <p>
            <span className="font-semibold text-laser-cyan">晶格常数（Lattice Constant）</span>
            <MathRenderer>{'$a$'}</MathRenderer> 是晶胞边长，是描述晶体几何尺寸的基本参数。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">材料</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">晶格常数 a (Å)</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">结构</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold"><TermNote term="带隙" /> (eV)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3 font-mono text-laser-cyan">Si</td>
                  <td className="py-2.5 px-3 font-mono">5.431</td>
                  <td className="py-2.5 px-3">金刚石</td>
                  <td className="py-2.5 px-3">1.12（间接）</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3 font-mono text-laser-cyan">Ge</td>
                  <td className="py-2.5 px-3 font-mono">5.658</td>
                  <td className="py-2.5 px-3">金刚石</td>
                  <td className="py-2.5 px-3">0.66（间接）</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3 font-mono text-laser-green">GaAs</td>
                  <td className="py-2.5 px-3 font-mono">5.653</td>
                  <td className="py-2.5 px-3">闪锌矿</td>
                  <td className="py-2.5 px-3">1.42（直接）</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3 font-mono text-laser-green">InP</td>
                  <td className="py-2.5 px-3 font-mono">5.869</td>
                  <td className="py-2.5 px-3">闪锌矿</td>
                  <td className="py-2.5 px-3">1.35（直接）</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-laser-purple">GaN</td>
                  <td className="py-2.5 px-3 font-mono">a=3.189, c=5.185</td>
                  <td className="py-2.5 px-3">纤锌矿</td>
                  <td className="py-2.5 px-3">3.39（直接）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <span className="font-semibold text-laser-cyan">晶格匹配（Lattice Matching）</span>
            指外延层与衬底的晶格常数相近，可用晶格失配度 <MathRenderer>{'$f$'}</MathRenderer> 量化：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$f = \\frac{a_{layer} - a_{substrate}}{a_{substrate}}$$'}</MathRenderer>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <MathRenderer>{'$|f| \\lesssim 0.1\\%$'}</MathRenderer>：晶格匹配良好，外延层几乎无应变，缺陷少
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-orange font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <MathRenderer>{'$|f| \\sim 1\\%$'}</MathRenderer>：外延层产生应变，超过临界厚度后会通过形成
                <span className="font-semibold text-laser-red">位错</span>释放应变
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <MathRenderer>{'$|f| \\gg 1\\%$'}</MathRenderer>：难以外延，需采用缓冲层或图形化衬底
              </span>
            </li>
          </ul>
          <p>
            经典案例：InGaAsP/InP 体系（<MathRenderer>{'$f \\approx 0$'}</MathRenderer>）可做出高质量 1310/1550 nm 激光器；
            而 GaN 蓝光 LED 长期受困于 GaN 与蓝宝石衬底之间 ~16% 的巨大晶格失配，
            直到 Nakamura 等人用低温缓冲层技术才取得突破。
          </p>
        </div>
      </LearnSection>

      {/* ===== s-1 晶体缺陷 ===== */}
      <LearnSection id="s-1" icon={<Layers className="w-5 h-5 text-laser-green" />} title="晶体缺陷">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="font-semibold text-laser-green">晶体缺陷（Crystal Defects）</span>
            指晶体中偏离理想周期性排列的局部区域。按维度可分为四类：
          </p>

          <h3 className="font-semibold text-lab-text pt-2">点缺陷（0 维）</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">类型</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">定义</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">影响</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-cyan">空位（Vacancy）</span></td>
                  <td className="py-2.5 px-3">原子从晶格位置脱出留下的空位</td>
                  <td className="py-2.5 px-3">加速杂质扩散，作为复合中心</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-green">间隙原子（Interstitial）</span></td>
                  <td className="py-2.5 px-3">原子挤入晶格间隙位置</td>
                  <td className="py-2.5 px-3">引入局部应力，形成深能级</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-purple">替位杂质（Substitutional）</span></td>
                  <td className="py-2.5 px-3">外来原子占据正常格点</td>
                  <td className="py-2.5 px-3">掺杂（B、P、As）即为受控替位杂质</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            点缺陷在热平衡下不可避免——其浓度由形成能 <MathRenderer>{'$E_f$'}</MathRenderer> 决定：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$N_{defect} \\propto \\exp\\left(-\\frac{E_f}{k_B T}\\right)$$'}</MathRenderer>
          </div>
          <p>温度越高，点缺陷浓度越大。这是半导体工艺中"高温过程越少越好"的物理原因。</p>

          <h3 className="font-semibold text-lab-text pt-2">线缺陷（1 维）：位错</h3>
          <p>
            <span className="font-semibold text-laser-green">位错（Dislocation）</span>
            是晶体中沿一条线发生的原子排列错乱，是半导体中最具破坏性的缺陷之一。
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">刃位错（Edge Dislocation）</span>
                ：可想象为在晶格中"多插入"半层原子面，其边缘就是位错线。位错线方向与滑移方向垂直。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">螺位错（Screw Dislocation）</span>
                ：晶格沿一条轴线螺旋错开一个原子间距，位错线方向与滑移方向平行。
              </span>
            </li>
          </ul>
          <div className="border-l-2 border-laser-green/50 bg-laser-green/5 px-4 py-3 rounded-r-lg text-sm">
            <span className="text-laser-green font-medium">直觉：</span>
            刃位错像"地毯里多压了一条褶"，螺位错像"拧过的毛巾"。两者都使晶格局部畸变，并成为杂质和应力的富集区。
          </div>
          <p>
            位错会沿滑移面滑动和攀移，在应力下还会
            <span className="font-semibold text-laser-red">增殖</span>
            ——这是激光器快速退化的微观机制（见下文）。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">面缺陷（2 维）</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">层错（Stacking Fault）</span>
                ：原子堆垛顺序发生错乱。例如 FCC 正常顺序 ABCABC…，若少了一层变为 ABCBC…，即为层错。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">晶界（Grain Boundary）</span>
                ：不同取向晶粒之间的界面。多晶材料中普遍存在。在单晶半导体中应尽量避免，
                但多晶硅（如太阳能电池、栅极）中是有意为之。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-purple">孪晶界（Twin Boundary）</span>
                ：晶格关于某面镜面对称，是层错的一种特殊形式。
              </span>
            </li>
          </ul>

          <h3 className="font-semibold text-lab-text pt-2">体缺陷（3 维）</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">沉淀物（Precipitate）</span>
                ：杂质原子聚集形成第二相颗粒，尺寸从纳米到微米不等。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">空洞（Void）</span>：晶体内部的小空腔。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple font-mono font-semibold flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-purple">夹杂（Inclusion）</span>：异相材料包裹在晶体中。
              </span>
            </li>
          </ul>
          <p>体缺陷常成为位错和裂纹的萌生源，并引入局部应力场。</p>
        </div>
      </LearnSection>

      {/* ===== s-2 缺陷对光电器件的影响 ===== */}
      <LearnSection id="s-2" icon={<Activity className="w-5 h-5 text-laser-purple" />} title="缺陷对光电器件的影响">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            缺陷不是"摆设"——它们在能带中引入额外能级，改变载流子的产生、复合与输运，直接决定器件性能与寿命。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">缺陷作为复合中心：SRH 复合</h3>
          <p>
            缺陷在带隙中引入<span className="font-semibold text-laser-purple">深能级</span>
            ，可作为电子-空穴复合的"跳板"。这种通过缺陷中介的复合称为
            <span className="font-semibold text-laser-purple">Shockley-Read-Hall（SRH）复合</span>：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$U_{SRH} = \\frac{np - n_i^2}{\\tau_p(n + n_1) + \\tau_n(p + p_1)}$$'}</MathRenderer>
          </div>
          <p>在小注入且缺陷为单一深能级情形下，载流子寿命近似为：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\tau_{SRH} = \\frac{1}{\\sigma \\cdot v_{th} \\cdot N_t}$$'}</MathRenderer>
          </div>
          <p>
            其中 <MathRenderer>{'$\\sigma$'}</MathRenderer> 为缺陷对载流子的俘获截面，
            <MathRenderer>{'$v_{th}$'}</MathRenderer> 为载流子热运动速度，
            <MathRenderer>{'$N_t$'}</MathRenderer> 为缺陷浓度。
          </p>
          <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
            <h4 className="font-semibold text-laser-purple text-sm mb-1">关键结论</h4>
            <p className="text-sm text-lab-muted">
              缺陷浓度越高 → 载流子寿命越短 → 少子扩散长度越小 → 暗电流越大、量子效率越低。
            </p>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">位错与非辐射复合</h3>
          <p>
            位错核心是一串连续的悬挂键和深能级，是极强的
            <span className="font-semibold text-laser-purple">非辐射复合中心</span>。
            在发光器件（LED、激光器）中，电子-空穴对在位错处复合时以热的形式释放能量，而非发光——
            直接体现为发光效率下降。
          </p>
          <p>
            实验规律：位错密度 <MathRenderer>{'$N_d$'}</MathRenderer> 与 LED 外量子效率
            <MathRenderer>{'$\\eta_{ext}$'}</MathRenderer> 近似满足：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\eta_{ext} \\propto \\frac{1}{1 + \\alpha \\cdot N_d}$$'}</MathRenderer>
          </div>
          <p>
            这正是 GaN 蓝光 LED 在位错密度高达
            <MathRenderer>{'$10^8\\,\\text{cm}^{-2}$'}</MathRenderer> 时仍能高效发光一度令人困惑的原因——
            后来发现 InGaN 量子阱中载流子被局域化在富 In 区域，避免了扩散到位错处复合。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">缺陷影响迁移率</h3>
          <p>
            电离杂质、位错、晶界都作为<span className="font-semibold text-laser-purple">散射中心</span>
            ，降低载流子迁移率：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{1}{\\mu} = \\frac{1}{\\mu_{lattice}} + \\frac{1}{\\mu_{impurity}} + \\frac{1}{\\mu_{dislocation}} + \\cdots$$'}</MathRenderer>
          </div>
          <p className="text-sm text-lab-muted">（Matthiessen 定则近似）</p>
          <p>
            迁移率下降 → 器件响应速度变慢、串联电阻增大 → 激光器阈值电流升高、调制带宽下降。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">对激光器寿命的影响</h3>
          <p>
            激光器在长期工作中，有源区的
            <span className="font-semibold text-laser-purple">位错会增殖</span>
            ——非辐射复合产生的热使局部位错滑动并攀移，形成位错网络（称为
            <span className="font-semibold text-laser-red">DLD，Dark Line Defect</span>，暗线缺陷）。
            一旦 DLD 形成，发光效率急剧下降，激光器在数小时到数百小时内"猝死"。
            这就是为什么激光器制造对晶体质量和外延工艺要求极高——
            <span className="font-semibold text-laser-purple">初始位错密度必须极低</span>才能保证长寿命。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">对探测器暗电流的影响</h3>
          <p>光电探测器的暗电流主要由耗尽区内的产生-复合电流贡献：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$J_{GR} \\propto \\frac{n_i \\cdot W}{\\tau_{SRH}}$$'}</MathRenderer>
          </div>
          <p>
            其中 <MathRenderer>{'$W$'}</MathRenderer> 为耗尽区宽度，
            <MathRenderer>{'$\\tau_{SRH}$'}</MathRenderer> 由缺陷浓度决定。
            缺陷越多 → <MathRenderer>{'$\\tau_{SRH}$'}</MathRenderer> 越小 →
            <MathRenderer>{'$J_{GR}$'}</MathRenderer> 越大 → 信噪比下降。
            对长距离相干通信的探测器，暗电流是决定灵敏度的核心指标，
            因此对 InGaAs 等材料的晶体质量要求极为苛刻。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">缺陷影响一览</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">缺陷类型</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">主要影响</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">受影响的器件性能</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-cyan">点缺陷（深能级）</span></td>
                  <td className="py-2.5 px-3">SRH 复合中心</td>
                  <td className="py-2.5 px-3">载流子寿命↓、暗电流↑</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-green">位错</span></td>
                  <td className="py-2.5 px-3">非辐射复合、散射</td>
                  <td className="py-2.5 px-3">发光效率↓、迁移率↓、寿命↓</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-purple">层错/晶界</span></td>
                  <td className="py-2.5 px-3">复合中心、漏电通道</td>
                  <td className="py-2.5 px-3">击穿电压↓、漏电↑</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-red">沉淀物</span></td>
                  <td className="py-2.5 px-3">应力源、位错源</td>
                  <td className="py-2.5 px-3">器件不均匀、可靠性↓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </LearnSection>

      {/* ===== s-3 晶体生长与质量控制 ===== */}
      <LearnSection id="s-3" icon={<FlaskConical className="w-5 h-5 text-laser-red" />} title="晶体生长与质量控制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            控制缺陷的核心在于<span className="font-semibold text-laser-red">晶体生长工艺</span>。
            不同的生长方法决定了晶体的纯度、均匀性和位错密度。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">体单晶生长</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">方法</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">原理</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">优点</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">局限</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-cyan">直拉法（CZ, Czochralski）</span></td>
                  <td className="py-2.5 px-3">籽晶从熔体中缓慢提拉旋转</td>
                  <td className="py-2.5 px-3">大尺寸（Si 可达 12 英寸）、工艺成熟</td>
                  <td className="py-2.5 px-3">含氧杂质（来自石英坩埚）</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-green">浮区法（FZ, Float-Zone）</span></td>
                  <td className="py-2.5 px-3">熔区在多晶棒上浮移，不接触坩埚</td>
                  <td className="py-2.5 px-3">纯度极高、低氧低碳</td>
                  <td className="py-2.5 px-3">尺寸受限、成本高</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-l-2 border-laser-red/50 bg-laser-red/5 px-4 py-3 rounded-r-lg text-sm">
            <span className="text-laser-red font-medium">直觉：</span>
            CZ 像"从锅里拉面条"，锅会污染面条；FZ 像"用悬浮的火苗融一段走一段"，不接触任何容器，所以更纯。
          </div>
          <p>CZ-Si 是集成电路和功率器件的主流；FZ-Si 用于高压整流器、探测器等对纯度要求极高的场合。</p>

          <h3 className="font-semibold text-lab-text pt-2">外延生长</h3>
          <p>
            <span className="font-semibold text-laser-red">外延（Epitaxy）</span>
            是在单晶衬底上按其晶格方向生长单晶薄膜，是制造激光器、LED、HEMT 的核心工艺：
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">方法</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">原理</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">特点</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">典型应用</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-cyan">液相外延（LPE）</span></td>
                  <td className="py-2.5 px-3">在饱和溶液中过饱和析出</td>
                  <td className="py-2.5 px-3">设备简单、成本低</td>
                  <td className="py-2.5 px-3">早期 LED、便宜的红外探测器</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-green">分子束外延（MBE）</span></td>
                  <td className="py-2.5 px-3">在超高真空中蒸发原子束淀积</td>
                  <td className="py-2.5 px-3">原子级精度、可生长超晶格</td>
                  <td className="py-2.5 px-3">量子级联激光器、HEMT、研究开发</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-purple">金属有机化学气相沉积（MOCVD）</span></td>
                  <td className="py-2.5 px-3">用有机金属气相源热分解淀积</td>
                  <td className="py-2.5 px-3">大面积均匀、量产能力强</td>
                  <td className="py-2.5 px-3">GaN LED、激光器量产首选</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-l-2 border-laser-orange/50 bg-laser-orange/5 px-4 py-3 rounded-r-lg text-sm">
            <span className="text-laser-orange font-medium">MBE vs MOCVD：</span>
            MBE 像"用喷枪一笔一画描绘"，精度高但慢，适合研究与极限结构；MOCVD 像"气相喷涂批量生产"，适合产业化。
            GaN 蓝光 LED 量产的胜利，本质上是 MOCVD 工艺的胜利。
          </div>

          <h3 className="font-semibold text-lab-text pt-2">位错密度：晶圆质量的核心指标</h3>
          <p>
            <span className="font-semibold text-laser-red">位错密度（Etch Pit Density, EPD）</span>
            通过化学腐蚀显现位错坑并计数，是衡量晶圆质量的标准指标：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\text{EPD} = \\frac{\\text{腐蚀坑数}}{\\text{面积}} \\quad [\\text{cm}^{-2}]$$'}</MathRenderer>
          </div>
          <p>典型晶圆的位错密度量级：</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-lab-bg/50 rounded-lg">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">材料</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">典型 EPD (cm⁻²)</th>
                  <th className="text-left py-2.5 px-3 text-lab-text font-semibold">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-cyan">Si</span></td>
                  <td className="py-2.5 px-3 font-mono text-laser-cyan">&lt; 100</td>
                  <td className="py-2.5 px-3">极近完美单晶，集成电路基石</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-green">GaAs</span></td>
                  <td className="py-2.5 px-3 font-mono text-laser-green">~ 10⁴</td>
                  <td className="py-2.5 px-3">良好，足够用于多数光电器件</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-purple">InP</span></td>
                  <td className="py-2.5 px-3 font-mono text-laser-purple">10⁴ ~ 10⁵</td>
                  <td className="py-2.5 px-3">用于 1550 nm 激光器和探测器</td>
                </tr>
                <tr className="border-b border-lab-border/30">
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-orange">GaN（蓝宝石衬底）</span></td>
                  <td className="py-2.5 px-3 font-mono text-laser-orange">~ 10⁸</td>
                  <td className="py-2.5 px-3">仍能做高亮度 LED，得益于载流子局域化</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3"><span className="font-semibold text-laser-red">GaN（GaN 自支撑衬底）</span></td>
                  <td className="py-2.5 px-3 font-mono text-laser-red">10⁴ ~ 10⁶</td>
                  <td className="py-2.5 px-3">用于激光器，对位错极敏感</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            位错密度的巨大差异，折射出不同材料体系的工艺成熟度——Si 已接近热力学极限，
            GaN 自支撑衬底仍属高端稀缺材料。
          </p>
        </div>
      </LearnSection>

      {/* ===== s-4 总结 ===== */}
      <LearnSection id="s-4" icon={<Sparkles className="w-5 h-5 text-laser-orange" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">晶体结构决定本征物理性质</h4>
                <p className="text-sm">
                  金刚石、闪锌矿、纤锌矿三种结构带来不同的对称性、极性和能带特征，
                  从根本上决定材料是直接还是间接带隙、能否做激光器。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">缺陷是性能与可靠性的关键变量</h4>
                <p className="text-sm">
                  点缺陷作为复合中心降低载流子寿命，位错作为非辐射复合通道降低发光效率并诱发激光器快速退化。
                  控制缺陷浓度是光电器件工程的核心任务。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">晶体质量与外延工艺是产业核心技术壁垒</h4>
                <p className="text-sm">
                  从 CZ/FZ 体单晶到 MBE/MOCVD 外延，再到 GaN 自支撑衬底的突破，
                  每一次工艺进步都直接推动光电器件性能与成本的新一轮跃迁。
                </p>
              </div>
            </div>
          </div>

          <div className="border-l-2 border-laser-orange/50 bg-laser-orange/5 px-4 py-3 rounded-r-lg text-sm">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-laser-orange flex-shrink-0 mt-0.5" />
              <span>
                <span className="text-laser-orange font-medium">进一步阅读：</span>
                载流子的复合与寿命细节参见
                <span className="text-laser-cyan font-medium">半导体基础</span>；
                PN 结与暗电流的产生-复合机制参见
                <span className="text-laser-cyan font-medium">PN 结基础</span>；
                半导体基本方程参见
                <span className="text-laser-cyan font-medium">半导体基本方程</span>。
              </span>
            </div>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
