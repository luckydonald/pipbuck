<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <template v-slot:rows>
    <div class="rows">
      <div class="row">
        <div class="detail damage">
          <div class="label">DR</div>
          <div class="value">{{ activeItem['DR'] }}</div>
        </div>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{ activeItem.weight }}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{ activeItem.value }}</div>
        </div>
      </div>
      <div class="row">
        <div class="detail condition">
          <div class="label">CND</div>
          <div class="value percentage">
            <percent class="percent" :value="activeItem.condition"/>
          </div>
        </div>
        <div class="detail blank" />
        <div class="detail blank" />
      </div>
      <div class="row">
        <div class="detail effect" v-show="hasEffect">
          <div class="label">EFFECTS</div>
          <div class="value">{{ activeItem['Effects'] }}</div>
        </div>
        <div class="detail blank" v-show="!hasEffect">
          &nbsp;
        </div>
      </div>
    </div>
    </template>
  </inventory>
</template>

<script>
import apparel, { empty } from '../../data/apparel';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';
import Percent from '../../components/Percent.vue';

export default {
  name: 'Apparel',
  components: { Inventory, Percent },
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
      emptyItem: empty,
    };
  },
  computed: {
    items() {
      return this.apparel
        .map((item) => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
          amount: Math.floor(Math.random() * 3),
          condition: Math.random(),
        }))
        .filter((item) => item.amount >= 1);
    },
    hasEffect() {
      return (this.activeItem.Effects || '—') !== '—';
    },
  },
  methods: {
    toggleEquip(id, flag) {
      console.log('sending equip action', id, flag);
      const selectedItem = apparel.filter((item) => item.baseId === id)[0];
      const index = apparel.indexOf(selectedItem);
      this.$set(apparel[index], 'equipped', flag);
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
