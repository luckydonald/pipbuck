/**
 * Main app; data store. Loads App.vue.
 */
/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import Vuex from 'vuex';
import AudioVisual from 'vue-audio-visual';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(AudioVisual);

const store = new Vuex.Store({
  debug: true,
  state: {
    colorFront: '#9ef8bd',
    colorBack: '#08401f',
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
});

const ignored = new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App),
}).$mount('#app');
