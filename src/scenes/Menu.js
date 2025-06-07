import { MenuButton } from './MenuButton.js';
import { Shape } from './Shape.js';
export class Menu extends Phaser.Scene {

    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('menu_background', 'assets/menu_background.png');
        this.load.image('lvl1_background', 'assets/lvl1_background.png');
        this.load.image("black_deathbox", 'assets/black_deathbox');
        this.load.image('select_level', 'assets/select_level.png');
        this.load.image('fcurved', 'assets/fcurved.png');
        this.load.image('box', 'assets/box.png');
        this.load.image('two', 'assets/two.png');
        this.load.image('three', 'assets/three.png');
        this.load.image('four', 'assets/four.png');
        this.load.image('five', 'assets/five.png');
        this.load.image('six', 'assets/six.png');
        this.load.image('seven', 'assets/seven.png');
        this.load.image('eight', 'assets/eight.png');
        this.load.image('nine', 'assets/nine.png');
        this.load.image('ten', 'assets/ten.png');
        this.load.image('eleven', 'assets/eleven.png');
        this.load.image('boss', 'assets/boss.png');
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
        this.load.spritesheet("one","assets/lvl1.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("two_unlock","assets/two_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("three_unlock", "assets/three_unlock.png", { frameWidth: 450, frameHeight:450});
        this.load.spritesheet("four_unlock", "assets/four_unlock.png", {frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("five_unlock", "assets/five_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("six_unlock", "assets/six_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("seven_unlock", "assets/seven_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("eight_unlock", "assets/eight_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("nine_unlock", "assets/nine_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("ten_unlock", "assets/ten_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("eleven_unlock", "assets/eleven_unlock.png", { frameWidth: 450, frameHeight: 450});
        this.load.spritesheet("boss_unlock", "assets/boss_unlock.png", {frameWidth:450, frameHeight:450});
        this.load.image('lock','assets/lock.png')
    }
    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'black_deathbox');
        this.menu_background = this.add.tileSprite(-1 *(1280),375,1280 * 2,720 * 2, "menu_background");
        this.select_level = this.add.tileSprite(640,-360, 900,300,'select_level');
        this.box = this.add.tileSprite(640,1640, 900,450,'box');
        let offset = 420-280;
        let y_offset = 390/2;
        this.change="";
        this.topButtons = [];
        if (this.registry.get('Level0Won') === undefined) {
            this.registry.set('Level0Won', true);
        }
        if (this.registry.get('Level1Won') === undefined) {
            this.registry.set('Level1Won', false);
        }
        if (this.registry.get('Level2Won') == undefined) {
            this.registry.set('Level2Won', false);
        } 
        if (this.registry.get('Level3Won') == undefined) {
            this.registry.set('Level3Won', false);
        }
        if (this.registry.get('Level4Won') == undefined) {
            this.registry.set('Level4Won', false);
        }
        if (this.registry.get('Level5Won') == undefined) {
            this.registry.set('Level5Won',false);
        }
        if (this.registry.get('Level6Won') == undefined) {
            this.registry.set("Level6Won", false);
        }
        if (this.registry.get("Level7Won") == undefined) {
            this.registry.set("Level7Won",false);
        }
        if (this.registry.get('Level8Won') == undefined) {
            this.registry.set('Level8Won',false);
        }
        if (this.registry.get('Level9Won') == undefined) {
            this.registry.set('Level9Won',false);
        } if (this.registry.get('Level10Won') == undefined) {
            this.registry.set('Level10Won', false);
        } if (this.registry.get('Level11Won') == undefined) {
            this.registry.set('Level11Won', false);
        } if (this.registry.get('BossLevelWon') == undefined) {
            this.registry.set("BossLevelWon", false);
        }
        for (let i = 0; i < 6; i++) {
            if (i == 0 && this.registry.get("Level0Won")) {
                this.temp = new MenuButton(this,280+(offset * i),1640, 'one',.2,i+1); 
            } else if (i == 1 && this.registry.get("Level2Won")) {  
                this.temp = new MenuButton(this,280+(offset * i), 1640, 'two',.2,i+1);
            } else if (i == 2 && this.registry.get("Level3Won")) {
                this.temp = new MenuButton(this,280+(offset * i), 1640, 'three',.2,i+1);
            } else if (i == 3 && this.registry.get("Level4Won")) {  
                this.temp = new MenuButton(this,280+(offset * i), 1640, 'four',.2,i+1);
            } else if (i == 4 && this.registry.get("Level5Won")) {
                this.temp = new MenuButton(this,280+(offset * i),1640, 'five',.2,i+1);
            } else if (i == 5 && this.registry.get("Level6Won")) {
                this.temp = new MenuButton(this,280+(offset * i),1640, 'six',.2,i+1);  
            } else {
                this.temp = new MenuButton(this,280+(offset * i),1640, 'lock',.2,i+1); 
            }
            this.topButtons.push(this.temp);  
        }
        this.bottomButtons = [];
        for (let i=0; i < 6; i++) {
            if (i == 0 && this.registry.get("Level7Won")) {
                this.temp = new MenuButton(this,280+(offset*i),1640+y_offset,'seven',.2,7);
            } else if (i == 1 && this.registry.get("Level8Won")) {
                this.temp = new MenuButton(this,280+(offset*i),1640+(y_offset),'eight',.2,8);
            } else if (i == 2 && this.registry.get("Level9Won")) {
                this.temp = new MenuButton(this,280+(offset*i),1640+(y_offset),'nine',.2,9);
            } else if (i == 3 && this.registry.get("Level10Won")) {
                this.temp = new MenuButton(this,280+(offset*i),1640+(y_offset),'ten',.2,10);
            } else if (i == 4 && this.registry.get("Level11Won")) {
                this.temp = new MenuButton(this,280+(offset*i),1640+(y_offset),'eleven',.2,11);
            } else if (i == 5 && this.registry.get("BossLevelWon")) {
                this.temp = new MenuButton(this,280+(offset*i),1640+(y_offset),'boss',.2,12);
            } else {
                this.temp = new MenuButton(this,280+(offset * i),1640+y_offset, 'lock',.2,i+6+1); 
            }
            this.bottomButtons.push(this.temp);
        }
        this.deathblock = null;
        this.options = ["standard", "curved", "bent","or","not","and"];
        this.gates = ["not","and","or"];
        this.topLeftChoice = null;
        this.bottomLeftChoice = null;
        this.bottomRightChoice = null;
        this.topRightChoice = null;
    }
    getRandom(array) {
            const randomIndex = Math.floor(Math.random() * array.length);
            const item = array[randomIndex];
            return item;
    }
    update() {
        function unpack(choice,scene) {
            let scaling_factor = .1;
            if(!scene.gates.includes(choice)) {
                choice = new Shape(scene,-1000,-1000,choice,scaling_factor);
                return [choice];
            } else {
                let choice1;
                let choice2;
                if (choice == "not") {
                    choice1 = new Shape(scene,-1000,-1000,"standard",scaling_factor);
                    choice2 = new Shape(scene,-1000,-1000,"not",scaling_factor);
                } else if (choice == "or") {
                    choice1 = new Shape(scene,-1000,-1000,"curved",scaling_factor);
                    choice2 = new Shape(scene,-1000,-1000,"or",scaling_factor);
                } else if (choice == "and") {
                    choice1 = new Shape(scene,-1000,-1000,"curved",scaling_factor);
                    choice2 = new Shape(scene,-1000,-1000,"and",scaling_factor);
                }
                return [choice1,choice2];
            }
        }
        function topLeft(choice) {
            for (let i = 0; i < choice.length; i++) {
                if (choice[i].y != 200) {
                    choice[i].y += 12.5;
                }
                if (choice[i].x != 100) {
                    choice[i].x += 12.5;
                }
                choice[i].rotation += .01;
            }
        }
        function topRight(choice) {
            for (let i = 0; i < choice.length; i++) {
                if (choice[i].y != 200) {
                    choice[i].y += 12.5;
                }
                if (choice[i].x != 1200) {
                    choice[i].x += 12.5;
                }
                choice[i].rotation += .01;
            }
        }
        function bottomLeft(choice) {
            for (let i = 0; i < choice.length; i++) {
                if (choice[i].y != 600) {
                    choice[i].y += 12.5;
                }
                if (choice[i].x != 100) {
                    choice[i].x += 12.5;
                }
                choice[i].rotation += .01;
            }
                
        }
        function bottomRight(choice) {
            for (let i = 0; i < choice.length; i++) {
                if (choice[i].y != 600) {
                    choice[i].y += 12.5;
                }
                if (choice[i].x != 1200) {
                    choice[i].x += 12.5;
                }
                choice[i].rotation += .01;
            }
        }
        if (this.topLeftChoice == null) {
            this.topLeftChoice = this.getRandom(this.options);
        } else {
            if (typeof this.topLeftChoice == "string") {
                this.topLeftChoice = unpack(this.topLeftChoice,this);
            }
            let flag = topLeft(this.topLeftChoice);
            if (flag == 0) {
                this.topLeftChoice = null;
            }
        }
        if (this.bottomLeftChoice == null) {
            this.bottomLeftChoice = this.getRandom(this.options);
        } else {
            if (typeof this.bottomLeftChoice == "string") {
                this.bottomLeftChoice = unpack(this.bottomLeftChoice,this);
            }
            let flag = bottomLeft(this.bottomLeftChoice);
            if (flag == 0) {
                this.bottomLeftChoice = null;
            }
        }
        if (this.bottomRightChoice == null) {
            this.bottomRightChoice = this.getRandom(this.options);
        } else {
            if (typeof this.bottomRightChoice == "string") {
                this.bottomRightChoice = unpack(this.bottomRightChoice,this);
            }
            let flag = bottomRight(this.bottomRightChoice);
            if (flag == 0) {
                this.bottomRightChoice = null;
            }
        }
        if (this.topRightChoice == null) {
            this.topRightChoice = this.getRandom(this.options);
        } else {
            if(typeof this.topRightChoice == "string") {
                this.topRightChoice = unpack(this.topRightChoice, this);
            }
            let flag = topRight(this.topRightChoice);
            if (flag == 0) {
                this.topRightChoice == null;
            }
        }
        if (this.menu_background.x != 1280) {
                this.menu_background.x += 40;
        } else {
            if (this.select_level.y != 160) {
            this.select_level.y += 8;
            }
            if (this.box.y != 464) {
                this.box.y -= 8;
            }
            for (let i = 0; i < this.bottomButtons.length; i++) {
                if (this.topButtons[i].y > 330) {
                        this.topButtons[i].y -= 8;
                }
                if (this.bottomButtons[i].y > 530) {
                    this.bottomButtons[i].y -= 8;
                }
            }
            if (this.bottomButtons[0].y <= 530) {
                for (let i = 0; i < this.topButtons.length; i++) {
                    this.topButtons[i].play();
                }
                for (let i = 0; i < this.bottomButtons.length; i++) {
                    this.bottomButtons[i].play();
                }
            }
            if (this.registry.get("BossLevelWon")) {
                this.change = "End";
            }
            if(this.change != "" && this.deathblock == null) {
                this.deathblock = this.add.tileSprite(-1 * (1280),375,1280*2,720 * 2, "black_deathbox");
            }
            if(this.deathblock != null) {
                if (this.deathblock.x < 1280) {
                    this.deathblock.x += 40;
                } else {
                    this.scene.start(this.change);
                }
            }
        }
    }
        
}
