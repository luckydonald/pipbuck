<template>
  <div class="hardware" :class="position">
    <router-link :to="{ name: 'Stats' }"
      class="hardware-button" id="stats"
      @click.native="$emit('pipbuck-play', sounds.nav_mode)"
    ><label for="stats">Stats</label>
    </router-link>

    <router-link :to="{ name: 'Items' }"
      class="hardware-button" id="items"
      @click.native="$emit('pipbuck-play', sounds.nav_mode)"
    ><label for="items">Items</label>
    </router-link>

    <router-link :to="{ name: 'Data' }"
      class="hardware-button" id="data"
      @click.native="$emit('pipbuck-play', sounds.nav_mode)"
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
      sounds: ui.sounds,
    };
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
  .hardware.top {
    flex-direction: row-reverse;
  }
  .hardware.bottom {
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
    background-color: rgba(1, 1, 1, 0.60);
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
      background: radial-gradient(#e79d00, #eca000, #d79200, #d79200);
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
        bottom: $button-margin;
        top: auto;
        left: -25%;
        right: -25%;
        transform: rotateZ(180deg);
      }
      .hardware.right > & {
        text-align: center;
        width: 100%;
        left: 110%;
        top: 0;
        bottom: 0;
        transform: rotateZ(-90deg);
      }
      .hardware.left > & {
        text-align: center;
        width: 100%;
        left: -100%;
        top: 0;
        bottom: 0;
        transform: rotateZ(+90deg);
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
