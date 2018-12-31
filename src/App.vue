<template>
  <div
    id="app"
   :style="{ '--color-front': colorFront, '--color-back': colorBack, 'text-shadow': shadow }"
  >
    <favicon><stable-colt :hair="hair" :back="back"/></favicon>
    <keep-alive><audio
      ref="radio"
      :src="currentFile"
      autoplay="autoplay"
      autobuffer playsinline
      loop="loop"
      preload="auto"
      controls="controls"
      crossorigin="anonymous"
    ></audio></keep-alive> <!-- :crossorigin="currentFile.anonymousCrossorigin"
    @timeupdate="this.updated()" -->
    <div class="outer" :style="{ 'flex-direction': wrapperFlex }">
      <div class="wrapper">
        <div class="effect display-animations"></div>
        <div class="crt">
          <router-view @pipbuck-play="pipbuckSound" />
        </div>
        <div
          class="effect display-background"
          v-colorized-bg="{
            src: require('./assets/img/bg.png'), hue: hair.h,
          }"
        ></div>
      </div>
      <hardware-buttons
          v-if="showHardwareButtons"
          class="hardware noscroll"
          :position="hardwareButtonPosition"
          @scroll.prevent @wheel.prevent @touchstart.prevent @touchmove.prevent @drag.prevent
          @pipbuck-play="pipbuckSound"
        />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Shake from 'shake.js';
import { ui } from './sound';
import { HexToHSL, hsl } from './lib/colorspace';
import HardwareButtons from './components/HardwareButtons.vue';
import Favicon from './components/Favicon.vue';
import StableColt from './components/StableColt.vue';
import ColorizedBg from './lib/vue-colorized/directive';

const app = {
  name: 'app',
  components: { HardwareButtons, Favicon, StableColt },
  directives: { ColorizedBg },
  head() {
    return {
      meta: [
        // Theme Color for Chrome, Firefox OS and Opera
        { 'm-key': 'theme-color', name: 'theme-color', content: this.colorFront },
        // Color for windows tiles
        { 'm-key': 'msapplication-TileColor', name: 'msapplication-TileColor', content: this.colorFront },
      ],
    };
  },
  data() {
    return {
      scroll: 0.00,
      scroll_prevent: null,
      hardwareButtonPosition: this.calculateHardwareButtonPosition(),
    };
  },
  computed: {
    ...mapState([
      'colorFront', 'colorBack', 'showHardwareButtons', 'radio',
    ]),
    ...mapGetters({ currentRadio: 'radio/current', currentFile: 'radio/currentFile' }),
    currentRadioAnonymousCrossorigin() {

    },
    hair() {
      return HexToHSL(this.$store.state.colorFront);
    },
    back() {
      return HexToHSL(this.$store.state.colorBack);
    },
    shadow() {
      const color1 = this.hair;
      const color2 = this.hair;
      color1.s /= 2;
      color2.s /= 2;
      return `2px 0 ${hsl(color1)}, -2px 0 ${hsl(color1)};`;
    },
    wrapperFlex() {
      switch (this.hardwareButtonPosition) {
        case 'top':
          return 'column-reverse';
        case 'left':
          return 'row-reverse';
        case 'right':
          return 'row';
        case 'bottom':
        default:
          return 'column';
      }
    },
  },
  watched: {
    colorFront(newColor) {
      console.log('color changed', newColor);
    },
  },
  methods: {
    pipbuckSound(sound) {
      console.log('pipbuckSound', sound);
      ui.audio.play(sound);
    },
    updateHardwareButtonPosition() {
      this.hardwareButtonPosition = this.calculateHardwareButtonPosition();
    },
    calculateHardwareButtonPosition() {
      const orientation = window.screen.msOrientation
        || (window.screen.orientation || window.screen.mozOrientation || {}).type;
      if (orientation !== undefined) {
        switch (orientation) {
          default:
          case 'portrait-primary':
            return 'bottom';
          case 'landscape-primary':
            return 'right';
          case 'landscape-secondary':
            return 'left';
          case 'portrait-secondary':
            return 'top';
        }
      } else {
        switch (window.orientation) {
          default:
          case 0:
            return 'bottom';
          case 90:
            return 'left';
          case -90:
            return 'right';
          case 180:
            return 'top';
        }
      }
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
    /* this.$watch(
      'colorBack',
      // eslint-disable-next-line prefer-arrow-callback
      function watchColorBack(newColor) {
        document.body.style.backgroundColor = newColor;
      },
      { immediate: true },
    ); */
    // event listeners
    this.shake_instance = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000, // optional, determines the frequency of event generation
    });
    this.shake_instance.start();
    window.addEventListener('orientationchange', this.updateHardwareButtonPosition.bind(this));
  },
  beforeDestroy() {
    if (this.scroll_prevent !== null) {
      this.shake_instance.stop();
      this.shake_instance = null;
    }
    window.removeEventListener('orientationchange', this.updateHardwareButtonPosition.bind(this));
  },
};
export default app;
</script>

