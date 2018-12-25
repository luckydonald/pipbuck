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
        <div class="sprite-label">{{ name }}</div>
        <div
          v-for="sound in sounds[name]" :key="sound.id"
          class="progress"
          :style="{ width: (((sound.seek / sound.duration) * 100) || 0) + '%' }"
        >{{ sound }}

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExtraData',
  props: {
    /** @var {PlayingSprite} */
    audio: {
      default() {  // default: ui
        // eslint-disable-next-line global-require
        return require('../../sound').ui;
      },
      type: Object,
    },
  },
  data() {
    return {
      sounds: {},
    };
  },
  methods: {
    play(key) {
      console.log(this);
      // Play the sprite sound and capture the ID.
      /** @var {PlayingSprite} */
      const play = this.audio.play(key);
      play.loop(false);

      if (Object.keys(this.sounds).indexOf(key) < 0) {
        // create list if not there yet.
        // this.sounds[key] = [];
        this.$set(this.sounds, key, []);
      }
      const offset = this.audio.config.sprite[key][0];
      const length = this.audio.config.sprite[key][1];
      const data = {
        play,
        offset,
        length,
        seek: (play.seek() || 0) - (offset / 1000),
      };
      console.info('pre push', this.sounds[key]);
      this.sounds[key].push(data);
      console.info('post push', this.sounds[key]);

      // When this sound is finished, remove the progress element.
      play.once('end', () => {
        console.warn('end of', key);
        console.warn('splice check', key, this.sounds[key].lenght, this.sounds[key]);
        this.sounds[key] = this.sounds[key].filter(s => s.play.id !== play.id);
      });
    },
  },
  update() {
    const keys = Array.keys(this.sounds);
    for (let ki = 0; ki < keys.length; ki++) {
      const key = keys[ki];
      for (let i = 0; i < this.sounds[key].length; i++) {
        const elem = this.sounds[key][i];
        elem.seek = (elem.play.seek() || 0) - (elem.offset / 1000);
      }
    }
    requestAnimationFrame(this.step);
  },
};
</script>

<style scoped>
.progress {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: hotpink;
}
</style>
