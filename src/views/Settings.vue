<template>
  <div>
    <div><a @click.native="location.reload()" href="/">Reload</a></div>
    <div>
      <label>Hardware buttons</label>
      <a @click.native="$emit('showHardwareButtons', true)">ON</a>
      <a @click.native="$emit('showHardwareButtons', false)">OFF</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
};
</script>

<style scoped>

</style>
