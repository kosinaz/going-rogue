import Display from '../lib/rot/display/display.js';
import Scene1 from './scene1.js';

/**
 * Represent the game core object.
 *
 * @class Game
 */
export default class Game {

}
Game.display = new Display({
  width: 46,
  height: 13,
  fontSize: 72,
});
Game.at = {
  x: 15,
  y: 5,
},
document.body.appendChild(Game.display.getContainer());
Game.scene1 = new Scene1(Game);
Game.scene1.start();
