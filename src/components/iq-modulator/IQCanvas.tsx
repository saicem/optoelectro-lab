import { useEffect, useRef } from 'react';
import { useIQStore } from '@/stores/useIQStore';
import { getSymbols } from '@/utils/modulationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';
import { useCanvasResize } from '@/hooks/useCanvasResize';
import { setupCanvas } from '@/lib/utils';

export default function IQCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeKey = useCanvasResize(canvasRef);
  const {
    modulationFormat,
    iComponent,
    qComponent,
    isPlaying,
    autoCycle,
    symbolIndex,
    time,
    setTime,
    setSymbolIndex,
    pPhaseDiff,
  } = useIQStore();
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

    const I = iComponent;
    const Q = qComponent;
    const P = pPhaseDiff;
    const CYCLES = 10;
    const AMP_SCALE = 1.5;

    const symbols = getSymbols(modulationFormat);
    const decodedI = I + Q * Math.cos(P);
    const decodedQ = Q * Math.sin(P);

    // ── Constellation ──
    const constSize = Math.min(W * 0.28, H * 0.4);
    const r = constSize / 2 - 20;
    const txX = W * 0.18;
    const rxX = W * 0.82;
    const constY = H * 0.28;

    function drawCircleAndAxes(cx: number, cy: number) {
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
      ctx.restore();
    }

    function drawMarker(cx: number, cy: number, iVal: number, qVal: number, color: string, highlight: boolean) {
      const px = cx + iVal * r;
      const py = cy - qVal * r;

      if (highlight) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, cy);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(px, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── 发送端 ──
    drawCircleAndAxes(txX, constY);

    symbols.forEach((s, idx) => {
      const txI = s.i + s.q * Math.cos(P);
      const txQ = s.q * Math.sin(P);
      const isActive = idx === symbolIndex;

      ctx.fillStyle = isActive ? '#00ff88' : '#334155';
      if (isActive) ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = isActive ? 15 : 0;
      ctx.beginPath();
      ctx.arc(txX + txI * r, constY - txQ * r, isActive ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    drawMarker(txX, constY, decodedI, decodedQ, '#f59e0b', true);

    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillText('发送端', txX - r, constY - r - 20);

    // ── 接收端 ──
    drawCircleAndAxes(rxX, constY);

    symbols.forEach((s, idx) => {
      const rxI = s.i + s.q * Math.cos(P);
      const rxQ = s.q * Math.sin(P);
      const isActive = idx === symbolIndex;

      ctx.fillStyle = isActive ? '#00ff88' : '#334155';
      if (isActive) ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = isActive ? 15 : 0;
      ctx.beginPath();
      ctx.arc(rxX + rxI * r, constY - rxQ * r, isActive ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    drawMarker(rxX, constY, decodedI, decodedQ, '#00ff88', true);

    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillText('接收端', rxX - r, constY - r - 20);

    // ── 传输方向箭头 ──
    ctx.save();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(txX + r + 15, constY);
    ctx.lineTo(rxX - r - 15, constY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rxX - r - 15, constY);
    ctx.lineTo(rxX - r - 22, constY - 5);
    ctx.moveTo(rxX - r - 15, constY);
    ctx.lineTo(rxX - r - 22, constY + 5);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('光纤传输 + 相干接收', W / 2, constY - 12);
    ctx.textAlign = 'left';
    ctx.restore();

    // ── 波形 ──
    const wX = W * 0.05;
    const wW = W * 0.9;
    const waveTop = H * 0.55;
    const wH = 40;
    const wGap = 12;

    function drawWave(
      x: number,
      y: number,
      width: number,
      h: number,
      color: string,
      label: string,
      getValue: (t: number) => number,
      maxVal: number,
    ) {
      ctx.save();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y - h, width, h * 2);

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

      for (let i = 0; i <= width; i++) {
        const t = (i / width) * CYCLES * 2 * Math.PI + time * 4;
        const val = getValue(t);
        const py = y - (val / maxVal) * h * 0.8;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - h - 5);
      ctx.restore();
    }

    const w1Y = waveTop;
    const w2Y = waveTop + (wH * 2 + wGap);

    drawWave(wX, w1Y, wW, wH, '#00d4ff', `I 路: ${I.toFixed(2)}·cos(ωt)`, (t) => I * Math.cos(t), 1);

    ctx.save();
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(wX, w1Y + wH + wGap / 2);
    ctx.lineTo(wX + wW, w1Y + wH + wGap / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    drawWave(
      wX,
      w2Y,
      wW,
      wH,
      '#a855f7',
      `Q 路: ${Q.toFixed(2)}·cos(ωt - ${(P / Math.PI).toFixed(2)}π)`,
      (t) => Q * Math.cos(t - P),
      1,
    );

    const outY = waveTop + (wH * 2 + wGap) * 2;
    const iqModSignal = (t: number) => I * Math.cos(t) + Q * Math.cos(t - P);
    drawWave(
      wX,
      outY,
      wW,
      wH,
      '#00ff88',
      '合成信号 s(t)',
      iqModSignal,
      Math.max(Math.abs(I), Math.abs(Q)) * AMP_SCALE || 1,
    );

    // ── 解码波形 ──
    const decodeY = waveTop + (wH * 2 + wGap) * 3 + 10;
    const dH = 40;
    const dIW = wW / 2 - 10;
    const dQW = wW / 2 - 10;

    function drawDecodeWave(
      x: number,
      y: number,
      width: number,
      h: number,
      color: string,
      label: string,
      dcValue: number,
      getValue: (t: number) => number,
    ) {
      ctx.save();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y - h, width, h * 2);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let i = 0; i <= width; i++) {
        const t = (i / width) * CYCLES * 2 * Math.PI + time * 4;
        const val = getValue(t);
        const py = y - val * h * 0.8;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (dcValue !== 0) {
        const dcY = y - dcValue * h * 0.8;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        ctx.moveTo(x, dcY);
        ctx.lineTo(x + width, dcY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - h - 5);

      ctx.fillStyle = color;
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(`直流分量 = ${dcValue.toFixed(3)}`, x + width - 120, y - h - 5);

      ctx.restore();
    }

    const decodeIFn = (t: number) => iqModSignal(t) * Math.cos(t) * 2;
    const decodeQFn = (t: number) => iqModSignal(t) * Math.sin(t) * 2;

    drawDecodeWave(wX, decodeY, dIW, dH, '#00d4ff', '× cos(ωt) → 低通 → I', decodedI, decodeIFn);
    drawDecodeWave(wX + dIW + 20, decodeY, dQW, dH, '#a855f7', '× sin(ωt) → 低通 → Q', decodedQ, decodeQFn);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationFormat, iComponent, qComponent, time, symbolIndex, pPhaseDiff, resizeKey]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ display: 'block' }} />;
}
