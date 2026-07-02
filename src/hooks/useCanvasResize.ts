import { useCallback, useEffect, useRef, useState } from 'react';

export function useCanvasResize(canvasRef: React.RefObject<HTMLCanvasElement | null>): number {
  const [resizeKey, setResizeKey] = useState(0);
  const rafId = useRef(0);

  const onResize = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setResizeKey((k) => k + 1);
    });
  }, []);

  useEffect(() => {
    const el = canvasRef.current?.parentElement;
    if (!el) return;

    const observer = new ResizeObserver(() => onResize());
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [canvasRef, onResize]);

  return resizeKey;
}
