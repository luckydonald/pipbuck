// basically some approaches from the internet, squeezed through my linter.

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
 * @see http://rgb2hsl.nichabi.com/javascript-function.php
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
  let h = 0; // default for achromatic
  let s = 0; // default for achromatic
  let l = (max + min) / 2;

  if (max !== min) {
    // not achromatic
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

    h /= 6; // https://stackoverflow.com/2353211/#comment52742002_9493060
  }
  h = Math.floor(h * 360);
  s = Math.floor(s * 100);
  l = Math.floor(l * 100);
  return { h, s, l };
}


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param h {number|{h: number, s: number,  l: number }} The hue
 * @param s {number|undefined} The saturation
 * @param l {number|undefined} The lightness
 * @return {{r: number, g: number, b: number}} The RGB representation
 * @see http://hsl2rgb.nichabi.com/javascript-function.php
 */// eslint-disable-next-line no-unused-vars
export function HSLtoRGB(h, s, l) {
  if (typeof h === 'object' && s === undefined && l === undefined) {
    return HSLtoRGB(h.h, h.s, h.l);
  }
  let r;
  let g;
  let b;
  let computedH = !Number.isFinite(h) ? 0 : h;
  let computedS = !Number.isFinite(s) ? 0 : s;
  let computedL = !Number.isFinite(l) ? 0 : l;

  computedH /= 60;
  if (computedH < 0) {
    computedH = 6 - (-computedH % 6);
  }
  computedH %= 6;
  computedS = Math.max(0, Math.min(1, computedS / 100));
  computedL = Math.max(0, Math.min(1, l / 100));

  const c = (1 - Math.abs((2 * computedL) - 1)) * computedS;
  const x = c * (1 - Math.abs((computedH % 2) - 1));

  if (computedH < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (computedH < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (computedH < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (computedH < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (computedH < 5) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const m = computedL - c / 2;
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
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
  if (a === undefined || a === null) {
    // use hex "#RRGGBB"
    const hex = RGBtoHex(RGB);
    console.log({
      '0_input': HSL,
      '1_rgb': RGB,
      '2_hex': hex,
    });
    return hex;
  }
  // use hex "rgba(R, G, B, A)"
  const { r, g, b } = RGB;
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
