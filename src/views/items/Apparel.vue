<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <div slot="rows" class="rows">
      <div class="row">
        <div class="detail damage">
          <div class="label">DR</div>
          <div class="value">{{activeItem['DR']}}</div>
        </div>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{activeItem['Weight']}}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{activeItem['Value']}}</div>
        </div>
      </div>
      <div class="row">
        <div class="detail condition">CND [####]</div>
        <div class="detail blank" />
        <div class="detail blank" />
      </div>
      <div class="row">
        <div class="detail effect" v-show="hasEffect">
          {{ activeItem['Effects'] }}
        </div>
        <div class="detail blank" v-show="!hasEffect">
          &nbsp;
        </div>
      </div>
    </div>
  </inventory>
</template>

<script>
import apparel from '../../data/apparel';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';

export default {
  name: 'Apparel',
  components: { Inventory },
  mixins: [InventoryMixin],
  data() {
    const hasItems = (
      apparel !== undefined
      && typeof apparel === 'object'
      && Array.isArray(apparel)
      && apparel.length > 0
    );
    return {
      apparel,
      limit: -1,
      activeId: hasItems ? apparel[0].baseId : null,
    };
  },
  computed: {
    items() {
      return this.apparel
        .map(item => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
        }));
    },
    hasEffect() {
      return (this.activeItem.Effects || '—') !== '—';
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
