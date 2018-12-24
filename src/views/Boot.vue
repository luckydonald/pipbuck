<template>
  <div class="page" @click="prepareBoot">
    <div class="off" v-if="off">
      <button>Turn on</button>
    </div>
    <div class="animation" v-show="!off && !loading">
      <div class="headline">Pip-OS(R) v10 build 4458</div>
      <div class="text">
        Copyright 2075 Robronco(R)<br>
        Loader V2.0<br>
        Exec version 42.19<br>
        64K RAM system<br>
        38911 bytes free<br>
        No holotape found<br>
        Load ROM(1): MaReTrix 505<br>
      </div>
    </div>
    <div class="loader" v-if="!off" v-show="loading">
      <stable-colt class="svg" />
      <div>Initiating...</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StableColt from '../components/StableColt.vue';
import { ui } from '../sound';

// https://stackoverflow.com/a/40460122/3423324#showing-loading-spinner-for-async-vue-2-components

export default {
  name: 'boot',
  components: { StableColt },
  data() {
    return {
      off: true,  // is turned off, waiting for turning on
      loading: false,  // is turned on, and the animation has ended. Now displays 'Initialising...'
    };
  },
  methods: {
    prepareBoot() {
      console.log('1 playing boot', ui, ui.play);
      const playPromise = ui.play(ui.sounds.boot);
      console.log('playPromise', playPromise);
      playPromise.catch(console.error);
      const playedPromise = playPromise.then((...args) => {
        console.log('playPromise.then', ...args);
        this.bootSequence();
        return args;
      });
      console.log('playedPromise', playedPromise);
      playedPromise.catch(console.error);
      playedPromise.then(this.doneBooting);
    },
    bootSequence() {
      console.log('2 booting');
      this.off = false;
    },
    doneBooting() {
      console.log('3 done');
      this.loading = true;
      // this.$router.push({ name: 'Status' });
    },
  },
};
</script>

<style scoped lang="scss">
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
