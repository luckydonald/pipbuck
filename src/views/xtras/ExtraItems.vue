<template>
  <howler-sprites
    :audio="ui"
    :color="color"
    :orientation="orientation"
  />
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
      orientation: 'down',  // 'left', 'right', 'down', 'up'
    };
  },
  computed: {
    color() {
      return this.$store.state.colorFront;
    },
  },
};
</script>
