<template>
  <div @click="switchColors">
    <h1>This could contain app usage stats?</h1>
    <stats-pony class="img"
      :mane="mane"
      :body="body"
      :bars="bars"
      :eyes="eyes"
    />
  </div>
</template>

<script>
import { hsl } from '../../lib/colorspace';
import StatsPony from '../../components/StatsPony.vue';

export default {
  name: 'ExtraData',
  components: { StatsPony },
  data() {
    return {
      mane: 'blueviolet',
      body: 'gold',
      bars: 'orangered',
      eyes: 'deepskyblue',
      intervalId: null,
    };
  },
  methods: {
    switchColors() {
      switch (Math.floor(Math.random() * 4)) {
        default:
        case 0:
          this.mane = hsl(Math.random() * 360, 100, 55);
          break;
        case 1:
          this.body = hsl(Math.random() * 360, 100, 55);
          break;
        case 2:
          this.bars = hsl(Math.random() * 360, 100, 55);
          break;
        case 3:
        case 4:
          this.eyes = hsl(Math.random() * 360, 100, 55);
          break;
      }
    },
  },
  mounted() {
    if (this.intervalId === null) {
      this.intervalId = setInterval(this.switchColors, 500);
    }
  },
  beforeDestroy() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
};
</script>

<style scoped>
.img >>> path {
  transition: fill 0.5s ease-in-out, stroke 0.5s ease-in-out;
}
</style>
