<template>
  <stable-colt :hue="hue"/>
</template>

<script>
import StableColt from '../../components/StableColt.vue';
import { HexToRGB, RGBtoHSV } from '../../lib/colorspace';

export default {
  name: 'ExtraData',
  components: { StableColt },
  computed: {
    hue() {
      return RGBtoHSV(HexToRGB(this.$store.state.colorFront)).h;
    },
  },
};
</script>

<style scoped>
</style>
