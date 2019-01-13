<template>
  <div>
    <div><a @click="location.reload()" href="/">Reload</a></div>
    <div>
      <a @click="screenfull.toggle()" :class="{ active: screenfull.isFullscreen }">Fullscreen</a>
    </div>
    <div>
      <label>Virtual buttons</label>
      <a @click="leToggleVirtualButtons(true)" class="active">ON</a>
      <a @click="leToggleVirtualButtons(false)" class="active">OFF</a>
    </div>
    <div>
      <label>Color</label>
      <div v-for="(row, i) in colors" :key="i">
        <a
          v-for="color in row" :key="color.name"
          @click="setColor(color)" class="active"
        >{{ color.name }}</a>
         <!-- :style="{ borderColor: color.foreground, color: color.foreground,
        backgroundColor: color.background }"-->
      </div>
    </div>
    <div>
        <stable-colt :hair="hair" :back="back"/>
    </div>
  </div>
</template>

<script>
import * as screenfull from 'screenfull';
import { hsl, HexToHSL } from '../../lib/colorspace';
import StableColt from '../../components/StableColt.vue';


export default {
  name: 'Settings',
  components: { StableColt },
  data() {
    return {
      colors: [
        // Original colors:
        // https://www.reddit.com/r/Fallout/comments/40hpkr/classic_hud_colors/
        //
        // Converter:
        // https;//rgb.to/hex/RRGGBB
        [ // row 1
          {
            name: 'Amber',
            foreground: hsl(37, 100, 63, '#ffb642'), // rgb(255, 182, 66)
            background: hsl(37, 78, 14, '#402a08'),
          },
          {
            name: 'Blue',
            foreground: hsl(194, 100, 59, '#2ecfff'), // rgb(46, 207, 255)
            background: hsl(194, 78, 14, '#083340'),
          },
          {
            name: 'Green',
            foreground: hsl(147, 100, 55, '#1aff80'), // rgb(26, 255, 128)
            background: hsl(147, 78, 14, '#084021'),
          },
          {
            name: 'White',
            foreground: hsl(180, 100, 88, '#c0ffff'), // rgb(192, 255, 255)
            background: hsl(180, 100, 14, '#004747'),
          },
        ], [
          {
            name: 'Alt Amber',
            foreground: hsl(40, 85, 79, '#f7da9e'),
            background: hsl(40, 78, 14, '#402d08'),
          },
          {
            name: 'Alt Blue',
            foreground: hsl(180, 85, 79, '#9ff5f5'),
            background: hsl(180, 78, 14, '#084040'),
          },
          {
            name: 'Alt Green',
            foreground: hsl(145, 85, 79, '#9cf7c2'),
            background: hsl(145, 78, 14, '#08401f'),
          },
          {
            name: 'Alt White',
            foreground: hsl(0, 0, 96, '#f5f5f5'),
            background: hsl(0, 0, 25, '#404040'),
          },
        ], [
          {
            name: 'Alt Orange',
            foreground: hsl(20, 100, 50),
            background: hsl(40, 78, 14, '#402d08'),
          },
          {
            name: 'Alt Red',
            foreground: hsl(359, 85, 79, '#f79c9d'),
            background: hsl(359, 78, 14, '#400809'),
          },
          {
            name: 'Alt Violet',
            foreground: hsl(270, 85, 79, '#ca9ff5'),
            background: hsl(270, 78, 14, '#240840'),
          },
        ],
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
    screenfull() {
      return screenfull;
    },
  },
  methods: {
    leToggleVirtualButtons(state) {
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
