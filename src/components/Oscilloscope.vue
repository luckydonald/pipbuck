<template>
  <div>
    <canvas
      ref="canvas"
      :style="{ borderBottom: canvasBorderStyle, 'border-right': canvasBorderStyle }"
    ></canvas>
    <div v-if="isPlaying">PLAYING!</div>
    <div v-else>PAUSED!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// calculate the median, https://stackoverflow.com/a/39639518/3423324
function median(arr) {
  const arr2 = arr.sort((a, b) => a - b);
  const i = arr2.length / 2;
  return i % 1 === 0 ? (arr2[i - 1] + arr2[i]) / 2 : arr2[Math.floor(i)];
}

export default {
  name: 'oscilloscope',
  props: {
    // needed settings
    audioElement: {},  // supply a reference to an audio element.

    // display settings
    rounded: { default: true },
    squared: { default: false },
    zigzagg: { default: false },
    // styling
    color: { default: '#dc5990' },
    lineWidth: { default: 2 },


    // canvas settings
    canvasHeight: { default: 200 },  // Pixel of the render.
    canvasWidth: { default: 400 },   // Pixel of the render.
    fftSize: { default: 32 }, // Increases Audio resolution. Must be power of 2, range [32, 32768].
    fftEach: { default: 1 },  // Decreases Audio resolution. Use only every x data point.
    size: { default: 12 },  // how many values should be plotted
  },
  data() {
    return {
      audioClass: null,
      audioControls: true,
      audioSrc: null,
      canvClass: null,
      canvTop: false,
      corsAnonym: false,
      refLink: 'radio',

      // audio variables
      src: null, // audio element's createMediaElementSource
      context: null, // audio context
      analyser: null, // audio analyser
      audioData: [], // summarized audio data
      rawAudioData: null, // current audio data
      // canvas_2d: COMPUTED
      loopRunning: false,  // if the loop function is running. Set false to stop the loop.
      loopRequest: null,  // to be able to cancel the next loop request.

      // styling
      // color: PROPERTY
      // lineWidth: PROPERTY
    };
  },
  methods: {
    attachAnalyser(startLoop) {
      console.log('attachAnalyser()');
      console.log('BaseAudioContext: create');
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
        console.log('audioElement empty. Not loading.');
        return;
      }
      console.log('AnalyserNode: create');
      this.analyser = this.context.createAnalyser();
      console.log('HTMLMediaElement', this.audioElement);
      console.log('MediaElementAudioSourceNode: create');
      this.src = this.context.createMediaElementSource(this.audioElement);
      console.log('MediaElementAudioSourceNode: connect');
      this.src.connect(this.analyser);
      this.analyser.fftSize = this.fftSize;
      console.log('AnalyserNode: connect');
      this.analyser.connect(this.context.destination);
      this.rawAudioData = new Uint8Array(this.analyser.frequencyBinCount);
      this.adaptAudioDataLenght(this.size);
      if (startLoop) {
        this.loopRunning = true;
        this.$nextTick(() => requestAnimationFrame(this.mainLoop));
      }
    },
    detachAnalyser() {
      this.loopRunning = false;
      cancelAnimationFrame(this.loopRequest);
      this.loopRequest = null;
      console.log('detachAnalyser');
      if (this.src) {
        if (this.analyser) {
          console.log('MediaElementAudioSourceNode: disconnect (anal)');
          this.src.disconnect(this.analyser);
        } else {
          console.log('no analyser to disconnect MediaElementAudioSourceNode from.');
        }
        console.log('MediaElementAudioSourceNode: disconnect (glob)');
        this.src.disconnect();

        console.log('MediaElementAudioSourceNode: deleted');
        this.src = null;
      }
      if (this.analyser) {
        if (this.context && this.context.destination) {
          console.log('AnalyserNode: disconnect (dest)');
          this.analyser.disconnect(this.context.destination);
        } else {
          console.log('no destination to disconnect AnalyserNode from.');
        }
        console.log('AnalyserNode: disconnect (glob)');
        this.analyser.disconnect();
        if (this.analyser.close !== undefined) {
          console.log('AnalyserNode: close');
          this.analyser.close();
        }
        this.analyser = null;
      }
      if (this.context) {
        if (this.context.disconnect !== undefined) {
          this.context.disconnect();
        }
        this.context.close();
        this.context = null;
      }
    },
    mainLoop() {
      this.analyser.getByteTimeDomainData(this.rawAudioData);
      const audioValue = median(this.rawAudioData);
      // const audioValue = this.rawAudioData.reduce((a, b) => a + b) / this.rawAudioData.length;
      this.audioData.shift();
      this.audioData.push(audioValue);

      this.clearCanvas();
      this.drawCanvas();

      if (this.loopRunning) {
        this.loopRequest = requestAnimationFrame(this.mainLoop);
      }
    },
    drawCanvas() {
      const w = this.getWidth();
      const h = this.getHeight();

      const stepSize = w / this.audioData.length;
      let percentOld = this.audioData[0] / 256;
      let heightOld = Math.round(h * percentOld);
      let stepOld = 0;
      // ready for next paint.
      this.canvas_2d.moveTo(stepOld, heightOld);
      this.canvas_2d.beginPath();
      this.canvas_2d.moveTo(stepOld, heightOld);
      this.canvas_2d.lineJoin = 'round';
      this.canvas_2d.lineWidth = this.lineWidth;
      this.canvas_2d.strokeStyle = this.color;
      // this.canvas_2d.strokeStyle = hsl(Math.floor(Math.random() * 360), 100, 50);
      // drawing loop (skipping every second record)

      const max = this.audioData.length - 1;
      let i = Math.min(this.iterationStep, max);
      while (i <= max) {
        // calculates new coordinates
        const stepNew = Math.round(i * stepSize);
        const stepMid = Math.round((stepOld + stepNew) / 2);
        const percentNew = this.audioData[i] / 256;
        const heightNew = Math.round(h * percentNew);

        // Great explanation of Bezier curves: http://en.wikipedia.org/wiki/Bezier_curve#Quadratic_curves
        //
        // Assuming A was the last point in the line plotted and B is the new point,
        // we draw a curve with control points P and Q as below.
        //
        // A---P
        //     |
        //     |
        //     |
        //     Q---B
        //
        //
        // A_  P
        //    \
        //     |
        //      \
        //     Q '-B
        //
        // Point: (X, Y)
        // A: (stepOld, heightOld)
        // P: (stepMid, heightOld)
        // Q: (stepMid, heightNew)
        // B: (stepNew, heightNew)
        //
        // Importantly, A and P are at the same y coordinate, as are B and Q. This is
        // so adjacent curves appear to flow as one.
        //
        // Thanks to the folks at
        // smoothie.js
        // who worked that out!
        //
        // https://github.com/joewalnes/smoothie/blob/02b90c411658cb37fd2a76cef56d54fa78833956/smoothie.js#L935
        //
        if (this.rounded) {
          this.canvas_2d.bezierCurveTo( // startPoint (A) is implicit from last iteration of loop
            stepMid, heightOld, // controlPoint1 (P)
            stepMid, heightNew, // controlPoint2 (Q)
            stepNew, heightNew, // endPoint (B)
          );
        }
        if (this.squared && this.rounded) {
          this.canvas_2d.moveTo(stepOld, heightOld); // startPoint (A)
        }
        if (this.squared) {
          this.canvas_2d.lineTo(stepMid, heightOld); // controlPoint1 (P)
          this.canvas_2d.lineTo(stepMid, heightNew); // controlPoint2 (Q)
          this.canvas_2d.lineTo(stepNew, heightNew); // endPoint (B)
        }
        if ((this.squared || this.rounded) && this.zigzagg) {
          this.canvas_2d.moveTo(stepOld, heightOld); // startPoint (A)
        }
        if (this.zigzagg) {
          this.canvas_2d.lineTo(stepNew, heightNew);
        }

        stepOld = stepNew;
        heightOld = heightNew;
        percentOld = percentNew;

        // if we just hit max on this iteration, we're done.
        if (i === max) {
          break;
        }
        // increment as usual
        i += this.iterationStep;
        if (i >= max) {
          // we would skip the last element, forcefully include that.
          i = max;
        }
      }
      // flush it
      this.canvas_2d.stroke();
    },
    getWidth() {
      return this.canvasWidth || this.canvasElement.clientWidth;
    },
    getHeight() {
      return this.canvasHeight || this.canvasElement.clientHeight;
    },
    clearCanvas() {
      const w = this.getWidth();
      const h = this.getHeight();
      this.canvas_2d.clearRect(0, 0, w, h);
      // this.canvas_2d.rect(0, 0, dimensions.width, dimensions.height);
      // this.canvas_2d.clip();
    },
    nearestPowerOfTwo(n) {
      // https://stackoverflow.com/a/45859570/3423324
      let v = n;

      v -= 1;
      // eslint-disable-next-line no-bitwise
      v |= v >> 1;
      // eslint-disable-next-line no-bitwise
      v |= v >> 2;
      // eslint-disable-next-line no-bitwise
      v |= v >> 4;
      // eslint-disable-next-line no-bitwise
      v |= v >> 8;
      // eslint-disable-next-line no-bitwise
      v |= v >> 16;
      v += 1; // next power of 2

      // eslint-disable-next-line no-bitwise
      const x = v >> 1; // previous power of 2

      return (v - n) > (n - x) ? x : v;
    },
    adaptAudioDataLenght(newSize) {
      while (newSize > this.audioData.length) {
        // fill with missing values at beginning (oldest)
        // [1, 2, 3, 4, 5]  =>  [0, 0, 0, 1, 2, 3, 4, 5]
        console.log('size fill', JSON.stringify(this.audioData));
        this.audioData.unshift(0);
      }
      while (this.audioData.length > newSize) {
        // cut data at beginning (oldest)
        // [1, 2, 3, 4, 5]  =>  [3, 4, 5]
        console.log('size cut', JSON.stringify(this.audioData));
        this.audioData = this.audioData.shift();
      }
      console.log('size done', JSON.stringify(this.audioData));
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
    canvasBorderStyle() {
      return `1px solid ${this.color}`;
    },
    iterationStep() {
      return Math.max(this.fftEach, 1);
    },
    correctedFftSize() {
      return Math.min(Math.max(32, this.nearestPowerOfTwo(this.fftSize)), 32768);
    },
  },
  watch: {
    audioElement() {
      // if the audio element changed, we need to detach and reattach.
      this.detachAnalyser();
      this.attachAnalyser(true);
    },
    color() {
      this.drawCanvas();
    },
    correctedFftSize(newSize) {
      this.analyser.fftSize = newSize;
      this.rawAudioData = new Uint8Array(this.analyser.frequencyBinCount);
    },
    canvasWidth(newVal) {
      console.log('new size:', newVal, this.canvasElement.clientWidth);
    },
    canvasHeight(newVal) {
      console.log('new size:', newVal, this.canvasElement.clientHeight);
    },
    size(newSize) {
      this.adaptAudioDataLenght(newSize);
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
