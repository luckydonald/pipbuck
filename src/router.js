import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Radio from './views/data/Radio.vue';
import Settings from './views/xtras/Settings.vue'; // ExtraData
import ExtraItems from './views/xtras/ExtraItems.vue';
import ExtraStats from './views/xtras/ExtraStats.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'Status' },
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
      path: '/stats/status',
      name: 'Status',
      component: Home,
    },
    {
      path: '/stats/special',
      name: 'S.P.E.C.I.A.L.',
      component: Home,
    },
    {
      path: '/stats/skills',
      name: 'Skills',
      component: Home,
    },
    {
      path: '/stats/perks',
      name: 'Perks',
      component: Home,
    },
    {
      path: '/stats/general',
      name: 'General',
      component: Home,
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
      path: '/data/radio',
      name: 'Radio',
      component: Radio,
    },
    {
      path: '/data/extra',
      name: 'Data Extra',
      redirect: { name: 'Settings' },
    },
  ],
});
