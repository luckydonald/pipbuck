<template>
  <div>
    <audio
      ref="radio" :src="track" autoplay="autoplay" controls="controls"
      :line-color="colorFront"></audio>
    <av-line v-if="track != null" ref-link="radio" :lineColor="color"
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
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    file: {},
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
    track() {
      return `radio/${encodeURIComponent(this.file)}`;
    },
  },
};
</script>

<style scoped>

</style>
