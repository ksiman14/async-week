import Phaser from 'phaser';
import waterImg from './assets/water.png';
import skyImg from './assets/sky.png';
import turtleImg from './assets/turtle.png';
import seaweedImg from './assets/seaweed.png';
import netImg from './assets/fishing-net.png';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.ocean;
    this.turtle;
    this.seaweed;
    this.nets;
    this.cursors;
    this.score = 0;
    this.scoreText;
  }

  preload() {
    this.load.image('sky', skyImg);
    this.load.image('water', waterImg);
    this.load.image('turtle', turtleImg);
    this.load.image('seaweed', seaweedImg);
    this.load.image('fishing-net', netImg);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.ocean = this.physics.add.staticGroup();
    this.ocean.create(400, 410, 'water').refreshBody();

    this.turtle = this.physics.add.sprite(100, 500, 'turtle');
    this.turtle.setCollideWorldBounds = true;

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    this.seaweed = this.physics.add.group({
      key: 'seaweed',
      repeat: 3,
      setXY: { x: 50, y: 300, stepX: 200 },
    });

    this.physics.add.overlap(
      this.turtle,
      this.seaweed,
      this.collectSeaweed,
      null,
      this
    );

    this.nets = this.physics.add.group();
    this.physics.add.collider(this.turtle, this.nets, this.hitNet, null, this);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.turtle.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.turtle.setVelocityY(200);
    } else if (this.cursors.right.isDown) {
      this.turtle.setVelocityX(200);
    } else if (this.cursors.left.isDown) {
      this.turtle.setVelocityX(-200);
    } else {
      this.turtle.setVelocity(0);
    }

    this.seaweed.children.iterate(function (child) {
      if (child.y >= 600) {
        child.disableBody(true, true);
        child.enableBody(true, child.x, 300, true, true);
      }
    });
  }

  collectSeaweed(player, seaweed) {
    seaweed.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.score >= 100) {
      alert('YOU WIN! Refresh to restart');
    }

    const x =
      this.turtle.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var net = this.nets.create(x, 16, 'fishing-net');
    net.setVelocity(Phaser.Math.Between(-200, 200), 20);

    seaweed.enableBody(true, seaweed.x, 300, true, true);
  }

  hitNet(player, nets) {
    this.physics.pause();
    player.setTint(0xff0000);
    this.gameOver = true;
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 150 },
      debug: false,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
