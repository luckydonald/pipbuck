<template>
  <div>
    <input type="number" min="0" max="360" v-model.number="hue" /> lol
    <colorized
      :src="require('../../assets/pip.png')"
      alt="best pony" title="pip" class="img"
      :hue="hue"
    />
    {{ name }} - Level {{ level }}
  </div>
</template>

<script>
import Colorized from '../../components/Colorized.vue';

export default {
  name: 'Status',
  components: { Colorized },
  data() {
    return {
      hue: 0.08,
      level: 7,
      name: 'Gunther',
    };
  },
};
</script>

<style scoped>
.img {
  max-width: 20rem;
  max-height: 20rem;
}
</style>
