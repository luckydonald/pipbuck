<template>
  <div>
    <stats-pony
      class="img" :face-name="'auto'"
      :mane="front" :body="front" :eyes="front" :bars="front" :white="front"
      :hp="{ head, body, legFrontLeft, legFrontRight, legHindLeft, legHindRight }"
    />
    <div class="player">{{ name }} - Level {{ level }}</div>
  </div>
</template>

<script>
import { mapGetters } from '../../lib/better-vuex-getter';
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
    ...mapGetters('game/PlayerInfo/health/parts', [
      'head', 'body',
      'legFrontLeft',
      'legFrontRight',
      'legHindLeft',
      'legHindRight',
    ]),
  },
};
</script>

<style scoped>
.img {
  max-width: 60vw;
  max-height: 80vh;
}
</style>
