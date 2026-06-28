export function sineWave(
  x: number,
  amplitude: number,
  wavelength: number,
  phase: number,
  offset: number = 0
): number {
  return offset + amplitude * Math.sin((2 * Math.PI * x) / wavelength + phase);
}

export function superposeWaves(
  x: number,
  waves: { amplitude: number; wavelength: number; phase: number }[],
  offset: number = 0
): number {
  let sum = 0;
  for (const wave of waves) {
    sum += wave.amplitude * Math.sin((2 * Math.PI * x) / wave.wavelength + wave.phase);
  }
  return offset + sum;
}

export function interferenceIntensity(
  I1: number,
  I2: number,
  phaseDiff: number
): number {
  return I1 + I2 + 2 * Math.sqrt(I1 * I2) * Math.cos(phaseDiff);
}

export function wavelengthToColor(wavelength: number): string {
  let r = 0, g = 0, b = 0;
  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    g = 0;
    b = 1;
  } else if (wavelength >= 440 && wavelength < 490) {
    r = 0;
    g = (wavelength - 440) / (490 - 440);
    b = 1;
  } else if (wavelength >= 490 && wavelength < 510) {
    r = 0;
    g = 1;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1;
    b = 0;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1;
    g = -(wavelength - 645) / (645 - 580);
    b = 0;
  } else if (wavelength >= 645 && wavelength <= 780) {
    r = 1;
    g = 0;
    b = 0;
  }
  return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
}
