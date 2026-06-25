import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

export interface LearnChapter {
  path: string;
  title: string;
  icon: React.ReactNode;
}

interface LearnLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  prevChapter?: LearnChapter;
  nextChapter?: LearnChapter;
  currentIndex: number;
  totalChapters: number;
}

const chapters = [
  { path: '/learn/light-basics', title: '光波基础' },
  { path: '/learn/laser', title: '激光器' },
  { path: '/learn/interference', title: '干涉原理' },
  { path: '/learn/mz-modulator', title: 'MZ 调制器' },
  { path: '/learn/iq-modulator', title: 'IQ 调制器' },
  { path: '/learn/polarization', title: '偏振复用' },
  { path: '/learn/dual-polarization', title: '双偏振 IQ' },
  { path: '/learn/receiver', title: '光接收器' },
];

export default function LearnLayout({
  title,
  subtitle,
  children,
  prevChapter,
  nextChapter,
  currentIndex,
  totalChapters,
}: LearnLayoutProps) {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-lab-muted mb-4">
          <BookOpen className="w-4 h-4 text-laser-cyan" />
          <span>学习路径</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-laser-cyan">
            第 {currentIndex + 1} / {totalChapters} 章
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {chapters.map((ch, idx) => {
            const isActive = location.pathname === ch.path;
            const isPast = idx < currentIndex;
            return (
              <Link
                key={ch.path}
                to={ch.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-laser-cyan/20 text-laser-cyan'
                    : isPast
                    ? 'text-lab-muted hover:text-lab-text bg-lab-surface/30'
                    : 'text-lab-muted hover:text-lab-text'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? 'bg-laser-cyan text-lab-bg'
                      : isPast
                      ? 'bg-laser-green/20 text-laser-green'
                      : 'bg-lab-border/50 text-lab-muted'
                  }`}
                >
                  {idx + 1}
                </span>
                {ch.title}
              </Link>
            );
          })}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold font-display text-lab-text mb-2"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg text-lab-muted"
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        {children}
      </motion.div>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <div>
          {prevChapter && (
            <Link
              to={prevChapter.path}
              className="block p-5 bg-lab-surface/50 border border-lab-border rounded-xl hover:border-laser-cyan/50 transition-all group"
            >
              <div className="flex items-center gap-2 text-sm text-lab-muted mb-2">
                <ArrowLeft className="w-4 h-4" />
                上一章
              </div>
              <div className="font-semibold text-lab-text group-hover:text-laser-cyan transition-colors flex items-center gap-2">
                {prevChapter.icon}
                {prevChapter.title}
              </div>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextChapter && (
            <Link
              to={nextChapter.path}
              className="block p-5 bg-lab-surface/50 border border-lab-border rounded-xl hover:border-laser-purple/50 transition-all group"
            >
              <div className="flex items-center justify-end gap-2 text-sm text-lab-muted mb-2">
                下一章
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="font-semibold text-lab-text group-hover:text-laser-purple transition-colors flex items-center justify-end gap-2">
                {nextChapter.title}
                {nextChapter.icon}
              </div>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
