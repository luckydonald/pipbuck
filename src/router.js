import Vue from 'vue';
import Router from 'vue-router';
import Boot from './views/Boot.vue';
import Data from './views/Data.vue';
import Items from './views/Items.vue';
import Stats from './views/Stats.vue';
import Radio from './views/data/Radio.vue';
import About from './views/About.vue';
import Settings from './views/xtras/Settings.vue';
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
      component: () => import(/* webpackChunkName: "boot" */ './views/Boot.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats,
      redirect: { name: 'Status' },
      children: [
        {
          path: '/stats/status',
          name: 'Status',
          component: Boot,
        },
        {
          path: '/stats/special',
          name: 'S.P.E.C.I.A.L.',
          component: Boot,
        },
        {
          path: '/stats/skills',
          name: 'Skills',
          component: Boot,
        },
        {
          path: '/stats/perks',
          name: 'Perks',
          component: Boot,
        },
        {
          path: '/stats/general',
          name: 'General',
          component: Boot,
        },
      ],
    },
    {
      path: '/items',
      name: 'Items',
      component: Items,
      redirect: { name: 'Weapons' },
      children: [
        {
          path: '/items/weapons',
          name: 'Weapons',
          component: Boot,
        },
        {
          path: '/items/apparel',
          name: 'Apparel',
          component: Boot,
        },
        {
          path: '/items/aid',
          name: 'Aid',
          component: Boot,
        },
        {
          path: '/items/misc',
          name: 'Misc',
          component: Boot,
        },
        {
          path: '/items/ammo',
          name: 'Ammo',
          component: Boot,
        },
      ],
    },
    {
      path: '/data',
      name: 'Data',
      component: Data,
      redirect: { name: 'Local Map' },
      children: [
        {
          path: '/stats/local_map',
          name: 'Local Map',
          component: Boot,
        },
        {
          path: '/stats/world_map',
          name: 'World Map',
          component: Boot,
        },
        {
          path: '/stats/quests',
          name: 'Quests',
          component: Boot,
        },
        {
          path: '/stats/notes',
          name: 'Notes',
          component: Boot,
        },
        {
          path: '/stats/general',
          name: 'Radio',
          component: Boot,
        },
      ],
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
