import Vue from 'vue';
import AudioVisual from 'vue-audio-visual';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(AudioVisual);

const ignored = new Vue({
  router,
  // el: '#app',
  render: h => h(App),
}).$mount('#app');
