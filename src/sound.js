import { Howl, Howler } from 'howler';

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

function play(sound) {
  console.log('play func');
  let selectedSound = sound;
  if (Array.isArray(selectedSound)) {
    // https://stackoverflow.com/a/4550514/3423324#getting-a-random-value-from-a-javascript-array
    const selection = Math.floor(Math.random() * selectedSound.length);
    console.log('selection', selectedSound, `[${selection}]`);
    selectedSound = selectedSound[Math.floor(Math.random() * selectedSound.length)];
  }
  console.log('playing', sound, selectedSound);

  console.log('this.sprite.play 1', this);
  const id = this.sprite.play(selectedSound);
  console.log('this.sprite.play 1b', this);
  return new Promise((resolve, reject) => {
    this.sprite.once('play', () => {
      console.log('playing');
      // eslint-disable-next-line no-unused-vars
      const playEndPromise = new Promise((resolve2, reject2) => {
        this.sprite.once('end', () => {
          console.log('resolve 2.1');
          resolve2();
          console.log('resolved 2.1');
        }, id);
      });
      console.log('playEndPromise created', playEndPromise);
      console.log('resolve 2');
      resolve(playEndPromise, 'test');
      console.log('resolved 2');
    }, id);
    this.sprite.once('loaderror', (...args) => {
      console.log('loaderror', ...args);
      reject(new Error('loaderror'));
    });
    this.sprite.once('playerror', () => {
      this.sprite.off('play', undefined, id);
      this.sprite.off('end', undefined, id);
      this.sprite.once('unlock', () => {
        console.log('this.sprite.play 2', this);
        const unlockedId = this.sprite.play(selectedSound);
        this.sprite.once('play', () => {
          console.log('creating promise 2.2', this);
          // eslint-disable-next-line no-unused-vars
          const playEndPromise = new Promise((resolve2, reject2) => {
            this.sprite.once('end', () => {
              console.log('resolve 2.2');
              resolve2(true);
            }, unlockedId);
          });
          resolve(playEndPromise);
        }, unlockedId);
      }, id);
    }, id);
  });
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
