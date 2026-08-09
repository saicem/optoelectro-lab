import { Layers, Zap, Activity, TrendingUp, CircuitBoard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面章节，按文档 ## 顺序对应（含总结）
const pageSections = [
  { id: 's-0', title: 'PN 结的形成' },
  { id: 's-1', title: '内建电场与势垒' },
  { id: 's-2', title: '能带图' },
  { id: 's-3', title: '电流-电压特性' },
  { id: 's-4', title: 'PN 结在光通信中的重要性' },
  { id: 's-5', title: '总结' },
];

// 内建电势典型值卡片数据
const vbiData = [
  { material: 'Si PN 结', value: '0.6–0.7 V', color: 'text-laser-cyan' },
  { material: 'Ge PN 结', value: '0.2–0.3 V', color: 'text-laser-green' },
  { material: 'GaAs PN 结', value: '1.0–1.3 V', color: 'text-laser-purple' },
  { material: 'InGaAs PN 结', value: '0.5–0.6 V', color: 'text-laser-red' },
];

// 光电器件应用卡片数据（使用显式 Tailwind 类名以兼容静态分析）
const deviceData = [
  {
    name: '光电二极管',
    desc: '利用反向偏置下的光生载流子——耗尽区电场分离光生电子-空穴对，形成光电流。暗电流是限制其灵敏度的主要因素。',
    cardBg: 'bg-laser-cyan/10',
    cardBorder: 'border-laser-cyan/30',
    titleColor: 'text-laser-cyan',
    useTermNote: true,
  },
  {
    name: '半导体激光器',
    desc: '利用正向偏置下的载流子注入——正向偏压降低势垒，电子和空穴注入有源区复合发光。',
    cardBg: 'bg-laser-green/10',
    cardBorder: 'border-laser-green/30',
    titleColor: 'text-laser-green',
    useTermNote: false,
  },
  {
    name: '光伏器件',
    desc: '利用光照下的光生电压——光生载流子在 PN 结内建电场下分离，产生外电路电流。',
    cardBg: 'bg-laser-purple/10',
    cardBorder: 'border-laser-purple/30',
    titleColor: 'text-laser-purple',
    useTermNote: false,
  },
  {
    name: '电吸收调制器（EAM）',
    desc: '利用反向偏置下量子阱的量子限制斯塔克效应（QCSE）——改变偏置电压调节吸收边，实现对光信号的调制。',
    cardBg: 'bg-laser-red/10',
    cardBorder: 'border-laser-red/30',
    titleColor: 'text-laser-red',
    useTermNote: false,
  },
];

export default function LearnPNJunctionBasics() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } =
    useChapterNavigation(ROUTES.LEARN.PN_JUNCTION_BASICS);
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="PN 结基础"
      subtitle="从 P 型与 N 型接触到二极管 I-V 特性：理解半导体器件的核心结构"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Layers className="w-5 h-5 text-laser-cyan" />} title="PN 结的形成">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="font-semibold text-laser-cyan">PN 结（P-N Junction）</span>{' '}
            是半导体器件的核心结构，由 P 型半导体和 N 型半导体结合而成。它形成了半导体器件中的
            <span className="font-semibold text-laser-green">内建电场</span>
            ，是光电二极管、激光器等器件工作的物理基础。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">扩散过程</h3>
          <p>
            当 P 型半导体（含大量空穴）和 N 型半导体（含大量电子）接触时，由于浓度差：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono">•</span>
              <span>
                <span className="text-laser-cyan font-mono">N 区</span> 的电子向 P 区扩散，与空穴复合消失
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono">•</span>
              <span>
                <span className="text-laser-green font-mono">P 区</span> 的空穴向 N 区扩散，与电子复合消失
              </span>
            </li>
          </ul>
          <p>
            这形成了<span className="font-semibold text-laser-purple">扩散电流</span>
            。扩散的载流子在结区附近复合，留下不能移动的离子。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">空间电荷区</h3>
          <p>扩散后：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">N 侧</span> 留下带正电的施主离子（
                <span className="text-laser-cyan font-mono">N_D^+</span>）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-green">P 侧</span> 留下带负电的受主离子（
                <span className="text-laser-green font-mono">N_A^-</span>）
              </span>
            </li>
          </ul>
          <p>
            这一区域几乎无可动载流子，称为<span className="font-semibold text-laser-orange">耗尽区</span>
            （Depletion Region）或<span className="font-semibold text-laser-red">空间电荷区</span>
            （Space Charge Region）。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Zap className="w-5 h-5 text-laser-green" />} title="内建电场与势垒">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">内建电场</h3>
          <p>
            空间电荷区中的固定电荷形成从 N 区指向 P 区的
            <span className="font-semibold text-laser-green">内建电场</span>{' '}
            <span className="text-laser-cyan font-mono">E</span>
            。该电场阻止载流子继续扩散，直到扩散和漂移达到动态平衡，净电流为零。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">内建电势</h3>
          <p>
            内建电场对应一个电势差，称为<span className="font-semibold text-laser-purple">内建电势</span>
            （也称接触电势或势垒电压）：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$V_{bi} = \\frac{k_B T}{q} \\ln\\left(\\frac{N_A N_D}{n_i^2}\\right)$$'}</MathRenderer>
          </div>
          <p>
            热电压 <span className="text-laser-cyan font-mono">k_B T/q ≈ 26 mV</span>（300 K）。
          </p>

          <h4 className="font-semibold text-lab-text pt-2 text-sm">典型值</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {vbiData.map((item) => (
              <div key={item.material} className="bg-lab-bg/50 p-3 rounded-xl text-center">
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                <div className="text-xs text-lab-muted mt-0.5">{item.material}</div>
              </div>
            ))}
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<Activity className="w-5 h-5 text-laser-purple" />} title="能带图">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            平衡时，整个 PN 结的费米能级 <span className="text-laser-cyan font-mono">E_F</span> 统一。由于内建电势{' '}
            <span className="text-laser-green font-mono">V_bi</span> 的存在，能带在结区发生弯曲：
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">N 区</span>：导带底{' '}
                <span className="text-laser-cyan font-mono">E_c</span> 较低（电子势能低），{' '}
                <span className="text-laser-cyan font-mono">E_F</span> 靠近{' '}
                <span className="text-laser-cyan font-mono">E_c</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-green">P 区</span>：导带底{' '}
                <span className="text-laser-green font-mono">E_c</span> 较高（电子势能高），{' '}
                <span className="text-laser-green font-mono">E_F</span> 靠近{' '}
                <span className="text-laser-green font-mono">E_v</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-purple">结区</span>：能带弯曲量为{' '}
                <span className="text-laser-purple font-mono">qV_bi</span>，形成势垒
              </span>
            </li>
          </ul>
          <p>
            能带弯曲的物理含义：N 区电子要扩散到 P 区，必须克服{' '}
            <span className="text-laser-purple font-mono">qV_bi</span> 的势垒；P 区空穴要扩散到 N
            区，同样需要克服势垒。这个势垒就是 PN 结整流特性的根源。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-3" icon={<TrendingUp className="w-5 h-5 text-laser-red" />} title="电流-电压特性">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">肖克利方程</h3>
          <p>
            PN 结的电流-电压关系由<span className="font-semibold text-laser-red">肖克利方程</span>
            （理想二极管方程）描述：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$I = I_S \\left(e^{\\frac{qV}{\\eta k_B T}} - 1\\right)$$'}</MathRenderer>
          </div>
          <p>其中：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan font-mono">•</span>
              <span>
                <span className="text-laser-cyan font-mono">I_S</span>：反向饱和电流
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono">•</span>
              <span>
                <span className="text-laser-green font-mono">η</span>：理想因子（理想情况{' '}
                <span className="text-laser-green font-mono">η = 1</span>，复合电流主导时{' '}
                <span className="text-laser-green font-mono">η = 2</span>）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple font-mono">•</span>
              <span>
                <span className="text-laser-purple font-mono">V</span>：外加电压
              </span>
            </li>
          </ul>

          <h3 className="font-semibold text-lab-text pt-2">正向偏置（V &gt; 0）</h3>
          <p>
            外加电压削弱内建电场，势垒降低为{' '}
            <span className="text-laser-cyan font-mono">q(V_bi - V)</span>
            ，耗尽区变窄。多子扩散增强，电流指数增长。硅 PN 结的开启电压约{' '}
            <span className="text-laser-cyan font-mono">0.6–0.7 V</span>。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">反向偏置（V &lt; 0）</h3>
          <p>
            外加电压增强内建电场，势垒升高，耗尽区变宽。多子扩散被完全抑制，只有少子在耗尽区电场作用下漂移，形成微弱的
            <span className="font-semibold text-laser-red">反向饱和电流</span>{' '}
            <span className="text-laser-red font-mono">I_S</span>。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">整流特性的直觉理解</h3>
          <p>PN 结像一个"单向阀"：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-green font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-green">正向偏置</span> 时，势垒降低，多子大量涌过 → 大电流
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-red font-mono">•</span>
              <span>
                <span className="font-semibold text-laser-red">反向偏置</span> 时，势垒升高，只有少子能通过 → 微弱电流
              </span>
            </li>
          </ul>
          <p>这种非线性 I-V 特性是二极管、光电探测器、激光器等器件工作的基础。</p>

          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="border border-laser-green/30 bg-laser-green/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">正向偏置（导通）</h4>
              <div className="text-sm text-lab-muted">势垒降低 → 大电流指数增长</div>
            </div>
            <div className="border border-laser-red/30 bg-laser-red/5 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">反向偏置（截止）</h4>
              <div className="text-sm text-lab-muted">势垒升高 → 仅微弱反向饱和电流</div>
            </div>
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-4" icon={<CircuitBoard className="w-5 h-5 text-laser-orange" />} title="PN 结在光通信中的重要性">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>PN 结是几乎所有半导体光电器件的基石：</p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            {deviceData.map((device) => (
              <div key={device.name} className={`${device.cardBg} ${device.cardBorder} p-4 rounded-lg border`}>
                <div className={`text-sm font-semibold ${device.titleColor} mb-2`}>
                  {device.useTermNote ? <TermNote term={device.name} /> : device.name}
                </div>
                <p className="text-xs text-lab-muted">{device.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-5" icon={<CheckCircle className="w-5 h-5 text-laser-cyan" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>PN 结的物理图像可以归纳为：</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">
                  <span className="text-laser-cyan">扩散形成耗尽区</span> → 固定离子留下空间电荷
                </h4>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">
                  <span className="text-laser-green">空间电荷形成内建电场</span> → 阻止进一步扩散，建立平衡
                </h4>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-purple/20 text-laser-purple flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">
                  <span className="text-laser-purple">外加电压改变势垒高度</span> → 控制电流通断（整流效应）
                </h4>
              </div>
            </div>
          </div>
          <p className="text-sm mt-2">
            这些直觉理解足以支撑对光电器件工作原理的定性分析。更精确的定量分析——耗尽区宽度的泊松方程求解、结电容、暗电流的四大物理机制——将在{' '}
            <Link to={ROUTES.LEARN.PN_JUNCTION_ADVANCED} className="text-laser-cyan hover:underline">
              PN 结进阶：暗电流与耗尽区分析
            </Link>{' '}
            中展开。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
