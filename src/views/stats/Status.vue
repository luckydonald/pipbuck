<template>
  <div>
    <stats-pony
      class="img" :face-name="'auto'"
      :mane="front" :body="front" :eyes="front" :bars="front" :white="front"
      :hp="{
        head: 0.25 + 0.75 * Math.random(),
        body: 0.25 + 0.75 * Math.random(),
        legFrontLeft: 0.25 + 0.75 * Math.random(),
        legFrontRight: 0.25 + 0.75 * Math.random(),
        legHindLeft: 0.25 + 0.75 * Math.random(),
        legHindRight: 0.25 + 0.75 * Math.random(),
      }"
    />
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
  max-width: 60vw;
  max-height: 80vh;
}
</style>
