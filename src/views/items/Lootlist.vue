<template>
  <select v-model="current_lootbox_id">
    <option v-for="lootbox in lootboxes" :key="lootbox.id" :value="lootbox.id">
      {{lootbox.name}}
    </option>
  </select>
  <inventory :items="currentLootbox.items" :limit="limit" v-model="activeId">
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
import axios from 'axios';
import { empty } from '../../data/ammo';
import Inventory from '../../components/context/Inventory.vue';
import InventoryMixin from '../../components/context/InventoryMixin';


export default {
  name: 'Lootlist',
  components: { Inventory },
  mixins: [InventoryMixin],
  data() {
    return {
      lootboxes: [
        /*
        {
          "id": 1,
          "name": "Here's your Loot!",
          "owned_by": 1,
          "party": 1,
          "items": [
            {
              "id": 12,
              "name": "Foraged berries/fruit (per hoof-full)",
              "category": "food",
              "weight": 1,
              "value": 1,
              "description": null,
              "effect": "Food: 5 hp (depending on local plants (DM) [Survival/10] hoof-fulls found)"
            }
          ]
        }
        */
      ],
      limit: -1,
      activeId: null,
      currentLootboxId: null,
      emptyItem: empty,
    };
  },
  // Fetches posts when the component is created.
  created() {
    const playerId = 1;
    axios.get(`http://localhost:8080/api/v1/lootbox/player/${playerId}`)
      .then((response) => {
      // JSON responses are automatically parsed.
        this.lootboxes = response.data;
      }).catch((e) => {
        this.errors.push(e);
      });
  },
  computed: {
    currentLootbox() {
      const lootboxes = this.lootboxes.filter(lootbox => lootbox.id === this.currentLootboxId);
      if (lootboxes.length === 0) {
        return null;
      }
      return lootboxes[0];
    },
    items() {
      if (!this.currentLootbox) {
        return [];
      }
      return this.currentLootbox.items
        .map(item => Object.assign(item, {
          amount: item.count,
        }))
        .filter(item => item.amount >= 1);
    },
  },
};
</script>

<style lang="scss">
select {

}
</style>
