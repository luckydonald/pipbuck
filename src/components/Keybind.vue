<template>
  <span>
    <slot name="default">
      {{ akey }})
    </slot>
  </span>
</template>

<script>
import * as KeyCode from 'keycode-js';

export const KEY_TO_DISPLAY_MAPPING = {
  [KeyCode.KEY_CANCEL]: KeyCode.VALUE_CANCEL,
  [KeyCode.KEY_HELP]: KeyCode.VALUE_HELP,
  [KeyCode.KEY_BACK_SPACE]: KeyCode.VALUE_BACK_SPACE,
  [KeyCode.KEY_TAB]: KeyCode.VALUE_TAB,
  [KeyCode.KEY_CLEAR]: KeyCode.VALUE_CLEAR,
  [KeyCode.KEY_RETURN]: KeyCode.VALUE_RETURN,
  [KeyCode.KEY_SHIFT]: KeyCode.VALUE_SHIFT,
  [KeyCode.KEY_CONTROL]: KeyCode.VALUE_CONTROL,
  [KeyCode.KEY_ALT]: KeyCode.VALUE_ALT,
  [KeyCode.KEY_PAUSE]: KeyCode.VALUE_PAUSE,
  [KeyCode.KEY_CAPS_LOCK]: KeyCode.VALUE_CAPS_LOCK,
  [KeyCode.KEY_ESCAPE]: KeyCode.VALUE_ESCAPE,
  [KeyCode.KEY_SPACE]: KeyCode.VALUE_SPACE,
  [KeyCode.KEY_PAGE_UP]: KeyCode.VALUE_PAGE_UP,
  [KeyCode.KEY_PAGE_DOWN]: KeyCode.VALUE_PAGE_DOWN,
  [KeyCode.KEY_END]: KeyCode.VALUE_END,
  [KeyCode.KEY_HOME]: KeyCode.VALUE_HOME,
  [KeyCode.KEY_LEFT]: KeyCode.VALUE_LEFT,
  [KeyCode.KEY_UP]: KeyCode.VALUE_UP,
  [KeyCode.KEY_RIGHT]: KeyCode.VALUE_RIGHT,
  [KeyCode.KEY_DOWN]: KeyCode.VALUE_DOWN,
  [KeyCode.KEY_PRINTSCREEN]: KeyCode.VALUE_PRINTSCREEN,
  [KeyCode.KEY_INSERT]: KeyCode.VALUE_INSERT,
  [KeyCode.KEY_DELETE]: KeyCode.VALUE_DELETE,
  [KeyCode.KEY_0]: '0',
  [KeyCode.KEY_1]: '1',
  [KeyCode.KEY_2]: '2',
  [KeyCode.KEY_3]: '3',
  [KeyCode.KEY_4]: '4',
  [KeyCode.KEY_5]: '5',
  [KeyCode.KEY_6]: '6',
  [KeyCode.KEY_7]: '7',
  [KeyCode.KEY_8]: '8',
  [KeyCode.KEY_9]: '9',
  [KeyCode.KEY_A]: 'A',
  [KeyCode.KEY_B]: 'B',
  [KeyCode.KEY_C]: 'C',
  [KeyCode.KEY_D]: 'D',
  [KeyCode.KEY_E]: 'E',
  [KeyCode.KEY_F]: 'F',
  [KeyCode.KEY_G]: 'G',
  [KeyCode.KEY_H]: 'H',
  [KeyCode.KEY_I]: 'I',
  [KeyCode.KEY_J]: 'J',
  [KeyCode.KEY_K]: 'K',
  [KeyCode.KEY_L]: 'L',
  [KeyCode.KEY_M]: 'M',
  [KeyCode.KEY_N]: 'N',
  [KeyCode.KEY_O]: 'O',
  [KeyCode.KEY_P]: 'P',
  [KeyCode.KEY_Q]: 'Q',
  [KeyCode.KEY_R]: 'R',
  [KeyCode.KEY_S]: 'S',
  [KeyCode.KEY_T]: 'T',
  [KeyCode.KEY_U]: 'U',
  [KeyCode.KEY_V]: 'V',
  [KeyCode.KEY_W]: 'W',
  [KeyCode.KEY_X]: 'X',
  [KeyCode.KEY_Y]: 'Y',
  [KeyCode.KEY_Z]: 'Z',
  [KeyCode.KEY_LEFT_CMD]: '⌘',
  [KeyCode.KEY_RIGHT_CMD]: '⌘',
  [KeyCode.KEY_CONTEXT_MENU]: KeyCode.VALUE_CONTEXT_MENU,
  [KeyCode.KEY_NUMPAD0]: '0',
  [KeyCode.KEY_NUMPAD1]: '1',
  [KeyCode.KEY_NUMPAD2]: '2',
  [KeyCode.KEY_NUMPAD3]: '3',
  [KeyCode.KEY_NUMPAD4]: '4',
  [KeyCode.KEY_NUMPAD5]: '5',
  [KeyCode.KEY_NUMPAD6]: '6',
  [KeyCode.KEY_NUMPAD7]: '7',
  [KeyCode.KEY_NUMPAD8]: '8',
  [KeyCode.KEY_NUMPAD9]: '9',
  [KeyCode.KEY_MULTIPLY]: KeyCode.VALUE_MULTIPLY,
  [KeyCode.KEY_ADD]: KeyCode.VALUE_ADD,
  [KeyCode.KEY_SUBTRACT]: KeyCode.VALUE_SUBTRACT,
  [KeyCode.KEY_DECIMAL]: KeyCode.VALUE_DECIMAL,
  [KeyCode.KEY_DIVIDE]: KeyCode.VALUE_DIVIDE,
  [KeyCode.KEY_F1]: KeyCode.VALUE_F1,
  [KeyCode.KEY_F2]: KeyCode.VALUE_F2,
  [KeyCode.KEY_F3]: KeyCode.VALUE_F3,
  [KeyCode.KEY_F4]: KeyCode.VALUE_F4,
  [KeyCode.KEY_F5]: KeyCode.VALUE_F5,
  [KeyCode.KEY_F6]: KeyCode.VALUE_F6,
  [KeyCode.KEY_F7]: KeyCode.VALUE_F7,
  [KeyCode.KEY_F8]: KeyCode.VALUE_F8,
  [KeyCode.KEY_F9]: KeyCode.VALUE_F9,
  [KeyCode.KEY_F10]: KeyCode.VALUE_F10,
  [KeyCode.KEY_F11]: KeyCode.VALUE_F11,
  [KeyCode.KEY_F12]: KeyCode.VALUE_F12,
  [KeyCode.KEY_F13]: KeyCode.VALUE_F13,
  [KeyCode.KEY_F14]: KeyCode.VALUE_F14,
  [KeyCode.KEY_F15]: KeyCode.VALUE_F15,
  [KeyCode.KEY_F16]: KeyCode.VALUE_F16,
  [KeyCode.KEY_F17]: KeyCode.VALUE_F17,
  [KeyCode.KEY_F18]: KeyCode.VALUE_F18,
  [KeyCode.KEY_F19]: KeyCode.VALUE_F19,
  [KeyCode.KEY_F20]: KeyCode.VALUE_F20,
  [KeyCode.KEY_F21]: KeyCode.VALUE_F21,
  [KeyCode.KEY_F22]: KeyCode.VALUE_F22,
  [KeyCode.KEY_F23]: KeyCode.VALUE_F23,
  [KeyCode.KEY_F24]: KeyCode.VALUE_F24,
  [KeyCode.KEY_NUM_LOCK]: KeyCode.VALUE_NUM_LOCK,
  [KeyCode.KEY_SCROLL_LOCK]: KeyCode.VALUE_SCROLL_LOCK,
  [KeyCode.KEY_SEMICOLON]: KeyCode.VALUE_SEMICOLON,
  [KeyCode.KEY_EQUALS]: KeyCode.VALUE_EQUALS,
  [KeyCode.KEY_COMMA]: KeyCode.VALUE_COMMA,
  [KeyCode.KEY_DASH]: KeyCode.VALUE_DASH,
  [KeyCode.KEY_PERIOD]: KeyCode.VALUE_PERIOD,
  [KeyCode.KEY_SLASH]: KeyCode.VALUE_SLASH,
  [KeyCode.KEY_BACK_QUOTE]: KeyCode.VALUE_BACK_QUOTE,
  [KeyCode.KEY_OPEN_BRACKET]: KeyCode.VALUE_OPEN_BRACKET,
  [KeyCode.KEY_BACK_SLASH]: KeyCode.VALUE_BACK_SLASH,
  [KeyCode.KEY_CLOSE_BRACKET]: KeyCode.VALUE_CLOSE_BRACKET,
  [KeyCode.KEY_QUOTE]: KeyCode.VALUE_QUOTE,
};
const invertKeyValues = (obj, fn) => Object.keys(obj).reduce((acc, key) => {
  const val = fn ? fn(obj[key]) : obj[key];
  acc[val] = acc[val] || [];
  acc[val].push(key);
  return acc;
}, {});

export const DISPLAY_TO_KEY_MAPPING = invertKeyValues(KEY_TO_DISPLAY_MAPPING);

export default {
  name: 'Keybind',
  props: {
    akey: {
      type: String,
      required: true,
    },
  },
  data() {
    console.log('+keydowns', this.keyCode);
    return {
      boundFunction: null,
    };
  },
  mounted() {
    this.boundFunction = this.onKeyDown.bind(this);
    console.log('+keydowns', this.keyCode);
    window.addEventListener('keyup', this.boundFunction);
    console.log('+keydowns', this.keyCode);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.boundFunction);
    console.log('-keydowns', this.keyCode);
  },
  computed: {
    keyCode() {
      console.log(`Getting keyCode for ${this.akey}.`);
      return DISPLAY_TO_KEY_MAPPING[this.akey];
    },
  },
  methods: {
    onKeyDown(e) {
      console.log('keydowns', e.keyCode, this.keyCode, e.keyCode === this.keyCode);
      if (e.keyCode === this.keyCode) {
        this.$emit('keypress', this.key, this.keyCode, e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
