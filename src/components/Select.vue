<template>
  <div class="select">
    <a @click="isOpen = true"><slot v-if="currentLabel === null" name="button">{{ placeholder }}</slot><span v-else>{{ currentLabel }}</span></a>
    <div class="dropdown" v-if="isOpen">
      <div class="background" @click="isOpen = false"/>
      <div class="inner">
        <label class="disabled" @click=" isOpen = false" v-if="showPlaceholderInDropdown"><slot name="button">{{ placeholder }}</slot><span class="bg"/></label>
        <slot name="item" v-for="item in items">
          <label :key="item.id" :class="{ disabled: item.disabled || false }">
            <input
              type="radio" class="hidden-radio"
              :name="`select_${hash}_[${item.id}]`"
              :value="item.id"  :key="item.id"
              @input="$emit('change', item.id); isOpen = false"
            />{{ item.name }}<span class="bg"/></label>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    selectedId: {
      default: null,
      /* null or string */
    },
    items: {
      default: [],
    },
    placeholder: {
      default: 'Select…',
      type: String,
    },
    showPlaceholderInDropdown: {
      default: true,
      type: Boolean,
    },
  },
  model: {
    prop: 'selectedId',
    event: 'change',
  },
  data() {
    return {
      hash: Math.random().toString(16).substr(2, 8),
      isOpen: false,
    };
  },
  computed: {
    currentLabel() {
      const id = this.selectedId;
      console.log(`Getting label for ${id}.`);
      const currentElement = this.items.filter(item => item.id === id).map(item => item.name);
      if (currentElement.length > 0) {
        if (currentElement.length > 1) {
          console.warn(`More than one item matching ${id}: `, currentElement);
        }
        return currentElement[0];
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">

input {
  display: none;
}

.select {
  display: inline-block;
  // width: 160px;
  // height: 34px;
  // line-height: 30px;
  position: relative;
  padding-right: 0.5em;


  &::after {
    // content: " ";
    content: '\25BC';
    // background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzIiPjxwYXRoIGQ9Im0yNCAxMi04IDEwLTgtMTB6Ii8+PHBhdGggZD0iTTAgMGgzMnYzMkgweiIgc3R5bGU9ImZpbGw6bm9uZSIvPjwvc3ZnPgo=) no-repeat right 0.8em center / 1.4em;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;

    //padding-left: 1em;
  }
}
.dropdown {
  position: fixed;
  // left: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  .background {
    background: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 0.75vmin solid var(--color-front);
    border-image: linear-gradient(to top, var(--color-front) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, var(--color-front) 90%);
    border-image-slice: 1;
    padding: 0.5em 1em;
    background: rgba(0,0,0,0.75);

    label {
      position: relative;
      display: table;
      width: 100% !important;

      border: 0.75vmin solid transparent;
      padding: 0.5em;

      &.disabled {
        opacity: 0.5;
      }
      &:hover {
        border-color: var(--color-front);

        span.bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-front);
          opacity: 0.2;
        }

        &.disabled {
          border-color: transparent;

          span.bg {
            opacity: 0.1;
          }
        }
      }
    }
  }
}
</style>
