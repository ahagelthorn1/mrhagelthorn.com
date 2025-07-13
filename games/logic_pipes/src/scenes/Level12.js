import { Board } from './Board.js';
import { Valve } from './Valve.js';
export class Level12 extends Phaser.Scene {
    constructor() {
        super('Level12');
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
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'black_deathbox');
        this.lvl1_background = this.add.tileSprite(-1 *(1280),375,1280 * 2,720 * 2, "lvl1_background");
        this.ticker = 0;
        this.deathblock = null;
        this.win = false;
        this.pixel_grid = [
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ','>',' ',' ','L','-','-','-','-','-','T',' ',' ',' ',' ',' ',' '],
            [' ','-',' ',' ','-',' ',' ',' ',' ',' ','-',' ',' ',' ',' ',' ',' '],
            ['<','L','L','N','T','A','-','>',' ',' ','-',' ',' ',' ',' ',' ',' '],
            [' ',' ','-',' ',' ','L','L',' ',' ',' ','-',' ',' ',' ',' ',' ',' '],
            [' ',' ','L','-','-','-','T','-','-','-','L',' ',' ',' ',' ',' ',' '],
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
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
        ];
        this.valve = new Valve(this, 1280/2,720+1280,"valve", this.scaling_factor);
        this.board = new Board(this,1280,((1280/16)/900),37,37,this.pixel_grid,this.valve);
    }

    update () {
        this.ticker += 1;
        if (this.ticker < 160) {
            for (let i = 0; i < this.board.activePipes.length; i++) {
                this.board.activePipes[i].y -= 8;
            }
            for (let i = 0; i < this.board.activeGates.length;i++) {
                this.board.activeGates[i].y -= 8;
            }
            this.valve.y -= 8;
        }
        if (this.lvl1_background.x != 1280) {
                this.lvl1_background.x += 40;

        } else {
            if (this.board.checkWin()) {
                if(this.deathblock == null) {
                    this.deathblock = this.add.tileSprite(-1 * (1280),375,1280*2,720 * 2, "black_deathbox");
                }
                if(this.deathblock != null) {
                    if (this.deathblock.x < 1280) {
                        this.deathblock.x += 40;
                    } else {
                        this.registry.set("BossLevelWon", true);
                        this.scene.stop();
                        this.scene.start('End');
                    }
                }
            } else {
                this.board.play();
            }
            if (this.valve.flow_start == 1) {
                if(this.board.framesSinceLastProgress > 500) {
                    if(this.deathblock == null) {
                        this.deathblock = this.add.tileSprite(-1 * (1280),375,1280*2,720 * 2, "black_deathbox");
                    }
                    if(this.deathblock != null) {
                        if (this.deathblock.x < 1280) {
                            this.deathblock.x += 40;
                        } else {
                            this.scene.stop();
                            this.scene.start('Level12');
                        }
                    }
                        
                }
            }   
        }
    }
}
