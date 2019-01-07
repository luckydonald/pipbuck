<template>
  <div class="page">
    <stats-pony
      class="img" :face-name="'auto'"
      :mane="front" :body="front" :eyes="front" :bars="front" :white="front"
      :hp="{ head, body, legFrontLeft, legFrontRight, legHindLeft, legHindRight }"
    />
    <div class="player">{{ name }} - Level {{ level }}</div>
  </div>
</template>

<script>
import { betterMapGetters, mapState } from '../../lib/better-vuex-getter';
import StatsPony from '../../components/StatsPony.vue';

export default {
  name: 'Status',
  components: { StatsPony },
  computed: {
    front() {
      return this.$store.state.colorFront;
    },
    ...betterMapGetters('game/PlayerInfo/health/parts', [
      'head', 'body',
      'legFrontLeft',
      'legFrontRight',
      'legHindLeft',
      'legHindRight',
    ]),
    ...mapState('game/PlayerInfo', {
      level: 'XPLevel',
      name: 'PlayerName',
    }),
  },
};
</script>

<style scoped>
.page {
  height: 100%;
}
.img {
  max-width: 60vw;
  max-height: 70vh;
}
</style>
