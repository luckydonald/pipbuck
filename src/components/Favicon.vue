<template>
  <div>
    <slot ref="svg" v-show="false"></slot>
    <slot name="link" v-show="false"><link rel='icon' ref="icon" :url="data" /></slot>
  </div>
</template>

<script>
// https://github.com/EvanHahn/canvas-to-favicon/blob/master/canvas-to-favicon.js
import { mapState } from 'vuex';

export default {
  name: 'favicon',
  data() {
    return {
      data: '',
    };
  },
  methods: {
    calculateData() {
      // get svg data
      console.log('data:', this.$slots.default()[0].elm);
      const svg = this.$el.getElementsByTagName('svg')[0];
      if (svg === undefined || svg === null) {
        return '';
      }
      const xml = new XMLSerializer().serializeToString(svg);

      // make it base64
      const svg64 = btoa(xml);

      // prepend a "header", set it as the source of the img element
      const img = document.createElement('img');
      img.src = `data:image/svg+xml;base64,${svg64}`;

      // draw the image onto the canvas
      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', '16px');
      canvas.setAttribute('width', 16);
      canvas.setAttribute('height', '16px');
      canvas.setAttribute('height', 16);
      canvas.getContext('2d').drawImage(img, 0, 0, 16, 16);

      return canvas.toDataURL('image/png');
    },
    applyData(newValue) {
      const icon = this.$el.getElementsByTagName('link')[0];
      console.log('recreating icon!');
      const existingIcons = document.querySelectorAll('head link[rel="icon"]');
      for (let i = 0, len = existingIcons.length; i < len; i++) {
        document.head.removeChild(existingIcons[i]);
      }

      const iconElement = icon.cloneNode(true);
      iconElement.href = newValue;
      iconElement.type = 'image/png';
      document.head.appendChild(iconElement);
    },
    updateDataNextTick() {
      this.$nextTick(function updateData() {
        console.log('next tick');
        this.data = this.calculateData();
      });
    },
  },
  computed: {
    /**
     * @return {Node}
     */
    ...mapState(['colorFront', 'colorBack']),
  },
  watch: {
    colorFront() {
      console.log('color change front');
      return this.updateDataNextTick();
    },
    /* colorBack() {
      console.log('color change front');
      return this.updateDataNextTick();
    }, */
    data(newValue) {
      console.log('applying data');
      this.applyData(newValue);
    },
  },
};
</script>

<style scoped>
svg, img, canvas {
  display: none;
}
</style>
