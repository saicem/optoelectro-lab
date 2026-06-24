import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  onClick?: () => void;
}

export default function ModuleCard({ title, description, icon, color, onClick }: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group cursor-pointer bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-opacity-50"
      style={{
        boxShadow: `0 0 0 1px transparent`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${color}10, transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold text-lab-text mb-2 font-display">
          {title}
        </h3>

        <p className="text-lab-muted text-sm leading-relaxed">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color }}>
          <span>开始探索</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            →
          </motion.span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}
