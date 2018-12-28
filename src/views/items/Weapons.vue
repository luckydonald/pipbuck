<template>
  <div class="page">
    <ul class="list">
      <li v-for="weapon in this.weapons" :key="weapon.baseId">
        <a class="weapon">
          {{weapon.name}}<span v-if="weapon.amount > 1"> ({{weapon.amount}})</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import weapons from '../../data/weapons';

export default {
  name: 'Weapons',
  amount: 1,
  data() {
    return {
      weapons,
    };
  },
};
</script>

<style scoped lang="scss">
$width: 44vw;

ul.list {
  width: $width;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

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
</style>
