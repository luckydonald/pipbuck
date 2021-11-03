/**
 * Main app; data store. Loads App.vue.
 */
import Vue from 'vue';
import Meta from 'vue-meta';
import VueAnalytics from 'vue-analytics';
import screenfull from 'screenfull';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';


Vue.config.productionTip = false;

Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'm-key', // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

Vue.use(VueAnalytics, {
  id: process.env.NODE_ENV !== 'production' ? 'UA-47744366-5' : 'UA-47744366-4',
  router,
  enabled: true,
  autoTracking: {
    pageviewOnLoad: true,
    // page: false,
    screenview: true,
  },
  batch: {
    enabled: true, // enable/disable
    amount: 2, // amount of events fired
    delay: 500, // delay in milliseconds
  },
});

const ignored = new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App),
}).$mount('#app');

if (process.env.NODE_ENV !== 'production') {
  global.$vm = ignored;
}
screenfull.request();
