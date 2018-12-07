<template>
  <div>
    <colorized
      :src="require('../../assets/pip.png')"
      alt="<best pony>" title="that's a pony" class="img"
      :hue="hue"
    />
    <div class="player">{{ name }} - Level {{ level }}</div>
  </div>
</template>

<script>
import Colorized from '../../components/Colorized.vue';
import { HexToHSL } from '../../lib/colorspace';

export default {
  name: 'Status',
  components: { Colorized },
  data() {
    return {
      level: 7,
      name: 'Gunther',
    };
  },
  computed: {
    hue() {
      return HexToHSL(this.$store.state.colorFront).h;
    },
  },
};
</script>

<style scoped>
.img {
  max-width: 10rem;
  max-height: 10rem;
}
</style>
