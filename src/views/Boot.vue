<template>
  <div class="page" @click="prepareBoot" @mouseup="screenfull.request()">
    <div class="off" v-if="off">
      <button>Turn on</button>
    </div>
    <div class="animation" v-if="!off && !loading">
      <div class="headline">Pip-OS(R) v10 build 4458</div>
      <typer-css
        :chars="1"
        :duration="3500"
        :running="!off && !loading"
        class="text"
      >
        Copyright 2075 Robronco(R)<br>
        Loader V2.0<br>
        Exec version 42.19<br>
        64K RAM system<br>
        38911 bytes free<br>
        No holotape found<br>
        Load ROM(1): MaReTrix 505<br>
      </typer-css>
    </div>
    <div class="loader" v-if="!off" v-show="loading">
      <stable-colt class="svg" />
      <div>Initiating...</div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull';
import StableColt from '../components/StableColt.vue';
import TyperCss from '../components/typer/TyperCss.vue';
import { ui } from '../sound';

// https://stackoverflow.com/a/40460122/3423324#showing-loading-spinner-for-async-vue-2-components
export default {
  name: 'boot',
  components: { StableColt, TyperCss },
  data() {
    return {
      off: true,  // is turned off, waiting for turning on
      loading: false,  // is turned on, and the animation has ended. Now displays 'Initialising...'
      bootTextDuration: 4000, // default: 4s in ms
      screenfull,
    };
  },
  methods: {
    prepareBoot() {
      /** @var {PlayingSprite} */
      const play = ui.play(ui.sounds.boot);
      this.bootTextDuration = play.duration() * 1000;
      play.once('play', this.bootSequence);
      // play.once('end', this.doneBooting);
      play.once('play', () => {
        setTimeout(this.doneBooting, Math.max(100, play.duration() * 1000 - 200));
      });
    },
    bootSequence() {
      this.off = false;
    },
    doneBooting() {
      this.loading = true;
      setTimeout(this.doneLoading, 500);
    },
    doneLoading() {
      this.$nextTick(this.$router.push({ name: 'Status' }));
    },
  },
};
</script>

<style scoped lang="scss">
.page {
}
.off {
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s;
}
.svg {
  max-height: 200px;
}
.headline {
  margin-top: 10vh;
  position: relative;
  display: inline-block;
  &::before, &::after {
    content: "***************";
    position: absolute;
  }
  &::before {
    right: 110%;
  }
  &::after {
    left: 110%;
  }
}
.text {
  padding-left: 10vw;
  padding-top: 10vh;
  text-align: left;
}
.loader {
  // display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    animation: loading 1000ms infinite linear;
  }
}
.loading .loader {
  // display: block;
}

@keyframes loading {
  0% {
    opacity: 1.0;
  }
  50% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}
</style>
