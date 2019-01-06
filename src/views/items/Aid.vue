<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <template slot="row" v-if="activeItem">
      <div class="detail damage">
        <div class="label">DAM</div>
        <div class="value">{{activeItem['Damage per shot']}}</div>
      </div>
      <div class="detail weight">
        <div class="label">WG</div>
        <div class="value">{{activeItem['Weapon weight']}}</div>
      </div>
      <div class="detail value">
        <div class="label">VAL</div>
        <div class="value">{{activeItem['Weapon value in caps']}}</div>
      </div>
    </template>
    <template slot="row" v-if="activeItem">
      <div class="detail condition">CND [####]</div>
      <div class="detail ammunition">{{ ammunitionText }}</div>
    </template>
  </inventory>
</template>

<script>
import aid from '../../data/aid';
import Inventory from './Inventory.vue';
import InventoryMixin from './InventoryMixin';

export default {
  name: 'Aid',
  components: { Inventory },
  mixins: [InventoryMixin],
  data() {
    const hasItems = (
      aid !== undefined
      && typeof aid === 'object'
      && Array.isArray(aid)
      && aid.length > 0
    );
    return {
      aid,
      limit: 70,
      activeId: hasItems ? aid[0].baseId : null,
    };
  },
  computed: {
    items() {
      return this.aid
        .map(item => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
        }));
    },
    /**
     * @return {{type: string, name: string, ammunition: string}}
     */
    ammunitionText() {
      if (
        this.activeItem
        && Object.keys(this.activeItem).indexOf('Ammunition used')
        && this.activeItem['Ammunition used']
      ) {
        const type = this.activeItem['Ammunition used'];
        const capacity = this.activeItem['Magazine capacity (shots per reload)'];
        return `${type} (1/${capacity})`;
      }
      return '--';
    },
  },
  methods: {
    toggleEquip(id, flag) {
      console.log('sending equip action', id, flag);
      this.itemSelection.filter(item => item.id === id)[0].equipped = flag;
    },
    onEquip(id) {
      this.toggleEquip(id, true);
    },
    onUnEquip(id) {
      this.toggleEquip(id, false);
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
  padding-top: -10%;
  padding-bottom: 10%;
  // right: 2vmin;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: flex-end;
  justify-content: flex-end;

  .image {
    order: 0;
    padding: 10vmin;
    top:10vmin;
    flex-shrink: 2;
    box-sizing: border-box;
    > svg {
      box-sizing: border-box;
    }
  }

  .row{
    order: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .detail {
    padding: 0.5vmin 1vmin;
    white-space: nowrap;
    width: (100% / 3);
    margin-left: 1.2vmin;

    display: block;
    flex-grow: 1;
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
    &.blank {
      border-right-color: transparent;
      border-image: none;
      &:after {
        background-color: transparent;
      }
    }
  }
  .label, .value {
    display: inline;
  }
}
</style>
