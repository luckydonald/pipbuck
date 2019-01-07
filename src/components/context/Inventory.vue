<template>
  <div class="page">
    <scrollbar
      class="scroll-wrapper"
      content-class=""
      scrollbar-class="scroll"
      :items="itemSelection"
      @equip="$emit('equip', $event)"
      @unequip="$emit('unequip', $event)"
      :selected="activeId"
      @select="$emit('select', $event)"
    >
      <template slot-scope="item">
        <a class="item">
          {{ item.name }}
          <span v-if="item.amount > 1"> ({{item.amount}})</span>
        </a>
      </template>
    </scrollbar>

    <div class="details">
      <div class="image">
        <svg-unknown :style="{ fill: 'var(--color-front)' }"/>
      </div>
      <slot name="rows" is="div">Data would be here.</slot>
    </div>
  </div>
</template>

<script>
import Scrollbar from './Scrollbar.vue';
import SvgUnknown from '../../assets/img/ui/items/unknown.svg';
import InventoryMixin from './InventoryMixin';

export default {
  name: 'Inventory',
  components: { Scrollbar, SvgUnknown },
  mixins: [InventoryMixin],
  delimiters: ['{{', '}}'],
  model: {
    prop: 'activeId',
    event: 'select',
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: -1,
    },
    activeId: {
      default() {
        const hasItems = (
          this.items !== undefined
          && typeof this.items === 'object'
          && Array.isArray(this.items)
          && this.items.length > 0
        );
        return hasItems ? this.items[0].baseId : null;
      },
    },
  },
  data() {
    return {
      console,
    };
  },
  computed: {
    itemSelection() {
      if (typeof this.limit === 'number' && this.limit >= 0) {
        return this.items.slice(0, this.limit);
      }
      return this.items;
    },
  },
  watch: {
    activeId(newId) {
      this.$emit('select', newId);
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.scroll-wrapper {
  order: 0;
  flex-grow: 1;
  flex-shrink: 1;
}
.apparel {
  text-align: left;
  width: 100%;
}

.details {
  order: 2;
  flex-grow: 0;
  flex-shrink: 0;
  width: 70vmin;
  padding-top: -10%;
  // right: 2vmin;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: flex-end;
  justify-content: flex-end;

  .image {
    order: 0;
    padding: 10vmin;
    top:10vmin;
    flex-shrink: 2;
    box-sizing: border-box;
    > svg {
      box-sizing: border-box;
    }
  }

  .row{
    order: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .detail {
    display: flex;
    justify-content: space-between;

    padding: 0.5vmin 1vmin;
    white-space: nowrap;
    $detail-margin-left: 1.2vmin;
    margin-left: $detail-margin-left;

    width: (100% / 3);
    flex-grow: 1;

    &.cols-2 {
      width: calc(#{((100% / 3) * 2)} + #{$detail-margin-left});
      flex-grow: 2;
    }
    &.cols-3 {
      width: 100%;
      flex-grow: 3;
    }


    // right border is fading
    border-right-width: .75vmin;
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
    margin-top: .75vmin;  // space for border top

    &:after {
      position: absolute;
      content: "";
      top: -.5vmin;
      left: 0;
      right: -.5vmin;
      height: .5vmin;
      background-color: var(--color-front);
    }

    &.blank {
      border-right-color: transparent;
      border-image: none;
      &:after {
        background-color: transparent;
      }
    }
    > .label,
    > .value {
      display: inline;
    }
    > .value.percentage {
      width: 100%;
      height: 100%;
      padding-left: 2vmin;
      display: flex;
      & > .bar {
        height: 3.5vmin;
        width: 100%;
        align-self: center;
      }
    }
  }
}
</style>
