<template>
  <div class="page-wrapper">
    <div class="stats">
      <div class="edge left down" />
      <div class="hr" />
      <a class="title">items</a>
      <div class="hr" />
      <div class="stat">Wg 118/230</div>
      <div class="hr" />
      <div class="stat">HP 290/290</div>
      <div class="hr" />
      <div class="stat">DR 24</div>
      <div class="hr" />
      <div class="stat">Caps 654</div>
      <div class="hr" />
      <div class="edge right down" />
    </div>
    <div id="nav" class="nav">
      <div class="edge left up" />
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
      <div class="edge right up" />
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
  padding-right: 2vmin;

}
.nav, .stats {
  flex-shrink: 0;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-left: 2vmin;
  padding-right: 2vmin;
}
.stats {
  order: 0;
  margin-bottom: 1vmin;
}
.nav {
  order: 2;
  margin-top: 1vmin;
}
.item, .title, .stat {
  flex-shrink: 0;
  flex-grow: 0;
  border: transparent 0.75vmin solid;

  &.router-link-active, .active {
    border-color: var(--color-front);
  }
  padding: 0.75vmin 1vmin;
}
.title {
  text-transform: uppercase;
}
.hr {
  align-self: center;
  border-bottom: .75vmin solid; /* whichever color you prefer */
  flex-shrink: 1;
  flex-grow: 1;
}
.edge {
  //align-self: flex-start;

  &.up {
    -webkit-border-image: -webkit-gradient(
        linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0)), to(var(--color-front))
    ) 1 100%;
    border-image: linear-gradient(
        to bottom, rgba(0, 0, 0, 0), var(--color-front)
    ) 1 100%;
  }
  &.down {
    -webkit-border-image: -webkit-gradient(
        linear, 0 100%, 0 0, from(rgba(0, 0, 0, 0)), to(var(--color-front))
    ) 1 100%;
    border-image: linear-gradient(
        to top, rgba(0, 0, 0, 0), var(--color-front)
    ) 1 100%;
  }

  // prepare for creating a top border per :after
  position: relative;
  &.right {
    border-right-width: 0.75vmin;
    border-right-style: solid;
    border-right-color: transparent;
    &.up {
      transform: translateY(-50%) translateX(-.5vmin);
    }
    &.down {
      transform: translateY(+50%) translateX(-.5vmin);
    }
  }
  &.left {
    border-left-width: 0.75vmin;
    border-left-style: solid;
    border-left-color: transparent;
    &.up {
      transform: translateY(-50%) translateX(.5vmin);
    }
    &.down {
      transform: translateY(+50%) translateX(.5vmin);
    }
  }
}
</style>
