<template>
  <div class="page">
    <howler-sprites
      class="howler-sprites"
      :audio="ui"
      :color="color"
      :orientation="orientation"
    />
  </div>
</template>

<script>
import { ui } from '../../sound';
import HowlerSprites from '../../lib/howler_sprites/index.vue';

export default {
  name: 'ExtraData',
  components: {
    HowlerSprites,
  },
  data() {
    return {
      ui,
      orientation: 'down', // 'left', 'right', 'down', 'up'
    };
  },
  computed: {
    color() {
      return this.$store.state.colorFront;
    },
  },
};
</script>

<style scoped>
.page {
  overflow: auto;
  height: 100%;
}
/**
 * Styling the label in the howler-sprites.
 * See https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
 */
.howler-sprites >>> .label {
  left: 5px;
  transform: translate(0, -50%);
  position: absolute;
}
</style>
