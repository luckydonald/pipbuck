<template>
  <div>
    <ul>
      <li
        v-for="(track, name) in tracks" :key="track.name"
        class="track" :class="{ disabled: track.disabled }"
        v-if="!track.disabled"
        @click="selected = name"
      >
        <a :class="{ active: selected === name }">{{ name }}</a>
      </li>
    </ul>
    <radio v-if="selected !== null" :color="colorFront" :file="selectedTrack.file"/>

  </div>
</template>

<script>
import Radio from '../components/Radio.vue';

export default {
  name: 'general',
  components: { Radio },
  props: {
    colorFront: {},
    colorBack: {},
  },
  data() {
    return {
      selected: null,
      tracks: {
        'Galaxy News Radio': {
          file: 'gnr.mp3',
          disabled: false,
          hidden: false,
        },
        'Diamond City Radio': {
          file: 'dcr.mp3',
          disabled: false,
          hidden: false,
        },
        'Test Track': {
          file: 'test.mp3',
          disabled: false,
          hidden: false,
        },
      },
    };
  },
  computed: {
    selectedTrack() {
      if (this.selected === null) {
        return null;
      }
      return this.tracks[this.selected];
    },
  },
};
</script>

<style scoped>

</style>
