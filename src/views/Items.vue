<template>
  <div>
    <router-view />
    <div id="nav" class="nav">
      <div class="hr" />
      <router-link class="item" to="/items/weapons" @click.native="playTab">Weapons</router-link>
      <div class="hr" />
      <router-link class="item" to="/items/apparel" @click.native="playTab">Apparel</router-link>
      <div class="hr" />
      <router-link class="item" to="/items/aid" @click.native="playTab">Aid</router-link>
      <div class="hr" />
      <router-link class="item" to="/items/misc" @click.native="playTab">Misc</router-link>
      <div class="hr" />
      <router-link class="item" to="/items/ammo" @click.native="playTab">Ammo</router-link>
      <div class="hr" />
    </div>
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

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  background-color: hotpink;
}
.item {
  flex-shrink: 0;
  flex-grow: 0;
}
hr {
  display: inline;
  color: yellow;
  height: 30px;
  flex-shrink: 1;
  flex-grow: 1;
  color: red;
  background-color: orangered;
  height: 1px;
  align-self: center;
}
.hr {
  align-self: center;
  border-bottom: 2px solid; /* whichever color you prefer */
  flex-shrink: 1;
  flex-grow: 1;
}
</style>
