<template>
  <div class="hardware bottom" :class="position">
    <router-link :to="{ name: 'Stats' }"
      class="hardware-button" id="stats"
      @touchstart="multitabHandler"
      @click.prevent="multitabHandler"
    ><label for="stats">Stats</label>
    </router-link>

    <router-link :to="{ name: 'Items' }"
      class="hardware-button" id="items"
      @touchstart="multitabHandler"
      @click.prevent="multitabHandler"
    ><label for="items">Items</label>
    </router-link>

    <router-link :to="{ name: 'Data' }"
      class="hardware-button" id="data"
      @touchstart="multitabHandler"
      @click.prevent="multitabHandler"
    ><label for="data">Data</label>
    </router-link>
  </div>
</template>

<script>
import { ui } from '../sound';

export default {
  name: 'VirtualButtons',
  props: {
    position: {
      default: 'bottom',
    },
  },
  data() {
    return {
      tab_counter: {
        stats: { count: 0, timeout: null, last_type: null },
        items: { count: 0, timeout: null, last_type: null },
        data: { count: 0, timeout: null, last_type: null },
      },
      tab_timeouts: {},
      tab_timeout_ms: 500,
      tab_needs: 5,
    };
  },
  methods: {
    multitabHandler(event) {
      this.$emit('pipbuck-play', ui.sounds.nav_mode);
      const key = event.target.id;
      this.$router.push({ path: `/${key}` });
      console.log(
        'inner', {
          key, event, self: this, counter: this.tab_counter[key],
        },
      );
      if (this.tab_counter[key] === undefined) {
        this.$set(this.tab_counter, key, { count: 0, timeout: null, last_type: event.type });
      }
      if (
        this.tab_counter[key].last_type === null
        || this.tab_counter[key].last_type === undefined
      ) {
        this.$set(this.tab_counter[key], 'last_type', event.type);
        this.tab_counter[key].last_type = event.type;
      } else if (
        this.tab_counter[key].last_type !== event.type
      ) {
        console.log(
          `ignoring event: last event was type ${this.tab_counter[key].last_type},`
          + `but we got ${event.type}.`,
        );
        return false;
      }
      this.tab_counter[key].count = this.tab_counter[key].count + 1;
      // this.$set(this.tab_counter, `${key}.count`, this.tab_counter[key].count + 1);

      if (this.tab_counter[key].count < this.tab_needs) {
        // we are still counting
        clearTimeout(this.tab_counter[key].timeout);
        this.tab_counter[key].timeout = setTimeout(() => {
          // failed counting
          this.tab_counter[key] = { count: 0, timeout: null, last_type: null };
          this.$emit(event.type, event);
          this.multitabFail(event, key);
        }, this.tab_timeout_ms);
        return false; // needs another round
      }
      // action on successful multi-tap goes below
      clearTimeout(this.tab_counter[key].timeout);
      this.tab_counter[key] = { count: 0, timeout: null };
      event.preventDefault();
      this.multitabSucceed(event, key);
      return true;
    },
    multitabSucceed(event, key) { // (event, key)
      console.log('success', event, key);
      this.$router.push({ path: `/${key}/extra` });
    },
    multitabFail(event, key) {
      console.log('fail', event, key);
    },
  },
};
</script>

<style scoped lang="scss">
  .hardware {
    background: #7e6d5b;
    text-align: center;
    display: flex;
    justify-content: center;
    z-index: 20;
  }
  .hardware.bottom, .hardware.top {
    flex-direction: row;
  }
  .hardware.left {
    flex-direction: column;
  }
  .hardware.right {
    flex-direction: column-reverse;
  }
  $button-size: 10vmin;
  $button-margin: 10vmin;
  .hardware-button {
    user-select: none;
    // background/border
    width: 10vmin;
    height: 10vmin;
    padding: 0;
    background-color: #5e4d00;
    display: inline-block;
    position: relative;
    border-radius: 100%;
    box-sizing: content-box;

    margin-top: 4vmin;
    margin-left: 4vmin;
    margin-right: 4vmin;
    margin-bottom: 4vmin;
    $margin-button-bottom: 1.60vmin;
    $margin-button-sides: 0.75vmin;

    .hardware.top > & {
      margin-top: $button-margin;
    }
    .hardware.bottom > & {
      margin-bottom: $button-margin;
    }
    .hardware.left > & {
      margin-left: $button-margin;
    }
    .hardware.right > & {
      margin-right: $button-margin;
    }


    &::before, &::after {
      content: "";
      display: block;
      width: 9vmin;
      height: 9vmin;
      border-radius: 100%;
      border: 0;
      margin-left: 1.60vmin; // TODO: orient
      margin-top: 0.75vmin; // TODO: orient
      box-sizing: content-box;
      position: absolute;
    }
    &::before {
      // yellow led
      background: radial-gradient(#e79d00, #eca000, #d79200, black);
      // animation: hardware-button-flicker;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      //margin-left: 2vmin;
      //box-shadow: x y blur scale color
      box-shadow: -0.1vmin 0 0 -0.125vmin #b77c00,
                  -0.2vmin 0 0 -0.125vmin #b77c00,
                  -0.3vmin 0 0 -0.125vmin #b77c00,
                  -0.4vmin 0 0 -0.125vmin #b77c00,
                  -0.5vmin 0 0 -0.125vmin #b77c00,
                  -0.6vmin 0 0 -0.125vmin #b77c00,
                  -0.7vmin 0 0 -0.125vmin #b77c00,
                  -0.8vmin 0 0 -0.125vmin #b77c00,
      ;
    }
    &.router-link-active {
      &::after {
        margin-left: 1vmin; // TODO: orient
        box-shadow: 0 0 2vmin 0.75vmin #ffd100;
      }
      &::before {
        background: radial-gradient(white, yellow, #ffd700, orange);
        box-shadow: -0.1vmin 0 0 -0.125vmin #efca00,
                    -0.2vmin 0 0 -0.125vmin #efca00,
                    -0.3vmin 0 0 -0.125vmin #efca00,
                    -0.4vmin 0 0 -0.125vmin #efca00,
                    -0.5vmin 0 0 -0.125vmin #efca00,
                    -0.6vmin 0 0 -0.125vmin #efca00,
                    -0.7vmin 0 0 -0.125vmin #efca00,
                    -0.8vmin 0 0 -0.125vmin #efca00,
        ;
      }
    }


    label {
      position: absolute;
      text-align: center;
      width: auto;
      color: #d8c99e;

      .hardware.bottom > & {
        top: $button-margin;
        bottom: auto;
        left: -25%;
        right: -25%;
      }
      .hardware.top > & {
        top: auto;
        bottom: $button-margin;
        left: -25%;
        right: -25%;
      }
      .hardware.right > & {
        top: $button-margin;
        left: -25%;
        right: -25%;
      }
    }
  }

  @keyframes hardware-button-flicker {
    0% {
      box-shadow: 0 0 5px 0 orange;
    }
    5% {
      box-shadow: 0 0 30px 2px orange;
    }
    60% {
      box-shadow: 0 0 30px 2px orange;
    }
    80% {
      box-shadow: 0 0 10px 0 orange;
    }
    90% {
      box-shadow: 0 0 30px 2px orange;
    }
    100% {
      box-shadow: 0 0 0 0 orange;
    }
  }
</style>
