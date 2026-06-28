import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FlaskConical, Waves, CircuitBoard, BarChart3, Compass, Sparkles, Zap, Target, ArrowRight, Flame, Radio, BookText, Cable, Network } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { CHAPTERS } from '@/constants/chapters';

const parts = [
  {
    title: 'Part 1 · 基础篇',
    description: '从最基础的物理量开始，逐步建立对光波的理解',
    modules: [
      {
        title: '光波基础与物理量',
        description: '从电磁波谱出发，理解光波的基本物理量、数学描述与折射率概念。',
        icon: <BookOpen className="w-7 h-7" />,
        color: '#00d4ff',
        path: ROUTES.LEARN.WAVE_BASICS,
      },
    ],
  },
  {
    title: 'Part 2 · 光源与传输篇',
    description: '从光源的产生到光信号在光纤中的传输',
    modules: [
      {
        title: '激光器',
        description: '受激辐射、激光谐振腔与常见激光器类型，光通信的光源基础。',
        icon: <Flame className="w-7 h-7" />,
        color: '#ff4444',
        path: ROUTES.LEARN.LASER,
      },
      {
        title: '光纤与光波导',
        description: '光纤结构、损耗、色散与非线性效应，光信号的传输介质。',
        icon: <Cable className="w-7 h-7" />,
        color: '#06b6d4',
        path: ROUTES.LEARN.FIBER_OPTICS,
      },
    ],
  },
  {
    title: 'Part 3 · 调制器篇',
    description: '从干涉到调制，掌握光通信调制器与偏振复用的核心原理',
    modules: [
      {
        title: '干涉原理',
        description: '理解光波的叠加与干涉现象，这是光调制器的物理基础。',
        icon: <Waves className="w-7 h-7" />,
        color: '#00ff88',
        path: ROUTES.LEARN.INTERFERENCE,
      },
      {
        title: 'MZ 调制器',
        description: '马赫-曾德电光调制器的工作原理、结构与性能指标。',
        icon: <CircuitBoard className="w-7 h-7" />,
        color: '#a855f7',
        path: ROUTES.LEARN.MZ_MODULATOR,
      },
      {
        title: 'IQ 调制器',
        description: '正交幅度调制、星座图与高阶调制格式，现代光通信的核心。',
        icon: <BarChart3 className="w-7 h-7" />,
        color: '#f59e0b',
        path: ROUTES.LEARN.IQ_MODULATOR,
      },
      {
        title: '偏振复用',
        description: '光的偏振态、斯托克斯矢量与偏振复用技术。',
        icon: <Compass className="w-7 h-7" />,
        color: '#ff3366',
        path: ROUTES.LEARN.POLARIZATION,
      },
      {
        title: 'Nyquist 与 OFDM',
        description: '脉冲整形与多载波调制技术，提升频谱效率的关键方法。',
        icon: <Zap className="w-7 h-7" />,
        color: '#06b6d4',
        path: ROUTES.LEARN.NYQUIST_OFDM,
      },
      {
        title: '概率星座整形与编码',
        description: '概率星座整形与 LDPC 纠错编码，逼近香农极限的技术。',
        icon: <BarChart3 className="w-7 h-7" />,
        color: '#f59e0b',
        path: ROUTES.LEARN.PCS_CODING,
      },
    ],
  },
  {
    title: 'Part 4 · 系统篇',
    description: '从接收器到 WDM 系统，构建完整的光通信链路',
    modules: [
      {
        title: '光接收器',
        description: '光电二极管、相干接收与数字信号处理，光信号的检测与恢复。',
        icon: <Radio className="w-7 h-7" />,
        color: '#22c55e',
        path: ROUTES.LEARN.RECEIVER,
      },
      {
        title: 'WDM 与光放大器',
        description: '波分复用技术与光放大器，实现超大容量传输的核心技术。',
        icon: <Network className="w-7 h-7" />,
        color: '#a855f7',
        path: ROUTES.LEARN.WDM_AMPLIFIER,
      },
      {
        title: '完整光通信系统',
        description: '端到端 400G DP-16QAM 传输系统全景，串联所有知识点。',
        icon: <BookOpen className="w-7 h-7" />,
        color: '#00ff88',
        path: ROUTES.LEARN.SYSTEM_OVERVIEW,
      },
    ],
  },
  {
    title: '附录',
    description: '快速查阅光通信领域的核心概念和术语',
    modules: [
      {
        title: '术语表',
        description: '涵盖所有章节的核心术语，支持搜索与分类浏览。',
        icon: <BookText className="w-7 h-7" />,
        color: '#94a3b8',
        path: ROUTES.LEARN.GLOSSARY,
      },
    ],
  },
];

