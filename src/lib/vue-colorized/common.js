import { HSLtoRGB, RGBtoHSL } from '../colorspace';

const common = {
  /**
   * creates a callback which will get supplied the arguments you already give in.
   * */
  createCallback(onDone, ...args) {
    return function createdCallback(event) {
      return onDone(...args, event);
    };
  },
  createImage(src, onDone) {
    console.log('create|img', this);
    const img = document.createElement('img');
    img.onload = this.createCallback(onDone);
    img.src = src;
    return img;
  },
  updateImage(img, src, onDone, ...args) {
    // update src to force loading
    img.src = src;                                    // eslint-disable-line no-param-reassign
    img.onload = this.createCallback(onDone, ...args);  // eslint-disable-line no-param-reassign, max-len

    // check if already loaded
    if (img.complete) {
      // if already loaded, no onload event will be triggered.
      // we handle that case here, by calling the function directly.
      img.onload = undefined;                         // eslint-disable-line no-param-reassign
      onDone(...args);
    }
  },
  calculateScale(preScale, realElement, img) {
    // const { width, height } = calculateScale(this.preScale, this.$refs.img, this.img);
    return (
      this.preScale
        ? { width: realElement.clientWidth, height: realElement.clientHeight }
        : { width: img.naturalWidth, height: img.naturalHeight }
    );
  },
  calculateImage(img, width, height, hue) {
    // const { width, height } = calculateScale(this.preScale, this.$refs.img, this.img);
    // const computedSrc = common.calculateImage(this.img, width, height, this.hue);
    // this.computedSrc = computedSrc !== null ? computedSrc : img.src;
    console.log(
      'applying img.', width, height,
    );
    if (width === 0 || height === 0) {
      console.warn('image not yet loaded.');
      return null;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);


    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    // Loops through all of the pixels and modifies the components.
    for (let i = 0, n = pixels.length; i < n; i += 4) {
      const { s, l } = RGBtoHSL(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
      const { r, g, b } = HSLtoRGB(hue, s, l);
      pixels[i + 0] = r; // red
      pixels[i + 1] = g; // blue
      pixels[i + 2] = b; // green
      // pixels[i+3] is the transparency, which is kept unchanged.
    }
    ctx.putImageData(imgData, 0, 0);
    console.log('done.');
    return canvas.toDataURL('image/png');
  },
};
// common.this = common
Object.keys(common).forEach((key) => {
  if (typeof common[key] !== 'function') {
    return;
  }
  common[key] = common[key].bind(common);
});

export default common;
