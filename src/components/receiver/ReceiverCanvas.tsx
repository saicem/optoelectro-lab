import { useEffect, useRef } from 'react';
import { useReceiverStore, addAwgnNoise, nearestSymbol } from '@/stores/useReceiverStore';
import {
  getSymbols,
  iqAmplitude,
  iqPhase,
  generateBerCurve,
  theoreticalBer,
} from '@/utils/modulationMath';
import type { ModulationFormat } from '@/types';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { useCanvasResize } from '@/hooks/useCanvasResize';
import { setupCanvas, drawGrid } from '@/lib/utils';

export default function ReceiverCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeKey = useCanvasResize(canvasRef);
  const { modulationFormat, snr, noiseEnabled, isPlaying, receivedPoints, addReceivedPoint } = useReceiverStore();
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
    { autoStart: true },
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dim = setupCanvas(canvas, ctx);
    if (!dim) return;
    const { width: W, height: H } = dim;

    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);

    drawGrid(ctx, W, H, 30, 'rgba(51, 65, 85, 0.3)');

    const constellationR = Math.min(W * 0.17, H * 0.2) - 10;
    const txConstX = W * 0.25;
    const rxConstX = W * 0.75;
    const constellationY = H * 0.32;

    function drawConstellation(
      cx: number,
      cy: number,
      r: number,
      title: string,
      titleColor: string,
      showIdeal: boolean,
      showReceived: boolean,
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

      if (showIdeal) {
        const symbols = getSymbols(modulationFormat);
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

    drawConstellation(txConstX, constellationY, constellationR, '发送端星座图', '#00d4ff', true, false);
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

    const berChartH = Math.min(H * 0.28, 160);
    const berChartW = Math.min(W - 40, 560);
    const berChartX = (W - berChartW) / 2;
    const berChartY = H * 0.62;

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
        curve.forEach((point) => {
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

    const symbols = getSymbols(modulationFormat);
    const sym = symbols[currentSymbolIdxRef.current % symbols.length];
    const symAmp = iqAmplitude(sym.i, sym.q);
    const symPhase = iqPhase(sym.i, sym.q);

    ctx.fillStyle = 'rgba(10, 14, 23, 0.7)';
    ctx.fillRect(0, H - 28, W, 28);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono, monospace';
    const statusItems = [
      { label: '幅度', value: symAmp.toFixed(3), color: '#00d4ff' },
      { label: '相位', value: `${(symPhase / Math.PI).toFixed(2)}π`, color: '#a855f7' },
      { label: 'SNR', value: `${snr.toFixed(1)} dB`, color: '#ff6b6b' },
      { label: '采样数', value: receivedPoints.length.toString(), color: '#94a3b8' },
    ];
    let statusX = 15;
    statusItems.forEach((item) => {
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${item.label}: `, statusX, H - 8);
      statusX += ctx.measureText(`${item.label}: `).width;
      ctx.fillStyle = item.color;
      const valWidth = ctx.measureText(item.value).width;
      ctx.fillText(item.value, statusX, H - 8);
      statusX += valWidth + 25;
    });

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationFormat, snr, noiseEnabled, receivedPoints, resizeKey]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ display: 'block' }} />;
}
