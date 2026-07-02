export interface IQPoint {
  i: number;
  q: number;
}

export type ModulationFormat = 'QPSK' | '16QAM' | '64QAM';

export type ModulationMode = 'single-arm' | 'dual-arm' | 'push-pull';
