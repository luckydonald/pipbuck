<template>
  <div class="page">
    <scrollbar
      class="scroll-wrapper"
      content-class=""
      scrollbar-class="scroll"
      :items="apparelSelection"
      v-model="activeId"
    >
      <template slot-scope="apparel">
        <a
          class="apparel"
          :class="{
            equipped: activeId === apparel.baseId
          }"
        ><!-- TODO @click="selectItem(apparel.baseId)"
          @mouseover="selectItem(apparel.baseId)"
        -->
          {{ apparel.name }}
          <span v-if="apparel.amount > 1"> ({{apparel.amount}})</span>
        </a>
      </template>
      <!--
      <template slot="active" slot-scope="apparel" :id="`active-${apparel.id}`">
        <svg-list-box class="apparel-svg" :style="{
        fill: 'hotpink',
        stroke: 'hotpink',
        }" />
      </template>
      <template slot="equipped" slot-scope="apparel" :id="`equipped-${apparel.id}`">
        <svg-list-box class="apparel-svg" :style="{
        fill: 'transparent',
        stroke: 'hotpink',
        }" />
      </template>
      -->
    </scrollbar>
    <div class="details">
      <div class="row">
        <div class="detail damage">
          <div class="label">DAM</div>
          <div class="value">{{activeApparel['Damage per shot']}}</div>
        </div>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{activeApparel['Apparel weight']}}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{activeApparel['Apparel value in caps']}}</div>
        </div>
      </div>
      <div class="row">
        <div class="detail condition">CND [####]</div>
        <!--<div class="detail ammunition">{{ammunitionText}}</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import apparel from '../../data/apparel';
// import { ui } from '../../sound';
import Scrollbar from '../../components/Scrollbar.vue';

export default {
  name: 'Apparel',
  components: {
    Scrollbar,
  },
  data() {
    return {
      apparel,
      items: 70,
      activeId: apparel[0].baseId,
      scrollered: null,
    };
  },
  computed: {
    apparelSelection() {
      return this.apparel
        .slice(0, this.items)
        .map(item => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
        }));
    },
    activeApparel() {
      return apparel.filter(piece => piece.baseId === this.activeId)[0];
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.scroll-wrapper {
  order: 0;
}
.apparel {
  text-align: left;
  width: 100%;
}
.apparel-svg {
  stroke-width: 1vmin;
  max-width: 1em;
  max-height: 1em;
}
.apparel:before {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.details {
  order: 2;
  width: 30vmin;
  background-color: hotpink;
}

</style>
