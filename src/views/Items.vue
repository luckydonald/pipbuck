<template>
  <div class="page-wrapper">
    <div class="current">ITEMS</div>
    <div id="nav" class="nav">
      <div class="edge left" />
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
      <div class="edge right" />
    </div>
    <div class="page-content">
      <router-view />
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

.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.current {
  flex-shrink: 0;
  order: -1;
}
.page-content {
  height: 80%;  // why the fuck not 100% ?
  flex-shrink: 1;
  flex-grow: 1;
  order: 1;
  position: relative;
  box-sizing: padding-box;
}
.nav {
  flex-shrink: 0;
  order: 2;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-left: 2vmin;
  padding-right: 2vmin;
  margin-top: -2vmin;
}
.item {
  flex-shrink: 0;
  flex-grow: 0;
  &.router-link-active {
    background-color: black;
  }
}
.hr {
  align-self: center;
  border-bottom: .75vmin solid; /* whichever color you prefer */
  flex-shrink: 1;
  flex-grow: 1;
}
.edge {
  //align-self: flex-start;

   -webkit-border-image: -webkit-gradient(
      linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0)), to(var(--color-front))
  ) 1 100%;
  border-image: linear-gradient(
      to bottom, rgba(0, 0, 0, 0), var(--color-front)
  ) 1 100%;

  // prepare for creating a top border per :after
  position: relative;
  &.right {
    transform: translateY(-50%) translateX(-.5vmin);
    border-right-width: 0.75vmin;
    border-right-style: solid;
    border-right-color: transparent;
  }
  &.left {
    transform: translateY(-50%) translateX(.5vmin);
    border-left-width: 0.75vmin;
    border-left-style: solid;
    border-left-color: transparent;
  }
}
</style>
