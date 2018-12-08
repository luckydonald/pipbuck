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
    <div>Playing: <a :href="currentFile">{{ currentFile }}</a></div>
    <oscilloscope
      :color="colorFront"
      :fftSize="128"
      class="right-content"
      :audio-element="audioElement"
    />
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
    };
  },
  computed: {
    ...mapState([
      'colorFront', 'radio',
    ]),
    ...radioNamespace.mapState(['selected']),
    ...radioNamespace.mapGetters(['current', 'currentFile']),
    audioElement() {
      return this.$parent.$parent.$refs.radio;
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
    width: 100%;
  }
  .columns * {
    padding: 0;
  }
  ul.left-list {
    width: 50%;
    float: left;
    text-align: left;

    li {
      margin-top: 1rem;
    }
  }
  .right-content {
    width: 50%;
    float: right;
  }
</style>
