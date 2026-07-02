import { Network, Radio, Cable, CircuitBoard, Gauge, BarChart3, Zap } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '端到端光通信链路全景' },
  { id: 's-1', title: '发射端' },
  { id: 's-2', title: '传输链路' },
  { id: 's-3', title: '接收端' },
  { id: 's-4', title: '功率预算计算' },
  { id: 's-5', title: '性能指标' },
  { id: 's-6', title: '未来展望' },
];

export default function LearnSystemOverview() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN.SYSTEM_OVERVIEW,
  );
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="完整光通信系统"
      subtitle="将前面所学串联起来，端到端理解 400G DP-16QAM 光传输系统的全貌"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 4 · 系统篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Network className="w-5 h-5 text-laser-cyan" />} title="端到端光通信链路全景">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            一个完整的光通信系统由三个核心部分组成：<strong>发射端</strong>、<strong>传输链路</strong>和
            <strong>接收端</strong>。 本章以 <span className="text-laser-cyan font-semibold">400G DP-16QAM</span>{' '}
            系统作为贯穿例子， 将前面各章学到的调制、偏振复用、放大和接收知识串联成一个整体。
          </p>
          <div className="bg-lab-bg/40 p-5 rounded-xl mt-2">
            <h4 className="font-semibold text-lab-text mb-3 text-center">400G DP-16QAM 系统链路</h4>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-laser-cyan/10 p-3 rounded-lg border border-laser-cyan/30">
                <div className="text-laser-cyan font-semibold mb-1">发射端</div>
                <div className="text-xs text-lab-muted">
                  激光器 + DP-IQ
                  <br />
                  调制器 + DAC
                  <br />
                  Nyquist 整形
                </div>
              </div>
              <div className="bg-laser-purple/10 p-3 rounded-lg border border-laser-purple/30">
                <div className="text-laser-purple font-semibold mb-1">传输链路</div>
                <div className="text-xs text-lab-muted">
                  SSMF 光纤
                  <br />
                  EDFA 中继 × N<br />
                  色散补偿
                </div>
              </div>
              <div className="bg-laser-green/10 p-3 rounded-lg border border-laser-green/30">
                <div className="text-laser-green font-semibold mb-1">接收端</div>
                <div className="text-xs text-lab-muted">
                  相干混频 + BPD
                  <br />
                  ADC 采样
                  <br />
                  DSP 处理
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-lab-muted">
              <span className="text-laser-cyan">●</span> 调制 4 bit/symbol × 2 偏振 × 64 GBaud ≈ 400 Gb/s{' '}
              <span className="text-laser-cyan">●</span>
            </div>
          </div>
          <p>
            400G DP-16QAM 的关键参数：使用 <TermNote term="DP-IQ 调制器" /> 实现 X/Y 双偏振复用， 每偏振采用{' '}
            <TermNote term="16QAM" /> 调制（每符号 4 比特），符号率为 ~64 GBaud。 总比特率 = 2 (偏振) × 4 (每符号比特) ×
            64 (GBaud) = 512 Gb/s，扣除 FEC 开销后约 400 Gb/s 净速率。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-3 rounded-xl">
              <h4 className="font-semibold text-lab-text text-sm mb-1">典型传输距离</h4>
              <ul className="space-y-0.5 text-xs">
                <li>
                  <span className="text-laser-cyan">•</span> 400G DP-16QAM：600-1200 km
                </li>
                <li>
                  <span className="text-laser-green">•</span> 200G DP-QPSK：2000-4000 km
                </li>
                <li>
                  <span className="text-laser-purple">•</span> 800G DP-64QAM：200-400 km
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-3 rounded-xl">
              <h4 className="font-semibold text-lab-text text-sm mb-1">频谱效率</h4>
              <ul className="space-y-0.5 text-xs">
                <li>
                  <span className="text-laser-cyan">•</span> 50 GHz 栅格：8 bit/s/Hz
                </li>
                <li>
                  <span className="text-laser-green">•</span> 37.5 GHz Flex-Grid：~10.7 bit/s/Hz
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-3 rounded-xl">
              <h4 className="font-semibold text-lab-text text-sm mb-1">波长数</h4>
              <ul className="space-y-0.5 text-xs">
                <li>
                  <span className="text-laser-cyan">•</span> C 波段 50 GHz：~80 波长
                </li>
                <li>
                  <span className="text-laser-green">•</span> C+L 波段：~160 波长
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Radio className="w-5 h-5 text-laser-cyan" />} title="发射端">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            400G DP-16QAM 发射端的核心是将四路高速电信号（I<sub>x</sub>, Q<sub>x</sub>, I<sub>y</sub>, Q<sub>y</sub>）
            高质量地调制到光载波上。这需要多个精密器件的协同工作。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">激光器</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>
                    窄线宽可调谐 <TermNote term="DFB 激光器" /> 或 <TermNote term="外腔激光器 (ECL)" />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>线宽 &lt; 100 kHz（ECL）或 &lt; 1 MHz（DFB）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>输出功率 13-17 dBm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>频率锁定精度 ±2.5 GHz</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-green/20">
              <h4 className="font-semibold text-laser-green mb-2">DP-IQ 调制器</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>
                    集成两个 <TermNote term="IQ 调制器" /> 分别处理 X/Y 偏振
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>
                    材料：
                    <TermNote term="铌酸锂" /> (LiNbO₃) 或 <TermNote term="硅光" />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>3 dB 带宽 &gt; 35 GHz（64 GBaud 速率）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>
                    典型 <TermNote term="Vπ" /> 2-4 V
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">驱动电路 + DAC</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>
                    高速 <TermNote term="DAC/ADC" /> 采样率 &gt; 70 GSa/s
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>有效位数 (ENOB) &gt; 6 bit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>线性驱动放大器，输出摆幅匹配 Vπ</span>
                </li>
              </ul>
            </div>
          </div>
          <p>
            在 DSP 侧，发射端首先对数据进行 <TermNote term="Nyquist 脉冲整形" />
            （升余弦滤波，典型
            <TermNote term="滚降因子 α" /> = 0.1-0.15），将信号带宽压缩到 ~70 GHz 以内。 整形后的数字信号经 DAC
            转换为模拟电信号，由驱动放大器放大到足够幅度后送入 DP-IQ 调制器的四个射频端口。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>{'$$s(t) = s_x(t) \\cdot \\hat{x} + s_y(t) \\cdot \\hat{y}$$'}</MathRenderer>
            <p className="text-sm mt-1">
              其中 s_x(t) = I_x(t) + jQ_x(t)，s_y(t) = I_y(t) + jQ_y(t) 分别是 X 和 Y 偏振的复包络信号， 携带 16QAM
              符号序列经 Nyquist 整形后的波形。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<Cable className="w-5 h-5 text-laser-cyan" />} title="传输链路">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            400G DP-16QAM 信号经发射端输出后（功率约 +3 到 +5 dBm），首先通过一个{' '}
            <strong>EDFA 功率放大器 (Booster)</strong>
            将功率提升至入纤功率（+17 到 +19 dBm），然后进入传输链路。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">光纤</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>
                    标准 <TermNote term="单模光纤" /> (G.652)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>损耗 0.2 dB/km @ 1550 nm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>
                    <TermNote term="色度色散" /> 17 ps/(nm·km)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>有效面积 ~80 μm²</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-green/20">
              <h4 className="font-semibold text-laser-green mb-2">EDFA 中继</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>中继间距 80-100 km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>每个 EDFA 增益 = 段损耗 ≈ 16-20 dB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>
                    <TermNote term="噪声系数" /> 4.5-5.5 dB
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>同时放大所有 WDM 信道</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">色散补偿</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>
                    400G 系统主要靠 <TermNote term="数字信号处理 (DSP)" /> 电子补偿
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>DSP 可补偿高达数万 ps/nm 的累积色散</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>色散补偿光纤 (DCF) 用于 100G 及以下系统</span>
                </li>
              </ul>
            </div>
          </div>
          <p>
            长距离传输中，光纤的 <TermNote term="非线性效应" /> 是限制系统性能的关键因素。 入纤功率过高会引发{' '}
            <TermNote term="自相位调制 (SPM)" />、<TermNote term="交叉相位调制 (XPM)" /> 和
            <TermNote term="四波混频 (FWM)" /> 等非线性损伤。对于 400G DP-16QAM，典型入纤功率约为 +17 dBm 到 +19 dBm
            每信道，需要在 OSNR 和非线性之间取得平衡。
          </p>
          <div className="bg-lab-surface/30 border border-laser-cyan/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>链路设计权衡：</strong>增加入纤功率 → 提升 OSNR → 降低 BER → 但非线性效应加剧 → BER
              恶化。存在一个最优入纤功率点（非线性香农极限）， 通常通过系统仿真或现场测试来确定。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<CircuitBoard className="w-5 h-5 text-laser-cyan" />} title="接收端">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            经过数百公里的传输后，400G DP-16QAM 信号功率已被衰减到 -20 dBm 到 -10 dBm 的极低水平。 接收端首先通过{' '}
            <strong>EDFA 前置放大器</strong>将信号放大到相干接收所需的功率水平， 然后进入相干接收机和 DSP 处理链。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <h4 className="font-semibold text-lab-text mb-3">接收端信号处理链</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  1
                </span>
                <div>
                  <span className="text-laser-cyan font-medium">相干混频</span>
                  <span className="text-lab-muted">
                    ：信号光与 <TermNote term="本振光" /> 经 <TermNote term="90° 光混频器" /> 产生四路输出
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  2
                </span>
                <div>
                  <span className="text-laser-green font-medium">平衡探测</span>
                  <span className="text-lab-muted">
                    ：<TermNote term="平衡探测器" /> 将光信号转换为差分电信号，抑制共模噪声
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  3
                </span>
                <div>
                  <span className="text-laser-purple font-medium">ADC 采样</span>
                  <span className="text-lab-muted">：高速 ADC（&gt; 70 GSa/s, ENOB &gt; 5 bit）将模拟信号数字化</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-laser-red/20 text-laser-red flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  4
                </span>
                <div>
                  <span className="text-laser-red font-medium">DSP 处理</span>
                  <span className="text-lab-muted">
                    ：色散补偿 → PMD 补偿 → 频率偏移校正 → 载波相位恢复 → 自适应均衡 → 符号判决
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p>
            <TermNote term="数字信号处理 (DSP)" /> 是现代相干接收系统的核心。经过 ADC 采样后的数字信号 首先进行
            <strong>色度色散补偿</strong>（使用 FIR 滤波器或频域均衡），然后补偿
            <TermNote term="偏振模色散 (PMD)" /> 和偏振旋转。接着通过载波恢复算法消除
            激光器频率偏移和相位噪声，最终由自适应均衡器（如 CMA 或 LMS 算法） 分离 X/Y 偏振并对信道损伤进行综合均衡。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {'$$\\hat{d}[k] = \\arg\\min_{d \\in \\mathcal{C}} |y[k] - d|^2 \\quad \\text{(符号判决)}$$'}
            </MathRenderer>
            <p className="text-sm mt-1">
              DSP 处理完的信号 y[k] 最终通过最小欧氏距离准则判决到最近的 16QAM 星座点 <TermNote term="星座点" />，
              恢复出原始比特信息。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Gauge className="w-5 h-5 text-laser-cyan" />} title="功率预算计算">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在设计和部署光通信系统时，<strong>功率预算 (Power Budget)</strong> 是确保系统可靠运行的核心工程步骤。
            它逐段计算信号从发射端到接收端经历的增益和损耗，确保接收端收到的光功率满足
            <TermNote term="接收灵敏度" />
            要求。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {'$$P_{rx} = P_{tx} + G_{boost} - L_{fiber} + G_{inline} - L_{conn} - L_{other}$$'}
            </MathRenderer>
            <p className="text-sm mt-1">功率预算的基本方程：发射功率 + 增益 - 损耗 = 接收功率</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">项目</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">数值</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-cyan">发射功率 (Tx)</td>
                  <td className="py-2 px-3">+3 dBm</td>
                  <td className="py-2 px-3">DP-IQ 调制器输出</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-green">Booster 增益</td>
                  <td className="py-2 px-3">+16 dB</td>
                  <td className="py-2 px-3">EDFA 提升到入纤功率</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-purple">入纤功率</td>
                  <td className="py-2 px-3">+19 dBm</td>
                  <td className="py-2 px-3">需考虑非线性阈值</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-red">光纤损耗</td>
                  <td className="py-2 px-3">-16 dB (80 km)</td>
                  <td className="py-2 px-3">0.2 dB/km × 80 km</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-cyan">连接器损耗</td>
                  <td className="py-2 px-3">-1.5 dB</td>
                  <td className="py-2 px-3">3 对连接器 × 0.5 dB</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-green">Inline EDFA 增益</td>
                  <td className="py-2 px-3">+17.5 dB</td>
                  <td className="py-2 px-3">补偿损耗 + 少量余量</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-laser-purple">接收功率</td>
                  <td className="py-2 px-3">-19 dBm</td>
                  <td className="py-2 px-3">满足接收灵敏度要求</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            上表展示了一个<strong>单跨段</strong>（~80 km）的功率预算示例。对于多跨段链路，
            功率预算会逐段累积。系统设计时还需要预留 <strong>系统余量 (System Margin)</strong>
            （通常 3-6 dB）以应对器件老化、温度变化等非理想因素。
          </p>
          <div className="bg-lab-surface/30 border border-laser-cyan/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>工程经验：</strong>400G DP-16QAM 的接收灵敏度约为 -20 到 -25 dBm （取决于 FEC 编码增益和 DSP
              性能）。每增加一级 EDFA 中继，OSNR 约下降 2-3 dB， 因此最大中继级数受 OSNR 容限限制。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<BarChart3 className="w-5 h-5 text-laser-cyan" />} title="性能指标">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光通信系统的性能优劣通过一系列标准化指标来衡量。最核心的三个指标是
            <TermNote term="BER" />、<strong>Q 因子</strong> 和 <strong>OSNR</strong>。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">BER（误码率）</h4>
              <p className="text-sm">
                最直接的性能指标。400G DP-16QAM 的典型 FEC 前 BER 阈值为 2×10⁻²， FEC 后 BER 要求 &lt; 10⁻¹²。硬判决 FEC
                (HD-FEC) 和软判决 FEC (SD-FEC) 可提供 5-12 dB 的净编码增益。
              </p>
              <div className="mt-2 bg-lab-bg/40 p-2 rounded text-xs">
                <MathRenderer>
                  {
                    '$$BER = \\frac{1}{\\log_2 M} \\cdot \\frac{3}{4} \\text{erfc}\\left(\\sqrt{\\frac{SNR}{10}}\\right)$$'
                  }
                </MathRenderer>
              </div>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-green/20">
              <h4 className="font-semibold text-laser-green mb-2">Q 因子</h4>
              <p className="text-sm">
                Q 因子将 <TermNote term="SNR" /> 映射为等效的信噪比裕量。Q² (dB) 直观反映系统性能： Q² = 9.8 dB 对应 BER
                = 10⁻³，Q² = 16.9 dB 对应 BER = 10⁻¹²。
              </p>
              <div className="mt-2 bg-lab-bg/40 p-2 rounded text-xs">
                <MathRenderer>{'$$Q = \\frac{|\\mu_1 - \\mu_0|}{\\sigma_1 + \\sigma_0}$$'}</MathRenderer>
              </div>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">OSNR 容限</h4>
              <p className="text-sm">
                光信噪比 (OSNR) 是信号功率与 ASE 噪声功率的比值。每种调制格式有特定的 OSNR 容限。 400G DP-16QAM 在 FEC
                阈值（BER = 2×10⁻²）下所需 OSNR 约为 16-18 dB（0.1 nm 带宽）。
              </p>
              <div className="mt-2 bg-lab-bg/40 p-2 rounded text-xs">
                <MathRenderer>{'$$OSNR = \\frac{P_{signal}}{P_{ASE}}$$'}</MathRenderer>
              </div>
            </div>
          </div>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <h4 className="font-semibold text-lab-text mb-2">各指标之间的关系</h4>
            <p className="text-sm mb-2">
              对于理想 AWGN 信道，BER、Q 因子和 OSNR 之间存在明确的数学关系。 对于 DP-16QAM 系统：
            </p>
            <MathRenderer>
              {'$$BER \\approx \\frac{3}{8} \\text{erfc}\\left(\\sqrt{\\frac{Q^2}{2}}\\right)$$'}
            </MathRenderer>
            <MathRenderer>
              {
                '$$Q^2 (dB) \\approx OSNR (dB) + 10\\log_{10}\\left(\\frac{B_{ref}}{R_s}\\right) + \\text{调制格式因子}$$'
              }
            </MathRenderer>
            <p className="text-sm mt-2">
              其中 B_ref = 12.5 GHz（0.1 nm 参考带宽），R_s 为符号率。 对于 64 GBaud DP-16QAM，OSNR → Q² 的转换因子约为
              -3 dB。
            </p>
          </div>
          <div className="bg-lab-surface/30 border border-laser-cyan/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>实际系统测试：</strong>在现场部署前，通常使用 BER 扫描测量和 OSNR 容限测试
              来验证系统是否满足设计目标。OSNR 容限每增加 1 dB，等效传输距离约增加 15-20 km。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-6" icon={<Zap className="w-5 h-5 text-laser-cyan" />} title="未来展望">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            尽管 WDM 技术已使单纤容量达到数十 Tb/s，但光纤的<strong>非线性香农极限</strong>
            正在逼近。传统单模光纤的容量天花板预计在 100 Tb/s 量级。 为了满足未来 6G、AI
            计算和元宇宙等应用对带宽的爆炸式需求， 光通信界正在探索下一代颠覆性技术。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">空分复用 (SDM)</h4>
              <p className="text-sm">
                利用空间的"第四维度"来突破容量瓶颈。与 WDM 在频率维度复用类似， SDM
                在空间维度上复用多个传输通道，使总容量与通道数成正比增长。
              </p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-green/20">
              <h4 className="font-semibold text-laser-green mb-2">多芯光纤 (MCF)</h4>
              <p className="text-sm">
                在同一包层中集成多根纤芯（7 芯、19 芯甚至更多），每根纤芯独立传输 WDM 信号。 单纤物理容量可达 Pb/s
                量级。核心挑战是纤芯间的串扰和扇入/扇出器件的集成。
              </p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">少模光纤 (FMF)</h4>
              <p className="text-sm">
                利用光纤中的多个传输模式作为独立信道（模分复用 MDM）。 通过多输入多输出 (MIMO)
                数字信号处理来分离和解码各模式的信号。 模式间的色散和耦合是主要技术挑战。
              </p>
            </div>
          </div>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <h4 className="font-semibold text-lab-text mb-2">容量演进路径</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-laser-cyan font-medium">当前</span>
                <span className="text-lab-muted">：WDM (C+L) + DP-16QAM/64QAM + 概率星座整形 → 单纤 ~30-50 Tb/s</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-laser-green font-medium">近期</span>
                <span className="text-lab-muted">：扩展波段 (S+C+L) + Flex-Grid + 更高阶调制 → 单纤 ~100 Tb/s</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-laser-purple font-medium">远期</span>
                <span className="text-lab-muted">：SDM (MCF/FMF) + 空分复用 + AI 优化 → 单纤 Pb/s 量级</span>
              </div>
            </div>
          </div>
          <p>
            除了光纤层面的创新，<strong>光网络智能化</strong>也是重要趋势。基于 AI 的 光性能监测
            (OPM)、自适应调制格式切换、频谱资源动态分配等技术正在
            将传统静态光网络向自动化、智能化的方向演进。软件定义光网络 (SDON) 与 Flex-Grid
            结合，将实现光层资源的实时优化和按需分配。
          </p>
          <div className="bg-lab-surface/30 border border-laser-cyan/20 p-4 rounded-lg">
            <p className="text-sm">
              从基础物理到系统集成，从单一波长到 WDM 再到 SDM——光通信的发展史
              是人类不断挑战信息传输极限的历史。每一项新技术的突破，
              都在推动着全球信息基础设施迈向更高的容量、更远的距离和更智能的管理。
            </p>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
