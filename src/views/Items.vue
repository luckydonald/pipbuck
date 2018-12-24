<template>
  <div>
    <div id="nav">
      <router-link to="/items/weapons" @click.native="playTab">Weapons</router-link>
      <router-link to="/items/apparel" @click.native="playTab">Apparel</router-link>
      <router-link to="/items/aid" @click.native="playTab">Aid</router-link>
      <router-link to="/items/misc" @click.native="playTab">Misc</router-link>
      <router-link to="/items/ammo" @click.native="playTab">Ammo</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ui } from '../sound';

export default {
  name: 'Items',
  methods: {
    playTab(event) {
      this.$emit('pipbuck-play', ui.sounds.nav_tab);
    },
  },
};
</script>

<style scoped>

</style>
