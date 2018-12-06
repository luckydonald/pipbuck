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
      @load="this.play()"
    ></audio></keep-alive> <!-- :crossorigin="currentFile.anonymousCrossorigin" -->
    <div class="wrapper">
      <hardware-buttons
        class="hardware noscroll" v-if="showHardwareButtons"
        @scroll.prevent @wheel.prevent @touchstart.prevent @touchmove.prevent @drag.prevent
      />
      <div class="crt">
        <div class="error-effect"></div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Shake from 'shake.js';

import { mapState, mapGetters } from 'vuex';
import { HexToHSL, hsl } from './lib/colorspace';
import HardwareButtons from './components/HardwareButtons.vue';
import Favicon from './components/Favicon.vue';
import StableColt from './components/StableColt.vue';


function parentWithClass(el, clazz) {
  if (!!el && el !== document) {
    if (el.classList.contains(clazz)) {
      return el;
    }
  } else {
    return null;
  }
  return parentWithClass(el.parentNode, clazz);
}

class ScrollPrevent {
  constructor(appObj) {
    this.app = appObj;
    this.start = null;
    this.timeout = null;
    // eslint-disable-next-line no-underscore-dangle
    this._touchstart = this._touchstart.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._touchmove = this._touchmove.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._touchend = this._touchend.bind(this);
  }

  _touchstart(event) {
    this.start = event.touches[0].pageY;
    this.timeout = null;

    const noscroll = parentWithClass(event.target, 'noscroll');
    if (noscroll) {
      event.preventDefault();
      return false;
    }
    if (event.touches.length !== 1) {
      event.preventDefault();
    }
    if (event.changedTouches.length !== 1) {
      // empty/multitouch
      event.preventDefault();
    }
    // eslint-disable-next-line no-underscore-dangle
    document.body.addEventListener('touchmove', this._touchmove);
    return false;
  }

  _touchmove(event2) {
    clearTimeout(this.timeout);
    const noscroll2 = parentWithClass(event2.target, 'noscroll');
    if (noscroll2) {
      event2.preventDefault();
      return false;
    }
    const end = event2.touches[0].pageY;
    const distance = this.start !== null ? this.start - end : 0;
    this.start = end;
    const crt = parentWithClass(event2.target, 'crt');
    if (!crt) {
      // scrolled something else
      event2.preventDefault();
      return false;
    }
    if (event2.touches.length !== 1) {
      // empty/multitouch
      event2.preventDefault();
      return false;
    }
    if (event2.changedTouches.length !== 1) {
      // empty/multitouch
      event2.preventDefault();
      return false;
    }
    if (crt && crt.scrollTop === 0 && distance < 0) {
      // don't pull the page down when already at top.
      event2.preventDefault();
      return false;
    }
    // scroll by half the speed, also don't scroll under 0.
    this.app.scroll = Math.max(this.app.scroll + (distance * 0.6), 0);
    if (crt.scroll !== undefined) {
      crt.scroll({
        top: this.app.scroll,
        left: 0,
        behavior: 'smooth',
      });
    } else if (crt.scrollTo !== undefined) {
      crt.scrollTo({
        top: this.app.scroll,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      crt.scrollLeft = 0;
      crt.scrollTop = this.app.scroll;
    }
    event2.preventDefault();
    return false;
  }

  _touchend() {
    this.start = null;
    // eslint-disable-next-line no-underscore-dangle
    document.body.removeEventListener('touchmove', this._touchmove);
    // eslint-disable-next-line no-underscore-dangle
    document.body.removeEventListener('touchend', this._touchend);
  }

  install() {
    console.log('INSTALL');
    // eslint-disable-next-line no-underscore-dangle
    document.body.addEventListener('touchstart', this._touchstart);
    return this; // chain me
  }

  deinstall() {
    console.log('DEINSTALL');
    // eslint-disable-next-line no-underscore-dangle
    document.body.removeEventListener('touchstart', this._touchstart);
    // eslint-disable-next-line no-underscore-dangle
    this._touchend();
    return this; // chain me
  }
}


const app = {
  name: 'app',
  components: { HardwareButtons, Favicon, StableColt },
  data() {
    return {
      scroll: 0.00,
      scroll_prevent: null,
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
    this.scroll_prevent = new ScrollPrevent(this);
    this.shake_instance = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000, // optional, determines the frequency of event generation
    });
    this.scroll_prevent.install();
    this.shake_instance.start();
  },
  beforeDestroy() {
    if (this.scroll_prevent !== null) {
      this.scroll_prevent.deinstall();
      this.scroll_prevent = null;
      this.shake_instance.stop();
      this.shake_instance = null;
    }
  },
};
export default app;
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
    overflow-x: hidden;
    scroll-behavior: smooth;
    // overflow-scrolling: touch;
    width: 100%;
    height: 100%;
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
audio {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 30;
  display: none;
}
</style>

<style lang="scss">
.error-effect {
  pointer-events:none;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // border-radius: 50% / 5%;
  // background: #111;
  // background-size: 80%;
  // -moz-animation: noise 200ms infinite linear;
  // -o-animation: noise 200ms infinite linear;
  // -webkit-animation: noise 200ms infinite linear;
  // animation: noise 200ms infinite linear;
}


.error-effect::before {
  content: " ";
  position: absolute;
  width: 100%;
  height: 40%;
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

.crt::before {
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
