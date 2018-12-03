<template>
  <div>
    <av-line v-if="isPlaying" :lineColor="color"
      :ref-element="this.$root.$children[0].$refs.radio"
      :audioClass="audioClass"
      :audioControls="audioControls"
      :audioSrc="audioSrc"
      :canvClass="canvClass"
      :canvFillColor="canvFillColor"
      :canvHeight="canvHeight"
      :canvTop="canvTop"
      :canvWidth="canvWidth"
      :corsAnonym="corsAnonym"
      :fftSize="fftSize"
      :lineWidth="lineWidth"
      :refLink="refLink"
    />
    <div v-if="isPlaying">PLAYING!</div>
    <div v-else>PAUSED!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Radio',
  props: {
    color: {
      default: '#dc5990',
    },
  },
  data() {
    return {
      audioClass: null,
      audioControls: true,
      audioSrc: null,
      canvClass: null,
      canvFillColor: null,
      canvHeight: 200,
      canvTop: false,
      canvWidth: 200,
      corsAnonym: false,
      fftSize: 32, // 128
      lineColor: '#9ef8bd',
      lineWidth: 2,
      refLink: 'radio',
    };
  },
  computed: {
    ...mapGetters({ isPlaying: 'radio/isPlaying' }),
  },
};
</script>

<style scoped>

</style>
