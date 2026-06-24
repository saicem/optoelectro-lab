export interface IQPoint {
  i: number;
  q: number;
}

export function mzOutputPower(inputPower: number, phaseShift: number): number {
  return inputPower * Math.cos(phaseShift / 2) ** 2;
}

export function mzTransferFunction(voltage: number, vPi: number = 1): number {
  return Math.PI * voltage / vPi;
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

export const qpskSymbols: IQPoint[] = [
  { i: 1, q: 1 },
  { i: -1, q: 1 },
  { i: -1, q: -1 },
  { i: 1, q: -1 },
];

export const qam16Symbols: IQPoint[] = [];
for (let i = -3; i <= 3; i += 2) {
  for (let q = -3; q <= 3; q += 2) {
    qam16Symbols.push({ i: i / 3, q: q / 3 });
  }
}

export const qam64Symbols: IQPoint[] = [];
for (let i = -7; i <= 7; i += 2) {
  for (let q = -7; q <= 7; q += 2) {
    qam64Symbols.push({ i: i / 7, q: q / 7 });
  }
}

export type ModulationFormat = 'QPSK' | '16QAM' | '64QAM';

export function getSymbols(format: ModulationFormat): IQPoint[] {
  switch (format) {
    case 'QPSK': return qpskSymbols;
    case '16QAM': return qam16Symbols;
    case '64QAM': return qam64Symbols;
  }
}
