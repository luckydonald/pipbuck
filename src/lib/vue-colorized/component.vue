<!-- basically https://stackoverflow.com/q/9163283/3423324 as vue component -->
<template>
  <img :src="computedSrc" ref="img" />
</template>

<!--<body>
  <div class="foobar" v-colorized-bg="hue"></div>
  <div class="foobar" v-colorized-bg.full-scale="hue"></div>
</body>-->
<script>
import common from './common';

export default {
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
      return common.createImage(this.src, this.imageLoaded);
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
</script>

<style scoped></style>
