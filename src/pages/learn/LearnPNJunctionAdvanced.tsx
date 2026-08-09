import { Layers, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

// 页面分节：按文档 ## 顺序对应（含“总结”）
const pageSections = [
  { id: 's-0', title: '耗尽区宽度与电容' },
  { id: 's-1', title: '暗电流' },
  { id: 's-2', title: '总结' },
];

// 暗电流四大机制卡片数据
const darkCurrentMechanisms = [
  {
    index: 1,
    name: '扩散电流（Diffusion Current）',
    color: 'cyan',
    border: 'border-laser-cyan/30',
    bg: 'bg-laser-cyan/5',
    badge: 'bg-laser-cyan/20 text-laser-cyan',
    title: 'text-laser-cyan',
    intro: '少子在耗尽区边缘的热扩散产生。这是理想 PN 结的反向饱和电流 I_S：',
    formula: '$$I_{diff} = qA\\left(\\frac{D_n}{L_n}n_{p0} + \\frac{D_p}{L_p}p_{n0}\\right)$$',
    mid: '利用 n_p0 = n_i²/N_A 和 p_n0 = n_i²/N_D：',
    formula2: '$$I_{diff} \\propto n_i^2 \\propto T^3 \\exp\\left(-\\frac{E_g}{k_B T}\\right)$$',
    feature: '与 n_i² 成正比，对温度极其敏感。窄带隙材料（如 InGaAs）的扩散电流远大于宽带隙材料（如 Si）。',
  },
  {
    index: 2,
    name: '产生-复合电流（Generation-Recombination Current）',
    color: 'green',
    border: 'border-laser-green/30',
    bg: 'bg-laser-green/5',
    badge: 'bg-laser-green/20 text-laser-green',
    title: 'text-laser-green',
    intro: '耗尽区内陷阱中心（缺陷、杂质）通过 Shockley-Read-Hall（SRH）过程产生电子-空穴对，被电场扫出形成电流：',
    formula: '$$I_{gr} = \\frac{qA n_i W}{\\tau_{eff}}$$',
    mid: '其中 W 为耗尽区宽度，τ_eff 为耗尽区有效载流子寿命。',
    formula2: '$$I_{gr} \\propto n_i \\propto T^{3/2} \\exp\\left(-\\frac{E_g}{2k_B T}\\right)$$',
    feature: '与 n_i 成正比（而非 n_i²），温度依赖性弱于扩散电流。在低偏压和小带隙器件中常占主导。反向偏置增大使 W 增大，I_gr 随之增大。',
  },
  {
    index: 3,
    name: '隧穿电流（Tunneling Current）',
    color: 'purple',
    border: 'border-laser-purple/30',
    bg: 'bg-laser-purple/5',
    badge: 'bg-laser-purple/20 text-laser-purple',
    title: 'text-laser-purple',
    intro: '高掺杂或高电场下，价带电子直接量子隧穿到导带（带间隧穿），或通过陷阱辅助隧穿（TAT）：',
    formula: '$$I_{tun} \\propto \\exp\\left(-\\frac{4\\sqrt{2m^*E_g}}{3\\hbar qE}\\right)$$',
    mid: '',
    formula2: '',
    feature: '与电场强度强相关，高掺杂结（结宽很窄）中显著。在 InGaAs 等窄带隙探测器的高反向偏置下尤为重要。温度依赖性弱。',
  },
  {
    index: 4,
    name: '表面漏电流（Surface Leakage Current）',
    color: 'red',
    border: 'border-laser-red/30',
    bg: 'bg-laser-red/5',
    badge: 'bg-laser-red/20 text-laser-red',
    title: 'text-laser-red',
    intro: '器件表面的界面态、氧化层电荷和工艺缺陷导致的漏电通路：',
    formula: '$$I_{surf} \\propto \\frac{q n_i s A_{peripheral}}{2}$$',
    mid: '其中 s 为表面复合速度，A_peripheral 为结周长。',
    formula2: '',
    feature: '与器件制造工艺和钝化质量密切相关。可通过优化台面刻蚀、侧壁钝化等工艺降低。',
  },
];

// 降低暗电流的五种方法
const reductionMethods = [
  { index: 1, label: '材料优化', desc: '减少体材料缺陷和杂质浓度，提高 τ_eff', color: 'cyan' },
  { index: 2, label: '器件结构', desc: '采用 PIN 结构扩大本征区、降低表面复合', color: 'green' },
  { index: 3, label: '工艺改进', desc: '优化台面钝化、减少表面态密度', color: 'purple' },
  { index: 4, label: '温度控制', desc: 'TEC 制冷可显著降低热激发暗电流', color: 'red' },
  { index: 5, label: '材料选择', desc: '在满足波长响应前提下，选择带隙较大的材料', color: 'orange' },
];

const badgeColorMap: Record<string, string> = {
  cyan: 'bg-laser-cyan/20 text-laser-cyan',
  green: 'bg-laser-green/20 text-laser-green',
  purple: 'bg-laser-purple/20 text-laser-purple',
  red: 'bg-laser-red/20 text-laser-red',
  orange: 'bg-laser-orange/20 text-laser-orange',
};

// 暗电流温度依赖表
const tempDependenceRows = [
  {
    component: '扩散电流',
    color: 'text-laser-cyan',
    temp: '$\\propto T^3 e^{-E_g/kT}$',
    activation: 'E_g',
    actColor: 'text-laser-green',
  },
  {
    component: '产生-复合电流',
    color: 'text-laser-green',
    temp: '$\\propto T^{3/2} e^{-E_g/2kT}$',
    activation: 'E_g/2',
    actColor: 'text-laser-green',
  },
  {
    component: '隧穿电流',
    color: 'text-laser-purple',
    temp: '',
    activation: '≈ 0',
    actColor: 'text-lab-muted',
  },
  {
    component: '表面漏电流',
    color: 'text-laser-red',
    temp: '$\\propto n_i$',
    activation: 'E_g/2',
    actColor: 'text-laser-green',
  },
];

export default function LearnPNJunctionAdvanced() {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } =
    useChapterNavigation(ROUTES.LEARN.PN_JUNCTION_ADVANCED);
  // 上一章 / 下一章均包裹图标
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;
  return (
    <LearnLayout
      title="PN 结进阶：暗电流与耗尽区分析"
      subtitle="从泊松方程到暗电流四大机制：深入 PN 结的定量分析"
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="Part 1 · 基础篇"
      prevChapter={prev}
      nextChapter={next}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<Layers className="w-5 h-5 text-laser-cyan" />} title="耗尽区宽度与电容">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          {/* 前置要求提示 */}
          <div className="border-l-2 border-laser-cyan/50 bg-lab-bg/50 pl-4 py-3 pr-4 rounded-r-lg">
            <p className="text-sm">
              本章为进阶内容，需要先掌握{' '}
              <Link to={ROUTES.LEARN.PN_JUNCTION_BASICS} className="text-laser-cyan hover:underline">
                PN 结基础
              </Link>{' '}
              和{' '}
              <Link to={ROUTES.LEARN.SEMICONDUCTOR_EQUATIONS} className="text-laser-cyan hover:underline">
                半导体基本方程
              </Link>
              。
            </p>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">泊松方程求解</h3>
          <p>
            耗尽区内载流子近似为零（耗尽近似），泊松方程简化为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$\\frac{d^2\\phi}{dx^2} = -\\frac{\\rho}{\\varepsilon_s}$$'}</MathRenderer>
          </div>
          <p>
            其中 N 侧 <span className="font-mono text-laser-cyan">ρ = qN_D</span>，P 侧{' '}
            <span className="font-mono text-laser-green">ρ = -qN_A</span>。
          </p>
          <p>
            对单边突变结（如 <span className="font-mono text-laser-cyan">N_D ≫ N_A</span> 的 P⁺N 结），耗尽区主要延伸到轻掺杂侧：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$W \\approx \\sqrt{\\frac{2\\varepsilon_s(V_{bi} - V)}{qN_D}}$$'}</MathRenderer>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">耗尽区宽度</h3>
          <p>总耗尽区宽度为两侧宽度之和：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {'$$W = x_n + x_p = \\sqrt{\\frac{2\\varepsilon_s}{q}\\left(\\frac{1}{N_A} + \\frac{1}{N_D}\\right)(V_{bi} - V)}$$'}
            </MathRenderer>
          </div>
          <p>
            其中 <span className="font-mono text-laser-cyan">V</span> 为外加偏置电压（正向为正，反向为负）。反向偏置时{' '}
            <span className="font-mono text-laser-cyan">|V|</span> 增大，<span className="font-mono text-laser-green">W</span> 增大。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">结电容</h3>
          <p>耗尽区类似平行板电容器，单位面积结电容为：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>
              {'$$C_j = \\frac{\\varepsilon_s}{W} = \\sqrt{\\frac{q\\varepsilon_s N_A N_D}{2(N_A + N_D)(V_{bi} - V)}}$$'}
            </MathRenderer>
          </div>
          <p>
            反向偏置下 <span className="font-mono text-laser-cyan">C_j</span> 随{' '}
            <span className="font-mono text-laser-cyan">|V|</span> 增大而减小——这是变容二极管（Varactor）和{' '}
            <TermNote term="PIN 光电二极管" /> 提高响应速度的原理。
          </p>
        </div>
      </LearnSection>

      <LearnSection id="s-1" icon={<Activity className="w-5 h-5 text-laser-green" />} title="暗电流">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="font-semibold text-laser-green">暗电流</span>{' '}
            是光电探测器在无光照条件下流过的电流，是限制探测器灵敏度的核心噪声源。暗电流并非单一机制，而是多种物理过程的叠加。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">暗电流的组成</h3>

          <div className="grid md:grid-cols-2 gap-4 items-start">
            {darkCurrentMechanisms.map((m) => (
              <div key={m.index} className={`bg-lab-bg/50 border ${m.border} rounded-xl p-4 space-y-3`}>
                <h4 className={`font-semibold ${m.title} flex items-center gap-2`}>
                  <span className={`w-6 h-6 rounded-lg ${m.badge} flex items-center justify-center text-xs font-bold`}>
                    {m.index}
                  </span>
                  {m.name}
                </h4>
                <p className="text-sm">{m.intro}</p>
                <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
                  <MathRenderer>{m.formula}</MathRenderer>
                </div>
                {m.mid && <p className="text-sm">{m.mid}</p>}
                {m.formula2 && (
                  <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
                    <MathRenderer>{m.formula2}</MathRenderer>
                  </div>
                )}
                <div className={`border ${m.border} ${m.bg} p-3 rounded-lg`}>
                  <p className="text-sm">
                    <span className={`font-semibold ${m.title}`}>特征</span>：{m.feature}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-lab-text pt-2">暗电流的温度依赖性</h3>
          <p>不同暗电流分量对温度的依赖程度不同：</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">暗电流分量</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">温度依赖</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">激活能</th>
                </tr>
              </thead>
              <tbody>
                {tempDependenceRows.map((row) => (
                  <tr key={row.component} className="border-b border-lab-border/50">
                    <td className={`py-2 px-3 font-medium ${row.color}`}>{row.component}</td>
                    <td className="py-2 px-3">
                      {row.temp ? <MathRenderer>{row.temp}</MathRenderer> : <span className="text-lab-muted">弱温度依赖</span>}
                    </td>
                    <td className={`py-2 px-3 font-mono ${row.actColor}`}>{row.activation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-laser-orange/20 bg-laser-orange/5 p-4 rounded-xl">
            <p className="text-sm">
              <span className="font-semibold text-laser-orange">经验法则</span>
              ：温度每升高 10°C，暗电流约翻倍。通过测量暗电流的激活能，可以判断主导机制：
            </p>
            <ul className="space-y-1.5 text-sm mt-2">
              <li className="flex items-start gap-2">
                <span className="text-laser-cyan mt-0.5">•</span>
                <span>
                  激活能 ≈ <span className="font-mono text-laser-cyan">E_g</span>：扩散电流主导
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-green mt-0.5">•</span>
                <span>
                  激活能 ≈ <span className="font-mono text-laser-green">E_g/2</span>：产生-复合或表面漏电主导
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-laser-purple mt-0.5">•</span>
                <span>
                  激活能 ≈ <span className="font-mono text-laser-purple">0</span>：隧穿电流主导
                </span>
              </li>
            </ul>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">暗电流对探测器性能的影响</h3>

          <h4 className="font-semibold text-lab-text">散粒噪声</h4>
          <p>暗电流产生的散粒噪声是探测器的主要噪声源之一：</p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$i_{n,dark} = \\sqrt{2qI_{dark}B}$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="font-mono text-laser-cyan">B</span> 为带宽。暗电流越大，噪声越大，可探测的最小光功率（
            <span className="font-mono text-laser-red">NEP</span>）越高。
          </p>

          <h4 className="font-semibold text-lab-text">信噪比</h4>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$SNR = \\frac{I_{ph}^2}{2q(I_{ph} + I_{dark})B + i_{amp}^2}$$'}</MathRenderer>
          </div>
          <p>
            弱光探测时 <span className="font-mono text-laser-cyan">I_ph ≪ I_dark</span>，
            <TermNote term="SNR" /> 受暗电流限制。降低暗电流是提高探测器灵敏度的关键。
          </p>

          <h4 className="font-semibold text-lab-text">降低暗电流的方法</h4>
          <div className="space-y-3">
            {reductionMethods.map((m) => (
              <div key={m.index} className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-lg ${badgeColorMap[m.color]} flex items-center justify-center flex-shrink-0 text-sm font-bold`}
                >
                  {m.index}
                </div>
                <div className="text-sm pt-0.5">
                  <span className="font-semibold text-lab-text">{m.label}</span>：{m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LearnSection>

      <LearnSection id="s-2" icon={<CheckCircle className="w-5 h-5 text-laser-purple" />} title="总结">
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>PN 结的定量分析建立在泊松方程和漂移扩散方程之上：</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan mt-0.5">•</span>
              <span>
                <span className="font-semibold text-laser-cyan">泊松方程</span>
                在耗尽近似下可解析求解耗尽区宽度和结电容
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-green mt-0.5">•</span>
              <span>
                <span className="font-semibold text-laser-green">暗电流</span>
                由四种机制叠加：扩散电流（<span className="font-mono text-laser-cyan">∝ n_i²</span>）、产生-复合电流（
                <span className="font-mono text-laser-green">∝ n_i</span>）、隧穿电流（电场相关）、表面漏电流（工艺相关）
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-laser-purple mt-0.5">•</span>
              <span>通过激活能测量可以诊断暗电流的主导机制，指导器件优化方向</span>
            </li>
          </ul>
          <p>
            这些分析为理解光电探测器的灵敏度极限和{' '}
            <Link to={ROUTES.LEARN.OPTOELECTRONIC_MATERIALS} className="text-laser-cyan hover:underline">
              光电器件与材料
            </Link>{' '}
            中的探测器性能参数提供了物理基础。
          </p>
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
