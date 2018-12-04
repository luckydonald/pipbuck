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
export function brokenRGBtoHSV(r, g, b) {
  if (typeof r === 'object' && g === undefined && b === undefined) {
    return brokenRGBtoHSV(r.r, r.g, r.b);
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
    default: throw new Error('unknown integer case.');
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
export function HSVtoRGB(h, s, v) {
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
 * Converts HSB (0.0 - 1.0) to HSL (0.0 - 1.0).
 *
 * @param h {number|{h: number, s: number, v: number}} Hue.
 * @param s {number} Saturation.
 * @param v {number} Value.
 *
 * @returns {{h: number, s: number, l: number}}
 */
// eslint-disable-next-line no-unused-vars
export function HSVtoHSL(h, s, v) {
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
export function HSLtoHSV(h, s, l) {
  if (typeof h === 'object' && s === undefined && l === undefined) {
    return HSLtoHSV(h.h, h.s, h.l);
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

/**
 * Rounds `rgb = {r, g, b}` to full numbers.
 * @param rgb {{r: number, g: number, b: number}}
 * @returns {{r: number, g: number, b: number}}
 */// eslint-disable-next-line no-unused-vars
export function roundRGB(rgb) {
  return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
}

/**
 * Converts a color component to hex.
 *
 * @param c
 * @returns {string}
 *
 * @see https://stackoverflow.com/a/5624139/3423324
 */
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Converts `rgb = {r, g, b}` to `#rrggbb` hex.
 *
 * @param rgb {{r: number, g: number, b: number}}
 * @returns {string} The hex string `#RRGGBB`
 * @see https://stackoverflow.com/a/5624139/3423324
 */// eslint-disable-next-line no-unused-vars
export function RGBtoHex(rgb) {
  return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`;
}

/**
 * Converts `#rrggbb` to `rgb = {r, g, b}`.
 *
 * @param hex {string} The hex string: `#RRGGBB`.
 * @returns {{r: number, g: number, b: number}} The RGBs.
 * @see https://stackoverflow.com/a/5624139/3423324
 */// eslint-disable-next-line no-unused-vars
export function HexToRGB(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const convertedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(convertedHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}


/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param r {number} The red color value
 * @param g {number} The green color value
 * @param b {number} The blue color value
 * @return {{h: number, s: number,  l: number }} The HSL representation
 */// eslint-disable-next-line no-unused-vars
export function RGBtoHSL(r, g, b) {
  if (typeof r === 'object' && g === undefined && b === undefined) {
    return RGBtoHSL(r.r, r.g, r.b);
  }
  const calculatedR = r / 255;
  const calculatedG = g / 255;
  const calculatedB = b / 255;

  const max = Math.max(calculatedR, calculatedG, calculatedB); const
    min = Math.min(calculatedR, calculatedG, calculatedB);
  let h; let s; const
    l = (max + min) / 2;

  if (max === min) {
    // achromatic
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case calculatedR:
        h = (calculatedG - calculatedB) / d + (calculatedG < calculatedB ? 6 : 0);
        break;
      case calculatedG:
        h = (calculatedB - calculatedR) / d + 2;
        break;
      case calculatedB:
        h = (calculatedR - calculatedG) / d + 4;
        break;
      default: throw new Error('max case not found.');
    }

    h /= 6;
  }

  return { h, s, l };
}

/**
 * Helper method for HSLtoRGB.
 * @param p
 * @param q
 * @param t
 * @returns {*}
 */
function hue2rgb(p, q, t) {
  let calculatedT = t;
  if (calculatedT < 0) calculatedT += 1;
  if (calculatedT > 1) calculatedT -= 1;
  if (calculatedT < 1 / 6) return p + (q - p) * 6 * calculatedT;
  if (calculatedT < 1 / 2) return q;
  if (calculatedT < 2 / 3) return p + (q - p) * (2 / 3 - calculatedT) * 6;
  return p;
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param h {number|{h: number, s: number,  l: number }} The hue
 * @param s {number} The saturation
 * @param l {number} The lightness
 * @return {{r: number, g: number, b: number}} The RGB representation
 */// eslint-disable-next-line no-unused-vars
export function HSLtoRGB(h, s, l) {
  if (typeof h === 'object' && s === undefined && l === undefined) {
    return HSLtoRGB(h.h, h.s, h.l);
  }
  let r;
  let g;
  let b;

  if (s === 0) {
    // achromatic, all channels same brighness.
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param r {number} The red color value
 * @param g {number} The green color value
 * @param b {number} The blue color value
 * @return {{h: number, s: number,  v: number }} The HSV representation
 */// eslint-disable-next-line no-unused-vars
function RGBtoHSV(r, g, b) {
  const calculatedR = r / 255;
  const calculatedG = g / 255;
  const calculatedB = b / 255;

  const max = Math.max(calculatedR, calculatedG, calculatedB); const
    min = Math.min(calculatedR, calculatedG, calculatedB);
  let h;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case calculatedR:
        h = (calculatedG - calculatedB) / d + (calculatedG < calculatedB ? 6 : 0);
        break;
      case calculatedG:
        h = (calculatedB - calculatedR) / d + 2;
        break;
      case calculatedB:
        h = (calculatedR - calculatedG) / d + 4;
        break;
      default: throw new Error('max not found');
    }
    h /= 6;
  }

  return { h, s, v };
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param h {number}  The hue.
 * @param s {number}  The saturation.
 * @param v {number}  The brightness.
 * @return {{r: number, g: number,  b: number }}  The RGB representation
 */// eslint-disable-next-line no-unused-vars
function HSBtoRGB(h, s, v) {
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
    default: throw new Error('strange number');
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

/**
 * Converts RGB (0.0 - 255.0) to HSL (0.0 - 1.0).
 *
 * @param h {number|{h: number, s: number, l: number, a: number}|{h:number,s:number,l:number}} Hue.
 * @param s {number} Saturation.
 * @param l {number} Luminescence.
 * @param a {number} Alpha.
 * @returns {string}
 */
export function hsl(h, s, l, a) {
  if (typeof h === 'object' && s === undefined && l === undefined && a === undefined) {
    return hsl(h.h, h.s, h.l, h.a || undefined);
  }
  const HSL = { h, s, l };
  const RGB = HSLtoRGB(HSL);
  const rgb = roundRGB(RGB);
  if (a === undefined || a === null) {
    // use hex "#RRGGBB"
    const hex = roundRGB(rgb);
    console.log({
      '0_input': HSL,
      '1_rgb': RGB,
      '2_round': rgb,
      '3_hex': hex,
    });
    return hex;
  }
  // use hex "rgba(R, G, B, A)"
  const { r, g, b } = rgb;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * @return {number}
 */
export function HexToHue(hex) {
  const RGB = HexToRGB(hex);
  const HSL = RGBtoHSL(RGB);
  const hue = HSL.h;
  console.log({
    '0_input': hex,
    '1_rgb': RGB,
    '2_hsk': HSL,
    '3_hue': hue,
  });
  return hue;
}
