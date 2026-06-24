import { useRef, useEffect, useCallback } from 'react';

interface CanvasDrawOptions {
  dpr?: boolean;
}

export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  options: CanvasDrawOptions = {}
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    if (options.dpr !== false) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    drawRef.current(ctx, width, height);
  }, [options.dpr]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      redraw();
    });

    resizeObserver.observe(canvas);
    redraw();

    return () => resizeObserver.disconnect();
  }, [redraw]);

  return { canvasRef, redraw };
}
