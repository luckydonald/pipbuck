<template>
  <div class="overlay" v-if="isOpen">
    <div class="background" @click="$emit('close', false)" />
    <div class="inner">
      <slot name="default">
        Content goes into the default slot.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    isOpen: {
      default: false,
      type: Boolean,
    },
  },
  model: {
    prop: 'isOpen',
    event: 'close',
  },
};
</script>

<style scoped lang="scss">

input {
  display: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  .background {
    background: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 0.75vmin solid var(--color-front);
    border-image: linear-gradient(to top, var(--color-front) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, var(--color-front) 90%);
    border-image-slice: 1;
    padding: 0.5em 1em;
    background: rgba(0,0,0,0.75);
  }
}
</style>
