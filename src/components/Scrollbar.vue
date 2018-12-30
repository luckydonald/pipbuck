<template>
  <div class="bar-and-buttons" ref="track">
    <div class="button up" />
    <div class="button down" />
    <div class="track" ref="space">
      <div class="bar" :style="{ height: cssHeight, top: cssOffset }"></div>
    </div>
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

<style scoped lang="scss">
$bar-width: 1vmin;

.bar-and-buttons {
  height: 100%;
  width: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.button {
  flex-grow: 0;
  flex-shrink: 0;
  align-self: center;

  height: 5vmin;
  width: 5vmin;
  position: relative;

  &.up {
    order: -1;
    margin-bottom: -2.5vmin;
  }

  &.down {
    order: 1;
  }

  &.up:after, &.down:after {
    content: '';
    position: absolute;
    display: block;
    //height: 10px; width: 10px;
    height: 50%; width: 50%;
    left: 25%;
    align-self: center;
    border-width: 1vmin 1vmin 0 0;
    border-style: solid;
  }
  &.up:after {
    bottom: 0;
    transform: rotate((0   - 45deg));
  }
  &.down:after {
    top: 0;
    transform: rotate((180 - 45deg));
  }
}

.track {
  order: 0;
  height: 100%;
  position: relative;
  display: flex;
  align-self: center;
  width: $bar-width;
}

.bar {
  flex-grow: 1;
  flex-shrink: 1;

  width: $bar-width;
  height: 1vmin;
  position: absolute;
  align-self: center;
  background-color: var(--color-front);
  padding: 0;
  margin: 0;
  border: 0;

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 5vmin;
    left: 0;
    right: 0;
  }
  &:before {
    bottom: 100%;
    background-image: -webkit-gradient(
        linear, 0 100%, 0 0, from(var(--color-front)), to(transparent)
    );
    background-image: -webkit-linear-gradient(transparent, var(--color-front));
    background-image: -moz-linear-gradient(transparent, var(--color-front));
    background-image: -o-linear-gradient(transparent, var(--color-front));
    background-image: linear-gradient(transparent, var(--color-front));
  }
  &:after {
    top: 100%;
    background-image: -webkit-gradient(
        linear, 100% 0, 0 0, from(var(--color-front)), to(transparent)
    );
    background-image: -webkit-linear-gradient(var(--color-front), transparent);
    background-image: -moz-linear-gradient(var(--color-front), transparent);
    background-image: -o-linear-gradient(var(--color-front), transparent);
    background-image: linear-gradient(var(--color-front), transparent);
  }
}

</style>
