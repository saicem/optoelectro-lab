import { Atom, Zap, Layers, Lightbulb, Cpu, Beaker, Sparkles, Gauge } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '半导体材料基础' },
  { id: 's-1', title: '光电效应原理' },
  { id: 's-2', title: '常见光电材料' },
  { id: 's-3', title: '电光材料' },
  { id: 's-4', title: '非线性光学材料' },
  { id: 's-5', title: '材料特性对比与应用' },
];

export default function LearnOptoelectronicMaterials() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(ROUTES.LEARN.OPTOELECTRONIC_MATERIALS);
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="光电材料"
      subtitle="光通信系统中的核心材料：半导体、电光晶体与非线性光学材料"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 2 · 光源与传输篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Atom className="w-5 h-5 text-laser-cyan" />} title="半导体材料基础">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">半导体材料</span>
            是光通信系统的基石。从激光器到光电探测器，从调制器到光放大器，
            几乎所有核心器件都建立在半导体物理的基础之上。
          </p>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">能带结构</h4>
            <p className="text-sm mb-3">
              半导体材料的电子在<span className="text-laser-green font-semibold">价带（Valence Band）</span>
              和<span className="text-laser-cyan font-semibold">导带（Conduction Band）</span>之间运动，
              中间被一个能量间隙（<TermNote term="带隙" />，Bandgap）隔开。
            </p>
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="text-center">
                <div className="w-20 h-8 bg-laser-green/20 border border-laser-green/40 rounded-t-lg flex items-center justify-center text-xs text-laser-green font-medium">
                  导带
                </div>
                <div className="text-xs text-lab-muted mt-1">E_c</div>
              </div>
              <div className="text-center">
                <div className="w-4 text-laser-purple text-xl">Δ</div>
                <div className="text-xs text-lab-muted">E_g</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-8 bg-laser-cyan/20 border border-laser-cyan/40 rounded-b-lg flex items-center justify-center text-xs text-laser-cyan font-medium">
                  价带
                </div>
                <div className="text-xs text-lab-muted mt-1">E_v</div>
              </div>
            </div>
            <div className="bg-lab-surface/50 p-3 rounded-lg text-xs">
              <MathRenderer>{'$$E_g = E_c - E_v$$'}</MathRenderer>
              <p className="text-lab-muted mt-1">带隙能量决定材料的导电性和光学特性</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-cyan mb-2 text-sm">本征半导体</h4>
              <p className="text-sm mb-2">
                纯半导体，价带电子热激发到导带后产生电子-空穴对。
                载流子浓度由材料本身决定。
              </p>
              <div className="bg-lab-surface/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$n_i = \\sqrt{N_c N_v} \\exp\\left(-\\frac{E_g}{2k_B T}\\right)$$'}</MathRenderer>
              </div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2 text-sm">掺杂半导体</h4>
              <p className="text-sm mb-2">
                <span className="text-laser-green">N 型</span>：掺杂磷、砷等五价元素，提供自由电子。
                <span className="text-laser-cyan"> P 型</span>：掺杂硼、镓等三价元素，提供空穴。
              </p>
              <div className="flex gap-2 text-xs">
                <div className="bg-lab-surface/50 px-2 py-1 rounded">N: 多子为电子</div>
                <div className="bg-lab-surface/50 px-2 py-1 rounded">P: 多子为空穴</div>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">载流子输运</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-lab-text font-medium mb-1">漂移运动</p>
                <p className="text-xs text-lab-muted">
                  在外电场作用下，载流子定向运动。
                  漂移速度 v_d = μE，其中 μ 为迁移率。
                </p>
                <div className="bg-lab-surface/50 px-3 py-1.5 rounded-lg mt-1 text-xs font-mono">
                  v_d = μ · E
                </div>
              </div>
              <div>
                <p className="text-lab-text font-medium mb-1">扩散运动</p>
                <p className="text-xs text-lab-muted">
                  浓度梯度导致载流子从高浓度向低浓度扩散。
                  扩散电流 J ∝ dn/dx。
                </p>
                <div className="bg-lab-surface/50 px-3 py-1.5 rounded-lg mt-1 text-xs font-mono">
                  J = q · D · dn/dx
                </div>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Zap className="w-5 h-5 text-laser-green" />} title="光电效应原理">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">光电效应（Photoelectric Effect）</span>
            是光子与物质相互作用的基本现象，也是光探测器工作的核心原理。
            当光子能量大于材料带隙时，可以将电子从价带激发到导带，产生光生载流子。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2 text-sm">内光电效应</h4>
              <p className="text-xs mb-2">
                光子被半导体材料吸收，在材料内部产生电子-空穴对。
                这些载流子可以在材料内部自由移动，产生光电流。
              </p>
              <div className="bg-lab-bg/50 p-2 rounded-lg text-xs">
                <div className="font-medium text-lab-text mb-1">应用</div>
                <ul className="text-lab-muted space-y-0.5">
                  <li>• 光电二极管</li>
                  <li>• 光伏电池</li>
                  <li>• 光电导探测器</li>
                </ul>
              </div>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2 text-sm">外光电效应</h4>
              <p className="text-xs mb-2">
                光子能量足够大时，电子逸出材料表面成为自由电子。
                需要光子能量大于逸出功。
              </p>
              <div className="bg-lab-bg/50 p-2 rounded-lg text-xs">
                <div className="font-medium text-lab-text mb-1">应用</div>
                <ul className="text-lab-muted space-y-0.5">
                  <li>• 光电倍增管 (PMT)</li>
                  <li>• 光电阴极</li>
                  <li>• 真空光电器件</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">光吸收与量子效率</h4>
            <p className="text-sm mb-3">
              材料对光的吸收能力用<span className="text-laser-cyan font-semibold">吸收系数 α</span>描述。
              吸收系数越大，光在材料中衰减越快。
            </p>
            <div className="bg-lab-surface/50 px-4 py-2 rounded-lg text-xs font-mono">
              <MathRenderer>{'$$I(x) = I_0 \\cdot e^{-\\alpha x}$$'}</MathRenderer>
            </div>
            <p className="text-xs text-lab-muted mt-2">
              吸收系数 α 与波长密切相关——这是选择光电器件材料的重要依据。
            </p>

            <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-3 text-xs">
              <span className="text-lab-text font-medium">量子效率 (QE)：</span>
              <MathRenderer>{'$QE = \\frac{\\text{产生的电子-空穴对数}}{\\text{入射光子数}}$'}</MathRenderer>
              <p className="text-lab-muted mt-1">衡量探测器将光子转换为电信号的能力</p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">光电导效应</h4>
            <p className="text-sm mb-3">
              当光子照射到半导体上时，产生的光生载流子增加了材料的电导率。
              这一现象称为<span className="text-laser-green font-semibold">光电导效应</span>。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-1 text-sm">光敏电阻 (LDR)</h5>
                <p className="text-xs">
                  基于光电导效应，光照强度变化导致电阻变化。
                  结构简单，但响应速度较慢。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-purple mb-1 text-sm">光电二极管</h5>
                <p className="text-xs">
                  在 PN 结上施加反向偏压，光生载流子被电场加速形成光电流。
                  响应速度快，可用于高速通信。
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<Layers className="w-5 h-5 text-laser-purple" />} title="常见光电材料">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光通信系统中常用的光电材料主要有<span className="text-laser-cyan font-semibold">硅 (Si)</span>、
            <span className="text-laser-green font-semibold">锗 (Ge)</span>、
            <span className="text-laser-purple font-semibold">磷化铟 (InP)</span> 和
            <span className="text-laser-orange font-semibold">砷化镓 (GaAs)</span> 等。
            它们各自有不同的带隙和特性，适用于不同的应用场景。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text">材料</th>
                  <th className="text-center py-2 px-3 text-lab-text">带隙 (eV)</th>
                  <th className="text-center py-2 px-3 text-lab-text">响应波长</th>
                  <th className="text-left py-2 px-3 text-lab-text">主要应用</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-cyan font-medium">硅 (Si)</td>
                  <td className="py-2 px-3 text-center">1.12</td>
                  <td className="py-2 px-3 text-center">400-1000 nm</td>
                  <td className="py-2 px-3">探测器、太阳能电池、CMOS 图像传感器</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-green font-medium">锗 (Ge)</td>
                  <td className="py-2 px-3 text-center">0.66</td>
                  <td className="py-2 px-3 text-center">800-1600 nm</td>
                  <td className="py-2 px-3">光通信探测器（1310/1550 nm）</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-purple font-medium">磷化铟 (InP)</td>
                  <td className="py-2 px-3 text-center">1.35</td>
                  <td className="py-2 px-3 text-center">900-1700 nm</td>
                  <td className="py-2 px-3">激光器、探测器、光放大器、集成光路</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-orange font-medium">砷化镓 (GaAs)</td>
                  <td className="py-2 px-3 text-center">1.42</td>
                  <td className="py-2 px-3 text-center">870-900 nm</td>
                  <td className="py-2 px-3">激光器、微波器件、高电子迁移率晶体管</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-red font-medium">磷化镓铟 (InGaAsP)</td>
                  <td className="py-2 px-3 text-center">0.75-1.35</td>
                  <td className="py-2 px-3 text-center">1100-1650 nm</td>
                  <td className="py-2 px-3">可调谐激光器、光放大器</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-laser-cyan font-medium">磷化铝铟镓 (InGaAlP)</td>
                  <td className="py-2 px-3 text-center">1.9-2.2</td>
                  <td className="py-2 px-3 text-center">630-870 nm</td>
                  <td className="py-2 px-3">红光激光器、可见光 LED</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">材料选择的关键因素</h4>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-1">响应波长匹配</h5>
                <p className="text-lab-muted">
                  材料带隙决定响应波长范围。
                  光通信 C 波段 (1550 nm) 需要 InP、Ge 等材料。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-1">载流子迁移率</h5>
                <p className="text-lab-muted">
                  高迁移率材料响应速度更快。
                  GaAs 电子迁移率是 Si 的 5-6 倍。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-purple mb-1">工艺兼容性</h5>
                <p className="text-lab-muted">
                  CMOS 兼容的 Si 成本最低。
                  InP 可单片集成光源和探测器。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">III-V 族化合物半导体</h4>
            <p className="text-sm mb-3">
              III-V 族化合物半导体由周期表 III 族（Ga、In、Al）和 V 族（P、As、Sb）元素组成，
              是制作光电器件的理想材料。通过调整元素配比，可以精确控制材料的带隙和晶格常数。
            </p>
            <div className="bg-lab-surface/50 p-3 rounded-lg text-xs">
              <div className="font-medium text-lab-text mb-2">能带工程</div>
              <MathRenderer>{'$$E_g(x) = x \\cdot E_{GaAs} + (1-x) \\cdot E_{InP} - 1.247x(1-x) \\quad \\text{(InGaAs)}$$'}</MathRenderer>
              <p className="text-lab-muted mt-1">
                通过调整 In 和 Ga 的比例 x，可以获得任意所需的带隙能量
              </p>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<Beaker className="w-5 h-5 text-laser-orange" />} title="电光材料">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-orange font-semibold">电光材料（Electro-optic Materials）</span>
            能够在外加电场作用下改变其光学性质（折射率或吸收系数），
            是制作光调制器的核心材料。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="border border-laser-orange/30 bg-laser-orange/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-orange mb-2 text-sm">Pockels 效应（线性电光效应）</h4>
              <p className="text-xs mb-2">
                折射率变化与外加电场成正比。这是高速光调制器的主要机制。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs font-mono">
                <MathRenderer>{'$$\\Delta n = -\\frac{1}{2} n^3 r E$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                <span className="text-lab-text">r：</span>电光系数（pm/V）<br />
                代表材料：LiNbO₃、GaAs、KDP
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2 text-sm">Kerr 效应（二次电光效应）</h4>
              <p className="text-xs mb-2">
                折射率变化与外加电场的平方成正比。效果较弱，但响应速度快。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs font-mono">
                <MathRenderer>{'$$\\Delta n = -\\frac{1}{2} n^3 K E^2$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                <span className="text-lab-text">K：</span>克尔系数<br />
                代表材料：硅（Si）、CS₂
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">主要电光材料</h4>
            <div className="space-y-3 text-sm">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-cyan mb-1">铌酸锂 (LiNbO₃)</h5>
                <p className="text-xs text-lab-muted">
                  最成熟的电光材料，电光系数大 (~30 pm/V)，折射率高 (~2.2)。
                  广泛应用于马赫-曾德调制器、相位调制器。
                  缺点：难以与硅基或 III-V 族器件单片集成。
                </p>
              </div>
              <div className="border border-laser-green/30 bg-laser-green/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-green mb-1">砷化镓 (GaAs)</h5>
                <p className="text-xs text-lab-muted">
                  电光系数较小 (~1.4 pm/V)，但可与微波电路单片集成。
                  适用于毫米波光通信和太赫兹波产生。
                </p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-purple mb-1">硅 (Si) / 硅光 (Silicon Photonics)</h5>
                <p className="text-xs text-lab-muted">
                  主要依赖 Kerr 效应（二次），电光效应较弱。
                  但 CMOS 兼容、可低成本大规模生产。
                  与调制相关的机制：等离子体色散效应（Plasma Dispersion）。
                </p>
              </div>
              <div className="border border-laser-orange/30 bg-laser-orange/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-orange mb-1">薄膜铌酸锂 (TFLN / Thin-film LiNbO₃)</h5>
                <p className="text-xs text-lab-muted">
                  新一代高性能电光材料，在绝缘体上薄膜化铌酸锂。
                  兼具 LiNbO₃ 的优异电光特性和小型化优势。
                  半波电压 V_π 可低至 1-2 V，带宽可达 100 GHz 以上。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-4 rounded-xl">
            <h5 className="font-semibold text-lab-text mb-2 text-sm">电光材料的品质因子</h5>
            <p className="text-xs text-lab-muted">
              衡量电光材料调制性能的常用指标是<span className="text-lab-text">半波电压-长度积 V_π·L</span>：
            </p>
            <div className="bg-lab-surface/50 px-3 py-2 rounded-lg mt-2 text-xs font-mono">
              <MathRenderer>{'$$V_\\pi \\cdot L = \\frac{\\lambda}{2 n^3 r}$$'}</MathRenderer>
            </div>
            <p className="text-xs text-lab-muted mt-2">
              V_π·L 越小，材料的电光调制效率越高。
              LiNbO₃ 的 V_π·L ≈ 5-10 V·cm，
              而 TFLN 可低至 1-2 V·cm。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Sparkles className="w-5 h-5 text-laser-red" />} title="非线性光学材料">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-red font-semibold">非线性光学材料</span>
            在强光场作用下会表现出非线性响应，产生二次谐波、光学参量振荡、
            四波混频等非线性效应。这些材料在光通信中用于光开关、光调制和全光信号处理。
          </p>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">二阶非线性光学效应</h4>
            <p className="text-sm mb-3">
              二阶非线性极化率 χ⁽²⁾只存在于<span className="text-laser-cyan font-medium">非中心对称</span>的晶体中。
              主要包括：
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-1 text-sm">二次谐波产生 (SHG)</h5>
                <p className="text-xs">
                  频率为 ω 的光通过晶体后产生 2ω 的倍频光。
                  是激光频率转换的基础。
                </p>
                <div className="bg-lab-bg/50 px-2 py-1 rounded mt-1 text-xs font-mono">
                  ω + ω → 2ω
                </div>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-1 text-sm">光学参量振荡 (OPO)</h5>
                <p className="text-xs">
                  泵浦光在晶体中产生信号光和闲频光。
                  可实现宽范围可调谐激光输出。
                </p>
                <div className="bg-lab-bg/50 px-2 py-1 rounded mt-1 text-xs font-mono">
                  ω_p → ω_s + ω_i
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">三阶非线性光学效应</h4>
            <p className="text-sm mb-3">
              三阶非线性极化率 χ⁽³⁾存在于所有材料中，与光强的平方成正比。
              在光通信中既有应用价值，也带来一些不利影响：
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-1 text-sm">自相位调制 (SPM)</h5>
                <p className="text-xs">
                  光脉冲自身的强度变化引起相位变化，导致频谱展宽。
                  在光纤中与色散相互作用，产生孤子效应。
                </p>
              </div>
              <div className="border border-laser-green/30 bg-laser-green/5 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-1 text-sm">交叉相位调制 (XPM)</h5>
                <p className="text-xs">
                  一个信道的光强变化影响另一信道的相位。
                  是 WDM 系统信道间串扰的重要来源。
                </p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-3 rounded-lg">
                <h5 className="font-medium text-laser-purple mb-1 text-sm">四波混频 (FWM)</h5>
                <p className="text-xs">
                  三个频率的光相互作用产生第四个频率的新光。
                  可用于全光信号处理，也可产生串扰。
                </p>
              </div>
              <div className="border border-laser-orange/30 bg-laser-orange/5 p-3 rounded-lg">
                <h5 className="font-medium text-laser-orange mb-1 text-sm">非线性折射率</h5>
                <p className="text-xs">
                  <MathRenderer>{'$n = n_0 + n_2 \\cdot I$'}</MathRenderer>
                </p>
                <p className="text-xs text-lab-muted">石英光纤的 n₂ ≈ 2.6×10⁻²⁰ m²/W。</p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-4 rounded-xl">
            <h5 className="font-semibold text-lab-text mb-2 text-sm">常用非线性光学材料</h5>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-lab-text font-medium">周期性极化铌酸锂 (PPLN)</p>
                <p className="text-lab-muted">
                  通过周期性极化实现准相位匹配，显著提高转换效率。
                  广泛用于波长转换和 OPO。
                </p>
              </div>
              <div>
                <p className="text-lab-text font-medium">砷化镓 (GaAs)</p>
                <p className="text-lab-muted">
                  非线性系数大，适合制作光学超表面和片上非线性器件。
                </p>
              </div>
              <div>
                <p className="text-lab-text font-medium">硫系玻璃</p>
                <p className="text-lab-muted">
                  非线性系数比石英高 100 倍以上，
                  用于中红外光子学和全光开关。
                </p>
              </div>
              <div>
                <p className="text-lab-text font-medium">硅基氮化硅 (Si₃N₄)</p>
                <p className="text-lab-muted">
                  低损耗、高非线性，可用于微腔孤子和光学频率梳产生。
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<Gauge className="w-5 h-5 text-laser-cyan" />} title="材料特性对比与应用">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            不同应用场景对光电材料有不同的要求。以下是光通信系统中主要器件的材料选择概览：
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text">器件类型</th>
                  <th className="text-left py-2 px-3 text-lab-text">常用材料</th>
                  <th className="text-left py-2 px-3 text-lab-text">关键特性</th>
                  <th className="text-left py-2 px-3 text-lab-text">发展趋势</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-green font-medium">半导体激光器</td>
                  <td className="py-2 px-3">InP, GaAs, InGaAsP</td>
                  <td className="py-2 px-3">直接带隙、高量子效率</td>
                  <td className="py-2 px-3">硅基异构集成、波长可调谐</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-cyan font-medium">光探测器</td>
                  <td className="py-2 px-3">Si, Ge, InGaAs</td>
                  <td className="py-2 px-3">高响应度、低暗电流</td>
                  <td className="py-2 px-3">高带宽、弱光探测</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-purple font-medium">LiNbO₃ 调制器</td>
                  <td className="py-2 px-3">LiNbO₃</td>
                  <td className="py-2 px-3">大电光系数、低损耗</td>
                  <td className="py-2 px-3">薄膜化 (TFLN)、低 V_π</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-orange font-medium">硅光调制器</td>
                  <td className="py-2 px-3">Si, SiGe</td>
                  <td className="py-2 px-3">CMOS 兼容、高集成度</td>
                  <td className="py-2 px-3">更高调制速率</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-red font-medium">光放大器</td>
                  <td className="py-2 px-3">Er:Yb 共掺玻璃</td>
                  <td className="py-2 px-3">增益带宽、噪声系数</td>
                  <td className="py-2 px-3">半导体光放大器 (SOA)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-laser-cyan font-medium">光纤</td>
                  <td className="py-2 px-3">SiO₂ (掺杂)</td>
                  <td className="py-2 px-3">低损耗、色散可控</td>
                  <td className="py-2 px-3">空芯光纤、超低损耗</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">材料平台对比</h4>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">磷化铟 (InP)</h5>
                <ul className="text-lab-muted space-y-1">
                  <li>✓ 单片集成光源、探测器、调制器</li>
                  <li>✓ 1550 nm 通信波段最优</li>
                  <li>✗ 晶圆尺寸小 (~6 英寸)</li>
                  <li>✗ 成本高</li>
                </ul>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">硅光 (Silicon Photonics)</h5>
                <ul className="text-lab-muted space-y-1">
                  <li>✓ CMOS 兼容，成本低</li>
                  <li>✓ 超大规模集成</li>
                  <li>✗ 间接带隙，难以集成光源</li>
                  <li>✗ 电光效应弱</li>
                </ul>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-purple mb-2">薄膜铌酸锂 (TFLN)</h5>
                <ul className="text-lab-muted space-y-1">
                  <li>✓ 优异电光性能</li>
                  <li>✓ 低 V_π、高带宽</li>
                  <li>✓ 与 CMOS 兼容</li>
                  <li>✗ 相对较新，生态正在成熟</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-laser-cyan/20 bg-laser-cyan/5 p-4 rounded-xl mt-3">
            <h5 className="font-semibold text-laser-cyan mb-2 text-sm">📚 总结</h5>
            <p className="text-xs text-lab-muted">
              光电材料是光通信技术的物理基础。从半导体物理到非线性光学，
              每一种材料特性都被巧妙利用来实现特定功能。随着材料科学的进步，
              薄膜化、异构集成成为发展趋势，新型材料平台不断推动光通信系统向更高速率、
              更低功耗、更低成本演进。
            </p>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
