<template>
  <div>
    <Map
      :access-token="apiToken"
      :map-options="{
        style: 'mapbox://styles/luckydonald/cjqwaq8xs3x9j2sn2cbsdzyt6',
        center: [-73.639724, 40.397293],
        zoom: 6.3,
      }"
      :hide-credits="true"
    />
  </div>
</template>

<script>
import Map from '../../lib/vue-mapbox-gl/map.vue';

export default {
  name: 'WorldMap',
  // eslint-disable-next-line vue/no-unused-components
  components: { Map },
  data() {
    return {
      // es-lint-disable-next-line: max-len
      apiToken: 'pk.eyJ1IjoibHVja3lkb25hbGQiLCJhIjoiY2o4MjExcDRnNnh1aDJxcGticXJqbmVkZiJ9.AeqEDvUViPfbMGqmPHLnBw',
    };
  },
};
</script>
<style scoped lang="scss">

.mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib {
  display: none!important;
}
</style>
