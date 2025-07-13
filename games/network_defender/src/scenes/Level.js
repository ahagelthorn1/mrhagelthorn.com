export class Level extends Phaser.Scene {

    constructor() {
        super('Level');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('LevelSelect', 'assets/LevelSelect.png');
        this.load.spritesheet('Level1', 'assets/Level1Button.png', {frameWidth: 450, frameHeight: 600});
        this.load.spritesheet('Level2', 'assets/Level2Button.png', {frameWidth: 450, frameHeight: 600});
        this.load.spritesheet('Level3', 'assets/Level3Button.png', {frameWidth: 450, frameHeight: 600});
        this.load.spritesheet('Level4', 'assets/Level4Button.png', {frameWidth: 450, frameHeight: 600});
        this.load.spritesheet('Level5', 'assets/Level5Button.png', {frameWidth: 450, frameHeight: 600});
        this.load.spritesheet('Lock', 'assets/Locked.png', {frameWidth: 400, frameHeight: 600});
    }

    create() {
        this.LEVEL2_TEXTURE = "Level2";
        this.LEVEL3_TEXTURE = "Level3";
        this.LEVEL4_TEXTURE = "Level4";
        this.LEVEL5_TEXTURE = "Level5";
        this.cameras.main.fadeIn(200,0,0,0);
        this.background = this.add.tileSprite(640, -100, 2000, 2500, 'background');
        this.LevelSelect = this.add.sprite(1280/2,720/4,'LevelSelect');
        let animationKey = 'level1_button_flat';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        } 
        const button1_flat = {
            key:'level1_button_flat',
            frames:this.anims.generateFrameNumbers('Level1', { start:0, end:0}),
            repeat:-1
        };
        this.anims.create(button1_flat);
        animationKey = 'locked';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const Locked = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers('Lock', {start:0, end:0}),
            repeat:0
        }
        this.anims.create(Locked);
        animationKey = 'level1_button_press'
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey)
        }
        const button1_press = {
            key:'level1_button_press',
            frames:this.anims.generateFrameNumbers('Level1', {frames: [0,1]}),
            repeat:0
        }
        this.anims.create(button1_press);
        animationKey = 'level1_button_unpress';
        if(this.anims.exists(animationKey)){
            this.anims.remove(animationKey);
        }
        const button1_unpress = {
            key:'level1_button_unpress',
            frames:this.anims.generateFrameNumbers('Level1', {frames: [1,0]}),
            repeat:0
        }
        this.anims.create(button1_unpress);
        animationKey = 'level2_button_flat';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        } 
        const button2_flat = {
            key:'level2_button_flat',
            frames:this.anims.generateFrameNumbers(this.LEVEL2_TEXTURE, { start:0, end:0}),
            repeat:-1
        };
        this.anims.create(button2_flat);
        animationKey = 'level2_button_press'
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey)
        }
        const button2_press = {
            key:'level2_button_press',
            frames:this.anims.generateFrameNumbers(this.LEVEL2_TEXTURE, {frames: [0,1]}),
            repeat:0
        }
        this.anims.create(button2_press);
        animationKey = 'level2_button_unpress';
        if(this.anims.exists(animationKey)){
            this.anims.remove(animationKey);
        }
        const button2_unpress = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.LEVEL2_TEXTURE, {frames: [1,0]}),
            repeat:0
        }
        this.anims.create(button2_unpress);
        animationKey = 'level3_button_flat';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        } 
        const button3_flat = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.LEVEL3_TEXTURE, { start:0, end:0}),
            repeat:-1
        };
        this.anims.create(button3_flat);
        animationKey = 'level3_button_press'
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey)
        }
        const button3_press = {
            key:'level3_button_press',
            frames:this.anims.generateFrameNumbers(this.LEVEL3_TEXTURE, {frames: [0,1]}),
            repeat:0
        }
        this.anims.create(button3_press);
        animationKey = 'level3_button_unpress';
        if(this.anims.exists(animationKey)){
            this.anims.remove(animationKey);
        }
        const button3_unpress = {
            key:'level3_button_unpress',
            frames:this.anims.generateFrameNumbers(this.LEVEL3_TEXTURE, {frames: [1,0]}),
            repeat:0
        }
        this.anims.create(button3_unpress);
        animationKey = 'level4_button_flat';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        } 
        const button4_flat = {
            key:'level4_button_flat',
            frames:this.anims.generateFrameNumbers(this.LEVEL4_TEXTURE, { start:0, end:0}),
            repeat:-1
        };
        this.anims.create(button4_flat);
        animationKey = 'level4_button_press'
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey)
        }
        const button4_press = {
            key:'level4_button_press',
            frames:this.anims.generateFrameNumbers(this.LEVEL4_TEXTURE, {frames: [0,1]}),
            repeat:0
        }
        this.anims.create(button4_press);
        animationKey = 'level4_button_unpress';
        if(this.anims.exists(animationKey)){
            this.anims.remove(animationKey);
        }
        const button4_unpress = {
            key:'level4_button_unpress',
            frames:this.anims.generateFrameNumbers(this.LEVEL4_TEXTURE, {frames: [1,0]}),
            repeat:0
        }
        this.anims.create(button4_unpress);
        animationKey = 'level5_button_flat';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        } 
        const button5_flat = {
            key:'level5_button_flat',
            frames:this.anims.generateFrameNumbers(this.LEVEL5_TEXTURE, { start:0, end:0}),
            repeat:-1
        };
        this.anims.create(button5_flat);
        animationKey = 'level5_button_press'
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey)
        }
        const button5_press = {
            key:'level5_button_press',
            frames:this.anims.generateFrameNumbers(this.LEVEL5_TEXTURE, {frames: [0,1]}),
            repeat:0
        }
        this.anims.create(button5_press);
        animationKey = 'level5_button_unpress';
        if(this.anims.exists(animationKey)){
            this.anims.remove(animationKey);
        }
        const button5_unpress = {
            key:'level5_button_unpress',
            frames:this.anims.generateFrameNumbers(this.LEVEL5_TEXTURE, {frames: [1,0]}),
            repeat:0
        }
        this.anims.create(button5_unpress);
        let x_offset = 1280/5 
        this.Level1 = this.add.sprite(x_offset+5,347,'Level1')
        this.Level1.play("level1_button_flat");
        this.Level1.setScale(.41);
        this.Level1.setInteractive();
        
        x_offset += 200
        this.Level2 = this.add.sprite(x_offset, 347, this.LEVEL2_TEXTURE);
        
        this.Level2.setScale(.41);
        this.Level2.setInteractive();
        
        x_offset += 200
        this.Level3 = this.add.sprite(x_offset, 347, this.LEVEL3_TEXTURE);
        this.Level3.setScale(.41);
        this.Level3.setInteractive();
        
        x_offset += 200
        this.Level4 = this.add.sprite(x_offset, 347, this.LEVEL4_TEXTURE);
        this.Level4.setScale(.41);
        this.Level4.setInteractive();
        
        x_offset += 200
        this.Level5 = this.add.sprite(x_offset, 347, this.LEVEL5_TEXTURE);
        this.Level5.setScale(.41);
        this.Level5.setInteractive();
        
        
        this.curr_tweener = this.Level1;
        this.Level1.on('pointerdown', () => {
            this.animlock = true;
            this.Level1.play("level1_button_press");
            this.time.delayedCall(300, () => {
                this.Level1.play('level1_button_unpress');
            }, [], this);
            this.cameras.main.fadeOut(200,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Level1');
            });
        });
        this.Level2.on('pointerdown', () => {
            if (this.registry.get("Level1Complete")) {
                this.animlock = true;
                this.Level2.play("level2_button_press");
                this.time.delayedCall(300, () => {
                    this.Level2.play("level2_button_unpress")
                }, [], this);
                this.cameras.main.fadeOut(200,0,0,0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('Level2');
                });
            }
            
        });
        this.Level3.on('pointerdown', () => {
            if (this.registry.get("Level2Complete")) {
                this.animlock = true;
                this.Level3.play("level3_button_press");
                this.time.delayedCall(300, () => {
                    this.Level3.play("level3_button_unpress");
                }, [], this);
                this.cameras.main.fadeOut(200,0,0,0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('Level3');
                });
            }

        });
        this.Level4.on('pointerdown', () => {
            if (this.registry.get("Level3Complete")) {
                this.animlock = true;
                this.Level4.play("level4_button_press");
                this.time.delayedCall(300, () => {
                    this.Level4.play("level4_button_unpress");
                }, [], this);
                this.cameras.main.fadeOut(200,0,0,0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('Level4');
                });
            }
        });
        this.Level5.on('pointerdown', () => {
            if (this.registry.get("Level4Complete")) {
                this.animlock = true;
                this.Level5.play("level5_button_press");
                this.time.delayedCall(300, () => {
                    this.Level5.play("level5_button_unpress");
                }, [], this);
                this.cameras.main.fadeOut(200,0,0,0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('Level5');
                });
            }

        });
        this.activeTween = this.addTweenFor(this.curr_tweener);
        this.animlock = false;
    }
    addTweenFor(target) {
        return this.tweens.add({
            targets: target,
            y: target.y - 10,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
    update() {
        let nextTweener = this.Level1;
        if (this.registry.get("Level1Complete")) {
            if (!this.animlock) {
                this.Level2.play("level2_button_flat");
            }
        } else {
            this.Level2.play("locked")
        }
        if (this.registry.get("Level2Complete")) {
            if (!this.animlock) {
                this.Level3.play("level3_button_flat");
            }
        } else {
            this.Level3.play("locked");
        }
        if (this.registry.get("Level3Complete")) {
            if (!this.animlock) {
                this.Level4.play("level4_button_flat");
            }
        } else {
            this.Level4.play("locked")
        } 
        if (this.registry.get("Level4Complete")) {
            if (!this.animlock) {
                this.Level5.play("level5_button_flat");
            }
        } else {
            this.Level5.play("locked");
        }
        if(this.registry.get("Level1Complete")) {
            nextTweener = this.Level2;
        }
        if(this.registry.get("Level2Complete")) {
            nextTweener = this.Level3;
        }
        if(this.registry.get("Level3Complete")) {
            nextTweener = this.Level4;
        }
        if(this.registry.get("Level4Complete")) {
            nextTweener = this.Level5
        }
        if (this.curr_tweener !== nextTweener) {
            this.curr_tweener = nextTweener;
            if (this.activeTween) {
                this.activeTween.stop();
            }
            this.activeTween = this.addTweenFor(this.curr_tweener);
        }
        this.background.tilePositionX += 2;
    }
    
}
