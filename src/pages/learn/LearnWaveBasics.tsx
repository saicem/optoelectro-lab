import { BookOpen, Lightbulb, Zap, Waves, Search, Sparkles, Radio } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { CHAPTERS, TOTAL_CHAPTERS } from '@/constants/chapters';

const pageSections = [
  { id: 's-0', title: '电磁波谱与光通信波段' },
  { id: 's-1', title: '光波的基本物理量' },
  { id: 's-2', title: '简谐光波的数学描述' },
  { id: 's-3', title: '相位与相位差' },
  { id: 's-4', title: '折射率：光与物质的相互作用' },
  { id: 's-5', title: '从基础到调制' },
];

const bandData = [
  { label: 'O-band', wl: '1260–1360 nm', color: 'bg-laser-cyan/30', border: 'border-laser-cyan/50', text: 'text-laser-cyan' },
  { label: 'E-band', wl: '1360–1460 nm', color: 'bg-laser-green/30', border: 'border-laser-green/50', text: 'text-laser-green' },
  { label: 'S-band', wl: '1460–1530 nm', color: 'bg-laser-purple/30', border: 'border-laser-purple/50', text: 'text-laser-purple' },
  { label: 'C-band', wl: '1530–1565 nm', color: 'bg-laser-red/30', border: 'border-laser-red/50', text: 'text-laser-red' },
  { label: 'L-band', wl: '1565–1625 nm', color: 'bg-laser-orange/30', border: 'border-laser-orange/50', text: 'text-laser-orange' },
];

