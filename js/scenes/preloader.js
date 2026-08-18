//  === Preloader screen === //
export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloaderScene" });
  }

  // Loads all assets before the game starts
  preload() {
    this.load.image("startButton", "./assets/button.png");
    this.load.image("player", "./assets/paddle.png");
    this.load.image("block", "./assets/block.png");
    this.load.image("ball", "./assets/ball.png");
  } // end of preload()

  create() {
    this.scene.start("TitleScene");
  } // end of create()
} // end of PreloaderScene()
