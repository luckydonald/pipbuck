<template>
  <div>
    <stats-pony class="img" :mane="front" :body="front" :eyes="front" :bars="front" />
    <div class="player">{{ name }} - Level {{ level }}</div>
  </div>
</template>

<script>
import StatsPony from '../../components/StatsPony.vue';

export default {
  name: 'Status',
  components: { StatsPony },
  data() {
    return {
      level: 1,
      name: 'Littlepip',
    };
  },
  computed: {
    front() {
      return this.$store.state.colorFront;
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
