<template>
  <div id="app" :style="{ '--color-front': colorFront, '--color-back': colorBack }">
    <div id="nav">
      <router-link to="/about">Status</router-link>
      <router-link to="/">S.P.E.C.I.A.L.</router-link>
      <router-link to="/skills">Skills</router-link>
      <router-link to="/perks">Perks</router-link>
      <router-link to="/general">General</router-link>
      <router-link to="/settings">S</router-link>
    </div>
    <router-view />
    <hardware-buttons v-if="showHardwareButtons" />
    <audio ref="radio" :src="currentRadio.file" autoplay="autoplay"></audio>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HardwareButtons from './components/HardwareButtons.vue';

export default {
  name: 'app',
  components: { HardwareButtons },
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'colorFront', 'colorBack', 'showHardwareButtons', 'radio'
    ]),
    ...mapGetters({ currentRadio: 'radio/current' }),
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
body {
  margin: 0;
  padding: 0;
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
