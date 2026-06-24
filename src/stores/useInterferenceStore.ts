import { create } from 'zustand';

interface InterferenceState {
  wavelength: number;
  amplitude1: number;
  amplitude2: number;
  phaseDiff: number;
  isPlaying: boolean;
  time: number;
  setWavelength: (v: number) => void;
  setAmplitude1: (v: number) => void;
  setAmplitude2: (v: number) => void;
  setPhaseDiff: (v: number) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;
  reset: () => void;
}

export const useInterferenceStore = create<InterferenceState>((set) => ({
  wavelength: 550,
  amplitude1: 1,
  amplitude2: 1,
  phaseDiff: 0,
  isPlaying: true,
  time: 0,
  setWavelength: (v) => set({ wavelength: v }),
  setAmplitude1: (v) => set({ amplitude1: v }),
  setAmplitude2: (v) => set({ amplitude2: v }),
  setPhaseDiff: (v) => set({ phaseDiff: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),
  reset: () => set({
    wavelength: 550,
    amplitude1: 1,
    amplitude2: 1,
    phaseDiff: 0,
    isPlaying: true,
    time: 0,
  }),
}));
