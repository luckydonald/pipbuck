<template>
  <inventory :items="items" :limit="limit" v-model="activeId" @equip="onEquip">
   <div slot="actions">
     <ul>
       <li>
          <a @click="$router.push({ name: 'Loot' })">Loot <Keybind key-label="L"/></a>
        </li>
      </ul>
   </div>
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
import aid, { empty } from '../../data/aid';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';
import Keybind from '../../components/Keybind.vue';
import pnpState from '../../state/pnp';

const demoAid = (
  aid.map(item => Object.assign(item, {
    id: item.baseId,
    amount: Math.floor(Math.random() * 10),
  })).filter(item => item.amount >= 1)
);

export default {
  name: 'Aid',
  components: { Inventory, Keybind },
  mixins: [InventoryMixin],
  data() {
    const hasItems = (
      demoAid !== undefined
      && typeof demoAid === 'object'
      && Array.isArray(demoAid)
      && demoAid.length > 0
    );
    return {
      aid: [],
      limit: -1,
      activeId: hasItems ? demoAid[0].baseId : null,
      emptyItem: empty,
    };
  },
  computed: {
    items() {
      return pnpState.player.items;
    },
  },
  methods: {
    onEquip(id) {
      console.log('aid use', id);
      pnpState.dispatch('player.equip', { itemId: id });
    },
  },
};
</script>
