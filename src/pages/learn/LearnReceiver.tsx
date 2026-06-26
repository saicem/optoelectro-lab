import { Radio, Zap, BookText } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';

export default function LearnReceiver() {
  return (
    <LearnLayout
      title="光接收器"
      subtitle="光信号的检测：光电二极管、相干接收与数字信号处理"
      currentIndex={7}
      totalChapters={9}
      playgroundPath="/playground/receiver"
      prevChapter={{ path: '/learn/dual-polarization', title: '高级调制', icon: <Zap className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/glossary', title: '术语表', icon: <BookText className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Radio className="w-5 h-5 text-laser-green" />
          光电效应与光电二极管
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光接收器的核心功能是将光信号转换为电信号，这个过程基于
            <span className="text-laser-green font-semibold"><TermNote term="光电效应" /></span>。
            当光子入射到半导体材料上时，如果光子能量大于材料的禁带宽度，
            就会激发产生电子-空穴对，在外加电场的作用下形成光电流。
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_{photon} = h\\nu = \\frac{hc}{\\lambda} > E_g$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 E_g 是半导体的禁带宽度。光子能量必须大于禁带宽度才能产生光电效应。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold text-lab-text mb-2"><TermNote term="PIN 光电二极管" />：</h3>
              <p className="text-sm">
                PIN 管由 P 型层、本征层 (I) 和 N 型层组成。本征层较厚，
                大部分光在其中被吸收，产生的载流子在电场作用下漂移到两端电极，形成光电流。
              </p>
              <p className="text-sm mt-2">
                <TermNote term="响应度" /> R 是衡量 PD 转换效率的指标：
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$R = \\frac{I_{out}}{P_{in}} \\quad (\\text{单位：A/W})$$'}</MathRenderer>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2"><TermNote term="APD 雪崩光电二极管" />：</h3>
              <p className="text-sm">
                APD 利用雪崩倍增效应，使光生载流子在强电场下获得足够高的能量，
                通过碰撞电离产生更多的载流子，从而实现内部增益。
              </p>
              <p className="text-sm mt-2">
                APD 灵敏度更高，但需要较高的反向偏置电压，且噪声较大。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          <TermNote term="直接检测" /> vs <TermNote term="相干接收" />
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">直接检测 (IM/DD)</h4>
              <p className="text-sm">
                直接检测只检测光的强度（功率），丢失了相位和偏振信息。
                结构简单、成本低，广泛用于短距离通信。
              </p>
              <div className="mt-3 text-xs text-lab-muted">
                典型应用：10G EPON、数据中心短距互联
              </div>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">相干检测 (Coherent)</h4>
              <p className="text-sm">
                相干检测使用 <TermNote term="本振光" />与信号光混频，可以同时检测光的幅度、相位和偏振态。
                灵敏度高、频谱效率高，是长距离高速光通信的主流方案。
              </p>
              <div className="mt-3 text-xs text-lab-muted">
                典型应用：100G/400G/800G 长距传输
              </div>
            </div>
          </div>
          <p className="mt-4">
            对于采用偏振复用 (PDM) 的调制信号，必须使用相干检测才能完整恢复 X 和 Y 两个偏振态的 I 和 Q 分量。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          相干接收的结构
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            一个典型的偏振分集相干接收机包含以下部分：
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="text-center mb-3 font-semibold text-lab-text">相干接收机结构</div>
            <div className="text-xs space-y-2">
              <div className="flex items-center justify-center">
                <span className="text-lab-muted">信号光 + 本振光</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-laser-cyan">↓</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 border border-laser-cyan/50 rounded bg-laser-cyan/10">偏振分束器 (PBS)</span>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-2">
                <div className="text-center">
                  <div className="text-laser-green text-xs mb-1">X 偏振</div>
                  <div className="px-2 py-1 border border-laser-green/50 rounded bg-laser-green/10 text-xs">90° 光混频器</div>
                </div>
                <div className="text-center">
                  <div className="text-laser-red text-xs mb-1">Y 偏振</div>
                  <div className="px-2 py-1 border border-laser-red/50 rounded bg-laser-red/10 text-xs">90° 光混频器</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-2">
                <div className="text-center">
                  <div className="px-2 py-1 border border-laser-green/50 rounded bg-laser-green/10 text-xs">4 个平衡 PD</div>
                </div>
                <div className="text-center">
                  <div className="px-2 py-1 border border-laser-red/50 rounded bg-laser-red/10 text-xs">4 个平衡 PD</div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-laser-purple">↓</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 border border-laser-purple/50 rounded bg-laser-purple/10">ADC + DSP</span>
              </div>
              <div className="flex items-center justify-center mt-1">
                <span className="text-lab-muted text-xs">→ 恢复 X_I, X_Q, Y_I, Y_Q</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">本振激光器 (LO)</h4>
                <p className="text-sm">
                  提供一个频率稳定、功率稳定的本地振荡光，与信号光混频。
                  本振光的频率和相位稳定性直接影响接收性能。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">90° 光混频器</h4>
                <p className="text-sm">
                  将信号光和本振光混合，产生同相 (I) 和正交 (Q) 两个分量的光信号，
                  使得相位信息可以被检测出来。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text"><TermNote term="平衡探测器" /></h4>
                <p className="text-sm">
                  由两个特性相同的 PD 组成，输出为两路光电流的差值。
                  可以抑制本振光的强度噪声，提高信噪比。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-red/20 text-laser-red flex items-center justify-center flex-shrink-0">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">模数转换器 (ADC)</h4>
                <p className="text-sm">
                  将模拟电信号转换为数字信号，以便后续进行数字信号处理。
                  ADC 的采样率和比特数是决定接收机性能的关键参数。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          接收机噪声分析
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光接收机的性能极限主要受噪声影响。了解噪声来源对于理解灵敏度限制至关重要。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">散粒噪声 (Shot Noise)</h4>
              <p className="text-sm mb-2">
                由光子到达的随机性产生。每个光子产生的电子-空穴对数目具有统计波动。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\langle i_s^2 \\rangle = 2e I B$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                e 是电子电荷，I 是平均光电流，B 是带宽。
              </p>
            </div>
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">热噪声 (Thermal Noise)</h4>
              <p className="text-sm mb-2">
                由接收电路中载流子的热运动产生。与温度成正比，与光功率无关。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\langle i_T^2 \\rangle = \\frac{4kTB}{R}$$'}</MathRenderer>
              </div>
              <p className="text-xs text-lab-muted mt-2">
                k 是玻尔兹曼常数，T 是温度，R 是负载电阻。
              </p>
            </div>
            <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2"><TermNote term="噪声等效功率" /> (NEP)</h4>
              <p className="text-sm mb-2">
                产生与噪声电流相同大小的信号所需的光功率，是接收机噪声的综合指标。
              </p>
              <div className="bg-lab-bg/50 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$\\text{NEP} = \\frac{\\sqrt{\\langle i_n^2 \\rangle}}{R} \\quad (\\text{W/}\\sqrt{\\text{Hz}})$$'}</MathRenderer>
              </div>
            </div>
          </div>

          {/* 信噪比与灵敏度 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">信噪比 (SNR) 与接收灵敏度</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-cyan mb-2">SNR 定义</h5>
                <MathRenderer>{'$$\\text{SNR} = \\frac{\\langle i_{sig}^2 \\rangle}{\\langle i_{shot}^2 \\rangle + \\langle i_{thermal}^2 \\rangle}$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">
                  对于相干接收，主要受散粒噪声限制（本振光功率足够大时）。
                </p>
              </div>
              <div className="bg-lab-surface/50 p-3 rounded-lg">
                <h5 className="font-medium text-laser-green mb-2">灵敏度估算</h5>
                <MathRenderer>{'$$P_{min} \\approx \\frac{Q \\cdot \\sqrt{2eB}}{R} \\quad (\\text{直接检测})$$'}</MathRenderer>
                <p className="text-xs text-lab-muted mt-2">
                  Q 值由目标 BER 决定（BER = 10⁻¹² → Q ≈ 7）。
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm">
            相干接收利用本振光的放大作用，使散粒噪声成为主导噪声源，从而获得更高的灵敏度。
            这就是相干接收比直接检测灵敏度更好的主要原因。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          <TermNote term="数字信号处理 (DSP)" />
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            现代相干光通信系统中，大部分信号处理工作都在数字域完成。
            DSP 芯片是接收机的"大脑"，负责补偿各种传输损伤，恢复原始数据。
          </p>

          {/* DSP 处理流程 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3 text-center">DSP 信号处理流程</h4>
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-laser-cyan/10 border border-laser-cyan/30 rounded">ADC 采样</span>
              <span className="text-laser-cyan">→</span>
              <span className="px-2 py-1 bg-laser-green/10 border border-laser-green/30 rounded">色散补偿</span>
              <span className="text-laser-cyan">→</span>
              <span className="px-2 py-1 bg-laser-purple/10 border border-laser-purple/30 rounded">偏振解复用</span>
              <span className="text-laser-cyan">→</span>
              <span className="px-2 py-1 bg-laser-red/10 border border-laser-red/30 rounded">载波恢复</span>
              <span className="text-laser-cyan">→</span>
              <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/30 rounded">符号判决</span>
              <span className="text-laser-cyan">→</span>
              <span className="px-2 py-1 bg-lab-surface/50 border border-lab-border/30 rounded">FEC 解码</span>
            </div>
          </div>

          {/* 均衡算法详细说明 */}
          <div className="bg-lab-bg/50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-lab-text mb-3">自适应均衡算法详解</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-laser-cyan/30 bg-laser-cyan/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-cyan mb-2">恒模算法 (CMA)</h5>
                <p className="text-sm">
                  最常用的偏振解复用算法。利用星座点的恒定模值特性（如 QPSK），通过最小化输出模值的波动来分离两个偏振态。
                </p>
                <div className="bg-lab-bg/50 px-3 py-2 rounded-lg mt-2 text-xs">
                  <MathRenderer>{'$$\\vec{h}_{n+1} = \\vec{h}_n - \\mu \\cdot \\vec{x}_n \\cdot (|y_n|^2 - R^2)$$'}</MathRenderer>
                </div>
                <p className="text-xs text-lab-muted mt-2">
                  μ 是步长参数，R² 是目标模值，y_n 是输出信号。
                </p>
              </div>
              <div className="border border-laser-purple/30 bg-laser-purple/5 p-4 rounded-xl">
                <h5 className="font-semibold text-laser-purple mb-2">多模算法 (MMA)</h5>
                <p className="text-sm">
                  用于高阶 QAM（如 16QAM、64QAM）。星座点模值不恒定，需要根据符号的实际模值进行判决导向均衡。
                </p>
                <p className="text-xs text-lab-muted mt-2">
                  MMA 在星座点的多个模值层之间进行判决，适应非恒模信号。
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">色散补偿</h4>
              <p className="text-sm">
                光纤中的色度色散会导致脉冲展宽。DSP 使用有限冲激响应 (FIR) 滤波器
                或频域均衡来补偿色散。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">偏振解复用</h4>
              <p className="text-sm">
                使用恒模算法 (CMA) 等自适应均衡算法，跟踪偏振态的变化，
                将 X 和 Y 两个偏振态的信号分离开。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">载波恢复</h4>
              <p className="text-sm">
                包括频率偏移估计和相位噪声估计，恢复光载波的频率和相位，
                以便正确解调星座点。常用 Viterbi-Viterbi 算法。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">非线性补偿</h4>
              <p className="text-sm">
                对于长距离传输，光纤的非线性效应（如自相位调制、交叉相位调制）
                也需要通过 DSP 进行补偿。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          接收机性能指标
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2"><TermNote term="接收灵敏度" /></h4>
              <p className="text-sm">
                在满足一定误码率（如 BER = 10⁻¹²）的前提下，
                接收机所需的最小输入光功率。灵敏度越高（数值越小），系统传输距离越远。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">响应度</h4>
              <p className="text-sm">
                单位光功率产生的光电流，单位 A/W。
                反映了光电转换的效率。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">带宽</h4>
              <p className="text-sm">
                接收机能够有效响应的最高调制频率。
                必须与信号的比特率/波特率匹配。
              </p>
            </div>
          </div>
          <div className="mt-4 bg-lab-bg/50 px-4 py-3 rounded-lg">
            <div className="font-semibold text-lab-text mb-2">误码率 (BER) 与 Q 值：</div>
            <p className="text-sm">
              误码率是衡量系统性能的最终指标。Q 值与 BER 有对应关系：
            </p>
            <div className="mt-2 text-xs">
              <MathRenderer>{'$$\\text{BER} \\approx \\frac{1}{2} \\text{erfc}\\left(\\frac{Q}{\\sqrt{2}}\\right)$$'}</MathRenderer>
            </div>
            <p className="text-sm mt-2">
              通常要求 BER &lt; 10⁻¹²，对应的 Q 值约为 7 dB。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          总结：完整的光通信系统
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            至此，我们已经学习了一个完整光通信系统的各个组成部分：
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-laser-red/20 text-laser-red flex items-center justify-center mb-2">
                  <span className="text-lg">💡</span>
                </div>
                <span className="text-lab-text font-semibold">激光器</span>
                <div className="text-xs text-lab-muted mt-1">产生光载波</div>
              </div>
              <div className="text-laser-cyan text-xl">→</div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center mb-2">
                  <span className="text-lg">📡</span>
                </div>
                <span className="text-lab-text font-semibold">调制器</span>
                <div className="text-xs text-lab-muted mt-1">加载信号</div>
              </div>
              <div className="text-laser-cyan text-xl">→</div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center mb-2">
                  <span className="text-lg">🔌</span>
                </div>
                <span className="text-lab-text font-semibold">光纤</span>
                <div className="text-xs text-lab-muted mt-1">传输信号</div>
              </div>
              <div className="text-laser-cyan text-xl">→</div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center mb-2">
                  <span className="text-lg">📻</span>
                </div>
                <span className="text-lab-text font-semibold">接收机</span>
                <div className="text-xs text-lab-muted mt-1">恢复信号</div>
              </div>
            </div>
          </div>
          <p>
            从激光器产生光载波，到调制器加载数据信号，经过光纤传输，
            最后由接收机检测并恢复数据——这就是一个完整的光通信链路。
            其中，<strong>DP-IQ 调制器 + 相干接收</strong> 的组合，
            是当前高速光通信系统中频谱效率最高、应用最广泛的方案。
          </p>
          <p className="text-center mt-6">
            <span className="text-laser-cyan font-semibold">🎉 恭喜你完成了全部学习！</span>
            <br />
            <span className="text-sm text-lab-muted">
              现在去 Playground 动手实验，巩固所学知识吧！
            </span>
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
