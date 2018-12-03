// basically https://stackoverflow.com/a/17243070/3423324 squeezed through my linter.

/**
 * Converts RGB (0.0 - 255.0) to HSV (0.0 - 1.0).
 *
 * @param r {number|{r: number, g: number, b: number}} Red.
 * @param g {number} Green.
 * @param b {number} Blue.
 *
 * @returns {{h: number, h: number, s: number}}
 */// eslint-disable-next-line no-unused-vars
function RGBtoHSV(r, g, b) {
  if (typeof r === 'object' && g === undefined && b === undefined) {
    return RGBtoHSV(r.r, r.g, r.b);
  }
  const max = Math.max(r, g, b); const min = Math.min(r, g, b);
  const d = max - min;
  let h;
  const s = (max === 0 ? 0 : d / max);
  const v = max / 255;
  switch (max) {
    case min: h = 0; break;
    case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break;
    case g: h = (b - r) + d * 2; h /= 6 * d; break;
    case b: h = (r - g) + d * 4; h /= 6 * d; break;
    default: throw new Error('unknown case.');
  }

  return { h, s, v };
}

/**
 * Converts HSV (0.0 - 1.0) to RGB (0.0 - 255.0).
 *
 * @param h {number|{h: number, s: number, v: number}} Hue.
 * @param s {number} Saturation.
 * @param v {number} Value.
 *
 * @returns {{r: number, g: number, b: number}}
 */// eslint-disable-next-line no-unused-vars
function HSVtoRGB(h, s, v) {
  if (typeof h === 'object' && s === undefined && v === undefined) {
    return HSVtoRGB(h.h, h.s, h.v);
  }
  let r;
  let g;
  let b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: throw new Error('unknown case.');
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}

/**
 * Rounds `rgb = {r, g, b}` to full numbers.
 * @param rgb
 * @returns {{r: number, g: number, b: number}}
 */// eslint-disable-next-line no-unused-vars
function roundRGB(rgb) {
  return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
}

/**
 * Converts HSB (0.0 - 1.0) to HSL (0.0 - 1.0).
 *
 * @param h {number|{h: number, s: number, v: number}} Hue.
 * @param s {number} Saturation.
 * @param v {number} Value.
 *
 * @returns {{h: number, s: number, l: number}}
 */
// eslint-disable-next-line no-unused-vars
function HSVtoHSL(h, s, v) {
  if (typeof h === 'object' && s === undefined && v === undefined) {
    return HSVtoHSL(h.h, h.s, h.v);
  }
  if (typeof h !== 'number' && typeof s !== 'number' && typeof l !== 'number') {
    throw new Error('arguments must be number');
  }
  let convertedS = s * v;
  let convertedL = (2 - s) * v;
  convertedS /= (convertedL <= 1) ? convertedL : 2 - convertedL;
  convertedL /= 2;

  return {
    h,
    s: convertedS,
    l: convertedL,
  };
}

/**
 * Converts HSL (0.0 - 1.0) to HSB (0.0 - 1.0).
 *
 * @param h {number|{h: number, s: number, l: number}} Hue.
 * @param s {number} Saturation.
 * @param l {number} Luminescence.
 *
 * @returns {{h: Object, s: number, v: number}}
 */// eslint-disable-next-line no-unused-vars
function HSLtoHSV(h, s, l) {
  if (typeof h === 'object' && s === undefined && v === undefined) {
    return HSLtoHSV(h.h, h.s, h.v);
  }

  const tempL = l * 2;
  const tempS = s * ((tempL <= 1) ? tempL : 2 - tempL);
  const convertedV = (tempL + tempS) / 2;
  const convertedS = (2 * tempS) / (tempL + tempS);

  return {
    h,
    s: convertedS,
    v: convertedV,
  };
}
