import { useEffect, useRef } from 'react';
import { useInterferenceStore } from '@/stores/useInterferenceStore';
import { sineWave, superposeWaves, wavelengthToColor } from '@/utils/waveMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function InterferenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { wavelength, amplitude1, amplitude2, phaseDiff, isPlaying, time, setTime } = useInterferenceStore();

  const color = wavelengthToColor(wavelength);
  const omega = 2 * Math.PI / (wavelength * 2);

  useAnimationFrame(
    (deltaTime) => {
      if (isPlaying) {
        setTime(time + deltaTime * 0.001);
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

    ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const centerY = H / 2;
    const waveY1 = centerY - 80;
    const waveY2 = centerY;
    const resultY = centerY + 100;

    const t = time * 2;

    function drawWave(
      yBase: number,
      amplitude: number,
      phase: number,
      label: string,
      waveColor: string,
      dash: number[] = []
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
      const y = resultY + superposeWaves(
        x,
        [
          { amplitude: amplitude1 * 25, wavelength: wavelength * 2, phase: omega * t },
          { amplitude: amplitude2 * 25, wavelength: wavelength * 2, phase: phaseDiff + omega * t },
        ],
        0
      );
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillText('叠加波 (E₁ + E₂)', 10, resultY - 35);

    const intensityY = H - 50;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText('干涉强度分布', 10, intensityY - 55);

    const barWidth = 3;
    for (let x = 0; x < W; x += barWidth + 1) {
      const phaseAtX = (2 * Math.PI * x) / (wavelength * 2) + phaseDiff;
      const intensity = (amplitude1 ** 2 + amplitude2 ** 2 + 2 * amplitude1 * amplitude2 * Math.cos(phaseAtX)) / ((amplitude1 + amplitude2) ** 2);
      const barHeight = intensity * 40;

      const gradient = ctx.createLinearGradient(0, intensityY, 0, intensityY - barHeight);
      gradient.addColorStop(0, color + '66');
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fillRect(x, intensityY - barHeight, barWidth, barHeight);
    }

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, centerY - 40);
    ctx.lineTo(W, centerY - 40);
    ctx.stroke();
    ctx.setLineDash([]);

  }, [wavelength, amplitude1, amplitude2, phaseDiff, time, color, omega]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
