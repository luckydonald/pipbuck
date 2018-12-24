<template>
  <div class="page">
    <div class="headline">Pip-OS(R) v10. build 4458</div>
    <div class="text">
      Copyright 2075 Robronco(R)<br>
      Loader V2.0<br>
      Exec version 42.19<br>
      64K RAM system<br>
      38911 bytes free<br>
      No holotape found<br>
      Load ROM(1): MaReTrix 505<br>
    </div>
    <div class="loader">
      <stable-colt class="svg" />
      <div>Initiating...</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StableColt from '../components/StableColt.vue';

export default {
  name: 'boot',
  components: { StableColt },
  methods: {
    bootSequence() {
      console.log({ name: 'Status' });
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