<style lang="scss">
@font-face {
  font-family: 'Monofonto';
  src: url('/fonts/monofonto.ttf');
}
*, *:after, *:before {  // Minimalist Reset 3
  vertical-align: baseline;
  font-weight: inherit;
  font-family: inherit;
  font-style: inherit;
  font-size: 100%;
  border: 0 none;
  outline: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: black;
  user-select: none;
  font-size: 4.266666667vmin;
  letter-spacing: -0.05em;
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
}
a {
  color: var(--color-front);
  text-decoration: none;

  border: transparent 0.5vmin solid;
  padding: 0.75vmin 1vmin;

  &.active, &.router-link-exact-active {
    border: var(--color-front) 0.75vmin solid;
    background-color: rgba(255,225,255, 0.1);

  }
}
ul li {
  list-style: none;
}
</style>
<style scoped lang="scss">
.outer {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column-reverse;
}
.wrapper {
  //width: 100%;
  //height: 100%;
  height: 100vmin;
  width: 133vmin;
  overflow: hidden;
  position: relative;
}
.crt {
  justify-content: flex-start;
  // overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  //height: 84.77508651vmin;
  //left: 0;
  //top: 0;
  //position: absolute;
}
.hardware {
  // min-width: 15.22491349vw;
  // min-height: 15.22491349vh;
  //width: 100%;
  flex-grow: 1;
};
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
audio {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 30;
  display: none;
}
</style>

<!-- effects -->
<style lang="scss" scoped>

.effect {
  pointer-events:none;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.display-background {
  z-index: -1;

  background-size: 100% 100%;
  background-repeat: no-repeat;

  filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.display-beam {
  background: radial-gradient(
      rgba(0,255,0,.3) 0%,
      rgba(0,255,0,0) 70%);
  border-radius: 50%;
  top: 2.5vh;
  right: -14vw;

  width: 100vw;
  height: 15vh;
  // margin-top: -14px;
  // margin-left: -1100px;
  z-index: 1;
}

.display-animations::before {
  content: " ";
  position: absolute;
  width: 100vw;
  height: 40vh;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(255,255,255,0.2) 0%,
    rgba(255,255,255,0.144) 11%,
    rgba(255,255,255,0.124) 31%,
    rgba(255,255,255,0.102) 35%,
    rgba(255,255,255,0.028) 61%,
    rgba(255,255,255,0.008) 79%,
    rgba(255,255,255,0.000) 100%
  );
  // ~0:06 run time, ~0:02 screen time
  animation: scanline 6300ms infinite linear;
  border-radius: 50% / 5%;
}


@keyframes scanline {
  0% { // 0%
    top: -40%;
    opacity: 0;
  }
  6% { // 20%
    opacity: 0.2;
  }
  15% { // 50%
    opacity: 0.3;
  }
  24% { // 80%
    opacity: 0.2;
  }
  30% { // 100%
      top: 100%;
      opacity: 0;
  }
  100% {
      top: 100%;
      opacity: 0;
  }
}

.wrapper::before {
  // the display lines
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

.crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}


</style>
