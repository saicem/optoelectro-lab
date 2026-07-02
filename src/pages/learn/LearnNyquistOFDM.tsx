import { Zap, Radio, Waves } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: 'DP-IQ 调制器回顾' },
  { id: 's-1', title: 'Nyquist 脉冲整形' },
  { id: 's-2', title: '光 OFDM' },
  { id: 's-3', title: 'Nyquist vs OFDM 对比' },
  { id: 's-4', title: '下一步：概率星座整形与编码' },
];

export default function LearnNyquistOFDM() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN.NYQUIST_OFDM,
  );
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="Nyquist 与 OFDM"
      subtitle="脉冲整形与多载波调制技术"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 3 · 调制器篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Radio className="w-5 h-5 text-laser-cyan" />} title="DP-IQ 调制器回顾">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">DP-IQ 调制器 (Dual-Polarization IQ Modulator)</span>
            是高级调制技术的硬件基础。它将输入激光分为 X 和 Y 两个正交偏振态， 分别通过独立的 IQ 调制器进行调制，最后经
            <TermNote term="偏振合束器 (PBC)" />
            输出，实现了单波长 200G/400G 的传输速率。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">结构组成</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>偏振分束器 (PBS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>X 偏振 IQ 调制器 (I_x, Q_x)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>Y 偏振 IQ 调制器 (I_y, Q_y)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>偏振旋转器 + 偏振合束器 (PBC)</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">传输容量</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>DP-QPSK：100G (单波长)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>DP-16QAM：200G - 400G</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>DP-64QAM：600G - 800G</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>DP-256QAM：1T+</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm">
            四路驱动信号 (I_x, Q_x, I_y, Q_y) 独立加载不同的数据，每个符号同时在幅度、相位和偏振三个维度上携带信息。
            Nyquist 脉冲整形与光 OFDM 均可在这一平台上实现，进一步提升频谱效率。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Zap className="w-5 h-5 text-laser-green" />} title="Nyquist 脉冲整形">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在传统的
            <TermNote term="NRZ 调制" />
            中，矩形脉冲的频谱包含大量
            <TermNote term="旁瓣" />
            ，占用额外带宽。
            <span className="text-laser-green font-semibold">Nyquist 脉冲整形</span>
            通过<strong>升余弦滤波器 (Raised-Cosine Filter)</strong> 在发送端对脉冲进行整形， 将信号带宽严格限制在
            <TermNote term="奈奎斯特频率" />
            以内。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {
                '$$H(f) = \\begin{cases} T, & |f| \\leq \\frac{1-\\alpha}{2T} \\\\ \\frac{T}{2} \\left[ 1 + \\cos\\left( \\frac{\\pi T}{\\alpha} \\left( |f| - \\frac{1-\\alpha}{2T} \\right) \\right) \\right], & \\frac{1-\\alpha}{2T} < |f| \\leq \\frac{1+\\alpha}{2T} \\\\ 0, & \\text{otherwise} \\end{cases}$$'
              }
            </MathRenderer>
          </div>

          <div className="bg-lab-bg/40 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">升余弦滤波器时域波形示意</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-laser-cyan/10 p-4 rounded-lg border border-laser-cyan/30">
                  <div className="text-sm font-semibold text-laser-cyan mb-2">α = 0（理想 Nyquist）</div>
                  <div className="h-16 relative flex items-center justify-center">
                    <div className="text-xs text-lab-muted">
                      sinc(t/T) 波形
                      <br />在 t = ±T, ±2T... 处为零
                    </div>
                  </div>
                  <div className="text-xs text-lab-muted mt-2">带宽最小，但衰减慢</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-green/10 p-4 rounded-lg border border-laser-green/30">
                  <div className="text-sm font-semibold text-laser-green mb-2">α = 0.1（常用）</div>
                  <div className="h-16 relative flex items-center justify-center">
                    <div className="text-xs text-lab-muted">
                      升余弦波形
                      <br />
                      平滑过渡，快速衰减
                    </div>
                  </div>
                  <div className="text-xs text-lab-muted mt-2">频谱效率高，实用首选</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-purple/10 p-4 rounded-lg border border-laser-purple/30">
                  <div className="text-sm font-semibold text-laser-purple mb-2">α = 1（最大滚降）</div>
                  <div className="h-16 relative flex items-center justify-center">
                    <div className="text-xs text-lab-muted">
                      最平滑波形
                      <br />
                      衰减最快
                    </div>
                  </div>
                  <div className="text-xs text-lab-muted mt-2">带宽翻倍，抗定时误差强</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-lab-muted mt-4">
              关键特性：在采样点 t = 0, T, 2T, 3T... 处，所有波形值都在零点， 因此相邻符号在该点不产生干扰 → 消除 ISI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">
                <TermNote term="滚降因子 α" />
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>
                    <strong>α = 0</strong>：理想 Nyquist，带宽 = 1/(2T)，不可实现
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>
                    <strong>α = 0.1 ~ 0.2</strong>：高速光通信常用，频谱效率高
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>
                    <strong>α = 0.5 ~ 1</strong>：带宽宽，但抗定时误差强
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">
                <TermNote term="Nyquist-WDM" />
              </h4>
              <p className="text-sm">
                对每个波长的信号进行 Nyquist 整形后，可以将波长间隔压缩到接近信号
                <TermNote term="波特率" />
                ，实现超高频谱效率的波分复用系统。
              </p>
            </div>
          </div>
          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg border border-laser-green/30 mt-2">
            <p className="text-sm">
              <strong>核心优势</strong>：消除
              <TermNote term="码间干扰 (ISI)" />
              的同时， 将<TermNote term="频谱效率" />
              推向理论极限 2 baud/Hz， 是当前高速相干光通信系统的基石技术。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<Waves className="w-5 h-5 text-laser-purple" />} title="光 OFDM">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">
              <TermNote term="OFDM" />
            </span>
            （正交频分复用）是一种多载波调制技术，它将高速数据流分配到多个<strong>正交子载波</strong>上并行传输。
            每个子载波上的符号速率较低，因此对
            <TermNote term="色散" />和<TermNote term="偏振模色散 (PMD)" />
            有天然的容忍度。
          </p>

          <div className="bg-lab-bg/40 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">OFDM 子载波频谱示意</h4>
            <div className="flex justify-center items-end gap-1 h-24 mb-4">
              {['f₁', 'f₂', 'f₃', 'f₄', 'f₅', 'f₆', 'f₇', 'f₈'].map((carrier, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="bg-laser-purple/40 rounded-t-sm w-8"
                    style={{
                      height: '60px',
                      borderTop: '3px solid',
                      borderTopColor: idx % 2 === 0 ? 'rgb(168, 85, 247)' : 'rgb(139, 92, 246)',
                    }}
                  />
                  <div className="text-xs text-lab-muted mt-1">{carrier}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-lab-muted">
              每个子载波的频谱峰值与其他子载波的零点位置重合 → 正交性保证无子载波间干扰
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-semibold text-lab-text text-sm mb-1">正交条件</h5>
                <p className="text-xs text-lab-muted">
                  子载波间隔 Δf = 1/T<sub>sym</sub>，每个子载波的频谱在其他子载波中心频率处恰好为零。
                  这一条件保证了子载波间的正交性，无需保护带。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-semibold text-lab-text text-sm mb-1">循环前缀 (CP)</h5>
                <p className="text-xs text-lab-muted">
                  将每个 OFDM 符号尾部的一部分复制到头部作为保护间隔，用于抵抗色散引起的符号间干扰。 CP
                  长度需大于信道最大时延扩展。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {'$$s(t) = \\sum_{k=0}^{N-1} X_k \\cdot e^{j2\\pi k \\Delta f t}, \\quad 0 \\leq t \\leq T_{sym}$$'}
            </MathRenderer>
            <p className="text-sm mt-2">
              OFDM 信号可通过 <TermNote term="IFFT" /> 高效生成，接收端通过 <TermNote term="FFT" />{' '}
              恢复每个子载波上的调制符号。 这一计算效率是 OFDM 得以广泛应用的关键原因。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">
                <TermNote term="CO-OFDM" />
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>使用相干接收，恢复完整的电场信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>频谱效率接近 Nyquist 单载波</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>可通过 FFT/IFFT 高效实现</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>无需复杂的时域均衡器</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">优劣势</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">✓</span>
                  <span>对色散容忍度高</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">✓</span>
                  <span>频谱利用率高</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">✗</span>
                  <span>
                    <TermNote term="峰均功率比 (PAPR)" />高
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">✗</span>
                  <span>对光纤非线性敏感</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<Zap className="w-5 h-5 text-laser-cyan" />} title="Nyquist vs OFDM 对比">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            Nyquist 脉冲整形单载波与光 OFDM 多载波是当前高速光通信中两种主流的先进调制方案。
            两者在频谱效率上接近，但在实现复杂度、非线性容忍度和应用场景上各有千秋。
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">对比维度</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">Nyquist 单载波</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">光 OFDM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-medium text-lab-text">调制解调</td>
                  <td className="py-2 px-3">传统 DAC/ADC + 脉冲整形</td>
                  <td className="py-2 px-3">IFFT/FFT 实现</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-medium text-lab-text">均衡复杂度</td>
                  <td className="py-2 px-3">需要复杂时域均衡</td>
                  <td className="py-2 px-3">每个子载波简单一抽头均衡</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-medium text-lab-text">PAPR</td>
                  <td className="py-2 px-3 text-laser-green">低</td>
                  <td className="py-2 px-3 text-laser-red">高（主要缺点）</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-medium text-lab-text">非线性容忍度</td>
                  <td className="py-2 px-3 text-laser-green">较高</td>
                  <td className="py-2 px-3 text-laser-red">较低</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-medium text-lab-text">色散容忍度</td>
                  <td className="py-2 px-3">需要色散补偿</td>
                  <td className="py-2 px-3 text-laser-green">天生容忍</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 font-medium text-lab-text">DAC/ADC 要求</td>
                  <td className="py-2 px-3 text-laser-red">高带宽</td>
                  <td className="py-2 px-3">带宽与子载波数相关</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-lab-text">商用现状</td>
                  <td className="py-2 px-3 text-laser-green">主流方案</td>
                  <td className="py-2 px-3 text-laser-cyan">部分部署 / 研究</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg mt-4">
            <p className="text-sm">
              <strong>现状</strong>：商用高速相干光系统（100G/400G/800G）以 Nyquist 单载波为主流方案， 因其 PAPR
              低、实现成熟。光 OFDM 则在长距离传输和弹性光网络中展现出独特优势， 两者在未来系统中将长期共存。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Zap className="w-5 h-5 text-laser-red" />} title="下一步：概率星座整形与编码">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            Nyquist 脉冲整形和光 OFDM 解决了"如何高效利用频谱"的问题。 然而，要逼近
            <TermNote term="香农极限" />
            ，还需要回答另一个关键问题：
            <strong>"如何最优化地利用发射功率"</strong>。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-red/20">
              <h4 className="font-semibold text-laser-red mb-1">概率星座整形 (PCS)</h4>
              <p className="text-sm">通过不等概率的星座点分布，降低平均符号能量，获得成形增益。</p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-1">前向纠错编码 (FEC)</h4>
              <p className="text-sm">通过 LDPC 等纠错码，在相同信噪比下获得更低的误码率。</p>
            </div>
          </div>
          <p className="text-sm">
            PCS 与 FEC 的联合优化是当前 400G/800G 光通信系统的核心技术，
            下一章将深入介绍这两项技术的原理、实现与工程应用。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
