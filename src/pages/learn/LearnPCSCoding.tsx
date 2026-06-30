import { Target, Zap, ShieldCheck, BarChart3 } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '概率星座整形 (PCS) 概念' },
  { id: 's-1', title: '成形增益的物理来源' },
  { id: 's-2', title: '前向纠错码 FEC 基础' },
  { id: 's-3', title: 'PCS 与 FEC 联合优化' },
  { id: 's-4', title: '综合对比与展望' },
];

export default function LearnPCSCoding() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(ROUTES.LEARN.PCS_CODING);
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="概率星座整形与编码"
      subtitle="逼近香农极限的调制与纠错编码技术"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 3 · 调制器篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Target className="w-5 h-5 text-laser-red" />} title="概率星座整形 (PCS) 概念">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-red font-semibold"><TermNote term="概率星座整形 (PCS)" /></span>
            是近年来光通信领域最重要的突破之一。传统的<TermNote term="QAM 调制" />中，所有
            <TermNote term="星座点" />等概率出现。
            PCS 的核心思想是：<strong>内部星座点出现概率更高，外部星座点出现概率更低</strong>。
          </p>

          {/* 星座点概率分布对比 */}
          <div className="bg-lab-bg/40 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">16QAM 星座点概率分布对比</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-laser-cyan/10 p-4 rounded-lg border border-laser-cyan/30">
                  <div className="text-sm font-semibold text-laser-cyan mb-2">传统均匀分布</div>
                  <div className="grid grid-cols-4 gap-1 w-16 mx-auto">
                    {Array.from({ length: 16 }).map((_, idx) => (
                      <div key={idx} className="w-3 h-3 rounded-full bg-laser-cyan/60" />
                    ))}
                  </div>
                  <div className="text-xs text-lab-muted mt-2">每个星座点概率 = 1/16 = 6.25%</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-laser-red/10 p-4 rounded-lg border border-laser-red/30">
                  <div className="text-sm font-semibold text-laser-red mb-2">PCS 不均匀分布</div>
                  <div className="grid grid-cols-4 gap-1 w-16 mx-auto">
                    {[0,3,12,15].map(idx => (
                      <div key={idx} className="w-3 h-3 rounded-full bg-laser-red" style={{ opacity: 0.9 }} />
                    ))}
                    {[1,2,4,7,8,11,13,14].map(idx => (
                      <div key={idx} className="w-3 h-3 rounded-full bg-laser-red" style={{ opacity: 0.5 }} />
                    ))}
                    {[5,6,9,10].map(idx => (
                      <div key={idx} className="w-3 h-3 rounded-full bg-laser-red" style={{ opacity: 0.2 }} />
                    ))}
                  </div>
                  <div className="text-xs text-lab-muted mt-2">内部点概率更高（深色），外部点概率更低（浅色）</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>{'$$P(x_i) = \\frac{e^{-\\lambda |x_i|^2}}{\\sum_j e^{-\\lambda |x_j|^2}} \\quad \\text{(Maxwell-Boltzmann 分布)}$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 λ 是整形参数（决定概率分布的陡峭程度），|x_i|² 是星座点到原点的距离平方（能量）。
              λ 越大，内部点概率占比越高，成形增益越大，但信息速率损失也越大。
              实际系统中 λ 根据信道条件动态调整，实现<strong>速率自适应</strong>。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">速率自适应</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>λ = 0 → 均匀分布，速率最大</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>λ 增大 → 成形增益增加，速率降低</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span>可灵活实现 0.125 bit/sym 的细粒度速率调整</span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">与均匀 QAM 的对比</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-red">•</span><span>均匀 QAM 只能通过改变阶数（如 16→64）跳变速率</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>PCS 可实现连续可调的传输速率</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>相同平均功率下，PCS 具有更低的误码率</span></li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Zap className="w-5 h-5 text-laser-cyan" />} title="成形增益的物理来源">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            为什么不等概率的星座点分布能够带来性能提升？
            这背后有着深刻的<strong>信息论基础</strong>。
          </p>

          <div className="bg-lab-bg/40 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">成形增益的三个来源</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <div>
                  <span className="text-lab-text font-medium">平均能量降低：</span>
                  <span className="text-lab-muted"> 内部星座点（低能量）出现概率高，外部星座点（高能量）出现概率低，
                  使得平均符号能量降低，在相同发射功率下可获得更高的信噪比裕量。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <div>
                  <span className="text-lab-text font-medium">逼近球形星座：</span>
                  <span className="text-lab-muted"> 信息论证明，在加性高斯白噪声 (AWGN) 信道下，最优的输入分布是各向同性的高斯分布，
                  其等概率轮廓面为球形。PCS 通过概率加权使均匀 QAM 星座的"平均形状"接近球形。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <div>
                  <span className="text-lab-text font-medium">香农极限：</span>
                  <span className="text-lab-muted"> 球形星座整形可以达到 <TermNote term="香农极限" /> 的理论增益上限 1.53 dB（二维），
                  这是所有星座整形技术的理论最优值，来源于高斯分布相对于均匀分布的熵增益。</span>
                </div>
              </div>
            </div>
            <div className="bg-lab-surface/50 p-3 rounded-lg mt-3">
              <MathRenderer>{'$$\\text{成形增益} = \\frac{E_{uniform}}{E_{PCS}} \\leq 1.53 \\text{ dB}$$'}</MathRenderer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">实际成形增益</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span><strong>1.53 dB</strong>：二维理想成形增益上限（香农）</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span><strong>~0.8 dB</strong>：PCS-16QAM 实际成形增益</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span><strong>~1.2 dB</strong>：PCS-64QAM 实际成形增益</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-red">•</span><span><strong>~1.4 dB</strong>：PCS-256QAM 实际成形增益</span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">维度的影响</h4>
              <p className="text-sm">
                成形增益随维度增加而增大。二维（2D）上限为 1.53 dB，
                四维（4D，考虑偏振）上限为 ~1.76 dB，
                无穷维度下可达 ~2.2 dB。实际光通信系统通常使用二维或四维整形。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg border border-laser-cyan/30 mt-2">
            <p className="text-sm">
              <strong>直观理解</strong>：在星座图中，"靠近原点"的信号能量更低，但接收端更容易正确判决。
              PCS 让发送端更多地选择"节能且可靠"的内部星座点，从而在整体上获得更好的传输性能。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<ShieldCheck className="w-5 h-5 text-laser-green" />} title="前向纠错码 FEC 基础">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold"><TermNote term="前向纠错码 (FEC)" /></span>
            是光通信系统中不可或缺的组成部分。通过在发送端添加冗余校验位，
            FEC 使接收端能够检测并纠正传输过程中发生的错误，从而在相同
            <TermNote term="信噪比 (SNR)" />下实现更低的误码率。
          </p>

          <div className="bg-lab-bg/40 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">FEC 编码增益示意</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-laser-cyan/10 p-4 rounded-lg border border-laser-cyan/30">
                <div className="text-sm font-semibold text-laser-cyan mb-2 text-center">硬判决 FEC (HD-FEC)</div>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>对每个比特做 0/1 硬判决后再解码</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>实现简单，功耗低</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>编码增益约 5 - 6 dB</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>典型：RS(255,239)，BCH 码</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>100G 系统中广泛使用</span></li>
                </ul>
              </div>
              <div className="bg-laser-green/10 p-4 rounded-lg border border-laser-green/30">
                <div className="text-sm font-semibold text-laser-green mb-2 text-center">软判决 FEC (SD-FEC)</div>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>保留接收信号的幅度信息作为置信度</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>解码复杂度更高，性能更好</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>编码增益约 8 - 11 dB</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>典型：LDPC 码，Turbo 码</span></li>
                  <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>400G/800G 系统标配</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <h4 className="font-semibold text-lab-text mb-2"><TermNote term="LDPC 码" /></h4>
            <p className="text-sm">
              LDPC (Low-Density Parity-Check) 码是一种线性分组码，其校验矩阵 H 中"1"的密度非常低（稀疏矩阵）。
              这种稀疏性使得可以采用<strong>置信传播 (Belief Propagation)</strong> 算法进行高效迭代解码，
              性能逼近香农极限。
            </p>
            <div className="bg-lab-surface/50 p-3 rounded-lg mt-3">
              <MathRenderer>{'$$H \\cdot c^T = 0, \\quad \\text{其中 } H \\text{ 是稀疏校验矩阵}$$'}</MathRenderer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2"><TermNote term="编码增益" /></h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>定义为达到相同误码率所需的 SNR 降低量</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>SD-FEC 编码增益通常比 HD-FEC 高 3 - 5 dB</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span>编码增益随码长增加而增大</span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2"><TermNote term="开销 (Overhead)" /></h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>HD-FEC：~7% 开销（如 RS(255,239)）</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>SD-FEC：~15% - 27% 开销</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span>开销越大 → 冗余越多 → 纠错能力越强 → 有效速率降低</span></li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<BarChart3 className="w-5 h-5 text-laser-purple" />} title="PCS 与 FEC 联合优化">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            PCS 和 FEC 并非独立工作，而是在实际系统中<strong>联合优化</strong>以逼近香农极限。
            PCS 提供成形增益，FEC 提供编码增益，两者叠加的效果接近信息论的理论极限。
          </p>

          <div className="bg-lab-bg/40 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">联合优化的核心架构</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <div>
                  <span className="text-lab-text font-medium">CCDM 分布匹配器：</span>
                  <span className="text-lab-muted"> <TermNote term="恒参分布匹配器 (CCDM)" />将均匀分布的输入比特转换为满足 Maxwell-Boltzmann 分布的概率符号序列，
                  再送入 FEC 编码器进行纠错编码。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <div>
                  <span className="text-lab-text font-medium">概率幅度整形 (PAS)：</span>
                  <span className="text-lab-muted"> 由 Bocherer 等人提出的 PAS 框架将 PCS 与 FEC 系统性地结合，
                  采用"恒参分布匹配 + 系统化 LDPC 编码"的方案，已成为 ITU-T 标准化的基础架构。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <div>
                  <span className="text-lab-text font-medium">互信息最大化：</span>
                  <span className="text-lab-muted"> 通过调整整形参数 λ 和 FEC 码率 R，使系统在给定 SNR 下达到最大的
                  <TermNote term="互信息" />，即最逼近香农极限的工作点。</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/40 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-lab-text mb-2">ITU-T 标准化</h4>
            <p className="text-sm">
              概率星座整形已被 ITU-T G.698.2 采纳为光通信系统的推荐技术。
              主流光模块厂商（如华为、Ciena、Infinera）已在 400G/800G 产品中部署 PCS + LDPC 联合方案，
              实现了接近香农极限 0.5 dB 以内的传输性能。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">PCS + SD-FEC 实际效果</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>相比传统均匀 QAM + HD-FEC 提升约 3 - 4 dB</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>400G 传输距离延长 30% - 50%</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>支持 0.125 bit/sym 粒度的速率自适应</span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">实现挑战</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-red">•</span><span>DSP 芯片功耗和面积增加</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-red">•</span><span>PAS 框架引入的速率损失</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-red">•</span><span>CCDM 匹配器的硬件实现开销</span></li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Target className="w-5 h-5 text-laser-cyan" />} title="综合对比与展望">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            回顾整个 Part 3，我们从干涉原理出发，经历了 MZ 调制器、IQ 调制器、偏振复用，再到 Nyquist 脉冲整形、
            光 OFDM，最后到概率星座整形与 FEC 编码。
            每一项技术都在推动光通信系统<strong>逼近香农极限</strong>。
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">技术</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">核心贡献</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">增益类型</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">典型增益</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-cyan">Nyquist 整形</td>
                  <td className="py-2 px-3">压缩带宽，消除 ISI</td>
                  <td className="py-2 px-3">频谱效率</td>
                  <td className="py-2 px-3">≤ 2 baud/Hz</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-purple">光 OFDM</td>
                  <td className="py-2 px-3">抗色散，均衡简单</td>
                  <td className="py-2 px-3">链路预算</td>
                  <td className="py-2 px-3">取决于色散</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-red">概率星座整形</td>
                  <td className="py-2 px-3">降低平均能量</td>
                  <td className="py-2 px-3">成形增益</td>
                  <td className="py-2 px-3">≤ 1.53 dB</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-green">SD-FEC (LDPC)</td>
                  <td className="py-2 px-3">纠错编码</td>
                  <td className="py-2 px-3">编码增益</td>
                  <td className="py-2 px-3">≤ 11 dB</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-laser-cyan font-semibold">PCS + FEC</td>
                  <td className="py-2 px-3">联合优化</td>
                  <td className="py-2 px-3">综合增益</td>
                  <td className="py-2 px-3">{'距香农极限 < 0.5 dB'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-lab-bg/40 p-5 rounded-xl mt-6">
            <h4 className="font-semibold text-lab-text mb-3">未来方向</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-semibold text-lab-text text-sm mb-1">空分复用 (SDM)</h5>
                <p className="text-xs text-lab-muted">
                  多芯光纤 (MCF) 和少模光纤 (FMF) 利用空间维度进一步提升传输容量，
                  是超越单模光纤香农极限的关键技术。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-semibold text-lab-text text-sm mb-1">智能编码调制</h5>
                <p className="text-xs text-lab-muted">
                  基于机器学习的端到端光通信系统优化，自动学习最优的星座形状和编码方案，
                  进一步逼近香农极限。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-semibold text-lab-text text-sm mb-1">多级编码调制</h5>
                <p className="text-xs text-lab-muted">
                  将不同可靠性的比特分配给不同保护级别的编码，结合 PCS 和概率整形，
                  实现更细粒度的速率自适应。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg border border-laser-cyan/30 mt-4">
            <p className="text-sm">
              至此，Part 3 · 调制器篇 的全部内容已经完成。在下一部分（Part 4 · 系统篇）中，
              我们将学习光接收器、WDM 波分复用技术，并将所有知识整合到完整的光通信系统设计中。
            </p>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
