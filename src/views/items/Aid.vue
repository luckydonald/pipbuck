<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
   <div slot="rows" class="rows">
     <div class="row">
      <div class="detail damage blank">
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
        <div class="detail effects">
          <div class="label">EFFECTS</div>
          <div class="value">{{ activeItem.Effect }}</div>
        </div>
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
import aid from '../../data/aid';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';

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
      limit: -1,
      activeId: hasItems ? aid[0].baseId : null,
    };
  },
  computed: {
    items() {
      return this.aid
        .map(item => Object.assign(item, {
          id: item.baseId,
          amount: Math.floor(Math.random() * 10),
        }))
        .filter(item => item.amount >= 1);
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
