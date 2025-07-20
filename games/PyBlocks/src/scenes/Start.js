export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }
    preload() {
        this.load.image("background", "assets/background.png");
        this.load.spritesheet("logo", "assets/logo.png", {frameWidth:900,frameHeight:450});
        this.load.spritesheet("start", "assets/start_button.png", {frameWidth: 540, frameHeight: 270});
        this.load.spritesheet("up", "assets/up.png", {frameWidth:900,frameHeight:900});
    }
    create() {
        this.background = this.add.tileSprite(0,0,1290, 720, "background");
        this.background.setOrigin(0, 0);
        this.logo = this.add.sprite(1290/2,720/2,"logo");
        this.start = this.add.sprite(750,270,"start");
        this.up = this.add.sprite(100,100,"up");
        this.up2 = this.add.sprite(1100,100,"up");
        this.up3 = this.add.sprite(100,650,"up");
        this.up4 = this.add.sprite(1100,650,"up");
        this.up.setScale(.1);
        this.up2.setScale(.1);
        this.up3.setScale(.1);
        this.up4.setScale(.1);
        this.start.setScale(.75);
        this.start.setInteractive();
        let animationKey = "start_red";
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers('start', { start: 0, end: 0 }),
            repeat: 0
        });
        animationKey = "start_green";
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers('start', {start:1, end:1}),
            repeat:0
        });
        this.start.play("start_red");
        animationKey = "logo_green";
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers('logo', { start: 1, end: 1 }),
            repeat: 0
        });
        animationKey = "logo_red";
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers('logo', {start:0, end:0}),
            repeat:0
        });
        this.start.on('pointerdown',() => {
            this.start.play("start_green");
            this.logo.play("logo_green");
            this.cameras.main.fadeOut(500,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Game');
            });
        });
    }
    update(time, delta) {
        const d = delta / 1000;

        this.background.tilePositionX += 200 * d;
        this.up.rotation  += 0.5 * d;
        this.up2.rotation += 1.0 * d;
        this.up3.rotation += 0.75 * d;
        this.up4.rotation += 1.5 * d;
    }

}