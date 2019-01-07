<template>
  <inventory :items="items" :limit="limit" v-model="activeId">
    <div slot="rows" class="rows">
      <div class="row">
        <div class="detail blank"/>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{ activeItem.weight | dashedZero }}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{ activeItem.value | dashedZero }}</div>
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
import misc from '../../data/misc';
import { dashedZero } from '../../filters/inventory';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';


export default {
  name: 'Misc',
  components: { Inventory },
  filters: { dashedZero },
  mixins: [InventoryMixin],
  data() {
    const hasItems = (
      misc !== undefined
      && typeof misc === 'object'
      && Array.isArray(misc)
      && misc.length > 0
    );
    return {
      misc,
      limit: -1,
      activeId: hasItems ? misc[0].baseId : null,
      condition: 0.47,
    };
  },
  computed: {
    items() {
      return this.misc
        .map(item => Object.assign(item, {
          id: item.baseId,
        }));
    },
  },
};
</script>
