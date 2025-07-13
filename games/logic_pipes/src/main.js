import { Start } from './scenes/Start.js';
import { Menu } from './scenes/Menu.js';
import { Level1 } from './scenes/Level1.js';
import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';
import { Level4 } from './scenes/Level4.js';
import { Level5 } from './scenes/Level5.js';
import { Level6 } from './scenes/Level6.js';
import { Level7 } from './scenes/Level7.js';
import { Level8 } from './scenes/Level8.js';
import { Level9 } from './scenes/Level9.js';
import { Level10 } from './scenes/Level10.js';
import { Level11 } from './scenes/Level11.js';
import { Level12 } from './scenes/Level12.js';
import { End } from './scenes/End.js';

const config = {
    type: Phaser.AUTO,
    title: 'Logic Pipes',
    description: '',
    parent: 'game-container',
    transparent: false,
    width: 1280,
    height: 720,
    pixelArt: false,
    scene: [Start, Menu, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, Level11, Level12, End],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
}

new Phaser.Game(config);
            