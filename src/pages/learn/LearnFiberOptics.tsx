import { Waves, Cable, BarChart3, GitFork, Zap, Compass } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '光纤的结构与原理' },
  { id: 's-1', title: '单模光纤与多模光纤' },
  { id: 's-2', title: '光纤损耗' },
  { id: 's-3', title: '色度色散' },
  { id: 's-4', title: '非线性效应' },
  { id: 's-5', title: '保偏光纤' },
];

export default function LearnFiberOptics() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN.FIBER_OPTICS,
  );
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="光纤与光波导"
      subtitle="光在光纤中的传播：全内反射、单模与多模、损耗、色散与非线性效应"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 2 · 光源与传输篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Waves className="w-5 h-5 text-laser-cyan" />} title="光纤的结构与原理">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光纤（Optical Fiber）是光通信系统的传输介质，由高纯度的石英玻璃制成。 典型的光纤由三层结构组成：最内层的
            <span className="text-laser-cyan font-semibold">纤芯（Core）</span>、 中间层的
            <span className="text-laser-green font-semibold">包层（Cladding）</span>和 最外层的
            <span className="text-laser-purple font-semibold">涂覆层（Coating）</span>。
            纤芯的折射率略高于包层，这是实现光约束的关键。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-6 text-center">光纤三层结构</h4>
            <div className="flex items-center justify-center">
              <div className="relative w-56 h-56">
                <div className="absolute inset-0 rounded-full border-4 border-laser-purple/40"></div>
                <div className="absolute inset-4 rounded-full border-4 border-laser-green/50"></div>
                <div className="absolute inset-12 rounded-full border-4 border-laser-cyan/60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-laser-cyan/30"></div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-laser-purple text-xs font-medium whitespace-nowrap">
                  涂覆层 (250 μm)
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-24 text-laser-green text-xs font-medium whitespace-nowrap">
                  包层 (125 μm)
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-20 text-laser-cyan text-xs font-medium whitespace-nowrap">
                  纤芯 (8-50 μm)
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mt-4 text-xs">
              <div className="text-center">
                <span className="text-laser-cyan font-semibold">纤芯</span>
                <p className="text-lab-muted mt-1">n₁ ≈ 1.467</p>
                <p className="text-lab-muted">传输光信号</p>
              </div>
              <div className="text-center">
                <span className="text-laser-green font-semibold">包层</span>
                <p className="text-lab-muted mt-1">n₂ ≈ 1.462</p>
                <p className="text-lab-muted">形成全反射界面</p>
              </div>
              <div className="text-center">
                <span className="text-laser-purple font-semibold">涂覆层</span>
                <p className="text-lab-muted mt-1">丙烯酸酯</p>
                <p className="text-lab-muted">机械保护</p>
              </div>
            </div>
          </div>
          <p>
            光纤导光的核心物理机制是
            <span className="text-laser-cyan font-semibold">
              <TermNote term="全内反射" />
              （Total Internal Reflection, TIR）
            </span>
            。 当光从高折射率介质（纤芯）射向低折射率介质（包层）时，若入射角大于临界角，光将完全被反射回纤芯，
            从而被约束在纤芯中沿轴向传播。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\theta_c = \\arcsin\\left(\\frac{n_2}{n_1}\\right)$$'}</MathRenderer>
            <p className="text-sm mt-2">
              临界角 θ_c 由纤芯折射率 n₁ 和包层折射率 n₂ 决定。只有当入射角 θ &gt; θ_c 时，才能发生全内反射。
            </p>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">数值孔径 (Numerical Aperture, NA)</h4>
            <p className="text-sm mb-3">
              <TermNote term="数值孔径" />
              （NA）是衡量光纤集光能力的关键参数，定义为光纤所能接收的光锥角的正弦值：
            </p>
            <MathRenderer>
              {'$$\\text{NA} = \\sin\\theta_a = \\sqrt{n_1^2 - n_2^2} \\approx n_1\\sqrt{2\\Delta}$$'}
            </MathRenderer>
            <div className="grid md:grid-cols-2 gap-4 mt-3 text-xs">
              <div className="space-y-1">
                <p>
                  <span className="text-laser-cyan font-mono">θ_a</span> — 接收角（最大入射角）
                </p>
                <p>
                  <span className="text-laser-green font-mono">n₁</span> — 纤芯折射率
                </p>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-laser-purple font-mono">n₂</span> — 包层折射率
                </p>
                <p>
                  <span className="text-laser-red font-mono">Δ</span> — 相对折射率差 (n₁−n₂)/n₁
                </p>
              </div>
            </div>
            <p className="text-sm mt-3">
              单模光纤的 NA 通常约为 0.12（接收角约 6.9°），多模光纤的 NA 约为 0.27（接收角约 15.7°）。 NA
              越大，光纤收集光的能力越强，但也会导致更大的模间色散。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Cable className="w-5 h-5 text-laser-purple" />} title="单模光纤与多模光纤">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            根据纤芯中允许传播的电磁模式数量，光纤可分为
            <span className="text-laser-purple font-semibold">单模光纤（SMF）</span>和
            <span className="text-laser-cyan font-semibold">多模光纤（MMF）</span>两大类。 这一区别本质上由归一化频率（V
            参数）决定：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {'$$V = \\frac{2\\pi a}{\\lambda} \\cdot \\text{NA} = \\frac{2\\pi a}{\\lambda} \\sqrt{n_1^2 - n_2^2}$$'}
            </MathRenderer>
            <p className="text-sm mt-2">
              其中 a 是纤芯半径，λ 是工作波长。当 V &lt; 2.405 时，光纤只支持基模（LP₀₁）传播，即单模光纤。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">单模光纤 (SMF)</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <span className="text-laser-purple">•</span> 纤芯直径：8-10 μm
                </li>
                <li>
                  <span className="text-laser-purple">•</span> 包层直径：125 μm（标准）
                </li>
                <li>
                  <span className="text-laser-purple">•</span> 工作波长：1310 nm / 1550 nm
                </li>
                <li>
                  <span className="text-laser-purple">•</span> 无模间色散，带宽极大
                </li>
                <li>
                  <span className="text-laser-purple">•</span> 长距离传输（40-100+ km）
                </li>
              </ul>
            </div>
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">多模光纤 (MMF)</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <span className="text-laser-cyan">•</span> 纤芯直径：50 μm 或 62.5 μm
                </li>
                <li>
                  <span className="text-laser-cyan">•</span> 包层直径：125 μm（标准）
                </li>
                <li>
                  <span className="text-laser-cyan">•</span> 工作波长：850 nm / 1300 nm
                </li>
                <li>
                  <span className="text-laser-cyan">•</span> 模间色散限制带宽
                </li>
                <li>
                  <span className="text-laser-cyan">•</span> 短距离传输（百米级）
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">模场直径 (MFD) 与截止波长</h4>
            <p className="text-sm mb-3">
              对于单模光纤，光并非完全限制在纤芯内，部分光会渗透到包层中。
              <span className="text-laser-purple font-semibold">
                <TermNote term="模场直径" />
                （Mode Field Diameter, MFD）
              </span>
              描述的是光场在光纤截面上的实际分布范围。对于标准 G.652 光纤，1550 nm 处的 MFD 约为 10.5 μm。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">模场直径近似</h5>
                <MathRenderer>
                  {'$$2\\omega_0 \\approx 2a \\left(0.65 + \\frac{1.619}{V^{3/2}} + \\frac{2.879}{V^6}\\right)$$'}
                </MathRenderer>
                <p className="text-xs text-lab-muted mt-2">2ω₀ 为模场直径，a 为纤芯半径，V 为归一化频率。</p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">截止波长</h5>
                <MathRenderer>{'$$\\lambda_c = \\frac{2\\pi a}{2.405} \\cdot \\text{NA}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">当 λ &gt; λ_c 时，高阶模截止，光纤工作于单模状态。</p>
              </div>
            </div>
            <p className="text-sm mt-3">
              实际工程中常用的单模光纤标准包括 G.652（标准单模光纤）、G.655（非零色散位移光纤） 和
              G.657（抗弯曲光纤），它们针对不同应用场景进行了优化。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<BarChart3 className="w-5 h-5 text-laser-red" />} title="光纤损耗">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光信号在光纤中传播时，功率会随距离指数衰减，这一现象称为
            <span className="text-laser-red font-semibold">光纤损耗</span>。 损耗系数 α 的单位是 dB/km，定义为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {
                '$$\\alpha \\left(\\frac{\\text{dB}}{\\text{km}}\\right) = \\frac{10}{L} \\log_{10}\\left(\\frac{P_{in}}{P_{out}}\\right)$$'
              }
            </MathRenderer>
            <p className="text-sm mt-2">
              当代标准单模光纤在 1550 nm 窗口的损耗已低至 0.17 dB/km，这意味着传输 100 km 后光功率仅衰减约 97%。
            </p>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">光纤损耗谱与传输波段</h4>
            <p className="text-sm mb-3">
              光纤的损耗随波长变化，呈现出特有的损耗谱曲线。根据损耗特性，国际电信联盟（ITU）定义了以下光传输波段：
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lab-border">
                    <th className="text-left py-2 px-3 text-lab-text">波段</th>
                    <th className="text-left py-2 px-3 text-lab-text">波长范围</th>
                    <th className="text-left py-2 px-3 text-lab-text">损耗典型值</th>
                    <th className="text-left py-2 px-3 text-lab-text">主要用途</th>
                  </tr>
                </thead>
                <tbody className="text-lab-muted">
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 px-3">
                      <span className="text-laser-cyan font-semibold">O 波段</span>
                    </td>
                    <td className="py-2 px-3">1260 - 1360 nm</td>
                    <td className="py-2 px-3">0.32 - 0.35 dB/km</td>
                    <td className="py-2 px-3">零色散点，早期系统</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 px-3">
                      <span className="text-laser-green font-semibold">E 波段</span>
                    </td>
                    <td className="py-2 px-3">1360 - 1460 nm</td>
                    <td className="py-2 px-3">0.22 - 0.28 dB/km</td>
                    <td className="py-2 px-3">OH⁻ 吸收峰区域</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 px-3">
                      <span className="text-laser-purple font-semibold">S 波段</span>
                    </td>
                    <td className="py-2 px-3">1460 - 1530 nm</td>
                    <td className="py-2 px-3">0.19 - 0.22 dB/km</td>
                    <td className="py-2 px-3">短波长扩展</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 px-3">
                      <span className="text-laser-red font-semibold">C 波段</span>
                    </td>
                    <td className="py-2 px-3">1530 - 1565 nm</td>
                    <td className="py-2 px-3">≤ 0.17 dB/km</td>
                    <td className="py-2 px-3">长距离主干网（最低损耗）</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 px-3">
                      <span className="text-amber-400 font-semibold">L 波段</span>
                    </td>
                    <td className="py-2 px-3">1565 - 1625 nm</td>
                    <td className="py-2 px-3">0.17 - 0.25 dB/km</td>
                    <td className="py-2 px-3">C 波段扩展，大容量 WDM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">
                <TermNote term="瑞利散射" />
              </h4>
              <p className="text-sm">
                光纤制造过程中玻璃密度不均匀引起的微观折射率波动，使光向各个方向散射。 瑞利散射损耗与 λ⁻⁴
                成正比，是光纤损耗的<strong>基本下限</strong>。
              </p>
              <div className="bg-lab-surface/50 px-3 py-2 rounded-lg mt-2 text-xs">
                <MathRenderer>{'$$\\alpha_{Rayleigh} \\propto \\lambda^{-4}$$'}</MathRenderer>
              </div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">
                <TermNote term="吸收损耗" />
              </h4>
              <p className="text-sm">
                包括紫外吸收（电子跃迁）、红外吸收（分子振动）和 OH⁻ 杂质吸收。 现代光纤通过去除水分（干燥工艺）已将 OH⁻
                吸收峰大幅抑制。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">弯曲损耗</h4>
              <p className="text-sm">
                光纤弯曲时，全内反射条件被破坏，部分光会泄漏出纤芯。 分为宏弯损耗（大半径弯曲）和微弯损耗（微小形变）。
                抗弯曲光纤（G.657）对此进行了优化。
              </p>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<GitFork className="w-5 h-5 text-laser-green" />} title="色度色散">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">
              <TermNote term="色度色散" />
              （Chromatic Dispersion, CD）
            </span>
            是指光脉冲中不同频率（波长）的分量在光纤中传播速度不同，导致脉冲展宽的现象。
            色度色散是限制高速光通信系统传输距离的关键因素之一。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {'$$D = D_m + D_w \\quad \\left( \\frac{\\text{ps}}{\\text{nm} \\cdot \\text{km}} \\right)$$'}
            </MathRenderer>
            <p className="text-sm mt-2">
              总色散系数 D 是材料色散 D_m 与波导色散 D_w 之和。对于标准单模光纤 G.652， 1550 nm 处的色散系数约为 17
              ps/(nm·km)。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">
                <TermNote term="材料色散" />
              </h4>
              <p className="text-sm">
                由于石英玻璃的折射率随波长变化（即 n(λ) 不是常数），导致不同波长的光在光纤中传播速度不同。
                材料色散的本质是光与光纤材料中电子的相互作用：
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-2 text-xs">
                <MathRenderer>{'$$D_m = -\\frac{\\lambda}{c} \\frac{d^2 n}{d\\lambda^2}$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">在 1270 nm 附近材料色散为零，称为零色散波长。</p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">
                <TermNote term="波导色散" />
              </h4>
              <p className="text-sm">
                由于光在纤芯和包层中的传播速度不同，而不同频率的光在纤芯/包层中的能量分布比例不同，
                使有效折射率随频率变化而产生色散。波导色散与光纤的折射率剖面设计密切相关。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-2 text-xs">
                <MathRenderer>{'$$D_w = -\\frac{n_2\\Delta}{c\\lambda} V \\frac{d^2(Vb)}{dV^2}$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">b 为归一化传播常数，V 为归一化频率。</p>
            </div>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">色散斜率与零色散波长</h4>
            <p className="text-sm mb-3">
              色散系数 D 随波长变化，其变化率称为
              <span className="text-laser-green font-semibold">色散斜率（Dispersion Slope, S）</span>。 对于 G.652
              光纤，零色散波长 λ₀ 约为 1310 nm，在此波长处 D = 0：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">色散斜率定义</h5>
                <MathRenderer>{'$$S = \\frac{dD}{d\\lambda}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">G.652 光纤在 1550 nm 处的斜率 S₀ ≈ 0.058 ps/(nm²·km)。</p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">色散与波长的关系</h5>
                <MathRenderer>
                  {'$$D(\\lambda) = \\frac{S_0}{4}\\left(\\lambda - \\frac{\\lambda_0^4}{\\lambda^3}\\right)$$'}
                </MathRenderer>
                <p className="text-xs text-lab-muted mt-2">λ₀ 为零色散波长（约 1310 nm）。</p>
              </div>
            </div>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">色散补偿技术</h4>
            <p className="text-sm mb-3">
              由于 C 波段（1550 nm）在标准光纤中具有约 17 ps/(nm·km) 的色散，
              长距离传输后脉冲展宽严重，必须进行色散补偿。常用方法包括：
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-cyan text-sm mb-1">
                  <TermNote term="色散补偿光纤" /> (DCF)
                </h5>
                <p className="text-xs">
                  具有负色散系数的特种光纤（D ≈ −80 至 −100 ps/(nm·km)）， 串联在传输链路中抵消正色散。
                </p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-purple text-sm mb-1">光纤布拉格光栅 (FBG)</h5>
                <p className="text-xs">利用啁啾光栅对不同波长引入不同的时延， 实现色散补偿，结构紧凑。</p>
              </div>
              <div className="border border-laser-green/30 bg-laser-green/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-green text-sm mb-1">电子色散补偿 (EDC)</h5>
                <p className="text-xs">
                  在相干接收系统的 DSP 中通过 FIR 滤波器或频域均衡进行色散补偿， 灵活且不需要额外光学器件。
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Zap className="w-5 h-5 text-amber-400" />} title="非线性效应">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            当光纤中传输的光功率较高时，光纤材料的折射率会随光强发生变化，产生
            <span className="text-amber-400 font-semibold">
              <TermNote term="非线性效应" />
            </span>
            。 折射率与光强的依赖关系可表示为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$n = n_0 + n_2 \\cdot I$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 n₀ 是线性折射率，n₂ 是非线性折射率系数（石英玻璃约 2.6×10⁻²⁰ m²/W）， I 是光强。非线性效应的强度用
              <span className="text-amber-400 font-mono">非线性系数 γ</span> 描述：
            </p>
            <div className="mt-2">
              <MathRenderer>{'$$\\gamma = \\frac{2\\pi n_2}{\\lambda A_{eff}}$$'}</MathRenderer>
            </div>
            <p className="text-xs text-lab-muted mt-2">
              A_eff 是光纤的有效面积，标准 SMF 的 γ ≈ 1.1 W⁻¹·km⁻¹ (@1550 nm)。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-amber-400/30 bg-amber-400/5 p-4 rounded-xl">
              <h4 className="font-semibold text-amber-400 mb-2">
                <TermNote term="自相位调制" /> (SPM)
              </h4>
              <p className="text-sm mb-2">
                光脉冲自身的强度变化引起折射率变化，进而引起相位变化。
                相位变化又通过时间导数产生频率啁啾，使脉冲频谱展宽。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\phi_{NL}(t) = \\gamma P(t) L_{eff}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-1">P(t) 是瞬时功率，L_eff 是有效作用长度。</p>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                SPM 与色散相互作用——在反常色散区（1550 nm），SPM 引起的啁啾与色散效果相反， 可实现孤子传输。
              </p>
            </div>
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">
                <TermNote term="交叉相位调制" /> (XPM)
              </h4>
              <p className="text-sm mb-2">
                一个波长信道的光强变化通过克尔效应影响另一共存信道的相位。 在 WDM 系统中，XPM 是限制信道数量的重要因素。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\phi_{XPM}^{(j)} = 2\\gamma P_k(t) L_{eff}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-1">XPM 的效率是 SPM 的两倍（系数 2）。</p>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                XPM 的影响随信道间隔减小和信道数量增加而加剧，对密集 WDM 系统尤为严重。
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">
                <TermNote term="四波混频" /> (FWM)
              </h4>
              <p className="text-sm mb-2">
                三个频率的光在光纤中相互作用产生第四个频率的新光。 在 WDM 系统中，FWM
                会产生串扰，尤其在零色散波长附近最为严重。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\omega_4 = \\omega_1 + \\omega_2 - \\omega_3$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-1">当 ω₁=ω₂≠ω₃ 时称为简并 FWM。</p>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                色散的存在会破坏相位匹配条件从而抑制 FWM 效率。 这就是
                G.655（非零色散位移光纤）在零色散点引入少量色散的原因。
              </p>
            </div>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">非线性效应的工程应对</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">增加有效面积</h5>
                <p className="text-xs">
                  大有效面积光纤（如 G.654）通过增大 A_eff 降低 γ， 从而抑制所有非线性效应的强度。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">DSP 非线性补偿</h5>
                <p className="text-xs">
                  在相干接收系统的 DSP 中，使用数字反向传播（DBP）算法 对传输链路的非线性损伤进行数值补偿。
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<Compass className="w-5 h-5 text-laser-orange" />} title="保偏光纤">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            标准单模光纤的纤芯是完美圆对称的，因此两个正交偏振模式（LP₀₁ˣ 和 LP₀₁ʸ）具有相同的传播常数， 即它们是
            <span className="text-laser-orange font-semibold">简并</span>的。
            然而，实际光纤中的微小应力或几何不完美会引入随机的双折射，使光在传输过程中偏振态发生不可控的变化。
          </p>
          <p>
            <span className="text-laser-orange font-semibold">
              <TermNote term="保偏光纤" />
              （Polarization-Maintaining Fiber, PMF）
            </span>
            通过人为引入<strong>强的、可控的</strong>双折射，使两个正交偏振模式的传播常数差足够大，
            从而抑制它们之间的能量耦合。当入射光的偏振态与其中一个主轴对齐时，光将保持该偏振态传输。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">保偏光纤的工作原理</h4>
            <p className="text-sm mb-3">
              保偏光纤的关键参数是<span className="text-laser-orange font-semibold">双折射（Birefringence）</span>：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">双折射系数</h5>
                <MathRenderer>{'$$B = |n_x - n_y|$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">典型 PMF 的 B ≈ 10⁻⁴，比普通光纤高 2-3 个数量级。</p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">拍长</h5>
                <MathRenderer>{'$$L_B = \\frac{\\lambda}{B}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">在 1550 nm 处，B=10⁻⁴ 时拍长约 1.5 cm。</p>
              </div>
            </div>
            <p className="text-sm mt-3">
              常用的 PMF 结构包括<span className="text-laser-cyan font-medium">熊猫型（PANDA）</span>、
              <span className="text-laser-green font-medium">蝴蝶结型（Bow-Tie）</span>和
              <span className="text-laser-purple font-medium">椭圆包层型</span>。
              它们的共同特点是在纤芯两侧引入应力施加区，利用热膨胀系数差异产生各向异性应力， 从而形成强双折射。
            </p>
          </div>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">保偏光纤的主要应用场景</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-cyan text-sm mb-2">光纤陀螺仪</h5>
                <p className="text-xs">
                  利用萨格纳克（Sagnac）效应测量旋转角速度。 PMF
                  确保了干涉仪中两束光的偏振态一致，是实现高精度导航级光纤陀螺的关键器件。
                </p>
              </div>
              <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-green text-sm mb-2">相干光通信</h5>
                <p className="text-xs">
                  在相干接收机的本振光路中，使用 PMF 保持本振光的偏振态稳定，
                  确保与信号光的偏振匹配，以获得稳定的混频效率。
                </p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-purple text-sm mb-2">集成光学器件</h5>
                <p className="text-xs">
                  PMF 常用于连接 LiNbO₃ 调制器、偏振分束器（PBS）等偏振敏感的光学器件，
                  保证器件输入光的偏振态对准其工作主轴。
                </p>
              </div>
            </div>
          </div>
          <p>
            需要注意的是，保偏光纤并不能"消除"偏振变化，而是通过强双折射使光束在一个主轴上的分量保持稳定。
            如果入射光的偏振态没有精确对准 PMF 的主轴，两个模式都会被激发，反而会产生偏振拍动。 因此，PMF
            的连接和熔接需要精密的偏振对准。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
