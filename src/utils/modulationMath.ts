import type { IQPoint, ModulationFormat } from '@/types';

export function mzOutputPower(inputPower: number, phaseShift: number): number {
  return inputPower * Math.cos(phaseShift / 2) ** 2;
}

export function mzTransferFunction(voltage: number, vPi: number = 1): number {
  return (Math.PI * voltage) / vPi;
}

export function iqModulation(iComponent: number, qComponent: number, t: number): number {
  return iComponent * Math.cos(t) + qComponent * Math.sin(t);
}

export function iqAmplitude(i: number, q: number): number {
  return Math.sqrt(i * i + q * q);
}

export function iqPhase(i: number, q: number): number {
  return Math.atan2(q, i);
}

const qpskSymbols: IQPoint[] = [
  { i: -1, q: -1 },
  { i: -1, q: 1 },
  { i: 1, q: -1 },
  { i: 1, q: 1 },
];

const qam16Symbols: IQPoint[] = [];
for (let i = -3; i <= 3; i += 2) {
  for (let q = -3; q <= 3; q += 2) {
    qam16Symbols.push({ i: i / 3, q: q / 3 });
  }
}

const qam64Symbols: IQPoint[] = [];
for (let i = -7; i <= 7; i += 2) {
  for (let q = -7; q <= 7; q += 2) {
    qam64Symbols.push({ i: i / 7, q: q / 7 });
  }
}

export function getSymbols(format: ModulationFormat): IQPoint[] {
  switch (format) {
    case 'QPSK':
      return qpskSymbols;
    case '16QAM':
      return qam16Symbols;
    case '64QAM':
      return qam64Symbols;
  }
}

export function calculateEVM(receivedPoints: IQPoint[], format: ModulationFormat): number {
  if (receivedPoints.length === 0) return 0;

  const symbols = getSymbols(format);
  let sumErrorSq = 0;
  let sumIdealSq = 0;

  for (const point of receivedPoints) {
    let minDistSq = Infinity;
    let nearestSym = symbols[0];

    for (const sym of symbols) {
      const distSq = (point.i - sym.i) ** 2 + (point.q - sym.q) ** 2;
      if (distSq < minDistSq) {
        minDistSq = distSq;
        nearestSym = sym;
      }
    }

    sumErrorSq += minDistSq;
    sumIdealSq += nearestSym.i ** 2 + nearestSym.q ** 2;
  }

  if (sumIdealSq === 0) return 0;

  const rmse = Math.sqrt(sumErrorSq / receivedPoints.length);
  const rmsIdeal = Math.sqrt(sumIdealSq / receivedPoints.length);

  return rmse / rmsIdeal;
}

function erfc(x: number): number {
  if (x < 0) return 2 - erfc(-x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return y;
}

export function theoreticalBer(format: ModulationFormat, snrDb: number): number {
  const snrLinear = Math.pow(10, snrDb / 10);

  if (format === 'QPSK') {
    return 0.5 * erfc(Math.sqrt(snrLinear / 2));
  }

  const bitsPerSymbol = { '16QAM': 4, '64QAM': 6 }[format] || 4;
  const M = Math.pow(2, bitsPerSymbol);
  const k = Math.sqrt(M);

  return ((k - 1) / (k * Math.log2(k))) * 0.5 * erfc(Math.sqrt((3 * snrLinear) / (2 * (M - 1))));
}

export function avgSymbolEnergy(format: ModulationFormat): number {
  switch (format) {
    case 'QPSK':
      return 2;
    case '16QAM':
      return 10 / 9;
    case '64QAM':
      return 6 / 7;
  }
}

export function generateBerCurve(
  format: ModulationFormat,
  snrMin: number = 0,
  snrMax: number = 30,
  points: number = 100,
): { snr: number; ber: number }[] {
  const result: { snr: number; ber: number }[] = [];
  const step = (snrMax - snrMin) / (points - 1);

  for (let i = 0; i < points; i++) {
    const snr = snrMin + i * step;
    const ber = theoreticalBer(format, snr);
    result.push({ snr, ber });
  }

  return result;
}
