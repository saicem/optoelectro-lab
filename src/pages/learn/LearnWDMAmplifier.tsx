import { Network, GitBranch, CircuitBoard, Zap, Gauge, Cable } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [
  { id: 's-0', title: 'WDM 波分复用基本原理' },
  { id: 's-1', title: 'ITU-T 波长栅格' },
  { id: 's-2', title: '复用/解复用器件' },
  { id: 's-3', title: 'EDFA 掺铒光纤放大器' },
  { id: 's-4', title: '拉曼放大器与系统方案' },
  { id: 's-5', title: 'Flex-Grid 与弹性光网络' },
];

export default function LearnWDMAmplifier() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN.WDM_AMPLIFIER,
  );
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="WDM 与光放大器"
      subtitle="波分复用与光放大技术共同构建了现代大容量长距离光传输系统的基石"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 4 · 系统篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Network className="w-5 h-5 text-laser-cyan" />} title="WDM 波分复用基本原理">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">
              <TermNote term="WDM" />
            </span>
            的核心思想非常直观：在一根光纤中同时传输多个不同波长的光信号，每个波长承载独立的数据流。
            就像在一条公路上划分多条车道，WDM 将光纤的宽广光学带宽划分为若干独立的信道。
          </p>
          <p>光通信的容量增长史，本质上就是 WDM 信道数量的增长史。 单根光纤的总传输容量由以下公式决定：</p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>{'$$C_{total} = \\sum_{i=1}^{N} C_i \\approx N \\times C_{channel}$$'}</MathRenderer>
          </div>
          <p>
            其中 N 为波长信道数，C_channel 为单波长承载的比特率。 在 WDM
            技术出现之前，单纤仅能传输一个波长的信号；而现代商用 WDM 系统可在一根光纤中同时传输 80-160
            个波长，配合每波长 400G/800G 的调制速率，单纤容量已达数十 Tb/s 量级。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-1">容量倍增路径</h4>
              <p className="text-sm">增加波长数 N（WDM 扩展）→ 提高每波长速率（高阶调制+DSP）→ 二者叠加</p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-1">关键优势</h4>
              <p className="text-sm">无需铺设新光纤即可大幅提升容量，对已有光纤基础设施的"软升级"</p>
            </div>
          </div>
          <p>
            WDM 的一个关键优势是<strong>协议透明性</strong>——每个波长信道可以承载不同速率、不同调制格式、
            不同协议的数据流，互不干扰。这使得 WDM 成为骨干网、城域网和数据中心互联 (DCI) 的首选技术。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<GitBranch className="w-5 h-5 text-laser-cyan" />} title="ITU-T 波长栅格">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            为了实现 WDM 系统的互操作性，<span className="text-laser-cyan font-semibold">ITU-T G.694.1</span>
            标准定义了 <TermNote term="DWDM" /> 系统的频率栅格。所有 WDM 设备制造商都遵循这一标准，
            确保不同厂家的光模块和复用/解复用器可以协同工作。
          </p>
          <p>
            标准栅格以 <TermNote term="信道间隔" /> 为基本单位，常用的间隔包括：
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {'$$\\Delta f = 100\\,\\text{GHz} \\approx 0.8\\,\\text{nm} \\quad (\\text{C 波段, 1550 nm})$$'}
            </MathRenderer>
            <MathRenderer>
              {'$$\\Delta f = 50\\,\\text{GHz} \\approx 0.4\\,\\text{nm} \\quad (\\text{更高的频谱效率})$$'}
            </MathRenderer>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">参数</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">
                    <TermNote term="DWDM" />
                  </th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">
                    <TermNote term="CWDM" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3">信道间隔</td>
                  <td className="py-2 px-3">100 GHz / 50 GHz / 25 GHz</td>
                  <td className="py-2 px-3">20 nm (~2500 GHz)</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3">信道数（典型）</td>
                  <td className="py-2 px-3">40 / 80 / 160</td>
                  <td className="py-2 px-3">18</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3">波长范围</td>
                  <td className="py-2 px-3">C 波段 / L 波段</td>
                  <td className="py-2 px-3">1270 - 1610 nm (O+E+S+C+L)</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3">激光器要求</td>
                  <td className="py-2 px-3">温控 + 频率锁定</td>
                  <td className="py-2 px-3">无温控，低成本</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">典型应用</td>
                  <td className="py-2 px-3">骨干网、超长距</td>
                  <td className="py-2 px-3">城域网、接入网</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            ITU-T 栅格以 <strong>193.1 THz</strong> 作为参考频率（对应波长约 1552.52 nm），
            其他信道频率按固定间隔向两侧扩展。例如，100 GHz 栅格的系统信道频率为 193.1 ± N × 0.1 THz（N 为整数）。50 GHz
            栅格则将间隔减半，信道数翻倍。
          </p>
          <div className="bg-lab-surface/30 border border-laser-cyan/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>发展趋势：</strong>信道间隔正从 100 GHz → 50 GHz → 25 GHz 持续缩小，以提升频谱效率。
              但更窄的间隔对激光器频率稳定性和滤波器的信道隔离度提出了更高要求。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<CircuitBoard className="w-5 h-5 text-laser-cyan" />} title="复用/解复用器件">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            将多个波长合并到一根光纤（复用）或从一根光纤分离出各个波长（解复用），需要高性能的
            <strong>无源光器件</strong>。两种最主流的方案是 <TermNote term="AWG" /> 和薄膜滤波器。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">阵列波导光栅 (AWG)</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>基于平面光波导 (PLC) 技术集成制造</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>工作原理类似衍射光栅：不同波长经波导阵列后产生不同的相位延迟，在输出端空间分离</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>支持 50 GHz / 25 GHz 间隔，信道数可达 64-128 个</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>典型插损 3-6 dB，串扰 &lt; -25 dB</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">薄膜滤波器 (TFF)</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>利用多层介质膜干涉效应实现波长选择</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>通过级联多个 TFF 组成复用/解复用模块</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>通带平坦、通道隔离度好</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>信道数较多时体积大、成本高</span>
                </li>
              </ul>
            </div>
          </div>
          <p>
            AWG 是目前 <TermNote term="DWDM" /> 系统的首选方案，因为它可以在单个芯片上集成数十个信道，
            体积紧凑、成本低、一致性高。在接收端，AWG 作为
            <TermNote term="光分波器" />
            将各波长信道分离后， 分别送入独立的相干接收机进行解调。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {'$$\\Delta \\theta = \\frac{2\\pi n \\Delta L}{\\lambda} \\quad \\text{(相邻波导间的相位差)}$$'}
            </MathRenderer>
            <p className="text-sm mt-2">
              AWG 的核心设计是通过波导阵列的长度差 ΔL 产生与波长相关的相位差 Δθ，
              不同波长在输出端聚焦到不同的输出波导位置，从而实现波长分离。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<Zap className="w-5 h-5 text-laser-cyan" />} title="EDFA 掺铒光纤放大器">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">
              <TermNote term="EDFA" />
            </span>
            是当代光通信系统中最关键的光放大器件。它使光信号在传输过程中可以直接在光域放大，
            无需光电-电光转换，大幅简化了长距离系统的结构。
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-1">工作原理</h4>
              <p className="text-sm">
                掺铒光纤中的 Er³⁺ 离子被 980 nm 或 1480 nm 泵浦激光激发到高能级， 信号光通过时受激辐射产生放大
              </p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-green/20">
              <h4 className="font-semibold text-laser-green mb-1">增益带宽</h4>
              <p className="text-sm">C 波段 ~1530-1565 nm（~35 nm 平坦增益），L 波段 1565-1625 nm（扩展型 EDFA）</p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-1">典型指标</h4>
              <p className="text-sm">
                增益 20-40 dB，输出功率 +13 到 +23 dBm，
                <TermNote term="噪声系数" /> 4-6 dB
              </p>
            </div>
          </div>
          <div className="bg-lab-bg/40 p-4 rounded-lg mt-2">
            <h4 className="font-semibold text-lab-text mb-2">ASE 噪声与噪声系数</h4>
            <p className="mb-2">
              EDFA 在放大信号的同时会引入
              <TermNote term="ASE 噪声" />
              ——铒离子的
              <TermNote term="自发辐射" />
              被放大后产生的宽带背景噪声。ASE 是限制 WDM 系统信噪比的根本因素。
            </p>
            <MathRenderer>
              {'$$NF = \\frac{SNR_{in}}{SNR_{out}} = 2n_{sp} + \\frac{1}{G} \\approx 2n_{sp}$$'}
            </MathRenderer>
            <p className="text-sm mt-1">
              其中 n_sp ≥ 1 是自发辐射因子，G 是增益。理想 EDFA 的 NF 极限为 3 dB（n_sp = 1）。 实际商用 EDFA 的 NF 在
              4-6 dB 范围内。
            </p>
          </div>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <h4 className="font-semibold text-lab-text mb-2">EDFA 的三种典型应用场景</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-laser-cyan font-medium">前置放大器 (Pre-amp)</span>
                <span className="text-lab-muted">：置于接收端前，放大微弱信号至接收机所需功率，噪声要求严格</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-laser-green font-medium">功率放大器 (Booster)</span>
                <span className="text-lab-muted">：置于发射端后，将信号功率提升至入纤功率，关注输出功率</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-laser-purple font-medium">线路放大器 (In-line)</span>
                <span className="text-lab-muted">：置于中继节点，补偿光纤损耗，需平衡增益和噪声</span>
              </div>
            </div>
          </div>
          <p>
            EDFA 的出现使得 WDM 长距离传输成为可能。在典型的陆地骨干网中， 每 80-100 km 设置一个 EDFA 中继站，每一级
            EDFA 同时放大多个波长信道。 级联 EDFA 的噪声会累积，因此系统总长度受 OSNR 限制。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<Gauge className="w-5 h-5 text-laser-cyan" />} title="拉曼放大器与系统方案">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            除了 EDFA 之外，<span className="text-laser-cyan font-semibold">拉曼放大器 (Raman Amplifier)</span>
            是另一种重要的光放大技术，它利用光纤本身的
            <TermNote term="非线性效应" />
            中的
            <strong>受激拉曼散射 (SRS)</strong> 来实现分布式的信号放大。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">分布式拉曼放大</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>高功率泵浦光从光纤末端注入（反向泵浦），在整段光纤中产生分布式增益</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>信号沿光纤传输时被持续放大，等效于降低光纤的"有效损耗"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>拉曼频移约 13 THz（石英光纤），泵浦波长通常比信号波长短约 100 nm</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">EDFA + 拉曼混合放大</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>拉曼提供分布式增益改善 OSNR，EDFA 提供集中式高增益</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>可降低噪声系数约 2-4 dB，显著提升系统传输距离</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>超长距海底光缆和陆地骨干网广泛采用</span>
                </li>
              </ul>
            </div>
          </div>
          <p>
            拉曼放大的核心优势在于其<strong>分布式特性</strong>：传统的 EDFA 是集中式放大， 信号在到达 EDFA
            之前已经被光纤损耗衰减到较低水平，导致接收 OSNR 下降。
            而分布式拉曼放大沿光纤全程提供增益，使信号功率始终维持在较高水平， 从而显著改善系统的 OSNR 性能。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>
              {'$$\\frac{dP_s}{dz} = -\\alpha_s P_s + g_R P_p P_s \\quad \\text{(拉曼放大耦合方程)}$$'}
            </MathRenderer>
            <p className="text-sm mt-2">
              其中 g_R 是拉曼增益系数，P_p 是泵浦功率，α_s 是信号在光纤中的损耗系数。
              在实际系统中，拉曼泵浦功率通常为数百 mW 到数 W 量级。
            </p>
          </div>
          <div className="bg-lab-surface/30 border border-laser-cyan/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>典型方案对比：</strong>纯 EDFA 方案适合 600-800 km 的陆地传输； EDFA + 拉曼混合方案可将距离扩展至
              1500-2000 km；超长距海底光缆系统 （如跨太平洋 6000-9000 km）则需综合使用拉曼放大、EDFA
              和先进的编码调制技术。
            </p>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<Cable className="w-5 h-5 text-laser-cyan" />} title="Flex-Grid 与弹性光网络">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            传统 WDM 系统使用<strong>固定栅格 (Fixed-Grid)</strong>——所有信道使用相同的、固定的信道间隔 （如 50
            GHz）。这种方式虽然实现简单，但频谱利用率不高： 低速信道（如 100G QPSK）占用 50 GHz 带宽造成浪费，
            而高速信道（如 800G）可能需要超过 50 GHz 的带宽却无法扩展。
          </p>
          <p>
            <span className="text-laser-cyan font-semibold">Flex-Grid（弹性栅格）</span>是 ITU-T G.694.1
            标准的新一代波长栅格方案。它将频谱划分为更细的粒度 ——<strong>12.5 GHz 的频槽 (slot)</strong>
            ，每个信道可以占用连续整数个频槽 （如 2 个 = 25 GHz，4 个 = 50 GHz，6 个 = 75 GHz
            等），实现信道带宽的按需分配。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-2">弹性光网络 (EON)</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>带宽可变：每个信道分配与实际速率匹配的频谱宽度</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>频谱碎片管理：动态分配和回收频谱资源</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>软件定义光网络 (SDON)：通过控制平面实现灵活调度</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-2">频谱效率提升</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>固定 50 GHz 栅格：400G 信号频谱效率 ~8 bit/s/Hz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>Flex-Grid 37.5 GHz：400G DP-16QAM 频谱效率可提升至 ~10.7 bit/s/Hz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>整体频谱利用率可提升 30-50%</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <p>
              Flex-Grid 的实现需要配套的<strong>可调谐收发器</strong>和<strong>带宽可变光交叉连接 (BV-WSS)</strong>。
              波长选择开关 (WSS) 是 Flex-Grid 网络中的核心交换器件，它可以在频域上
              灵活地将任意频谱切片路由到任意输出端口。
            </p>
          </div>
          <p className="text-sm text-lab-muted italic">
            Flex-Grid 是向未来弹性光网络演进的关键一步，它使光网络具备了类似 IP 网络的灵活性和可编程性，
            可以根据实际业务需求动态调整每信道带宽和调制格式，实现频谱资源的最优化利用。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
