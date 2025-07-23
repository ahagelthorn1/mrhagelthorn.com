export class Pipe extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,scale,type,slot) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(scale);
        this.setInteractive();
        this.type = type;
        this.rotationState = 0;      
        this.flow_signal = 0;
        this.on('pointerdown', () => turnPipe());
        this.win = false;
        this.slot = slot;
        const turnPipe = () => {
            if (this.type != "start" && this.slot.board.valve.flow_start != 1) {
                this.rotationState = (this.rotationState + 1) % 4;
                this.rotation = this.rotationState * (Math.PI / 2);
            }
        }
        this.anims.create({
            key: "curved",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("curved", {start:0, end:0}),
            repeat:-1
        })
        this.anims.create({
            key: "standard",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("standard", {start:0, end:0}),
            repeat:-1
        })
        this.anims.create({
            key: "bent",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("bent", {start:0, end:0}),
            repeat:-1
        })
        this.anims.create({
            key: "fcurved",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("fcurved", {start:0, end:0}),
            repeat:-1
        })
        this.anims.create({
            key: "tank",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("tank", {start:0, end:0}),
            repeat:-1
        })
        this.anims.create({
            key: "ftank",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("ftank", {start:0, end:0}),
            repeat:-1
        })
        this.anims.create({
            key: "fstandard",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("fstandard", {start:6, end:6}),
            repeat:-1
        })
        this.anims.create({
            key: "fbent",
            frameRate:7,
            frames:this.anims.generateFrameNumbers("fbent", {start:0, end:0}),
            repeat:-1
        })
    }
    out() {
        console.log(this.type);
    }
    play() {
        if (this.type == "standard") {
            this.anims.play("fstandard");
        } else if (this.type == "curved") {
            this.anims.play("fcurved");
        } else if (this.type == "tank") {
            this.anims.play("ftank");
            this.win = true;
        } else if (this.type == "bent") {
            this.anims.play("fbent");
        } else if (this.type == "and") {
            this.anims.play("fcurved");
        } else if (this.type == "or") {
            this.anims.play("fcurved");
        } else if (this.type == "not") {
            this.anims.play("fstandard");
        }
        if (!this.slot.board.flowingPipes.includes(this) && !this.slot.board.stop) {
            this.slot.board.flowingPipes.push(this);
        }
    }
    unPlay() {
        if (this.type == "standard") {
            this.anims.play("standard");
        } else if (this.type == "curved") {
            this.anims.play("curved");
        } else if (this.type == "tank") {
            this.anims.play("tank");
            this.win = false;
        } else if (this.type == "bent") {
            this.anims.play("bent");
        } else if (this.type == "and") {
            this.anims.play("curved");
        } else if (this.type == "or") {
            this.anims.play("curved");
        } else if (this.type == "not") {
            this.anims.play("standard");
        }
    }
    addedToScene() {
    }


    removedFromScene() {

    }

    update() {

    }
}