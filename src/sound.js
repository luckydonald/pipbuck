import { Howl, Howler } from 'howler';

class PlayingSprite {
  constructor({
    audio,
    name = null,
    id = null,
  }) {
    if (!audio) {
      throw new Error('audio must be set.');
    }
    if (!name && (id === undefined || id === null)) {
      throw new Error('either id or name must be set.');
    }
    if (id === null) {
      this.id = audio.play(name);
    } else {
      this.id = id;
    }
    this.name = name;
    this.audio = audio;
  }

  play() {
    this.audio.play(this.id);
    return this;
  }

  pause() {
    this.audio.pause(this.id);
    return this;
  }

  stop() {
    this.audio.stop(this.id);
    return this;
  }

  volume(level) {
    this.audio.volume(level, this.id);
    return this;
  }

  fade(from, to, duration) {
    this.audio.fade(from, to, duration, this.id);
    return this;
  }

  rate(rate) {
    this.audio.rate(rate, this.id);
    return this;
  }

  seek(seconds = undefined) {
    if (seconds === undefined) {
      return this.audio.seek(this.id);
    }
    this.audio.seek(seconds, this.id);
    return this;
  }

  loop(flag = undefined) {
    if (flag === undefined) {
      return this.audio.loop(this.id);
    }
    this.audio.loop(flag, this.id);
    return this;
  }

  state() {
    return this.audio.state();
  }

  playing() {
    return this.audio.playing(this.id);
  }

  duration() {
    return this.audio.duration(this.id);
  }

  on(type, func) {
    this.audio.on(type, func, this.id);
    return this;
  }

  once(type, func) {
    this.audio.once(type, func, this.id);
    return this;
  }

  off(type, func) {
    this.audio.off(type, func, this.id);
    return this;
  }
}

const sounds = {
  nav_tab: 'ui_pipboy_tab',
  nav_mode: 'ui_pipboy_mode',
  nav_fullscreen: 'ui_loadscreen_initial',
  select: 'ui_menu_prevnext',
  boot: ['UI_PipBoy_BootSequence_A', 'UI_PipBoy_BootSequence_B', 'UI_PipBoy_BootSequence_C'],
  screen_buzz: [
    'ui_static_c_01', 'ui_static_c_02', 'ui_static_c_03', 'ui_static_c_04', 'ui_static_c_05',
    'ui_static_d_01', 'ui_static_d_02', 'ui_static_d_03', 'ui_static_d_04', 'ui_static_d_05',
    'UI_PipBoy_BurstStatic_01', 'UI_PipBoy_BurstStatic_02', 'UI_PipBoy_BurstStatic_03',
    'UI_PipBoy_BurstStatic_04', 'UI_PipBoy_BurstStatic_05', 'UI_PipBoy_BurstStatic_06',
    'UI_PipBoy_BurstStatic_07', 'UI_PipBoy_BurstStatic_08', 'UI_PipBoy_BurstStatic_09',
    'UI_PipBoy_BurstStatic_10', 'UI_PipBoy_BurstStatic_12', 'UI_PipBoy_BurstStatic_13',
    'UI_PipBoy_BurstStatic_16', 'UI_PipBoy_BurstStatic_17',
  ],
};

const pipbuckConfig = require('./assets/sprites/pipbuck_sprites.json');

// Setup the new Howl.
const pipbuckSprites = new Howl({
  html5: !!navigator.userAgent.toLowerCase().match(/iphone|ipad|safari/),
  autoUnlock: true,
  src: pipbuckConfig.urls.map(url => url.replace('../public/', '/audio/sprites/')),
  sprite: pipbuckConfig.sprite,
});


/**
 * Returns a `PlayingSprite` as proxy to the Howler, filling in the id automatically.
 *
 * @param soundParam {string}
 * @return {PlayingSprite}
 */
function play(soundParam) {
  let sound = soundParam;
  if (Array.isArray(sound)) {
    // https://stackoverflow.com/a/4550514/3423324#getting-a-random-value-from-a-javascript-array
    const selection = Math.floor(Math.random() * sound.length);
    console.log('selection', sound, `[${selection}]`);
    sound = sound[selection];
  }
  return new PlayingSprite({ name: sound, audio: this.audio });
}

const ui = {
  config: pipbuckConfig,
  audio: pipbuckSprites,
  sounds,
  /**
   * Returns a `PlayingSprite` as proxy to the Howler, filling in the id automatically.
   *
   * @param sound {string}
   * @return {PlayingSprite}
   */
  play(sound) {
    return play.bind(this)(sound);
  },
};


export { Howler, ui };
