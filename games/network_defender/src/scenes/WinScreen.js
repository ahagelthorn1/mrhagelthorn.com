export class WinScreen extends Phaser.Scene {

    constructor() {
        super('WinScreen');
    }

    preload() {
        this.load.image('WinningBackground', 'assets/WinningBackground.png');
        this.load.image('TopText', 'assets/TopText.png');
        this.load.image('BottomText', 'assets/BottomText.png');
        this.load.spritesheet('WinningOrange', 'assets/WinningOrange.png',{frameWidth: 900, frameHeight:900});
    }

    create() {
        this.cameras.main.fadeIn(200,0,0,0);
        this.WinningBackground = this.add.image(0,0,'WinningBackground');
        this.WinningBackground.setScale(50);
        this.WinningOrange = this.add.sprite(1280/2, 720/2 - 50, 'WinningOrange');
        this.WinningOrange.setScale(.6);
        this.WinningOrange.setInteractive();
        let animationKey = 'uncool_orange';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }

        const uncool_orange = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers('WinningOrange', {start:0, end:0}),
            repeat:0
        };
        this.anims.create(uncool_orange);
        animationKey = 'cool_orange';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        };

        const cool_orange = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers('WinningOrange', {start:1, end:1}),
            repeat:0
        };
        this.anims.create(cool_orange);
        this.curr_cool = false;
        this.WinningOrange.on('pointerdown', () => {
            if (this.curr_cool) {
                this.curr_cool = false;
                this.WinningOrange.play('uncool_orange');
            } else {
                this.curr_cool = true;
                this.WinningOrange.play('cool_orange');
            }
        });
        this.TopText = this.add.image(700,150,'TopText');
        this.BottomText = this.add.image(700,550,'BottomText');
    }

    update() {
    }
    
}
