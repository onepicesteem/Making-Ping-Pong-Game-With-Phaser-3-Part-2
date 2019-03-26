var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preloadGame,
        create: createGame,
        update: updateGame
    }
};

var game = new Phaser.Game(config);

var cursor;
var player;

var pc;

var ball;

var velocityX=Phaser.Math.Between(-100, 100);
var velocityY=100;

var scorePlayer = 0;
var scorePc = 0;
var scoreTextPlayer;
var scoreTextPc;


function preloadGame ()
 {
  this.load.image('ground','assets/ground.png');
  this.load.image('player','assets/player.png');
   

  this.load.image('pc','assets/pc.png');

  this.load.image('ball','assets/ball.png');
 }

function createGame ()
{
  this.add.image(400, 200, 'ground');


    cursor = this.input.keyboard.createCursorKeys();
    console.log(cursor);

    this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    

    player = this.physics.add.sprite(780, 200, 'player');
    player.setCollideWorldBounds(true);

    pc=this.physics.add.sprite(20, 200, 'pc');
    pc.setCollideWorldBounds(true);


    ball = this.physics.add.sprite(400, 200, 'ball');

    ball.setCollideWorldBounds(true);
    ball.setBounce(1);

    //it do horizontal and vertical movement.
    ball.setVelocityY(velocityY);
    ball.setVelocityX(velocityX);

    //in createGame()
    this.physics.add.collider(ball, player, hitPlayer, null, this);
    this.physics.add.collider(ball, pc, hitPc, null, this);

    scoreTextPc = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#F00' });
    scoreTextPlayer = this.add.text(700, 16, 'score: 0', { fontSize: '16px', fill: '#00F' });
    
}

function updateGame ()
{
  if(cursor.up.isDown)
  {
    player.setVelocityY(-150);
  }
  else if(cursor.down.isDown)
  {
    player.setVelocityY(150);
  }
  else
  {
    player.setVelocityY(0);
  }

  if(this.keyW.isDown)
  {
    pc.setVelocityY(-150);
  }
  else if(this.keyS.isDown)
  {
    pc.setVelocityY(150);
  }
  else
  {
    pc.setVelocityY(0);
  }

  if(ball.x==796)
  {
    scorePc += 1;
    scoreTextPc.setText('Score: ' + scorePc);
    reset();
    
  }

  if(ball.x==4)
  {
    scorePlayer += 1;
    scoreTextPlayer.setText('Score: ' + scorePlayer);
    reset();
    
    
  }

}

function hitPlayer(ball,player)
{
  velocityX=velocityX+50;
  velocityX=velocityX*-1;
  console.log(velocityX);
  
  ball.setVelocityX(velocityX);

  if(velocityY<0)
  {
    velocityY=velocityY*-1
    ball.setVelocityY(velocityY);
  }
  player.setVelocityX(-1);
}

function hitPc(ball,pc)
{
  velocityX=velocityX-50;
  velocityX=velocityX*-1;
  console.log(velocityX);
  ball.setVelocityX(velocityX);

  if(velocityY<0)
  {
    velocityY=velocityY*-1
    ball.setVelocityY(velocityY);
  }
  pc.setVelocityX(1);
}


function reset()
{
  velocityX=Phaser.Math.Between(-100, 100);
  velocityY=100;
  ball.x=400;
  ball.y=200;
  player.x=780;
  player.y=200;
  pc.x=20;
  pc.y=200;
  ball.setVelocityX(velocityX);
  ball.setVelocityY(velocityY);
}