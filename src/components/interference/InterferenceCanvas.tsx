import { useEffect, useRef } from 'react';
import { useInterferenceStore } from '@/stores/useInterferenceStore';
import { sineWave, superposeWaves, wavelengthToColor } from '@/utils/waveMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { useCanvasResize } from '@/hooks/useCanvasResize';
import { setupCanvas, drawGrid } from '@/lib/utils';

export default function InterferenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeKey = useCanvasResize(canvasRef);
  const { wavelength, amplitude1, amplitude2, phaseDiff, isPlaying, time, setTime } = useInterferenceStore();

  const color = wavelengthToColor(wavelength);
  const omega = (2 * Math.PI) / (wavelength * 2);

  useAnimationFrame(
    (deltaTime) => {
      if (isPlaying) {
        setTime(time + deltaTime * 0.001);
      }
    },
    { autoStart: true },
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dim = setupCanvas(canvas, ctx);
    if (!dim) return;
    const W = dim.width;
    const H = dim.height;

    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);

    drawGrid(ctx, W, H, 40, 'rgba(51, 65, 85, 0.3)');

    const centerY = H / 2;
    const waveY1 = centerY - 110;
    const waveY2 = centerY - 30;
    const resultY = centerY + 50;

    const t = time * 2;

    // 绘制各波的中轴线（振幅为 0 的参考轴）
    function drawCentralAxis(yBase: number) {
      ctx.save();
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, yBase);
      ctx.lineTo(W, yBase);
      ctx.stroke();
      ctx.restore();
    }
    drawCentralAxis(waveY1);
    drawCentralAxis(waveY2);
    drawCentralAxis(resultY);

    function drawWave(
      yBase: number,
      amplitude: number,
      phase: number,
      label: string,
      waveColor: string,
      dash: number[] = [],
    ) {
      ctx.save();
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = waveColor;
      ctx.shadowBlur = 10;
      if (dash.length) ctx.setLineDash(dash);

      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const y = yBase + sineWave(x, amplitude * 25, wavelength * 2, phase + omega * t, 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.fillText(label, 10, yBase - 35);
    }

    drawWave(waveY1, amplitude1, 0, '波 1 (E₁)', color, []);
    drawWave(waveY2, amplitude2, phaseDiff, '波 2 (E₂)', '#a855f7', [5, 5]);

    ctx.save();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const y =
        resultY +
        superposeWaves(
          x,
          [
            { amplitude: amplitude1 * 25, wavelength: wavelength * 2, phase: omega * t },
            { amplitude: amplitude2 * 25, wavelength: wavelength * 2, phase: phaseDiff + omega * t },
          ],
          0,
        );
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillText('叠加波 (E₁ + E₂)', 10, resultY - 35);

    // 干涉强度数值（仅显示数值，不绘制柱状图）
    // 两束波空间频率相同，相位差恒为 phaseDiff（不随 x 变化）
    const intensity =
      (amplitude1 ** 2 + amplitude2 ** 2 + 2 * amplitude1 * amplitude2 * Math.cos(phaseDiff)) /
      (amplitude1 + amplitude2) ** 2;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText('干涉强度', 10, resultY + 40);
    ctx.fillStyle = color;
    ctx.font = 'bold 14px JetBrains Mono, monospace';
    ctx.fillText((intensity * 100).toFixed(1) + '%', 80, resultY + 40);

    return () => {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [wavelength, amplitude1, amplitude2, phaseDiff, time, color, omega, resizeKey]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ display: 'block' }} />;
}