export default function LearnWaveBasics() {
  const currentIndex = CHAPTERS.findIndex(c => c.path === ROUTES.LEARN.WAVE_BASICS)
  const nextChapter = currentIndex < TOTAL_CHAPTERS - 1 ? { path: CHAPTERS[currentIndex + 1].path, title: CHAPTERS[currentIndex + 1].title, icon: <BookOpen className="w-4 h-4" /> } : undefined
  return (
    <LearnLayout
      title="光波基础与物理量"
      subtitle="从电磁波谱出发，理解光波的基本物理量、数学描述与折射率概念"
      currentIndex={currentIndex}
      totalChapters={TOTAL_CHAPTERS}
      partTitle="Part 1 · 基础篇"
      nextChapter={nextChapter}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Radio className="w-5 h-5 text-laser-cyan" />} title="电磁波谱与光通信波段">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光是电磁波谱中的一部分。整个电磁波谱按频率从低到高（波长从长到短）排列，
            包括无线电波、微波、红外光、可见光、紫外光、X 射线和 γ 射线。
            光通信使用的波长集中在近红外区域（<span className="text-laser-cyan font-mono">~800–1700 nm</span>）。
          </p>

          <div className="overflow-x-auto py-3">
            <div className="min-w-[600px]">
              <div className="relative h-8 rounded-lg overflow-hidden flex">
                <div className="flex-1 bg-red-900/60" />
                <div className="flex-1 bg-orange-800/60" />
                <div className="flex-1 bg-yellow-700/60" />
                <div className="flex-1 bg-laser-cyan/60" />
                <div className="flex-[0.3] bg-indigo-600/60" />
                <div className="flex-[0.3] bg-purple-700/60" />
                <div className="flex-[0.2] bg-pink-800/60" />
              </div>
              <div className="flex text-[10px] text-lab-muted mt-1">
                <span className="flex-1 text-left">无线电波</span>
                <span className="flex-1 text-center">微波</span>
                <span className="flex-1 text-center">红外</span>
                <span className="flex-1 text-center text-laser-cyan font-semibold">可见光</span>
                <span className="flex-[0.3] text-center">紫外</span>
                <span className="flex-[0.3] text-center">X 射线</span>
                <span className="flex-[0.2] text-right">γ 射线</span>
              </div>
            </div>
          </div>

          <p>
            在近红外区域，光通信根据波长划分了多个标准波段。
            其中 <span className="text-laser-red font-semibold">C 波段</span>（Conventional Band）
            因为处于石英光纤的最低损耗窗口，成为长距离光通信的主力波段。
          </p>

          <div className="grid grid-cols-5 gap-2 mt-3">
            {bandData.map(band => (
              <div key={band.label} className={`${band.color} ${band.border} rounded-lg p-3 text-center border`}>
                <div className={`text-xs font-bold ${band.text}`}>{band.label}</div>
                <div className="text-[10px] text-lab-muted mt-0.5 font-mono">{band.wl}</div>
              </div>
            ))}
          </div>

          <div className="bg-lab-bg/50 p-4 rounded-lg mt-2">
            <h4 className="font-semibold text-lab-text mb-2 text-sm">光通信波段速览</h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-laser-cyan font-mono w-14 text-xs">O-band</span>
                <span className="text-xs text-lab-muted">Original — 零色散窗口，最早用于光通信</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-laser-green font-mono w-14 text-xs">E-band</span>
                <span className="text-xs text-lab-muted">Extended — 水吸收峰高，损耗较大</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-laser-purple font-mono w-14 text-xs">S-band</span>
                <span className="text-xs text-lab-muted">Short wavelength — 短波长方向扩展</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-laser-red font-mono w-14 text-xs">C-band</span>
                <span className="text-xs text-lab-muted">Conventional — 最低损耗 (~0.2 dB/km)，长距离骨干网</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-laser-orange font-mono w-14 text-xs">L-band</span>
                <span className="text-xs text-lab-muted">Long wavelength — 长波长扩展，用于 DWDM 扩容</span>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Lightbulb className="w-5 h-5 text-laser-cyan" />} title="光波的基本物理量">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光是一种电磁波，在真空中的传播速度为恒定值 <span className="text-laser-cyan font-mono">c ≈ 3×10⁸ m/s</span>。
            波长、频率与光速满足基本关系：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$c = \\lambda \\cdot f$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">λ</span> 为波长，
            <span className="text-laser-green font-mono">f</span> 为频率。
            光子的能量由普朗克关系给出：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E = hf = \\frac{hc}{\\lambda}$$'}</MathRenderer>
          </div>
          <p>
            <span className="text-laser-cyan font-mono">h ≈ 6.626×10⁻³⁴ J·s</span> 为普朗克常数。
            频率越高（波长越短），光子携带的能量越大。在 C 波段标准波长 1550 nm 处，
            光子能量约为 <span className="text-laser-purple font-mono">0.8 eV</span>。
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-laser-red mb-1">~380–780 nm</div>
              <div className="text-sm text-lab-muted">可见光波长范围</div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-laser-cyan mb-1">~430–790 THz</div>
              <div className="text-sm text-lab-muted">可见光频率范围</div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-laser-purple mb-1">~1.6–3.3 eV</div>
              <div className="text-sm text-lab-muted">光子能量范围</div>
            </div>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">电场与调制的关系</h3>
          <p>
            电场强度 <span className="text-laser-cyan font-mono">E</span> 描述了空间中某点
            所受电场力的大小和方向。在均匀电场中，电场强度与电压和距离的关系为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E = \\frac{V}{d}$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">V</span> 为外加电压，
            <span className="text-laser-green font-mono">d</span> 为电极间距。
            在光调制器中，外加电压在电极之间产生电场，通过 <TermNote term="电光效应" /> 改变材料的折射率，
            从而实现对光波的相位调制——这是几乎所有高速光调制器的核心原理。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<Zap className="w-5 h-5 text-laser-green" />} title="简谐光波的数学描述">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            单色平面波可以用简谐函数来描述。沿 <span className="text-laser-cyan font-mono">z</span> 方向传播的光波，
            其电场随空间和时间的完整表达式为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E(z,t) = E_0 \\cos(\\omega t - kz + \\phi_0)$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">各参数含义</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan font-mono">E₀</span>
                  <span>— 电场振幅，决定光强</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green font-mono">ω = 2πf</span>
                  <span>— 角频率，单位 rad/s</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple font-mono">k = 2π/λ</span>
                  <span>— 波数，描述空间周期性</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-orange font-mono">φ₀</span>
                  <span>— 初相位，决定 t=0 时刻的振动状态</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">光强与振幅</h4>
              <p className="text-sm mb-2">
                光的强度（能流密度）与振幅的平方成正比：
              </p>
              <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
                <MathRenderer>{'$$I \\propto |E_0|^2$$'}</MathRenderer>
              </div>
              <p className="text-sm mt-2">
                这一关系是强度调制的物理基础——通过改变振幅即可控制光强，
                从而将信息编码到光载波上。
              </p>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<Waves className="w-5 h-5 text-laser-purple" />} title="相位与相位差">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            相位是波动的核心概念，它描述了振动在某一时刻所处的状态——是波峰、波谷还是中间某处。
            两束光之间的<span className="text-laser-cyan font-semibold">相位差</span>
            决定了它们相遇时是相互加强还是相互削弱，这正是干涉的本质。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta\\phi = \\phi_1 - \\phi_2 = \\frac{2\\pi}{\\lambda} \\cdot \\Delta L$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan">ΔL</span> 是两束光的<TermNote term="光程差" />。
            当光程差为波长的整数倍时，相位差为 2π 的整数倍，两束光同相，发生<TermNote term="相长干涉" />；
            当光程差为半波长的奇数倍时，相位差为 π 的奇数倍，两束光反相，发生<TermNote term="相消干涉" />。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">相长干涉（加强）</h4>
              <div className="text-sm text-lab-muted">
                相位差 Δφ = 2kπ (k 为整数)
                <br />
                光程差 ΔL = kλ
              </div>
            </div>
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">相消干涉（削弱）</h4>
              <div className="text-sm text-lab-muted">
                相位差 Δφ = (2k+1)π
                <br />
                光程差 ΔL = (2k+1)λ/2
              </div>
            </div>
          </div>
          <p className="text-sm mt-2">
            马赫-曾德调制器正是利用这一原理：通过电光效应改变其中一臂的折射率，
            引入受控的相位差，从而将相位调制转换为强度调制。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Search className="w-5 h-5 text-laser-orange" />} title="折射率：光与物质的相互作用">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            折射率是描述光在介质中传播速度变化的基本物理量，它架起了光和物质相互作用的桥梁。
          </p>
          <h4 className="font-semibold text-lab-text">折射率的定义</h4>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$n = \\frac{c}{v}$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">n</span> 为折射率，
            <span className="text-laser-green font-mono">c</span> 为真空光速，
            <span className="text-laser-purple font-mono">v</span> 为光在介质中的传播速度。
            由于 <span className="text-laser-purple font-mono">v ≤ c</span>，
            所有介质的折射率均 <span className="text-laser-cyan font-semibold">n ≥ 1</span>。
          </p>

          <div className="grid md:grid-cols-4 gap-3 mt-3">
            <div className="bg-lab-bg/50 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-laser-cyan">≈ 1.0003</div>
              <div className="text-xs text-lab-muted">空气 (标准状态)</div>
            </div>
            <div className="bg-lab-bg/50 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-laser-green">≈ 1.33</div>
              <div className="text-xs text-lab-muted">水</div>
            </div>
            <div className="bg-lab-bg/50 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-laser-purple">≈ 1.44</div>
              <div className="text-xs text-lab-muted">石英玻璃 (SiO₂)</div>
            </div>
            <div className="bg-lab-bg/50 p-3 rounded-xl text-center">
              <div className="text-lg font-bold text-laser-red">≈ 2.2</div>
              <div className="text-xs text-lab-muted">铌酸锂 (LiNbO₃)</div>
            </div>
          </div>

          <h4 className="font-semibold text-lab-text pt-2">折射率在光调制中的核心作用</h4>
          <p>
            折射率并非固定不变——它可以通过外加电场来改变，这就是<span className="text-laser-green font-semibold">电光效应</span>。
            对于某些晶体（如铌酸锂），折射率的变化与外加电场呈线性关系（普克尔效应）：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta n = -\\frac{1}{2} n^3 r E$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">n</span> 是材料的折射率，
            <span className="text-laser-green font-mono">r</span> 是电光系数（材料固有属性），
            <span className="text-laser-purple font-mono">E</span> 是外加电场强度。
            折射率的微小变化会导致光在介质中传播时积累显著的相位变化：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\Delta\\phi = \\frac{2\\pi}{\\lambda} \\cdot \\Delta n \\cdot L$$'}</MathRenderer>
          </div>
          <p>
            光调制器正是通过外加电信号控制折射率、进而控制光相位，
            最终实现将电信号"写入"光载波的目标。
          </p>

          <div className="border border-laser-cyan/20 bg-laser-cyan/5 p-4 rounded-xl mt-2">
            <h4 className="font-semibold text-laser-cyan text-sm mb-1">折射率 vs. 波长（色散）</h4>
            <p className="text-sm text-lab-muted">
              折射率还随光波长变化而变化，这一现象称为<span className="text-lab-text font-medium">色散</span>。
              在光纤中，不同波长的光传播速度不同，导致脉冲展宽。
              这是光通信系统设计中的重要考虑因素。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<Sparkles className="w-5 h-5 text-laser-purple" />} title="从基础到调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在光通信系统中，我们需要将电信号加载到光载波上进行传输，
            这个过程叫做<span className="text-laser-purple font-semibold">光调制</span>。
            理解了光波的基本物理量、相位和折射率概念之后，现在就来看看我们可以利用光的哪些属性来编码信息。
          </p>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">光调制的三个维度</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-laser-cyan/10 p-4 rounded-lg border border-laser-cyan/30">
                  <div className="text-sm font-semibold text-laser-cyan mb-2">强度（幅度）</div>
                  <p className="text-xs text-lab-muted">
                    最简单的调制方式。控制光的亮/暗来表示 0/1。
                    直接调制和强度调制器都属于这类。
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-green/10 p-4 rounded-lg border border-laser-green/30">
                  <div className="text-sm font-semibold text-laser-green mb-2">相位</div>
                  <p className="text-xs text-lab-muted">
                    通过改变折射率来控制光的相位。结合强度调制可实现 IQ 正交调制，
                    大幅提升频谱效率。
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-purple/10 p-4 rounded-lg border border-laser-purple/30">
                  <div className="text-sm font-semibold text-laser-purple mb-2">偏振</div>
                  <p className="text-xs text-lab-muted">
                    利用光的两个正交偏振态作为独立信道。偏振复用可使容量再翻一倍。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text"><TermNote term="直接调制" /> vs <TermNote term="外部调制" /></h4>
                <p className="text-sm">
                  直接调制通过改变激光器的注入电流来调制光强，简单但速率受限、会产生<TermNote term="啁啾" />。
                  外部调制器则对连续输出的激光进行调制，可实现更高的调制速率和更好的性能。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">电光效应的工程实现</h4>
                <p className="text-sm">
                  基于电光效应的外部调制器是高速光通信的核心器件。
                  通过将电光晶体（如铌酸锂）集成在干涉仪结构中，
                  电信号的变化被精确地转换为光强度的变化——这就是马赫-曾德调制器的基本原理，
                  后续章节将详细讲解。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">调制技术的发展路径</h4>
                <p className="text-sm">
                  从简单的强度调制（OOK），到复杂的 IQ 正交调制（QPSK/QAM），再到偏振复用（PDM），
                  光调制技术不断进步，使得单根光纤的传输容量从 Gb/s 量级提升到 Tb/s 甚至 Pb/s 量级。
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="px-2 py-1 bg-laser-cyan/10 rounded">OOK</span>
                  <span className="text-laser-cyan">→</span>
                  <span className="px-2 py-1 bg-laser-green/10 rounded">QPSK</span>
                  <span className="text-laser-cyan">→</span>
                  <span className="px-2 py-1 bg-laser-purple/10 rounded">16QAM</span>
                  <span className="text-laser-cyan">→</span>
                  <span className="px-2 py-1 bg-laser-red/10 rounded">PDM-16QAM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
