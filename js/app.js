import TitleScene from "./scenes/title.js";
import PreloaderScene from "./scenes/preloader.js";
import MainScene from "./scenes/game.js";

//  === Configuration settings below === //
const config = {
  type: Phaser.AUTO,
  parent: "phaser-game",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: [PreloaderScene, TitleScene, MainScene],
};

const game = new Phaser.Game(config);
