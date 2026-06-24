import { useEffect, useRef } from 'react';
import { useMZStore } from '@/stores/useMZStore';
import { mzOutputPower, mzTransferFunction } from '@/utils/modulationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function MZCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { modulationDepth, phaseShift, inputPower, frequency, isPlaying, time, setTime } = useMZStore();

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

    const centerY = H / 2;
    const inputX = 40;
    const outputX = W - 40;
    const splitterX = W * 0.25;
    const combinerX = W * 0.75;
    const armOffset = 90;
    const upperY = centerY - armOffset;
    const lowerY = centerY + armOffset;

    function drawWaveguide(x1: number, y1: number, x2: number, y2: number, active: boolean, color: string = '#00d4ff') {
      ctx.save();
      ctx.strokeStyle = active ? color : '#334155';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      if (active) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
      }
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    const modPhase = modulationDepth * Math.sin(2 * Math.PI * frequency * time) + phaseShift;

    const outputP = mzOutputPower(inputPower, modPhase);

    drawWaveguide(inputX, centerY, splitterX, centerY, true, '#00d4ff');
    drawWaveguide(splitterX, centerY, splitterX, upperY, true, '#00d4ff');
    drawWaveguide(splitterX, upperY, combinerX, upperY, true, '#00d4ff');
    drawWaveguide(splitterX, centerY, splitterX, lowerY, true, '#ff3366');
    drawWaveguide(splitterX, lowerY, combinerX, lowerY, true, '#ff3366');
    drawWaveguide(combinerX, upperY, combinerX, centerY, true, '#00ff88');
    drawWaveguide(combinerX, lowerY, combinerX, centerY, true, '#00ff88');
    drawWaveguide(combinerX, centerY, outputX, centerY, outputP > 0.01, '#00ff88');

    const electrodeY = lowerY;
    const electrodeX1 = splitterX + 30;
    const electrodeX2 = combinerX - 30;

    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(electrodeX1, electrodeY - 20);
    ctx.lineTo(electrodeX2, electrodeY - 20);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    const elecSignalY = electrodeY - 45;
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = electrodeX1; x <= electrodeX2; x++) {
      const tNorm = (x - electrodeX1) / (electrodeX2 - electrodeX1);
      const phase = tNorm * Math.PI * 4 + time * 3;
      const y = elecSignalY + Math.sin(phase) * 8 * modulationDepth;
      if (x === electrodeX1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#f59e0b';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('V(t)', electrodeX1, elecSignalY - 10);

    function drawSplitterCombiner(x: number, y: number, label: string) {
      ctx.save();
      ctx.strokeStyle = '#00d4ff';
      ctx.fillStyle = '#0a0e17';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y + 30);
      ctx.textAlign = 'left';
    }

    drawSplitterCombiner(splitterX, centerY, '分束器');
    drawSplitterCombiner(combinerX, centerY, '合束器');

    const waveX1 = inputX + 5;
    const waveX2 = outputX - 60;

    function drawMiniWave(x: number, y: number, amplitude: number, phase: number, color: string) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let i = 0; i < 30; i++) {
        const px = x + i;
        const py = y + Math.sin(i * 0.5 + phase) * amplitude * 8;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();
    }

    drawMiniWave(waveX1, centerY, inputPower, time * 4, '#00d4ff');
    drawMiniWave(splitterX + 20, upperY - 5, inputPower / 2, time * 4, '#00d4ff');
    drawMiniWave(splitterX + 20, lowerY + 5, inputPower / 2, time * 4 + modPhase, '#ff3366');
    drawMiniWave(waveX2, centerY, Math.sqrt(outputP), time * 4 + modPhase / 2, '#00ff88');

    const transferW = 140;
    const transferH = 80;
    const transferX = W - transferW - 20;
    const transferY = H - transferH - 20;

    ctx.save();
    ctx.fillStyle = 'rgba(26, 35, 50, 0.8)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(transferX, transferY, transferW, transferH, 8);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('转移函数', transferX + 10, transferY + 15);

    const plotX = transferX + 10;
    const plotY = transferY + 25;
    const plotW = transferW - 20;
    const plotH = transferH - 35;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(plotX, plotY, plotW, plotH);

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= plotW; i++) {
      const v = (i / plotW) * 2 * Math.PI;
      const p = Math.cos(v / 2) ** 2;
      const px = plotX + i;
      const py = plotY + plotH - p * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const markerV = modPhase % (2 * Math.PI);
    const markerP = Math.cos(markerV / 2) ** 2;
    const markerX = plotX + (markerV / (2 * Math.PI)) * plotW;
    const markerY = plotY + plotH - markerP * plotH;

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(markerX, markerY, 4, 0, Math.PI * 2);
    ctx.fill();

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationDepth, phaseShift, inputPower, frequency, time]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
