/**
 * Main app; data store. Loads App.vue.
 */
import Vue, { createApp } from 'vue';
import Meta from 'vue-meta';
import VueGtag from "vue-gtag";
import screenfull from 'screenfull';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';

const app = createApp(App);
app.use(router).use(store);

app.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'm-key', // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

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
