import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, CircuitBoard, BarChart3, Compass, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/interference', label: '光波干涉', icon: Waves },
  { path: '/mz-modulator', label: 'MZ 调制器', icon: CircuitBoard },
  { path: '/iq-modulator', label: 'IQ 调制器', icon: BarChart3 },
  { path: '/polarization', label: '偏振复用', icon: Compass },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lab-bg/80 backdrop-blur-md border-b border-lab-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-laser-cyan to-laser-purple flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-lab-text">
              光电可视化
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                    isActive
                      ? 'text-laser-cyan'
                      : 'text-lab-muted hover:text-lab-text'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-laser-cyan/10 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center gap-1 overflow-x-auto max-w-[60%]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'p-2 rounded-lg flex-shrink-0',
                    isActive ? 'text-laser-cyan bg-laser-cyan/10' : 'text-lab-muted'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
