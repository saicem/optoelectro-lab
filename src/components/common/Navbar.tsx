import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, CircuitBoard, BarChart3, Compass, BookOpen, FlaskConical, Lightbulb, Flame, Radio, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';

const learnItems = [
  { path: '/learn/light-basics', label: '光波基础', icon: Lightbulb },
  { path: '/learn/laser', label: '激光器', icon: Flame },
  { path: '/learn/interference', label: '干涉原理', icon: Waves },
  { path: '/learn/mz-modulator', label: 'MZ 调制器', icon: CircuitBoard },
  { path: '/learn/iq-modulator', label: 'IQ 调制器', icon: BarChart3 },
  { path: '/learn/polarization', label: '偏振复用', icon: Compass },
  { path: '/learn/dual-polarization', label: '双偏振 IQ', icon: BarChart3 },
  { path: '/learn/receiver', label: '光接收器', icon: Radio },
  { path: '/learn/glossary', label: '术语表', icon: BookText },
];

const playgroundItems = [
  { path: '/playground/interference', label: '光波干涉', icon: Waves },
  { path: '/playground/mz-modulator', label: 'MZ 调制器', icon: CircuitBoard },
  { path: '/playground/iq-modulator', label: 'IQ 调制器', icon: BarChart3 },
  { path: '/playground/polarization', label: '偏振复用', icon: Compass },
  { path: '/playground/receiver', label: '光接收器', icon: Radio },
];

export default function Navbar() {
  const location = useLocation();
  const isLearn = location.pathname.startsWith('/learn');
  const isPlayground = location.pathname.startsWith('/playground');

  const activeItems = isLearn ? learnItems : isPlayground ? playgroundItems : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lab-bg/80 backdrop-blur-md border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-auto md:h-16 py-2 md:py-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-laser-cyan to-laser-purple flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-lab-text">
              光通信调制实验室
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-lab-surface/50 rounded-xl p-1 border border-lab-border">
              <Link
                to="/learn/light-basics"
                className={cn(
                  'px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                  isLearn
                    ? 'bg-laser-cyan/20 text-laser-cyan'
                    : 'text-lab-muted hover:text-lab-text'
                )}
              >
                <BookOpen className="w-4 h-4" />
                Learn
              </Link>
              <Link
                to="/playground/interference"
                className={cn(
                  'px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                  isPlayground
                    ? 'bg-laser-purple/20 text-laser-purple'
                    : 'text-lab-muted hover:text-lab-text'
                )}
              >
                <FlaskConical className="w-4 h-4" />
                Playground
              </Link>
            </div>

            {(isLearn || isPlayground) && (
              <div className="h-6 w-px bg-lab-border mx-2" />
            )}

            {(isLearn || isPlayground) && (
              <div className="flex items-center gap-1">
                {activeItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                        isActive
                          ? isLearn
                            ? 'text-laser-cyan'
                            : 'text-laser-purple'
                          : 'text-lab-muted hover:text-lab-text'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className={cn(
                            'absolute inset-0 rounded-lg -z-10',
                            isLearn ? 'bg-laser-cyan/10' : 'bg-laser-purple/10'
                          )}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1 overflow-x-auto max-w-[70%]">
            <Link
              to="/learn/light-basics"
              className={cn(
                'px-2 py-1.5 rounded-lg flex-shrink-0 flex flex-col items-center gap-0.5',
                isLearn ? 'text-laser-cyan bg-laser-cyan/10' : 'text-lab-muted'
              )}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-medium">Learn</span>
            </Link>
            <Link
              to="/playground/interference"
              className={cn(
                'px-2 py-1.5 rounded-lg flex-shrink-0 flex flex-col items-center gap-0.5',
                isPlayground ? 'text-laser-purple bg-laser-purple/10' : 'text-lab-muted'
              )}
            >
              <FlaskConical className="w-5 h-5" />
              <span className="text-[10px] font-medium">Play</span>
            </Link>
            {(isLearn || isPlayground) && (
              <>
                <div className="w-px h-10 bg-lab-border mx-1 flex-shrink-0" />
                {activeItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'px-2 py-1.5 rounded-lg flex-shrink-0 flex flex-col items-center gap-0.5',
                        isActive
                          ? isLearn
                            ? 'text-laser-cyan bg-laser-cyan/10'
                            : 'text-laser-purple bg-laser-purple/10'
                          : 'text-lab-muted'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
