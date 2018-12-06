<template>
  <div>
    <div id="nav">
      <router-link to="/items/weapons">Weapons</router-link>
      <router-link to="/items/apparel">Apparel</router-link>
      <router-link to="/items/aid">Aid</router-link>
      <router-link to="/items/misc">Misc</router-link>
      <router-link to="/items/ammo">Ammo</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Items',
};
</script>

<style scoped>

</style>
