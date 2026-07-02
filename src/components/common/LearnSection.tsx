import { cn } from '@/lib/utils';

interface LearnSectionProps {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function LearnSection({ id, icon, title, children, className }: LearnSectionProps) {
  return (
    <section id={id} className={cn('bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6', className)} style={{ contentVisibility: 'auto', containIntrinsicSize: '200px' }}>
      <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
