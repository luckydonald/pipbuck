<template>
  <div class="bar">
    <div class="progress" :style="{
      width: `${value * 100}%`,
    }">
      <!-- <div class="text">{{ value }}</div> -->
    </div>
    <div class="background" :style="{
      width: `${100 - (value * 100)}%`,
    }"></div>
  </div>
</template>

<script>
export default {
  name: 'Percent',
  props: {
    value: {
      default: 1.0,
      type: Number,
    },
  },
};
</script>

<style scoped>
.bar {
  display: flex;
}
.background, .progress {
  background-color: var(--color-front);
  height: 100%;

}
.background {
  flex-shrink: 2;
  flex-grow: 2;
  opacity: 0.5;
}
.progress {
  background-color: var(--color-front);
}
</style>
