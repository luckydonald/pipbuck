<template>
  <div>
    <div id="nav">
      <router-link to="/data/local_map" @click.native="playTab">Local Map</router-link>
      <router-link to="/data/world_map" @click.native="playTab">World Map</router-link>
      <router-link to="/data/quests" @click.native="playTab">Quests</router-link>
      <router-link to="/data/notes" @click.native="playTab">Notes</router-link>
      <router-link to="/data/radio" @click.native="playTab">Radio</router-link>
      <router-link to="/settings" v-if="!showHardwareButtons">S</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ui } from '../sound';

export default {
  name: 'Data',
  computed: {
    ...mapState([
      'showHardwareButtons',
    ]),
  },
  methods: {
    playTab(event) {
      this.$emit('pipbuck-play', ui.sounds.nav_tab);
    },
  },
};
</script>

<style scoped>

</style>
