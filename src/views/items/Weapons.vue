<template>
  <div class="page">
    <ul class="list">
      <li v-for="weapon in this.weapons" :key="weapon.baseId">
        <a class="weapon" @click="selectItem(weapon.baseId)">
          {{weapon.name}}<span v-if="weapon.amount > 1"> ({{weapon.amount}})</span>
        </a>
      </li>
    </ul>
    <div class="details">
      <div class="row">
        <div class="detail damage"><span>DAM {{activeWeapon['Damage per shot']}}</span></div>
        <div class="detail weight"><span>WG {{activeWeapon['Weapon weight']}}</span></div>
        <div class="detail value"><span>VAL {{activeWeapon['Weapon value in caps']}}</span></div>
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

export default {
  name: 'Weapons',
  amount: 1,
  data() {
    return {
      weapons,
      activeWeaponId: weapons[0].baseId,
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
  },
};
</script>

<style scoped lang="scss">
$width: 44vw;

ul.list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: $width;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: scroll;

  li {
    text-align: left;

    a.weapon {
      box-sizing: border-box;
      width: $width;
      position: relative;
      padding-left: 1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      overflow: hidden;

      // checkbox: http://jsfiddle.net/nN8k7/1/
      &:active:after {
        position: absolute;
        left: 0;
        bottom: 0.2em;
        font-weight: bold;
        content: "\2610";
      }
    }
  }
}

.details {
  position: absolute;
  bottom: 0;
  right: 0;

  .detail {
     border-right-width: .5vmin;
    border-right-style: solid;
    border-right-color: transparent;
    //border-image: linear-gradient(to bottom, var(--color-front), transparent) 1 100%;
     -webkit-border-image: -webkit-gradient(
        linear, 0 0, 0 100%, from(var(--color-front)), to(rgba(0, 0, 0, 0))
    ) 1 100%;
    border-image: linear-gradient(
        to bottom, var(--color-front), rgba(0, 0, 0, 0)
    ) 1 100%;
    position: relative;
    margin-top: .5vmin;
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
}
</style>
