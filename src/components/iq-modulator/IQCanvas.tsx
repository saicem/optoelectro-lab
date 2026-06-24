import { useEffect, useRef } from 'react';
import { useIQStore } from '@/stores/useIQStore';
import { getSymbols, iqAmplitude, iqPhase, iqModulation } from '@/utils/modulationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function IQCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { modulationFormat, iComponent, qComponent, isPlaying, autoCycle, symbolIndex, time, setTime, setSymbolIndex } = useIQStore();
  const lastSwitchRef = useRef(0);

  useAnimationFrame(
    (deltaTime) => {
      if (isPlaying) {
        const newTime = time + deltaTime * 0.001;
        setTime(newTime);

        if (autoCycle) {
          if (newTime - lastSwitchRef.current > 0.8) {
            const symbols = getSymbols(modulationFormat);
            setSymbolIndex((symbolIndex + 1) % symbols.length);
            lastSwitchRef.current = newTime;
          }
        }
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

    const constellationSize = Math.min(W * 0.5, H * 0.85);
    const constellationCenterX = W * 0.3;
    const constellationCenterY = H / 2;
    const R = constellationSize / 2 - 20;

    const waveformX = W * 0.55;
    const waveformW = W * 0.42;
    const iWaveY = H * 0.25;
    const qWaveY = H * 0.55;
    const outWaveY = H * 0.82;
    const waveH = 50;

    ctx.save();
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
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
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.arc(constellationCenterX, constellationCenterY, R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(constellationCenterX - R - 10, constellationCenterY);
    ctx.lineTo(constellationCenterX + R + 10, constellationCenterY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(constellationCenterX, constellationCenterY - R - 10);
    ctx.lineTo(constellationCenterX, constellationCenterY + R + 10);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText('I', constellationCenterX + R + 2, constellationCenterY + 4);
    ctx.fillText('Q', constellationCenterX + 4, constellationCenterY - R - 4);
    ctx.restore();

    const symbols = getSymbols(modulationFormat);

    symbols.forEach((s, idx) => {
      const px = constellationCenterX + s.i * R;
      const py = constellationCenterY - s.q * R;

      const isActive = idx === symbolIndex;

      ctx.save();
      if (isActive) {
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    const activeSymbol = symbols[symbolIndex];
    if (activeSymbol) {
      const px = constellationCenterX + activeSymbol.i * R;
      const py = constellationCenterY - activeSymbol.q * R;

      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(constellationCenterX, constellationCenterY);
      ctx.lineTo(px, constellationCenterY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px, constellationCenterY);
      ctx.lineTo(px, py);
      ctx.stroke();

      ctx.setLineDash([]);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(constellationCenterX, constellationCenterY);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.restore();

      const amp = iqAmplitude(activeSymbol.i, activeSymbol.q);
      const phase = iqPhase(activeSymbol.i, activeSymbol.q);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`A=${amp.toFixed(2)}`, constellationCenterX - R, constellationCenterY + R + 20);
      ctx.fillText(`φ=${(phase * 180 / Math.PI).toFixed(0)}°`, constellationCenterX + 20, constellationCenterY + R + 20);
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillText(`${modulationFormat} 星座图`, constellationCenterX - 40, constellationCenterY - R - 20);

    function drawWave(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
      label: string,
      getValue: (t: number) => number,
      maxVal: number = 1
    ) {
      ctx.save();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y - height, width, height * 2);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const cycles = 8;
      for (let i = 0; i <= width; i++) {
        const t = (i / width) * cycles * 2 * Math.PI + time * 4;
        const val = getValue(t);
        const py = y - (val / maxVal) * height * 0.8;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - height - 5);

      ctx.restore();
    }

    const I = iComponent;
    const Q = qComponent;

    drawWave(waveformX, iWaveY, waveformW, waveH, '#00d4ff', 'I 路 (同相)', (t) => I * Math.cos(t), 1);
    drawWave(waveformX, qWaveY, waveformW, waveH, '#a855f7', 'Q 路 (正交)', (t) => Q * Math.sin(t), 1);
    drawWave(waveformX, outWaveY, waveformW, waveH, '#00ff88', '输出信号', (t) => iqModulation(I, Q, t), Math.sqrt(2));

    const totalAmp = iqAmplitude(I, Q);
    const totalPhase = iqPhase(I, Q);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`幅度: ${totalAmp.toFixed(3)}`, waveformX, outWaveY + waveH + 20);
    ctx.fillText(`相位: ${(totalPhase * 180 / Math.PI).toFixed(1)}°`, waveformX + 100, outWaveY + waveH + 20);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationFormat, iComponent, qComponent, time, symbolIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
