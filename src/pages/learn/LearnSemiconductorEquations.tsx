import { Sigma, Activity, FlaskConical, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面章节：与文档 ## 二级标题一一对应（含"总结"）
const pageSections = [
  { id: 's-0', title: '半导体基本方程组' },
  { id: 's-1', title: '方程组的耦合求解' },
  { id: 's-2', title: '从方程到器件分析' },
  { id: 's-3', title: '总结' },
];

export default function LearnSemiconductorEquations() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } =
    useChapterNavigation(ROUTES.LEARN.SEMICONDUCTOR_EQUATIONS);
  // 上一章 / 下一章均包裹图标
  const prev = prevChapter
    ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> }
    : undefined;
  const next = nextChapter
    ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> }
    : undefined;

  return (
    <LearnLayout
      title="半导体基本方程"
      subtitle="从泊松方程到 TCAD 仿真：半导体器件的数学框架"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      {/* 前置说明：本章为进阶内容 */}
      <div className="border border-laser-purple/20 bg-laser-purple/5 p-4 rounded-xl">
        <p className="text-sm text-lab-muted">
          <span className="font-semibold text-laser-purple">本章为进阶内容</span>
          ，需要先掌握{' '}
          <Link to={ROUTES.LEARN.SEMICONDUCTOR_BASICS} className="text-laser-cyan hover:underline">
            半导体基础
          </Link>{' '}
          和{' '}
          <Link to={ROUTES.LEARN.PN_JUNCTION_BASICS} className="text-laser-cyan hover:underline">
            PN 结基础
          </Link>{' '}
          中的概念。
        </p>
      </div>

      {/* 半导体基本方程组 */}
      <LearnSection id="s-0" icon={<Sigma className="w-5 h-5 text-laser-cyan" />} title="半导体基本方程组">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            半导体器件的物理行为由一组基本方程描述。这些方程是器件仿真（
            <span className="text-laser-cyan font-mono">TCAD</span>）和器件设计的理论基础，贯穿从
            PN 结到激光器的所有半导体器件分析。
          </p>

          {/* 泊松方程 */}
          <h3 className="font-semibold text-lab-text pt-2">泊松方程</h3>
          <p>泊松方程描述电场与电荷分布的关系，是静电学的基本方程：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\nabla^2 \\phi = -\\frac{\\rho}{\\varepsilon_s}$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">φ</span> 为电势，
            <span className="text-laser-green font-mono">ρ</span> 为空间电荷密度，
            <span className="text-laser-purple font-mono">ε_s</span> 为半导体介电常数。
          </p>
          <p>电荷密度包含所有可动和固定电荷：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\rho = q(p - n + N_D^+ - N_A^-)$$'}</MathRenderer>
          </div>
          <p>
            <span className="font-semibold text-laser-cyan">物理意义</span>
            ：空间电荷区的电场、电势分布完全由泊松方程决定。这是 PN 结耗尽区分析的核心方程。
          </p>
          <div>
            <p className="mb-2">
              <span className="font-semibold text-laser-cyan">典型应用</span>：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-laser-cyan mt-1">•</span>
                <span>PN 结耗尽区电场和电势分布</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-cyan mt-1">•</span>
                <span>MOS 结构阈值电压计算</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-cyan mt-1">•</span>
                <span>调制器中电场分布对折射率的影响</span>
              </li>
            </ul>
          </div>

          {/* 连续性方程 */}
          <h3 className="font-semibold text-lab-text pt-2">连续性方程</h3>
          <p>连续性方程描述载流子浓度随时间的变化，体现电荷守恒：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{\\partial n}{\\partial t} = G_n - R_n + \\frac{1}{q}\\nabla \\cdot \\mathbf{J}_n$$'}</MathRenderer>
          </div>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{\\partial p}{\\partial t} = G_p - R_p - \\frac{1}{q}\\nabla \\cdot \\mathbf{J}_p$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">G</span> 为产生率（包括热产生和光产生），
            <span className="text-laser-green font-mono">R</span> 为复合率。
          </p>
          <p>
            <span className="font-semibold text-laser-green">物理意义</span>
            ：载流子浓度的变化等于产生减去复合再加上净流入。光照下{' '}
            <span className="font-mono text-laser-purple">G_opt</span> 增大，驱动光电器件工作。
          </p>
          <div>
            <p className="mb-2">
              <span className="font-semibold text-laser-green">典型应用</span>：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-laser-green mt-1">•</span>
                <span>
                  <TermNote term="光电二极管" /> 中光生载流子的收集过程
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-green mt-1">•</span>
                <span>
                  <TermNote term="激光器" /> 中载流子注入与复合的动态平衡
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-green mt-1">•</span>
                <span>瞬态响应分析（开启/关断时间）</span>
              </li>
            </ul>
          </div>

          {/* 漂移扩散方程 */}
          <h3 className="font-semibold text-lab-text pt-2">漂移扩散方程</h3>
          <p>漂移扩散方程将载流子电流表述为漂移分量和扩散分量之和：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\mathbf{J}_n = q\\mu_n n \\mathbf{E} + qD_n \\nabla n$$'}</MathRenderer>
          </div>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\mathbf{J}_p = q\\mu_p p \\mathbf{E} - qD_p \\nabla p$$'}</MathRenderer>
          </div>
          <p>总电流密度为电子和空穴电流之和：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\mathbf{J} = \\mathbf{J}_n + \\mathbf{J}_p$$'}</MathRenderer>
          </div>
          <p>
            <span className="font-semibold text-laser-purple">物理意义</span>
            ：电场驱动漂移，浓度梯度驱动扩散，两者共同决定载流子流动。这是半导体器件电流计算的基石。
          </p>
          <div>
            <p className="mb-2">
              <span className="font-semibold text-laser-purple">典型应用</span>：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-laser-purple mt-1">•</span>
                <span>PN 结 I-V 特性推导（肖克利方程）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-purple mt-1">•</span>
                <span>光探测器响应度计算</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-purple mt-1">•</span>
                <span>太阳能电池效率分析</span>
              </li>
            </ul>
          </div>

          {/* 热传导方程 */}
          <h3 className="font-semibold text-lab-text pt-2">热传导方程</h3>
          <p>
            高功率器件（如激光器、<TermNote term="EDFA" /> 泵浦源）中的温度分布影响器件性能和可靠性：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\rho_m c_p \\frac{\\partial T}{\\partial t} = \\nabla \\cdot (k_{th} \\nabla T) + Q$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">ρ_m</span> 为材料密度，
            <span className="text-laser-green font-mono">c_p</span> 为比热容，
            <span className="text-laser-purple font-mono">k_th</span> 为热导率，
            <span className="text-laser-orange font-mono">Q</span> 为体积热源。
          </p>
          <div>
            <p className="mb-2">
              <span className="font-semibold text-laser-red">典型应用</span>：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-laser-red mt-1">•</span>
                <span>激光器热阻和结温计算</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-red mt-1">•</span>
                <span>探测器暗电流的温度依赖分析</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-red mt-1">•</span>
                <span>高功率集成光电器件的热设计</span>
              </li>
            </ul>
          </div>

          {/* 薛定谔方程（量子阱结构） */}
          <h3 className="font-semibold text-lab-text pt-2">薛定谔方程（量子阱结构）</h3>
          <p>量子阱激光器和新型光电器件中，载流子在纳米尺度受限，需用量子力学描述：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$-\\frac{\\hbar^2}{2m^*}\\frac{d^2\\psi}{dz^2} + V(z)\\psi = E\\psi$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">m*</span> 为有效质量，
            <span className="text-laser-green font-mono">V(z)</span> 为势阱势能函数，
            <span className="text-laser-purple font-mono">ψ</span> 为波函数。
          </p>
          <p>
            <span className="font-semibold text-laser-orange">物理意义</span>
            ：量子阱中载流子能级离散化（子带），态密度变为阶梯函数，显著降低阈值电流并提高微分增益。
          </p>
          <div>
            <p className="mb-2">
              <span className="font-semibold text-laser-orange">典型应用</span>：
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-laser-orange mt-1">•</span>
                <span>量子阱激光器有源区能级设计</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-orange mt-1">•</span>
                <span>电吸收调制器（EAM）激子吸收峰设计</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-orange mt-1">•</span>
                <span>新型硅基 GeSn 量子阱探测器优化</span>
              </li>
            </ul>
          </div>
        </div>
      </LearnSection>

      {/* 方程组的耦合求解 */}
      <LearnSection id="s-1" icon={<Activity className="w-5 h-5 text-laser-green" />} title="方程组的耦合求解">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            上述方程并非独立——它们通过电场、载流子浓度和电势相互耦合，构成完整的半导体器件方程组：
          </p>

          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-cyan">泊松方程</span>
                <span className="text-laser-cyan mx-1">→</span>
                求电势 <span className="font-mono text-laser-cyan">φ</span>
                <span className="text-laser-cyan mx-1">→</span>
                得到电场 <span className="font-mono text-laser-cyan">E = −∇φ</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-green">漂移扩散方程</span>
                <span className="text-laser-green mx-1">→</span>
                用电场 <span className="font-mono text-laser-green">E</span> 和载流子浓度
                <span className="text-laser-green mx-1">→</span>
                求电流 <span className="font-mono text-laser-green">J_n, J_p</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-purple">连续性方程</span>
                <span className="text-laser-purple mx-1">→</span>
                用电流散度和产生复合
                <span className="text-laser-purple mx-1">→</span>
                更新载流子浓度 <span className="font-mono text-laser-purple">n, p</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-red/20 text-laser-red flex items-center justify-center flex-shrink-0 text-sm font-bold">
                4
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-red">泊松方程</span>
                <span className="text-laser-red mx-1">→</span>
                用新的载流子浓度
                <span className="text-laser-red mx-1">→</span>
                重新求电势（迭代）
              </div>
            </li>
          </ol>

          <p>
            这一耦合求解过程正是 TCAD 器件仿真软件（如{' '}
            <span className="font-mono text-laser-cyan">Synopsys Sentaurus</span>、
            <span className="font-mono text-laser-green">Silvaco Atlas</span>）的数值核心。通过自洽迭代，
            可以精确模拟器件的稳态、瞬态和交流特性。
          </p>

          {/* 简化分析的典型假设 */}
          <h3 className="font-semibold text-lab-text pt-2">简化分析的典型假设</h3>
          <p>实际分析中常根据器件工作条件简化方程：</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-laser-cyan font-semibold">假设</th>
                  <th className="text-left py-2 px-3 text-laser-green font-semibold">适用场景</th>
                  <th className="text-left py-2 px-3 text-laser-purple font-semibold">简化效果</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-semibold text-lab-text">耗尽近似</td>
                  <td className="py-2 px-3">PN 结耗尽区</td>
                  <td className="py-2 px-3">载流子浓度设为零，泊松方程解析求解</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-semibold text-lab-text">准中性近似</td>
                  <td className="py-2 px-3">PN 结中性区</td>
                  <td className="py-2 px-3">
                    <span className="font-mono text-laser-cyan">ρ ≈ 0</span>，泊松方程退化为拉普拉斯方程
                  </td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-semibold text-lab-text">稳态分析</td>
                  <td className="py-2 px-3">DC 特性</td>
                  <td className="py-2 px-3">
                    <span className="font-mono text-laser-cyan">∂/∂t = 0</span>，连续性方程代数化
                  </td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-semibold text-lab-text">低注入近似</td>
                  <td className="py-2 px-3">小信号分析</td>
                  <td className="py-2 px-3">少子浓度远小于多子浓度，方程线性化</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-lab-text">一维近似</td>
                  <td className="py-2 px-3">平面器件</td>
                  <td className="py-2 px-3">所有方程退化为常微分方程</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </LearnSection>

      {/* 从方程到器件分析 */}
      <LearnSection id="s-2" icon={<FlaskConical className="w-5 h-5 text-laser-purple" />} title="从方程到器件分析">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>这些方程如何应用于实际器件分析？以 PN 结为例：</p>

          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-cyan">耗尽区</span>
                ：使用耗尽近似 + 泊松方程
                <span className="text-laser-cyan mx-1">→</span>
                解析求解电场和电势分布
                <span className="text-laser-cyan mx-1">→</span>
                得到耗尽区宽度和结电容
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-green">中性区</span>
                ：使用连续性方程 + 漂移扩散方程
                <span className="text-laser-green mx-1">→</span>
                求解少子浓度分布
                <span className="text-laser-green mx-1">→</span>
                得到肖克利方程
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </div>
              <div className="text-sm pt-1">
                <span className="font-semibold text-laser-purple">暗电流</span>
                ：在耗尽区和中性区分别分析各机制
                <span className="text-laser-purple mx-1">→</span>
                叠加得到总暗电流
              </div>
            </li>
          </ol>

          <p>
            这些分析将在{' '}
            <Link to={ROUTES.LEARN.PN_JUNCTION_ADVANCED} className="text-laser-cyan hover:underline">
              PN 结进阶
            </Link>{' '}
            中详细展开。
          </p>
        </div>
      </LearnSection>

      {/* 总结 */}
      <LearnSection id="s-3" icon={<Sparkles className="w-5 h-5 text-laser-red" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            半导体基本方程组——泊松方程、连续性方程、漂移扩散方程——构成了从 PN 结到量子阱激光器的统一分析框架。
            理解这些方程及其耦合关系，是深入掌握光通信器件工作原理的关键。通过 TCAD 仿真工具的自洽迭代求解，
            可以精确模拟器件的稳态、瞬态和交流特性，是现代光电器件设计不可或缺的手段。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
