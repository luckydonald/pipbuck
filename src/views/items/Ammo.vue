<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <div slot="rows" class="rows">
      <div class="row">
        <div class="detail blank"/>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">--</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{ activeItem.value }}</div>
        </div>
      </div>
      <div class="row">
        <div class="detail blank">&nbsp;</div>
      </div>
      <div class="row">
        <div class="detail blank">&nbsp;</div>
      </div>
    </div>
  </inventory>
</template>

<script>
import ammo, { empty } from '../../data/ammo';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';

export default {
  name: 'Ammo',
  components: { Inventory },
  mixins: [InventoryMixin],
  data() {
    const hasItems = (
      ammo !== undefined
      && typeof ammo === 'object'
      && Array.isArray(ammo)
      && ammo.length > 0
    );
    return {
      ammo,
      limit: -1,
      activeId: hasItems ? ammo[0].baseId : null,
      emptyItem: empty,
    };
  },
  computed: {
    items() {
      return this.ammo
        .map((item) => Object.assign(item, {
          id: item.baseId,
          name: item.long,
          short: item.name,
          amount: Math.floor(Math.random() * 50),
        }))
        .filter((item) => item.amount >= 1);
    },
  },
};
</script>
