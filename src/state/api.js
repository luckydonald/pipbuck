import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: {
    user: null,  // null | object,
    selectedCharacterId: null,  // integer | null
    characters: [],  // Character[]
    // character: {
    //   id: null,  // integer | null
    //   items: [],  // Item[]
    // },
    items: [],  // Item[]
  },
  getters: {
    selectedCharacter: state => (state.selectedCharacterId === null ? null : state.characters),
  },
  mutations: {

  },
});

export default useUserStore;
