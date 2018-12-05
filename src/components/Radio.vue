<template>
  <div>
    <!--<av-line v-if="isPlaying" :lineColor="color"
      :ref-element="radioElement"
      :audioClass="audioClass"
      :audioControls="audioControls"
      :audioSrc="audioSrc"
      :canvClass="canvClass"
      :canvFillColor="canvFillColor"
      :canvHeight="canvHeight"
      :canvTop="canvTop"
      :canvWidth="canvWidth"
      :corsAnonym="corsAnonym"
      :fftSize="fftSize"
      :lineWidth="lineWidth"
      :refLink="refLink"
    />-->
    <canvas ref="canvas"></canvas>
    <div v-if="isPlaying">PLAYING!</div>
    <div v-else>PAUSED!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Radio',
  props: {
    color: {
      default: '#dc5990',
    },
    radioElement: {},

    // canvas settings
    canvasHeight: { default: 200 },
  },
  data() {
    return {
      audioClass: null,
      audioControls: true,
      audioSrc: null,
      canvClass: null,
      canvFillColor: null,
      canvHeight: 200,
      canvTop: false,
      canvWidth: 200,
      corsAnonym: false,
      fftSize: 32, // 128
      lineColor: '#9ef8bd',
      lineWidth: 2,
      refLink: 'radio',

      // audio variables
      src: null, // audio file
      context: null, // audio context
      analyser: null, // audio analyser
      // [c] canvas_2d: null, // canvas 2D context // computed
    };
  },
  methods: {
    attachAnalyser() {
      this.context = new (
        window.AudioContext
        || window.webkitAudioContext
        || window.mozAudioContext
      )();
      // suspend
      // See:
      //   https://github.com/dstockwell/blink/commit/
      //   ffbbf51c8b6ec1c85870198b21c3d4320b66e123
      //   #diff-83f4a651d984bdcdc6798d8d49eca894R573
      //
      // AudioContext::suspendContext
      // AudioContext::resumeContex
      this.analyser = this.context.createAnalyser();
      this.src = this.context.createMediaElementSource(this.audio);
      this.src.connect(this.analyser);
      this.analyser.fftSize = 32;
      this.analyser.connect(this.context.destination);
    },
    mainLoop() {
      const frqBits = this.analyser.frequencyBinCount;
      const step = (this.canvWidth / 2.0) / frqBits;
      const data = new Uint8Array(frqBits);
      let x = 0;

      this.analyser.getByteFrequencyData(data);
      this.canvas_2d.lineWidth = this.lineWidth;
      this.canvas_2d.strokeStyle = this.lineColor;
      this.canvas_2d.beginPath();

      data.reverse();
      this.canvas_2d.moveTo(x, this.canvHeight / 2);
      x = this.canvasDrawLine(data, x, step);
      data.reverse();
      x = this.canvasDrawLine(data, x, step);
      this.canvas_2d.lineTo(this.canvWidth, this.canvHeight / 2);
      this.canvas_2d.stroke();

      requestAnimationFrame(this.mainLoop);
    },
    detachAnalyser() {
      if (this.src && this.analyser) {
        this.src.disconnect(this.analyser);
      }
      if (this.analyser) {
        if (this.context && this.context.destination) {
          this.analyser.disconnect(this.context.destination);
        } else {
          this.analyser.disconnect();
        }
        this.analyser.close();
      }
    },
    /**
     * Draw line and return last X
     * @private
     */
    canvasDrawLine(data, x, step) {
      const h = this.canvasHeight;
      let calculatedX = x;
      let calculatedY = 0;
      data.forEach((v, i) => {
        // (h / 2) - v / 255 * (h / 2)
        calculatedY = h * (255 - v) / 510;
        if (i % 2) calculatedY = h - calculatedY;
        this.ctx.lineTo(x, calculatedY);
        calculatedX += step;
      });
      return calculatedX;
    },
  },
  computed: {
    ...mapGetters({ isPlaying: 'radio/isPlaying' }),
    canvasElement() {
      return this.$props.canvas;
    },
    canvas_2d() {
      return this.canvas_2d.this.canvasElement.getContext('2d');
    },
  },
};
</script>

<style scoped>

</style>
