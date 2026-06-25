import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FlaskConical, Waves, CircuitBoard, BarChart3, Compass, Lightbulb, Sparkles, Zap, Target, ArrowRight } from 'lucide-react';

const learnModules = [
  {
    title: '光波基础',
    description: '从光的本质出发，理解电磁波、波长、频率与相位的基本概念。',
    icon: <Lightbulb className="w-7 h-7" />,
    color: '#00d4ff',
    path: '/learn/light-basics',
  },
  {
    title: '干涉原理',
    description: '理解光波的叠加与干涉现象，这是光调制器的物理基础。',
    icon: <Waves className="w-7 h-7" />,
    color: '#00ff88',
    path: '/learn/interference',
  },
  {
    title: 'MZ 调制器',
    description: '马赫-曾德电光调制器的工作原理、结构与性能指标。',
    icon: <CircuitBoard className="w-7 h-7" />,
    color: '#a855f7',
    path: '/learn/mz-modulator',
  },
  {
    title: 'IQ 调制器',
    description: '正交幅度调制、星座图与高阶调制格式，现代光通信的核心。',
    icon: <BarChart3 className="w-7 h-7" />,
    color: '#f59e0b',
    path: '/learn/iq-modulator',
  },
  {
    title: '偏振复用',
    description: '光的偏振态、斯托克斯矢量与偏振复用技术。',
    icon: <Compass className="w-7 h-7" />,
    color: '#ff3366',
    path: '/learn/polarization',
  },
  {
    title: '双偏振 IQ',
    description: 'DP-IQM：集成偏振复用与 IQ 调制的现代高速光通信核心。',
    icon: <BarChart3 className="w-7 h-7" />,
    color: '#06b6d4',
    path: '/learn/dual-polarization',
  },
];

const playgroundModules = [
  {
    title: '光波干涉',
    description: '双光束干涉的实时可视化，调节波长、振幅和相位差。',
    icon: <Waves className="w-7 h-7" />,
    color: '#00d4ff',
    path: '/playground/interference',
  },
  {
    title: 'MZ 调制器',
    description: '马赫-曾德调制器交互实验，观察转移函数和输出波形。',
    icon: <CircuitBoard className="w-7 h-7" />,
    color: '#00ff88',
    path: '/playground/mz-modulator',
  },
  {
    title: 'IQ 调制器',
    description: 'IQ 星座图与矢量分析，支持 QPSK/16QAM/64QAM。',
    icon: <BarChart3 className="w-7 h-7" />,
    color: '#a855f7',
    path: '/playground/iq-modulator',
  },
  {
    title: '偏振复用',
    description: '偏振态可视化与斯托克斯矢量，偏振椭圆与庞加莱球。',
    icon: <Compass className="w-7 h-7" />,
    color: '#ff3366',
    path: '/playground/polarization',
  },
  {
    title: '双偏振 IQ',
    description: 'DP-IQM 交互实验：调节加热器电压，观察输出变化。',
    icon: <BarChart3 className="w-7 h-7" />,
    color: '#06b6d4',
    path: '/playground/dual-polarization',
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
            交互式光电可视化平台
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
          从理论学习到动手实践，一站式掌握光调制技术。
          系统学习从光波基础到双偏振 IQ 调制的完整知识体系。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate('/learn/light-basics')}
            className="flex items-center gap-2 px-6 py-3 bg-laser-cyan text-lab-bg font-semibold rounded-xl hover:bg-laser-cyan/90 transition-all hover:shadow-glow-cyan"
          >
            <BookOpen className="w-5 h-5" />
            开始学习
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/playground/interference')}
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
            从光波基础开始，逐步深入到干涉原理、MZ 调制器、IQ 调制、偏振复用，
            最终掌握双偏振 IQ 调制器的完整知识体系。每一章都为下一章打下基础。
          </p>
          <div className="space-y-3">
            {learnModules.map((mod, index) => (
              <motion.div
                key={mod.path}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                      <span className="text-xs font-mono text-lab-muted">{String(index + 1).padStart(2, '0')}</span>
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
