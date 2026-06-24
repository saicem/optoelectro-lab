import { create } from 'zustand';

interface MZState {
  modulationDepth: number;
  phaseShift: number;
  inputPower: number;
  frequency: number;
  isPlaying: boolean;
  time: number;
  setModulationDepth: (v: number) => void;
  setPhaseShift: (v: number) => void;
  setInputPower: (v: number) => void;
  setFrequency: (v: number) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;
  reset: () => void;
}

export const useMZStore = create<MZState>((set) => ({
  modulationDepth: 1,
  phaseShift: 0,
  inputPower: 1,
  frequency: 1,
  isPlaying: true,
  time: 0,
  setModulationDepth: (v) => set({ modulationDepth: v }),
  setPhaseShift: (v) => set({ phaseShift: v }),
  setInputPower: (v) => set({ inputPower: v }),
  setFrequency: (v) => set({ frequency: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),
  reset: () => set({
    modulationDepth: 1,
    phaseShift: 0,
    inputPower: 1,
    frequency: 1,
    isPlaying: true,
    time: 0,
  }),
}));
