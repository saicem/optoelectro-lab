import { create } from 'zustand';
import type { ModulationFormat, IQPoint, HeaterState } from '@/utils/dualPolarizationMath';
import { getSymbols, heaterPhaseShift, heaterPower } from '@/utils/dualPolarizationMath';

interface HeaterConfig extends HeaterState {
  resistance: number;
}

interface DualPolarizationState {
  modulationFormat: ModulationFormat;
  xSymbolIndex: number;
  ySymbolIndex: number;
  autoCycle: boolean;
  inputPower: number;
  isPlaying: boolean;
  time: number;

  xIHeater: HeaterConfig;
  xQHeater: HeaterConfig;
  xQuadratureHeater: HeaterConfig;

  yIHeater: HeaterConfig;
  yQHeater: HeaterConfig;
  yQuadratureHeater: HeaterConfig;

  polRotationHeater: HeaterConfig;

  setModulationFormat: (v: ModulationFormat) => void;
  setXSymbolIndex: (v: number) => void;
  setYSymbolIndex: (v: number) => void;
  setAutoCycle: (v: boolean) => void;
  setInputPower: (v: number) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;

  setXIHeaterVoltage: (v: number) => void;
  setXQHeaterVoltage: (v: number) => void;
  setXQuadratureHeaterVoltage: (v: number) => void;
  setYIHeaterVoltage: (v: number) => void;
  setYQHeaterVoltage: (v: number) => void;
  setYQuadratureHeaterVoltage: (v: number) => void;
  setPolRotationHeaterVoltage: (v: number) => void;

  getXIBiasPhase: () => number;
  getXQBiasPhase: () => number;
  getXQuadraturePhase: () => number;
  getYIBiasPhase: () => number;
  getYQBiasPhase: () => number;
  getYQuadraturePhase: () => number;
  getPolRotation: () => number;

  getXSymbol: () => IQPoint;
  getYSymbol: () => IQPoint;

  getTotalPower: () => number;

  reset: () => void;
  resetHeaters: () => void;
  autoCalibrate: () => void;
}

const defaultHeater = (voltage: number = 2.5): HeaterConfig => ({
  voltage,
  current: voltage / 50,
  resistance: 50,
});

export const useDualPolarizationStore = create<DualPolarizationState>((set, get) => ({
  modulationFormat: 'QPSK',
  xSymbolIndex: 0,
  ySymbolIndex: 1,
  autoCycle: true,
  inputPower: 2,
  isPlaying: true,
  time: 0,

  xIHeater: defaultHeater(2.5),
  xQHeater: defaultHeater(2.5),
  xQuadratureHeater: defaultHeater(3.5),

  yIHeater: defaultHeater(2.5),
  yQHeater: defaultHeater(2.5),
  yQuadratureHeater: defaultHeater(3.5),

  polRotationHeater: defaultHeater(0),

  setModulationFormat: (v) => {
    const symbols = getSymbols(v);
    set({
      modulationFormat: v,
      xSymbolIndex: Math.min(get().xSymbolIndex, symbols.length - 1),
      ySymbolIndex: Math.min(get().ySymbolIndex, symbols.length - 1),
    });
  },
  setXSymbolIndex: (v) => set({ xSymbolIndex: Math.max(0, v) }),
  setYSymbolIndex: (v) => set({ ySymbolIndex: Math.max(0, v) }),
  setAutoCycle: (v) => set({ autoCycle: v }),
  setInputPower: (v) => set({ inputPower: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),

  setXIHeaterVoltage: (v) => {
    const h = get().xIHeater;
    set({ xIHeater: { ...h, voltage: v, current: v / h.resistance } });
  },
  setXQHeaterVoltage: (v) => {
    const h = get().xQHeater;
    set({ xQHeater: { ...h, voltage: v, current: v / h.resistance } });
  },
  setXQuadratureHeaterVoltage: (v) => {
    const h = get().xQuadratureHeater;
    set({ xQuadratureHeater: { ...h, voltage: v, current: v / h.resistance } });
  },
  setYIHeaterVoltage: (v) => {
    const h = get().yIHeater;
    set({ yIHeater: { ...h, voltage: v, current: v / h.resistance } });
  },
  setYQHeaterVoltage: (v) => {
    const h = get().yQHeater;
    set({ yQHeater: { ...h, voltage: v, current: v / h.resistance } });
  },
  setYQuadratureHeaterVoltage: (v) => {
    const h = get().yQuadratureHeater;
    set({ yQuadratureHeater: { ...h, voltage: v, current: v / h.resistance } });
  },
  setPolRotationHeaterVoltage: (v) => {
    const h = get().polRotationHeater;
    set({ polRotationHeater: { ...h, voltage: v, current: v / h.resistance } });
  },

  getXIBiasPhase: () => {
    const h = get().xIHeater;
    return heaterPhaseShift(h, 5) - Math.PI / 2;
  },
  getXQBiasPhase: () => {
    const h = get().xQHeater;
    return heaterPhaseShift(h, 5) - Math.PI / 2;
  },
  getXQuadraturePhase: () => {
    const h = get().xQuadratureHeater;
    return heaterPhaseShift(h, 5) - Math.PI / 2;
  },
  getYIBiasPhase: () => {
    const h = get().yIHeater;
    return heaterPhaseShift(h, 5) - Math.PI / 2;
  },
  getYQBiasPhase: () => {
    const h = get().yQHeater;
    return heaterPhaseShift(h, 5) - Math.PI / 2;
  },
  getYQuadraturePhase: () => {
    const h = get().yQuadratureHeater;
    return heaterPhaseShift(h, 5) - Math.PI / 2;
  },
  getPolRotation: () => {
    const h = get().polRotationHeater;
    return heaterPhaseShift(h, 3);
  },

  getXSymbol: () => {
    const symbols = getSymbols(get().modulationFormat);
    return symbols[Math.min(get().xSymbolIndex, symbols.length - 1)];
  },
  getYSymbol: () => {
    const symbols = getSymbols(get().modulationFormat);
    return symbols[Math.min(get().ySymbolIndex, symbols.length - 1)];
  },

  getTotalPower: () => {
    const s = get();
    return heaterPower(s.xIHeater) + heaterPower(s.xQHeater) + heaterPower(s.xQuadratureHeater) +
           heaterPower(s.yIHeater) + heaterPower(s.yQHeater) + heaterPower(s.yQuadratureHeater) +
           heaterPower(s.polRotationHeater);
  },

  reset: () => {
    set({
      modulationFormat: 'QPSK',
      xSymbolIndex: 0,
      ySymbolIndex: 1,
      autoCycle: true,
      inputPower: 2,
      isPlaying: true,
      time: 0,
    });
    get().resetHeaters();
  },
  resetHeaters: () => {
    set({
      xIHeater: defaultHeater(2.5),
      xQHeater: defaultHeater(2.5),
      xQuadratureHeater: defaultHeater(3.5),
      yIHeater: defaultHeater(2.5),
      yQHeater: defaultHeater(2.5),
      yQuadratureHeater: defaultHeater(3.5),
      polRotationHeater: defaultHeater(0),
    });
  },
  autoCalibrate: () => {
    set({
      xIHeater: defaultHeater(2.5),
      xQHeater: defaultHeater(2.5),
      xQuadratureHeater: defaultHeater(3.536),
      yIHeater: defaultHeater(2.5),
      yQHeater: defaultHeater(2.5),
      yQuadratureHeater: defaultHeater(3.536),
      polRotationHeater: defaultHeater(0),
    });
  },
}));
