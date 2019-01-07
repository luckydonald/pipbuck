<template>
  <Menu
    title="Stats"
    :links="[
      { label: 'Status', to:'/stats/status' },
      { label: 'S.P.E.C.I.A.L.', to:'/stats/special' },
      { label: 'Skills', to:'/stats/skills' },
      { label: 'Perks', to:'/stats/perks' },
      { label: 'General', to:'/stats/general' },
    ]"
  >
    <template slot="statistics">
      <div class="stat">LVL {{ level }}</div>
      <div class="stat">HP {{ healthPoints }}/{{ maxHealthPoints }}</div>
      <div class="stat">AP {{ actionPoints }}/{{ maxActionPoints }}</div>
      <div class="stat">Caps {{ bottlecaps }}</div>
    </template>
    <router-view />
  </Menu>
</template>

<script>
import { betterMapState } from '../lib/better-vuex-getter';
import { ui } from '../sound';
import Menu from './Menu.vue';

export default {
  name: 'Stats',
  components: { Menu },
  methods: {
    playTab(event) {
      this.$emit('pipbuck-play', ui.sounds.nav_tab);
    },
  },
  computed: {
    ...betterMapState('game/PlayerInfo', {
      level: ['XPLevel', Math.floor],
      healthPoints: ['CurrHP', Math.floor],
      maxHealthPoints: ['MaxHP', Math.floor],
      actionPoints: ['CurrAP', Math.floor],
      maxActionPoints: ['MaxAP', Math.floor],
      bottlecaps: ['Caps', Math.floor],
    }),
  },
};
</script>

<style scoped lang="scss">

</style>
