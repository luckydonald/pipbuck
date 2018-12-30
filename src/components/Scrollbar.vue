<template>
  <div class="all-the-stuff">
    <div class="bar-and-buttons" :class="scrollbarClass">
      <div class="button up" v-show="needScrollbar"/>
      <div class="button down" v-show="needScrollbar"/>
      <div class="track" ref="track" v-show="needScrollbar">
        <div
          class="bar"
          :style="{
            height: cssHeight,
            top: cssOffset,
          }"
        />
      </div>
    </div>
    <div class="scrollable" ref="element">
      <ul ref="list" class="list" :class="contentClass">
        <li v-for="item in items" :key="item.id">
          <slot v-bind="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scrollbar',
  props: {
    contentClass: {},
    scrollbarClass: {},
    items: {
      type: Array,
    },
  },
  data() {
    return {
      element: null,
      scroll: 0,
      height: 0,
      animationFrameRequest: null,
    };
  },
  computed: {
    needScrollbar() {
      return this.height !== null;
    },
    calculatedHeight() {
      return 100 * this.height;
    },
    calculatedOffset() {
      // this.scroll: 0.0 - 1.0
      // this.height: 0.0 - 1.0
      //
      // Example:
      // height: 0.5
      // scroll: 0.0
      // offset = 0
      // after = 0.5
      // '<<0.125<< [0.25] >>0.125>>' ------ 0.5 ------
      // 0.00 = 0.0 * 0.5
      //
      // Example:
      // height: 0.5
      // scroll: 0.5
      // offset = 0.25
      // after = 0.25
      // --0.25-- '<<0.125<< [0.25] >>0.125>>' --0.25--
      // 0.25 = 0.5 * 0.5
      //
      // Example:
      // height: 0.5
      // scroll: 1.0
      // offset = 0.5
      // after = 0
      // ------ 0.5 ------ '<<0.125<< [0.25] >>0.125>>'
      // 0.50 = 1.0 * 0.5

      return 100 * this.scroll * (1 - this.height);
    },
    cssHeight() {
      // The gradient :before and :after both adds 50% to the bar's length,
      // resulting in something like: '<<0.5<< [1.0] >>0.5>>'
      // therefore if we want to treat everything as 100%,
      // we need to adapt the height: '<<0.25<< [0.5] >>0.25>>'
      return `${this.calculatedHeight * 0.5}%`;
    },
    cssOffset() {
      // The gradient :before and :after both adds 50% to the bar's length,
      // resulting in something like:
      // ------ 0.5 ------ '<<0.5<< [1.0] >>0.5>>'
      // therefore if we want to treat everything as 100%,
      // we need to adapt the height:
      // --------- 0.75 ---'<<0.25<< [0.5] >>0.25>>'

      // Example:
      // height: 0.5
      // scroll: 0.0
      // offset = 0
      // after = 0.5
      // '<<0.125<< [0.25] >>0.125>>' ------ 0.5 ------
      // 0.00 = 0.0 * 0.5
      //
      // Example:
      // height: 0.5
      // scroll: 0.5
      // offset = 0.25
      // realOffs = 0.25+0.125 =
      // after = 0.25
      // --0.25-- '<<0.125<< [0.25] >>0.125>>' --0.25--
      // 0.25 = 0.5 * 0.5
      //
      // Example:
      // height: 0.5
      // scroll: 1.0
      // offset = 0.5
      // after = 0
      // ------ 0.5 ------ '<<0.125<< [0.25] >>0.125>>'
      // 0.50 = 1.0 * 0.5
      return `${this.calculatedOffset + this.calculatedHeight / 4}%`;
    },
  },
  watch: {
    /**
     * If the element gets replaced, unregister, and re-register
     */
    element(newVal, oldVal) {
      console.log('change', newVal, oldVal, '@', this.element);
      if (oldVal) {
        console.log('change, removing old listener', oldVal);
        this.unregisterElement(oldVal);
      }
      if (newVal) {
        console.log('change, adding new listener', oldVal);
        this.registerElement(newVal);
      }
    },
    items() {
      this.$nextTick(() => {
        console.log('items updated');
        this.measureElement();
      });
    },
  },
  methods: {
    /**
     * 'scroll' event handler. Calls onScrollFrame(), debounced.
     */
    onScroll() {
      if (this.animationFrameRequest === null) {
        this.animationFrameRequest = requestAnimationFrame(() => {
          this.onScrollFrame();
          this.animationFrameRequest = null;
        });
      }
    },
    /**
     * Handles debounced 'scroll' events, calculating this.scroll.
     */
    onScrollFrame() {
      console.log('scroll debounced!');
      const scrollableWay = this.element.scrollHeight - this.element.clientHeight;
      this.scroll = this.element.scrollTop / scrollableWay;
    },
    loadElement() {
      console.log('loadElement $refs', this.$refs);
      if (this.$refs.element) {
        this.element = this.$refs.element;
      }
    },
    registerElement(el) {
      const element = el || this.element;
      console.log('registerElement element', element);
      if (element) {
        element.addEventListener('scroll', this.onScroll);
        // this.element.addEventListener('wheel', this.onScroll);
      }
      return element;
    },
    unregisterElement(el) {
      const element = el || this.element;
      if (element) {
        console.log('unregisterElement', element);
        element.removeEventListener('scroll', this.onScroll);
        element.removeEventListener('wheel', this.onScroll);
      }
    },
    measureElement() {
      /**
       * the total length of that list we could go,
       * scrolling up and down if needed
       */
      const needed = this.element.scrollHeight;

      /**
       * the space we allocate to displaying it,
       * cutting away excess height with overflow: scroll.
       */
      const available = this.element.clientHeight;
      console.log(
        'measureElement',
        available, // the part we display
        needed,  // the total length we could go
        this.$refs.track.clientHeight,
      );
      // needed space / available space
      if (!this.element) {
        // no element to measure yet.
        this.height = null;
        return;
      }
      if (available === 0) {
        this.height = null;
        return;
      }
      if (needed === 0) {
        this.height = null;
        return;
      }
      this.height = available / needed;
      // Example:
      // we have a list being 400px long,
      // but can only display 200px of it
      // available / needed
      // 200 / 400 = 0.5 = 50%
    },
  },
  updated() {
    /*
    this.$nextTick(() => {
      console.log('updated');
      this.measureElement();
    });
    */
  },
  mounted() {
    // wait one vue tick to have the slot elements rendered.
    this.$nextTick(() => {
      console.log('mounted');
      this.loadElement();
      this.registerElement();
      this.measureElement();
    });
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    this.unregisterElement();
    this.element = null;
  },
};
</script>

<style scoped lang="scss">
$track-width: 5vmin;
$bar-width: 1vmin;

.all-the-stuff {
  display: flex;
  flex-direction: row;

  .bar-and-buttons {
    order: 0;

    height: 100%;
    width: $track-width;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .scrollable {
    order: 1;

    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
}
.all-the-stuff .bar-and-buttons .button {
  flex-grow: 0;
  flex-shrink: 0;
  align-self: center;

  height: $track-width;
  width: $track-width;
  position: relative;

  &.up {
    order: -1;
    margin-bottom: (-0.25 * $track-width);
  }

  &.down {
    order: 1;
    margin-top: (-0.25 * $track-width);
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
  position: absolute;
  align-self: center;
  background-color: var(--color-front);
  //background-color: hotpink;
  padding: 0;
  margin: 0;
  border: 0;

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 50%;
    left: 0;
    right: 0;
    //background: orange!important;
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
    background-image: -webkit-linear-gradient(to top, transparent, var(--color-front));
    background-image: -moz-linear-gradient(to top, transparent, var(--color-front));
    background-image: -o-linear-gradient(to top, transparent, var(--color-front));
    background-image: linear-gradient(to top, transparent, var(--color-front));
  }
}

</style>
