<template>
  <div>
    <div id="waveform"></div>

    <!-- Sprite Click Areas -->
    <div class="sprites">
      <div
        v-for="(sprite, name) in sprite.config.sprite" :key="name"
        class="sprite"
        @click="play(name)"
      >
        <div class="sprite-label">{{ name }}</div>
        <div
          v-for="sound in sounds[name]" :key="sound.id"
          class="progress"
          :style="{ width: (((sound.seek / sound.duration) * 100) || 0) + '%' }"
        >

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ui } from '../../sound';

export default {
  name: 'ExtraData',
  props: {
    /** @var {PlayingSprite} */
    sprite: {
      default: ui,
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
      // Play the sprite sound and capture the ID.
      /** @var {PlayingSprite} */
      const play = this.sprite.play(key);
      play.loop(false);

      if (!(key in this.sounds)) {
        // create list if not there yet.
        this.sounds[key] = [];
      }
      const offset = ui.config.sprite[key][0];
      const length = ui.config.sprite[key][1];
      const data = {
        play,
        offset,
        length,
        seek: (play.seek() || 0) - (offset / 1000),
      };
      this.sounds[key].push(data);

      // When this sound is finished, remove the progress element.
      this.sprite.once('end', () => {
        for (let i = 0; i < this.sounds[key].lenght; i++) {
          if (this.sounds[key][i].play.id === play.id) {
            this.sounds[key].splice(i, 1);
            break;
          }
        }
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
</style>
