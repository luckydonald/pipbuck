<template>
  <select @input="$emit('change', currentItemId)"> <!-- v-model="currentItemId" -->
    <slot name="options">
      <option
        v-for="item in items"
        :key="item.id"
        :value="item.id"
        :label="item.name"
        :selected="item.id === currentItemId"
      >
        {{ item.name }}
      </option>
    </slot>
  </select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    currentItemId: {
      default: null,
      type: String,
    },
    items: {
      default: [],
    },
  },
  model: {
    prop: 'currentItemId',
    event: 'change',
  },
};
</script>

<style scoped lang="scss">

select {
  background: transparent;
  border-width: 1vmin;
  border-style: solid;
  -webkit-appearance:none; // remove glossy 3D effect etc.
  color: var(--color-front);
  $glass: rgba(255, 255, 255, 0.2);
  $glass-icon: rgba(255, 255, 255, 0.3);
  $gradient: linear-gradient(35deg, red, purple);
  $option: #320a28;
  padding: 0 4em 0 1em;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzIiPjxwYXRoIGQ9Im0yNCAxMi04IDEwLTgtMTB6Ii8+PHBhdGggZD0iTTAgMGgzMnYzMkgweiIgc3R5bGU9ImZpbGw6bm9uZSIvPjwvc3ZnPgo=) no-repeat right 0.8em center / 1.4em;
  // color set by normal (front/font) color
}

</style>
