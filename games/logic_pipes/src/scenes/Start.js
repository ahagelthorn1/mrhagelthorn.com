import { Pipe } from './Pipe.js';
import { Gate } from './Gate.js';
export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('black_deathbox', 'assets/black_deathbox.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('button', 'assets/button.png');
        this.load.spritesheet("standard","assets/standard.png", { frameWidth: 900, frameHeight: 900});
        this.load.image('not', 'assets/not.png');
        this.load.spritesheet("curved","assets/curved.png", { frameWidth: 900, frameHeight: 900});
        this.load.image('and', 'assets/and.png');
        this.load.image('or', 'assets/or.png');
        this.load.spritesheet("bent", 'assets/bent.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("tank","assets/tank.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("bent", 'assets/bent.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("fbent","assets/fbent.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("fstandard","assets/fstandard.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("fcurved","assets/fcurved.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("ftank", 'assets/ftank.png', {frameWidth: 900, frameHeight: 900});
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        this.logo = this.add.image(640, 200, 'logo');
        this.button = this.add.sprite(650, 500, 'button');
        this.button.setScale(.5);
        this.button.setInteractive();
        this.options = ["standard", "curved", "bent","or","not","and"];
        this.gates = ["not","and","or"];
        this.button.on('pointerdown', () => this.onclick());
        this.topChoice = null;
        this.midChoice = null;
        this.bottomChoice = null;
        this.deathblock = null;
    }

    onclick() {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start("Menu");
        });
    }
    getRandom(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const item = array[randomIndex];
        return item;
    }
    update(time,delay) {
        this.movementSpeed = delay/2;
        function unpack(choice,scene) {
            if(!scene.gates.includes(choice)) {
                choice = new Pipe(scene,-100,-100,choice,.10,choice,null);
                return [choice];
            } else {
                let choice1;
                let choice2;
                if (choice == "not") {
                    choice1 = new Pipe(scene,-100,-100, "standard",.10, "not",null);
                    choice2 = new Gate(scene,-100,-100,"not",.10,"not");
                } else if (choice == "or") {
                    choice1 = new Pipe(scene,-100,-100,"curved",.10,"or",null);
                    choice2 = new Gate(scene,-100,-100,"or",.10,"or");
                } else if (choice == "and") {
                    choice1 = new Pipe(scene,-100,-100,"curved",.10,"and",null);
                    choice2 = new Gate(scene,-100,-100,"and",.10,"and");
                }
                return [choice1,choice2];
            }
        }
        function topRow(choice,speed) {
            for (let i = 0; i < choice.length; i++) {
                choice[i].y = 75;
                if (choice[i].x > 1400) {
                    return 0;
                } else {
                    choice[i].x += speed;
                    choice[i].rotation += .01;
                }
            }
        }
        function midRow(choice,speed) {
            if (choice[0].x == -100) {
                for (let i = 0; i < choice.length; i++ ) {
                    choice[i].x = 1400;
                }
            }
            for (let i = 0; i < choice.length; i++) {
                choice[i].y = 350;
                if (choice[i].x > -100 && choice[i].x < -90) {
                    return 0;
                } else {
                    choice[i].x -= speed;
                    choice[i].rotation += .01;
                }
            }
                
        }
        function bottomRow(choice,speed) {
            for (let i = 0; i < choice.length; i++) {
                choice[i].y = 675;
                if (choice[i].x > 1400) {
                    return 0;
                } else {
                    choice[i].x += speed;
                    choice[i].rotation += .01;
                }
            }
        }
        if (this.topChoice == null) {
            this.topChoice = this.getRandom(this.options, this.movementSpeed);
        } else {
            if (typeof this.topChoice == "string") {
                this.topChoice = unpack(this.topChoice,this);
            }
            let flag = topRow(this.topChoice,this.movementSpeed+2);
            if (flag == 0) {
                this.topChoice = null;
            }
        }
        if (this.midChoice == null) {
            this.midChoice = this.getRandom(this.options);
        } else {
            if (typeof this.midChoice == "string") {
                this.midChoice = unpack(this.midChoice,this);
            }
            let flag = midRow(this.midChoice,this.movementSpeed);
            if (flag == 0) {
                this.midChoice = null;
            }
        }
        if (this.bottomChoice == null) {
            this.bottomChoice = this.getRandom(this.options);
        } else {
            if (typeof this.bottomChoice == "string") {
                this.bottomChoice = unpack(this.bottomChoice,this);
            }
            let flag = bottomRow(this.bottomChoice,this.movementSpeed-2);
            if (flag == 0) {
                this.bottomChoice = null;
            }
        }
    }
    
}
