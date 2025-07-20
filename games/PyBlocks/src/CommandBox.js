export class CommandBox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'CommandBox');
        scene.add.existing(this);
        this.command = []; 
        this.code;
        this.originalIndex;
        let animationKey = "whiteBox"
        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey);
        }
        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers('CommandBox', { start: 0, end: 0 }),
            repeat: 0
        });
        animationKey = "greenBox"
        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey);
        }
        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers('CommandBox', { start: 1, end: 1 }),
            repeat: 0
        });
        animationKey = "redBox"
        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey);
        }
        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers('CommandBox', { start: 2, end: 2 }),
            repeat: 0
        });
    }
    setState(state) {
        switch (state) {
            case 'green':
                this.play('greenBox');
                this.state = 'green';
                break;
            case 'red':
                this.play('redBox');
                this.state = 'red';
                break;
            case 'white':
                this.play('whiteBox');
                this.state = 'white';
                break;
            default:
                this.play('whiteBox');
                this.state = 'white';
                break;
        }
    }

    assignCommandString() {
        let commandString = "";
        for (let i = 0; i < this.command.length; i++) {
            commandString += this.command[i];
            if (i != this.command.length - 1){
                commandString += "\n";
            }
        }
        return commandString;
    }
    assignCodeString() {
        let codeString = "";
        for (let i = 0; i < this.code.length; i++) {
            codeString += this.code[i];
            if (i != this.code.length - 1) {
                codeString += "\n";
            }
        }
        return codeString;
    }
    updateText() {
        this.codeString = this.assignCodeString();
        if (!this.code_text) {
            this.code_text = this.scene.add.bitmapText(this.x-400, this.y, 'micro5', this.codeString, 64);
            this.code_text.setTint(0xffffff);
            this.code_text.setOrigin(0,.5);
        }
        this.Stretch();
    }
    Stretch() {
        this.scaleX = .11 * 8.65;
        const lineHeight = 64;
        const padding = 16;
        const codeHeight = (this.code.length * lineHeight) + (padding * 2);
        this.displayHeight = codeHeight;
    }
    changeY(amount) {
        this.y += amount;
        this.code_text.y += amount;
    }
    destroy(fromScene) {
        if (this.code_text) {
            this.code_text.destroy();
            this.code_text = null;
        }
        super.destroy(fromScene);
    }
}