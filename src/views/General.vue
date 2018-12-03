<template>
  <div class="columns">
    <ul class="left-list">
      <li
        v-for="(track, name) in radio.tracks" :key="track.file"
        class="track" :class="{ disabled: track.disabled }"
        v-if="!track.disabled"
        @click="selectTrack(name)"
      >
        <a :class="{ active: current.file === track.file }">{{ name }}</a>
      </li>
    </ul>
    <!--<div>Playing: {{ current }}</div>-->
    <radio
      :color="colorFront"
      class="right-content"
    />

  </div>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import Radio from '../components/Radio.vue';

const radioNamespace = createNamespacedHelpers('radio');

export default {
  name: 'general',
  components: { Radio },
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'colorFront', 'radio',
    ]),
    ...radioNamespace.mapGetters(['current']),
  },
  methods: {
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
