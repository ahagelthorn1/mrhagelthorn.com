export class MenuButton extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,scale,num) {
        super(scene,x,y,texture);
        this.setScale(scale);
        this.scene = scene
        this.num = num;
        scene.add.existing(this);
        this.hasPlayedTwoUnlock = false;
        this.hasPlayedThreeUnlock = false;
        this.hasPlayedFourUnlock = false;
        this.hasPlayedFiveUnlock = false;
        this.hasPlayedSixUnlock = false;
        this.hasPlayedSevenUnlock = false;
        this.hasPlayedEightUnlock = false;
        this.hasPlayedNineUnlock = false;
        this.hasPlayedTenUnlock = false;
        this.hasPlayedElevenUnlock = false;
        this.hasPlayedBossUnlock = false;
        this.anims.create({
            key: "one",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("one", {start:0, end:0}),
            repeat:-1
        });
        this.anims.create({
            key: "two_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("two_unlock", {start:0, end:4}),
            repeat: 0
        });
        this.anims.create({
            key: "three_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("three_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "four_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("four_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "five_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("five_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "six_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("six_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "seven_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("seven_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "eight_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("eight_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "nine_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("nine_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "ten_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("ten_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "eleven_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("eleven_unlock", {start:0, end:4}),
            repeat:0
        })
        this.anims.create({
            key: "boss_unlock",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("boss_unlock", {start:0, end:4}),
            repeat:0
        })
        this.setInteractive();
        this.on('pointerdown', () => goToLevel());
        const goToLevel = () => {
            let levelString = "Level" + (this.num-1).toString() + "Won";
            if (this.scene.registry.get(levelString)) {
                let newLevelString = "Level" + this.num;
                this.scene.change=newLevelString;
            }
        }
    }
    play() {
        if (this.scene.registry.get("Level1Won") && this.num == 2) {
            if (!this.anims.isPlaying && !this.hasPlayedTwoUnlock && !this.scene.registry.get("Level2Won")) {
                this.anims.play("two_unlock");
                this.hasPlayedTwoUnlock = true;
            }
        } else if (this.scene.registry.get("Level2Won") && this.num == 3) {
            if (!this.anims.isPlaying && !this.hasPlayedThreeUnlock && !this.scene.registry.get("Level3Won")) {
                this.anims.play("three_unlock");
                this.hasPlayedThreeUnlock = true;
            }
        } else if (this.scene.registry.get("Level3Won") && this.num == 4) {
            if(!this.anims.isPlaying && !this.hasPlayedFourUnlock && !this.scene.registry.get("Level4Won")) {
                this.anims.play("four_unlock");
                this.hasPlayedFourUnlock = true;
            }
        } else if (this.scene.registry.get("Level4Won") && this.num == 5) {
            if(!this.anims.isPlaying && !this.hasPlayedFiveUnlock && !this.scene.registry.get("Level5Won")) {
                this.anims.play("five_unlock");
                this.hasPlayedFiveUnlock = true;
            }
        } else if (this.scene.registry.get("Level5Won") && this.num == 6) {
            if(!this.anims.isPlaying && !this.hasPlayedSixUnlock && !this.scene.registry.get("Level6Won")) {
                this.anims.play("six_unlock");
                this.hasPlayedSixUnlock = true;
            }
        } else if (this.scene.registry.get("Level6Won") && this.num == 7) {
            if(!this.anims.isPlaying && !this.hasPlayedSevenUnlock && !this.scene.registry.get("Level7Won")) {
                this.anims.play("seven_unlock");
                this.hasPlayedSevenUnlock = true;
            }
        } else if (this.scene.registry.get("Level7Won") && this.num == 8) {
            if(!this.anims.isPlaying && !this.hasPlayedEightUnlock && !this.scene.registry.get("Level8Won")) {
                this.anims.play("eight_unlock");
                this.hasPlayedEightUnlock = true;
            }
        } else if (this.scene.registry.get("Level8Won") && this.num == 9) {
            if(!this.anims.isPlaying && !this.hasPlayedNineUnlock && !this.scene.registry.get("Level9Won")) {
                this.anims.play("nine_unlock");
                this.hasPlayedNineUnlock = true;
            }
        } else if (this.scene.registry.get("Level9Won") && this.num == 10) {
            if (!this.anims.isPlaying && !this.hasPlayedTenUnlock && !this.scene.registry.get("Level10Won")) {
                this.anims.play("ten_unlock");
                this.hasPlayedTenUnlock = true;
            }
        } else if (this.scene.registry.get("Level10Won") && this.num == 11) {
            if (!this.anims.playing && !this.hasPlayedElevenUnlock && !this.scene.registry.get("Level11Won")) {
                this.anims.play("eleven_unlock");
                this.hasPlayedElevenUnlock = true;
            }
        } else if (this.scene.registry.get("Level11Won") && this.num == 12) {
            if (!this.anims.playing && !this.hasPlayedBossUnlock && !this.scene.registry.get("BossLevelWon") ) {
                this.anims.play("boss_unlock");
                this.hasPlayedBossUnlock = true;
            }
        }
    }

}