<template>
  <div>
    <div id="nav">
      <router-link to="/stats/local_map">Local Map</router-link>
      <router-link to="/stats/world_map">World Map</router-link>
      <router-link to="/stats/quests">Quests</router-link>
      <router-link to="/stats/notes">Notes</router-link>
      <router-link to="/stats/general">Radio</router-link>
      <router-link to="/settings" v-if="!showHardwareButtons">S</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Data',
  computed: {
    ...mapState([
      'showHardwareButtons',
    ]),
  },
};
</script>

<style scoped>

</style>
