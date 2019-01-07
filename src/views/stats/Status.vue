<template>
  <div class="page">
    <ul>
      <li><router-link to="/stats/status/condition">CND</router-link></li>
      <li><router-link to="/stats/status/radiation">RAD</router-link></li>
      <li><router-link to="/stats/status/effects">EFF</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Status',
};
</script>

<style scoped>
.page {
  height: 100%;
}
.img {
  max-width: 60vw;
  max-height: 70vh;
}
</style>
