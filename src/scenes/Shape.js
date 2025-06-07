export class Shape extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, scale) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    this.setScale(scale);
  }
}
