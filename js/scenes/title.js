//  === Title screen === //
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  create() {
    // Add some title text
    this.add
      .text(400, 200, "Breakout", {
        fontSize: "48px",
        color: "#00ff00",
      })
      .setOrigin(0.5);

    // Add a button
    const startBtn = this.add.image(400, 350, "startButton");
    startBtn.setInteractive();
    startBtn.setScale(0.8);

    startBtn.on("pointerdown", () => {
      this.scene.start("MainScene");
    });
  } // end of create()
} // end of TitleScene()
