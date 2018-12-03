/* import {
  AvBars, AvCircle, AvWaveform,
} from 'vue-audio-visual'; */

import AvBars from 'vue-audio-visual/src/components/AvBars';
import AvCircle from 'vue-audio-visual/src/components/AvCircle';
import AvWaveform from 'vue-audio-visual/src/components/AvWaveform';
import AvLine from './components/AvLine';

const AVPlugin = {};

// eslint-disable-next-line func-names
AVPlugin.install = function (Vue) {
  // browsers compatibility
  // eslint-disable-next-line max-len
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
  // eslint-disable-next-line max-len
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
  // Components
  Vue.component(AvBars.name, AvBars);
  Vue.component(AvLine.name, AvLine);
  Vue.component(AvCircle.name, AvCircle);
  Vue.component(AvWaveform.name, AvWaveform);
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$avAudioRefs = {};
};

export default AVPlugin;
