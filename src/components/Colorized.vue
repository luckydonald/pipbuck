<!-- basically https://stackoverflow.com/q/9163283/3423324 as vue component -->
<template>
  <img :src="computedSrc" ref="img" />
</template>

<!--<body>
  <div class="foobar" v-colorized-bg="hue"></div>
  <div class="foobar" v-colorized-bg.full-scale="hue"></div>
</body>-->
<script>
import { RGBtoHSL, HSLtoRGB } from '../lib/colorspace';

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
    const img = document.createElement('img');
    img.onload = this.createOnloadCallback(onDone);
    img.src = src;
    return img;
  },
  updateImage(img, src, onDone, ...args) {
    // update src to force loading
    img.src = src;                                    // eslint-disable-line no-param-reassign
    img.onload = this.createOnloadCallback(onDone, ...args);  // eslint-disable-line no-param-reassign, max-len

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
// common.calculateImage = common.calculateImage.bind(common);


const directive = {
  inserted(el, binding, vnode) {                     // eslint-disable-line no-unused-vars
    // eslint-disable-next-line no-param-reassign
    el.colorized = {
      img: common.createImage(),
    };
    this.update(el, binding, vnode, null);
  },
  update(el, binding, vnode, oldVnode) {             // eslint-disable-line no-unused-vars
    // Implementing the following:
    // ```js
    // watch: {
    //   src() { this.loadImage(); },
    //   hue() { this.applyImage(); },
    //   preScale() { this.applyImage(); },
    // },
    // ```
    //
    // With using the HTML `v-colorized-bg.full-scale:background-image="hue"`
    // our `binding` will look like:
    // ```json
    //  {
    //    name: "colorized-bg",  // name of the directive. `v-colorized-bg`
    //    value: 123, // New hue. `v-colorized-bg="hue"`
    //    value: { hue: 123, src: "https://..." }, // New hue/src. `v-colorized-bg="{ hue: hue, src: 'https://...' }"`
    //    oldValue: { hue, src }, // old hue/src.
    //    expression: "...", // raw code string of value. `v-colorized-bg="..."`
    //    arg: "background", // behind the colon. `v-colorized-bg:background`
    //    modifiers: { full-scale: true }, // Only present if present. `v-colorized-bg.full-scale`
    //  }

    // See https://vuejs.org/v2/guide/custom-directive.html#Directive-Hook-Arguments

    if (binding.oldValue === binding.value) {
      // hue doesn't need to update
      return;
    }
    const options = {
      hue: binding.value.hue,
      src: binding.value.src,
      fullScale: binding.modifier.fullScale || false,
      cssAttribute: binding.arg || (
        typeof binding.value === 'object' && typeof binding.value.cssAttribute !== 'undefined'
          ? binding.value.cssAttribute
          // eslint-disable-next-line no-shadow, no-unused-vars
          : (image, options) => 'background'
      ),
      cssTemplate: (
        typeof binding.value === 'object' && typeof binding.value.cssTemplate === 'function'
          ? binding.value.cssTemplate
          // eslint-disable-next-line no-shadow, no-unused-vars
          : (image, options) => `${image} no-repeat`
      ),
      img: el.colorized.img,
      target: el,
    };
    common.updateImage(options.img, options.src, common.createCallback(this.applyImage, options));
  },
  // eslint-disable-line no-param-reassign
  applyImage(options) {
    console.log('applying img.');
    const { width, height } = common.calculateScale(options.preScale, options.target, options.img);
    const computedSrc = common.calculateImage(options.img, width, height, options.hue);
    if (!computedSrc) {
      return; // we couldn't calculate anything, as the image was not yet loaded.
    }
    const attribute = (
      typeof options.cssAttribute === 'string'
        ? options.cssAttribute
        : options.cssAttribute(computedSrc, options)
    );
    // eslint-disable-next-line no-param-reassign
    options.target.style[attribute] = options.cssTemplate(computedSrc, options);
  },
};

const component = {
  name: 'colorized',
  props: {
    hue: {
      default: 0.08,
      type: Number,
    },
    src: {
      default: null,
      type: String,
    },
    /**
     * If set to true it will scale the `src` image to the current dimensions this contained `<img>`
     * element takes.
     * This might reduce processing power for smaller
     */
    preScale: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      computedSrc: this.src,
    };
  },
  computed: {
    img() {
      console.log('created img.');
      return common.createImage.call(this.src, this.imageLoaded);
    },
  },
  watch: {
    src() { this.loadImage(); },
    hue() { this.applyImage(); },
    preScale() { this.applyImage(); },
  },
  methods: {
    loadImage() {
      console.log('computing img.', this.src, this.hue);
      // update src to force loading
      this.img.src = this.src;
      // check if already loaded
      if (this.img.complete) {
        // if already loaded, no onload event will be triggered.
        // we handle that case here, by calling the function directly.
        this.applyImage();
      }
    },
    imageLoaded(event) {
      console.log('loaded img.', event);
      this.applyImage(this.img);
    },
    applyImage() {
      console.log('applying img.');
      const { width, height } = common.calculateScale(this.preScale, this.$refs.img, this.img);
      const computedSrc = common.calculateImage(this.img, width, height, this.hue);
      if (!computedSrc) {
        return; // we couldn't calculate anything, as the image was not yet loaded.
      }
      this.computedSrc = computedSrc;
    },
  },
  mounted() {
    if (this.src) {
      this.loadImage();
    }
  },
};

const VColorized = {
  install: (Vue) => {
    // registration
    Vue.directive('colorized-bg', directive);
    Vue.component('colorized', component);
  },
  directive,
  component,
};

export default VColorized;
</script>

<style scoped></style>
