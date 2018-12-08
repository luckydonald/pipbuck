/**
 * Main app; data store. Loads App.vue.
 */
import Vue from 'vue';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';

Vue.config.productionTip = false;

const ignored = new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App),
}).$mount('#app');
