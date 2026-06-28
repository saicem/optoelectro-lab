import { useEffect, useRef } from 'react';
import { useReceiverStore, addAwgnNoise, nearestSymbol } from '@/stores/useReceiverStore';
import { getSymbols, iqAmplitude, iqPhase, iqModulation, generateBerCurve, theoreticalBer } from '@/utils/modulationMath';
import type { ModulationFormat } from '@/types';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function ReceiverCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    modulationFormat,
    snr,
    noiseEnabled,
    isPlaying,
    receivedPoints,
    addReceivedPoint,
  } = useReceiverStore();
  const timeRef = useRef(0);
  const lastSampleRef = useRef(0);
  const currentSymbolIdxRef = useRef(0);

  useAnimationFrame(
    (deltaTime) => {
      if (isPlaying) {
        timeRef.current += deltaTime * 0.001;

        if (timeRef.current - lastSampleRef.current > 0.04) {
          const symbols = getSymbols(modulationFormat);
          currentSymbolIdxRef.current = (currentSymbolIdxRef.current + 1) % symbols.length;
          const sym = symbols[currentSymbolIdxRef.current];
          const noisy = addAwgnNoise(sym.i, sym.q, snr, noiseEnabled);
          const nearest = nearestSymbol(noisy, modulationFormat);
          const isError = nearest.index !== currentSymbolIdxRef.current;
          addReceivedPoint(noisy, isError);
          lastSampleRef.current = timeRef.current;
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

    const constellationSize = Math.min(W * 0.38, H * 0.5);
    const constellationR = constellationSize / 2 - 20;
    const txConstX = W * 0.22;
    const rxConstX = W * 0.72;
    const constellationY = H * 0.3;

    function drawConstellation(
      cx: number,
      cy: number,
      r: number,
      title: string,
      titleColor: string,
      showIdeal: boolean,
      showReceived: boolean
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
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('I', cx + r + 2, cy + 4);
      ctx.fillText('Q', cx + 4, cy - r - 4);

      const symbols = getSymbols(modulationFormat);

      if (showIdeal) {
        symbols.forEach((s) => {
          const px = cx + s.i * r;
          const py = cy - s.q * r;
          ctx.fillStyle = '#475569';
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      if (showReceived && receivedPoints.length > 0) {
        receivedPoints.forEach((p, idx) => {
          const px = cx + Math.max(-1.2, Math.min(1.2, p.i)) * r;
          const py = cy - Math.max(-1.2, Math.min(1.2, p.q)) * r;
          const alpha = 0.15 + 0.5 * (idx / receivedPoints.length);
          ctx.fillStyle = `rgba(255, 107, 107, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        const lastPoint = receivedPoints[receivedPoints.length - 1];
        if (lastPoint) {
          const px = cx + Math.max(-1.2, Math.min(1.2, lastPoint.i)) * r;
          const py = cy - Math.max(-1.2, Math.min(1.2, lastPoint.q)) * r;
          ctx.fillStyle = '#ff6b6b';
          ctx.shadowColor = '#ff6b6b';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          const nearest = nearestSymbol(lastPoint, modulationFormat);
          const npx = cx + nearest.i * r;
          const npy = cy - nearest.q * r;
          ctx.strokeStyle = 'rgba(255, 200, 0, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(npx, npy);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#ffc800';
          ctx.beginPath();
          ctx.arc(npx, npy, 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = titleColor;
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.fillText(title, cx - r, cy - r - 20);
      ctx.restore();
    }

    drawConstellation(txConstX, constellationY, constellationR, '理想星座图', '#00d4ff', true, false);
    drawConstellation(rxConstX, constellationY, constellationR, '接收端星座图', '#ff6b6b', true, true);

    const arrowY = constellationY;
    ctx.save();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(txConstX + constellationR + 15, arrowY);
    ctx.lineTo(rxConstX - constellationR - 15, arrowY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rxConstX - constellationR - 15, arrowY);
    ctx.lineTo(rxConstX - constellationR - 22, arrowY - 5);
    ctx.moveTo(rxConstX - constellationR - 15, arrowY);
    ctx.lineTo(rxConstX - constellationR - 22, arrowY + 5);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('AWGN 噪声信道', W / 2, arrowY - 12);
    ctx.textAlign = 'left';
    ctx.restore();

    const waveformX = W * 0.05;
    const berChartW = 220;
    const berChartH = 160;
    const berChartX = W - berChartW - 15;
    const berChartY = H * 0.62;
    const waveformW = berChartX - waveformX - 15;
    const waveTop = H * 0.6;
    const waveH = 35;
    const waveGap = 10;

    function drawWave(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
      label: string,
      getValue: (t: number) => number,
      maxVal: number = 1,
      showNoisy: boolean = false
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

      if (showNoisy && noiseEnabled && receivedPoints.length > 0) {
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const cycles = 6;
        const lastPoint = receivedPoints[receivedPoints.length - 1];
        for (let i = 0; i <= width; i++) {
          const t = (i / width) * cycles * 2 * Math.PI + timeRef.current * 3;
          const cleanVal = getValue(t);
          const noisyVal = cleanVal + (Math.random() - 0.5) * 0.3 * (1 / Math.pow(10, snr / 20));
          const py = y - (noisyVal / maxVal) * height * 0.7;
          if (i === 0) ctx.moveTo(x + i, py);
          else ctx.lineTo(x + i, py);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const cycles = 6;
      for (let i = 0; i <= width; i++) {
        const t = (i / width) * cycles * 2 * Math.PI + timeRef.current * 3;
        const val = getValue(t);
        const py = y - (val / maxVal) * height * 0.7;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - height - 3);

      ctx.restore();
    }

    const symbols = getSymbols(modulationFormat);
    const sym = symbols[currentSymbolIdxRef.current % symbols.length];

    const waveY1 = waveTop;
    const waveY2 = waveTop + (waveH * 2 + waveGap);

    drawWave(waveformX, waveY1, waveformW, waveH, '#00d4ff', 'I 路信号', (t) => sym.i * Math.cos(t), 1, true);
    drawWave(waveformX, waveY2, waveformW, waveH, '#a855f7', 'Q 路信号', (t) => sym.q * Math.sin(t), 1, true);

    const outWaveY = waveTop + (waveH * 2 + waveGap) * 2;
    drawWave(waveformX, outWaveY, waveformW, waveH, '#00ff88', '合成 IQ 信号', (t) => iqModulation(sym.i, sym.q, t), Math.sqrt(2), true);

    const symAmp = iqAmplitude(sym.i, sym.q);
    const symPhase = iqPhase(sym.i, sym.q);

    function drawBerChart(x: number, y: number, w: number, h: number) {
      ctx.save();

      ctx.fillStyle = 'rgba(10, 14, 23, 0.8)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, w, h);

      const padding = { top: 20, right: 15, bottom: 25, left: 40 };
      const chartW = w - padding.left - padding.right;
      const chartH = h - padding.top - padding.bottom;
      const chartX = x + padding.left;
      const chartY = y + padding.top;

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BER vs SNR', x + w / 2, y + 14);
      ctx.textAlign = 'left';

      const snrMin = 0;
      const snrMax = 30;
      const berMin = 0;
      const berMax = 0.5;

      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const px = chartX + (i / 5) * chartW;
        ctx.beginPath();
        ctx.moveTo(px, chartY);
        ctx.lineTo(px, chartY + chartH);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${snrMin + (i / 5) * (snrMax - snrMin)}`, px, chartY + chartH + 12);
        ctx.textAlign = 'left';
      }

      const berTicks = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
      berTicks.forEach((ber) => {
        const ratio = (ber - berMin) / (berMax - berMin);
        const py = chartY + chartH - ratio * chartH;
        if (py >= chartY && py <= chartY + chartH) {
          ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
          ctx.beginPath();
          ctx.moveTo(chartX, py);
          ctx.lineTo(chartX + chartW, py);
          ctx.stroke();

          ctx.fillStyle = '#64748b';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.textAlign = 'right';
          ctx.fillText(ber.toFixed(1), chartX - 5, py + 3);
          ctx.textAlign = 'left';
        }
      });

      const formats: { fmt: ModulationFormat; color: string }[] = [
        { fmt: 'QPSK', color: '#00d4ff' },
        { fmt: '16QAM', color: '#a855f7' },
        { fmt: '64QAM', color: '#ff6b6b' },
      ];

      formats.forEach(({ fmt, color }) => {
        const curve = generateBerCurve(fmt, snrMin, snrMax, 80);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        let started = false;
        curve.forEach((point, idx) => {
          if (point.ber < berMin || point.ber > berMax) return;
          const px = chartX + ((point.snr - snrMin) / (snrMax - snrMin)) * chartW;
          const ratio = (point.ber - berMin) / (berMax - berMin);
          const py = chartY + chartH - ratio * chartH;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
          void idx;
        });
        ctx.stroke();
      });

      const currentBer = theoreticalBer(modulationFormat, snr);
      if (currentBer >= berMin && currentBer <= berMax && snr >= snrMin && snr <= snrMax) {
        const px = chartX + ((snr - snrMin) / (snrMax - snrMin)) * chartW;
        const ratio = (currentBer - berMin) / (berMax - berMin);
        const py = chartY + chartH - ratio * chartH;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(px, chartY);
        ctx.lineTo(px, chartY + chartH);
        ctx.moveTo(chartX, py);
        ctx.lineTo(chartX + chartW, py);
        ctx.stroke();
        ctx.setLineDash([]);

        const fmtColor = formats.find((f) => f.fmt === modulationFormat)?.color || '#ffffff';
        ctx.fillStyle = fmtColor;
        ctx.shadowColor = fmtColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.font = '9px JetBrains Mono, monospace';
      let legendX = chartX + 5;
      const legendY = chartY + 5;
      formats.forEach(({ fmt, color }) => {
        ctx.fillStyle = color;
        ctx.fillRect(legendX, legendY, 12, 2);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(fmt, legendX + 16, legendY + 4);
        legendX += ctx.measureText(fmt).width + 30;
      });

      ctx.fillStyle = '#64748b';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SNR (dB)', x + w / 2, y + h - 5);
      ctx.textAlign = 'left';

      ctx.restore();
    }

    drawBerChart(berChartX, berChartY, berChartW, berChartH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`幅度: ${symAmp.toFixed(3)}`, waveformX, outWaveY + waveH + 18);
    ctx.fillText(`相位: ${(symPhase / Math.PI).toFixed(2)}π`, waveformX + 110, outWaveY + waveH + 18);
    ctx.fillText(`SNR: ${snr.toFixed(1)} dB`, waveformX + 240, outWaveY + waveH + 18);
    ctx.fillText(`采样数: ${receivedPoints.length}`, waveformX + 370, outWaveY + waveH + 18);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationFormat, snr, noiseEnabled, receivedPoints]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
