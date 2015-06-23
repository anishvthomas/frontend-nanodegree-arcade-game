// Enemies our player must avoid
var WIDTH = 101;
var HEIGHT = 83;
var scoretext="Score: ";
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed = speed;
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=this.speed*dt;
    if( this.x > 505)
    {
        this.reset();


        //if score is greater than 3 add more enemies
        if(player.score > 3 )
        {
            allEnemies.push(new Enemy(-2, (Math.floor(Math.random() * (240 - 55)) + 55),60));
        }
        //if score is not greater than 3 and there are more than 3 enemies, remove the current one
        else if(allEnemies.length > 3)
        {
            var idx = allEnemies.indexOf(this);
            allEnemies.splice(idx, 1);

        }
    }
    //console.log(dt);
    this.top = this.y;
    this.left=this.x;
    this.bottom = this.top+HEIGHT;
    this.right= this.left+WIDTH;
    this.checkColission(this,player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x= -100;
    this.y = Math.floor(Math.random() * (240 - 55)) + 55;
};

Enemy.prototype.checkColission = function(enemy,player) {
    // body...
    if(this.isColliding(enemy,player)){
        player.reset();
        if(player.score > 1){
            player.score--;
        }
        
    }
};

Enemy.prototype.isColliding = function(enemy,player){
    return !( (enemy.right < player.left) ||
         (enemy.left > player.right) ||
         (enemy.bottom < player.top) ||
         (enemy.top > player.bottom)
      );
  
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite='images/char-boy.png';
    this.x=x;
    this.y=y;
    this.score=0;

};

Player.prototype.update = function(dt){
   
    if(this.y<=-10)
    {
      this.score++;
      this.reset();  
    }
    
    this.top = this.y+20;
    this.left=this.x+20;
    this.bottom = this.top+60;
    this.right= this.left+60;
  
};

Player.prototype.reset = function() {
    this.x= 200;
    this.y = 430;
};

Player.prototype.handleInput = function(keyCode)
{
   
    if(keyCode==="left"){
        
        if(this.x > -2){
            this.x-=WIDTH;
        }
    }else if (keyCode==="right")
    {
        //right extreme position for player
        if( this.x < 402){
            this.x+=WIDTH;
        }

    }else if (keyCode==="up"){
    
        this.y-=HEIGHT;

    }else if (keyCode==="down"){
         
        if(this.y<430){
            this.y+=HEIGHT;
        }
            
                
    }

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font="20px Verdana";
    ctx.fillStyle='white';
    ctx.fillRect(0,0,100,50);
    scoretext="Score: "+this.score;
    ctx.fillStyle='red';
    ctx.fillText(scoretext,10,40);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies=[new Enemy(100,240,30),new Enemy(-100,55,5),new Enemy(50,55,25)];
// Place the player object in a variable called player

//var player = new Player(100,430);
//console.log(global.ctx);
var player = new Player(0,0); //(101,83);
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
