import { create } from 'zustand';
import type { ModulationFormat, IQPoint } from '@/types';
import { getSymbols, avgSymbolEnergy } from '@/utils/modulationMath';

type PresetName = 'back-to-back' | 'critical' | 'low-snr';

interface ReceiverState {
  modulationFormat: ModulationFormat;
  snr: number;
  noiseEnabled: boolean;
  isPlaying: boolean;
  receivedPoints: IQPoint[];
  maxReceivedPoints: number;
  errorCount: number;
  totalSymbols: number;
  setModulationFormat: (v: ModulationFormat) => void;
  setSnr: (v: number) => void;
  setNoiseEnabled: (v: boolean) => void;
  setIsPlaying: (v: boolean) => void;
  addReceivedPoint: (point: IQPoint, isError: boolean) => void;
  clearReceivedPoints: () => void;
  reset: () => void;
  applyPreset: (preset: PresetName) => void;
}

function gaussianRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export const useReceiverStore = create<ReceiverState>((set, get) => ({
  modulationFormat: '16QAM',
  snr: 15,
  noiseEnabled: true,
  isPlaying: true,
  receivedPoints: [],
  maxReceivedPoints: 500,
  errorCount: 0,
  totalSymbols: 0,
  setModulationFormat: (v) => {
    set({
      modulationFormat: v,
      receivedPoints: [],
      errorCount: 0,
      totalSymbols: 0,
    });
  },
  setSnr: (v) => set({ snr: v, receivedPoints: [], errorCount: 0, totalSymbols: 0 }),
  setNoiseEnabled: (v) => set({ noiseEnabled: v, receivedPoints: [], errorCount: 0, totalSymbols: 0 }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  addReceivedPoint: (point, isError) => {
    const { receivedPoints, maxReceivedPoints, errorCount, totalSymbols } = get();
    const newPoints = [...receivedPoints, point];
    if (newPoints.length > maxReceivedPoints) {
      newPoints.shift();
    }
    set({
      receivedPoints: newPoints,
      errorCount: errorCount + (isError ? 1 : 0),
      totalSymbols: totalSymbols + 1,
    });
  },
  clearReceivedPoints: () => set({ receivedPoints: [], errorCount: 0, totalSymbols: 0 }),
  reset: () => {
    set({
      modulationFormat: '16QAM',
      snr: 15,
      noiseEnabled: true,
      isPlaying: true,
      receivedPoints: [],
      errorCount: 0,
      totalSymbols: 0,
    });
  },
  applyPreset: (preset) => {
    switch (preset) {
      case 'back-to-back':
        set({
          snr: 30,
          noiseEnabled: true,
          receivedPoints: [],
          errorCount: 0,
          totalSymbols: 0,
        });
        break;
      case 'critical':
        set({
          snr: 10.5,
          noiseEnabled: true,
          receivedPoints: [],
          errorCount: 0,
          totalSymbols: 0,
        });
        break;
      case 'low-snr':
        set({
          snr: 5,
          noiseEnabled: true,
          receivedPoints: [],
          errorCount: 0,
          totalSymbols: 0,
        });
        break;
    }
  },
}));

export function addAwgnNoise(i: number, q: number, snrDb: number, noiseEnabled: boolean, format: ModulationFormat): IQPoint {
  if (!noiseEnabled) {
    return { i, q };
  }
  const snrLinear = Math.pow(10, snrDb / 10);
  const avgEnergy = avgSymbolEnergy(format);
  const noisePower = avgEnergy / (2 * snrLinear);
  const noiseStd = Math.sqrt(noisePower);
  return {
    i: i + gaussianRandom() * noiseStd,
    q: q + gaussianRandom() * noiseStd,
  };
}

export function nearestSymbol(point: IQPoint, format: ModulationFormat): { i: number; q: number; index: number } {
  const symbols = getSymbols(format);
  let minDist = Infinity;
  let nearest = symbols[0];
  let nearestIdx = 0;
  symbols.forEach((s, idx) => {
    const dist = (point.i - s.i) ** 2 + (point.q - s.q) ** 2;
    if (dist < minDist) {
      minDist = dist;
      nearest = s;
      nearestIdx = idx;
    }
  });
  return { i: nearest.i, q: nearest.q, index: nearestIdx };
}
