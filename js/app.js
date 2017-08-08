// Enemies our player must avoid
var Enemy = function (row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.image = 'images/enemy-bug.png';
    this.sprite = this.image;

    //this.width = Resources.get(this.image).width;
    //this.height = Resources.get(this.image).height;

    // const width of an enemy image
    this.width = 101;
    // const height of an enemy image
    this.height = 171;
    
    // the row where the enemy slides from left to right
    this.row = row;
    
    // the speed var is relevant for the game level feature
    this.speed = 2;
    
    // set the start position for the enemy image
    // the rows are arranged from top to bottom (row 0 -> water)
    this.x = -this.width;
    this.y = -25 + 85 * row;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // increase the x position to move the enemy
    this.x += this.speed;
    if (this.x > ctx.canvas.width) {
        // some random function to generate different start pos for each enemy
        this.x = -this.width * Math.floor((Math.random() * 5) + 1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class/functions
var Player = function () {
    this.image = 'images/char-boy.png';
    this.sprite = this.image;
    
    // game row count
    this.rowCnt = 6;
    // game column count
    this.colCnt = 5;
};

Player.prototype.update = function () {

};

// calculate the row and col value to pixel positions
Player.prototype.setPos = function (Row, Col) {
    this.row = Row;
    this.col = Col;

    this.y = -10 + this.row * 83;
    this.x = -2 + this.col * 101;
};

// set the players start position
Player.prototype.resetPos = function () {
    this.setPos(5,2);
};

// render the player image
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the keyb events up, down, left and right
Player.prototype.handleInput = function (e) {
    // for debug use    
    console.log("keyb event");
    console.log(e);
    
    row = this.row;
    col = this.col;
    switch (e) {
        case 'left':
            if (col > 0)
                col--;
            break;
        case 'up':
            if (row > 0)
                row--;
            break;
        case 'right':
            if (col < this.colCnt-1)
                col++;
            break;
        case 'down':
            if (row < this.rowCnt-1)
                row++;
            break;
    };
    // set the new player position
    this.setPos(row, col);
    
    // for debug use
    console.log("x: " + this.x + "y: " + this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];

// the rows are arranged from top to bottom (row 0 -> water)
allEnemies.push(new Enemy(1));  // push a enemy to row 1
allEnemies.push(new Enemy(2));  // push a enemy to row 2
allEnemies.push(new Enemy(3));  // push a enemy to row 3

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
