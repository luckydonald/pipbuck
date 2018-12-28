<template>
  <label>
    <slot></slot>
    <input
      type="checkbox"
      :checked="checked"
      @input="$emit('change', $event.target.checked)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: 'checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    console() {
      return console;
    },
  },
};
</script>

<style scoped lang="scss">
/* The container */
label {
  display: inline;
  position: relative;
  padding-left: 10vmin;
  padding-right: 2vmin;
  padding-left: 10vmin;
  margin-bottom: 6.7vmin;
  cursor: pointer;
  user-select: none;
  text-align: left;
}

/* Hide the browser's default checkbox */
label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 6.7vmin;
  width: 6.7vmin;
  background-color: transparent;
  border-width: 1vmin;
  border-style: solid;
  //border-color: greenyellow;  // set by (normal font) color.
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
label .checkmark:after {
  left: 2.4vmin;
  top: 1.3vmin;
  width: 1.3vmin;
  height: 2.6vmin;
  border-style: solid;
  //border-color: greenyellow;  // set by (normal font) color.
  border-width: 0 1vmin 1vmin 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
