interface StokesParams {
  S0: number;
  S1: number;
  S2: number;
  S3: number;
}

export function stokesToPoincare(s: StokesParams): { x: number; y: number; z: number } {
  const norm = s.S0 || 1;
  return {
    x: s.S1 / norm,
    y: s.S2 / norm,
    z: s.S3 / norm,
  };
}

export function calculateDOP(s: StokesParams): number {
  if (s.S0 === 0) return 0;
  return Math.sqrt(s.S1 ** 2 + s.S2 ** 2 + s.S3 ** 2) / s.S0;
}

export function polarizationState(ex: number, ey: number, delta: number): StokesParams {
  const S0 = ex ** 2 + ey ** 2;
  const S1 = ex ** 2 - ey ** 2;
  const S2 = 2 * ex * ey * Math.cos(delta);
  const S3 = 2 * ex * ey * Math.sin(delta);
  return { S0, S1, S2, S3 };
}

export function rotateStokes(s: StokesParams, angle: number): StokesParams {
  const cosA = Math.cos(2 * angle);
  const sinA = Math.sin(2 * angle);
  return {
    S0: s.S0,
    S1: s.S1 * cosA + s.S2 * sinA,
    S2: -s.S1 * sinA + s.S2 * cosA,
    S3: s.S3,
  };
}

export function phaseRetarder(s: StokesParams, phaseShift: number): StokesParams {
  const cosP = Math.cos(phaseShift);
  const sinP = Math.sin(phaseShift);
  return {
    S0: s.S0,
    S1: s.S1,
    S2: s.S2 * cosP - s.S3 * sinP,
    S3: s.S2 * sinP + s.S3 * cosP,
  };
}
