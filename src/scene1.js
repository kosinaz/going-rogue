import Scene from './scene.js';

/**
 * Represents the scene that displays the next slide.
 *
 * @export
 * @class Scene1
 * @extends {Scene}
 */
export default class Scene1 extends Scene {
  /**
   * Opens the next slide.
   *
   * @memberof Scene1
   */
  start() {
    super.start();
    this.game.display.drawText(3, 3, 'GOING ROGUE WITH INDIE GAME DEVELOPMENT');
    this.game.display.drawText(17, 5, 'Zoltan Kosina');
    this.game.display.draw(this.game.at.x, this.game.at.y, '@');
    this.game.display.draw(44, 11, '>');
  }

  /**
   * Handles the keydown and mousedown events of this scene.
   *
   * @param {Event} event
   * @memberof Scene
   */
  handleEvent(event) {
    super.handleEvent(event);
    this.game.display.getContainer().requestFullscreen();
    if (event.type === 'keydown') {
      if (event.keyCode === 37) {
        this.game.at.x -= 1;
      } else if (event.keyCode === 39) {
        this.game.at.x += 1;
      } else if (event.keyCode === 38) {
        this.game.at.y -= 1;
      } else if (event.keyCode === 40) {
        this.game.at.y += 1;
      }
      this.switchTo(this.game.scene1);
    }
  }
}
