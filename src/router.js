import Router from 'vue-router';
import Vue from 'vue';
import Placeholder from './views/Placeholder.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (boot.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "boot" */ './views/Boot.vue'),
      // component: Boot,
      // redirect: { name: 'Status' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (meta.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "meta" */ './views/About.vue'),
      // component: About,
    },
    {
      path: '/stats',
      name: 'Stats',
      // route level code-splitting
      // this generates a separate chunk (main.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "main" */ './views/Stats.vue'),
      // component: Stats,
      redirect: { name: 'Status' },
      children: [
        {
          path: '/stats/status',
          name: 'Status',
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/stats/Status.vue'),
          // component: Status,

        },
        {
          path: '/stats/special',
          name: 'S.P.E.C.I.A.L.',
          component: Placeholder,
        },
        {
          path: '/stats/skills',
          name: 'Skills',
          component: Placeholder,
        },
        {
          path: '/stats/perks',
          name: 'Perks',
          component: Placeholder,
        },
        {
          path: '/stats/general',
          name: 'General',
          component: Placeholder,
        },
      ],
    },
    {
      path: '/items',
      name: 'Items',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "main" */ './views/Items.vue'),
      // component: Items,
      redirect: { name: 'Weapons' },
      children: [
        {
          path: '/items/weapons',
          name: 'Weapons',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Weapons.vue'),
          // component: Weapons,
        },
        {
          path: '/items/apparel',
          name: 'Apparel',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Apparel.vue'),
          // component: Apparel,
        },
        {
          path: '/items/aid',
          name: 'Aid',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Aid.vue'),
          // component: Aid,
        },
        {
          path: '/items/misc',
          name: 'Misc',
          component: Placeholder,
        },
        {
          path: '/items/ammo',
          name: 'Ammo',
          component: Placeholder,
        },
      ],
    },
    {
      path: '/data',
      name: 'Data',
      // route level code-splitting
      // this generates a separate chunk (main.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "main" */ './views/Data.vue'),
      // component: Data,
      redirect: { name: 'Local Map' },
      children: [
        {
          path: '/data/local_map',
          name: 'Local Map',
          component: Placeholder,
        },
        {
          path: '/data/world_map',
          name: 'World Map',
          component: Placeholder,
        },
        {
          path: '/data/quests',
          name: 'Quests',
          component: Placeholder,
        },
        {
          path: '/data/notes',
          name: 'Notes',
          component: Placeholder,
        },
        {
          path: '/data/radio',
          name: 'Radio',
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/data/Radio.vue'),
          // component: Radio,
        },
        {
          path: '/settings',
          name: 'Settings',
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/xtras/Settings.vue'),
          // component: Settings,
        },
      ],
    },
    {
      path: '/stats/extra',
      name: 'Stats Extra',
      // route level code-splitting
      // this generates a separate chunk (extra.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "extra" */ './views/xtras/ExtraStats.vue'),
      // component: ExtraStats,
    },
    {
      path: '/items/extra',
      name: 'Items Extra',
      // route level code-splitting
      // this generates a separate chunk (extra.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "extra" */ './views/xtras/ExtraItems.vue'),
      // component: ExtraItems,
    },
    {
      path: '/data/extra',
      name: 'Data Extra',
      redirect: { name: 'Settings' },
    },
  ],
});
