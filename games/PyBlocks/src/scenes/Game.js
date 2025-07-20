import { CommandBox } from '../CommandBox.js';
import { InputController } from '../InputController.js';
import { ScoreBox } from '../ScoreBox.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("White", "assets/white.png");
        this.load.image("winscreen", "assets/winscreen.png");
        this.load.image("Grapefruit", "assets/grapefruit.png");
        this.load.spritesheet("ScoreBox", "assets/scorebox.png",{frameWidth:900,frameHeight:900});
        this.load.spritesheet("CommandBox", "assets/box.png", {frameWidth:900, frameHeight:288});
        this.load.spritesheet("Left", "assets/left.png", { frameHeight: 900, frameWidth: 900 });
        this.load.spritesheet("Right", "assets/right.png", { frameHeight: 900, frameWidth: 900 });
        this.load.spritesheet("Up", "assets/up.png", { frameWidth: 900, frameHeight: 900 });
        this.load.spritesheet("Down", "assets/down.png", { frameHeight: 900, frameWidth: 900 });
        this.load.bitmapFont("micro5", "assets/micro5.png", "assets/micro5.fnt");
        this.load.json("SequenceData", "assets/sequence.json");
    }

    create() {
        this.cameras.main.fadeIn(200,0,0,0);
        this.comboTimer = 2000;
        this.score = 0
        this.idCache = [];
        this.goTo = 680;
        this.BACKING_BOX_TEXTURE = "background";
        this.COMMAND_BOX_TEXTURE = "CommandBox";
        this.INPUT_CONTROLLER_TEXTURE = "";

        this.add.image(400, 375, "background");

        this.backing_box = this.add.tileSprite(0,0,1290, 720, this.BACKING_BOX_TEXTURE);
        this.backing_box.setOrigin(0, 0);

        const sequenceData = this.ReadSequenceData();
        this.snippets = sequenceData.snippets;
        this.commands = sequenceData.commands;
        this.ids = sequenceData.ids;

        this.command_box_repository = this.EstablishCommandBoxRepository();
        this.AssignCommands();

        this.input_controller = new InputController(this, 1100, 700, null);
        this.input_controller.setVisible(false);
        this.input_controller.setScale(4);

        this.currCommandBox = this.DetermineCurrCommandBox();
        this.combo=1;
        this.timer=0;
        this.ScoreBox = new ScoreBox(this,1100,150,'ScoreBox');
        this.timerStarted = false;
        this.startTime = null;
        this.game_over = false;
        
    }
    getUnique(arr) {
        let question = this.getRandomItems(arr,1)[0];
        if (this.idCache.length != 0) {
            while (this.idCache.includes(question.id)) {
                question = this.getRandomItems(arr,1)[0];
            }
        }
        this.idCache.push(question.id);
        return question;
    }
    ReadSequenceData() {
        const jsonData = this.cache.json.get('SequenceData');
        const difficulty1 = jsonData.difficulty1;
        const difficulty2 = jsonData.difficulty2;
        const difficulty3 = jsonData.difficulty3;
        const difficulty4 = jsonData.difficulty4;
        const difficulty5 = jsonData.difficulty5;
        const difficulty6 = jsonData.difficulty6;
        const difficulty7 = jsonData.difficulty7;
        const difficulty8 = jsonData.difficulty8;
        const mergedData = [];
        let cnt = 0
        let question;
        while (cnt < 160) {
            if (cnt < 5) {
                question = this.getUnique(difficulty1);
            } else if (cnt < 10) {
                question = this.getUnique(difficulty2);
            } else if (cnt < 15) {
                question = this.getUnique(difficulty1);
            } else if (cnt < 20) {
                question = this.getUnique(difficulty3);
            } else if (cnt < 25) {
                question = this.getUnique(difficulty1);
            } else if (cnt < 30) {
                question = this.getUnique(difficulty2);
            } else if (cnt < 35) {
                question = this.getUnique(difficulty1);
            } else if (cnt < 40) {
                question = this.getUnique(difficulty4);
            } else if (cnt < 45) {
                question = this.getUnique(difficulty2);
            } else if (cnt < 50) {
                question = this.getUnique(difficulty3);
            } else if (cnt < 55) {
                question = this.getUnique(difficulty4);
            } else if (cnt < 60) {
                question = this.getUnique(difficulty2);
            } else if (cnt < 65) {
                question = this.getUnique(difficulty3);
            } else if (cnt < 70) {
                question = this.getUnique(difficulty5);
            } else if (cnt < 75) {
                question = this.getUnique(difficulty4);
            } else if (cnt < 80) {
                question = this.getUnique(difficulty3);
            } else if (cnt < 85) {
                question = this.getUnique(difficulty6);
            } else if (cnt < 90) {
                question = this.getUnique(difficulty4);
            } else if (cnt < 95) {
                question = this.getUnique(difficulty5);
            } else if (cnt < 100) {
                question = this.getUnique(difficulty7);
            } else if (cnt < 105) {
                question = this.getUnique(difficulty5);
            } else if (cnt < 110) {
                question = this.getUnique(difficulty6);
            } else if (cnt < 115) {
                question = this.getUnique(difficulty7);
            } else if (cnt < 120) {
                question = this.getUnique(difficulty5);
            } else if (cnt < 125) {
                question = this.getUnique(difficulty6);
            } else if (cnt < 130) {
                question = this.getUnique(difficulty8);
            } else if (cnt < 135) {
                question = this.getUnique(difficulty6);
            } else if (cnt < 140) {
                question = this.getUnique(difficulty7);
            } else if (cnt < 145) {
                question = this.getUnique(difficulty8);
            } else if (cnt < 150) {
                question = this.getUnique(difficulty7);
            } else if (cnt < 160) {
                question = this.getUnique(difficulty8);
            }
            mergedData.push(question);
            cnt += 1;
        }
        const snippets = mergedData.map(entry => entry.question.split('\n'));
        const commands = mergedData.map(entry => entry.answer);
        const ids = mergedData.map(entry => entry.id);
        return { snippets, commands, ids };
    }

    getRandomItems(arr, num) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    EstablishCommandBoxRepository() {
        const command_box_repository = [];
        this.vertical_gap = 20;
        const padding = 16;
        const lineHeight = 64;
        let current_y = this.goTo;

        for (let i = 0; i < this.snippets.length; i++) {
            const snippetList = this.snippets[i];
            const commandList = this.commands[i];
            const snippetCount = snippetList.length;
            const boxHeight = (snippetCount * lineHeight) + padding;
            const final_y = current_y - boxHeight / 2;
            const start_y = final_y - 100;
            const box = new CommandBox(this, 450, start_y, this.COMMAND_BOX_TEXTURE);
            box.setState('white');
            box.originalIndex = i;
            box.finalY = final_y;
            box.code = snippetList;
            box.command = commandList;
            box.id = this.ids[i];
            current_y = final_y - boxHeight / 2 - this.vertical_gap;
            command_box_repository.push(box);
        }

        return command_box_repository;
    }

    UpdateMovementSpeed(delay) {
        return (50 * delay) / 100;
    }

    ShiftCommandBoxes() {
        if (this.input_controller.pass) {
            this.input_controller.pass = false;
            this.shouldShiftBoxes = true;
            if (this.currCommandBox) {
                this.currCommandBox.isMovingOut = true;
            }
        }
    }

    AssignCommands() {
        for (let i = 0; i < this.command_box_repository.length; i++) {
            this.command_box_repository[i].command = this.commands[i];
            this.command_box_repository[i].code = this.snippets[i];
            this.command_box_repository[i].updateText();
        }
    }

    DetermineCurrCommandBox() {
        if (this.currCommandBox && this.currCommandBox.y > this.goTo) {
            this.command_box_repository.splice(this.command_box_repository.indexOf(this.currCommandBox), 1);
            this.currCommandBox.destroy();

            let current_y = this.goTo;
            const padding = 16;
            const lineHeight = 64;

            for (let i = 0; i < this.command_box_repository.length; i++) {
                const box = this.command_box_repository[i];
                const codeCount = box.code.length;
                const boxHeight = (codeCount * lineHeight) + padding;
                const newFinalY = current_y - boxHeight / 2;

                box.finalY = newFinalY;
                current_y = newFinalY - boxHeight / 2 - this.vertical_gap;
            }

            this.startTime = this.time.now;
            this.ScoreBox.setState("green");
            this.comboWindowActive = true;
        }

        return this.command_box_repository[0];
    }


    updateScore() {
        this.score += 1 * this.combo;
    }
    CheckKeyboardInput() {
        if (!this.currCommandBox) return false;

        const instructionSequence = this.input_controller.InstructionSequence;
        const commandList = this.currCommandBox.command;

        if (this.currCommandBox.state === "green") return false;

        for (let i = 0; i < instructionSequence.length; i++) {
            if (instructionSequence[i] !== commandList[i]) {
                this.currCommandBox.setState("red");
                this.combo = 1;
                this.input_controller.InstructionSequence = [];
                this.ScoreBox.setState("white");
                this.comboWindowActive = false;
                return false;
            } else {
                this.currCommandBox.setState("white");
            }
        }

        if (instructionSequence.length === commandList.length) {
            this.currCommandBox.setState("green");

            const timeTaken = this.time.now - this.startTime;
            if (timeTaken < this.comboTimer) {
                this.combo += 1;
            }
            this.combo += 1;
            this.updateScore();
            this.input_controller.InstructionSequence = [];
            this.startTime = null;
            this.comboWindowActive = false;
            return true;
        }

        return false;
    }


    MoveBoxesTowardTarget() {
        const padding = this.vertical_gap;

        for (let i = 0; i < this.command_box_repository.length; i++) {
            const box = this.command_box_repository[i];

            if (box.isMovingOut) {
                box.changeY(this.movement_speed);
                if (box.y > this.goTo) {
                    box.isMovingOut = false;
                }
                continue;
            }

            const dy = box.finalY - box.y;
            if (Math.abs(dy) > padding) {
                const moveAmount = Math.sign(dy) * this.movement_speed;
                if (Math.abs(moveAmount) > Math.abs(dy)) {
                    box.changeY(dy);
                } else {
                    box.changeY(moveAmount);
                }
            }
        }
    }

    update(time, delay) {
        if (this.command_box_repository.length == 0) {
            this.game_over = true;
            this.input_controller.up.setVisible(false);
            this.input_controller.down.setVisible(false);
            this.input_controller.left.setVisible(false);
            this.input_controller.right.setVisible(false);
            if (!this.topText) {
                this.topText = this.add.bitmapText(50,20,'micro5',"Well done.", 128);
            }
            if (!this.bottomText) {
                this.bottomText = this.add.bitmapText(50,600,'micro5',"You win a grapefruit.", 128);
            }
            if (!this.grapefruit) {
                this.grapefruit = this.add.image(300,400,"Grapefruit");
                this.grapefruit.setScale(.3);
            }
        }
        if (this.comboWindowActive && this.time.now - this.startTime > this.comboTimer) {
            this.ScoreBox.setState("white");
            this.comboWindowActive = false;
        }

        if (!this.timerStarted && this.input_controller.InstructionSequence.length > 0) {
            this.timerStarted = true;
            this.timer_start = this.time.now
        }


        if (this.timerStarted && !this.game_over) {
            const elapsedTime = Math.floor((this.time.now-this.timer_start) / 1000);
            const minutes = Math.floor(elapsedTime / 60);
            let seconds = elapsedTime % 60;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            this.ScoreBox.timer_text.setText(`${minutes}:${seconds}`);
        }
        this.ScoreBox.score_text.setText(this.score);
        this.ScoreBox.updateCombo();
        this.backing_box.tilePositionX += 2;
        this.movement_speed = this.UpdateMovementSpeed(delay);
        this.currCommandBox = this.DetermineCurrCommandBox();
        this.ShiftCommandBoxes();
        this.MoveBoxesTowardTarget();

        if (this.CheckKeyboardInput()) {
            this.input_controller.pass = true;
            this.input_controller.InstructionSequence = [];
        }
    }
}
