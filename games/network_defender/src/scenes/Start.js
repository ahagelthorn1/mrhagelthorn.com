export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('Start', 'assets/Start.png', {frameWidth: 450, frameHeight: 450});
        this.load.image('Sword','assets/Pointer.png');
        this.load.image('Logo', 'assets/Logo.png');
    }

    create() {
        const flat = {
            key:'start_button_flat',
            frames:this.anims.generateFrameNumbers('Start', { start:0, end:0}),
            repeat:-1
        };
        const press = {
            key:'start_button_press',
            frames:this.anims.generateFrameNumbers('Start', {frames: [0,1]}),
            repeat:0
        }
        const unpress = {
            key:'start_button_unpress',
            frames:this.anims.generateFrameNumbers('Start', {frames: [1,0]}),
            repeat:0
        }
        this.registry.set("Level1Complete", false);
        this.registry.set("Level2Complete", false);
        this.registry.set("Level3Complete", false);
        this.registry.set("Level4Complete", false);
        this.registry.set("Level5Complete", false);
        const scaling_factor = 10;
        this.background = this.add.tileSprite(640, -300, 2000, 2500, 'background');
        this.anims.create(flat);
        this.anims.create(press);
        this.anims.create(unpress);
        this.logo = this.add.sprite(1280/2,720/3,'Logo');
        this.start = this.add.sprite(1280/2,720/1.35,'Start');
        this.start.play("start_button_flat");
        this.start.setScale(.5);
        this.logo.setScale(.5);
        this.start.setInteractive();
        this.tweens.add({
            targets: this.start,
            y: this.start.y - 10,
            duration:1000,
            ease:'Sine.easeInOut',
            yoyo: true,
            repeat:-1
        });
        this.start.on('pointerdown', () => {
            this.start.play("start_button_press");
            this.time.delayedCall(300, () => {
                this.start.play('start_button_unpress');
            }, [], this);
            this.cameras.main.fadeOut(500,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Level');
            })
        });
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
