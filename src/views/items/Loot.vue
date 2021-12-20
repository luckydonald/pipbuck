<template>
  <inventory :items="activeLootbox.items" :limit="limit" v-model="activeId">
    <div slot="actions">
      <ul>
        <li>
          <Select
            v-model="activeLootboxId"
            :items="lootboxes"
            placeholder="Select Lootlist"
            @click="loadLoot()"
          />
        </li>
        <li>
          <button @click="takeItem()" :disabled="takeItemDisabled">Take Item <Keybind key-label="E" :disabled="takeItemDisabled"/></button>
        </li>
      </ul>
    </div>
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
import Select from '../../components/Select.vue';
import Keybind from '../../components/Keybind.vue';


export default {
  name: 'Loot',
  components: { Inventory, Select, Keybind },
  mixins: [InventoryMixin],
  data() {
    return {
      playerId: 1,
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
      activeLootboxId: null,
      emptyItem: empty,
    };
  },
  // Fetches posts when the component is created.
  created() {
    this.loadLoot();
  },
  methods: {
    loadLoot() {
      axios.get(`http://${window.location.hostname}:8080/api/v1/loot/player/${this.playerId}`)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.lootboxes = response.data;
          if (this.activeLootboxId != null && this.lootboxIds.indexOf(this.activeLootboxId) === -1) {
            // in case something no longer present is selected -> remove selection
            this.activeLootboxId = null;
          }
          if (this.activeLootboxId == null && this.lootboxes.length > 0) {
            // in case nothing is selected yet -> select first one
            this.activeLootboxId = this.lootboxes[0].id;
          }
        }).catch((e) => {
          this.errors.push(e);
        });
    },
    takeItem(countArg) {
      const count = countArg === undefined ? 1 : countArg;
      axios.get(`http://${window.location.hostname}:8080/api/v1/loot/${this.activeLootboxId}/player/${this.playerId}/take/${this.activeId}/${count}`)
        .then((response) => {
          // JSON responses are automatically parsed and in response.data.

          // eslint-disable-next-line camelcase
          const lootlistItemCount = response.data.lootlist_item_count;
          // eslint-disable-next-line camelcase
          // const personalItemCount = response.data.personal_item_count;

          // apply new item count to the lootlist item.
          const lootboxIndex = this.lootboxes.indexOf(this.activeLootbox);
          const { items } = this.lootboxes[lootboxIndex];
          const selectedItem = items.filter(item => item.id === this.activeId)[0];
          const itemIndex = items.indexOf(selectedItem);
          if (lootlistItemCount > 1) {
            this.lootboxes[lootboxIndex].items[itemIndex].count = lootlistItemCount;
          } else {
            delete this.lootboxes[lootboxIndex].items[itemIndex];
          }
        }).catch((e) => {
          this.errors.push(e);
        });
    },
  },
  computed: {
    lootboxIds() {
      return this.lootboxes.map(lootbox => lootbox.id);
    },
    activeLootbox() {
      const lootboxes = this.lootboxes.filter(lootbox => lootbox.id === this.activeLootboxId);
      if (lootboxes.length === 0) {
        return null;
      }
      return lootboxes[0];
    },
    items() {
      if (!this.activeLootbox) {
        return [];
      }
      return this.activeLootbox.items
        .map(item => Object.assign(item, {
          amount: item.count,
        }))
        .filter(item => item.amount >= 1);
    },
    takeItemDisabled() {
      return this.activeId === null || this.items.length === 0;
    },
  },
};
</script>

<style lang="scss">
</style>
