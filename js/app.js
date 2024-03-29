// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = Math.random() * 350 + 1;
    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
var Player = function (x, y) {
  this.x = 505/2 - 50;
  this.y = 380;
  this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
Player.prototype.update = function() {
  this.checkCollisions();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place the player object in a variable called player
var player = new Player();


// Now instantiate your objects.
var enemyOne = new Enemy(-150, 50);
var enemyTwo = new Enemy(-475, 50);
var enemyThree = new Enemy(-100, 145);
var enemyFour = new Enemy(-250, 145);
var enemyFive = new Enemy(-750, 145);
var enemySix = new Enemy(-275, 225);
var enemySeven = new Enemy(-525, 225);
var enemyEight = new Enemy(-750, 245);


// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix, enemySeven, enemyEight];
var allEnemiesLength = allEnemies.length;


// CHECK FOR CRASH
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemiesLength; i++) {
      if (this.x < (allEnemies[i].x + 50) &&
          (this.x + 50) > allEnemies[i].x &&
          this.y < (allEnemies[i].y + 40) &&
          (40 + this.y) > allEnemies[i].y) {
          this.resetGame();
          yourScore = 0;
          score();
      }
  }
};


// GAME RESET IF REACH WATER
Player.prototype.resetGame = function() {
  this.x = 505/2 - 50;
  this.y = 380;
}

// GAME OVER
function gameOver() {
  player.resetGame();
}

// SCORING SYSTEM
let yourScore = 0;
function score() {
  let scoreParagraph = document.querySelector(".score");
  scoreParagraph.innerHTML = `Your Score: ${yourScore}`;
}

// CALL FUNCTION TO SET PARAGRAPH EQUAL TO PLAYER'S SCORE
score();

//MOVES IN THE GAME FIELD

// a handleInput() method.
Player.prototype.handleInput = function(key) {
  if(key === "up") {
    if(this.y < 83) {
      yourScore ++;
      score();
      gameOver();
    }
    else {
      this.y -= 83;
    }
  }
  else if (key === "down") {
    if(this.y > 350) {
      return null;
    }
    else {
      this.y += 83;
    }
  }
  else if (key === "left") {
    if(this.x < 100) {
      return null;
    }
    else {
      this.x -= 101;
    }
  }
  else if(key === "right") {
    if(this.x > 400) {
      return null;
    }
    else {
      this.x += 101;
    }
  }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
