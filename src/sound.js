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
  boot: ['UI_PipBoy_BootSequence_A', 'UI_PipBoy_BootSequence_B', 'UI_PipBoy_BootSequence_C'],
};

const pipbuckConfig = require('./assets/sprites/pipbuck_sprites.json');

// Setup the new Howl.
const pipbuckSprites = new Howl({
  html5: false,
  autoUnlock: true,
  src: pipbuckConfig.urls,
  sprite: pipbuckConfig.sprite,
});

/**
 * Returns a promise which will be resolved on succesfull play.
 * @param selectedSound
 * @return {Promise<PlayingSprite>}
 */
// eslint-disable-next-line no-unused-vars
function playPromise(selectedSound) {
  console.log('this.sprite.play 1a', selectedSound);
  const id = this.sprite.play(selectedSound);
  const sprite = new PlayingSprite({ id, audio: this.sprite });
  console.log('this.sprite.play 1b', this, sprite);

  function promiseExecutor(resolve, reject) {
    sprite.once('play', () => {
      sprite.off('loaderror', undefined);
      console.log('on play');
      // eslint-disable-next-line no-unused-vars
      resolve(sprite);
    });
    sprite.once('loaderror', (...args) => {
      sprite.off('play', undefined);
      console.log('on loaderror', ...args);
      reject(new Error('loaderror', sprite));
    });
  }
  return new Promise(promiseExecutor);
}


function play(soundParam) {
  console.log('play func');
  let sound = soundParam;
  if (Array.isArray(sound)) {
    // https://stackoverflow.com/a/4550514/3423324#getting-a-random-value-from-a-javascript-array
    const selection = Math.floor(Math.random() * sound.length);
    console.log('selection', sound, `[${selection}]`);
    sound = sound[Math.floor(Math.random() * sound.length)];
  }
  console.log('playing', soundParam, sound);

  console.log('this.sprite.play 1', this);
  return new PlayingSprite({ name: sound, audio: this.sprite });
}

const ui = {
  config: pipbuckConfig,
  sprite: pipbuckSprites,
  sounds,
  play(sound) {
    console.log('ui.play', sound, this);
    return play.bind(this)(sound);
  },
};


export { Howler, ui };
