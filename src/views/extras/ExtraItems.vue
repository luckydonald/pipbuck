<template>
  <stable-colt :hue="hue"/>
</template>

<script>
import StableColt from '../../components/StableColt.vue';
import { HexToHue } from '../../lib/colorspace';

export default {
  name: 'ExtraData',
  components: { StableColt },
  computed: {
    hue() {
      return HexToHue(this.$store.state.colorFront);
    },
  },
};
</script>

<style scoped>
</style>
