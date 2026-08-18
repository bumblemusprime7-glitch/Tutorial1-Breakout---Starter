//  === Main gameplay screen === //
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

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
