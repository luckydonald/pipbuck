<template>
  <div class="columns">
    <ul class="left-list">
      <li
        v-for="(track, name) in radio.tracks" :key="track.file"
        class="track" :class="{ disabled: track.disabled }"
        v-if="!track.disabled"
        @click="playTrack(name)"
      >
        <a :class="{ active: current.file === track.file }">{{ name }}</a>
      </li>
    </ul>
    <div>Playing: <a :href="currentFile">{{ currentFile }}</a></div>
    <oscilloscope
      :color="colorFront"
      class="right-content"
      :radio-element="radioElement"
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
    radioElement() {
      return this.$parent.$refs.radio;
    },
  },
  methods: {
    playTrack(file) {
      console.log('<radio-element>', this.radioElement);
      console.log('file', this.current.file, file);
      if (this.selected !== null && this.current.file !== file) {
        // is already playing something else.
        // turn off
        this.selectTrack(null);
        this.radioElement.stop();
      } else {
        // is not playing
        // load track
        this.selectTrack(file);
        this.radioElement.load();
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
