<template>
  <Menu
    title="Data"
    :links="[
      { to: '/data/local_map', label: 'Local Map' },
      { to: '/data/world_map', label: 'World Map' },
      { to: '/data/quests', label: 'Quests' },
      { to: '/data/notes', label: 'Notes' },
      { to: '/data/radio', label: 'Radio' },
    ]"
  >
    <template slot="statistics">
      <div class="stat location">{{ location }}</div>
      <div class="stat">{{ day }}.{{ month }}.{{ year }}, {{ hour }}:{{ minute }}</div>
    </template>
    <router-view />
  </Menu>
</template>

<script>
import { mapState, betterMapGetters } from '../lib/better-vuex-getter';
import Menu from './Menu.vue';

export default {
  name: 'Data',
  components: { Menu },
  computed: {
    ...mapState([
      'showHardwareButtons',
    ]),
    location() {
      return this.$store.state.game.Map.CurrWorldspace;
    },
    ...mapState('game/PlayerInfo', {
      day: 'DateDay',
      month: 'DateMonth',
    }),
    ...betterMapGetters('game/PlayerInfo/time', {
      minute: 'minutes',
      hour: 'hours',
      year: 'halfYear',
    }),
  },
};
</script>

<style scoped>
.stat.location {
  text-align: right;
}
</style>
