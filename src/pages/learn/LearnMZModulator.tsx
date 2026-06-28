import { CircuitBoard, Zap } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { CHAPTERS, TOTAL_CHAPTERS } from '@/constants/chapters';

const pageSections = [
  { id: 's-0', title: '电光效应：调制器的物理基础' },
  { id: 's-1', title: 'MZ 调制器的基本结构' },
  { id: 's-2', title: '工作原理与转移函数' },
  { id: 's-3', title: '三种调制模式' },
  { id: 's-4', title: '工作点与偏置' },
  { id: 's-5', title: '性能指标' },
  { id: 's-6', title: '三种模式综合对比' },
  { id: 's-7', title: '偏置控制与啁啾' },
  { id: 's-8', title: '从 MZM 到 IQ 调制器' },
];

export default function LearnMZModulator() {
  const currentIndex = CHAPTERS.findIndex(c => c.path === ROUTES.LEARN.MZ_MODULATOR)
  const prevChapter = currentIndex > 0 ? { path: CHAPTERS[currentIndex - 1].path, title: CHAPTERS[currentIndex - 1].title, icon: <CircuitBoard className="w-4 h-4" /> } : undefined
  const nextChapter = currentIndex < TOTAL_CHAPTERS - 1 ? { path: CHAPTERS[currentIndex + 1].path, title: CHAPTERS[currentIndex + 1].title, icon: <CircuitBoard className="w-4 h-4" /> } : undefined
  return (
    <LearnLayout
      title="MZ 调制器"
      subtitle="马赫-曾德电光调制器的工作原理、结构与三种调制模式"
      currentIndex={currentIndex}
      totalChapters={TOTAL_CHAPTERS}
      partTitle="Part 3 · 调制器篇"
      playgroundPath={ROUTES.PLAYGROUND.MZ_MODULATOR}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Zap className="w-5 h-5 text-laser-cyan" />} title="电光效应：调制器的物理基础">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZ 调制器的核心物理机制是<span className="text-laser-cyan font-semibold">电光效应 (Electro-Optic Effect)</span>。
            当外加电场作用于某些晶体材料时，材料的折射率会发生变化，从而改变光在其中传播的相位。
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">Pockels 效应（线性电光效应）</h4>
              <p className="text-sm">
                折射率变化与外加电场成正比。这是高速光调制器的主要工作机制，
                响应速度快（ps 级），适用于铌酸锂（LiNbO₃）、砷化镓（GaAs）等晶体。
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2 text-xs">
                <MathRenderer>{'$$\\Delta n = -\\frac{1}{2} n^3 r E$$'}</MathRenderer>
              </div>
              <p className="text-xs mt-2">
                其中 n 是原始折射率，r 是电光系数（材料特性），E 是外加电场强度。
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">Kerr 效应（二次电光效应）</h4>
              <p className="text-sm">
                折射率变化与外加电场的平方成正比。硅材料主要依赖 Kerr 效应，
                效果较弱，需要较高的驱动电压或特殊的结构设计。
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2 text-xs">
                <MathRenderer>{'$$\\Delta n = -\\frac{1}{2} n^3 K E^2$$'}</MathRenderer>
              </div>
            </div>
          </div>
          <p className="mt-4">
            由电光效应产生的相位变化量与电压成正比：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta\\phi = \\frac{\\pi V}{V_\\pi}$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 <span className="text-laser-cyan font-mono">V_π</span> 是半波电压，
              使相位变化 π 所需的电压。V_π 越小，调制效率越高。
            </p>
          </div>
          <div className="bg-lab-bg/50 p-4 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-2">常见材料的电光特性对比：</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lab-border">
                    <th className="text-left py-2 text-lab-muted font-medium">材料</th>
                    <th className="text-center py-2 text-lab-muted font-medium">电光系数 r (pm/V)</th>
                    <th className="text-center py-2 text-lab-muted font-medium">折射率 n</th>
                    <th className="text-center py-2 text-lab-muted font-medium">典型 V_π</th>
                    <th className="text-center py-2 text-lab-muted font-medium">优势</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-lab-text">铌酸锂 (LiNbO₃)</td>
                    <td className="py-2 text-center text-laser-cyan">~30</td>
                    <td className="py-2 text-center">~2.2</td>
                    <td className="py-2 text-center">3-5 V</td>
                    <td className="py-2 text-center text-xs">成熟、高速</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-lab-text">砷化镓 (GaAs)</td>
                    <td className="py-2 text-center text-laser-green">~1.2</td>
                    <td className="py-2 text-center">~3.5</td>
                    <td className="py-2 text-center">5-10 V</td>
                    <td className="py-2 text-center text-xs">集成度高</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-lab-text">硅 (Si)</td>
                    <td className="py-2 text-center text-laser-purple">Kerr 效应</td>
                    <td className="py-2 text-center">~3.5</td>
                    <td className="py-2 text-center">10-20 V</td>
                    <td className="py-2 text-center text-xs">CMOS 兼容</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-lab-text">磷化铟 (InP)</td>
                    <td className="py-2 text-center text-laser-red">~1.5</td>
                    <td className="py-2 text-center">~3.2</td>
                    <td className="py-2 text-center">2-4 V</td>
                    <td className="py-2 text-center text-xs">可集成激光器</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-lab-text font-medium text-laser-cyan">薄膜铌酸锂 (TFLN)</td>
                    <td className="py-2 text-center text-laser-cyan">~30</td>
                    <td className="py-2 text-center">~2.2</td>
                    <td className="py-2 text-center text-laser-green">&lt; 2 V</td>
                    <td className="py-2 text-center text-xs">尺寸小 10 倍、V_π 低</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<CircuitBoard className="w-5 h-5 text-laser-green" />} title="MZ 调制器的基本结构">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">马赫-曾德调制器 (MZM)</span>
            是基于马赫-曾德干涉仪结构的电光调制器。它将输入光分成两束，
            分别通过两个相位调制臂，然后重新汇合产生干涉，通过控制两臂的相位差来调制输出光强。
          </p>
          <div className="bg-lab-bg/50 p-6 rounded-xl">
            <div className="text-center mb-4 font-semibold text-lab-text">MZM 结构示意图</div>
            <div className="space-y-4">
              {/* 输入和分束器 */}
              <div className="flex items-center justify-center gap-3">
                <div className="text-lab-muted text-sm w-16 text-right">输入光 E_in</div>
                <div className="text-laser-cyan">→</div>
                <div className="px-3 py-2 border border-laser-cyan/50 rounded-lg bg-laser-cyan/10 text-sm font-semibold text-laser-cyan">
                  3dB 分束器
                </div>
                <div className="text-laser-cyan">→</div>
              </div>
              {/* 两臂 */}
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="text-laser-green text-sm">↓</div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-20 bg-laser-green/50 rounded mb-1" />
                    <div className="px-2 py-1 border border-laser-green/30 rounded bg-laser-green/5 text-xs text-laser-green">
                      上臂 + 电极 V₁
                    </div>
                    <div className="text-xs text-lab-muted mt-1">相位 φ₁ = πV₁/V_π</div>
                  </div>
                  <div className="text-laser-green text-sm">↓</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-laser-purple text-sm">↓</div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-20 bg-laser-purple/50 rounded mb-1" />
                    <div className="px-2 py-1 border border-laser-purple/30 rounded bg-laser-purple/5 text-xs text-laser-purple">
                      下臂 + 电极 V₂
                    </div>
                    <div className="text-xs text-lab-muted mt-1">相位 φ₂ = πV₂/V_π</div>
                  </div>
                  <div className="text-laser-purple text-sm">↓</div>
                </div>
              </div>
              {/* 合束器和输出 */}
              <div className="flex items-center justify-center gap-3">
                <div className="text-laser-cyan">→</div>
                <div className="px-3 py-2 border border-laser-cyan/50 rounded-lg bg-laser-cyan/10 text-sm font-semibold text-laser-cyan">
                  3dB 合束器
                </div>
                <div className="text-laser-cyan">→</div>
                <div className="text-lab-muted text-sm w-16">输出光 E_out</div>
              </div>
              {/* 公式 */}
              <div className="text-center mt-4 bg-lab-surface/50 p-3 rounded-lg">
                <MathRenderer>{'$$E_{out} = \\frac{E_{in}}{2} \\left( e^{j\\phi_1} + e^{j\\phi_2} \\right)$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">两束光在合束器处产生干涉，输出强度取决于相位差 Δφ = φ₁ - φ₂</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">核心组成部分：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">3dB 分束器：</span>将输入光等功率分为两束</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">相位调制臂（两臂）：</span>通过电光效应改变光的相位</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span><span className="text-laser-purple font-medium">3dB 合束器：</span>将两束光重新汇合</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">材料平台：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span><span className="text-laser-red font-medium"><TermNote term="铌酸锂" /> (LiNbO₃)：</span>传统方案，电光系数大</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium"><TermNote term="硅光" /> (Si)：</span>集成度高，CMOS 兼容</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">磷化铟 (InP)：</span>可单片集成激光器</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" title="工作原理与转移函数">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZM 的核心原理是：通过施加电压改变相位调制臂的折射率，
            从而改变两臂的相位差，进而控制输出光的强度。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_{out} = \\frac{E_{in}}{2} \\left[ e^{j\\phi_1} + e^{j\\phi_2} \\right]$$'}</MathRenderer>
          </div>
          <p>
            设两臂的相位分别为 φ₁ 和 φ₂，令 Δφ = φ₁ - φ₂ 为两臂相位差，则输出光强为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$P_{out} = P_{in} \\cdot \\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right) = \\frac{P_{in}}{2} \\left[ 1 + \\cos(\\Delta\\phi) \\right]$$'}</MathRenderer>
          </div>
          <p>
            这个公式在所有调制模式下都成立——区别仅在于驱动方式如何决定 Δφ。
          </p>
        </div>
      </LearnSection>

      <LearnSection icon={<Zap className="w-5 h-5 text-laser-cyan" />} title="三种调制模式">
        <div className="space-y-6 text-lab-muted leading-relaxed">
          <div className="border border-laser-green/30 bg-laser-green/5 p-5 rounded-xl">
            <h3 className="font-semibold text-laser-green mb-2">单臂调制 (Single-Arm Modulation)</h3>
            <div className="space-y-3">
              <p>
                仅在其中一臂施加调制电压，另一臂作为纯光程参考臂（无电极）。
                这是最简的驱动方式，相位差 Δφ 完全由调制臂决定。
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$\\phi_1 = 0, \\quad \\phi_2 = \\frac{\\pi V}{V_\\pi}, \\quad \\Delta\\phi = \\frac{\\pi V}{V_\\pi}$$'}</MathRenderer>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-2">
                <div className="bg-lab-bg/40 p-3 rounded-lg">
                  <h4 className="text-lab-text text-sm font-medium mb-1">优点</h4>
                  <ul className="text-xs space-y-0.5">
                    <li>结构最简单，仅需一组电极</li>
                    <li>驱动电路复杂度最低</li>
                    <li>适用于低速场景和传感应用</li>
                  </ul>
                </div>
                <div className="bg-lab-bg/40 p-3 rounded-lg">
                  <h4 className="text-lab-text text-sm font-medium mb-1">缺点</h4>
                  <ul className="text-xs space-y-0.5">
                    <li>调制效率低（等效 <TermNote term="Vπ" /> = V_π）</li>
                    <li>会产生<TermNote term="啁啾" />（频率漂移）</li>
                    <li>不适合高速长距离传输</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-laser-purple/30 bg-laser-purple/5 p-5 rounded-xl">
            <h3 className="font-semibold text-laser-purple mb-2">双臂调制 (Dual-Arm Modulation)</h3>
            <div className="space-y-3">
              <p>
                两臂分别独立施加调制电压 V₁ 和 V₂。相位差 Δφ = φ₁ - φ₂ 由两臂信号共同决定。
                双臂调制提供了最大的灵活性。
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$\\phi_1 = \\frac{\\pi V_1}{V_\\pi}, \\quad \\phi_2 = \\frac{\\pi V_2}{V_\\pi}, \\quad \\Delta\\phi = \\frac{\\pi (V_1 - V_2)}{V_\\pi}$$'}</MathRenderer>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-2">
                <div className="bg-lab-bg/40 p-3 rounded-lg">
                  <h4 className="text-lab-text text-sm font-medium mb-1">优点</h4>
                  <ul className="text-xs space-y-0.5">
                    <li>灵活性最高，可独立控制每臂相位</li>
                    <li>可抑制或产生可控啁啾</li>
                    <li>为 IQ 调制器奠定结构基础</li>
                  </ul>
                </div>
                <div className="bg-lab-bg/40 p-3 rounded-lg">
                  <h4 className="text-lab-text text-sm font-medium mb-1">缺点</h4>
                  <ul className="text-xs space-y-0.5">
                    <li>需要两组独立的驱动电路</li>
                    <li>调制效率与单臂相同（V_π）</li>
                    <li>两路信号的时序同步要求高</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-laser-orange/30 bg-laser-orange/5 p-5 rounded-xl">
            <h3 className="font-semibold text-laser-orange mb-2">推挽调制 (Push-Pull)</h3>
            <div className="space-y-3">
              <p>
                双臂调制的特例：V₂ = -V₁（即反相驱动）。两臂的相位变化量分别为 +Δφ/2 和 -Δφ/2。
                总相位差 Δφ 加倍，等效半波电压降至 V_π/2，调制效率翻倍。
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$\\phi_1 = +\\frac{\\pi V}{V_\\pi}, \\quad \\phi_2 = -\\frac{\\pi V}{V_\\pi}, \\quad \\Delta\\phi = \\frac{2\\pi V}{V_\\pi}$$'}</MathRenderer>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-2">
                <div className="bg-lab-bg/40 p-3 rounded-lg">
                  <h4 className="text-lab-text text-sm font-medium mb-1">优点</h4>
                  <ul className="text-xs space-y-0.5">
                    <li>调制效率最高（等效 V_π/2）</li>
                    <li>有效抑制啁啾，传输性能好</li>
                    <li>高速光通信系统最常用方案</li>
                  </ul>
                </div>
                <div className="bg-lab-bg/40 p-3 rounded-lg">
                  <h4 className="text-lab-text text-sm font-medium mb-1">要求</h4>
                  <ul className="text-xs space-y-0.5">
                    <li>需要差分驱动电路</li>
                    <li>两臂必须严格对称</li>
                    <li>灵活性不如双臂独立控制</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg mt-4">
            <p className="text-sm">
              <strong>核心关系</strong>：无论采用哪种模式，输出光强都由相同的转移函数决定：
              P_out = P_in · cos²(Δφ/2)。三种模式的区别在于如何通过电压驱动产生 Δφ，
              从而影响了调制效率、啁啾特性和驱动复杂度。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" title="工作点与偏置">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZM 的转移函数是周期性的余弦平方曲线。直流偏置电压决定了调制器的静态工作点，
            不同的工作点有不同的特性。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">正交点 (Quadrature)</h4>
              <div className="text-sm text-lab-muted mb-2">
                V_bias = V_π/2，Δφ = π/2
              </div>
              <div className="text-sm">
                <span className="text-lab-text">特点：</span>
                线性度最好，适合模拟调制。输出光强为输入的一半。
              </div>
            </div>
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">零光点 (Null)</h4>
              <div className="text-sm text-lab-muted mb-2">
                V_bias = V_π，Δφ = π
              </div>
              <div className="text-sm">
                <span className="text-lab-text">特点：</span>
                输出光强最小（消光状态）。适合数字调制的"0"电平。
              </div>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">峰值点 (Peak)</h4>
              <div className="text-sm text-lab-muted mb-2">
                V_bias = 0，Δφ = 0
              </div>
              <div className="text-sm">
                <span className="text-lab-text">特点：</span>
                输出光强最大。适合数字调制的"1"电平。
              </div>
            </div>
          </div>
          <p className="mt-4">
            在实际应用中，MZM 通常偏置在正交点以获得最大的线性调制范围。
            偏置点的稳定性直接影响系统性能，因此需要偏置控制电路来维持稳定的工作点。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-5" title="性能指标">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">半波电压 V_π</h4>
              <p className="text-sm">
                使输出光强从最大变到最小（或反之）所需的电压。
                V_π 越小，调制效率越高，驱动功耗越低。
                推挽模式下等效 V_π 降为单臂的一半。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2"><TermNote term="消光比" /> ER</h4>
              <p className="text-sm">
                输出最大光功率与最小光功率的比值，通常用 dB 表示。
                消光比越高，"0"和"1"的区分度越好。
              </p>
              <div className="bg-lab-surface/50 px-3 py-1.5 rounded-lg mt-2 text-xs font-mono">
                ER = 10·log₁₀(P_max/P_min)
              </div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2"><TermNote term="调制带宽" /></h4>
              <p className="text-sm">
                调制器能够有效工作的最高频率。由电极结构、微波损耗等决定。
                现代高速调制器带宽可达 100 GHz 以上。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2"><TermNote term="插入损耗" /></h4>
              <p className="text-sm">
                光通过调制器后的功率损失。包括耦合损耗、传播损耗等。
                插入损耗越低，系统功率预算越充足。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-2">行波电极 (Traveling-Wave Electrode)</h4>
            <p className="text-sm">
              高速 MZM 中普遍采用<TermNote term="行波电极" />结构：电极被设计为共面波导 (CPW) 传输线，
              调制信号以行波形式沿电极传播，与光波在同方向传播，从而实现分布式的电光相互作用。
            </p>
            <p className="text-sm mt-2">
              <span className="text-lab-text font-medium">速度匹配：</span>行波电极的关键要求是微波信号的速度与光波速度尽可能一致。
              如果速度不匹配，光波在不同位置感受到的调制电场不同步，导致有效调制长度受限，带宽下降。
            </p>
            <p className="text-sm mt-2">
              <span className="text-lab-text font-medium">微波损耗：</span>随频率升高，电极导体的趋肤效应和介质的介电损耗会逐渐增大，
              使得微波信号沿电极传播时幅度衰减。微波损耗是限制调制带宽的主要因素之一，
              现代设计通过优化电极几何尺寸和材料来降低损耗。
            </p>
            <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2">
              <MathRenderer>{'$$f_{3dB} \\propto \\frac{1}{L \\cdot \\alpha_m}$$'}</MathRenderer>
              <p className="text-xs mt-1">
                其中 L 是电极长度，α_m 是微波损耗系数。更长的工作长度 → 更低的 V_π
                但更小的带宽，因此 V_π 与带宽之间存在权衡。
              </p>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-6" title="三种模式综合对比">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">特性</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">单臂调制</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">双臂调制</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">推挽调制</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-lab-muted">驱动臂</td>
                  <td className="py-2 px-3 text-laser-cyan">下臂</td>
                  <td className="py-2 px-3 text-laser-purple">两臂独立</td>
                  <td className="py-2 px-3 text-laser-orange">两臂反相</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-lab-muted">相位差 Δφ</td>
                  <td className="py-2 px-3 font-mono">πV/V_π</td>
                  <td className="py-2 px-3 font-mono">π(V₁-V₂)/V_π</td>
                  <td className="py-2 px-3 font-mono">2πV/V_π</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-lab-muted">等效 V_π</td>
                  <td className="py-2 px-3">V_π</td>
                  <td className="py-2 px-3">V_π</td>
                  <td className="py-2 px-3 text-laser-green">V_π/2</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-lab-muted">啁啾特性</td>
                  <td className="py-2 px-3 text-laser-red">有啁啾</td>
                  <td className="py-2 px-3 text-laser-orange">可控</td>
                  <td className="py-2 px-3 text-laser-green">无啁啾</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-lab-muted">驱动复杂度</td>
                  <td className="py-2 px-3 text-laser-green">简单</td>
                  <td className="py-2 px-3 text-laser-red">双通道</td>
                  <td className="py-2 px-3 text-laser-orange">差分</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-lab-muted">典型应用</td>
                  <td className="py-2 px-3">低速 / 传感</td>
                  <td className="py-2 px-3">IQ 调制器</td>
                  <td className="py-2 px-3 text-laser-green">高速通信</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-7" title="偏置控制与啁啾">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">偏置点稳定性</h4>
              <p className="text-sm mb-2">
                温度变化、波导老化、光折变效应会导致偏置点缓慢移动，使调制器偏离最佳工作点。
                常见的偏置控制方法包括：
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside">
                <li><span className="text-lab-text">热光调相：</span>加热器调相，功耗数 mW，μs 级响应</li>
                <li><span className="text-lab-text">电光调相：</span>Pockels 效应，ns 级快速响应</li>
                <li><span className="text-lab-text">闭环反馈：</span>PID 算法 + 导频信号，补偿长期漂移</li>
                <li><span className="text-lab-text">差分驱动：</span>高速 DAC 互补输出，抑制共模噪声</li>
              </ul>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">啁啾 (Chirp)</h4>
              <p className="text-sm mb-2">
                调制过程中产生的瞬时频率漂移会导致脉冲展宽，限制传输距离。
                不同调制模式的啁啾特性差异显著：
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside">
                <li><span className="text-lab-text">单臂调制：</span>啁啾最大，脉冲展宽严重</li>
                <li><span className="text-lab-text">双臂调制：</span>可设计为无啁啾或利用啁啾补偿色散</li>
                <li><span className="text-lab-text">推挽调制：</span>对称驱动，啁啾完全抑制</li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-8" title="从 MZM 到 IQ 调制器">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            MZM 只能调制光的强度（幅度），但光作为电磁波，还有相位、偏振等维度可以利用。
            为了进一步提高频谱效率，我们需要更复杂的调制方式——
            <span className="text-laser-purple font-semibold">IQ 正交调制</span>。
          </p>
          <p>
            IQ 调制器由<strong>两个 MZM 子调制器</strong>和一个 <strong>90° 移相器</strong>组成。
            每个子 MZM 都可以在其双臂上独立驱动。通过将双臂调制模式与正交偏置结合，
            IQ 调制器可以独立控制光信号的 I 分量和 Q 分量，从而实现 QPSK、QAM 等高级调制格式。
          </p>
          <div className="bg-lab-bg/50 p-4 rounded-lg mt-2">
            <p className="text-sm">
              在下一章中，我们将详细学习 IQ 调制器的结构和驱动方式，
              以及它如何用两个 MZM 实现幅度和相位的独立控制。
            </p>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
