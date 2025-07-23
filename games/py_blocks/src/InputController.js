export class InputController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'InputController');
        scene.add.existing(this);
        this.setInteractive();
        this.pass = false;
        this.InstructionSequence = [];
        
        this.keyPressed = {
            UP: false,
            DOWN: false,
            LEFT: false,
            RIGHT: false
        };

        this.keyCooldown = {
            UP: 100,
            DOWN: 100,
            LEFT: 100,
            RIGHT: 100
        };
        
        this.lastPressedTime = {
            UP: 0,
            DOWN: 0,
            LEFT: 0,
            RIGHT: 0
        };

        const y_off = this.y - 77;
        const y_diff = 120;
        const x_diff = 120;
        const x_off = this.x - 15;
        this.up = this.scene.add.sprite(x_off, y_off - y_diff, "Up");
        this.down = this.scene.add.sprite(x_off, y_off - 10, "Down");
        this.left = this.scene.add.sprite(x_off - x_diff, y_off, "Left");
        this.right = this.scene.add.sprite(x_off + x_diff, y_off, "Right");
        this.generateAnimationKey("Up");
        this.generateAnimationKey("Down");
        this.generateAnimationKey("Left");
        this.generateAnimationKey("Right");

        this.up.play("Up_flat");
        this.down.play("Down_flat");
        this.left.play("Left_flat");
        this.right.play("Right_flat");

        const scaleFactor = 0.15;
        this.up.setScale(scaleFactor);
        this.down.setScale(scaleFactor);
        this.left.setScale(scaleFactor);
        this.right.setScale(scaleFactor);

        this.scene.input.keyboard.on('keydown-UP', () => this.handleKeyPress("UP", this.up, "Up_pressed"));
        this.scene.input.keyboard.on('keyup-UP', () => this.handleKeyRelease("UP", this.up));

        this.scene.input.keyboard.on('keydown-DOWN', () => this.handleKeyPress("DOWN", this.down, "Down_pressed"));
        this.scene.input.keyboard.on('keyup-DOWN', () => this.handleKeyRelease("DOWN", this.down));

        this.scene.input.keyboard.on('keydown-LEFT', () => this.handleKeyPress("LEFT", this.left, "Left_pressed"));
        this.scene.input.keyboard.on('keyup-LEFT', () => this.handleKeyRelease("LEFT", this.left));

        this.scene.input.keyboard.on('keydown-RIGHT', () => this.handleKeyPress("RIGHT", this.right, "Right_pressed"));
        this.scene.input.keyboard.on('keyup-RIGHT', () => this.handleKeyRelease("RIGHT", this.right));
    }

    handleKeyPress(key, sprite, animation) {
        const currentTime = Date.now();
        const cooldown = this.keyCooldown[key];

        if (this.keyPressed[key] || (currentTime - this.lastPressedTime[key] < cooldown)) {
            return;
        }

        this.keyPressed[key] = true;
        this.lastPressedTime[key] = currentTime;
        sprite.play(animation);
        this.InstructionSequence.push(key);
    }

    handleKeyRelease(key, sprite) {
        this.keyPressed[key] = false;
        sprite.play(`${sprite.texture.key}_flat`);
    }

    generateAnimationKey(textureName) {
        let animationKey = textureName + "_flat";
        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey);
        }

        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers(textureName, { start: 0, end: 0 }),
            repeat: 0
        });

        animationKey = textureName + "_pressed";

        if (this.scene.anims.exists(animationKey)) {
            this.scene.anims.remove(animationKey);
        }

        this.scene.anims.create({
            key: animationKey,
            frames: this.scene.anims.generateFrameNumbers(textureName, { start: 0, end: 1 }),
            repeat: 0
        });
    }
}
