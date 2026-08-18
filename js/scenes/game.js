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

    // TODO: Rainbow blocks
    // We want every block to start a different color, and then have all the
    // blocks continuously cycle through the rainbow over time.
    //
    // How the code should work:
    // 1. Make an array called rainbow that holds a list of colors written in
    //    hex, like 0xff0000 for red. Add 5 or more colors so it looks like a
    //    rainbow.
    // 2. Make a variable called colorOffset and set it to 0. This keeps track
    //    of how far the colors have shifted so far.
    // 3. Inside the loop below that creates each block, give every block a
    //    starting color using block.setTint(), picking a color from the
    //    rainbow array based on the block's column number (i).
    // 4. After the blocks are created, set up a repeating timer with
    //    this.time.addEvent({ delay, loop: true, callback }) that runs every
    //    200ms. Each time it runs, increase colorOffset by 1, then loop over
    //    every block still on screen (this.blocks.getChildren()) and call
    //    setTint() again so its color shifts along the rainbow.

    this.blocks = this.physics.add.staticGroup();
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 5; i++) {
        let block = this.blocks.create(272 + i * 64, 100 + j * 32, "block");
      }
    }
    // … block code above
    this.controls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // … controls code above
    this.physics.add.collider(this.player, this.ball);

    // TODO: Score blocks
    // When the ball hits a block, we want the block to disappear and the
    // score to go up. This uses an arrow function, which is a shorthand way
    // to write a function, you'll use them a lot in JS.
    //
    // The collider below runs this function every time the ball and a block
    // touch on the ball and the block that touch. It passes in the two physics bodies that collided, in the same
    // order they're listed above: ball first, then block.
    //
    // How the code should work:
    // 1. Destroy the block that was hit, google how to destroy in Phaser 3, you also need to use the passed in block
    //    and follow the AI overview suggestion.
    // 2. Add 10 to this.score.
    // 3. Print the score to the console using
    //    console.log("The score is " + this.score).
    // 4. Update the score text on screen using this.scoreText.setText().

    this.physics.add.collider(this.ball, this.blocks, (ball, block) => {});

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
