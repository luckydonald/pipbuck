<template>
  <div class="page-wrapper">
    <div class="stats">
      <div class="row">
        <div class="edge left down" />
        <div class="hr left" />
        <a class="title" @click="navigateToTitle">{{ title }}</a>
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
    /** You can specify a link to be navigated to when the title is clicked. */
    titleLink: {
      default: null,
      type: Object,
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
      ui.audio.play(ui.sounds.nav_tab);
    },
    navigateToTitle() {
      if (this.titleLink) {
        this.playTab();
        console.log(this.titleLink);
        this.$router.push(this.titleLink);
      }
    },
  },
};
</script>

<style scoped lang="scss">
$border-width: 0.75vmin;

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

  & > .row {
    justify-content: flex-start;
  }

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
    padding-top: $border-width;

    .stat {
      flex-shrink: 1;
      flex-grow: 1;
      white-space: nowrap;
      margin-left: 1.2vmin;
      &:first-child {
        margin-left: 0;
        text-align: right;
      }
      &:last-child::after {
        display: none;
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
  border: transparent $border-width solid;

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
  top: 50%;
  padding: 0.5vmin 1vmin;

  width: (100% / 3);

  flex-grow: 1;

  display: block;
  justify-content: space-between;

  // right border is fading
  border: none;
  border-top-width: calc(#{$border-width} - 0.25px);
  border-top-style: solid;
  // prepare for creating a top border per :before
  position: relative;
  margin-top: -$border-width;  // space for border top
  padding-right: 2vmin;

  &::after {
    position: absolute;
    content: "";
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    //margin-right: -$border-width;  // space for border top

    border-right-width: $border-width;
    border-right-style: solid;
    border-right-color: var(--color-front);
    -webkit-border-image: -webkit-gradient(
        linear, 0 0, 0 100%, from(var(--color-front)), to(rgba(0, 0, 0, 0))
    ) 1 100%;
    border-image: linear-gradient(
        to bottom, var(--color-front), rgba(0, 0, 0, 0)
    ) 1 100%;

  }
  &.ammunition {
    flex-grow: 2;
  }
}

.hr {
  align-self: center;
  border-top: $border-width solid;
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
    border-right-width: $border-width;
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
    border-left-width: $border-width;
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
