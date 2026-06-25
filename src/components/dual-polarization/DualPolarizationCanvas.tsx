import { useEffect, useRef } from 'react';
import { useDualPolarizationStore } from '@/stores/useDualPolarizationStore';
import { getSymbols, iqModulation, mzOutputPower } from '@/utils/dualPolarizationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function DualPolarizationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    modulationFormat,
    xSymbolIndex,
    ySymbolIndex,
    autoCycle,
    inputPower,
    isPlaying,
    time,
    setTime,
    setXSymbolIndex,
    setYSymbolIndex,
    getXIBiasPhase,
    getXQBiasPhase,
    getXQuadraturePhase,
    getYIBiasPhase,
    getYQBiasPhase,
    getYQuadraturePhase,
    getPolRotation,
    getXSymbol,
    getYSymbol,
  } = useDualPolarizationStore();

  const lastSwitchRef = useRef(0);

  useAnimationFrame(
    (deltaTime) => {
      if (isPlaying) {
        const newTime = time + deltaTime * 0.001;
        setTime(newTime);

        if (autoCycle) {
          if (newTime - lastSwitchRef.current > 0.8) {
            const symbols = getSymbols(modulationFormat);
            setXSymbolIndex((xSymbolIndex + 1) % symbols.length);
            setYSymbolIndex((ySymbolIndex + 2) % symbols.length);
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

    const xConstellationCX = W * 0.2;
    const constellationCY = H * 0.28;
    const constellationR = Math.min(W * 0.15, H * 0.2);

    const yConstellationCX = W * 0.2;
    const yConstellationCY = H * 0.72;

    const waveX = W * 0.38;
    const waveW = W * 0.58;
    const xWaveY = H * 0.18;
    const yWaveY = H * 0.62;
    const waveH = 40;

    const structureX = W * 0.38;
    const structureY = H * 0.4;
    const structureW = W * 0.58;
    const structureH = H * 0.18;

    function drawConstellation(
      cx: number,
      cy: number,
      r: number,
      activeSymbol: { i: number; q: number },
      color: string,
      label: string,
      biasI: number,
      biasQ: number,
      quadPhase: number
    ) {
      ctx.save();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - r - 10, cy);
      ctx.lineTo(cx + r + 10, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - r - 10);
      ctx.lineTo(cx, cy + r + 10);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('I', cx + r + 2, cy + 3);
      ctx.fillText('Q', cx + 2, cy - r - 3);

      const symbols = getSymbols(modulationFormat);
      symbols.forEach((s) => {
        const px = cx + s.i * r * 0.8;
        const py = cy - s.q * r * 0.8;
        const isActive = Math.abs(s.i - activeSymbol.i) < 0.01 && Math.abs(s.q - activeSymbol.q) < 0.01;

        if (isActive) {
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#334155';
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;

      const dI = biasI / Math.PI;
      const dQ = biasQ / Math.PI;
      const actualI = activeSymbol.i + dI;
      const actualQ = activeSymbol.q + dQ;

      const px = cx + actualI * r * 0.8;
      const py = cy - actualQ * r * 0.8;

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(label, cx - 25, cy - r - 15);

      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`正交误差: ${(quadPhase * 180 / Math.PI).toFixed(1)}°`, cx - r, cy + r + 18);

      ctx.restore();
    }

    const xSymbol = getXSymbol();
    const ySymbol = getYSymbol();
    const xIBias = getXIBiasPhase();
    const xQBias = getXQBiasPhase();
    const xQuadPhase = getXQuadraturePhase();
    const yIBias = getYIBiasPhase();
    const yQBias = getYQBiasPhase();
    const yQuadPhase = getYQuadraturePhase();
    const polRot = getPolRotation();

    drawConstellation(xConstellationCX, constellationCY, constellationR, xSymbol, '#00d4ff', 'X 偏振', xIBias, xQBias, xQuadPhase);
    drawConstellation(yConstellationCX, yConstellationCY, constellationR, ySymbol, '#ff3366', 'Y 偏振', yIBias, yQBias, yQuadPhase);

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

      const cycles = 6;
      for (let i = 0; i <= width; i++) {
        const t = (i / width) * cycles * 2 * Math.PI + time * 4;
        const val = getValue(t);
        const py = y - (val / maxVal) * height * 0.7;
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

    const xIOut = mzOutputPower(inputPower / 4, Math.PI * xSymbol.i + xIBias);
    const xQOut = mzOutputPower(inputPower / 4, Math.PI * xSymbol.q + xQBias);
    const yIOut = mzOutputPower(inputPower / 4, Math.PI * ySymbol.i + yIBias);
    const yQOut = mzOutputPower(inputPower / 4, Math.PI * ySymbol.q + yQBias);

    drawWave(waveX, xWaveY, waveW, waveH, '#00d4ff', 'X 偏振输出',
      (t) => iqModulation(xSymbol.i, xSymbol.q, t + xQuadPhase), Math.sqrt(2));

    drawWave(waveX, yWaveY, waveW, waveH, '#ff3366', 'Y 偏振输出',
      (t) => iqModulation(ySymbol.i, ySymbol.q, t + yQuadPhase + polRot), Math.sqrt(2));

    ctx.save();
    const sx = structureX;
    const sy = structureY;
    const sw = structureW;
    const sh = structureH;

    ctx.fillStyle = 'rgba(26, 35, 50, 0.7)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sx, sy, sw, sh, 12);
    ctx.fill();
    ctx.stroke();

    const inputX = sx + 20;
    const inputY = sy + sh / 2;
    const pbsX = sx + 60;

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(inputX, inputY);
    ctx.lineTo(pbsX, inputY);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#a855f7';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('输入光', inputX - 5, inputY - 10);

    ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pbsX - 10, sy + 10, 20, sh - 20, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText('PBS', pbsX - 9, sy + sh / 2 + 3);

    const xIQx = sx + 130;
    const yIQx = sx + 130;
    const xIQy = sy + 25;
    const yIQy = sy + sh - 35;

    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(pbsX + 10, inputY - 15);
    ctx.lineTo(xIQx - 10, xIQy + 10);
    ctx.stroke();

    ctx.strokeStyle = '#ff3366';
    ctx.shadowColor = '#ff3366';
    ctx.beginPath();
    ctx.moveTo(pbsX + 10, inputY + 15);
    ctx.lineTo(yIQx - 10, yIQy + 10);
    ctx.stroke();

    ctx.shadowBlur = 0;

    function drawIQBlock(x: number, y: number, color: string, label: string) {
      ctx.fillStyle = `${color}15`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x, y, 70, 20, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText(label, x + 8, y + 13);
    }

    drawIQBlock(xIQx, xIQy, '#00d4ff', 'X-IQ MZM');
    drawIQBlock(yIQx, yIQy, '#ff3366', 'Y-IQ MZM');

    const rotX = sx + 240;
    const rotY = yIQy;

    ctx.strokeStyle = '#ff3366';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ff3366';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(yIQx + 70, yIQy + 10);
    ctx.lineTo(rotX - 10, rotY + 10);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 51, 102, 0.15)';
    ctx.strokeStyle = '#ff3366';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(rotX, rotY, 40, 20, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ff3366';
    ctx.font = '8px JetBrains Mono, monospace';
    ctx.fillText('90° rot', rotX + 3, rotY + 13);

    const pbcX = sx + 320;

    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(xIQx + 70, xIQy + 10);
    ctx.lineTo(pbcX - 10, sy + sh / 2 - 15);
    ctx.stroke();

    ctx.strokeStyle = '#ff3366';
    ctx.shadowColor = '#ff3366';
    ctx.beginPath();
    ctx.moveTo(rotX + 40, rotY + 10);
    ctx.lineTo(pbcX - 10, sy + sh / 2 + 15);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pbcX, sy + 10, 20, sh - 20, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00ff88';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText('PBC', pbcX + 2, sy + sh / 2 + 3);

    const outputX = sx + sw - 20;

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(pbcX + 20, sy + sh / 2);
    ctx.lineTo(outputX, sy + sh / 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#00ff88';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('DP输出', outputX - 20, sy + sh / 2 - 10);

    const heaterY = sy + sh + 5;
    const heaterLabels = [
      { label: 'X-I', color: '#00d4ff', x: sx + 100 },
      { label: 'X-Q', color: '#00d4ff', x: sx + 140 },
      { label: 'X-Φ', color: '#00d4ff', x: sx + 180 },
      { label: 'Y-I', color: '#ff3366', x: sx + 220 },
      { label: 'Y-Q', color: '#ff3366', x: sx + 260 },
      { label: 'Y-Φ', color: '#ff3366', x: sx + 300 },
    ];

    heaterLabels.forEach((h) => {
      ctx.fillStyle = `${h.color}30`;
      ctx.strokeStyle = h.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(h.x, heaterY, 24, 14, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = h.color;
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText(h.label, h.x + 3, heaterY + 10);
    });

    ctx.restore();

    const xPower = xIOut + xQOut;
    const yPower = yIOut + yQOut;
    const totalPower = xPower + yPower;
    const er = inputPower > 0.001 ? 10 * Math.log10(inputPower / Math.max(Math.min(xPower, yPower), 0.0001)) : 0;

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`X 功率: ${xPower.toFixed(3)} mW`, waveX, xWaveY + waveH + 20);
    ctx.fillText(`Y 功率: ${yPower.toFixed(3)} mW`, waveX, yWaveY + waveH + 20);
    ctx.fillText(`总功率: ${totalPower.toFixed(3)} mW`, waveX + 120, yWaveY + waveH + 20);
    ctx.fillText(`消光比: ${er.toFixed(1)} dB`, waveX + 240, yWaveY + waveH + 20);
    ctx.fillText(`偏振旋转: ${(polRot * 180 / Math.PI).toFixed(1)}°`, waveX + 340, yWaveY + waveH + 20);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [
    modulationFormat,
    xSymbolIndex,
    ySymbolIndex,
    inputPower,
    time,
    getXIBiasPhase,
    getXQBiasPhase,
    getXQuadraturePhase,
    getYIBiasPhase,
    getYQBiasPhase,
    getYQuadraturePhase,
    getPolRotation,
    getXSymbol,
    getYSymbol,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
