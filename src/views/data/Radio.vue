<template>
  <div class="columns">
    <ul class="left-list">
      <li
        v-for="(track, name) in radio.tracks" :key="track.file"
        class="track" :class="{ disabled: track.disabled }"
        v-if="!track.disabled"
      >
        <a
          :class="{ active: current.file === track.file }"
          @click="playTrack(name)"
        >{{ name }}</a>
      </li>
    </ul>
    <div class="right-content">
      <oscilloscope
        class="oscilloscope"
        :color="colorFront"
        :fftSize="fftSize"
        :fftEach="fftEach"
        :rounded="rounded"
        :squared="squared"
        :zigzagg="zigzagg"
        :canvasHeight="128"
        :canvasWidth="128"
        :audio-element="audioElement"
      />
      <!--<div>Playing: <a :href="currentFile">{{ currentFile }}</a></div>-->
    </div>
  </div>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import Oscilloscope from '../../components/Oscilloscope.vue';

const radioNamespace = createNamespacedHelpers('radio');

export default {
  name: 'radio',
  components: { Oscilloscope },
  data() {
    return {
      rounded: true,
      squared: false,
      zigzagg: false,
      fftSize: 32,
      fftEach: 3,
    };
  },
  computed: {
    ...mapState([
      'colorFront', 'radio',
    ]),
    ...radioNamespace.mapState(['selected']),
    ...radioNamespace.mapGetters(['current', 'currentFile']),
    audioElement() {
      return this.$parent.$parent.$parent.$refs.radio;
    },
  },
  methods: {
    playTrack(name) {
      console.log('<radio-element>', this.audioElement);
      console.log('file', this.selected, name);
      if (this.selected !== null && this.selected !== name) {
        // is already playing something else.
        // turn off
        console.log('pause', name);
        this.selectTrack(null);
        this.audioElement.pause();
      } else {
        // is not playing
        // load track
        console.log('play', name);
        this.selectTrack(name);
        this.audioElement.load();
      }
    },
    ...radioNamespace.mapMutations(['selectTrack']),
  },
};
</script>

<style scoped lang="scss">
.columns {
  //margin-left: 10vmin;
  //margin-right: 10vmin;
  padding-left: 5vmin;
  padding-right: 3vmin;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
ul.left-list {
  text-align: left;

  li {
    margin-top: 1rem;
  }
}
.right-content {
}
.oscilloscope {
  max-width: 50vmin;
  max-height: 50vmin;
}
</style>
