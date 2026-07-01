import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaygroundLayoutProps {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  subtitle: string;
  learnPath: string;
  canvas: React.ReactNode;
  controlPanel: React.ReactNode;
  children?: React.ReactNode;
  canvasMinHeight?: number;
}

export default function PlaygroundLayout({
  icon,
  iconColor,
  title,
  subtitle,
  learnPath,
  canvas,
  controlPanel,
  children,
  canvasMinHeight = 450,
}: PlaygroundLayoutProps) {
  const navigate = useNavigate();

  const hexToRgba = (hex: string, alpha: number) => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: hexToRgba(iconColor, 0.2), color: iconColor }}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-lab-text">{title}</h1>
            <p className="text-sm text-lab-muted">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(learnPath)}
          className="flex items-center gap-2 px-4 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted transition-all"
          style={{ '--accent': iconColor } as React.CSSProperties}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = iconColor;
            e.currentTarget.style.borderColor = hexToRgba(iconColor, 0.3);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '';
            e.currentTarget.style.borderColor = '';
          }}
        >
          <BookOpen className="w-4 h-4" />
          学习原理
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div
          className="bg-lab-surface/50 backdrop-blur-sm border border-lab-border rounded-2xl p-4 overflow-hidden"
          style={{ minHeight: `${canvasMinHeight}px`, height: `${canvasMinHeight}px` }}
        >
          {canvas}
        </div>

        <div className="space-y-6">
          {controlPanel}
        </div>
      </div>

      {children}
    </motion.div>
  );
}
