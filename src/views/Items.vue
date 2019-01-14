<template>
  <Menu
    title="Items" :titleLink="{ path: '/items/extra' }"
    :links="[
      { to: { path: '/items/weapons' }, label: 'Weapons' },
      { to: { path: '/items/apparel' }, label: 'Apparel' },
      { to: { path: '/items/aid' }, label: 'Aid' },
      { to: { path: '/items/misc' }, label: 'Misc' },
      { to: { path: '/items/ammo' }, label: 'Ammo' },
    ]"
  >
    <template slot="statistics">
      <div class="stat">Wg {{ weight }}/{{ maxWeight }}</div>
      <div class="stat">HP {{ healthPoints }}/{{ maxHealthPoints }}</div>
      <div class="stat">DR {{ damageResistance }}</div>
      <div class="stat">Caps {{ bottlecaps }}</div>
    </template>
    <router-view />
  </Menu>
</template>

<script>
import { betterMapState, betterMapGetters } from '../lib/better-vuex-getter';
import Menu from './Menu.vue';

export default {
  name: 'Items',
  components: { Menu },
  computed: {
    ...betterMapState('game/PlayerInfo', {
      healthPoints: ['CurrHP', Math.floor],
      maxHealthPoints: ['MaxHP', Math.floor],
      weight: ['CurrWeight', Math.floor],
      maxWeight: ['MaxWeight', Math.floor],
      bottlecaps: ['Caps', Math.floor],
    }),
    ...betterMapGetters('game/PlayerInfo/health', {
      damageResistance: 'totalDamageResistance',
    }),
  },
};
</script>

<style scoped lang="scss">

</style>
