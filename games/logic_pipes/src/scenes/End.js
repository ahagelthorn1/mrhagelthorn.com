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
        this.menu_background = this.add.tileSprite(1280,375,1280 * 2,720 * 2, "menu_background");
        this.lemon = new Shape(this,640, 375, "lemon", .35);
        this.WellDone = new Shape(this, 640, 100, 'WellDone', .35);
        this.YouWinALemon = new Shape(this,640, 600, "YouWinALemon", .35);
    }
    update() {
    }
}