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
  name: 'oscilloscope',
  props: {
    color: {
      default: '#dc5990',
    },
    audioElement: {},  // supply a reference to an audio element.

    // canvas settings
    canvasHeight: { default: 200 },  // pixel of the render,
    canvasWidth: { default: 200 },  // pixel of the render.
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
      src: null, // audio element's createMediaElementSource
      context: null, // audio context
      analyser: null, // audio analyser
      audioData: null, // audio data
      // canvas_2d: COMPUTED
      loopRunning: false,  // if the loop function is running. Set false to stop the loop.
      loopRequest: null,  // to be able to cancel the next loop request.
    };
  },
  methods: {
    attachAnalyser(startLoop) {
      console.log('attachAnalyser');
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
      if (this.audioElement === undefined || this.audioElement === null) {
        debugger;
        console.log('audioElement empty. Not loading.');
        return;
      }
      this.analyser = this.context.createAnalyser();
      console.log('HTMLMediaElement', this.audioElement);
      this.src = this.context.createMediaElementSource(this.audioElement);
      this.src.connect(this.analyser);
      this.analyser.fftSize = 32;
      this.analyser.connect(this.context.destination);
      this.audioData = new Uint8Array(this.analyser.frequencyBinCount);
      if (startLoop) {
        this.loopRunning = true;
        this.$nextTick(() => requestAnimationFrame(this.mainLoop));
      }
    },
    mainLoop() {
      const step = (this.canvasWidth / 2.0) / this.audioData.length;

      this.analyser.getByteTimeDomainData(this.audioData);
      this.canvas_2d.lineWidth = this.lineWidth;
      this.canvas_2d.strokeStyle = this.lineColor;
      // ready for next paint.
      this.clearCanvas();
      this.canvas_2d.beginPath();

      // drawing loop (skipping every second record)
      for (let i = 0; i < this.audioData.length; i += 2) {
        const percent = this.audioData[i] / 256;
        const x = (i * step);
        const y = (this.canvasHeight * percent);
        this.canvas_2d.lineTo(x, y);
      }
      this.canvas_2d.stroke();

      if (this.loopRunning) {
        this.loopRequest = requestAnimationFrame(this.mainLoop);
      }
    },
    detachAnalyser() {
      this.loopRunning = false;
      cancelAnimationFrame(this.loopRequest);
      this.loopRequest = null;
      console.log('detachAnalyser');
      if (this.src) {
        if (this.analyser) {
          this.src.disconnect(this.analyser);
        } else {
          console.warn('no analyser to disconnect, disconnecting all');
          this.src.disconnect();
        }

        this.src = null;
      }
      if (this.analyser) {
        if (this.context && this.context.destination) {
          this.analyser.disconnect(this.context.destination);
        } else {
          this.analyser.disconnect();
        }
        this.analyser.close();
        this.analyser = null;
      }
      if (this.context) {
        this.context.disconnect();
        this.context.close();
        this.context = null;
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
        this.canvas_2d.lineTo(x, calculatedY);
        calculatedX += step;
      });
      return calculatedX;
    },
    clearCanvas() {
      const w = this.canvWidth;
      const h = this.canvHeight;
      this.canvas_2d.clearRect(0, 0, w, h);
    },
  },
  computed: {
    ...mapGetters({ isPlaying: 'radio/isPlaying' }),
    canvasElement() {
      return this.$refs.canvas;
    },
    canvas_2d() {
      console.log('canvas access', this.canvasElement);
      return this.canvasElement.getContext('2d');
    },
  },
  watch: {
    audioElement() {
      // if the audio element changed, we need to detach and reattach.
      this.detachAnalyser();
      this.attachAnalyser(true);
    },
  },
  mounted() {
    this.attachAnalyser(true);
  },
  beforeDestroy() {
    this.detachAnalyser();
  },
};
</script>

<style scoped>

</style>
