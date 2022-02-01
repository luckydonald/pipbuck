/* eslint no-param-reassign: ["error", { "props": false }] */
import VuexPersistence from 'vuex-persist';
import Vuex from "vuex";
import axios from "axios";


const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage, // window.localStorage,
  strictMode: process.env.NODE_ENV !== 'production',
  key: 'pipbuck-pnp-addons',
});

// TEMPLATE
const ignored = {
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
  },
  getters: {
  },
};


const playerState = {
  state: () => ({
    // auth
    userId: null,  // int | null
    playerId: null,  // int | null
    availablePlayers: {},  // Dict[str, int] # name of player, id of player
    // player
    items: [],  // List[Item]
  }),
  mutations: {

    // AUTH
    setUser(state, loginData) {
      // eslint-disable-next-line camelcase
      const { user_id, available_players } = loginData;
      // eslint-disable-next-line camelcase
      state.userId = user_id;
      // eslint-disable-next-line camelcase
      state.availablePlayers = available_players;
    },
    setPlayer(state, playerId) {
      state.playerId = playerId;
    },

    // ITEMS
    updateItemCount(state, itemId, count) {
      state.items.filter(item => item.id === itemId)[0].count = count;
    },
  },
  actions: {
    async equip(context, { itemId }) {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      context.commit("updateItemCount", itemId, data.count);
    }
  },
  getters: {
  },
};



const store = new Vuex.Store({
  debug: process.env.NODE_ENV !== 'production',
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexLocal.plugin],
  modules: {
    login: loginStore,
    player: playerState,
    lootlist: lootlistState,
  },
});

export default store;
