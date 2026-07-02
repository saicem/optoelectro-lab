import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, FlaskConical, List } from 'lucide-react';
import { prefetch } from '@/lib/routeLoaders';

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
  partTitle?: string;
  playgroundPath?: string;
  sections?: { id: string; title: string }[];
}

export default function LearnLayout({
  title,
  subtitle,
  children,
  prevChapter,
  nextChapter,
  currentIndex,
  totalChapters,
  partTitle,
  playgroundPath,
  sections,
}: LearnLayoutProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!sections?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-lab-muted mb-4 flex-wrap">
            <BookOpen className="w-4 h-4 text-laser-cyan" />
            <span>学习路径</span>
            <ChevronRight className="w-4 h-4" />
            {partTitle && (
              <>
                <span className="text-laser-purple font-medium">{partTitle}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-laser-cyan">
              第 {currentIndex + 1} / {totalChapters} 章
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
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
            {playgroundPath && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                onClick={() => navigate(playgroundPath)}
                className="flex items-center gap-2 px-4 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted hover:text-laser-cyan hover:border-laser-cyan/30 transition-all flex-shrink-0"
              >
                <FlaskConical className="w-4 h-4" />
                去实验
              </motion.button>
            )}
          </div>
        </div>

        <div className="xl:flex xl:gap-10">
          <div className="flex-1 min-w-0 max-w-[896px]">
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
                    onMouseEnter={() => prefetch(nextChapter.path)}
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
          </div>

          {sections && sections.length > 0 && (
            <aside className="hidden xl:block w-44 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 text-xs font-semibold text-lab-muted uppercase tracking-wider mb-3">
                  <List className="w-3.5 h-3.5" />
                  本页目录
                </div>
                <nav className="space-y-0.5">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        activeSection === s.id
                          ? 'text-laser-cyan bg-laser-cyan/10 font-medium'
                          : 'text-lab-muted hover:text-lab-text hover:bg-lab-surface/50'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </motion.div>
  );
}
