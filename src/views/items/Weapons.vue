<template>
  <div class="page">
    <scrollbar class="scroll" :element="scrollered" />

    <div class="scrollable">
      <ul class="list" ref="scrollered">
        <li v-for="weapon in this.weapons" :key="weapon.baseId">
          <a
            class="weapon"
            @click="selectItem(weapon.baseId)"
            @mouseover="selectItem(weapon.baseId)"
            :class="{
              equipped: activeWeaponId === weapon.baseId
            }"
          >
            {{weapon.name}}<span v-if="weapon.amount > 1"> ({{weapon.amount}})</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="details">
      <div class="row">
        <div class="detail damage">
          <div class="label">DAM</div>
          <div class="value">{{activeWeapon['Damage per shot']}}</div>
        </div>
        <div class="detail weight">
          <div class="label">WG</div>
          <div class="value">{{activeWeapon['Weapon weight']}}</div>
        </div>
        <div class="detail value">
          <div class="label">VAL</div>
          <div class="value">{{activeWeapon['Weapon value in caps']}}</div>
        </div>
      </div>
      <div class="row">
          <div class="detail condition">CND [#####  ]</div>
          <div class="detail ammunition">{{ammunitionText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import weapons from '../../data/weapons';
import { ui } from '../../sound';
import Scrollbar from '../../components/Scrollbar.vue';


export default {
  name: 'Weapons',
  components: { Scrollbar },
  data() {
    return {
      weapons,
      activeWeaponId: weapons[0].baseId,
      scrollered: null,
    };
  },
  computed: {
    /**
     * @return {{type: string, name: string, ammunition: string}}
     */
    activeWeapon() {
      return weapons.filter(weapon => weapon.baseId === this.activeWeaponId)[0];
    },
    ammunitionText() {
      if (
        Object.keys(this.activeWeapon).indexOf('Ammunition used')
        && this.activeWeapon['Ammunition used']
      ) {
        const type = this.activeWeapon['Ammunition used'];
        const capacity = this.activeWeapon['Magazine capacity (shots per reload)'];
        return `${type} (1/${capacity})`;
      }
      return '--';
    },
  },
  methods: {
    selectItem(baseId) {
      this.activeWeaponId = baseId;
      this.$emit('pipbuck-play', ui.sounds.gui_select);
    },
    setScrollered() {
      console.log('init scrollered', this.$refs);
      if (this.$refs.scrollered !== undefined) {
        console.log('init scrollered wowsa', this.$refs.scrollered);
        this.scrollered = this.$refs.scrollered.$el;
        return;
      }
      console.log('init scrollered nopeh', this.$refs);
      this.scrollered = null;
    },
  },
  mounted() {
    this.setScrollered();
  },
};
</script>

<style scoped lang="scss">
.scroll {
  position: fixed!important;
  height: 100%;
}
.page {
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
}

.scrollable {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
ul.list {
  top: 0;
  bottom: 0;
  left: 0;
  width: 60vmin;
  text-overflow: ellipsis;
  white-space: nowrap;

  li {
    text-align: left;

    a.weapon {
      box-sizing: border-box;
      position: relative;
      padding-left: 1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      overflow: hidden;

      // checkbox: http://jsfiddle.net/nN8k7/1/
      &:hover:after,
      &.equipped:after{
        position: absolute;
        left: 0;
        bottom: 0.285em;
        font-weight: bold;
      }
      &:hover {
        border: var(--color-front) 2px solid;
        background-color: rgba(255,225,255, 0.1);
        &:after {
          content: "◻︎︎";
        }
      }
      // checkbox: http://jsfiddle.net/nN8k7/1/
      &.equipped:after {
        content: "◼";
      }
    }
  }
}

.details {
  // position: absolute;
  padding-bottom: 20vmin;
  // right: 2vmin;
  align-self: flex-end;
  align-content: stretch;
  .row {
    display: block;
  }

  .row{
    display: flex;
  }

  .detail {
    flex-grow: 1;

    display: inline-flex;
    justify-content: space-between;

    // right border is fading
    border-right-width: .5vmin;
    border-right-style: solid;
    border-right-color: transparent;
     -webkit-border-image: -webkit-gradient(
        linear, 0 0, 0 100%, from(var(--color-front)), to(rgba(0, 0, 0, 0))
    ) 1 100%;
    border-image: linear-gradient(
        to bottom, var(--color-front), rgba(0, 0, 0, 0)
    ) 1 100%;
    // prepare for creating a top border per :after
    position: relative;
    margin-top: .5vmin;  // space for border top

    &:after {
      position: absolute;
      content: "";
      top: -.5vmin;
      left: 0;
      right: -.5vmin;
      height: .5vmin;
      background-color: var(--color-front);
    }
  }
  .label, .value {
    display: inline;
  }

}
</style>
