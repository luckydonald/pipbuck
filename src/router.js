import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import General from './views/General.vue';
import Settings from './views/extras/Settings.vue'; // ExtraData
import ExtraItems from './views/extras/ExtraItems.vue';
import ExtraStats from './views/extras/ExtraStats.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/general',
      name: 'General',
      component: General,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/stats/extra',
      name: 'Stats Extra',
      component: ExtraStats,
    },
    {
      path: '/items/extra',
      name: 'Items Extra',
      component: ExtraItems,
    },
    {
      path: '/data/extra',
      name: 'Data Extra',
      redirect: { name: 'Settings' },
    },
  ],
});
