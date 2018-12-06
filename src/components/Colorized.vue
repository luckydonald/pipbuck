<!-- basically https://stackoverflow.com/q/9163283/3423324 as vue component -->
<template>
  <img :src="computedSrc" ref="img" />
</template>

<script>
import { RGBtoHSL, HSLtoRGB } from '../lib/colorspace';

export default {
  name: 'colorized',
  props: {
    hue: {
      default: 0.08,
      type: Number,
    },
    src: {
      type: String,
      default: null,
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
      const img = document.createElement('img');
      img.onload = this.imageLoaded;
      img.src = this.src;
      return img;
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
      const width = this.preScale ? this.$refs.img.clientWidth : this.img.naturalWidth;
      const height = this.preScale ? this.$refs.img.clientHeight : this.img.naturalHeight;
      console.log(
        'applying img.', width, height,
      );
      if (width === 0 || height === 0) {
        console.log('image not yet loaded.');
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(this.img, 0, 0, width, height);


      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;

      // Loops through all of the pixels and modifies the components.
      for (let i = 0, n = pixels.length; i < n; i += 4) {
        const { s, l } = RGBtoHSL(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
        const { r, g, b } = HSLtoRGB(this.hue, s, l);
        /* console.log(
          'rgb>hsl>rgb',
          `in: { r: ${pixels[i + 0]}, g: ${pixels[i + 1]}, b: ${pixels[i + 2]} },`,
          `out: { ${r}, ${g}, ${b} },`,
        ); */
        pixels[i + 0] = r; // red
        pixels[i + 1] = g; // blue
        pixels[i + 2] = b; // green
        // pixels[i+3] is the transparency, which is kept unchanged.
      }
      ctx.putImageData(imgData, 0, 0);
      console.log('done.');
      this.computedSrc = canvas.toDataURL('image/png');
    },
  },
  mounted() {
    if (this.src) {
      this.loadImage();
    }
  },
};
</script>

<style scoped>

</style>
