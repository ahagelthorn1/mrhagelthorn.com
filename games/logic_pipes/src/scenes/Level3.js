import { Board } from './Board.js';
import { Valve } from './Valve.js';
export class Level3 extends Phaser.Scene {
    constructor() {
        super('Level3');
    }
    preload() {
        this.load.image("black_deathbox","assets/black_deathbox");
        this.load.image('lvl1_background', 'assets/lvl1_background.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('and', 'assets/and.png');
        this.load.image('or', 'assets/or.png');
        this.load.image('not', 'assets/not.png');
        this.load.image('valve','assets/valve.png');
        this.load.spritesheet("standard","assets/standard.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("curved","assets/curved.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("tank","assets/tank.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("bent", 'assets/bent.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("fbent","assets/fbent.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("fstandard","assets/fstandard.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("fcurved","assets/fcurved.png", { frameWidth: 900, frameHeight: 900});
        this.load.spritesheet("ftank", 'assets/ftank.png', {frameWidth: 900, frameHeight: 900});
    }

    create() {
        this.screen_width = 1280;
        this.scaling_factor = (this.screen_width/16)/900
        this.x_offset = 37;
        this.y_offset = 37;
        this.lvl1_background = this.add.tileSprite(1280,375,1280 * 2,720 * 2, "lvl1_background");
        this.lockFade = false;
        this.ticker = 0;
        this.deathblock = null;
        this.win = false;
        this.pixel_grid = [
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ','-','-','>','L',' ',' ',' ',' ',' '],
            [' ','L','-','-','-','L',' ','T','L',' ',' ','-',' ',' ',' ',' ',' '],
            ['<','T','L',' ',' ','A','-','L','L','L',' ','-',' ',' ',' ',' ',' '],
            [' ',' ','L','-','-','T',' ','>','-','T','-','L',' ',' ',' ',' ',' '],
            [' ',' ','-',' ',' ','-',' ',' ',' ','L','-','N','-','>',' ',' ',' '],
            [' ',' ','-',' ',' ','-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ','L','-','-','O','>',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
        ];
        this.valve = new Valve(this, 1280/2,720+1280/2,"valve", this.scaling_factor);
        this.board = new Board(this,1280,((1280/16)/900),37,37,this.pixel_grid,this.valve);
    }

    update (time,delay) {
        this.movementSpeed = delay/10;
        this.ticker += 1
        if (this.valve.y > 720) {
            for (let i = 0; i < this.board.activePipes.length; i++) {
                this.board.activePipes[i].y -= this.movementSpeed+5;
            }
            for (let i = 0; i < this.board.activeGates.length;i++) {
                this.board.activeGates[i].y -= this.movementSpeed+5;
            }
            this.valve.y -= this.movementSpeed+5;
        }
        if (this.board.checkWin()) {
            if (!this.lockFade) {
                this.cameras.main.fadeOut(200, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.start("Menu");
                });
                this.registry.set("Level3Won",true);
                this.lockFade = true;
            }
        } else {
            this.board.play();
        }
        if (this.valve.flow_start == 1) {
            if(this.board.framesSinceLastProgress > 500) {
                if (!this.lockFade) {
                    this.cameras.main.fadeOut(200, 0, 0, 0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                        this.scene.start("Level3");
                    });  
                    this.lockFade = true;
                }                      
            }
        } 
    }
}
