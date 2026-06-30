import { Waves, Zap, BarChart3, Radio, GitCompare, Gauge, Sparkles, Target } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: '什么是光调制' },
  { id: 's-1', title: '振幅调制与强度调制' },
  { id: 's-2', title: '相位调制' },
  { id: 's-3', title: '频率调制' },
  { id: 's-4', title: '数字调制格式概览' },
  { id: 's-5', title: '直接调制与外部调制' },
  { id: 's-6', title: '调制性能指标' },
];

export default function LearnModulationBasics() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(ROUTES.LEARN.MODULATION_BASICS);
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="光调制基础"
      subtitle="理解光调制的基本概念、各种调制类型与性能指标，为后续学习打下基础"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 3 · 调制器篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Radio className="w-5 h-5 text-laser-cyan" />} title="什么是光调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">光调制（Optical Modulation）</span>
            是将信息信号加载到光载波上的过程。简单来说，就是按照信息信号的变化规律去改变光载波的某些参数
            （如振幅、相位、频率、偏振等），使光载波"携带"上信息。
          </p>

          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <h4 className="font-semibold text-lab-text mb-4 text-center">调制的基本模型</h4>
            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="text-center">
                <div className="px-3 py-2 bg-laser-cyan/10 border border-laser-cyan/30 rounded-lg text-laser-cyan font-medium">
                  信息信号
                </div>
                <div className="text-xs text-lab-muted mt-1">m(t)</div>
              </div>
              <div className="text-laser-cyan text-xl">→</div>
              <div className="px-4 py-3 bg-laser-purple/20 border border-laser-purple/40 rounded-lg text-laser-purple font-semibold">
                调制器
              </div>
              <div className="text-laser-cyan text-xl">→</div>
              <div className="text-center">
                <div className="px-3 py-2 bg-laser-green/10 border border-laser-green/30 rounded-lg text-laser-green font-medium">
                  已调信号
                </div>
                <div className="text-xs text-lab-muted mt-1">s(t)</div>
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs text-lab-muted">
                光载波 c(t) = A·cos(ω_c t + φ₀) → 调制器输入
              </div>
            </div>
          </div>

          <p>
            光通信系统中，激光器产生的高频光波作为<span className="text-laser-cyan font-semibold">载波（Carrier）</span>，
            我们需要传输的语音、数据、图像等信息作为
            <span className="text-laser-green font-semibold">调制信号（Modulating Signal）</span>。
            调制的过程就是用调制信号去控制载波参数的过程。
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2 text-sm">模拟调制</h4>
              <p className="text-xs">
                调制信号是连续变化的模拟量，载波的参数随调制信号连续变化。
                例如：AM、FM、PM。
              </p>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2 text-sm">数字调制</h4>
              <p className="text-xs">
                调制信号是离散的数字信号（0/1），载波的参数取有限个离散值。
                例如：ASK、FSK、PSK、QAM。
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2 text-sm">脉冲调制</h4>
              <p className="text-xs">
                以脉冲序列作为载波，改变脉冲的幅度、宽度或位置。
                例如：PAM、PCM、PWM。
              </p>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<BarChart3 className="w-5 h-5 text-laser-green" />} title="振幅调制与强度调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-green font-semibold">振幅调制（Amplitude Modulation, AM）</span>
            是最简单、最直观的调制方式：载波的振幅随调制信号的变化而变化，而频率和相位保持不变。
          </p>

          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$s_{AM}(t) = [A_c + m(t)] \\cdot \\cos(\\omega_c t + \\phi_0)$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 A_c 是载波振幅，m(t) 是调制信号，ω_c 是载波角频率。
              当 |m(t)| ≤ A_c 时，已调信号的包络与调制信号成正比。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">调幅指数</h4>
              <p className="text-sm mb-2">
                调幅指数 m_a 描述了振幅变化的相对深度：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$m_a = \\frac{|m(t)|_{max}}{A_c}$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                当 m_a ≤ 1 时，包络不失真；当 m_a &gt; 1 时，产生过调幅，包络失真。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">频谱结构</h4>
              <p className="text-sm mb-2">
                单音调制时，AM 信号包含三个频率分量：
              </p>
              <ul className="text-xs space-y-1">
                <li>• 载波分量：f_c</li>
                <li>• 上边带：f_c + F</li>
                <li>• 下边带：f_c - F</li>
              </ul>
              <p className="text-xs text-lab-muted mt-2">
                带宽 B = 2F，其中 F 是调制信号的最高频率。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">光通信中的强度调制（IM）</h4>
            <p className="text-sm mb-3">
              在光通信中，由于光探测器只能检测光强（光功率），
              我们通常使用<span className="text-laser-green font-semibold">强度调制（Intensity Modulation, IM）</span>：
              直接调制光的功率（强度）来携带信息。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2 text-sm">直接检测 (DD)</h5>
                <p className="text-xs">
                  接收端直接用光电二极管检测光强的变化，
                  是最简单、成本最低的接收方式。
                  IM/DD 是传统光通信的主流方案。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-purple mb-2 text-sm">通断键控 (OOK)</h5>
                <p className="text-xs">
                  最基本的数字强度调制：光开表示"1"，光关表示"0"。
                  实现简单，但频谱效率较低，抗噪声性能一般。
                </p>
              </div>
            </div>
          </div>

          <div className="border border-laser-green/20 bg-laser-green/5 p-4 rounded-xl mt-3">
            <h5 className="font-semibold text-laser-green mb-2 text-sm">💡 振幅调制的特点</h5>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-medium text-lab-text mb-1">优点</p>
                <ul className="space-y-0.5 text-lab-muted">
                  <li>• 原理简单，易于实现</li>
                  <li>• 接收端结构简单（直接检测）</li>
                  <li>• 成本低</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-lab-text mb-1">缺点</p>
                <ul className="space-y-0.5 text-lab-muted">
                  <li>• 频谱效率低</li>
                  <li>• 抗噪声性能较差</li>
                  <li>• 载波功率浪费（AM 中载波不含信息）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<Sparkles className="w-5 h-5 text-laser-purple" />} title="相位调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold">相位调制（Phase Modulation, PM）</span>
            是指载波的瞬时相位随调制信号线性变化，而振幅保持不变的调制方式。
            相位调制是现代高速光通信的核心技术之一。
          </p>

          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$s_{PM}(t) = A_c \\cdot \\cos[\\omega_c t + k_p \\cdot m(t) + \\phi_0]$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 k_p 是相位调制灵敏度（rad/V），表示单位调制信号引起的相位变化量。
              瞬时相位偏移为 Δφ(t) = k_p · m(t)。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">相位调制指数</h4>
              <p className="text-sm mb-2">
                最大相位偏移量称为调制指数：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$m_p = k_p \\cdot |m(t)|_{max}$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                单位为 rad（弧度）。单音调制时，PM 信号的频谱包含无穷多对边带。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">卡森公式（带宽）</h4>
              <p className="text-sm mb-2">
                PM 信号的近似带宽（包含 98% 能量）：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$B \\approx 2(m_p + 1)F$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                F 是调制信号的最高频率。带宽随调制指数增大而增加。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">光相位调制的实现</h4>
            <p className="text-sm mb-3">
              在光通信中，相位调制通常通过<span className="text-laser-purple font-semibold">电光效应</span>实现：
              外加电场改变材料的折射率，从而改变光的传播相位。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2 text-sm">Pockels 效应</h5>
                <p className="text-xs">
                  折射率变化与电场成正比（线性电光效应），
                  是铌酸锂等晶体调制器的主要工作机制。
                  相位变化与电压成正比。
                </p>
                <div className="bg-lab-bg/50 px-3 py-1.5 rounded mt-2 text-xs font-mono">
                  Δφ = π·V/V_π
                </div>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2 text-sm">相干检测</h5>
                <p className="text-xs">
                  相位信息无法直接检测，需要在接收端使用本振光与信号光
                  进行相干混频，将相位变化转换为强度变化后再检测。
                </p>
              </div>
            </div>
          </div>

          <div className="border border-laser-purple/20 bg-laser-purple/5 p-4 rounded-xl mt-3">
            <h5 className="font-semibold text-laser-purple mb-2 text-sm">💡 相位调制的特点</h5>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-medium text-lab-text mb-1">优点</p>
                <ul className="space-y-0.5 text-lab-muted">
                  <li>• 频谱效率高（与幅度结合可实现 QAM）</li>
                  <li>• 抗噪声性能优于 AM</li>
                  <li>• 载波功率不浪费</li>
                  <li>• 适合相干光通信系统</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-lab-text mb-1">缺点</p>
                <ul className="space-y-0.5 text-lab-muted">
                  <li>• 接收端需要相干检测，结构复杂</li>
                  <li>• 对相位噪声敏感</li>
                  <li>• 需要精确的相位同步</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-4 rounded-lg mt-3">
            <h5 className="font-semibold text-lab-text mb-2 text-sm">PM 与 FM 的关系</h5>
            <p className="text-xs text-lab-muted">
              相位调制和频率调制（FM）密切相关，统称为<span className="text-lab-text font-medium">角度调制</span>。
              频率是相位的时间导数，因此：
              <span className="text-laser-cyan"> FM ≈ 对调制信号积分后进行 PM</span>，
              <span className="text-laser-green"> PM ≈ 对调制信号微分后进行 FM</span>。
              两者在本质上是相通的，可以相互转换。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<Waves className="w-5 h-5 text-laser-orange" />} title="频率调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-orange font-semibold">频率调制（Frequency Modulation, FM）</span>
            是指载波的瞬时频率随调制信号线性变化，而振幅保持不变的调制方式。
            FM 广播是大家最熟悉的应用。
          </p>

          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$s_{FM}(t) = A_c \\cdot \\cos\\left[\\omega_c t + k_f \\int_{-\\infty}^{t} m(\\tau) d\\tau + \\phi_0\\right]$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 k_f 是频率调制灵敏度（rad/(s·V)），瞬时频率偏移为 Δf(t) = (k_f / 2π) · m(t)。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">调频指数</h4>
              <p className="text-sm mb-2">
                最大相位偏移量（单音调制时）：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$m_f = \\frac{\\Delta f_{max}}{F} = \\frac{k_f A_m}{2\\pi F}$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                Δf_max 是最大频偏，F 是调制信号频率。
                m_f 可以远大于 1（宽带 FM）。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lab-text mb-2 text-sm">FM 带宽（卡森公式）</h4>
              <p className="text-sm mb-2">
                FM 信号的近似带宽：
              </p>
              <div className="bg-lab-bg/50 px-4 py-2 rounded-lg">
                <MathRenderer>{'$$B \\approx 2(\\Delta f_{max} + F) = 2(m_f + 1)F$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                宽带 FM（m_f ≫ 1）时，B ≈ 2Δf_max，带宽主要由频偏决定。
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">光通信中的频率/波长调制</h4>
            <p className="text-sm mb-3">
              在光通信中，频率调制常表现为<span className="text-laser-orange font-semibold">波长调制</span>
              （因为频率与波长一一对应）。典型应用包括：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2 text-sm">频移键控 (FSK)</h5>
                <p className="text-xs">
                  数字频率调制：用两个不同的频率分别表示"0"和"1"。
                  例如：f₁ 表示"1"，f₀ 表示"0"。
                  可通过直接调制激光器实现。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2 text-sm">啁啾 (Chirp)</h5>
                <p className="text-xs">
                  调制过程中伴随的瞬时频率漂移称为啁啾。
                  直接调制激光器时，载流子浓度变化导致折射率变化，
                  从而产生频率啁啾，会限制传输距离。
                </p>
              </div>
            </div>
          </div>

          <div className="border border-laser-orange/20 bg-laser-orange/5 p-4 rounded-xl mt-3">
            <h5 className="font-semibold text-laser-orange mb-2 text-sm">💡 频率调制的特点</h5>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-medium text-lab-text mb-1">优点</p>
                <ul className="space-y-0.5 text-lab-muted">
                  <li>• 抗噪声/抗干扰能力强（恒定包络）</li>
                  <li>• 功率效率高</li>
                  <li>• 宽带 FM 可获得很高的信噪比</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-lab-text mb-1">缺点</p>
                <ul className="space-y-0.5 text-lab-muted">
                  <li>• 占用带宽大（以带宽换取信噪比）</li>
                  <li>• 频谱效率低于相位调制</li>
                  <li>• 在高速光通信中应用不如 PM/QAM 广泛</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<GitCompare className="w-5 h-5 text-laser-cyan" />} title="数字调制格式概览">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在数字通信中，载波的参数取有限个离散值，每个离散值对应一个符号（Symbol），
            每个符号携带若干比特的信息。以下是光通信中常见的数字调制格式：
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">幅移键控 (ASK)</h4>
              <p className="text-sm mb-2">
                用不同的振幅表示不同的符号。
                最简单的是 OOK（通断键控）：两种幅度，1 bit/符号。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs font-mono">
                "1" → 有光 (A₁)<br />
                "0" → 无光 (A₀=0)
              </div>
              <p className="text-xs text-lab-muted mt-2">
                <TermNote term="频谱效率" />：~1 bit/s/Hz（OOK）
              </p>
            </div>

            <div className="border border-laser-orange/30 bg-laser-orange/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-orange mb-2">频移键控 (FSK)</h4>
              <p className="text-sm mb-2">
                用不同的频率表示不同的符号。
                二元 FSK：两个频率，1 bit/符号。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs font-mono">
                "1" → f₁<br />
                "0" → f₀
              </div>
              <p className="text-xs text-lab-muted mt-2">
                <TermNote term="频谱效率" />：较低，&lt; 1 bit/s/Hz
              </p>
            </div>

            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">相移键控 (PSK)</h4>
              <p className="text-sm mb-2">
                用不同的相位表示不同的符号。
                QPSK（正交相移键控）：4 种相位，2 bit/符号。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs font-mono">
                00 → 0°<br />
                01 → 90°<br />
                10 → 180°<br />
                11 → 270°
              </div>
              <p className="text-xs text-lab-muted mt-2">
                <TermNote term="频谱效率" />：2 bit/s/Hz（QPSK）
              </p>
            </div>

            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">正交幅度调制 (QAM)</h4>
              <p className="text-sm mb-2">
                同时调制幅度和相位，多个幅度 + 多个相位组合。
                16QAM：16 个符号点，4 bit/符号。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs font-mono">
                M 种幅度 × N 种相位 = M×N 个符号<br />
                16QAM → 4 bit/sym<br />
                64QAM → 6 bit/sym
              </div>
              <p className="text-xs text-lab-muted mt-2">
                <TermNote term="频谱效率" />：4-6+ bit/s/Hz
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">星座图：直观理解调制格式</h4>
            <p className="text-sm mb-3">
              <span className="text-laser-cyan font-semibold">星座图（Constellation Diagram）</span>
              是表示数字调制信号的直观方式：横轴为 I（同相）分量，纵轴为 Q（正交）分量，
              每个符号对应复平面上的一个点。
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <div className="font-semibold text-laser-green mb-2">QPSK</div>
                <div className="h-24 flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-laser-green rounded-full" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-laser-green rounded-full" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-laser-green rounded-full" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-laser-green rounded-full" />
                  </div>
                </div>
                <div className="text-lab-muted">4 个符号点<br />2 bit/sym</div>
              </div>
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <div className="font-semibold text-laser-cyan mb-2">16QAM</div>
                <div className="h-24 flex items-center justify-center">
                  <div className="relative w-16 h-16 grid grid-cols-4 gap-1 p-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-laser-cyan rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="text-lab-muted">16 个符号点<br />4 bit/sym</div>
              </div>
              <div className="bg-lab-surface/50 p-4 rounded-lg">
                <div className="font-semibold text-laser-purple mb-2">64QAM</div>
                <div className="h-24 flex items-center justify-center">
                  <div className="relative w-16 h-16 grid grid-cols-8 gap-0.5 p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-laser-purple rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="text-lab-muted">64 个符号点<br />6 bit/sym</div>
              </div>
            </div>
          </div>

          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg mt-3">
            <h5 className="font-semibold text-lab-text mb-2 text-sm">频谱效率 vs 信噪比权衡</h5>
            <p className="text-sm">
              高阶调制格式（如 64QAM）频谱效率更高，但对信噪比的要求也更高。
              为了达到相同的误码率，64QAM 需要的 SNR 比 QPSK 高约 10 dB。
              这是<span className="text-lab-text font-medium">频谱效率与功率效率之间的经典权衡</span>。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<Zap className="w-5 h-5 text-laser-red" />} title="直接调制与外部调制">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            根据调制器与光源的位置关系，光调制可分为
            <span className="text-laser-red font-semibold">直接调制（Direct Modulation）</span>和
            <span className="text-laser-cyan font-semibold">外部调制（External Modulation）</span>两大类。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-3">直接调制</h4>
              <p className="text-sm mb-3">
                通过改变激光器的注入电流来调制光输出功率。
                激光器本身既是光源又是调制器。
              </p>
              <div className="bg-lab-bg/50 p-3 rounded-lg text-xs">
                <div className="font-medium text-lab-text mb-1">工作原理</div>
                <p className="text-lab-muted">
                  注入电流 → 载流子浓度变化 → 光输出功率变化
                </p>
              </div>
              <div className="space-y-2 mt-3">
                <div>
                  <span className="text-lab-text text-sm font-medium">优点：</span>
                  <ul className="text-xs text-lab-muted space-y-0.5 mt-1">
                    <li>• 结构简单，成本低</li>
                    <li>• 无需额外的调制器器件</li>
                    <li>• 插入损耗小</li>
                  </ul>
                </div>
                <div>
                  <span className="text-lab-text text-sm font-medium">缺点：</span>
                  <ul className="text-xs text-lab-muted space-y-0.5 mt-1">
                    <li>• 调制速率受限（弛豫振荡频率限制）</li>
                    <li>• 会产生频率啁啾</li>
                    <li>• 消光比有限</li>
                    <li>• 不适合高速长距离传输</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-lab-muted mt-3">
                <span className="text-lab-text font-medium">典型应用：</span>
                短距离接入网、数据中心短距互联（10 Gb/s 以下）
              </p>
            </div>

            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-3">外部调制</h4>
              <p className="text-sm mb-3">
                激光器连续输出，调制器放在激光器之后，
                通过电光效应、热光效应等方式对光进行调制。
              </p>
              <div className="bg-lab-bg/50 p-3 rounded-lg text-xs">
                <div className="font-medium text-lab-text mb-1">工作原理</div>
                <p className="text-lab-muted">
                  CW 激光 → 外部调制器 → 已调光信号
                </p>
              </div>
              <div className="space-y-2 mt-3">
                <div>
                  <span className="text-lab-text text-sm font-medium">优点：</span>
                  <ul className="text-xs text-lab-muted space-y-0.5 mt-1">
                    <li>• 调制速率高（可达 100+ Gbaud）</li>
                    <li>• 啁啾小或可控制</li>
                    <li>• 消光比高</li>
                    <li>• 可实现复杂调制格式（IQ/QAM）</li>
                  </ul>
                </div>
                <div>
                  <span className="text-lab-text text-sm font-medium">缺点：</span>
                  <ul className="text-xs text-lab-muted space-y-0.5 mt-1">
                    <li>• 需要额外的调制器器件</li>
                    <li>• 有插入损耗（~3-6 dB）</li>
                    <li>• 成本较高</li>
                    <li>• 需要驱动放大器</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-lab-muted mt-3">
                <span className="text-lab-text font-medium">典型应用：</span>
                长距离骨干网、城域网、高速相干光通信
              </p>
            </div>
          </div>

          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">常见外部调制器类型</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2 text-sm">电光调制器</h5>
                <p className="text-xs mb-2">
                  基于电光效应（Pockels / Kerr），
                  通过电场改变折射率实现调制。
                </p>
                <div className="text-xs text-lab-muted">
                  <div>• 铌酸锂 (LiNbO₃) 调制器</div>
                  <div>• 硅光 (Si) 调制器</div>
                  <div>• InP 调制器</div>
                </div>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2 text-sm">热光调制器</h5>
                <p className="text-xs mb-2">
                  基于热光效应，通过加热改变折射率。
                  速度慢（μs 级），但功耗低、结构简单。
                </p>
                <div className="text-xs text-lab-muted">
                  <div>• 常用于低速调制</div>
                  <div>• 常用作光开关</div>
                  <div>• 直流偏置调节</div>
                </div>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-purple mb-2 text-sm">电吸收调制器</h5>
                <p className="text-xs mb-2">
                  EAM，基于 Franz-Keldysh 效应，
                  外加电场改变吸收系数。体积小，可与激光器单片集成。
                </p>
                <div className="text-xs text-lab-muted">
                  <div>• EML（激光+调制器集成）</div>
                  <div>• 中等速率应用</div>
                  <div>• 插入损耗较大</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-6" icon={<Gauge className="w-5 h-5 text-laser-green" />} title="调制性能指标">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            评价一个调制系统的性能，需要关注多个指标。
            以下是光通信系统中最重要的调制性能指标：
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">频谱效率 (SE)</h4>
              <p className="text-sm mb-2">
                单位带宽内能够传输的数据速率，是衡量频谱利用效率的核心指标。
              </p>
              <div className="bg-lab-surface/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\eta_s = \\frac{R_b}{B} \\quad (\\text{bit/s/Hz})$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                典型值：OOK ~1，QPSK ~2，16QAM ~4，64QAM ~6 bit/s/Hz
              </p>
            </div>

            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">调制带宽</h4>
              <p className="text-sm mb-2">
                调制器能够有效工作的最高频率范围。
                通常用 3 dB 带宽表示：输出调制深度下降 3 dB 时的频率。
              </p>
              <p className="text-xs text-lab-muted">
                由电极结构、微波损耗、载流子寿命等因素决定。
                现代高速调制器带宽可达 100 GHz 以上。
              </p>
            </div>

            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">半波电压 V_π</h4>
              <p className="text-sm mb-2">
                使相位变化 π（或光强从最大变到最小）所需的驱动电压。
                V_π 越低，调制效率越高，驱动功耗越小。
              </p>
              <p className="text-xs text-lab-muted">
                典型值：LiNbO₃ MZM 约 3-5 V，
                推挽模式下等效 V_π 减半，
                薄膜铌酸锂可低至 &lt; 2 V。
              </p>
            </div>

            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">消光比 (ER)</h4>
              <p className="text-sm mb-2">
                输出最大光功率与最小光功率的比值（dB 表示），
                衡量"0"和"1"电平的区分度。
              </p>
              <div className="bg-lab-surface/50 px-3 py-2 rounded-lg text-xs font-mono">
                ER = 10·log₁₀(P_max / P_min)
              </div>
              <p className="text-xs text-lab-muted mt-2">
                消光比越高，误码率越低。
                典型值：15-25 dB。
              </p>
            </div>

            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-orange mb-2">插入损耗 (IL)</h4>
              <p className="text-sm mb-2">
                光通过调制器后的功率损失，包括耦合损耗、传播损耗等。
              </p>
              <div className="bg-lab-surface/50 px-3 py-2 rounded-lg text-xs font-mono">
                IL = 10·log₁₀(P_in / P_out)
              </div>
              <p className="text-xs text-lab-muted mt-2">
                典型值：3-6 dB。插入损耗越低，系统功率预算越充裕。
              </p>
            </div>

            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">啁啾 (Chirp)</h4>
              <p className="text-sm mb-2">
                调制过程中伴随的瞬时频率漂移。
                啁啾会导致脉冲在色散光纤中展宽，限制传输距离。
              </p>
              <p className="text-xs text-lab-muted">
                啁啾参数 α 描述了相位变化与幅度变化的比值：
                正值表示蓝移（频率升高），负值表示红移（频率降低）。
                推挽 MZM 可实现零啁啾。
              </p>
            </div>
          </div>

          <div className="border border-laser-green/20 bg-laser-green/5 p-4 rounded-xl mt-3">
            <h5 className="font-semibold text-laser-green mb-2 text-sm">🎯 设计权衡</h5>
            <p className="text-sm text-lab-muted">
              调制器设计中存在多个需要权衡的因素：
              <span className="text-lab-text font-medium">V_π 与带宽</span>（更长的电极降低 V_π 但也降低带宽）、
              <span className="text-lab-text font-medium">频谱效率与功率效率</span>（高阶调制 SE 高但需要更高 SNR）、
              <span className="text-lab-text font-medium">集成度与性能</span>（硅光集成度高但损耗较大）。
              实际应用中需要根据具体场景选择最优方案。
            </p>
          </div>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
