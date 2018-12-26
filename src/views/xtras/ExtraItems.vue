<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div
      class="waveform"
      :class="orientation"
      :style="{ [styleKeySizing]: `${fullLength * 0.050}px` }"
    >
      <!-- Sprite Click Areas -->
      <div
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
            :style="{ width: ((data.seek * 100000 / data.length) || 0) + '%' }"
          >
            {{name}}
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

    Meh.<br>
    {{ sounds }}
    Mehgh.<br>
  </div>
</template>

<script>
import { ui } from '../../sound';

export default {
  name: 'ExtraData',
  props: {
    /** @var {PlayingSprite} */
    audio: {
      default() {  // default: ui
        // eslint-disable-next-line global-require
        // return require('../../sound').ui;
        return ui;
      },
      type: Object,
    },
  },
  data() {
    return {
      sounds: this.createSoundsArray(),
      plays: [],
      orientation: 'down',  // 'left', 'right', 'down', 'up'
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

      if (Object.keys(this.sounds).indexOf(key) < 0) {
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
      // not yet
      return null;
    },
  },
  mounted() {
    // Begin the progress step tick.
    console.log('Wooooop');
    requestAnimationFrame(this.updateTick.bind(this));
  },
};
</script>

<style scoped lang="scss">
.waveform {
  opacity: 0.5;
  position: relative;
}
.sprite {
  position: absolute;
  overflow: hidden;
  //background-color: deeppink;

  border: var(--color-front) 2px solid;
  background-color: rgba(255,225,255, 0.1);

  .left &,
  .right & {
    height: 100%;
  }
  .up &,
  .down & {
    width: 100%;
  }
}
.label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2px 4px;
  border: var(--color-front) 2px solid;
  background-color: rgba(255,225,255, 0.1);
}

.progress {
  position: absolute;
  background-color: rgba(255,225,255, 0.1);
  // background-color: hotpink;

  .up & {
    bottom: 0;
    height: 100%;
  }
  .left & {
    right: 0;
    width: 100%;
  }
  .left & {
    left: 0;
    width: 100%;
  }
  .down & {
    top: 0;
    height: 100%;
  }
}
</style>
