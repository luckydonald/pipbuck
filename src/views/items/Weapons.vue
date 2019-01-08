<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <div slot="rows" class="rows">
      <div class="row">
        <div class="detail damage">
          <div class="label">DAM</div>
          <div class="value">{{ activeItem.damage }}</div>
        </div>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{ activeItem.weight || '--' }}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{ activeItem.value || '--'}}</div>
        </div>
      </div>
      <div class="row">
        <div class="detail condition">
          <div class="label">CND</div>
          <div class="value percentage">
            <percent class="percent" :value="activeItem.condition"/>
          </div>
        </div>
        <div class="detail ammunition cols-2">{{ ammunitionText }}</div>
      </div>
      <div class="row">
        <div class="detail blank">
          &nbsp;
        </div>
      </div>
    </div>
  </inventory>
</template>

<script>
import weapons, { empty } from '../../data/weapons';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';
import Percent from '../../components/Percent.vue';


export default {
  name: 'Weapons',
  components: { Inventory, Percent },
  mixins: [InventoryMixin],
  data() {
    const hasItems = (
      weapons !== undefined
      && typeof weapons === 'object'
      && Array.isArray(weapons)
      && weapons.length > 0
    );
    return {
      weapons,
      limit: -1,
      activeId: hasItems ? weapons[0].baseId : null,
      emptyItem: empty,
    };
  },
  computed: {
    items() {
      return this.weapons
        .map(item => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
          amount: Math.floor(Math.log(Math.random() * 10)),
          condition: Math.random(),
        }))
        .filter(item => item.amount >= 1);
    },
    ammunitionText() {
      if (
        this.activeItem !== undefined
        && this.activeItem !== null
        && this.activeItem
        && Object.keys(this.activeItem).indexOf('Ammunition used')
        && this.activeItem['Ammunition used']
      ) {
        const type = this.activeItem['Ammunition used'];
        const capacity = this.activeItem['Magazine capacity (shots per reload)'];
        return `${type} (${capacity}/${Math.round(Math.random() * 500)})`;
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
