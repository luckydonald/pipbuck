import {
  AvBars, AvCircle, AvWaveform,
} from 'vue-audio-visual';
// import AvBars from './components/AvBars'
// import AvLine from './components/AvLine'
// import AvCircle from './components/AvCircle'
// import AvWaveform from './components/AvWaveform'

const AVPlugin = {};

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
