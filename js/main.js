console.log("Hello world");
//php -S localhost:8080
var vxball=vyball=SPEED=2;
var ratio = 0.23;
var Stage = 1;
var scorePlayer=scoreComputer=0;
var balls_str = new Array();
var balls = new Array();
var GameState = {
    preload: function(){
        this.load.image('background','assets/images/bg1.jpg');
        //this.load.image('bird','assets/images/bird.png');
        this.load.image('player','assets/images/player.png');
        this.load.image('ball','assets/images/beach-ball.png');
        this.game.load.audio('bgsong','assets/audio/bg1.mp3');

        for (var i=1;i<=8;i++){
            var str = "planet";
            str += i.toString() + ".png"; 
            balls_str[i] = str;
            var path = 'assets/images/' + str;
            this.load.image(balls_str[i],path);
            //console.log(balls_str[i]);

        }
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.sprite(0,0,'background');



        this.player = this.game.add.sprite(window.innerWidth/2,window.innerHeight,'player');
        //0left, 1right || 0down, 1up
        this.player.anchor.setTo(0.9,0.5); 
        //console.log("ratio"+ratio+" | window width "+window.innerWidth +" | player height "+this.player.height);
        this.player.scale.setTo(ratio);
        //console.log("player.y "+this.player.y+"| player height "+this.player.height);            
        game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.checkCollision.up = true;
    this.player.body.checkCollision.down = true;
    this.player.body.immovable = true;

         //this.player.enableBody = true;
         //this.player.physicsBodyType = Phaser.Physics.ARCADE;

        this.player.y -= this.player.height/2;
        this.sound = this.game.add.audio('bgsong');
        this.sound.play();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        //balls = game.add.group();
       
        balls[1] =this.ball1= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[1]);
        balls[2] =this.ball2= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[2]);
        balls[3] = this.ball3= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[3]);
        balls[4] = this.ball4= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[4]);
        balls[5] = this.ball5= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[5]);
        balls[6] = this.ball6= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[6]);
        balls[7] = this.ball7= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[7]);
        balls[8] = this.ball8= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,balls_str[8]);

        //Stage 1: only y velocity
        //Stage 2: add x velocity
        //Stage 3: increase speed
        randomise_balls();
        fire_planet(1);
        
//Event on touch or click
      //this.bird.inputEnabled = true;
      //  game.input.onDown.add(this.jump, this); 
 
    },
    update: function(){
        //ball keeps moving
         for (var i=1;i<=8;i++){
            //balls[i].x += vxball;
            //balls[i].y += vyball;

            if (i<8 && (balls[i] != null) && balls[i].y>window.innerHeight && balls[i+1]!=null){
                console.log("balls["+(i+1)+"] = "+balls[i+1]);
                    fire_planet(i+1);                
            }


            if(game.physics.arcade.collide(this.player, balls[i])){
                console.log("BOOM");
                balls[i].destroy();
                balls[i]=null;
                console.log("balls["+i+"] = "+balls[i]);
                /*
                if (i<8)
                    fire_planet(i+1);
                else
                    Stage += 1;
*/
            }
         } 
        //control Player
        if (this.cursors.right.isDown){
            this.player.x += 5;
        }
        if (this.cursors.left.isDown){
            this.player.x -= 5;
        }
        //move computer  

    }
};
 
var min = -1;
var max = 2;
function randomise_balls(){
    for (var i=1;i<=8;i++){ 
        balls[i].scale.setTo(ratio);
        var pos = Math.random();
        var pos1 = pos * (max - min) + min;
        balls[i].anchor.setTo(pos1,5);
        

        game.physics.enable(balls[i], Phaser.Physics.ARCADE);
        //balls[i].body.collideWorldBounds = true;
        balls[i].body.bounce.setTo(1, 1);
        

       // balls[i].body.velocity.y = game.rnd.between(50,100);
        var delay=1000*50; //1 second

        setTimeout(function() {
          //your code to be executed after 1 second
        }, delay);
 
   }
}

function fire_planet(ndx){
    balls[ndx].body.velocity.y = game.rnd.between(50,100);
}

function collisionHandler(player,ball){
    console.log("IT WORKS!");
    ball.kill();
    vyball = -SPEED;
    return false;

}
var game = new Phaser.Game(window.innerWidth, window.innerHeight,Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');



 