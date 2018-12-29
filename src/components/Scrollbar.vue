<template>
  <div class="track">
    <div class="bar" :style="{ top: `${scroll}%` }"></div>
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
      console.log('scroll!');
      if (this.animationFrameRequest === null) {
        this.animationFrameRequest = requestAnimationFrame(
          this.onScrollFrame.bind(this),
        );
      }
    },
    onScrollFrame() {
      this.scroll = this.element.scrollTop / this.element.scrollHeight;
      this.animationFrameRequest = null;
    },
  },
  watch: {
    element(newVal, oldVal) {
      console.log('change', newVal, oldVal, this.element);
      if (oldVal) {
        oldVal.removeEventListener('scroll', this.onScroll);
        oldVal.removeEventListener('wheel', this.onScroll);
      }
      if (newVal) {
        newVal.addEventListener('scroll', this.onScroll);
        newVal.addEventListener('wheel', this.onScroll);
      }
    },
  },
  mounted() {
    console.log('element', this.element);
    if (this.element) {
      this.element.addEventListener('scroll', this.onScroll);
      // this.element.addEventListener('wheel', this.onScroll);
    }
  },
  beforeDestroy() {
    if (this.element) {
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
