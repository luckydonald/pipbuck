<template>
  <stable-colt :hair="hair" :back="back"/>
</template>

<script>
import StableColt from '../../components/StableColt.vue';
import { HexToHSL } from '../../lib/colorspace';

export default {
  name: 'ExtraData',
  components: { StableColt },
  computed: {
    hair() {
      return HexToHSL(this.$store.state.colorFront);
    },
    back() {
      return HexToHSL(this.$store.state.colorBack);
    },
  },
};
</script>

<style scoped>
</style>
