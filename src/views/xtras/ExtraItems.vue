<template>
  <div>
    <div id="waveform"></div>

    <!-- Sprite Click Areas -->
    <div class="sprites">
      <div
        v-for="(sprite, name) in audio.config.sprite" :key="name"
        class="sprite"
        @click="play(name)"
      >
        <div class="sprite-label">{{ name }} > {{ sprite }}</div>
        <div
          v-for="(sound, id) in sounds[name]" :key="id"
          class="progress"
          :style="{ width: (((sound.seek / sound.duration) * 100) || 0) + '%' }"
        >{{id}}|{{ sound }}</div>
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
          elem.seek = (this.audio.audio.seek(id) || 0) - (elem.offset / 1000);
        }
      }
      requestAnimationFrame(this.updateTick.bind(this));
    },
  },
  mounted() {
    // Begin the progress step tick.
    console.log('Wooooop');
    requestAnimationFrame(this.updateTick.bind(this));
  },
};
</script>

<style scoped>
.sprites {
  position: relative;
}
.progress {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: hotpink;
}
</style>
