<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <div slot="rows" class="rows">
      <div class="row">
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
      </div>
      <div class="row">
        <div class="detail condition">
          <div class="label">CND</div>
          <div class="value percentage"><percent class="percent" :value="condition"/></div>
        </div>
        <div class="detail ammunition">{{ ammunitionText }}</div>
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
import weapons from '../../data/weapons';
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
      condition: 0.47,
    };
  },
  computed: {
    items() {
      return this.weapons
        .map(item => Object.assign(item, {
          id: item.baseId,
          equipped: (Math.floor(Math.random() * 10)) === 0,
        }));
    },
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
