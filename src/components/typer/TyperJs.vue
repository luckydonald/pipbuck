<template>
  <div class="typer">{{ currentText }}</div>
</template>

<script>
import { getChildrenTextContent } from './helper';

export default {
  name: 'typer-js',
  props: {
    /** @var {Number} in ms. */
    interval: {
      type: Number,
      default: 200,
    },
    duration: {
      type: Number,
      default: 4000, // 4s
    },
  },
  data() {
    return {
      pos: 0,
      intervalId: null,
    };
  },
  methods: {
    typeChar() {
      this.pos += this.charsPerIteration;
      if (this.pos >= this.slotTextLength) {
        this.stopTyping();
      }
    },
    startTyping() {
      this.stopTyping();
      this.intervalId = setInterval(this.typeChar, this.interval);
    },
    stopTyping() {
      if (this.intervalId != null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = null;
    },
  },
  computed: {
    slotText() {
      // https://stackoverflow.com/a/42956086/3423324#how-to-reference-text-thats-in-slot-in-vue-js
      return getChildrenTextContent(this.$slots.default);
    },
    slotTextLength() {
      return this.slotText.length;
    },
    charsPerIteration() {
      const iterations = this.duration / this.interval;
      return Math.max(1, this.slotTextLength / iterations);
    },
    currentText() {
      return this.slotText.substr(0, this.pos);
    },
  },
  watch: {
    text(newText) {
      if (this.pos >= newText.length) {
        this.pos = newText.length;
      }
    },
  },
  mounted() {
    this.startTyping();
  },
  beforeDestroy() {
    this.stopTyping();
  },
};
</script>

<style scoped lang="scss">
.typer {
  // Sequences of whitespace will collapse into a single whitespace.
  // Text will wrap when necessary, and on line breaks.
  white-space: pre-line;
}
</style>
