/* eslint-disable object-shorthand */
// eslint-disable-next-line max-len
/* eslint no-unused-vars: ["error", { varsIgnorePattern: "^(ignored)$", argsIgnorePattern: "^(ignored|state|getters)$" }] */
// "PlayerInfo" node
const theState = {
  /**
   * Money
   * @var {number}
   */
  Caps: Math.random() * 1576,

  /**
   * Current Action Points
   * @var {number}
   */
  CurrAP: 80.0,

  /**
   * Current (total) health
   * @var {number}
   */
  CurrHP: 114.0,

  /**
   * Current weight of stuff you hauling.
   * Probably `CurrWeight > MaxWeight` = can't move
   * @var {number}
   */
  CurrWeight: 133.84999084472656,

  /**
   * ???
   * @var {number}
   */
  CurrentHPGain: 0.0,

  /**
   * The in-game date: Day
   * @var {number}
   */
  DateDay: 23,

  /**
   * The in-game date: Month
   * @var {number}
   */
  DateMonth: 10,

  /**
   * The in-game date: Year, probably 2000 + this
   * @var {number}
   */
  DateYear: 287,

  /**
   * Maximal possible Action Points
   * @var {number}
   */
  MaxAP: 90.0,

  /**
   * Maximal possible total Health
   * @var {number}
   */
  MaxHP: 115.0,

  /**
   * Maximal possible weight of stuff you can haul.
   * Probably `CurrWeight > MaxWeight` = can't move
   * @var {number}
   */
  MaxWeight: 240.0,

  /**
   * Points you could spend on perks.
   * @var {number}
   */
  PerkPoints: 0,

  /**
   * Name of the player.
   * Examples: `'Demomode'` or `'Player 1'`.
   * @var {string}
   */
  PlayerName: 'Littlepip',

  /**
   * ???
   * @var {{Value: number, type: number}[][]}
   */
  SlotResists: [
    [
      {
        Value: 0.0,
        type: 1,
      },
      {
        Value: 0.0,
        type: 2,
      },
      {
        Value: 0.0,
        type: 3,
      },
      {
        Value: 1.0,
        type: 4,
      },
      {
        Value: 0.0,
        type: 5,
      },
      {
        Value: 2.0,
        type: 6,
      },
    ],
    [
      {
        Value: 2.0,
        type: 1,
      },
      {
        Value: 0.0,
        type: 2,
      },
      {
        Value: 0.0,
        type: 3,
      },
      {
        Value: 2.0,
        type: 4,
      },
      {
        Value: 0.0,
        type: 5,
      },
      {
        Value: 0.0,
        type: 6,
      },
    ],
    [
      {
        Value: 2.0,
        type: 1,
      },
      {
        Value: 0.0,
        type: 2,
      },
      {
        Value: 0.0,
        type: 3,
      },
      {
        Value: 5.0,
        type: 4,
      },
      {
        Value: 0.0,
        type: 5,
      },
      {
        Value: 0.0,
        type: 6,
      },
    ],
    [
      {
        Value: 1.0,
        type: 1,
      },
      {
        Value: 0.0,
        type: 2,
      },
      {
        Value: 0.0,
        type: 3,
      },
      {
        Value: 3.0,
        type: 4,
      },
      {
        Value: 0.0,
        type: 5,
      },
      {
        Value: 0.0,
        type: 6,
      },
    ],
    [
      {
        Value: 1.0,
        type: 1,
      },
      {
        Value: 0.0,
        type: 2,
      },
      {
        Value: 0.0,
        type: 3,
      },
      {
        Value: 3.0,
        type: 4,
      },
      {
        Value: 0.0,
        type: 5,
      },
      {
        Value: 0.0,
        type: 6,
      },
    ],
    [
      {
        Value: 4.0,
        type: 1,
      },
      {
        Value: 0.0,
        type: 2,
      },
      {
        Value: 0.0,
        type: 3,
      },
      {
        Value: 2.0,
        type: 4,
      },
      {
        Value: 0.0,
        type: 5,
      },
      {
        Value: 0.0,
        type: 6,
      },
    ],
    [],
    [],
    [],
  ],

  /**
   * The in-game time: probably in hours, and 24h
   * @var {number} */
  TimeHour: 18.033334732055664,

  /**
   * Damages on body parts, probably.
   * HP of body part is `100% - Value`.
   * @var {{Value: number, type: number}[]}
   */
  TotalDamages: [
    {
      Value: 18.899999618530273,
      type: 1,
    },
    {
      Value: 0.0,
      type: 2,
    },
    {
      Value: 0.0,
      type: 3,
    },
    {
      Value: 0.0,
      type: 4,
    },
    {
      Value: 0.0,
      type: 5,
    },
    {
      Value: 0.0,
      type: 6,
    },
  ],

  /**
   * Resistence per body part, probably.
   * @var {{Value: number, type: number}[]}
   */
  TotalResists: [
    {
      Value: 10.0,
      type: 1,
    },
    {
      Value: 20.0,
      type: 4,
    },
    {
      Value: 10.0,
      type: 6,
    },
  ],

  /**
   * Player Level.
   * @var {number}
   */
  XPLevel: 6,

  /**
   * ???
   * Maybe percent until we reach the new level?
   * @var {number}
   */
  XPProgressPct: 0.0017391304718330503,
};

