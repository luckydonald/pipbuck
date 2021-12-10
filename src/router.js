import { createRouter, createWebHistory } from 'vue-router';
import Placeholder from './views/Placeholder.vue';

export default createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Boot',
      // index: [-1, 0],
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
      // index: [-1, -1],
      // route level code-splitting
      // this generates a separate chunk (meta.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "meta" */ './views/About.vue'),
      // component: About,
    },
    {
      path: '/stats',
      name: 'Stats',
      // index: [0],
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
          // index: [0, 0],
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/stats/Status.vue'),
          // component: Status,
          redirect: { name: 'Condition' },
          children: [
            {
              path: '/stats/status/condition',
              name: 'Condition',
              // index: [0, 0, 0],
              // route level code-splitting
              // this generates a separate chunk (main.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              // eslint-disable-next-line max-len
              component: () => import(/* webpackChunkName: "main" */ './views/stats/status/Condition.vue'),
              // component: Condition,
            },
            {
              path: '/stats/status/radiation',
              name: 'Radiation',
              // index: [0, 0, 1],
              // route level code-splitting
              // this generates a separate chunk (main.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              // eslint-disable-next-line max-len
              // component: () => import(/* webpackChunkName: "main" */ './views/stats/status/Radiation.vue'),
              // component: Radiation,
              component: Placeholder,
            },
            {
              path: '/stats/status/effects',
              name: 'Effects',
              // index: [0, 0, 2],
              // route level code-splitting
              // this generates a separate chunk (main.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              // eslint-disable-next-line max-len
              component: () => import(/* webpackChunkName: "main" */ './views/stats/status/Effects.vue'),
              // component: Effects,
            },
          ],
        },
        {
          path: '/stats/special',
          name: 'S.P.E.C.I.A.L.',
          // index: [0, 1],
          component: Placeholder,
        },
        {
          path: '/stats/skills',
          name: 'Skills',
          // index: [0, 2],
          component: Placeholder,
        },
        {
          path: '/stats/perks',
          name: 'Perks',
          // index: [0, 3],
          component: Placeholder,
        },
        {
          path: '/stats/general',
          name: 'General',
          // index: [0, 4],
          component: Placeholder,
        },
      ],
    },
    {
      path: '/items',
      name: 'Items',
      // index: [1],
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
          // index: [1, 0],
          // route level code-splitting
          // this generates a separate chunk (items.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Weapons.vue'),
          // component: Weapons,
        },
        {
          path: '/items/apparel',
          name: 'Apparel',
          // index: [1, 1],
          // route level code-splitting
          // this generates a separate chunk (items.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Apparel.vue'),
          // component: Apparel,
        },
        {
          path: '/items/aid',
          name: 'Aid',
          // index: [1, 2],
          // route level code-splitting
          // this generates a separate chunk (items.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Aid.vue'),
          // component: Aid,
        },
        {
          path: '/items/misc',
          name: 'Misc',
          // index: [1, 3],
          // route level code-splitting
          // this generates a separate chunk (items.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Misc.vue'),
          // component: Misc,
        },
        {
          path: '/items/ammo',
          name: 'Ammo',
          // index: [1, 4],
          // route level code-splitting
          // this generates a separate chunk (items.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "items" */ './views/items/Ammo.vue'),
          // component: Ammo,
        },
      ],
    },
    {
      path: '/data',
      name: 'Data',
      // index: [2],
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
          // index: [2, 0],
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/data/LocalMap.vue'),
          // component: LocalMap,
        },
        {
          path: '/data/world_map',
          name: 'World Map',
          // index: [2, 1],
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/data/WorldMap.vue'),
          // component: WorldMap,
        },
        {
          path: '/data/quests',
          name: 'Quests',
          // index: [2, 2],
          component: Placeholder,
        },
        {
          path: '/data/notes',
          name: 'Notes',
          // index: [2, 3],
          component: Placeholder,
        },
        {
          path: '/data/radio',
          name: 'Radio',
          // index: [2, 4],
          // route level code-splitting
          // this generates a separate chunk (main.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "main" */ './views/data/Radio.vue'),
          // component: Radio,
        },
        {
          path: '/data/settings',
          name: 'Settings',
          // index: [2, -1],
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
      // index: [0, -1],
      // route level code-splitting
      // this generates a separate chunk (extra.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "extra" */ './views/xtras/ExtraStats.vue'),
      // component: ExtraStats,
    },
    {
      path: '/items/extra',
      name: 'Items Extra',
      // index: [1, -1],
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
    {
      path: '/settings',
      name: 'Old Settings',
      redirect: { name: 'Settings' },
    },
  ],
});

/*
const test = [];
test[-1][0] = { path: '/', name: 'Boot' };
test[-1][-1] = { path: '/about', name: 'About' };
test[0][0][0] = { path: '/stats/status/condition', name: 'Condition' };  // Status -> Condition
test[0][0][1] = { path: '/stats/status/radiation', name: 'Radiation' };
test[0][0][2] = { path: '/stats/status/effects', name: 'Effects' };
test[0][0][2] = { path: '/stats/status/effects', name: 'Effects' };
test[0][1] = { path: '/stats/special', name: 'S.P.E.C.I.A.L.' };
test[0][2] = { path: '/stats/skills', name: 'Skills' };
test[0][3] = { path: '/stats/perks', name: 'Perks' };
test[0][4] = { path: '/stats/general', name: 'General' };
test[1][0] = { path: '/items/weapons', name: 'Weapons' };
test[1][1] = { path: '/items/apparel', name: 'Apparel' };
test[1][2] = { path: '/items/aid', name: 'Aid' };
test[1][3] = { path: '/items/misc', name: 'Misc' };
test[1][4] = { path: '/items/ammo', name: 'Ammo' };
test[2][0] = { path: '/data/local_map', name: 'Local Map' };
test[2][1] = { path: '/data/world_map', name: 'World Map' };
test[2][2] = { path: '/data/quests', name: 'Quests' };
test[2][3] = { path: '/data/notes', name: 'Notes' };
test[2][4] = { path: '/data/radio', name: 'Radio' };
test[2][-1] = { path: '/data/settings', name: 'Settings' };
test[1][-1] = { path: '/items/extra', name: 'Items Extra' };
test[0][-1] = { path: '/stats/extra', name: 'Stats Extra' };
*/
