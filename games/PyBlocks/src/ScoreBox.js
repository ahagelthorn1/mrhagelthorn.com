export class ScoreBox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ScoreBox');
        scene.add.existing(this);
        this.setScale(.3);
        this.combo_text = this.scene.add.bitmapText(this.x, this.y-100, 'micro5', this.scene.combo, 64);
        this.score_text = this.scene.add.bitmapText(this.x, this.y, 'micro5', this.scene.score, 112);
        this.timer_text = this.scene.add.bitmapText(this.x, this.y+100, 'micro5', this.scene.timer, 64);
        this.score_text.setOrigin(.5,.5);
        this.combo_text.setOrigin(.5, 0);
        this.timer_text.setOrigin(.5, 1);
        let animationKey = "ScoreBox_white";
        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey)
        }
        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers('ScoreBox', { start: 0, end: 0 }),
            repeat: 0
        });
        animationKey = "ScoreBox_green";
        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey)
        }
        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers('ScoreBox', { start: 1, end: 1 }),
            repeat: 0
        });
        this.setState('white');
    }
    setState(state) {
        switch (state) {
            case 'green':
                this.play('ScoreBox_green');
                this.state = 'green';
                break;
            case 'white':
                this.play('ScoreBox_white');
                this.state = 'white';
                break;
            default:
                this.play('ScoreBox_white');
                this.state = 'white';
                break;
        }
    }
    updateCombo() {
        this.combo_text.setText("x"+this.scene.combo.toString());
    }
}