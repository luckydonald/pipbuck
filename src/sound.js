import { Howl, Howler } from 'howler';

const sounds = {
  nav_tab: 'ui_pipboy_tab',
  nav_mode: 'ui_pipboy_mode',
};

const pipbuckConfig = require('./assets/sprites/pipbuck_sprites.json');

// Setup the new Howl.
const pipbuckSprites = new Howl({
  html5: false,
  src: pipbuckConfig.urls,
  sprite: pipbuckConfig.sprite,
});


const ui = {
  config: pipbuckConfig,
  sprite: pipbuckSprites,
  sounds,
};


export { Howler, ui };
