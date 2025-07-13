export class Valve extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,scale) {
        super(scene,x,y,texture)
        scene.add.existing(this);
        this.setScale(scale);
        this.flow_start = 0
        this.setInteractive();
        this.on('pointerdown', () => onPress(this));
        this.start = null;
        const onPress = () => {
            if (this.start != null) {
                this.start.pipe.flow_signal = 1;
                this.flow_start = 1;
            }
        }
    }
}