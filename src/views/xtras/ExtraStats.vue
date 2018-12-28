<template>
  <div @click="switchColors">
    <h1>This could contain app usage stats?</h1>
    <checkbox class="checkbox" v-model="changeColor">Colorize</checkbox>
    <checkbox class="checkbox" v-model="changeHP">Change HP</checkbox>
    <stats-pony class="img"
      :mane="mane"
      :body="body"
      :bars="bars"
      :eyes="eyes"
      :hp="hp"
    />
  </div>
</template>

<script>
import { hsl } from '../../lib/colorspace';
import StatsPony from '../../components/StatsPony.vue';
import Checkbox from '../../components/Checkbox.vue';

export default {
  name: 'ExtraData',
  components: { StatsPony, Checkbox },
  data() {
    return {
      changeColor: false,
      changeHP: true,
      mane: '#1aff81',
      body: '#1aff81',
      bars: '#1aff81',
      eyes: '#1aff81',
      hp: {
        head: 1.0,
        body: 1.0,
        legFrontLeft: 1.0,
        legFrontRight: 1.0,
        legHindLeft: 1.0,
        legHindRight: 1.0,
      },
      intervalId: null,
    };
  },
  methods: {
    switchColors() {
      if (this.changeColor) {
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
      }
      if (this.changeHP) {
        switch (Math.floor(Math.random() * 6)) {
          case 0:
            this.hp.head = Math.random();
            break;
          case 1:
            this.hp.body = Math.random();
            break;
          case 2:
            this.hp.legFrontLeft = Math.random();
            break;
          case 3:
            this.hp.legFrontRight = Math.random();
            break;
          case 4:
            this.hp.legHindLeft = Math.random();
            break;
          case 5:  // 5.0 - 5.99999•••
          case 6:  // 6.0
          default:
            this.hp.legHindRight = Math.random();
            break;
        }
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
.img >>> path,
.img >>> rect {
  transition: fill 0.5s ease-in-out,
              stroke 0.5s ease-in-out,
              width 0.5s ease-in-out,
              transform 0.5s ease-in-out;
}
.checkbox {
  font-size: 6.7vmin;
}
</style>
