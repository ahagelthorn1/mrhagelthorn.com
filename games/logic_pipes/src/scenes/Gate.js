export class Gate extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,scale,type) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(scale);
        this.type = type;
    }
}