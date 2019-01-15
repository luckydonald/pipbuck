<template>
  <div class="page" >
    <div class="off" v-if="off">
      <button @click="preparePreparation">Fullscreen</button>
      <button @click="prepareBoot">Turn on</button>
    </div>
    <Menu
      v-show="!off"
      title="Pip-OS(R) v12 build 4458"
      :links="[]"
      :disableStats="true"
    >
      <template slot="statistics">&nbsp;</template>
      <div class="animation" v-if="!off && !loading">
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
      <div class="loader" v-else-if="!off" v-show="loading">
        <div class="loading">
          <stable-colt class="svg" />
          <div>Initiating...</div>
        </div>
      </div>
      <div v-else>&nbsp;</div>
    </Menu>
  </div>
</template>

<script>
import screenfull from 'screenfull';
import Menu from './Menu.vue';
import StableColt from '../components/StableColt.vue';
import TyperCss from '../components/typer/TyperCss.vue';
import { ui } from '../sound';


// https://stackoverflow.com/a/40460122/3423324#showing-loading-spinner-for-async-vue-2-components
export default {
  name: 'boot',
  components: { Menu, StableColt, TyperCss },
  data() {
    return {
      off: true,  // is turned off, waiting for turning on
      loading: false,  // is turned on, and the animation has ended. Now displays 'Initialising...'
      bootTextDuration: 4000, // default: 4s in ms
      screenfull,
    };
  },
  methods: {
    preparePreparation() {
      ui.play(ui.sounds.nav_fullscreen);
      screenfull
        .request()
        .catch(() => { ui.play('ui_karma_down'); });
    },
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
.page, .animation {
  height: 100%;
}
.off {
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: var(--color-front) 0.75vmin solid;
    color: var(--color-front);
    padding: 0.75vmin 1vmin;
    background-color: transparent;
  }
}
.svg {
  max-height: 70vmin;
}
.text {
  padding-left: 10vw;
  padding-top: 10vh;
  text-align: left;
}
.loader {
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 12vmin;
  padding-bottom: 7vmin;
  align-items: center;
  justify-content: center;
}
.loader .loading {
  div {
    animation: loading 1000ms infinite linear;
  }
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
