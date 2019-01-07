import demodata from '../demomode.json';
import PlayerInfo from './PlayerInfo';

export default {
  modules: {
    PlayerInfo: {
      ...PlayerInfo,
      namespaced: true,
    },
  },
  state: {
    Inventory: demodata.Inventory,
    Log: demodata.Log,
    Map: demodata.Map,
    Perks: demodata.Perks,
    // PlayerInfo: demodata.PlayerInfo, // we fill that one with a module.
    Quests: demodata.Quests,
    Radio: demodata.Radio,
    Special: demodata.Special,
    Stats: demodata.Stats,
    Status: demodata.Status,
  },
};
