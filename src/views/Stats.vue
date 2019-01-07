<template>
  <Menu
    title="Stats"
    :links="[
      { to: '/stats/status', label: 'Status' },
      { to: '/stats/special', label: 'S.P.E.C.I.A.L.' },
      { to: '/stats/skills', label: 'Skills' },
      { to: '/stats/perks', label: 'Perks' },
      { to: '/stats/general', label: 'General' },
    ]"
  >
    <template slot="statistics">
      <div class="stat">LVL {{ level }}</div>
      <div class="stat">HP {{ healthPoints }}/{{ maxHealthPoints }}</div>
      <div class="stat">AP {{ actionPoints }}/{{ maxActionPoints }}</div>
      <div class="stat">XP {{ 4966 }}/{{ 5800 }}</div>
    </template>
    <router-view />
  </Menu>
</template>

<script>
import { betterMapState } from '../lib/better-vuex-getter';
import Menu from './Menu.vue';

export default {
  name: 'Stats',
  components: { Menu },
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
