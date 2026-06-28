import { Compass } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { CHAPTERS, TOTAL_CHAPTERS } from '@/constants/chapters';

const pageSections = [
  { id: 's-0', title: '光的偏振态' },
  { id: 's-1', title: '斯托克斯矢量与庞加莱球' },
  { id: 's-1-5', title: '琼斯矩阵：偏振的另一种数学描述' },
  { id: 's-2', title: '偏振控制器件' },
  { id: 's-3', title: '偏振复用 (PDM) 技术' },
  { id: 's-4', title: '实际挑战：偏振模色散 (PMD) 与偏振相关损耗' },
  { id: 's-5', title: '总结：从偏振复用走向高级调制' },
];

export default function LearnPolarization() {
  const currentIndex = CHAPTERS.findIndex(c => c.path === ROUTES.LEARN.POLARIZATION)
  const prevChapter = currentIndex > 0 ? { path: CHAPTERS[currentIndex - 1].path, title: CHAPTERS[currentIndex - 1].title, icon: <Compass className="w-4 h-4" /> } : undefined
  const nextChapter = currentIndex < TOTAL_CHAPTERS - 1 ? { path: CHAPTERS[currentIndex + 1].path, title: CHAPTERS[currentIndex + 1].title, icon: <Compass className="w-4 h-4" /> } : undefined
  return (
    <LearnLayout
      title="偏振复用"
      subtitle="光的偏振态、斯托克斯矢量与偏振复用技术，让容量再翻一倍"
      currentIndex={currentIndex}
      totalChapters={TOTAL_CHAPTERS}
      partTitle="Part 3 · 调制器篇"
      playgroundPath={ROUTES.PLAYGROUND.POLARIZATION}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Compass className="w-5 h-5 text-laser-red" />} title="光的偏振态">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光是横电磁波，电场矢量的振动方向与传播方向垂直。
            <span className="text-laser-red font-semibold">偏振 (Polarization)</span>
            描述的是电场矢量的振动方向随时间变化的方式。
          </p>
          <p>
            沿 z 方向传播的单色平面波，其电场可以分解为 x 和 y 两个正交分量：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{E}(t) = E_x\\cos(\\omega t)\\hat{x} + E_y\\cos(\\omega t + \\delta)\\hat{y}$$'}</MathRenderer>
          </div>
          <p>
            其中 E_x 和 E_y 是两个分量的振幅，δ 是 y 分量相对于 x 分量的相位差。
            根据这两个参数的不同，光可以呈现不同的偏振态：
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">线偏振</h4>
              <div className="text-sm text-lab-muted">
                当 δ = 0 或 π 时，电场矢量的端点在一条直线上运动。
                <br /><br />
                E_x 和 E_y 同相或反相。
              </div>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">圆偏振</h4>
              <div className="text-sm text-lab-muted">
                当 E_x = E_y 且 δ = ±π/2 时，电场矢量的端点做圆周运动。
                <br /><br />
                δ = π/2 右旋，δ = -π/2 左旋。
              </div>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">椭圆偏振</h4>
              <div className="text-sm text-lab-muted">
                一般情况下，电场矢量的端点做椭圆运动。
                <br /><br />
                线偏振和圆偏振是椭圆偏振的特例。
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" title="斯托克斯矢量与庞加莱球">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">斯托克斯矢量 (Stokes Vector)</span>
            是描述偏振态的一种常用方式，它由四个参数 (S₀, S₁, S₂, S₃) 组成，
            可以方便地测量和计算。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{S} = \\begin{bmatrix} S_0 \\\\ S_1 \\\\ S_2 \\\\ S_3 \\end{bmatrix} = \\begin{bmatrix} I_x + I_y \\\\ I_x - I_y \\\\ I_{45} - I_{135} \\\\ I_R - I_L \\end{bmatrix}$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">参数含义：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan font-mono">S₀</span>
                  <span>— 总光强，总是非负的</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green font-mono">S₁</span>
                  <span>— 0° 和 90° 线偏振分量的光强差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple font-mono">S₂</span>
                  <span>— 45° 和 135° 线偏振分量的光强差</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red font-mono">S₃</span>
                  <span>— 右旋和左旋圆偏振分量的光强差</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">归一化与偏振度：</h3>
              <p className="text-sm mb-2">
                对于完全偏振光，有 S₀² = S₁² + S₂² + S₃²。
                对于部分偏振光或自然光，这个等式不成立。
              </p>
              <p className="text-sm mb-2">
                <span className="text-laser-cyan font-medium">偏振度 DOP</span>
                描述光的偏振程度：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$\\text{DOP} = \\frac{\\sqrt{S_1^2 + S_2^2 + S_3^2}}{S_0}$$'}</MathRenderer>
              </div>
              <p className="text-sm mt-2">
                DOP = 1 完全偏振光；DOP = 0 自然光。
              </p>
            </div>
          </div>

          {/* 庞加莱球示意图 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">庞加莱球：偏振态的几何表示</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                {/* 简化的庞加莱球示意图 */}
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-laser-purple/50 bg-laser-purple/10" />
                  {/* 坐标轴 */}
                  <div className="absolute top-1/2 left-0 w-full flex justify-center">
                    <span className="absolute left-0 text-xs text-laser-cyan">S₁</span>
                    <span className="absolute right-0 text-xs text-laser-cyan">-S₁</span>
                  </div>
                  <div className="absolute top-0 left-1/2 h-full flex flex-col justify-center">
                    <span className="absolute top-0 text-xs text-laser-green">S₂</span>
                    <span className="absolute bottom-0 text-xs text-laser-green">-S₂</span>
                  </div>
                  <span className="absolute top-1/2 left-1/2 text-xs text-laser-red">S₃</span>
                  {/* 特殊点标注 */}
                  <div className="absolute top-1/2 left-1 w-2 h-2 rounded-full bg-laser-cyan" title="水平线偏振" />
                  <div className="absolute top-1/2 right-1 w-2 h-2 rounded-full bg-laser-cyan" title="垂直线偏振" />
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-laser-purple font-semibold">庞加莱球 (Poincaré Sphere)</span>
                  是偏振态的几何表示：将归一化的 (S₁, S₂, S₃) 作为三维坐标，
                  所有完全偏振态都分布在单位球面上。
                </p>
                <div className="bg-lab-surface/50 p-3 rounded-lg">
                  <h5 className="font-medium text-lab-text mb-1">球面上特殊点：</h5>
                  <ul className="text-xs space-y-1">
                    <li><span className="text-laser-cyan">• 赤道上：</span>各种线偏振态</li>
                    <li><span className="text-laser-cyan">• 北极 (S₃=1)：</span>右旋圆偏振</li>
                    <li><span className="text-laser-cyan">• 南极 (S₃=-1)：</span>左旋圆偏振</li>
                    <li><span className="text-laser-cyan">• 其他点：</span>椭圆偏振态</li>
                    <li><span className="text-lab-muted">• 对径点：</span>正交偏振态（如 X 和 Y）</li>
                  </ul>
                </div>
                <p className="text-xs text-lab-muted">
                  偏振态的变化可以用球面上的轨迹表示，
                  光纤中的偏振演化对应于球面上的旋转。
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1-5" title="琼斯矩阵：偏振的另一种数学描述">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">琼斯矢量 (Jones Vector)</span>
            是用一个二维复矢量来表示光的偏振态的方法。沿 z 方向传播的光可以写为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\vec{J} = \\begin{bmatrix} E_x e^{j\\phi_x} \\\\ E_y e^{j\\phi_y} \\end{bmatrix} = \\begin{bmatrix} A_x \\\\ A_y e^{j\\delta} \\end{bmatrix}$$'}</MathRenderer>
          </div>
          <p className="text-sm">
            其中 A_x、A_y 是 x 和 y 分量的振幅（归一化后），δ = φ_y - φ_x 是两分量的相位差。
            与斯托克斯矢量不同，琼斯矢量保留了<strong>绝对相位</strong>信息，因此适用于涉和叠加计算。
          </p>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">常见偏振态的琼斯矢量</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lab-border">
                    <th className="text-left py-2 text-lab-muted font-medium">偏振态</th>
                    <th className="text-center py-2 text-lab-muted font-medium">琼斯矢量</th>
                    <th className="text-center py-2 text-lab-muted font-medium">说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-laser-cyan">水平线偏振 (X)</td>
                    <td className="py-2 text-center"><MathRenderer>{'$$\\begin{bmatrix}1\\\\0\\end{bmatrix}$$'}</MathRenderer></td>
                    <td className="py-2 text-center text-xs">电场沿 x 方向振动</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-laser-green">垂直线偏振 (Y)</td>
                    <td className="py-2 text-center"><MathRenderer>{'$$\\begin{bmatrix}0\\\\1\\end{bmatrix}$$'}</MathRenderer></td>
                    <td className="py-2 text-center text-xs">电场沿 y 方向振动</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-laser-purple">45° 线偏振</td>
                    <td className="py-2 text-center"><MathRenderer>{'$$\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1\\\\1\\end{bmatrix}$$'}</MathRenderer></td>
                    <td className="py-2 text-center text-xs">A_x = A_y, δ = 0</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-laser-red">右旋圆偏振 (RCP)</td>
                    <td className="py-2 text-center"><MathRenderer>{'$$\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1\\\\-j\\end{bmatrix}$$'}</MathRenderer></td>
                    <td className="py-2 text-center text-xs">A_x = A_y, δ = -π/2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">琼斯矩阵：偏振器件的数学描述</h4>
            <p className="text-sm">
              偏振器件对入射光的作用可以用一个 2×2 复矩阵——<TermNote term="琼斯矩阵" /> (Jones Matrix) 来表示。
              出射琼斯矢量 = 琼斯矩阵 × 入射琼斯矢量：
            </p>
            <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2">
              <MathRenderer>{'$$\\vec{J}_{out} = \\mathbf{M} \\cdot \\vec{J}_{in} = \\begin{bmatrix} m_{11} & m_{12} \\\\ m_{21} & m_{22} \\end{bmatrix} \\begin{bmatrix} J_x \\\\ J_y \\end{bmatrix}$$'}</MathRenderer>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-cyan mb-1">偏振片的琼斯矩阵</h5>
                <p className="text-xs">水平透偏轴：</p>
                <MathRenderer>{'$$\\mathbf{M}_{pol} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}$$'}</MathRenderer>
                <p className="text-xs mt-1">仅允许 x 分量的光通过，y 分量被完全阻挡。</p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-3 rounded-lg">
                <h5 className="font-semibold text-laser-purple mb-1">波片的琼斯矩阵</h5>
                <p className="text-xs">快轴沿 x 方向，相位延迟 Γ：</p>
                <MathRenderer>{'$$\\mathbf{M}_{wp} = \\begin{bmatrix} e^{j\\Gamma/2} & 0 \\\\ 0 & e^{-j\\Gamma/2} \\end{bmatrix}$$'}</MathRenderer>
                <p className="text-xs mt-1">Γ = π/2 为 λ/4 波片，Γ = π 为 λ/2 波片。</p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-3">琼斯矢量与斯托克斯矢量的对比</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lab-border">
                    <th className="text-left py-2 text-lab-muted font-medium">特性</th>
                    <th className="text-center py-2 text-lab-muted font-medium">琼斯矢量 / 矩阵</th>
                    <th className="text-center py-2 text-lab-muted font-medium">斯托克斯矢量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-lab-text">适用范围</td>
                    <td className="py-2 text-center text-xs">仅完全偏振光</td>
                    <td className="py-2 text-center text-xs">完全偏振光 + 部分偏振光 + 自然光</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-lab-text">相位信息</td>
                    <td className="py-2 text-center text-xs text-laser-cyan">包含绝对相位</td>
                    <td className="py-2 text-center text-xs text-laser-red">仅相位差，无绝对相位</td>
                  </tr>
                  <tr className="border-b border-lab-border/50">
                    <td className="py-2 text-lab-text">干涉计算</td>
                    <td className="py-2 text-center text-xs text-laser-green">可直接用于干涉</td>
                    <td className="py-2 text-center text-xs text-laser-red">不可直接用于干涉</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-lab-text">可测量性</td>
                    <td className="py-2 text-center text-xs text-laser-red">不可直接测量</td>
                    <td className="py-2 text-center text-xs text-laser-green">可直接测量（强度）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-lab-muted mt-3">
              简言之：琼斯方法适用于需要关心相位的相干系统（如干涉仪），
              斯托克斯方法适用于更一般的偏振态描述和测量。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" title="偏振控制器件">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在光通信系统中，经常需要对光的偏振态进行控制和转换。
            以下是几种常见的偏振控制器件：
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">偏振片 (Polarizer)</h4>
              <p className="text-sm">
                只允许特定方向的线偏振光通过，将任意偏振态转换为线偏振光。
                常用于偏振分析和偏振分束器中。
              </p>
              <p className="text-xs text-lab-muted mt-2">
                透过轴方向决定输出偏振方向。
              </p>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">λ/4 波片 (Quarter-Wave Plate)</h4>
              <p className="text-sm">
                对两个正交偏振分量产生 π/2 (90°) 的相位差。
                可以将线偏振转换为圆偏振，或反过来。
              </p>
              <p className="text-xs text-lab-muted mt-2">
                轴与入射线偏振成 45° 时，输出为圆偏振。
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">λ/2 波片 (Half-Wave Plate)</h4>
              <p className="text-sm">
                对两个正交偏振分量产生 π (180°) 的相位差。
                可以旋转线偏振的方向，不改变偏振类型。
              </p>
              <p className="text-xs text-lab-muted mt-2">
                轴与入射偏振成 θ 时，输出偏振旋转 2θ。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">偏振控制器与偏振分束器</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">偏振控制器 (PC)</h5>
                <p className="text-sm">
                  由多个波片（或光纤挤压元件）组成的可调器件，
                  可以将任意输入偏振态转换为所需的输出偏振态。
                </p>
                <p className="text-xs text-lab-muted mt-2">
                  在光通信中用于手动或自动调整信号偏振，
                  使其与接收机的偏振要求匹配。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">偏振分束器 (PBS)</h5>
                <p className="text-sm">
                  将输入光分解为两个正交的线偏振分量，
                  分别从两个端口输出。
                </p>
                <p className="text-xs text-lab-muted mt-2">
                  在偏振复用系统中用于分离 X 和 Y 偏振信号，
                  或将它们合路。
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm">
            <span className="text-laser-red font-medium">保偏光纤 (PM Fiber)</span>
            是一种特殊光纤，其结构设计使得光在其中传播时保持特定的偏振态。
            常用于需要偏振稳定性的应用，如光纤传感器和某些调制器。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-3" title="偏振复用 (PDM) 技术">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">偏振复用 (Polarization Division Multiplexing, PDM)</span>
            利用光的两个正交偏振态作为独立的信道传输数据，
            可以在不增加频谱宽度的前提下，使系统的传输容量翻倍。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="text-center mb-3 font-semibold text-lab-text">偏振复用系统示意图</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-laser-cyan">X 通道数据</span>
                <span className="text-lab-muted">→</span>
                <span className="px-2 py-1 border border-laser-cyan/50 rounded bg-laser-cyan/10">IQ 调制器 X</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-laser-purple">Y 通道数据</span>
                <span className="text-lab-muted">→</span>
                <span className="px-2 py-1 border border-laser-purple/50 rounded bg-laser-purple/10">IQ 调制器 Y</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lab-muted">↓</span>
                <span className="text-lab-muted">↓</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 border border-laser-green/50 rounded bg-laser-green/10">偏振合束器 (PBC)</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-lab-muted">↓</span>
              </div>
              <div className="text-center text-laser-green">X+Y 偏振复用信号 → 光纤传输</div>
            </div>
          </div>
          <p>
            在接收端，使用 <TermNote term="偏振分束器" /> (PBS) 将两个偏振态分开，分别进行检测和处理。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-4" title="实际挑战：偏振模色散 (PMD)与偏振相关损耗">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在实际的光纤传输中，偏振态并不是一成不变的。光纤的不完善性
            （如纤芯椭圆度、应力不对称等）会导致两个正交偏振模的传输特性不同，
            给偏振复用系统带来挑战。
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">偏振模色散 (PMD)</h4>
              <p className="text-sm">
                两个正交偏振模在光纤中传输速度不同，导致脉冲展宽。
                高速系统中需要用数字信号处理 (DSP) 来补偿。
              </p>
            </div>
            <div className="border border-amber-500/30 bg-amber-500/5 p-4 rounded-xl">
              <h4 className="font-semibold text-amber-400 mb-2">偏振相关损耗 (PDL)</h4>
              <p className="text-sm">
                器件对不同偏振态的损耗不同，导致两个信道的信噪比不平衡。
              </p>
            </div>
          </div>
          <p className="mt-4">
            幸运的是，现代高速光通信系统利用强大的数字信号处理 (DSP) 技术，
            可以在接收端实时跟踪和补偿偏振态的变化，使偏振复用成为实用的技术。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-5" title="总结：从偏振复用走向高级调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            让我们回顾一下光调制技术的演进路径：
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">强度调制 (OOK)</h4>
                <p className="text-sm">
                  最简单的调制方式，只利用光的强度。频谱效率 ~1 bit/s/Hz。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">IQ 正交调制</h4>
                <p className="text-sm">
                  同时利用幅度和相位，支持 QPSK/QAM 等高阶格式。
                  频谱效率提升到 2-8 bit/s/Hz 甚至更高。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">偏振复用 (PDM)</h4>
                <p className="text-sm">
                  利用两个正交偏振态作为独立信道，容量再翻一倍。
                  PDM-16QAM 的频谱效率可达 ~8 bit/s/Hz。
                </p>
              </div>
            </div>
          </div>
          <p>
            下一章，我们将这些技术整合起来，认识现代高速光通信的核心器件——
            <span className="text-laser-cyan font-semibold">高级调制</span>。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
