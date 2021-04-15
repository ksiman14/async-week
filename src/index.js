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
    this.cursors;
  }

  preload() {
    this.load.image('sky', skyImg);
    this.load.image('water', waterImg);
    this.load.image('turtle', turtleImg);
    this.load.spritesheet('seaweed', seaweedImg, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('fishing-net', netImg, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.ocean = this.physics.add.staticGroup();
    this.ocean.create(400, 410, 'water').refreshBody();

    this.turtle = this.physics.add.sprite(100, 500, 'turtle');
    this.turtle.setCollideWorldBounds = true;
  }

  update() {
    if (this.cursors.up.isDown) {
      this.turtle.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.turtle.setVelocityY(200);
    } else {
      this.turtle.setVelocityY(0);
    }
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
      gravity: { x: 150 },
      debug: false,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
