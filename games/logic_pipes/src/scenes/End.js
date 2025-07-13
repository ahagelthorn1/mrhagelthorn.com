import { Shape } from './Shape.js';
export class End extends Phaser.Scene {
    constructor() {
        super('End');
    }
    preload() {
        this.load.image("black_deathbox", 'assets/black_deathbox');
        this.load.image('menu_background', 'assets/menu_background.png');
        this.load.image('lemon', 'assets/lemon.png');
        this.load.image('WellDone', 'assets/WellDone.png');
        this.load.image('YouWinALemon', 'assets/YouWinALemon.png');
    }
    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'black_deathbox');
        this.menu_background = this.add.tileSprite(-1 *(1280),375,1280 * 2,720 * 2, "menu_background");
        this.lemon = new Shape(this,-1 * 640, 375, "lemon", .35);
        this.WellDone = new Shape(this, -1 * 640, 100, 'WellDone', .35);
        this.YouWinALemon = new Shape(this, -1 * 640, 600, "YouWinALemon", .35);
    }
    update() {
        if (this.menu_background.x != 1280) {
                this.menu_background.x += 40;
        }
        if (this.lemon.x != 640) {
            this.lemon.x += 5;
        }
        if (this.WellDone.x != 640) {
            this.WellDone.x += 20;
        }
        if (this.YouWinALemon.x != 640) {
            this.YouWinALemon.x += 20;
        }
    }
}