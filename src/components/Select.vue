<template>
  <div class="select">
    <a @click="isOpen = true" class="clicker"><slot v-if="currentLabel === null" name="button">{{ placeholder }}</slot><span v-else>{{ currentLabel }}</span></a>
    <Overlay class="dropdown" v-model="isOpen">
        <label class="disabled" @click=" isOpen = false" v-if="showPlaceholderInDropdown"><slot name="button">{{ placeholder }}</slot><span class="bg"/></label>
        <slot name="item" v-for="item in items">
          <label :key="item.id" :class="{ disabled: item.disabled || false }">
            <input
              type="radio" class="hidden-radio"
              :value="item.id"  :key="item.id"
              @input="$emit('change', item.id); isOpen = false"
            />{{ item.name }}<span class="bg"/></label>
        </slot>
    </Overlay>
  </div>
</template>

<script>
import Overlay from './Overlay.vue';

export default {
  name: 'Select',
  components: { Overlay },
  props: {
    selectedId: {
      default: null,
      /* null or string */
    },
    items: {
      default: [],
      /* List of objects.
      Needed fields are 'id': Any and 'name': str.
      Optionally you can add 'disabled': bool.
      */
    },
    placeholder: {
      default: 'Select…',
      type: String,
    },
    showPlaceholderInDropdown: {
      default: false,
      type: Boolean,
    },
  },
  model: {
    prop: 'selectedId',
    event: 'change',
  },
  data() {
    return {
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
  position: relative;
  padding-right: 1em;
  border: 0.75vmin solid var(--color-front);


  &::after {
    content: '\25BC';
    position: absolute;
    top: 0;
    right: 0.45em;
    height: 100%;
  }
}
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
</style>
