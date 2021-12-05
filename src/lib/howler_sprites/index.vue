<template>
  <div>
    <div
      ref="waveform"
      class="waveform"
      :class="orientation"
      :style="{
        [styleKeySizing]: `${fullLength * 0.050}px`,
        'background-image': `url(${waveBackground})`,
      }"
    >
      <!-- Sprite Click Areas -->
      <div class="sprite-wrapper"
        v-for="(sprite, name) in audio.config.sprite" :key="name"
      >
        <div
        class="sprite"
        :style="{
          [styleKeyOffset]: `${sprite[0] * 0.050}px`,
          [styleKeySizing]: `${sprite[1] * 0.050}px`,
        }"
        @click="play(name)"
        >
          <div
            v-for="(data, id) in sounds[name]" :key="id"
            class="progress"
            :style="{ [styleKeySizing]: ((data.seek * 100000 / data.length) || 0) + '%' }"
          >
            <div class="time">
              &nbsp;{{data.seek.toFixed(2)}}<br>
              {{(data.seek - (data.length/1000)).toFixed(2)}}<br>
            </div>
          </div>
        </div>
        <div
          class="label"
          :style="{
            [styleKeyOffset]: `${(sprite[0] + (sprite[1] / 2)) * 0.050}px`,
          }"
          @click="play(name)"
        >{{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howler } from 'howler';

export default {
  name: 'HowlerSprites',
  props: {
    audio: {
      default() {
        return {
          config: null, // config: {srcs: [...], sprite: {...}}  // the config you put in Howler.
          audio: null, // audio: Howl(config)
        };
      },
      type: Object,
    },
    color: {
      default: '#46a0ba',
      type: String,
    },
    orientation: {
      default: 'right',  // 'left', 'right', 'down', 'up'
      type: String,
    },
  },
  data() {
    return {
      sounds: this.createSoundsArray(),
      plays: [],
      buffer: null,  // the audio buffer
    };
  },
  methods: {
    createSoundsArray() {
      return Object.keys(this.audio.config.sprite)
        .reduce((prev, curr) => {
          // eslint-disable-next-line no-param-reassign,prefer-destructuring
          prev[curr] = {};
          return prev;
        }, {});
    },
    play(key) {
      console.log(this);
      // Play the sprite sound and capture the ID.
      /** @var {PlayingSprite} */
      const play = this.audio.play(key);
      play.loop(false);

      if (Object.keys(this.sounds)
        .indexOf(key) < 0) {
        // create list if not there yet.
        // this.sounds[key] = {};
        this.$set(this.sounds, key, {});
      }
      const offset = this.audio.config.sprite[key][0];
      const length = this.audio.config.sprite[key][1];
      const data = {
        offset,
        length,
        seek: (play.seek() || 0) - (offset / 1000),
      };
      console.info('pre push', this.sounds[key]);
      this.$set(this.sounds[key], play.id, data);
      console.info('post push', this.sounds[key]);

      // When this sound is finished, remove the progress element.
      play.once('end', () => {
        play.stop();
        console.warn('end of', key);
        console.warn('splice check', key, play.id, this.sounds[key]);
        this.$delete(this.sounds[key], play.id);
      });
    },
    updateTick() {
      const keys = Object.keys(this.sounds);
      for (let ki = 0; ki < keys.length; ki++) {
        const key = keys[ki];
        const ids = Object.keys(this.sounds[key]);
        for (let ii = 0; ii < ids.length; ii++) {
          const id = ids[ii];
          const elem = this.sounds[key][id];
          elem.seek = (this.audio.audio.seek(parseInt(id, 10)) || 0) - (elem.offset / 1000);
        }
      }
      requestAnimationFrame(this.updateTick.bind(this));
    },
    loadWaveform() {
      // https://www.html5rocks.com/en/tutorials/webaudio/intro/#toc-load
      const request = new XMLHttpRequest();
      // eslint-disable-next-line no-underscore-dangle
      request.open('GET', this.audio.audio._src, true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = () => {
        Howler.ctx.decodeAudioData(request.response, (buffer) => {
          this.buffer = buffer;
        }); // }, onError);
      };
      request.send();
    },
  },
  computed: {
    fullLength() {
      return this.audio.audio.duration() * 1000;
    },
    styleKeyOffset() {
      switch (this.orientation) {
        case 'top':
          return 'bottom';
        case 'left':
          return 'right';
        case 'right':
          return 'left';
        default:
        case 'bottom':
          return 'top';
      }
    },
    styleKeySizing() {
      switch (this.orientation) {
        case 'left':
        case 'right':
          return 'width';
        default:
        case 'top':
        case 'bottom':
          return 'height';
      }
    },
    waveBackground() {
      // https://stackoverflow.com/a/41129912/3423324#web-audio-api-create-waveform-of-full-track
      if (!this.buffer) {
        return '';
      }
      const width = this.$refs.waveform.clientWidth;
      const height = this.$refs.waveform.clientHeight;

      let maxAmpl;
      let maxTime;

      switch (this.orientation) {
        case 'up':
        case 'down':
          maxAmpl = width;
          maxTime = height;
          break;
        default:
        case 'left':
        case 'right':
          maxTime = width;
          maxAmpl = height;
          break;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      const drawLines = this.fullLength * 0.050;
      const leftChannel = this.buffer.getChannelData(0); // Float32Array describing left channel
      context.save();
      context.fillStyle = 'transparent';
      context.fillRect(0, 0, width, height);
      context.strokeStyle = this.color;
      context.globalCompositeOperation = 'lighter';

      // we want to split the amplitude side in half, as we want to use the middle.
      switch (this.orientation) {
        case 'up':
        case 'down':
          context.translate(width / 2, 0);
          break;
        default:
        case 'left':
        case 'right':
          context.translate(0, height / 2);
          break;
      }

      // context.globalAlpha = 0.6 ; // lineOpacity ;
      context.lineWidth = 1;
      const totalLength = leftChannel.length;
      const eachBlock = Math.floor(totalLength / drawLines);
      const lineGap = (maxTime / drawLines);

      context.beginPath();
      for (let i = 0; i <= drawLines; i++) {
        const audioBuffKey = Math.floor(eachBlock * i);
        const time = i * lineGap;
        const ampl = (leftChannel[audioBuffKey] * maxAmpl) / 2;
        switch (this.orientation) {
          case 'up':  // invert ?
          case 'down':
            context.moveTo(ampl, time);
            context.lineTo((ampl * -1), time);
            break;
          default:
          case 'left':  // invert ?
          case 'right':
            context.moveTo(time, ampl);
            context.lineTo(time, (ampl * -1));
            break;
        }
      }
      // draw center line
      switch (this.orientation) {
        case 'up':  // invert ?
        case 'down':
          context.moveTo(0, 0);
          context.lineTo(maxTime, 0);
          context.lineTo(maxTime, 1);
          context.lineTo(0, 1);
          break;
        default:
        case 'left':  // invert ?
        case 'right':
          context.moveTo(0, 0);
          context.lineTo(0, maxTime);
          context.lineTo(1, maxTime);
          context.lineTo(1, 0);
          break;
      }
      context.stroke();
      context.restore();
      return canvas.toDataURL('image/png');
    },
  },
  mounted() {
    this.loadWaveform();
    // Begin the progress step tick.
    requestAnimationFrame(this.updateTick.bind(this));
  },
};
</script>

<style scoped lang="scss">
.waveform {
  opacity: 0.5;
  position: relative;
}
.sprite-wrapper {
  position: absolute;
  width: 100%;
}
.sprite {
  position: absolute;
  overflow: hidden;

  border: var(--color-front) 2px solid;
  background-color: rgba(255,225,255, 0.1);

  .left &,
  .right & {
    top: 1px;
    bottom: 1px;
  }
  .up &,
  .down & {
    left: 1px;
    right: 1px;
  }
}
.label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2px 4px;
  border: var(--color-front) 2px solid;
  background-color: var(--color-front);
  color: var(--color-back);
}

.progress {
  position: absolute;
  background-color: rgba(255,225,255, 0.1);

  .up & {
    bottom: 0;
    width: 100%;
    border-top: var(--color-front) 1px solid;
  }
  .left & {
    right: 0;
    height: 100%;
    border-left: var(--color-front) 1px solid;
  }
  .right & {
    left: 0;
    height: 100%;
    border-right: var(--color-front) 1px solid;
  }
  .down & {
    top: 0;
    width: 100%;
    border-bottom: var(--color-front) 1px solid;
  }
}
.time {
  position: absolute;
  display: block;

  .up & {
    top: 0;
  }
  .left & {
    right: 0;
  }
  .left & {
    left: 0;
  }
  .down & {
    bottom: 0;
  }
}
</style>
