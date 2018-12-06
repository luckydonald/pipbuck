<template>
  <div>
    <div id="nav">
      <router-link to="/stats/status">Status</router-link>
      <router-link to="/stats/special">S.P.E.C.I.A.L.</router-link>
      <router-link to="/stats/skills">Skills</router-link>
      <router-link to="/stats/perks">Perks</router-link>
      <router-link to="/stats/general">General</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Stats',
};
</script>

<style scoped>

</style>
