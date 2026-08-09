import { Atom, Layers2, Sigma, Zap, Sparkles } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面目录：按文档 ## 顺序对应（含"总结"）
const pageSections = [
  { id: 's-0', title: '复合的物理本质' },
  { id: 's-1', title: '三种基本复合机制' },
  { id: 's-2', title: '少子寿命' },
  { id: 's-3', title: '复合与器件性能的关系' },
  { id: 's-4', title: '总结' },
];

export default function LearnRecombination() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN.RECOMBINATION,
  );
  // prev/next 都包 icon
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;

  return (
    <LearnLayout
      title="载流子复合机制"
      subtitle="辐射复合、SRH 复合与俄歇复合——连接物理到器件性能的关键"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      {/* 复合的物理本质 */}
      <LearnSection id="s-0" icon={<Atom className="w-5 h-5 text-laser-cyan" />} title="复合的物理本质">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="font-semibold text-laser-cyan">复合（Recombination）</span>
            是导带中的电子跃迁回到价带、与空穴结合而消失的过程。在这一过程中，电子释放的能量等于（或略小于）
            带隙能量 <span className="font-mono text-laser-cyan">E<sub>g</sub></span>，可以以光子形式辐射出来，
            也可以以声子形式转化为晶格热振动。
          </p>
          <p>
            <span className="font-semibold text-laser-cyan">产生（Generation）</span>
            是复合的逆过程：价带电子获得能量（热激发或光激发）跃迁到导带，产生电子-空穴对。在热平衡下，
            复合率与产生率相等，载流子浓度维持动态平衡。
          </p>
          <p>
            <span className="font-semibold text-laser-cyan">净复合率</span> 定义为复合率与产生率之差：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R = R_{\\text{rec}} - G_{\\text{gen}}$$'}</MathRenderer>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan flex-shrink-0">•</span>
              <span>
                当 <span className="font-mono text-laser-cyan">R &gt; 0</span>：净复合，载流子被消耗（如关断注入后的衰减）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan flex-shrink-0">•</span>
              <span>
                当 <span className="font-mono text-laser-cyan">R &lt; 0</span>：净产生，载流子被创造（如光照下的光电导）
              </span>
            </li>
          </ul>
          <p>
            净复合率 <span className="font-mono text-laser-cyan">R</span> 直接决定器件的响应速度、暗电流和发光效率。
          </p>
        </div>
      </LearnSection>

      {/* 三种基本复合机制 */}
      <LearnSection id="s-1" icon={<Layers2 className="w-5 h-5 text-laser-green" />} title="三种基本复合机制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            半导体中载流子复合主要通过三种机制完成：辐射复合、SRH 复合和俄歇复合。它们的物理本质不同，
            对材料、掺杂和温度的依赖也不同。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">辐射复合（Radiative Recombination）</h3>
          <p>
            辐射复合是电子和空穴直接复合、将多余能量以光子形式释放的过程，发射光子能量近似等于
            <TermNote term="带隙" />：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$h\\nu \\approx E_g$$'}</MathRenderer>
          </div>
          <p>辐射复合的强弱强烈依赖于材料的能带结构：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">直接带隙材料</span>（GaAs、InP 等）：
                导带底与价带顶在 k 空间同一位置，电子-空穴直接复合不需声子参与，辐射复合强，
                是高效 LED 和激光器的首选材料。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">间接带隙材料</span>（Si、Ge 等）：
                复合需声子参与以满足动量守恒，概率极低，发光效率很弱。
              </span>
            </li>
          </ul>
          <p>辐射复合率正比于电子浓度与空穴浓度的乘积：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{rad}} = B \\cdot n \\cdot p$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="font-mono text-laser-cyan">B</span> 为
            <span className="font-semibold text-laser-green">辐射复合系数</span>（单位 cm³/s），
            直接带隙材料的 <span className="font-mono text-laser-cyan">B</span> 比间接带隙材料大几个数量级
            （GaAs 约 <span className="font-mono text-laser-cyan">2×10⁻¹⁰ cm³/s</span>，
            Si 约 <span className="font-mono text-laser-cyan">1.4×10⁻¹⁴ cm³/s</span>）。
          </p>
          <p>相应的辐射寿命：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\tau_{\\text{rad}} = \\frac{1}{B \\cdot n} \\quad \\text{或} \\quad \\frac{1}{B \\cdot p}$$'}</MathRenderer>
          </div>
          <p>
            辐射复合是 LED 和半导体激光器发光的物理基础——器件效率的上限由辐射复合在总复合中的占比决定。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">SRH 复合（Shockley-Read-Hall / 陷阱辅助复合）</h3>
          <p>
            <span className="font-semibold text-laser-green">SRH 复合</span>
            是通过晶格缺陷或杂质引入的
            <span className="font-semibold text-laser-green">陷阱能级</span>
            <span className="font-mono text-laser-cyan"> E<sub>t</sub> </span>
            间接完成的复合，是一个两步过程：
          </p>
          <div className="space-y-3 my-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <p className="text-sm pt-1.5">一种载流子（如电子）被陷阱俘获</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <p className="text-sm pt-1.5">另一种载流子（如空穴）随后被同一个陷阱俘获，完成复合</p>
            </div>
          </div>
          <p>
            复合率取决于陷阱浓度 <span className="font-mono text-laser-cyan">N<sub>t</sub></span>、
            陷阱能级位置 <span className="font-mono text-laser-cyan">E<sub>t</sub></span> 和
            俘获截面 <span className="font-mono text-laser-cyan">σ</span>。
            当陷阱能级位于带隙中央附近时，SRH 复合最有效。完整的 SRH 复合率公式为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{SRH}} = \\frac{n \\cdot p - n_i^2}{\\tau_p (n + n_1) + \\tau_n (p + p_1)}$$'}</MathRenderer>
          </div>
          <p className="text-sm">其中：</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                <span className="font-mono text-laser-cyan">τ<sub>n</sub></span>、
                <span className="font-mono text-laser-cyan">τ<sub>p</sub></span>：电子和空穴的 SRH 寿命，
                与 <span className="font-mono text-laser-cyan">N<sub>t</sub></span> 和
                <span className="font-mono text-laser-cyan"> σ</span> 成反比
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <div className="flex-1 min-w-0 bg-lab-bg/50 px-4 py-3 rounded-lg">
                <MathRenderer>{'$$n_1 = n_i \\exp\\left(\\dfrac{E_t - E_i}{k_B T}\\right), \\quad p_1 = n_i \\exp\\left(\\dfrac{E_i - E_t}{k_B T}\\right)$$'}</MathRenderer>
              </div>
            </li>
          </ul>
          <p className="text-sm">SRH 复合的特点：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                在<span className="font-semibold text-laser-green">低注入</span>或
                <span className="font-semibold text-laser-green">耗尽区</span>中常常占据主导
                （因为此时载流子浓度低，陷阱俘获成为瓶颈）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                是 PN 结反向偏置下
                <span className="font-semibold text-laser-green">暗电流中产生-复合电流</span>
                的物理来源
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>严重依赖材料质量——高质量外延材料可显著降低陷阱浓度从而抑制 SRH 复合</span>
            </li>
          </ul>

          <h3 className="font-semibold text-lab-text pt-2">俄歇复合（Auger Recombination）</h3>
          <p>
            俄歇复合是一种<span className="font-semibold text-laser-green">三体过程</span>：
            电子与空穴复合后，释放的能量不发光，而是传递给第三个载流子（使其被激发到更高能态），
            随后该载流子通过声子发射弛豫回低能态。
          </p>
          <p>俄歇复合率：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$R_{\\text{Auger}} = C_n \\cdot n^2 \\cdot p + C_p \\cdot n \\cdot p^2$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="font-mono text-laser-cyan">C<sub>n</sub></span>、
            <span className="font-mono text-laser-cyan">C<sub>p</sub></span> 为俄歇复合系数。
            由于复合率正比于载流子浓度的三次方，俄歇复合的特点非常鲜明：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-green">高载流子浓度</span>下主导（大注入、大电流密度）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span><span className="font-semibold text-laser-green">高温</span>下变得更严重</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>
                在<span className="font-semibold text-laser-green">窄带隙材料</span>（InGaAs、Ge 等）中尤为显著
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>是限制半导体激光器最大效率和高功率 LED 性能的主要因素</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green flex-shrink-0">•</span>
              <span>不发光，能量最终以热的形式耗散</span>
            </li>
          </ul>
        </div>
      </LearnSection>

      {/* 少子寿命 */}
      <LearnSection id="s-2" icon={<Sigma className="w-5 h-5 text-laser-purple" />} title="少子寿命">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            三种复合机制在器件中并行发生。有效少子寿命
            <span className="font-mono text-laser-cyan"> τ<sub>eff</sub> </span>
            由各机制的寿命倒数相加得到（类似并联电阻）：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{1}{\\tau_{\\text{eff}}} = \\frac{1}{\\tau_{\\text{rad}}} + \\frac{1}{\\tau_{\\text{SRH}}} + \\frac{1}{\\tau_{\\text{Auger}}}$$'}</MathRenderer>
          </div>
          <p>总寿命由最快（寿命最短）的机制主导。</p>
          <p className="text-sm">少子寿命对器件性能的影响：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-purple flex-shrink-0">•</span>
              <span>
                决定<span className="font-semibold text-laser-purple">器件响应速度</span>：
                寿命越短，载流子浓度变化越快，开关速度越高
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple flex-shrink-0">•</span>
              <span>
                决定<span className="font-semibold text-laser-purple">暗电流大小</span>：
                耗尽区中寿命越短（陷阱越多），产生电流越大
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple flex-shrink-0">•</span>
              <span>
                决定<span className="font-semibold text-laser-purple">光生载流子收集效率</span>：
                探测器中寿命太短会导致复合损失，太长又限制带宽
              </span>
            </li>
          </ul>
          <p className="text-sm">少子寿命的常见测量方法：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-purple flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-purple">光致衰减（PCD, Photoconductivity Decay）</span>：
                用脉冲光激发载流子，测量电导率随时间的衰减
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-purple">时间分辨光致发光（TRPL, Time-Resolved Photoluminescence）</span>：
                测量发光强度随时间的衰减，直接反映辐射寿命
              </span>
            </li>
          </ul>
        </div>
      </LearnSection>

      {/* 复合与器件性能的关系 */}
      <LearnSection id="s-3" icon={<Zap className="w-5 h-5 text-laser-red" />} title="复合与器件性能的关系">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>不同光电器件对复合机制的要求截然不同：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-red flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-red">激光器</span>：
                需要辐射复合远大于非辐射复合，因此需要高质量的
                <span className="font-semibold text-laser-red">直接带隙材料</span>，
                并避免高浓度下的俄歇复合。内量子效率与辐射复合占比直接相关。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-red">光电探测器</span>：
                需要少子寿命足够长以保证光生载流子被有效收集，但又不能太长以免影响响应速度——
                这是一个工程上的折中。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red flex-shrink-0">•</span>
              <span>
                <span className="font-semibold text-laser-red">LED</span>：
                内量子效率定义为辐射复合在总复合中所占比例：
              </span>
            </li>
          </ul>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\eta_{\\text{int}} = \\frac{R_{\\text{rad}}}{R_{\\text{rad}} + R_{\\text{SRH}} + R_{\\text{Auger}}}$$'}</MathRenderer>
          </div>
          <p>
            提高 <span className="font-mono text-laser-cyan">η<sub>int</sub></span> 的关键在于
            降低材料缺陷（抑制 SRH）并避免过高的载流子注入（抑制俄歇）。
          </p>
        </div>
      </LearnSection>

      {/* 总结 */}
      <LearnSection id="s-4" icon={<Sparkles className="w-5 h-5 text-laser-orange" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>下表对比三种复合机制的关键特征：</p>
          <div className="overflow-x-auto rounded-lg border border-lab-border/50">
            <table className="w-full text-sm">
              <thead className="bg-laser-cyan/10">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-laser-cyan">复合机制</th>
                  <th className="px-3 py-2 text-left font-semibold text-laser-cyan">涉及粒子</th>
                  <th className="px-3 py-2 text-left font-semibold text-laser-cyan">与浓度关系</th>
                  <th className="px-3 py-2 text-center font-semibold text-laser-cyan">发光?</th>
                  <th className="px-3 py-2 text-left font-semibold text-laser-cyan">主要影响</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-lab-border/30">
                  <td className="px-3 py-2 font-semibold text-laser-cyan">辐射复合</td>
                  <td className="px-3 py-2">2 粒子（e+h）</td>
                  <td className="px-3 py-2"><span className="font-mono text-laser-green">∝ np</span></td>
                  <td className="px-3 py-2 text-center text-laser-green font-semibold">是</td>
                  <td className="px-3 py-2">LED 和激光器基础</td>
                </tr>
                <tr className="border-t border-lab-border/30">
                  <td className="px-3 py-2 font-semibold text-laser-green">SRH 复合</td>
                  <td className="px-3 py-2">通过陷阱（2 步）</td>
                  <td className="px-3 py-2">
                    <span className="font-mono text-laser-purple">∝ (np - n<sub>i</sub>²)/τ</span>
                  </td>
                  <td className="px-3 py-2 text-center text-laser-red font-semibold">否</td>
                  <td className="px-3 py-2">暗电流、降低寿命</td>
                </tr>
                <tr className="border-t border-lab-border/30">
                  <td className="px-3 py-2 font-semibold text-laser-purple">俄歇复合</td>
                  <td className="px-3 py-2">3 粒子</td>
                  <td className="px-3 py-2"><span className="font-mono text-laser-red">∝ n²p 或 np²</span></td>
                  <td className="px-3 py-2 text-center text-laser-red font-semibold">否</td>
                  <td className="px-3 py-2">高功率限制、窄带隙严重</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            理解三种复合机制及其竞争关系，是分析 LED 量子效率、激光器阈值电流、探测器暗电流的物理基础。
            后续 <span className="font-semibold text-laser-cyan">光与物质相互作用</span>
            将从辐射复合出发，进一步讨论吸收、自发辐射与受激辐射三种基本过程。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
