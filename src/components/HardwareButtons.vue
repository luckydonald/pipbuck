<template>
  <div class="hardware bottom" :class="position">
    <div
      class="hardware-button" id="stats"
      @touchstart="multitabHandler"
      @click="multitabHandler"
    ><label for="stats">Stats</label>
    </div>

    <div
      class="hardware-button" id="items"
      @touchstart="multitabHandler"
      @click="multitabHandler"
    ><label for="items">Items</label>
    </div>

    <div
      class="hardware-button" id="data"
      @touchstart="multitabHandler"
      @click="multitabHandler"
    ><label for="data"> Data</label>
    </div>
  </div>
</template>

<script>
import { sounds } from '../sound';

export default {
  name: 'HardwareButtons',
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
      this.$emit('pipbuck-play', sounds.nav_mode);
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
  .hardware.left, .hardware.right {
    flex-direction: column;
  }
  .hardware-button {
    user-select: none;
    // background/border
    width: 32px;
    height: 32px;
    background: #000;
    display: inline-block;
    position: relative;
    border-radius: 150px;

    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    .hardware.top > & {
      margin-top: 2rem;
    }
    .hardware.bottom > & {
      margin-bottom: 2rem;
    }
    .hardware.left > & {
      margin-left: 2rem;
      transform: rotate(90deg);
    }
    .hardware.right > & {
      margin-right: 2rem;
      transform: rotate(-90deg);
    }


    label {
      position: absolute;
      text-align: center;
      width: auto;
      color: #d8c99e;

      .hardware.bottom > & {
        top: 2rem;
        bottom: auto;
        left: -25%;
        right: -25%;
      }
      .hardware.top > & {
        top: auto;
        bottom: 2rem;
        left: -25%;
        right: -25%;
      }
      .hardware.right > & {
        top: 2rem;
        left: -25%;
        right: -25%;
      }
    }
  }
  .hardware-button.power::before {
    // label
    content: "Power";
    display: block;
    position: absolute;
    right: -29px;
    top: 5px;
    font-size: 8px;
    transform: rotate(5deg);
  }
  .hardware-button::after {
    // yellow led
    content: "";
    display: block;
    width: 22px;
    height: 22px;
    background: radial-gradient(white,yellow,orange,red);
    border-radius: 150px;
    margin-left: 5px;
    margin-top: 6px;
    // animation: hardware-button-flicker;
    animation-duration: 4s;
    animation-iteration-count: infinite;
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
