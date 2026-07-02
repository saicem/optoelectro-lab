import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getTermByName } from '@/data/glossaryData';

interface TermNoteProps {
  term: string;
}

export default function TermNote({ term }: TermNoteProps) {
  const [open, setOpen] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLSpanElement>(null);
  const data = getTermByName(term);

  const updatePosition = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTooltipStyle({
      position: 'fixed',
      left: rect.left + rect.width / 2,
      top: rect.top - 8,
      transform: 'translate(-50%, -100%)',
    });
  }, []);

  const show = useCallback(() => {
    updatePosition();
    setOpen(true);
  }, [updatePosition]);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener('scroll', handler, true);
    return () => document.removeEventListener('scroll', handler, true);
  }, [open]);

  useEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  if (!data) {
    return <span className="text-laser-red">{term}</span>;
  }

  const tooltipContent = (
    <div
      style={tooltipStyle}
      className="hidden md:block w-60 p-3 rounded-lg bg-lab-bg border border-lab-border shadow-xl z-[9999] text-xs text-lab-muted leading-relaxed pointer-events-none"
    >
      <span className="inline-block w-1.5 h-1.5 bg-laser-cyan rounded-full mr-1.5 align-middle" />
      <span className="font-semibold text-laser-cyan text-[11px]">{data.term}:</span> {data.definition}
    </div>
  );

  const mobileOverlay = (
    <div className="md:hidden fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/40" onClick={hide}>
      <div
        className="bg-lab-bg border border-lab-border rounded-xl p-4 max-w-xs text-xs text-lab-muted leading-relaxed shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="block text-laser-cyan font-semibold text-sm mb-1">{data.term}</span>
        <p className="mb-2">{data.definition}</p>
        {data.detail && <p className="text-xs text-lab-muted/70">{data.detail}</p>}
      </div>
    </div>
  );

  return (
    <span ref={ref} className="relative inline">
      <span
        className="border-b border-dashed border-laser-cyan/40 cursor-help transition-colors hover:border-laser-cyan"
        onClick={() => {
          if (open) {
            hide();
          } else {
            show();
          }
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {data.term}
      </span>
      {open && createPortal(tooltipContent, document.body)}
      {open && createPortal(mobileOverlay, document.body)}
    </span>
  );
}
