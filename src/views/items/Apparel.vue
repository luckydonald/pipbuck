<template>
  <div class="page">
    <scrollbar
      class="scroll-wrapper"
      content-class=""
      scrollbar-class="scroll"
      :items="itemSelection"
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
    </scrollbar>

    <div class="details">
      <div class="image">
        <svg-unknown :style="{ fill: 'var(--color-front)' }"/>
      </div>
      <div class="row">
        <div class="detail damage">
          <div class="label">DAM</div>
          <div class="value">{{activeItem['Damage per shot']}}</div>
        </div>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{activeItem['Apparel weight']}}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{activeItem['Apparel value in caps']}}</div>
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
import Scrollbar from '../../components/Scrollbar.vue';
import SvgUnknown from '../../assets/img/ui/items/unknown.svg';

export default {
  name: 'Apparel',
  components: { Scrollbar, SvgUnknown },
  data() {
    return {
      apparel,
      items: 70,
      activeId: apparel[0].baseId,
    };
  },
  computed: {
    itemSelection() {
      return this.apparel
        .slice(0, this.items)
        .map(item => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
        }));
    },
    /**
     * @return {{type: string, name: string, ammunition: string}}
     */
    activeItem() {
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
  flex-grow: 1;
  flex-shrink: 1;
}
.apparel {
  text-align: left;
  width: 100%;
}

.details {
  order: 2;
  flex-grow: 0;
  flex-shrink: 0;
  width: 70vmin;
  padding-bottom: 20vmin;
  // right: 2vmin;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: flex-end;
  justify-content: flex-end;

  .image > svg {
    max-height: 20vmin;
  }

  .row{
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .detail {
    padding-bottom: 20vmin;
    padding: 0.5vmin 1vmin;

    width: (100% / 3);

    margin-left: 1.2vmin;
    flex-grow: 1;

    display: block;
    justify-content: space-between;

    // right border is fading
    border-right-width: .75vmin;
    border-right-style: solid;
    border-right-color: transparent;
     -webkit-border-image: -webkit-gradient(
        linear, 0 0, 0 100%, from(var(--color-front)), to(rgba(0, 0, 0, 0))
    ) 1 100%;
    border-image: linear-gradient(
        to bottom, var(--color-front), rgba(0, 0, 0, 0)
    ) 1 100%;
    // prepare for creating a top border per :after
    position: relative;
    margin-top: .75vmin;  // space for border top

    &:after {
      position: absolute;
      content: "";
      top: -.5vmin;
      left: 0;
      right: -.5vmin;
      height: .5vmin;
      background-color: var(--color-front);
    }

    &.ammunition {
      flex-grow: 2;
    }
  }
  .label, .value {
    display: inline;
  }
}
</style>
