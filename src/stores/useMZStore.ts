import { create } from 'zustand';
import type { ModulationMode } from '@/types';

interface MZState {
  modulationDepth: number;
  modulationDepth2: number;
  phaseShift: number;
  inputPower: number;
  frequency: number;
  mode: ModulationMode;
  isPlaying: boolean;
  time: number;
  setModulationDepth: (v: number) => void;
  setModulationDepth2: (v: number) => void;
  setPhaseShift: (v: number) => void;
  setInputPower: (v: number) => void;
  setFrequency: (v: number) => void;
  setMode: (v: ModulationMode) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;
  reset: () => void;
}

export const useMZStore = create<MZState>((set) => ({
  modulationDepth: 1,
  modulationDepth2: 1,
  phaseShift: 0,
  inputPower: 1,
  frequency: 1,
  mode: 'single-arm',
  isPlaying: true,
  time: 0,
  setModulationDepth: (v) => set({ modulationDepth: v }),
  setModulationDepth2: (v) => set({ modulationDepth2: v }),
  setPhaseShift: (v) => set({ phaseShift: v }),
  setInputPower: (v) => set({ inputPower: v }),
  setFrequency: (v) => set({ frequency: v }),
  setMode: (v) => set({ mode: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),
  reset: () =>
    set({
      modulationDepth: 1,
      modulationDepth2: 1,
      phaseShift: 0,
      inputPower: 1,
      frequency: 1,
      mode: 'single-arm',
      isPlaying: true,
      time: 0,
    }),
}));
