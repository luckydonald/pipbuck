<template>
  <div class="page">
    <div class="tabs">
      <router-link to="/stats/status/condition">CND</router-link>
      <router-link to="/stats/status/radiation">RAD</router-link>
      <router-link to="/stats/status/effects">EFF</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Status',
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
}
.tabs {
  position: absolute;
  left: 5vmin;
  top: 0;
  display: flex;
  flex-direction: column;
}
</style>
