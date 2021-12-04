<template>
  <div class="typer">
    <div class="line"
      v-for="(line, i) in lines" :key="line"
    >
      <div class="scaling-wrapper">
        <div class="banana-for-scale">{{ line }}</div>
        <div
          class="animated"
          :class="{ running: running }"
          :style="{
            'animation-timing-function': `steps(${lengths[i]}, end)`,
            'animation-play-state': paused ? 'paused' : 'running',
            'animation-delay': `${offsetMilliseconds[i].toFixed(0)}ms`,
            'animation-duration': `${durationMilliseconds[i].toFixed(0)}ms`,
          }"
        >{{ line }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChildrenTextContent } from './helper';

export default {
  name: 'typer-css',
  props: {
    /** @var {Number} in ms. */
    chars: {
      type: Number,
      default: 1,
    },
    duration: {
      type: Number,
      default: 4000, // 4s
    },
    running: {
      type: Boolean,
      default: true,
    },
    paused: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * Gets the actual text from the slot
     */
    slotText() {
      // https://stackoverflow.com/a/42956086/3423324#how-to-reference-text-thats-in-slot-in-vue-js
      return getChildrenTextContent(this.$slots.default);
    },
    /**
     * Contains the trimmed lines.
     * @returns {Array<String>} List of trimmed strings.
     */
    lines() {
      return this.slotText.split('\n').map((line) => line.trim());
    },
    /**
     * Contains the length of the lines
     * @returns {Array<Number>} List of lengths.
     */
    lengths() {
      return this.lines.map((line) => line.length);
    },
    /**
     * The full length up until this element.
     * Contains one more element at the end: The full length (including the last element's length).
     * @return {Array<Number>} List of length offsets, i.e. the accumulated length before a line.
     */
    incrLength() {
      return this.lengths.reduce((acc, x) => acc.concat((acc[acc.length - 1] || 0) + x), [0]);
    },
    /**
     * The full length of all the lines combined.
     * @return {Number}  The accumulated length of all the lines.
     */
    fullLength() {
      return this.incrLength[this.incrLength.length - 1];
    },
    /**
     * Percentage of the line in comparison to the full length.
     * Contains one more element at the end: The full length (including the last element's length).
     * @return {Array<Number>} List of decimal length percentages. 0.0 = 0%, 0.5 = 50%, 1.0 = 100%.
     */
    percentages() {
      return this.lengths.map((length) => length / this.fullLength);
    },
    /**
     * How much time a line got to be animated, in milliseconds.
     * @return {Array<Number>} List of animation duration milliseconds.
     */
    durationMilliseconds() {
      return this.lengths.map((length) => this.duration * (length / this.fullLength));
    },
    /**
     * How much time a line got to be animated, in decimal seconds.
     * @return {Array<Number>} List of animation duration seconds.
     */
    durationSeconds() {
      return this.durationMilliseconds.map((ms) => ms / 1000);
    },
    /**
     * How much time a line must wait until all the previous lines are done animating,
     * in milliseconds.
     * @return {Array<Number>} List of animation offset milliseconds.
     */
    offsetMilliseconds() {
      return this.incrLength.map((offset) => this.duration * (offset / this.fullLength));
    },
    /**
     * How much time a line must wait until all the previous lines are done animating,
     * in decimal seconds.
     * @return {Array<Number>} List of animation offset seconds.
     */
    offsetSeconds() {
      return this.offsetMilliseconds.map((ms) => ms / 1000);
    },
  },
  watch: {
    text(newText) {
      if (this.pos >= newText.length) {
        this.pos = newText.length;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.line {
  // margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  display: block;
  // float: left;
}
.line::after{
  content: "";
  clear: both;
}
.scaling-wrapper {
  position: relative;
  display: inline-block;
}
.animated, .banana-for-scale {
  white-space: nowrap; /* Keeps the content on a single line */
  display: inline;
}
.banana-for-scale {
  color: transparent;
}
/* The typing effect */
@keyframes typing {
  0% { width: 0; opacity: 0 }
  0.1% { opacity: 1 }  // opacity hack to not show the first character.
  100% { width: 100% }
}

.animated {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
}
.animated.running {
  animation-name: typing;
  // animation-iteration-count: infinite;
  // animation-direction: alternate;
  animation-fill-mode: both;
  animation-play-state: paused;
  width: 100%;
}
</style>
