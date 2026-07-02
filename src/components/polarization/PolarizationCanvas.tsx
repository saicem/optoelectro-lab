import { useEffect, useRef } from 'react';
import { usePolarizationStore } from '@/stores/usePolarizationStore';
import { stokesToPoincare, calculateDOP, rotateStokes, phaseRetarder } from '@/utils/polarizationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { useCanvasResize } from '@/hooks/useCanvasResize';

export default function PolarizationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeKey = useCanvasResize(canvasRef);
  const { ex, ey, delta, rotationAngle, xPower, yPower, multiplexing, isPlaying, time, setTime, getStokes } = usePolarizationStore();

  useAnimationFrame(
    (dt) => {
      if (isPlaying) {
        setTime(time + dt * 0.001);
      }
    },
    { autoStart: true }
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const W = rect.width;
    const H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const poincareCX = W * 0.25;
    const poincareCY = H / 2;
    const poincareR = Math.min(W * 0.2, H * 0.38);

    const waveX = W * 0.5;
    const waveW = W * 0.45;
    const waveCenterY = H / 2;
    const waveH = 100;

    const muxX = W * 0.5;
    const muxY = H * 0.12;
    const muxW = W * 0.45;

    const stokes = getStokes();
    const rotated = rotateStokes(stokes, rotationAngle);
    const finalStokes = multiplexing ? phaseRetarder(rotated, delta) : rotated;
    const poincare = stokesToPoincare(finalStokes);
    const dop = calculateDOP(finalStokes);

    ctx.save();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.ellipse(poincareCX, poincareCY, poincareR, poincareR * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(poincareCX, poincareCY, poincareR * 0.3, poincareR, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#475569';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(poincareCX - poincareR, poincareCY);
    ctx.lineTo(poincareCX + poincareR, poincareCY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(poincareCX, poincareCY - poincareR);
    ctx.lineTo(poincareCX, poincareCY + poincareR);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.arc(poincareCX, poincareCY, poincareR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('S₁', poincareCX + poincareR + 4, poincareCY + 3);
    ctx.fillText('S₂', poincareCX + 4, poincareCY - poincareR - 4);
    ctx.fillText('庞加莱球', poincareCX - 30, poincareCY + poincareR + 20);
    ctx.restore();

    const pointX = poincareCX + poincare.x * poincareR;
    const pointY = poincareCY - poincare.y * poincareR * 0.3 - poincare.z * poincareR * 0.5;

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 51, 102, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(poincareCX, poincareCY);
    ctx.lineTo(pointX, pointY);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#ff3366';
    ctx.shadowColor = '#ff3366';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`DOP: ${(dop * 100).toFixed(1)}%`, poincareCX - 30, poincareCY - poincareR - 15);

    const exAmp = ex * xPower;
    const eyAmp = ey * yPower;

    function drawWaveform(
      x: number,
      y: number,
      width: number,
      height: number,
      label: string,
      color: string,
      getY: (t: number) => number
    ) {
      ctx.save();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y - height, width, height * 2);

      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const cycles = 6;
      for (let i = 0; i <= width; i++) {
        const t = (i / width) * cycles * 2 * Math.PI + time * 3;
        const py = y + getY(t) * height * 0.7;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - height - 4);

      ctx.restore();
    }

    if (multiplexing) {
      drawWaveform(waveX, waveCenterY - 60, waveW, 40, 'X 偏振 (TE)', '#00d4ff',
        (t) => -exAmp * Math.cos(t)
      );
      drawWaveform(waveX, waveCenterY + 60, waveW, 40, 'Y 偏振 (TM)', '#ff3366',
        (t) => -eyAmp * Math.cos(t + delta)
      );
    } else {
      drawWaveform(waveX, waveCenterY, waveW, waveH / 2, '合成偏振态', '#00ff88',
        (t) => -(exAmp * Math.cos(t) + eyAmp * Math.cos(t + delta)) * 0.5
      );
    }

    ctx.save();
    ctx.strokeStyle = '#334155';
    ctx.fillStyle = 'rgba(26, 35, 50, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(muxX, muxY - 20, muxW, 40, 8);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const muxCX = muxX + muxW / 2;
    const muxTopY = muxY - 20;
    const muxBotY = muxY + 20;

    if (multiplexing) {
      ctx.save();
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(muxX + 20, muxTopY - 15);
      ctx.lineTo(muxCX - 15, muxY - 5);
      ctx.stroke();

      ctx.strokeStyle = '#ff3366';
      ctx.shadowColor = '#ff3366';
      ctx.beginPath();
      ctx.moveTo(muxX + 20, muxBotY + 15);
      ctx.lineTo(muxCX - 15, muxY + 5);
      ctx.stroke();

      ctx.strokeStyle = '#a855f7';
      ctx.shadowColor = '#a855f7';
      ctx.beginPath();
      ctx.moveTo(muxCX + 15, muxY);
      ctx.lineTo(muxX + muxW - 20, muxY);
      ctx.stroke();

      ctx.fillStyle = '#a855f7';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.shadowBlur = 0;
      ctx.fillText('偏振复用', muxCX - 20, muxY + 3);
      ctx.restore();
    } else {
      ctx.save();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(muxX + 20, muxY);
      ctx.lineTo(muxX + muxW - 20, muxY);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.shadowBlur = 0;
      ctx.fillText('单偏振', muxCX - 15, muxY + 3);
      ctx.restore();
    }

    const lissX = waveX + 30;
    const lissY = waveCenterY;
    const lissSize = 60;

    if (multiplexing) {
      ctx.save();
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(lissX - lissSize / 2, lissY - lissSize / 2, lissSize, lissSize);

      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let t = 0; t <= Math.PI * 2; t += 0.02) {
        const x = lissX + exAmp * Math.cos(t) * lissSize * 0.4;
        const y = lissY + eyAmp * Math.cos(t + delta) * lissSize * 0.4;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('偏振椭圆', lissX - 25, lissY + lissSize / 2 + 15);
      ctx.restore();
    }

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [ex, ey, delta, rotationAngle, xPower, yPower, multiplexing, time, getStokes, resizeKey]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
