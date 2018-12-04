<template>
  <div id="app" :style="{ '--color-front': colorFront, '--color-back': colorBack }">
    <favicon><stable-colt :hair="hair" :back="back"/></favicon>
    <div class="wrapper">
      <hardware-buttons
        class="hardware noscroll" v-if="showHardwareButtons"
        @scroll.prevent @wheel.prevent @touchstart.prevent @touchmove.prevent @drag.prevent
      />
      <div class="crt">
        <div id="nav">
          <a>{{ scroll }}</a>
          <router-link to="/about">Status</router-link>
          <router-link to="/">S.P.E.C.I.A.L.</router-link>
          <router-link to="/skills">Skills</router-link>
          <router-link to="/perks">Perks</router-link>
          <router-link to="/general">General</router-link>
          <router-link to="/settings" v-if="!showHardwareButtons">S</router-link>
          <a>{{ display }}</a>
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
    console.log('ÄPP', appObj);
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
    console.log('äpp', this.app);
    this.start = event.touches[0].pageY;
    this.timeout = null;

    const noscroll = parentWithClass(event.target, 'noscroll');
    if (noscroll) {
      this.app.display += ' S1';
      event.preventDefault();
      return false;
    }
    if (event.touches.length !== 1) {
      // empty/multitouch
      return true;
    }
    if (event.changedTouches.length !== 1) {
      // empty/multitouch
      return true;
    }
    // eslint-disable-next-line no-underscore-dangle
    document.body.addEventListener('touchmove', this._touchmove);
    return false;
  }

  _touchmove(event2) {
    clearTimeout(this.timeout);
    const noscroll2 = parentWithClass(event2.target, 'noscroll');
    if (noscroll2) {
      this.app.display += ' S2';
      event2.preventDefault();
      return false;
    }
    const end = event2.touches[0].pageY;
    const distance = this.start !== null ? this.start - end : 0;
    this.start = end;
    if (distance > 0) {  // empty/multitouch
      // eslint-disable-next-line no-alert
      this.app.display = `up   ${distance}`;
    }
    if (distance < 0) {  // empty/multitouch
      // eslint-disable-next-line no-alert
      this.app.display = `down ${distance}`;
    }
    // eslint-disable-next-line no-unused-vars
    const crt = parentWithClass(event2.target, 'crt');
    if (event2.touches.length !== 1) {
      // empty/multitouch
      this.app.display += ' 3';
      return true;
    }
    if (event2.changedTouches.length !== 1) {
      // empty/multitouch
      this.app.display += ' 4';
      return true;
    }
    if (crt && crt.scrollTop === 0 && distance < 0) {
      // don't pull the page down when already at top.
      this.app.display += ' ⟙'; // ⟘
      event2.preventDefault();
      return false;
    }
    this.app.display += ' X';
    // scroll by half the speed, also don't scroll under 0.
    this.app.scroll = Math.max(this.app.scroll + (distance * 0.6), 0);
    crt.scroll({
      top: this.app.scroll,
      left: 0,
      behavior: 'smooth',
    });
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
      display: 'test',
      scroll: 0.00,
      scroll_prevent: null,
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
    this.scroll_prevent = new ScrollPrevent(this);
    console.log(this.scroll_prevent);
    this.scroll_prevent.install();
  },
  beforeDestroy() {
    if (this.scroll_prevent !== null) {
      this.scroll_prevent.deinstall();
      this.scroll_prevent = null;
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
