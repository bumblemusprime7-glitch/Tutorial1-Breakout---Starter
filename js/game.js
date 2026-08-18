//  === Main gameplay screen === //
class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  /* Loads in all assets */
  preload() {
    this.load.image("player", "./assets/paddle.png");
    this.load.image("block", "./assets/block.png");
    this.load.image("ball", "./assets/ball.png");
  } // end of preload()
  /* Runs once */
  create() {
    /* Runs once */
    this.player = this.physics.add.sprite(400, 500, "player");
    this.player.speed = 350;
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);

    // … player code above
    this.ball = this.physics.add.sprite(400, 450, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(200, -250);

    // … ball code above
    this.blocks = this.physics.add.staticGroup();
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 5; i++) {
        this.blocks.create(272 + i * 64, 100 + j * 32, "block");
      }
    }
    // … block code above
    this.controls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // … controls code above
    this.physics.add.collider(this.player, this.ball);
    this.physics.add.collider(this.ball, this.blocks);

    // … collisions code above
    this.score = 0;
    this.scoreText = this.add.text(10, 10, "Score: " + this.score);
  } // end of create()

  /* Runs every frame */
  update() {
    if (this.controls.left.isDown) {
      this.player.setVelocityX(-this.player.speed);
    } else if (this.controls.right.isDown) {
      this.player.setVelocityX(this.player.speed);
    } else {
      this.player.setVelocityX(0);
    }

    // … player movement code above
    if (this.ball.y > this.player.y) {
      this.ball.destroy();
    }
  } // end of update()
} // end of MainScene()

//  === Title screen === //
class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  preload() {
    this.load.image("startButton", "./assets/button.png");
  } // end of preload()

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
  scene: [TitleScene, MainScene],
};

const game = new Phaser.Game(config);
