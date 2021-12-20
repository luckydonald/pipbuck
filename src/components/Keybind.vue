<template>
  <span>
    <slot name="default">
      {{ keyLabel }})
    </slot>
  </span>
</template>

<script>
import * as KeyCode from 'keycode-js';

export const DISPLAY_TO_KEY_MAPPING = {
  [KeyCode.VALUE_CANCEL]: [KeyCode.KEY_CANCEL],
  [KeyCode.VALUE_HELP]: [KeyCode.KEY_HELP],
  [KeyCode.VALUE_BACK_SPACE]: [KeyCode.KEY_BACK_SPACE],
  [KeyCode.VALUE_TAB]: [KeyCode.KEY_TAB],
  [KeyCode.VALUE_CLEAR]: [KeyCode.KEY_CLEAR],
  [KeyCode.VALUE_RETURN]: [KeyCode.KEY_RETURN],
  [KeyCode.VALUE_SHIFT]: [KeyCode.KEY_SHIFT],
  [KeyCode.VALUE_CONTROL]: [KeyCode.KEY_CONTROL],
  [KeyCode.VALUE_ALT]: [KeyCode.KEY_ALT],
  [KeyCode.VALUE_PAUSE]: [KeyCode.KEY_PAUSE],
  [KeyCode.VALUE_CAPS_LOCK]: [KeyCode.KEY_CAPS_LOCK],
  [KeyCode.VALUE_ESCAPE]: [KeyCode.KEY_ESCAPE],
  [KeyCode.VALUE_SPACE]: [KeyCode.KEY_SPACE],
  [KeyCode.VALUE_PAGE_UP]: [KeyCode.KEY_PAGE_UP],
  [KeyCode.VALUE_PAGE_DOWN]: [KeyCode.KEY_PAGE_DOWN],
  [KeyCode.VALUE_END]: [KeyCode.KEY_END],
  [KeyCode.VALUE_HOME]: [KeyCode.KEY_HOME],
  [KeyCode.VALUE_LEFT]: [KeyCode.KEY_LEFT],
  [KeyCode.VALUE_UP]: [KeyCode.KEY_UP],
  [KeyCode.VALUE_RIGHT]: [KeyCode.KEY_RIGHT],
  [KeyCode.VALUE_DOWN]: [KeyCode.KEY_DOWN],
  [KeyCode.VALUE_PRINTSCREEN]: [KeyCode.KEY_PRINTSCREEN],
  [KeyCode.VALUE_INSERT]: [KeyCode.KEY_INSERT],
  [KeyCode.VALUE_DELETE]: [KeyCode.KEY_DELETE],
  0: [KeyCode.KEY_0, KeyCode.KEY_NUMPAD0],
  1: [KeyCode.KEY_1, KeyCode.KEY_NUMPAD1],
  2: [KeyCode.KEY_2, KeyCode.KEY_NUMPAD2],
  3: [KeyCode.KEY_3, KeyCode.KEY_NUMPAD3],
  4: [KeyCode.KEY_4, KeyCode.KEY_NUMPAD4],
  5: [KeyCode.KEY_5, KeyCode.KEY_NUMPAD5],
  6: [KeyCode.KEY_6, KeyCode.KEY_NUMPAD6],
  7: [KeyCode.KEY_7, KeyCode.KEY_NUMPAD7],
  8: [KeyCode.KEY_8, KeyCode.KEY_NUMPAD8],
  9: [KeyCode.KEY_9, KeyCode.KEY_NUMPAD9],
  A: [KeyCode.KEY_A],
  B: [KeyCode.KEY_B],
  C: [KeyCode.KEY_C],
  D: [KeyCode.KEY_D],
  E: [KeyCode.KEY_E],
  F: [KeyCode.KEY_F],
  G: [KeyCode.KEY_G],
  H: [KeyCode.KEY_H],
  I: [KeyCode.KEY_I],
  J: [KeyCode.KEY_J],
  K: [KeyCode.KEY_K],
  L: [KeyCode.KEY_L],
  M: [KeyCode.KEY_M],
  N: [KeyCode.KEY_N],
  O: [KeyCode.KEY_O],
  P: [KeyCode.KEY_P],
  Q: [KeyCode.KEY_Q],
  R: [KeyCode.KEY_R],
  S: [KeyCode.KEY_S],
  T: [KeyCode.KEY_T],
  U: [KeyCode.KEY_U],
  V: [KeyCode.KEY_V],
  W: [KeyCode.KEY_W],
  X: [KeyCode.KEY_X],
  Y: [KeyCode.KEY_Y],
  Z: [KeyCode.KEY_Z],
  '⌘': [KeyCode.KEY_LEFT_CMD, KeyCode.KEY_RIGHT_CMD],
  [KeyCode.VALUE_CONTEXT_MENU]: [KeyCode.KEY_CONTEXT_MENU],
  [KeyCode.VALUE_MULTIPLY]: [KeyCode.KEY_MULTIPLY],
  [KeyCode.VALUE_ADD]: [KeyCode.KEY_ADD],
  [KeyCode.VALUE_SUBTRACT]: [KeyCode.KEY_SUBTRACT],
  [KeyCode.VALUE_DECIMAL]: [KeyCode.KEY_DECIMAL],
  [KeyCode.VALUE_DIVIDE]: [KeyCode.KEY_DIVIDE],
  [KeyCode.VALUE_F1]: [KeyCode.KEY_F1],
  [KeyCode.VALUE_F2]: [KeyCode.KEY_F2],
  [KeyCode.VALUE_F3]: [KeyCode.KEY_F3],
  [KeyCode.VALUE_F4]: [KeyCode.KEY_F4],
  [KeyCode.VALUE_F5]: [KeyCode.KEY_F5],
  [KeyCode.VALUE_F6]: [KeyCode.KEY_F6],
  [KeyCode.VALUE_F7]: [KeyCode.KEY_F7],
  [KeyCode.VALUE_F8]: [KeyCode.KEY_F8],
  [KeyCode.VALUE_F9]: [KeyCode.KEY_F9],
  [KeyCode.VALUE_F10]: [KeyCode.KEY_F10],
  [KeyCode.VALUE_F11]: [KeyCode.KEY_F11],
  [KeyCode.VALUE_F12]: [KeyCode.KEY_F12],
  [KeyCode.VALUE_F13]: [KeyCode.KEY_F13],
  [KeyCode.VALUE_F14]: [KeyCode.KEY_F14],
  [KeyCode.VALUE_F15]: [KeyCode.KEY_F15],
  [KeyCode.VALUE_F16]: [KeyCode.KEY_F16],
  [KeyCode.VALUE_F17]: [KeyCode.KEY_F17],
  [KeyCode.VALUE_F18]: [KeyCode.KEY_F18],
  [KeyCode.VALUE_F19]: [KeyCode.KEY_F19],
  [KeyCode.VALUE_F20]: [KeyCode.KEY_F20],
  [KeyCode.VALUE_F21]: [KeyCode.KEY_F21],
  [KeyCode.VALUE_F22]: [KeyCode.KEY_F22],
  [KeyCode.VALUE_F23]: [KeyCode.KEY_F23],
  [KeyCode.VALUE_F24]: [KeyCode.KEY_F24],
  [KeyCode.VALUE_NUM_LOCK]: [KeyCode.KEY_NUM_LOCK],
  [KeyCode.VALUE_SCROLL_LOCK]: [KeyCode.KEY_SCROLL_LOCK],
  [KeyCode.VALUE_SEMICOLON]: [KeyCode.KEY_SEMICOLON],
  [KeyCode.VALUE_EQUALS]: [KeyCode.KEY_EQUALS],
  [KeyCode.VALUE_COMMA]: [KeyCode.KEY_COMMA],
  [KeyCode.VALUE_DASH]: [KeyCode.KEY_DASH],
  [KeyCode.VALUE_PERIOD]: [KeyCode.KEY_PERIOD],
  [KeyCode.VALUE_SLASH]: [KeyCode.KEY_SLASH],
  [KeyCode.VALUE_BACK_QUOTE]: [KeyCode.KEY_BACK_QUOTE],
  [KeyCode.VALUE_OPEN_BRACKET]: [KeyCode.KEY_OPEN_BRACKET],
  [KeyCode.VALUE_BACK_SLASH]: [KeyCode.KEY_BACK_SLASH],
  [KeyCode.VALUE_CLOSE_BRACKET]: [KeyCode.KEY_CLOSE_BRACKET],
  [KeyCode.VALUE_QUOTE]: [KeyCode.KEY_QUOTE],
};
/*
const invertKeyValues = (obj, fn) => Object.keys(obj).reduce((acc, key) => {
  const val = fn ? fn(obj[key]) : obj[key];
  acc[val] = acc[val] || [];
  acc[val].push(key);
  return acc;
}, {});

export const KEY_TO_DISPLAY_MAPPING = invertKeyValues(DISPLAY_TO_KEY_MAPPING);
*/
export default {
  name: 'Keybind',
  props: {
    keyLabel: {
      type: String,
      required: true,
    },
    display: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      boundFunction: null,
    };
  },
  mounted() {
    this.boundFunction = this.onKeyDown.bind(this);
    window.addEventListener('keyup', this.boundFunction);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.boundFunction);
  },
  computed: {
    keyCodes() {
      return DISPLAY_TO_KEY_MAPPING[this.keyLabel];
    },
  },
  methods: {
    onKeyDown(e) {
      const isOurKey = this.keyCodes.indexOf(e.keyCode) !== -1;
      if (isOurKey) {
        // basically this.$emit('keybind', e.keyCode, this.keyCodes, e);
        // but with a native event to work.
        const event = new CustomEvent('click', {
          detail: {
            keyCode: e.keyCode,
            keyCodes: this.keyCodes,
            keyEvent: e,
          },
          bubbles: true,
          cancelable: true,
          composed: false,
        });
        this.$el.dispatchEvent(event);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
