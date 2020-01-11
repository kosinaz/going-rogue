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
  }

  /**
   * Updates the slide.
   *
   * @memberof Scene1
   */
  update() {
    super.update();
    if (this.game.at.target) {
      if (this.game.at.x < this.game.at.target.x) {
        this.game.at.x += 1;
      } else if (this.game.at.x > this.game.at.target.x) {
        this.game.at.x -= 1;
      }
      if (this.game.at.y < this.game.at.target.y) {
        this.game.at.y += 1;
      } else if (this.game.at.y > this.game.at.target.y) {
        this.game.at.y -= 1;
      }
    }
    console.log(this.game.at);
    this.game.display.drawText(3, 3, 'GOING ROGUE WITH INDIE GAME DEVELOPMENT');
    this.game.display.drawText(17, 5, 'Zoltan Kosina');
    this.game.display.draw(44, 11, '>');
    this.game.display.draw(this.game.at.x, this.game.at.y, '@');
  }

  /**
   * Handles the keydown and mousedown events of this scene.
   *
   * @param {Event} event
   * @memberof Scene
   */
  handleEvent(event) {
    super.handleEvent(event);
    if (!document.fullscreenElement) {
      this.game.display.getContainer().requestFullscreen();
    }
    if (event.type === 'mouseup') {
      this.game.at.target = null;
    } else if (event.type === 'mousedown') {
      this.game.at.target = {
        x: this.eventX,
        y: this.eventY,
      };
      console.log(this.game.at.target);
      if (this.game.at.x === 44 && this.game.at.y === 11) {
        this.switchTo(this.game.scene1);
      }
    }
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
    }
  }
}
