/**
 * Main app; data store. Loads App.vue.
 */
import Vue, { createApp } from 'vue';
import { plugin as vueMetaPlugin } from 'vue-meta';
import VueGtag from "vue-gtag";
import screenfull from 'screenfull';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';

const app = createApp(App);
app.use(router).use(store);

app.use(vueMetaPlugin);

app.use(VueGtag, {
  config: {
    id: process.env.NODE_ENV !== 'production' ? 'UA-47744366-5' : 'UA-47744366-4',
    params: {
      send_page_view: true,
    },
  },
  pageTrackerScreenviewEnabled: true,
}, router);
app.mount('#app');

if (process.env.NODE_ENV !== 'production') {
  global.$vm = app;
}
screenfull.request();
