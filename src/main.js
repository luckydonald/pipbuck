/**
 * Main app; data store. Loads App.vue.
 */
/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import Vuex from 'vuex';
import AudioVisual from './lib/vue-audio-visual';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(AudioVisual);

const radio = {
  debug: process.env.NODE_ENV !== 'production',
  strict: process.env.NODE_ENV !== 'production',
  state: {
    selected: null,
    // current: computed
    tracks: {
      'Galaxy News Radio': {
        file: 'radio/gnr.mp3',
        disabled: false,
        hidden: false,
        position: 0,
      },
      'Diamond City Radio': {
        file: 'radio/dcr.mp3',
        disabled: false,
        hidden: false,
        position: 0,
      },
      'Test Track': {
        file: 'radio/test.mp3',
        disabled: false,
        hidden: false,
        position: 0,
      },
    },
  },
  mutations: {
    selectTrack(state, name) {
      state.selected = name;
    },
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    currentOrNull: (state, getters) => {
      console.log('currentOrNull()');
      if (state.selected === null) {
        return null;
      }
      return state.tracks[state.selected];
    },
    current: (state, getters) => {
      console.log('current()');
      if (getters.currentOrNull === null) {
        return {
          file: null, disabled: null, hidden: null, position: null,
        };
      }
      return getters.currentOrNull;
    },
    isPlaying: (state, getters) => {
      if (getters.currentOrNull === null) {
        return false;
      }
      return true;
    },
  },
};

const store = new Vuex.Store({
  debug: process.env.NODE_ENV !== 'production',
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    radio: {
      ...radio,
      namespaced: true,
    },
  },
  state: {
    colorFront: '#9ef8bd',
    colorBack: '#08401f',

    // color_hair_bright: '#9ef8bd',
    // color_hair_normal: '#1bff80',
    // color_outlines: '#1bff80',


    color_hair_bright: '#48f564',
    color_hair_normal: '#39c64b',
    color_hair_dark: '#299432',

    color_outlines: '#09310f',

    color_body_bright: '#0c5128',
    color_body_normal: '#08401f',
    color_body_dark: '#063016',

    color_bg: '#021709',


    showHardwareButtons: true,
    // colorFront2: '#1bff80',
    // colorBack2: '#1d2c24',
  },
  mutations: {
    setColorFront(state, color) {
      state.colorFront = color;
    },
    setColorBack(state, color) {
      state.colorBack = color;
    },
    toggleHardwareButtons(state, value) {
      console.log('mutating toggleHardwareButtons state: ', value);
      state.showHardwareButtons = value;
    },
  },
  getters: {
  },
});

const ignored = new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App),
}).$mount('#app');