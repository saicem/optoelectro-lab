import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ControlPanelProps {
  children: ReactNode;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onReset?: () => void;
  title?: string;
  className?: string;
}

export default function ControlPanel({
  children,
  isPlaying,
  onPlayPause,
  onReset,
  title = '参数控制',
  className,
}: ControlPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('bg-lab-surface/80 backdrop-blur-sm border border-lab-border rounded-2xl p-5', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lab-text text-lg">{title}</h3>
        <div className="flex items-center gap-2">
          {onPlayPause !== undefined && isPlaying !== undefined && (
            <button
              onClick={onPlayPause}
              className="p-2 rounded-lg bg-lab-bg border border-lab-border text-lab-muted hover:text-laser-cyan hover:border-laser-cyan/50 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="p-2 rounded-lg bg-lab-bg border border-lab-border text-lab-muted hover:text-laser-red hover:border-laser-red/50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  color?: string;
  valueFormatter?: (v: number) => string;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 0.01,
  unit = '',
  onChange,
  color = '#00d4ff',
  valueFormatter,
}: SliderControlProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = valueFormatter ? valueFormatter(value) : value.toFixed(step < 1 ? 2 : 0) + unit;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-lab-muted">{label}</label>
        <span className="text-sm font-mono text-lab-text">{displayValue}</span>
      </div>
      <div className="relative h-2 bg-lab-bg rounded-full overflow-hidden border border-lab-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

interface SelectControlProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

export function SelectControl<T extends string>({ label, value, options, onChange }: SelectControlProps<T>) {
  return (
    <div>
      <label className="block text-sm text-lab-muted mb-2">{label}</label>
      <div className="grid grid-cols-3 gap-1 bg-lab-bg border border-lab-border rounded-lg p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'px-2 py-1.5 text-xs font-medium rounded-md transition-all',
              value === opt.value
                ? 'bg-laser-cyan/20 text-laser-cyan border border-laser-cyan/30'
                : 'text-lab-muted hover:text-lab-text hover:bg-lab-surface',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  color?: string;
}

export function InfoItem({ label, value, color = '#e2e8f0' }: InfoItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-lab-border/50 last:border-0">
      <span className="text-sm text-lab-muted">{label}</span>
      <span className="text-sm font-mono" style={{ color }}>
        {value}
      </span>
    </div>
  );
}
