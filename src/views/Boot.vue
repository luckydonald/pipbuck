<template>
  <div class="home">
    Here would be something later.
    <br><br><br>
    <stable-colt class="svg"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StableColt from '../components/StableColt.vue';

export default {
  name: 'home',
  components: { StableColt },
};
</script>

<style scoped>
.svg {
 max-height: 200px;
}
</style>
