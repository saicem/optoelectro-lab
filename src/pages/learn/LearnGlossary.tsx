import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Lightbulb,
  CircuitBoard,
  Compass,
  BarChart3,
  Radio,
  Flame,
  Zap,
  BookText,
} from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import LearnSection from '@/components/common/LearnSection';
import { glossaryData } from '@/data/glossaryData';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';

const pageSections = [{ id: 's-0', title: '光通信术语表' }];

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-5 h-5 text-laser-cyan" />,
  CircuitBoard: <CircuitBoard className="w-5 h-5 text-laser-purple" />,
  Compass: <Compass className="w-5 h-5 text-laser-red" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-laser-green" />,
  Radio: <Radio className="w-5 h-5 text-amber-400" />,
  Flame: <Flame className="w-5 h-5 text-laser-orange" />,
  Zap: <Zap className="w-5 h-5 text-laser-cyan" />,
};

export default function LearnGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return glossaryData;

    const query = searchQuery.toLowerCase();
    return glossaryData
      .map((category) => ({
        ...category,
        terms: category.terms.filter(
          (term) =>
            term.term.toLowerCase().includes(query) ||
            (term.english && term.english.toLowerCase().includes(query)) ||
            term.definition.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.terms.length > 0);
  }, [searchQuery]);

  const toggleTerm = (termId: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(termId)) {
        next.delete(termId);
      } else {
        next.add(termId);
      }
      return next;
    });
  };

  const totalTerms = glossaryData.reduce((sum, cat) => sum + cat.terms.length, 0);

  const { currentIndex, totalChapters, prevChapter, IconPrev } = useChapterNavigation(ROUTES.LEARN.GLOSSARY);
  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;

  return (
    <LearnLayout
      title="光通信术语表"
      subtitle={`快速查阅光通信领域的核心概念和术语，共 ${totalTerms} 个词条`}
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle="附录"
      prevChapter={prev}
      sections={pageSections}
    >
      <LearnSection id="s-0" icon={<BookText className="w-5 h-5 text-laser-cyan" />} title="光通信术语表">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lab-muted" />
          <input
            type="text"
            placeholder="搜索术语..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-lab-bg/50 border border-lab-border rounded-xl text-lab-text placeholder-lab-muted focus:outline-none focus:border-laser-cyan/50 transition-colors"
          />
        </div>

        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
                {iconMap[category.iconName]}
                {category.name}
                <span className="text-sm font-normal text-lab-muted">({category.terms.length} 个术语)</span>
              </h2>

              <div className="space-y-3">
                {category.terms.map((term, termIndex) => {
                  const termId = `${category.id}-${termIndex}`;
                  const isExpanded = expandedTerms.has(termId);
                  const hasDetail = !!term.detail;

                  return (
                    <motion.div
                      key={termId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + termIndex * 0.05 }}
                      className="bg-lab-bg/50 border border-lab-border/50 rounded-xl overflow-hidden"
                    >
                      <div
                        className={`p-4 ${hasDetail ? 'cursor-pointer hover:bg-lab-surface/30 transition-colors' : ''}`}
                        onClick={() => hasDetail && toggleTerm(termId)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-lab-text">{term.term}</span>
                              {term.english && <span className="text-sm text-lab-muted font-mono">{term.english}</span>}
                            </div>
                            <p className="text-lab-muted text-sm leading-relaxed">{term.definition}</p>
                          </div>
                          {hasDetail && (
                            <BookText
                              className={`w-5 h-5 text-lab-muted flex-shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-0' : ''}`}
                            />
                          )}
                        </div>
                      </div>

                      {hasDetail && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-lab-border/50"
                        >
                          <div className="p-4 bg-laser-cyan/5">
                            <p className="text-lab-muted text-sm leading-relaxed">{term.detail}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-lab-muted">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的术语</p>
            </div>
          )}
        </div>
      </LearnSection>
    </LearnLayout>
  );
}