const playgroundModules = [
  {
    title: '光波干涉',
    description: '双光束干涉的实时可视化，调节波长、振幅和相位差。',
    icon: <Waves className="w-7 h-7" />,
    color: '#00d4ff',
    path: ROUTES.PLAYGROUND.INTERFERENCE,
  },
  {
    title: 'MZ 调制器',
    description: '马赫-曾德调制器交互实验，观察转移函数和输出波形。',
    icon: <CircuitBoard className="w-7 h-7" />,
    color: '#00ff88',
    path: ROUTES.PLAYGROUND.MZ_MODULATOR,
  },
  {
    title: 'IQ 调制器',
    description: 'IQ 正交调制与解调原理，星座图与矢量分析。',
    icon: <BarChart3 className="w-7 h-7" />,
    color: '#a855f7',
    path: ROUTES.PLAYGROUND.IQ_MODULATOR,
  },
  {
    title: '偏振复用',
    description: '偏振态可视化与斯托克斯矢量，偏振椭圆与庞加莱球。',
    icon: <Compass className="w-7 h-7" />,
    color: '#ff3366',
    path: ROUTES.PLAYGROUND.POLARIZATION,
  },
  {
    title: '光接收器',
    description: 'AWGN 信道噪声、接收星座图、BER 误码率分析。',
    icon: <Radio className="w-7 h-7" />,
    color: '#22c55e',
    path: ROUTES.PLAYGROUND.RECEIVER,
  },
];

const features = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: '实时动画',
    description: '60fps 流畅动画，直观展示动态过程',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: '参数可调',
    description: '实时调节物理参数，观察现象变化',
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: '精确模拟',
    description: '基于真实物理公式的数值仿真',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <section className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-laser-cyan/10 border border-laser-cyan/20 text-laser-cyan text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            OptoElectro Lab
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-laser-cyan via-laser-purple to-laser-green bg-clip-text text-transparent"
        >
          探索光的奥秘
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-lab-muted max-w-2xl mx-auto mb-8"
        >
          从理论学习到动手实验，一站式掌握光通信调制技术。
          系统学习从光波基础到高级调制的完整知识体系。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate(ROUTES.LEARN.WAVE_BASICS)}
            className="flex items-center gap-2 px-6 py-3 bg-laser-cyan text-lab-bg font-semibold rounded-xl hover:bg-laser-cyan/90 transition-all hover:shadow-glow-cyan"
          >
            <BookOpen className="w-5 h-5" />
            开始学习
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(ROUTES.PLAYGROUND.INTERFERENCE)}
            className="flex items-center gap-2 px-6 py-3 bg-lab-surface border border-lab-border text-lab-text font-semibold rounded-xl hover:border-laser-purple/50 hover:text-laser-purple transition-all"
          >
            <FlaskConical className="w-5 h-5" />
            进入实验室
          </button>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-laser-cyan/20 text-laser-cyan flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-lab-text">Learn</h2>
              <p className="text-sm text-lab-muted">系统学习光调制原理</p>
            </div>
          </div>
          <p className="text-lab-muted mb-6 text-sm">
            从基础到调制到系统，每一章都为下一章打下基础。
          </p>
          <div className="space-y-8">
            {parts.map((part, partIndex) => {
              const flatStartIndex = parts.slice(0, partIndex).reduce((acc, p) => acc + p.modules.length, 0);
              return (
                <div key={part.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-laser-purple/40 to-transparent" />
                    <span className="text-xs font-display font-bold text-laser-purple tracking-wider uppercase">
                      {part.title}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-laser-purple/40 to-transparent" />
                  </div>
                  <p className="text-xs text-lab-muted text-center mb-3">{part.description}</p>
                  <div className="space-y-2">
                    {part.modules.map((mod, modIndex) => (
                      <motion.div
                        key={mod.path}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (flatStartIndex + modIndex) * 0.05 }}
                      >
                        <button
                          onClick={() => navigate(mod.path)}
                          className="w-full flex items-center gap-4 p-4 bg-lab-surface/30 border border-lab-border/50 rounded-xl hover:border-laser-cyan/30 hover:bg-lab-surface/50 transition-all group text-left"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                          >
                            {mod.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-lab-muted">{String(flatStartIndex + modIndex + 1).padStart(2, '0')}</span>
                              <span className="font-semibold text-lab-text group-hover:text-laser-cyan transition-colors">
                                {mod.title}
                              </span>
                            </div>
                            <p className="text-xs text-lab-muted mt-0.5">{mod.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-lab-muted group-hover:text-laser-cyan group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-laser-purple/20 text-laser-purple flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-lab-text">Playground</h2>
              <p className="text-sm text-lab-muted">动手实验，直观感受</p>
            </div>
          </div>
          <p className="text-lab-muted mb-6 text-sm">
            通过交互式动画深入理解各种光调制现象。实时调节参数，
            观察输出变化，在实践中巩固理论知识。
          </p>
          <div className="space-y-3">
            {playgroundModules.map((mod, index) => (
              <motion.div
                key={mod.path}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => navigate(mod.path)}
                  className="w-full flex items-center gap-4 p-4 bg-lab-surface/30 border border-lab-border/50 rounded-xl hover:border-laser-purple/30 hover:bg-lab-surface/50 transition-all group text-left"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                  >
                    {mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-lab-text group-hover:text-laser-purple transition-colors">
                      {mod.title}
                    </span>
                    <p className="text-xs text-lab-muted mt-0.5">{mod.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-lab-muted group-hover:text-laser-purple group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
            平台特色
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-laser-cyan/10 text-laser-cyan flex items-center justify-center mx-auto mb-4">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-lab-text mb-2">{feat.title}</h3>
              <p className="text-sm text-lab-muted">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
