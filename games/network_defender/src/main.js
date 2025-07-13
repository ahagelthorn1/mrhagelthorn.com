import { Start } from './scenes/Start.js';
import { Level } from './scenes/Level.js';
import { Level1 } from './scenes/Level1.js';
import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';
import { Level4 } from './scenes/Level4.js';
import { Level5 } from './scenes/Level5.js';
import { WinScreen } from './scenes/WinScreen.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start, Level, Level1, Level2, Level3, Level4, Level5, WinScreen
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            