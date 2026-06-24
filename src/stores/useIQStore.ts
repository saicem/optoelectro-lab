import { create } from 'zustand';
import type { ModulationFormat } from '@/utils/modulationMath';
import { getSymbols } from '@/utils/modulationMath';

interface IQState {
  modulationFormat: ModulationFormat;
  symbolIndex: number;
  autoCycle: boolean;
  iComponent: number;
  qComponent: number;
  isPlaying: boolean;
  time: number;
  setModulationFormat: (v: ModulationFormat) => void;
  setSymbolIndex: (v: number) => void;
  setAutoCycle: (v: boolean) => void;
  setIComponent: (v: number) => void;
  setQComponent: (v: number) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;
  reset: () => void;
}

export const useIQStore = create<IQState>((set, get) => ({
  modulationFormat: '16QAM',
  symbolIndex: 5,
  autoCycle: false,
  iComponent: 0.33,
  qComponent: 0.33,
  isPlaying: true,
  time: 0,
  setModulationFormat: (v) => {
    const symbols = getSymbols(v);
    const idx = Math.min(get().symbolIndex, symbols.length - 1);
    const s = symbols[idx];
    set({ modulationFormat: v, symbolIndex: idx, iComponent: s.i, qComponent: s.q });
  },
  setSymbolIndex: (v) => {
    const symbols = getSymbols(get().modulationFormat);
    const idx = Math.max(0, Math.min(v, symbols.length - 1));
    const s = symbols[idx];
    set({ symbolIndex: idx, iComponent: s.i, qComponent: s.q });
  },
  setAutoCycle: (v) => set({ autoCycle: v }),
  setIComponent: (v) => set({ iComponent: v }),
  setQComponent: (v) => set({ qComponent: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),
  reset: () => {
    const symbols = getSymbols('16QAM');
    const s = symbols[5];
    set({
      modulationFormat: '16QAM',
      symbolIndex: 5,
      autoCycle: false,
      iComponent: s.i,
      qComponent: s.q,
      isPlaying: true,
      time: 0,
    });
  },
}));
