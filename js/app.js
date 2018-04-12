// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

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
  this.x += this.speed * dt;

  // make enemies loop to left side of canvas after reaching canvas.width
  if (this.x >= 505) {
    this.x = 0;
  }

  // Check for collision with enemies or barrier-walls
  checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // function not needed right now
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  updateScoreAndLevel(score, level);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
    player.x -= player.speed + 20;
  }
  if (keyPress == 'up') {
    player.y -= player.speed;
  }
  if (keyPress == 'right') {
    player.x += player.speed + 20;
  }
  if (keyPress == 'down') {
    player.y += player.speed;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var position = {
  x: 202.5,
  y: 383
}
var allEnemies = [];
var player = new Player(position.x, position.y, 80);
var score = 0;
var level = 1;
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 500);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Util functions
function updateScoreAndLevel(score, level) {
  document.querySelector('[data-score]').innerText = score;
  document.querySelector('[data-level]').innerText = level;
};

function checkCollision(enemy) {
  if (player.y + 131 >= enemy.y + 90 && player.x + 25 <= enemy.x + 88 && player.y + 73 <= enemy.y + 135 && player.x + 76 >= enemy.x + 11) {
    player.x = position.x;
    player.y = position.y;
  }

  if (player.y + 63 <= 0) {
    player.x = position.x;
    player.y = position.y;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 171);

    score += 1;
    level += 1;

    increaseDifficulty(score);
  }

  if (player.y > position.y) {
    player.y = position.y;
  }
  if (player.x > 402.5) {
    player.x = 402.5;
  }
  if (player.x < 2.5) {
    player.x = 2.5;
  }
};

function increaseDifficulty(enemies) {
  allEnemies.length = 0;

  for (var i = 0; i <= enemies; i++) {
    var enemy = new Enemy(0, Math.random() * 234, Math.random() * 250);
    allEnemies.push(enemy);
  }
};
