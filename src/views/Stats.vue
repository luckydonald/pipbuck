<template>
  <Menu
    title="Stats" :titleLink="{ path: '/stats/extra' }"
    :links="[
      { to: { path: '/stats/status' }, label: 'Status' },
      { to: { path: '/stats/special' }, label: 'S.P.E.C.I.A.L.' },
      { to: { path: '/stats/skills' }, label: 'Skills' },
      { to: { path: '/stats/perks' }, label: 'Perks' },
      { to: { path: '/stats/general' }, label: 'General' },
    ]"
  >
    <template slot="statistics">
      <div class="stat">LVL {{ level }}</div>
      <div class="stat">HP {{ healthPoints }}/{{ maxHealthPoints }}</div>
      <div class="stat">AP {{ actionPoints }}/{{ maxActionPoints }}</div>
      <div class="stat">XP {{ experiencePoints }}/{{ nextLevelXP }}</div>
    </template>
    <router-view />
  </Menu>
</template>

<script>
import { betterMapState, betterMapGetters } from '../lib/better-vuex-getter';
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
    ...betterMapGetters('game/PlayerInfo/levelHP', {
      experiencePoints: 'current',
      nextLevelXP: 'next',
    }),
  },
};
</script>

<style scoped lang="scss">

</style>
