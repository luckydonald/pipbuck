import { Howl, Howler } from 'howler';

const sounds = {
  nav_tab: 'ui_pipboy_tab',
};

const pipbuckConfig = require('./assets/sprites/pipbuck_sprites.json');

// Setup the new Howl.
const pipbuckSprites = new Howl(pipbuckConfig);

export { Howler, pipbuckSprites, sounds };
