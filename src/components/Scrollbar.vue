<template>
  <div class="track" ref="track">
    <div class="bar" :style="{ height: cssHeight, top: cssOffset }"></div>
  </div>
</template>

<script>
export default {
  name: 'Scrollbar',
  props: {
    element: {
      type: HTMLElement,
    },
  },
  data() {
    return {
      scroll: 0,
      animationFrameRequest: null,
    };
  },
  methods: {
    onScroll() {
      if (this.animationFrameRequest === null) {
        this.animationFrameRequest = requestAnimationFrame(
          this.onScrollFrame.bind(this),
        );
      }
    },
    onScrollFrame() {
      console.log('scroll debounced!');
      const scrollableWay = this.element.scrollHeight - this.element.clientHeight;
      this.scroll = this.element.scrollTop / scrollableWay;
      this.animationFrameRequest = null;
    },
  },
  watch: {
    element(newVal, oldVal) {
      console.log('change', newVal, oldVal, '@', this.element);
      if (oldVal) {
        console.log('change, removing old listener', oldVal);
        oldVal.removeEventListener('scroll', this.onScroll);
        oldVal.removeEventListener('wheel', this.onScroll);
      }
      if (newVal) {
        console.log('change, adding new listener', oldVal);
        newVal.addEventListener('scroll', this.onScroll);
        newVal.addEventListener('wheel', this.onScroll);
      }
    },
  },
  computed: {
    height() {
      // needed space / available space
      if (!this.element) {
        return 1;
      }
      return this.element.scrollHeight / this.$refs.track.clientHeight;
    },
    cssHeight() {
      return `${100 / this.height}%`;
    },
    cssOffset() {
      return `${this.scroll * (100 - (100 / this.height))}%`;
    },
  },
  mounted() {
    console.log('element', this.element);
    if (this.element) {
      console.log('mounted listener', this.element);
      this.element.addEventListener('scroll', this.onScroll);
      // this.element.addEventListener('wheel', this.onScroll);
    }
  },
  beforeDestroy() {
    if (this.element) {
      console.log('destroy listener', this.element);
      this.element.removeEventListener('scroll', this.onScroll);
      this.element.removeEventListener('wheel', this.onScroll);
    }
  },
};
</script>

<style scoped>
.track {
  height: 100%;
  width: 20px;
  position: relative;
}
.bar {
  background-color: hotpink;
  width: 100%;
  height: 20px;
  position: absolute;
}
</style>
