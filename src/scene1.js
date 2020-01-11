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
    // eslint-disable-next-line new-cap
    GJAPI.DataStoreFetch(1, 'users', (response) => {
      this.game.i = 0;
      if (response.success) {
        this.game.i = +response.data % 28;
      }
      let c = String.fromCharCode(this.game.i + 97);
      c = GJAPI.sUserName === 'kosina' ? '@' : c;
      this.game.users[this.game.i] = [15, 5, c];
      // eslint-disable-next-line new-cap
      GJAPI.DataStoreUpdate(1, 'users', 'add', 1);
    });
  }

  /**
   * Updates the slide.
   *
   * @memberof Scene1
   */
  update() {
    super.update();
    if (this.game.i === undefined) {
      return;
    }
    let x = this.game.users[this.game.i][0];
    let y = this.game.users[this.game.i][1];
    const c = this.game.users[this.game.i][2];
    if (this.game.users[this.game.i]) {
      if (x < this.eventX) {
        x += 1;
      } else if (x > this.eventX) {
        x -= 1;
      }
      if (y < this.eventY) {
        y += 1;
      } else if (y > this.eventY) {
        y -= 1;
      }
    }
    // eslint-disable-next-line new-cap
    GJAPI.DataStoreGetKeys(1, (response) => {
      if (!response.success) {
        return;
      }
      response.keys.forEach(({key}) => {
        if (key === 'users' || +key === this.game.i) {
          return;
        }
        // eslint-disable-next-line new-cap
        GJAPI.DataStoreFetch(1, key, (response) => {
          if (!response.success) {
            return;
          }
          const parts = response.data.split(',');
          const time = new Date() - parts[3];
          if (time < 5000) {
            this.game.users[key] = [
              +parts[0],
              +parts[1],
              parts[2],
            ];
          } else {
            // eslint-disable-next-line new-cap
            GJAPI.DataStoreRemove(1, key);
            this.game.users[key] = null;
          }
        });
      });
    });
    this.game.users[this.game.i] = [x, y, c];
    this.game.display.drawText(3, 3, 'GOING ROGUE WITH INDIE GAME DEVELOPMENT');
    this.game.display.drawText(17, 5, 'Zoltan Kosina');
    this.game.display.draw(44, 11, '>');
    this.game.users.forEach((u, i) => {
      if (u) {
        this.game.display.draw(u[0], u[1], u[2]);
      }
    });
    const user = `${this.game.users[this.game.i].toString()},${+(new Date())}`;
    // eslint-disable-next-line new-cap
    GJAPI.DataStoreSet(1, this.game.i, user);
    // eslint-disable-next-line new-cap
    GJAPI.DataStoreSet(1, 'users', this.game.users.length);
  }

  /**
   * Handles the mousedown events of this scene.
   *
   * @param {Event} event
   * @memberof Scene
   */
  handleEvent(event) {
    super.handleEvent(event);
    if (!document.fullscreenElement) {
      this.game.display.getContainer().requestFullscreen();
    }
    if (event.type === 'keydown') {
      clearInterval(this.interval);
    }
  }
}
