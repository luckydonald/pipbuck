<template>
  <div id="app" :style="{ '--color-front': colorFront, '--color-back': colorBack }">
    <favicon><stable-colt :hair="hair" :back="back"/></favicon>
    <div class="wrapper">
      <hardware-buttons
        class="hardware" v-if="showHardwareButtons"
        @scroll.prevent @wheel.prevent @touchstart.prevent @touchmove.prevent @drag.prevent
      />
      <div class="crt">
        <div id="nav">
          <router-link to="/about">Status</router-link>
          <router-link to="/">S.P.E.C.I.A.L.</router-link>
          <router-link to="/skills">Skills</router-link>
          <router-link to="/perks">Perks</router-link>
          <router-link to="/general">General</router-link>
          <router-link to="/settings" v-if="!showHardwareButtons">S</router-link>
        </div>
        <router-view />
      </div>
    </div>
    <keep-alive><audio
      ref="radio"
      :src="currentRadio.file || ''"
      autoplay="autoplay"
      autobuffer playsinline
      loop="loop"
      preload="auto"
      @load="this.play()"
    ></audio></keep-alive>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { HexToHSL } from './lib/colorspace';
import HardwareButtons from './components/HardwareButtons.vue';
import Favicon from './components/Favicon.vue';
import StableColt from './components/StableColt.vue';

export default {
  name: 'app',
  components: { HardwareButtons, Favicon, StableColt },
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'colorFront', 'colorBack', 'showHardwareButtons', 'radio',
    ]),
    ...mapGetters({ currentRadio: 'radio/current' }),
    hair() {
      return HexToHSL(this.$store.state.colorFront);
    },
    back() {
      return HexToHSL(this.$store.state.colorBack);
    },
  },
  watched: {
    colorFront(newColor) {
      console.log('color changed', newColor);
    },
  },
  mounted() {
    // watch colorFront and colorBack to update the <body> element styles.
    this.$watch(
      'colorFront',
      // eslint-disable-next-line prefer-arrow-callback
      function watchColorFront(newColor) {
        document.body.style.color = newColor;
      },
      { immediate: true },
    );
    this.$watch(
      'colorBack',
      // eslint-disable-next-line prefer-arrow-callback
      function watchColorBack(newColor) {
        document.body.style.backgroundColor = newColor;
      },
      { immediate: true },
    );
    // event listeners
    this.$on('showHardwareButtons', function eventShowHardwareButtons(value) {
      this.showHardwareButtons = value;
    });
  },
};

</script>

<style lang="scss">
@font-face {
  font-family: 'Monofonto';
  src: url('/fonts/monofonto.ttf');
}
* {  // Minimalist Reset 3
  vertical-align: baseline;
  font-weight: inherit;
  font-family: inherit;
  font-style: inherit;
  font-size: 100%;
  border: 0 none;
  outline: 0;
  padding: 0;
  margin: 0;
}
body {
  user-select: none;
}
#app {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  font-family: 'Monofonto', 'Droid Sans', 'Arial Rounded', 'Courier New', 'Courier', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-front);

  a {
    color: var(--color-front);
    text-decoration: none;

    border: transparent 2px solid;
    padding: 2px 4px;

    &.active, &.router-link-exact-active {
      border: var(--color-front) 2px solid;
      background-color: rgba(255,225,255, 0.1);

    }
  }

  ul li {
    list-style: none;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
  }
  .crt {
    justify-content: flex-start;
    overflow-y: scroll;
    scroll-behavior: smooth;
    // overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    &::before {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      background: linear-gradient(
          rgba(18, 16, 16, 0) 50%,
          rgba(0, 0, 0, 0.25) 50%
      ), linear-gradient(
          90deg,
          rgba(255, 0, 0, 0.06),
          rgba(0, 255, 0, 0.02),
          rgba(0, 0, 255, 0.06)
      );
      z-index: 2;
      background-size: 100% 2px, 3px 100%;
      pointer-events: none;
    }
  }
  .hardware {
    // flex-flow: row wrap;
    justify-content: flex-end;
    z-index: 20;
    //bottom: 0;
    //left: 0;
    //right: 0;
  }
}
#nav {
  padding: 30px;
  a {
     padding-top: 2px;
     padding-bottom: 2px;
     padding-right: 4px;
     padding-left: 4px;
    font-weight: bold;
    &.router-link-exact-active {

    }
  }
}
</style>
