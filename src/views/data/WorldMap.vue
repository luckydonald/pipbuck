<template>
  <div class="page">
    <keep-alive>
      <Map
        :access-token="apiToken"
        :map-options="{
          style: 'mapbox://styles/luckydonald/cjqwaq8xs3x9j2sn2cbsdzyt6',
          center: [-76.61703, 39.28529],
          zoom: 10,
          showCompass: false,
          showZoom: false,
        }"
        :hide-credits="false"
      />
    </keep-alive>
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
.page {
  padding-left: 5vmin;
  padding-right: 3vmin;
  padding-bottom: 2vmin;
}
</style>
<style lang="scss">/* unscoped */
#map .mapboxgl-control-container,
#map .mapboxgl-control-container .mapboxgl-ctrl
{
  display: none !important;
  pointer-events: auto!important;
  position: absolute;
  top: -100%;
}
</style>
