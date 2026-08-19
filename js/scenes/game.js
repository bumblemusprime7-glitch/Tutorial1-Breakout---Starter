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

    // TODO 2: Rainbow blocks
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

    this.rainbow = [0xff0000, 0xff9900, 0xffff00, 0x00ff00, 0x0000ff];
    this.colorOffset = 0;

    this.blocks = this.physics.add.staticGroup();
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 5; i++) {
        let block = this.blocks.create(272 + i * 64, 100 + j * 32, "block");
        block.setTint(this.rainbow[i % this.rainbow.length]);
      }
    }

    this.time.addEvent({
      delay: 200,
      loop: true,
      callback: this.cycleBlockColors,
      callbackScope: this,
    });
    // … block code above
    this.controls = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // … controls code above

    // TODO 4: Paddle bounce angle
    // Right now the ball bounces off the paddle at a fixed angle no matter
    // where it lands. In real Breakout, hitting near the edge of the paddle
    // should send the ball off at a sharper angle, and hitting the middle
    // should send it mostly straight up. This is done with a bit of math
    // based on how far from the paddle's center the ball landed.
    //
    // How the code should work:
    // 1. In the callback below, find how far the ball's x position is from
    //    the paddle's center: let diff = ball.x - player.x.
    // 2. Turn that into a ratio between -1 (far left edge) and 1 (far right
    //    edge) by dividing by half the paddle's width:
    //    let normalized = diff / (player.displayWidth / 2).
    // 3. Pick a max horizontal speed (like 300) and multiply it by
    //    normalized to get the ball's new horizontal velocity, then set it
    //    with ball.setVelocityX(normalized * maxSpeed).
    // 4. Keep the ball's vertical speed consistent so it still shoots back
    //    upward - set ball.setVelocityY() to a fixed negative number (like
    //    -250) so it doesn't slow down or go the wrong way over time.

    this.physics.add.collider(this.player, this.ball, (player, ball) => {});

    // TODO 1: Score blocks
    // When the ball hits a block, we want the block to disappear and the
    // score to go up. This uses an arrow function, which is a shorthand way
    // to write a function, you'll use them a lot in JS.
    //
    // The collider below runs this function every time the ball and a block
    // touch on the ball and the block that touch. It passes in the two physics bodies that collided, in the same
    // order they're listed above: ball first, then block.
    //
    // How the code should work:
    // 1. Destroy the block that was hit you need to use the passed in block
    //    and follow the AI overview suggestion.
    // 2. Add 10 to this.score.
    // 3. Print the score to the console using
    //    console.log("The score is " + this.score).
    // 4. Update the score text on screen using this.scoreText.setText().

    this.physics.add.collider(
      this.ball,
      this.blocks,
      this.hitBlock,
      null,
      this,
    );

    // … collisions code above
    this.score = 0;
    this.scoreText = this.add.text(10, 10, "Score: " + this.score);
  } // end of create()

  hitBlock(ball, block) {
    block.destroy();
    this.score += 10;
    console.log("The score is " + this.score);
    this.scoreText.text = "Score: " + this.score;
  }

  cycleBlockColors() {
    this.colorOffset++;
    this.blocks.getChildren().forEach((block, i) => {
      block.setTint(this.rainbow[(i + this.colorOffset) % this.rainbow.length]);
    });
  }

  // TODO 3: Implement lives + win loss
  // Having lives will extend the game and create a longer experience. Much of this code wont go right below here either you will have to work out where it goes.
  // first set a live counter (same as score) and set it to 3 (or however many you want)
  // next set a lives text somewhere on the screen to display lives
  // afterwards instead of just destorying the ball call a function called resetLevel() and pass in this.lives (that means put it in the bracket of the function call resetLevel(this.lives))
  // next beneath this block of code create a function called resetLevel(lives) and put lives in the brackets
  // in the function, the first line needs to check if you are still alive (dead would be 0)
  //
  // if the player is still alive you need to call the create ball function and put in the brackets ballGroup
  // next you need to change how the ball is currently created. Right now its just one sprite but if we make it a group() (not a staticGroup()) then we can make the same ball over and over in one line of code
  // leave all the ball code the same except make it this.balls and a group (change all the lines directly under this.balls = blah) now when we make a ball it wont need all the proprties set
  // once thats done create a ball in the create ball function like you do with blocks
  //
  // if the player is dead call the game over scene (look at how preloader.js and title.js call the next scene)
  // you need to make a gameover.js file in scenes/, copy the class structure of the title page but make it gameOver, make the text red and say gameover, you also need to copy how app.js uses the other scenes
  //
  // If you have a game over scene then you should have a winScene.
  // make a win.js in scenes/ do the same as for gameOver scene but for winScene
  // inside the break blocks function add an if statement to check if this.blocks.countActive() is  less than or equal 0
  // If it is, call the winscene

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
