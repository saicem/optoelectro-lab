import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Waves, CircuitBoard, BarChart3, Compass, Sparkles, Zap, Target } from 'lucide-react';
import ModuleCard from '@/components/common/ModuleCard';

const modules = [
  {
    title: '光波干涉',
    description: '探索双缝干涉现象，观察波长、振幅和相位差如何影响干涉图样的形成。',
    icon: <Waves className="w-7 h-7" />,
    color: '#00d4ff',
    path: '/interference',
  },
  {
    title: 'MZ 调制器',
    description: '马赫-曾德干涉电光调制器原理演示，理解相位调制与强度调制的转换。',
    icon: <CircuitBoard className="w-7 h-7" />,
    color: '#00ff88',
    path: '/mz-modulator',
  },
  {
    title: 'IQ 调制器',
    description: '同相正交调制可视化，IQ 星座图与矢量分析，支持多种调制格式。',
    icon: <BarChart3 className="w-7 h-7" />,
    color: '#a855f7',
    path: '/iq-modulator',
  },
  {
    title: 'XY 偏振复用',
    description: '偏振态可视化与斯托克斯矢量，双通道独立调制的偏振复用技术。',
    icon: <Compass className="w-7 h-7" />,
    color: '#ff3366',
    path: '/polarization',
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
          通过精美的交互式动画，深入理解光电效应与光调制技术。
          从基础的光波干涉到先进的偏振复用，一站式学习体验。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate('/interference')}
            className="px-6 py-3 bg-laser-cyan text-lab-bg font-semibold rounded-xl hover:bg-laser-cyan/90 transition-all hover:shadow-glow-cyan"
          >
            开始探索
          </button>
          <button
            onClick={() => navigate('/mz-modulator')}
            className="px-6 py-3 bg-lab-surface border border-lab-border text-lab-text font-semibold rounded-xl hover:border-laser-cyan/50 hover:text-laser-cyan transition-all"
          >
            查看调制器
          </button>
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
            可视化模块
          </h2>
          <p className="text-lab-muted">
            选择一个模块开始交互式学习
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ModuleCard
                title={mod.title}
                description={mod.description}
                icon={mod.icon}
                color={mod.color}
                onClick={() => navigate(mod.path)}
              />
            </motion.div>
          ))}
        </div>
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