const theGetters = {
  'health/parts/head'(state, getters) {
    return (100 - state.TotalDamages.filter(dmg => dmg.type === 1)[0].Value) / 100;
  },
  'health/parts/body'(state, getters) {
    return (100 - state.TotalDamages.filter(dmg => dmg.type === 2)[0].Value) / 100;
  },
  'health/parts/legFrontLeft'(state, getters) {
    return (100 - state.TotalDamages.filter(dmg => dmg.type === 3)[0].Value) / 100;
  },
  'health/parts/legFrontRight'(state, getters) {
    return (100 - state.TotalDamages.filter(dmg => dmg.type === 4)[0].Value) / 100;
  },
  'health/parts/legHindLeft'(state, getters) {
    return (100 - state.TotalDamages.filter(dmg => dmg.type === 5)[0].Value) / 100;
  },
  'health/parts/legHindRight'(state, getters) {
    return (100 - state.TotalDamages.filter(dmg => dmg.type === 6)[0].Value) / 100;
  },
  'health/totalDamageResistance'(state, getters) {
    return state.TotalResists.reduce((old, item) => old + item.Value, 0);
  },
  'time/fullYear'(state, getters) {
    return 2000 + state.DateYear;
  },
  'time/halfYear'(state, getters) {
    return getters['time/fullYear'].toString().slice(-2);
  },
  'time/hours'(state, getters) {
    return Math.floor(state.TimeHour).toString().padStart(2, '0');
  },
  'time/minutes'(state, getters) {
    return Math.floor((state.TimeHour % 1) * 60).toString().padStart(2, '0');
  },

  /**
   * The XP we needed to get to the start of the current level.
   * Formula from http://fallout.wikia.com/wiki/Level#Fallout_4.
   * @var {number}
   */
  'levelHP/last'(state, getters) {
    return 37.5 * state.XPLevel * state.XPLevel + 87.5 * state.XPLevel - 124;
  },

  /**
   * The XP we from the the start of the current level, to the start of the next level.
   * Formula from http://fallout.wikia.com/wiki/Level#Fallout_4.
   * @var {number}
   */
  'levelHP/delta'(state, getters) {
    return 75 * (state.XPLevel - 1) + 200;
  },

  /**
   * The XP where the level we will reach next starts.
   * @var {number}
   */
  'levelHP/next'(state, getters) {
    return getters['levelHP/last'] + getters['levelHP/delta'];
  },

  /**
   * The current process in XP we got after the last level up.
   * @var {number}
   */
  'levelHP/progress'(state, getters) {
    return Math.floor(state.XPProgressPct * getters['levelHP/delta']);
  },

  /**
   * The current XP we have in total.
   * @var {number}
   */
  'levelHP/current'(state, getters) {
    return getters['levelHP/last'] + getters['levelHP/progress'];
  },
};
export default {
  state: theState, getters: theGetters,
};
