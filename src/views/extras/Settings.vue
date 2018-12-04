<template>
  <div>
    <div><a @click="location.reload()" href="/settings">Reload</a></div>
    <div>
      <label>Hardware buttons</label>
      <a @click="leToggleHardwareButtons(true)" class="active">ON</a>
      <a @click="leToggleHardwareButtons(false)" class="active">OFF</a>
    </div>
    <div>
      <label>Color</label>
      <a
        v-for="color in colors" :key="color.name"
        @click="setColor(color)" class="active"
      >{{ color.name }}</a>
      <!-- :style="{ borderColor: color.foreground, color: color.foreground,
        backgroundColor: color.background }"-->
    </div>
    <div>
        <stable-colt :hair="hair" :back="back"/>
    </div>
  </div>
</template>

<script>
import { hsl, HexToHSL } from '../../lib/colorspace';
import StableColt from '../../components/StableColt.vue';

export default {
  name: 'Settings',
  components: { StableColt },
  data() {
    return {
      colors: [
        {
          name: 'Green',
          foreground: hsl(145, 85, 79, '#9cf7c2'),
          background: hsl(145, 78, 14, '#08401f'),
        },
        {
          name: 'Amber',
          foreground: hsl(40, 85, 79, '#f7da9e'),
          background: hsl(40, 78, 14, '#402d08'),
        },
        {
          name: 'Red',
          foreground: hsl(359, 85, 79, '#f79c9d'),
          background: hsl(359, 78, 14, '#400809'),
        },
        {
          name: 'Violet',
          foreground: hsl(270, 85, 79, '#ca9ff5'),
          background: hsl(270, 78, 14, '#240840'),
        },
        {
          name: 'Blue',
          foreground: hsl(180, 85, 79, '#9ff5f5'),
          background: hsl(180, 78, 14, '#084040'),
        },
        {
          name: 'White',
          foreground: hsl(0, 0, 96, '#f5f5f5'),
          background: hsl(0, 0, 25, '#404040'),
        },
      ],
    };
  },
  computed: {
    hair() {
      return HexToHSL(this.$store.state.colorFront);
    },
    back() {
      return HexToHSL(this.$store.state.colorBack);
    },
  },
  methods: {
    leToggleHardwareButtons(state) {
      console.log('commiting toggleHardwareButtons state: ', state);
      this.$store.commit('toggleHardwareButtons', state);
    },
    setColor(color) {
      console.log('commiting setColorFront state: ', color);
      this.$store.commit('setColorFront', color.foreground);
      this.$store.commit('setColorBack', color.background);
    },
  },
};
</script>

<style scoped>
  div {
    margin-top: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
</style>
