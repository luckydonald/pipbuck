<template>
  <div>
    <div id="nav">
      <router-link to="/stats/status" @click.native="playTab">Status</router-link>
      <router-link to="/stats/special" @click.native="playTab">S.P.E.C.I.A.L.</router-link>
      <router-link to="/stats/skills" @click.native="playTab">Skills</router-link>
      <router-link to="/stats/perks" @click.native="playTab">Perks</router-link>
      <router-link to="/stats/general" @click.native="playTab">General</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ui } from '../sound';

export default {
  name: 'Stats',
  methods: {
    playTab(event) {
      this.$emit('pipbuck-play', ui.sounds.nav_tab);
    },
  },
};
</script>

<style scoped>

</style>
