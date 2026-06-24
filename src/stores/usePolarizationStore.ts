import { create } from 'zustand';
import { polarizationState } from '@/utils/polarizationMath';

interface PolarizationState {
  ex: number;
  ey: number;
  delta: number;
  rotationAngle: number;
  xPower: number;
  yPower: number;
  multiplexing: boolean;
  isPlaying: boolean;
  time: number;
  setEx: (v: number) => void;
  setEy: (v: number) => void;
  setDelta: (v: number) => void;
  setRotationAngle: (v: number) => void;
  setXPower: (v: number) => void;
  setYPower: (v: number) => void;
  setMultiplexing: (v: boolean) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;
  reset: () => void;
  getStokes: () => { S0: number; S1: number; S2: number; S3: number };
}

export const usePolarizationStore = create<PolarizationState>((set, get) => ({
  ex: 1,
  ey: 1,
  delta: Math.PI / 4,
  rotationAngle: 0,
  xPower: 1,
  yPower: 0.8,
  multiplexing: true,
  isPlaying: true,
  time: 0,
  setEx: (v) => set({ ex: v }),
  setEy: (v) => set({ ey: v }),
  setDelta: (v) => set({ delta: v }),
  setRotationAngle: (v) => set({ rotationAngle: v }),
  setXPower: (v) => set({ xPower: v }),
  setYPower: (v) => set({ yPower: v }),
  setMultiplexing: (v) => set({ multiplexing: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),
  reset: () => set({
    ex: 1,
    ey: 1,
    delta: Math.PI / 4,
    rotationAngle: 0,
    xPower: 1,
    yPower: 0.8,
    multiplexing: true,
    isPlaying: true,
    time: 0,
  }),
  getStokes: () => {
    const { ex, ey, delta } = get();
    return polarizationState(ex, ey, delta);
  },
}));
