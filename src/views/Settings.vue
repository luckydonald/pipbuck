<template>
  <div>
    <div><a @click.native="location.reload()" href="/">Reload</a></div>
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
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      colors: [
        { name: 'Green', foreground: '#9ef8bd', background: '#08401f' },
        { name: 'Amber', foreground: '#f7da9e', background: '#402d08' },
        { name: 'Red', foreground: '#f59d9e', background: '#400809' },
        { name: 'White', foreground: '#f5f5f5', background: '#404040' },
      ],
    };
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
