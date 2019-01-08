<template>
  <div class="page-wrapper">
    <div class="stats">
      <div class="row">
        <div class="edge left down" />
        <div class="hr left" />
        <a class="title">{{ title }}</a>
        <div class="hr middle" />
        <div class="grouping" v-if="!disableStats">
          <slot name="statistics">
            <div class="stat">Batz 42</div>
            <div class="stat">Foo 1337</div>
            <div class="stat">Bar 4458</div>
            <div class="stat">BP L.Pip</div>
          </slot>
        </div>
        <div class="edge right down" />
      </div>
    </div>
    <div id="nav" class="nav">
      <div class="edge left up" />
      <div class="hr" />
      <template v-for="link in links">
        <router-link :key="`${link.label}_link`" class="item" :to="link.to" @click.native="playTab">
          {{ link.label }}
        </router-link>
        <div :key="`${link.label}_hr`" class="hr" />
      </template>
      <div class="edge right up" />
    </div>
    <div class="page-content">
      <slot><Placeholder/></slot>
    </div>
  </div>
</template>

<script>
import { ui } from '../sound';
import Placeholder from './Placeholder.vue';

export default {
  name: 'Menu',
  components: { Placeholder },
  props: {
    title: {
      default: 'Info',
      type: String,
    },
    links: {
      default() {
        return [];
      },
      type: Array,
    },
    disableStats: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    playTab(event) {
      this.$emit('pipbuck-play', ui.sounds.nav_tab);
    },
  },
};
</script>

<style scoped lang="scss">

.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.current {
  flex-shrink: 0;
  order: -1;
}
.page-content {
  height: 70%;  // why the fuck not 100% ?
  flex-shrink: 1;
  flex-grow: 1;
  order: 1;
  position: relative;
  box-sizing: padding-box;
  padding-right: 2vmin;

  & > * {
    height: 100%;
  }
}
.nav, .stats > .row {
  flex-shrink: 0;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-left: 2vmin;
  padding-right: 2vmin;
}
.stats {
  order: 0;
  margin-bottom: 5vmin;
  //align-items: flex-end;
  flex-direction: column;
  display: flex;
  //height: 3em;
  //background-color: hotpink;

  width: 100%;
  justify-content: flex-start;

  .hr.left {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 7.5vmin;
  }
  .hr.middle {
    flex-grow: 4;
    flex-shrink: 2;
  }
  .hr.right {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 7.5vmin;
  }
  .grouping {  // stats
    flex-shrink: 4;
    flex-grow: 1;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-content: stretch;

    .stat {
      flex-shrink: 1;
      flex-grow: 1;
      white-space: nowrap;
      margin-left: 1.2vmin;
      &:first-child {
        margin-left: 0;
        text-align: right;
      }
    }
  }
}

.nav {
  order: 2;
  margin-top: 1vmin;
}
.item, .title, .stat {
  flex-shrink: 0;
  flex-grow: 0;
  border: transparent 0.75vmin solid;

  &.router-link-active, .active {
    border-color: var(--color-front);
  }
  padding: 0.75vmin 1vmin;
}
.title {
  text-transform: uppercase;
  letter-spacing: +0.05em;
}
.stat {
  position: absolute;
  top: calc(50% - 1vmin);

  padding: 0.5vmin 1vmin;

  width: (100% / 3);

  flex-grow: 1;

  display: block;
  justify-content: space-between;

  // right border is fading
  border-left-width: 0;
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

  &.ammunition {
    flex-grow: 2;
  }
}

.hr {
  align-self: center;
  border-bottom: .75vmin solid; /* whichever color you prefer */
  flex-shrink: 1;
  flex-grow: 1;
}
.edge {
  //align-self: flex-start;

  &.up {
    -webkit-border-image: -webkit-gradient(
        linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0)), to(var(--color-front))
    ) 1 100%;
    border-image: linear-gradient(
        to bottom, rgba(0, 0, 0, 0), var(--color-front)
    ) 1 100%;
  }
  &.down {
    -webkit-border-image: -webkit-gradient(
        linear, 0 100%, 0 0, from(rgba(0, 0, 0, 0)), to(var(--color-front))
    ) 1 100%;
    border-image: linear-gradient(
        to top, rgba(0, 0, 0, 0), var(--color-front)
    ) 1 100%;
  }

  // prepare for creating a top border per :after
  position: relative;
  &.right {
    border-right-width: 0.75vmin;
    border-right-style: solid;
    border-right-color: transparent;
    &.up {
      transform: translateY(-50%) translateX(-.5vmin);
    }
    &.down {
      transform: translateY(+50%) translateX(-.5vmin);
    }
  }
  &.left {
    border-left-width: 0.75vmin;
    border-left-style: solid;
    border-left-color: transparent;
    &.up {
      transform: translateY(-50%) translateX(.5vmin);
    }
    &.down {
      transform: translateY(+50%) translateX(.5vmin);
    }
  }
}
</style>
