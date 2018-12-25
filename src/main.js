/**
 * Main app; data store. Loads App.vue.
 */
import Vue from 'vue';
import Meta from 'vue-meta';
import screenfull from 'screenfull';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';


Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'm-key', // the property name that vue-meta uses to determine whether to overwrite or append a tag
});
Vue.config.productionTip = false;

const ignored = new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App),
}).$mount('#app');

screenfull.request();
