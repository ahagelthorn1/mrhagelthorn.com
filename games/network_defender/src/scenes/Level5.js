export class Level5 extends Phaser.Scene {

    constructor() {
        super('Level5');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('ValueBox', 'assets/ValueBox.png');
        this.load.image('DefenceBox', 'assets/DefenceBox.png');
        this.load.image('Dialog', 'assets/Dialog.png');
        this.load.spritesheet('Start_level', 'assets/Start_Level.png', {frameWidth: 930/2, frameHeight: 860})
        this.load.image('Level5Map', 'assets/Level5Map.png');
        this.load.image('Anti-Malware', 'assets/Anti-Malware.png');
        this.load.image('Range', 'assets/Range.png');
        this.load.image('Codex', 'assets/Codex.png');
        this.load.image('Anti-Virus', 'assets/Anti-Virus.png');
        this.load.image('PenetrationTesting', 'assets/PenetrationTesting.png');
        this.load.image('SecurePassword', 'assets/SecurePasswords.png');
        this.load.image('Encryption', 'assets/Encryption.png');
        this.load.image('Refresh', 'assets/Refresh.png');
        this.load.spritesheet('Malware', 'assets/Malware.png', {frameHeight: 32, frameWidth: 32});
        this.load.spritesheet('Arrow', 'assets/arrow.png', {frameHeight:500, frameWidth:500});
        this.load.spritesheet('Phish', 'assets/Phish.png', {frameWidth:930, frameHeight:930});
        this.load.spritesheet('Explosion', 'assets/Explosion.png', {frameWidth:64, frameHeight:64});
        this.load.bitmapFont('micro5', 'assets/micro5.png', 'assets/micro5.fnt');
        this.load.image('Firewall', 'assets/Firewall.png');
        this.load.spritesheet("DDOS", "assets/DDOS.png", {frameWidth:31,frameHeight:31});
        this.load.spritesheet("Trojan", "assets/Trojan.png", {frameWidth:31,frameHeight:31});
        this.load.spritesheet("Ransomware", "assets/Ransomware.png", {frameWidth:32, frameHeight:32});
    }

    create() {
        this.alphaGlobal = .6;
        this.PENETRATION_TESTING_PRICE = 150;
        this.ANTI_MALWARE_PRICE = 100;
        this.FIREWALL_PRICE = 210;
        this.ANTI_VIRUS_PRICE = 100;
        this.ENCRYPTION_PRICE = 200;
        this.SECURE_PASSWORDS_PRICE = 300; 
        this.PENETRATION_TESTING_TEXT = "Penetration Testing: " + this.PENETRATION_TESTING_PRICE.toString() + "\nBlocks DDOS via firewall. Place anywhere.";
        this.ANTI_MALWARE_TEXT = "Anti-Malware: " + this.ANTI_MALWARE_PRICE.toString() + "\nDestroys malware.";
        this.FIREWALL_TEXT = "Firewall: " + this.FIREWALL_PRICE.toString() + "\nBlocks malware and ransomware. Weak to DDOS.";
        this.ANTI_VIRUS_TEXT = "Anti-Virus: " + this.ANTI_VIRUS_PRICE.toString() + "\nBlocks Trojans via firewall. Place anywhere.";
        this.ENCRYPTION_TEXT = "Encryption: " + this.ENCRYPTION_PRICE.toString() + "\nDestroys next ten enemies."
        this.SECURE_PASSWORDS_TEXT = "Secure Passwords: " + this.SECURE_PASSWORDS_PRICE.toString() + "\nMakes all defences indestructible.";
        this.MALWARE_TEXT = "Malware\nWeak against Anti-Malware.";
        this.PHISH_TEXT = "Phish\nExplodes when shot. Weak to firewall";
        this.RANSOMWARE_TEXT = "Ransomware\nTakes money when shot. Blocked by firewall.";
        this.REFRESH_TEXT = "Refresh\nRestarts level";
        this.DDOS_TEXT = "DDOS\nDestroys firewall.";
        this.TROJAN_TEXT = "Trojan\nSneaks past firewall. Weak against Anti-Virus";
        this.ANTI_MALWARE_TEXTURE = "Anti-Malware";
        this.FIREWALL_TEXTURE = "Firewall";
        this.PENETRATION_TESTING_TEXTURE = "PenetrationTesting";
        this.ANTI_VIRUS_TEXTURE = "Anti-Virus";
        this.ENCRYPTION_TEXTURE = "Encryption";
        this.MALWARE_TEXTURE = "Malware";
        this.PHISH_TEXTURE = "Phish";
        this.RANSOMWARE_TEXTURE = "Ransomware";
        this.DDOS_TEXTURE = "DDOS";
        this.TROJAN_TEXTURE = "Trojan";
        this.SECURE_PASSWORDS_TEXTURE = "SecurePassword";
        this.CODEX_TEXTURE = "Codex";
        this.destroyAllTowers = false;
        this.money = 200;
        this.lives = 3;
        this.cameras.main.fadeIn(200,0,0,0);
        this.background = this.add.tileSprite(640, -100, 2000, 2500, 'background');
        this.ValueBox = this.add.image(1100,100,'ValueBox');
        this.ValueBox.setScale(.2);
        this.DefenceBox = this.add.image(1100,420,'DefenceBox');
        this.DefenceBox.setScale(.2);
        this.Dialog = this.add.image(480,620,'Dialog');
        this.Dialog.setScale(.60);
        this.Codex = this.add.image(180,110,this.CODEX_TEXTURE);
        this.Codex.setScale(.4);
        this.Codex.setInteractive();
        this.Codex.open = false;
        this.Level5Map = this.add.image(370,270,'Level5Map');
        this.Level5Map.setScale(.85);
        this.mapTexture = this.textures.get('Level5Map').getSourceImage();
        let key = 'mapCanvas';
        if (this.textures.exists(key)) {
            this.textures.remove(key);
        }
        this.canvas = this.textures.createCanvas(key, this.mapTexture.width, this.mapTexture.height);
        this.canvas.draw(0, 0, this.mapTexture);
        this.walkableGrid = new Uint8Array(this.canvas.width * this.canvas.height);
        this.ctx = this.canvas.getContext();
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                const index = (y * this.canvas.width + x) * 4;
                const r = imageData[index];
                const g = imageData[index + 1];
                const b = imageData[index + 2];
                const a = imageData[index + 3];

                const greenThreshold = 30;

                if (
                    g >= 195 - greenThreshold && g <= 195 + greenThreshold &&
                    r >= 114 - greenThreshold && r <= 114 + greenThreshold &&
                    b >= 122 - greenThreshold && b <= 122 + greenThreshold &&
                    a > 0
                ) {
                    this.walkableGrid[y * this.canvas.width + x] = 1;
                }
            }
        }
        this.brownPixelGrid = new Uint8Array(this.canvas.width * this.canvas.height);

        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                const index = (y * this.canvas.width + x) * 4;
                const r = imageData[index];
                const g = imageData[index + 1];
                const b = imageData[index + 2];
                const a = imageData[index + 3];

                const brownThreshold = 20;

                if (
                    r >= 148 - brownThreshold && r <= 148 + brownThreshold &&
                    g >= 117 - brownThreshold && g <= 117 + brownThreshold &&
                    b >= 94  - brownThreshold && b <= 94  + brownThreshold &&
                    a > 0
                ) {
                    this.brownPixelGrid[y * this.canvas.width + x] = 1;
                }
            }
        }

        this.Start_Level = this.add.sprite(1100,675, 'Start_level');
        this.AntiMalware = this.add.sprite(1025,300,this.ANTI_MALWARE_TEXTURE);
        this.AntiMalware.typeOf = "AntiMalware";
        this.Firewall = this.add.sprite(1150,300,this.FIREWALL_TEXTURE);
        this.PenetrationTesting = this.add.sprite(1025, 400, this.PENETRATION_TESTING_TEXTURE);
        this.PenetrationTesting.setScale(.1);
        this.PenetrationTesting.setInteractive();
        this.PenetrationTestings = [];
        this.PenetrationTesting.typeOf = "PenetrationTesting";
        this.AntiVirus = this.add.sprite(1150,400, this.ANTI_VIRUS_TEXTURE);
        this.AntiVirus.setScale(.10);
        this.AntiVirus.setInteractive();
        this.AntiViruses = [];
        this.AntiVirus.typeOf = "Anti-Virus";
        this.Firewall.setScale(.10);
        this.Firewall.setInteractive();
        this.Firewall.typeOf = "Firewall";
        this.AntiMalware.setScale(.15);
        this.AntiMalware.setInteractive();
        this.Encryption = this.add.sprite(1025,500,this.ENCRYPTION_TEXTURE);
        this.Encryption.setScale(.10);
        this.Encryption.setInteractive();
        this.Encryption.typeOf = "Encryption";
        this.Encryptions = [];
        this.SecurePassword = this.add.sprite(1150,500,this.SECURE_PASSWORDS_TEXTURE);
        this.SecurePassword.setScale(.1);
        this.SecurePassword.setInteractive();
        this.SecurePassword.typeOf = "SecurePassword";
        this.SecurePasswords = [];
        this.input.setDraggable(this.SecurePassword);
        this.input.setDraggable(this.Encryption);
        this.input.setDraggable(this.Firewall);
        this.input.setDraggable(this.AntiMalware);
        this.input.setDraggable(this.PenetrationTesting);
        this.input.setDraggable(this.AntiVirus);

        this.AntiMalware.on('pointerover', () => {
            this.dialog.setText(this.ANTI_MALWARE_TEXT);
        });
        this.AntiMalware.on('pointerout', () => {
            this.dialog.setText("");
        });
        this.Firewall.on('pointerover', () => {
            this.dialog.setText(this.FIREWALL_TEXT);
        });
        this.Firewall.on('pointerout', () => {
            this.dialog.setText("");
        });
        this.PenetrationTesting.on('pointerover', () => {
            this.dialog.setText(this.PENETRATION_TESTING_TEXT);
        });
        this.PenetrationTesting.on('pointerout', () => {
            this.dialog.setText("");
        });
        this.AntiVirus.on('pointerover', () => {
            this.dialog.setText(this.ANTI_VIRUS_TEXT);
        });
        this.AntiVirus.on('pointerout', () => {
            this.dialog.setText("");
        });
        this.Encryption.on('pointerover', () => {
            this.dialog.setText(this.ENCRYPTION_TEXT);
        })
        this.Encryption.on('pointerout', () => {
            this.dialog.setText("");
        });
        this.SecurePassword.on('pointerover', () => {
            this.dialog.setText(this.SECURE_PASSWORDS_TEXT);
        });
        this.SecurePassword.on('pointerout', () => {
            this.dialog.setText("");
        });
        this.Ranges = [];
        this.Firewalls = [];
        let animationKey = 'malware_walk_default';

        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const malware_walk = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.MALWARE_TEXTURE, { start:0, end:7}),
            repeat:-1
        };
        this.anims.create(malware_walk);
        animationKey = 'DDOS_walk_default';

        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const DDOS_walk = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.DDOS_TEXTURE, { start:0, end:7}),
            repeat:-1
        };
        this.anims.create(DDOS_walk);
        animationKey = 'Ransomware_walk_default';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }

        const Ransomware_walk = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.RANSOMWARE_TEXTURE, {start:0, end:7}),
            repeat:-1
        };
        this.anims.create(Ransomware_walk);

        animationKey = 'Trojan_walk_default';
        if(this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }

        const Trojan_walk = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.TROJAN_TEXTURE, {start:0, end:7}),
            repeat:-1
        };
        this.anims.create(Trojan_walk);

        animationKey = 'phish_walk_default';

        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const phish_walk = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers(this.PHISH_TEXTURE, { start:0, end:7}),
            repeat:-1
        };
        this.anims.create(phish_walk);
        animationKey = "phish_explosion_default"
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey)
        }
        const phish_explosion = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers('Explosion', {start:0, end:7}),
            repeat:0
        }
        this.anims.create(phish_explosion);
        animationKey = 'start_level_button_flat';
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const start_level_flat = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers('Start_level', { start:0, end:0}),
            repeat:-1
        };
        this.anims.create(start_level_flat);
        animationKey = 'start_level_button_press';
        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const start_level_press = {
            key:'start_level_button_press',
            frames:this.anims.generateFrameNumbers('Start_level', {frames: [0,1]}),
            repeat:0
        }
        this.anims.create(start_level_press);
        animationKey = 'arrow_flying';

        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }

        const arrow_fly = {
            key: animationKey,
            frames: this.anims.generateFrameNumbers('Arrow', {start: 0, end: 0}),
            repeat: -1
        };
        this.anims.create(arrow_fly);
        animationKey = 'start_level_button_unpress';

        if (this.anims.exists(animationKey)) {
            this.anims.remove(animationKey);
        }
        const start_level_unpress = {
            key:animationKey,
            frames:this.anims.generateFrameNumbers('Start_level', {frames: [1,0]}),
            repeat:0
        }
        this.anims.create(start_level_unpress);
        this.Enemies = [];
        this.PhishNumbers = [39, 95];
        this.DDOSNumbers = [55,56,57];
        this.RansomwareNumbers = [];
        this.TrojanNumbers = [117,118,119,120];
        let y_offset = -15;
        let x_offset;
        let path = 0
        for(let i = 0; i < 120; i++) {
            if (path == 0) {
                path = 1;
            } else {
                path = 0;
            }
            x_offset = 681;
            if (!this.PhishNumbers.includes(i) && !this.DDOSNumbers.includes(i) && !this.RansomwareNumbers.includes(i) &&  !this.TrojanNumbers.includes(i)) {
                this.Malware = this.add.sprite(x_offset,y_offset,this.MALWARE_TEXTURE);
                this.Malware.play("malware_walk_default");
                this.Malware.path = path;
                this.Malware.typeOf = "Malware";
                this.Malware.on('pointerover', () => {
                    this.dialog.setText(this.MALWARE_TEXT);
                });
                this.Malware.on('pointerout', () => {
                    this.dialog.setText("");
                });
                this.Malware.setInteractive();
                this.Enemies.push(this.Malware);
                if (i == 50) {
                    this.Malware.unpause_flag = true;
                } else {
                    this.Malware.unpause_flag = false;
                }
                this.Malware.step1Done = false;
                this.Malware.step2Done = false;
                this.Malware.step3Done = false;
                this.Malware.step4Done = false;
                this.Malware.step5Done = false;
                this.Malware.step6Done = false;
                this.Malware.targeted = [];
            } else if (this.PhishNumbers.includes(i)) {
                this.Phish = this.add.sprite(x_offset, y_offset, this.PHISH_TEXTURE);
                this.Phish.setScale(.05);
                this.Phish.typeOf = "Phish";
                this.Phish.path = path;
                this.Phish.play("phish_walk_default");
                this.Phish.on('pointerover', () => {
                    this.dialog.setText(this.PHISH_TEXT);
                });
                this.Phish.on('pointerout', () => {
                    this.dialog.setText("");
                });
                this.Phish.setInteractive();
                this.Enemies.push(this.Phish);
                this.Phish.step1Done = false;
                this.Phish.step2Done = false;
                this.Phish.step3Done = false;
                this.Phish.step4Done = false;
                this.Phish.step5Done = false;
                this.Phish.step6Done = false;
                this.Phish.targeted = [];
            } else if (this.DDOSNumbers.includes(i)) {
                this.DDOS = this.add.sprite(x_offset, y_offset, this.DDOS_TEXTURE);
                this.DDOS.setScale(1);
                this.DDOS.path = path;
                this.DDOS.typeOf = "DDOS";
                this.DDOS.play("DDOS_walk_default");
                this.DDOS.on('pointerover', () => {
                    this.dialog.setText(this.DDOS_TEXT);
                });
                this.DDOS.on('pointerout', () => {
                    this.dialog.setText("");
                });
                this.DDOS.setInteractive();
                this.Enemies.push(this.DDOS);
                this.DDOS.step1Done = false;
                this.DDOS.step2Done = false;
                this.DDOS.step3Done = false;
                this.DDOS.step4Done = false;
                this.DDOS.step5Done = false;
                this.DDOS.step6Done = false;
                this.DDOS.targeted = [];
            } else if (this.RansomwareNumbers.includes(i)) {
                this.Ransomware = this.add.sprite(x_offset, y_offset, this.RANSOMWARE_TEXTURE);
                this.Ransomware.setScale(1);
                this.Ransomware.path = path;
                this.Ransomware.typeOf = "Ransomware";
                this.Ransomware.play("Ransomware_walk_default");
                this.Ransomware.on('pointerover', () => {
                    this.dialog.setText(this.RANSOMWARE_TEXT);
                });
                this.Ransomware.on('pointerout', () => {
                    this.dialog.setText("");
                });
                this.Ransomware.setInteractive();
                this.Enemies.push(this.Ransomware);
                this.Ransomware.step1Done = false;
                this.Ransomware.step2Done = false;
                this.Ransomware.step3Done = false;
                this.Ransomware.step4Done = false;
                this.Ransomware.step5Done = false;
                this.Ransomware.step6Done = false;
                this.Ransomware.targeted = [];
            } else if (this.TrojanNumbers.includes(i)) {
                this.Trojan = this.add.sprite(x_offset, y_offset, this.TROJAN_TEXTURE);
                this.Trojan.setScale(1);
                this.Trojan.typeOf = "Trojan"
                this.Trojan.play("Trojan_walk_default");
                this.Trojan.path = path;
                this.Trojan.on('pointerover', () => {
                    this.dialog.setText(this.TROJAN_TEXT);
                });
                this.Trojan.on('pointerout', () => {
                    this.dialog.setText("");
                });
                this.Trojan.setInteractive();
                this.Enemies.push(this.Trojan);
                this.Trojan.step1Done = false;
                this.Trojan.step2Done = false;
                this.Trojan.step3Done = false;
                this.Trojan.step4Done = false;
                this.Trojan.step5Done = false;
                this.Trojan.step6Done = false;
                this.Trojan.targeted = [];
            } 
            y_offset -= 40;
        
        }
        this.Start_Level.setInteractive();
        this.Start_Level.setScale(.3);
        this.Start_Level.play('start_level_button_flat');
        this.money_text = this.add.bitmapText(1050, 30, 'micro5', this.money.toString(), 32);
        this.money_text.setScale(2);
        this.lives_text = this.add.bitmapText(1050, 105, 'micro5', this.lives.toString(), 32);
        this.dialog = this.add.bitmapText(100, 560, 'micro5', "", 32);
        this.dialog.setScale(1.5);
        this.lives_text.setScale(2);
        this.start_game = false;
        this.Start_Level.on('pointerdown', () => {
            this.Start_Level.play("start_level_button_press");
            this.start_game = true;
            this.time.delayedCall(300, () => {
                this.Start_Level.play('start_level_button_unpress');
            }, [], this);
        });
        const baseRangeTexture = this.textures.get('Range').getSourceImage();
        key = 'rangeCanvas';
        if (this.textures.exists(key)) {
            this.textures.remove(key);
        }
        const rangeCanvas = this.textures.createCanvas('rangeCanvas', baseRangeTexture.width, baseRangeTexture.height);
        rangeCanvas.draw(0, 0, baseRangeTexture);
        const ctx = rangeCanvas.getContext();

        const redPixelGrid = new Uint8Array(baseRangeTexture.width * baseRangeTexture.height);
        const imgData = ctx.getImageData(0, 0, baseRangeTexture.width, baseRangeTexture.height).data; // Renamed variable

        for (let y = 0; y < baseRangeTexture.height; y++) {
            for (let x = 0; x < baseRangeTexture.width; x++) {
                const i = (y * baseRangeTexture.width + x) * 4;
                const r = imgData[i], g = imgData[i+1], b = imgData[i+2], a = imgData[i+3];

                const redThreshold = 30;
                if (
                    r >= 244 - redThreshold && r <= 244 + redThreshold &&
                    g >= 67 - redThreshold && g <= 67 + redThreshold &&
                    b >= 54 - redThreshold && b <= 54 + redThreshold &&
                    a > 0
                ) {
                    redPixelGrid[y * baseRangeTexture.width + x] = 1;
                }
            }
        }

        this.baseRangeCanvas = rangeCanvas;
        this.baseRangeWidth = baseRangeTexture.width;
        this.baseRangeHeight = baseRangeTexture.height;
        this.baseRedPixelGrid = redPixelGrid;
        this.ERanges = [];
        this.input.on('dragstart', (pointer, gameObject) => {
                if (gameObject.typeOf == "AntiMalware" && this.money >= this.ANTI_MALWARE_PRICE) {
                    this.AntiMalwareCopy = this.add.sprite(gameObject.x, gameObject.y, this.ANTI_MALWARE_TEXTURE);
                    this.AntiMalwareCopy.setScale(.1);
                    this.AntiMalwareCopy.setAlpha(this.alphaGlobal); 
                    this.AntiMalwareCopy.typeOf = "AntiMalware";
                    this.AntiMalwareCopy.setInteractive();
                    this.input.setDraggable(this.AntiMalwareCopy);
                    this.AntiMalwareCopy.targets = [];
                    this.AntiMalwareCopy.primeTarget = null;
                    this.AntiMalwareCopy.lastFired = 0;
                    this.AntiMalwareCopy.fireRate = 1500;
                    this.AntiMalwareCopy.placed = false;

                    this.Range = this.add.sprite(gameObject.x, gameObject.y, 'Range');
                    this.Range.setScale(.3);
                    this.Range.setAlpha(this.alphaGlobal);

                    this.Range.canvas = this.baseRangeCanvas;
                    this.Range.pixelWidth = this.baseRangeWidth;
                    this.Range.pixelHeight = this.baseRangeHeight;
                    this.Range.redPixelGrid = this.baseRedPixelGrid;

                    this.Range.AntiMalware = this.AntiMalwareCopy;

                    this.AntiMalwareCopy.on('pointerover', () => {
                        this.dialog.setText(this.ANTI_MALWARE_TEXT);
                    });
                    this.AntiMalwareCopy.on('pointerout', () => {
                        this.dialog.setText("");
                    });

                    this.money -= this.ANTI_MALWARE_PRICE;
                } else if (gameObject.typeOf == "Firewall" && this.money >= this.FIREWALL_PRICE) {
                    this.FirewallCopy = this.add.sprite(gameObject.x, gameObject.y, this.FIREWALL_TEXTURE);
                    this.FirewallCopy.setScale(.1);
                    this.FirewallCopy.setAlpha(this.alphaGlobal);
                    this.FirewallCopy.typeOf = "Firewall";
                    this.FirewallCopy.setInteractive();
                    this.input.setDraggable(this.FirewallCopy);
                    this.FirewallCopy.on('pointerover', () => {
                        this.dialog.setText(this.FIREWALL_TEXT);
                    });
                    this.FirewallCopy.on('pointerout', () => {
                        this.dialog.setText("");
                    });
                    this.money -= this.FIREWALL_PRICE;
                } else if (gameObject.typeOf == "PenetrationTesting" && this.money >= this.PENETRATION_TESTING_PRICE) {
                    this.PenetrationTestingCopy = this.add.sprite(gameObject.x, gameObject.y, this.PENETRATION_TESTING_TEXTURE);
                    this.PenetrationTestingCopy.setScale(.1);
                    this.PenetrationTestingCopy.setAlpha(this.alphaGlobal);
                    this.PenetrationTestingCopy.typeOf = "PenetrationTesting";
                    this.PenetrationTestingCopy.setInteractive();
                    this.PenetrationTestingCopy.on('pointerover', () => {
                        this.dialog.setText(this.PENETRATION_TESTING_TEXT);
                    });
                    this.PenetrationTestingCopy.on('pointerout', () => {
                        this.dialog.setText("");
                    });
                    this.money -= this.PENETRATION_TESTING_PRICE;
                } else if (gameObject.typeOf == "Anti-Virus" && this.money >= this.ANTI_VIRUS_PRICE) {
                    this.AntiVirusCopy = this.add.sprite(gameObject.x, gameObject.y, this.ANTI_VIRUS_TEXTURE);
                    this.AntiVirusCopy.setScale(.1);
                    this.AntiVirusCopy.setAlpha(this.alphaGlobal);
                    this.AntiVirusCopy.typeOf = "Anti-Virus";
                    this.AntiVirusCopy.setInteractive();
                    this.AntiVirusCopy.on('pointerover', () => {
                        this.dialog.setText(this.ANTI_VIRUS_TEXT);
                    });
                    this.AntiVirusCopy.on('pointerout', () => {
                        this.dialog.setText('');
                    });
                    this.money -= this.ANTI_VIRUS_PRICE;
                } else if (gameObject.typeOf == "Encryption" && this.money >= this.ENCRYPTION_PRICE) {
                    this.EncryptionCopy = this.add.sprite(gameObject.x, gameObject.y, this.ENCRYPTION_TEXTURE);
                    this.EncryptionCopy.setScale(.1);
                    this.EncryptionCopy.setAlpha(this.alphaGlobal);
                    this.EncryptionCopy.typeOf = "Encryption";
                    this.EncryptionCopy.setInteractive();
                    this.EncryptionCopy.on('pointerover', () => {
                        this.dialog.setText(this.ENCRYPTION_TEXT);
                    });
                    this.EncryptionCopy.on('pointerout', () => {
                        this.dialog.setText("");
                    });
                    this.ERange = this.add.sprite(gameObject.x, gameObject.y, "Range");
                    this.ERange.setScale(.3);
                    this.ERange.setAlpha(this.alphaGlobal);

                    this.ERange.canvas = this.baseRangeCanvas;
                    this.ERange.pixelWidth = this.baseRangeWidth;
                    this.ERange.pixelHeight = this.baseRangeHeight;
                    this.ERange.redPixelGrid = this.baseRedPixelGrid;
                    this.money -= this.ENCRYPTION_PRICE;
                } else if (gameObject.typeOf == "SecurePassword" && this.money >= this.SECURE_PASSWORDS_PRICE) {
                    this.SecurePasswordCopy = this.add.sprite(gameObject.x, gameObject.y, this.SECURE_PASSWORDS_TEXTURE);
                    this.SecurePasswordCopy.setScale(.1);
                    this.SecurePasswordCopy.setAlpha(this.alphaGlobal);
                    this.SecurePasswordCopy.typeOf = "SecurePassword";
                    this.SecurePasswordCopy.setInteractive();
                    this.SecurePasswordCopy.on('pointerover', () => {
                        this.dialog.setText(this.SECURE_PASSWORDS_TEXT);
                    });
                    this.SecurePasswordCopy.on('pointerout', () => {
                        this.dialog.setText("");
                    });
                    this.money -= this.SECURE_PASSWORDS_PRICE;
                }
        });


        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject.typeOf == "AntiMalware" && this.AntiMalwareCopy) {
                this.AntiMalwareCopy.x = dragX;
                this.AntiMalwareCopy.y = dragY;
                this.Range.x = dragX;
                this.Range.y = dragY;
            } else if (gameObject.typeOf == "Firewall" && this.FirewallCopy) {
                this.FirewallCopy.x = dragX;
                this.FirewallCopy.y = dragY;
            } else if (gameObject.typeOf == "PenetrationTesting" && this.PenetrationTestingCopy) {
                this.PenetrationTestingCopy.x = dragX;
                this.PenetrationTestingCopy.y = dragY;
            } else if (gameObject.typeOf == "Anti-Virus" && this.AntiVirusCopy) {
                this.AntiVirusCopy.x = dragX;
                this.AntiVirusCopy.y = dragY;
            } else if (gameObject.typeOf == "Encryption" && this.EncryptionCopy) {
                this.EncryptionCopy.x = dragX;
                this.EncryptionCopy.y = dragY;
                this.ERange.x = dragX;
                this.ERange.y = dragY;
            } else if (gameObject.typeOf == "SecurePassword" && this.SecurePasswordCopy) {
                this.SecurePasswordCopy.x = dragX;
                this.SecurePasswordCopy.y = dragY;
            }
             
        });
        this.input.on('dragend', (pointer, gameObject) => {
            if (gameObject.typeOf == "AntiMalware" && this.AntiMalwareCopy) {
                this.Range.setAlpha(this.alphaGlobal);
                this.AntiMalwareCopy.setAlpha(1);
                const isOnGreen = this.isGreenPixel(this.AntiMalwareCopy.x, this.AntiMalwareCopy.y);
                if (!isOnGreen) {
                    this.AntiMalwareCopy.destroy();
                    this.Range.destroy();
                    this.money += this.ANTI_MALWARE_PRICE;
                } else {
                    this.input.setDraggable(this.AntiMalwareCopy, false);
                    this.AntiMalwareCopy.placed = true;
                    this.Ranges.push(this.Range);
                }
                if(this.money < this.ANTI_MALWARE_PRICE) {
                    this.input.setDraggable(this.AntiMalware, false);
                }
            } else if (gameObject.typeOf == "Firewall" && this.FirewallCopy) {
                this.FirewallCopy.setAlpha(this.alphaGlobal);
                const isOnBrown = this.isBrownPixel(this.FirewallCopy.x, this.FirewallCopy.y);
                if (!isOnBrown) {
                    this.FirewallCopy.destroy();
                    this.money += this.FIREWALL_PRICE;
                } else {
                    this.input.setDraggable(this.FirewallCopy, false);
                    this.Firewalls.push(this.FirewallCopy)
                }
                if (this.money < this.FIREWALL_PRICE) {
                    this.input.setDraggable(this.Firewall, false);
                }
            } else if (gameObject.typeOf == "PenetrationTesting" && this.PenetrationTestingCopy) {
                this.PenetrationTestingCopy.setAlpha(this.alphaGlobal);
                const isOnGreen = this.isGreenPixel(this.PenetrationTestingCopy.x, this.PenetrationTestingCopy.y);
                if (!isOnGreen) {
                    this.PenetrationTestingCopy.destroy();
                    this.money += this.PENETRATION_TESTING_PRICE;
                } else {
                    this.input.setDraggable(this.PenetrationTestingCopy, false);
                    this.PenetrationTestings.push(this.PenetrationTestingCopy);
                }
                if (this.money < this.PENETRATION_TESTING_PRICE) {
                    this.input.setDraggable(this.PenetrationTesting, false);
                }
                
            } else if (gameObject.typeOf == "Anti-Virus" && this.AntiVirusCopy) {
                this.AntiVirusCopy.setAlpha(this.alphaGlobal);
                const isOnGreen = this.isGreenPixel(this.AntiVirusCopy.x, this.AntiVirusCopy.y);
                if (!isOnGreen) {
                    this.AntiVirusCopy.destroy();
                    this.money += this.ANTI_VIRUS_PRICE;
                } else {
                    this.input.setDraggable(this.AntiVirusCopy, false);
                    this.AntiViruses.push(this.AntiVirusCopy);
                }
                if (this.money < this.ANTI_VIRUS_PRICE) {
                    this.input.setDraggable(this.AntiVirus, false);
                }
            } else if (gameObject.typeOf == "Encryption" && this.EncryptionCopy) {
                this.ERange.setAlpha(.4);
                this.EncryptionCopy.setAlpha(this.alphaGlobal);
                this.EncryptionCopy.lives = 10;
                const isOnGreen = this.isGreenPixel(this.EncryptionCopy.x, this.EncryptionCopy.y);
                if (!isOnGreen) {
                    this.EncryptionCopy.destroy();
                    this.ERange.destroy();
                    this.money += this.ENCRYPTION_PRICE;
                } else {
                    this.input.setDraggable(this.EncryptionCopy, false);
                    this.Encryptions.push(this.EncryptionCopy);
                    this.ERange.Encryption = this.EncryptionCopy;
                    this.ERanges.push(this.ERange);
                }
                if (this.money < this.ENCRYPTION_PRICE) {
                    this.input.setDraggable(this.Encryption, false);
                }
            } else if (gameObject.typeOf == "SecurePassword" && this.SecurePasswordCopy) {
                this.SecurePasswordCopy.setAlpha(this.alphaGlobal);
                const isOnGreen = this.isGreenPixel(this.SecurePasswordCopy.x, this.SecurePasswordCopy.y);
                if (!isOnGreen) {
                    this.SecurePasswordCopy.destroy();
                    this.money += this.SECURE_PASSWORDS_PRICE;
                } else {
                    this.input.setDraggable(this.SecurePasswordCopy, false);
                    this.SecurePasswords.push(this.SecurePasswordCopy);
                }
                if (this.money < this.SECURE_PASSWORDS_PRICE) {
                    this.input.setDraggable(this.SecurePassword, false);
                }
            }
        });
        this.count = 0;
        this.gameOver = false;
        this.transferString = "Level5";
        this.prevLives = this.lives;
        let i = 0;
        let lastEnemyType = "";
        let entries = [];
        let count = 1;
        let forDeletion = [];
        while (i < this.Enemies.length - 1) {
            if (this.lastEnemyType != this.Enemies[i].typeOf ) {
                entries.push([this.lastEnemyType, count]);
                count = 1;
            } else {
                count += 1;
            }
            this.lastEnemyType = this.Enemies[i].typeOf;
            i += 1;
        }
        entries.push([this.lastEnemyType, count+1]);
        entries.splice(0,1);
        let y_off = 50;
        let x_off = 100;
        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] == "Malware") {
                this.temp_creature = this.add.sprite(x_off,y_off,this.MALWARE_TEXTURE);
                this.temp_creature.setInteractive();
                this.temp_creature.on('pointerover', () => {
                    this.dialog.setText(this.MALWARE_TEXT);
                });
                this.temp_creature.on('pointerout', () => {
                    this.dialog.setText("");
                });
            } else if (entries[i][0] == "Phish") {
                this.temp_creature = this.add.sprite(x_off,y_off,this.PHISH_TEXTURE);
                this.temp_creature.setScale(.03);
                this.temp_creature.setInteractive();
                this.temp_creature.on('pointerover', () => {
                    this.dialog.setText(this.PHISH_TEXT);
                });
                this.temp_creature.on('pointerout', () => {
                    this.dialog.setText("");
                });
            } else if (entries[i][0] == "Ransomware") {
                this.temp_creature = this.add.sprite(x_off,y_off, this.RANSOMWARE_TEXTURE);
                this.temp_creature.setInteractive();
                this.temp_creature.on('pointerover', () => {
                    this.dialog.setText(this.RANSOMWARE_TEXT);
                });
                this.temp_creature.on('pointerout', () => {
                    this.dialog.setText("");
                });
            } else if (entries[i][0] == "DDOS") {
                this.temp_creature = this.add.sprite(x_off,y_off, this.DDOS_TEXTURE);
                this.temp_creature.setInteractive();
                this.temp_creature.on('pointerover', () => {
                    this.dialog.setText(this.DDOS_TEXT);
                });
                this.temp_creature.on('pointerout', () => {
                    this.dialog.setText("");
                });
            } else if (entries[i][0] == "Trojan") {
                this.temp_creature = this.add.sprite(x_off,y_off,this.TROJAN_TEXTURE);
                this.temp_creature.setInteractive();
                this.temp_creature.on('pointerover', () => {
                    this.dialog.setText(this.TROJAN_TEXT);
                });
                this.temp_creature.on('pointerout', () => {
                    this.dialog.setText("");
                });
            }
            this.add.bitmapText(x_off+20, y_off-15, 'micro5', entries[i][1], 32);
            y_off += 30
            if(y_off >= 190) {
                y_off = 50;
                x_off += 120;
            }
        }
        this.pause = true;
        this.Refresh = this.add.image(1200,140,'Refresh');
        this.Refresh.setScale(.1);
        this.Refresh.setInteractive();
        this.Refresh.on('pointerover', () => {
            this.dialog.setText(this.REFRESH_TEXT);
        });
        this.Refresh.on('pointerdown', () => {
            this.lives = 0;
        });
    }
    isGreenPixel(worldX, worldY) {
        const localX = Math.floor((worldX - this.Level5Map.x + (this.Level5Map.displayWidth / 2)) / this.Level5Map.scaleX);
        const localY = Math.floor((worldY - this.Level5Map.y + (this.Level5Map.displayHeight / 2)) / this.Level5Map.scaleY);

        if (
            localX < 0 || localY < 0 ||
            localX >= this.canvas.width || localY >= this.canvas.height
        ) {
            return false;
        }

        const index = localY * this.canvas.width + localX;
        return this.walkableGrid[index] === 1;
    }

    isRedPixel(worldX, worldY, obj) {
        const localX = Math.floor((worldX - obj.x + (obj.displayWidth / 2)) * (obj.pixelWidth / obj.displayWidth));
        const localY = Math.floor((worldY - obj.y + (obj.displayHeight / 2)) * (obj.pixelHeight / obj.displayHeight));

        if (
            localX < 0 || localY < 0 ||
            localX >= obj.pixelWidth || localY >= obj.pixelHeight
        ) {
            return false;
        }

        const index = localY * obj.pixelWidth + localX;
        return obj.redPixelGrid[index] === 1;
    }

    isBrownPixel(worldX, worldY) {
        const localX = Math.floor((worldX - this.Level5Map.x + (this.Level5Map.displayWidth / 2)) / this.Level5Map.scaleX);
        const localY = Math.floor((worldY - this.Level5Map.y + (this.Level5Map.displayHeight / 2)) / this.Level5Map.scaleY);

        if (
            localX < 0 || localY < 0 ||
            localX >= this.canvas.width || localY >= this.canvas.height
        ) {
            return false;
        }

        const index = localY * this.canvas.width + localX;
        return this.brownPixelGrid[index] === 1;
    }
    step1 (obj) {
        if (obj.y < 56) {
            obj.y += this.movementSpeed;
        } else {
            obj.step1Done = true;
        }
    }
    path0step2 (obj) {
        if (obj.x > 430) {
            obj.x -= this.movementSpeed;
        } else {
            obj.step2Done = true;
        }
    }
    path1step2 (obj) {
        if (obj.x < 735) {
            obj.x += this.movementSpeed;
        } else {
            obj.step2Done = true;
        }
    }
    path0step3(obj) {
        if (obj.y < 310) {
            obj.y += this.movementSpeed;
        } else {
            obj.step3Done = true;
        }
    }
    path1step3(obj) {
        if (obj.y < 310) {
            obj.y += this.movementSpeed;
        } else {
            obj.step3Done = true;
        }
    }
    step4(obj) {
        if(obj.x > -20) {
            obj.x -= this.movementSpeed;
        } else {
            obj.step4Done = true;
            obj.destroy();
            this.lives -= 1;
        }
    }
    walk(obj) {
        if (obj.y > -400) {
            if (obj.typeOf == "Malware") {
                if (obj.unpause_flag) {
                    this.pause = false;
                }
            }
        }
        if (!obj.step1Done) {
            this.step1(obj);
        } else {
            if (!obj.step2Done) {
                if (obj.path == 0) {
                    this.path0step2(obj);
                } else {
                    this.path1step2(obj);
                }
            } else {
                if (!obj.step3Done) {
                    if (obj.path == 0) {
                        this.path0step3(obj);
                    } else {
                        this.path1step3(obj);
                    }
                } else {
                    if (!this.pause) {
                        if (!obj.step4Done) {
                            this.step4(obj);
                        }
                    }
                }
            }
        }
    }
    update(time,delta) {
        if (this.money >= this.ANTI_MALWARE_PRICE) {
            this.input.setDraggable(this.AntiMalware);
        } else {
            this.input.setDraggable(this.AntiMalware, false);
        }
        if(this.Enemies.length == 1) {
            this.lives = 0;
            this.transferString = "WinScreen";
            this.registry.set('Level5Complete', true); 
        }
        if (this.money >= this.FIREWALL_PRICE) {
            this.input.setDraggable(this.Firewall);
        } else {
            this.input.setDraggable(this.Firewall, false);
        }
        if (this.money >= this.PENETRATION_TESTING_PRICE) {
            this.input.setDraggable(this.PenetrationTesting);
        } else {
            this.input.setDraggable(this.PenetrationTesting, false);
        }
        if (this.money >= this.ANTI_VIRUS_PRICE) {
            this.input.setDraggable(this.AntiVirus);
        } else {
            this.input.setDraggable(this.AntiVirus, false);
        }
        if (this.money >= this.ENCRYPTION_PRICE) {
            this.input.setDraggable(this.Encryption);
        } else {
            this.input.setDraggable(this.Encryption, false);
        }
        if (this.money >= this.SECURE_PASSWORDS_PRICE) {
            this.input.setDraggable(this.SecurePassword);
        } else {
            this.input.setDraggable(this.SecurePassword, false);
        }
        this.movementSpeed = 75 * (delta)/1000;
        if(this.Enemies.length - (3 - this.lives) == 0) {
            this.lives = 0;
            this.transferString = "WinScreen";
            this.registry.set('Level5Complete', true);
        }
        if (this.lives <= 0 && !this.gameOver) {
            this.gameOver = true;
            this.start_game = false;
            this.input.enabled = false; 
            this.cameras.main.fadeOut(200, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start(this.transferString);
            });
        }
        if (this.gameOver) return;
        this.background.tilePositionX += 2;

        if (this.money !== this.prevMoney) {
            this.money_text.setText(this.money.toString());
            this.prevMoney = this.money;
        }
        if (this.lives !== this.prevLives) {
            this.lives_text.setText(this.lives.toString());
            this.prevLives = this.lives;
        }

        if (this.start_game) {
            for (let i = this.Enemies.length - 1; i >= 0; i--) {
                this.walk(this.Enemies[i]);
                let overlapping = false;
                for (let j = 0; j < this.ERanges.length; j++) {
                    const enemy = this.Enemies[i];
                    const inERange = this.isRedPixel(enemy.x,enemy.y, this.ERanges[j]);
                    if (inERange && this.ERanges[j].Encryption.lives > 0) {
                        enemy.destroy();
                        this.Enemies.splice(i,1);
                        this.money += 10;
                        this.ERanges[j].Encryption.lives -= 1;
                    } else if (this.ERanges[j].Encryption.lives <= 0) {
                        this.ERanges[j].Encryption.destroy();
                        this.ERanges[j].destroy();
                        this.ERanges.splice(j,1);
                    }
                }
                for (let i = 0; i < this.Ranges.length; i++) {
                    const am = this.Ranges[i].AntiMalware;
                    am.targets = am.targets.filter(e => e.active);
                    am.targets = am.targets.filter(e => !(e.typeOf == "DDOS"));
                    if (am.primeTarget && !am.primeTarget.active) {
                        am.primeTarget = null;
                    }

                    for (let j = 0; j < this.Enemies.length; j++) {
                        const enemy = this.Enemies[j];
                        const inRange = this.isRedPixel(enemy.x, enemy.y, this.Ranges[i]);

                        const isInTargets = am.targets.includes(enemy);
                        const isInTargeted = enemy.targeted.includes(am);
                        if (inRange && !isInTargets) {
                            am.targets.push(enemy);
                            enemy.targeted.push(am);
                        } else if (!inRange && isInTargets) {
                            am.targets.splice(am.targets.indexOf(enemy), 1);
                            enemy.targeted.splice(enemy.targeted.indexOf(am), 1);
                            if (am.primeTarget === enemy) {
                                am.primeTarget = null;
                            }
                        }
                    }
                }
                for (let j = 0; j < this.Firewalls.length; j++) {
                    const firewall = this.Firewalls[j];
                    const fwWidth = firewall.displayWidth * 0.4;
                    const fwHeight = firewall.displayHeight * 0.4;
                    const fwRect = new Phaser.Geom.Rectangle(
                        firewall.x - fwWidth / 2,
                        firewall.y - fwHeight / 2,
                        fwWidth,
                        fwHeight
                    );
                    if (this.Enemies[i]) {
                    if (Phaser.Geom.Intersects.RectangleToRectangle(this.Enemies[i].getBounds(), fwRect)) {
                        if (this.Enemies[i].typeOf != "DDOS" && this.Enemies[i].typeOf != "Trojan") {
                            this.Enemies[i].destroy();
                            this.Enemies.splice(i, 1);
                            this.money += 10;
                            break;
                        } else if (this.Enemies[i].typeOf == "DDOS" ) {
                            if(this.SecurePasswords.length != 0) {
                                this.Enemies[i].destroy();
                                this.Enemies.splice(i, 1);
                                this.money += 10;
                                break;
                            } else {
                                if (this.PenetrationTestings.length == 0  && this.SecurePasswords.length == 0) {
                                    firewall.destroy();
                                    this.Firewalls.splice(j, 1);
                                    break;
                                } else {
                                    this.PenetrationTestingCopy.destroy();
                                    this.PenetrationTestings.splice(this.PenetrationTestings.indexOf(this.PenetrationTestingCopy), 1);
                                    if (this.PenetrationTestings.length != 0) {
                                        this.PenetrationTestingCopy = this.PenetrationTestings[0];
                                    }
                                    this.Enemies[i].destroy();
                                    this.Enemies.splice(i, 1);
                                    this.money += 10;
                                    break;
                                }
                            }
                        } else if (this.Enemies[i].typeOf == "Trojan") {
                            if (this.AntiViruses.length != 0 ) {
                                if(this.SecurePasswords.length == 0) {
                                    this.AntiViruses.splice(this.AntiViruses.indexOf(this.AntiVirusCopy), 1);
                                    this.AntiVirusCopy.destroy();
                                    if (this.AntiViruses.length != 0) {
                                        this.AntiVirusCopy = this.AntiViruses[0];
                                    }
                                }
                                this.Enemies[i].destroy();
                                this.Enemies.splice(i,1);
                                this.money += 10;
                                break;
                        }
                    }
                }
                }
            }
            for (let i = 0; i < this.Ranges.length; i ++ ) {
                const anti_malware = this.Ranges[i].AntiMalware;
                if (!anti_malware.placed) continue;
                anti_malware.targets = anti_malware.targets.filter(enemy => enemy.active);

                if (anti_malware.targets.length > 0) {
                    if (anti_malware.primeTarget !== anti_malware.targets[0]) {
                        anti_malware.primeTarget = anti_malware.targets[0];
                    }
                    const now = this.time.now;
                    if (now - anti_malware.lastFired >= anti_malware.fireRate) {
                        anti_malware.lastFired = now;
                        const prime = anti_malware.primeTarget;
                        if (prime && prime.active) {
                            if (prime && prime.active && prime.typeOf != "DDOS" && prime.typeOf != "Trojan") {
                                const startX = anti_malware.x;
                                const startY = anti_malware.y;
                                const targetX = prime.x;
                                const targetY = prime.y;
                                const arrow = this.add.sprite(startX, startY, 'arrow');
                                arrow.setScale(0.05);
                                arrow.play('arrow_flying');
                                arrow.rotation = Phaser.Math.Angle.Between(startX, startY, targetX, targetY);
                                this.tweens.add({
                                    targets: arrow,
                                    x: targetX,
                                    y: targetY,
                                    duration: 100,
                                    onComplete: () => {
                                        if (prime.typeOf == "Phish") {
                                            let explosion = this.add.sprite(prime.x, prime.y, 'Explosion');
                                            explosion.setScale(10);
                                            explosion.play("phish_explosion_default");
                                            this.time.delayedCall(500, () => {
                                                explosion.destroy();
                                            }, [], this);
                                            this.destroyAllTowers = true;
                                        }
                                        if (prime.typeOf == "Ransomware") {
                                            this.money = 0;
                                        }
                                        arrow.destroy();
                                        const index = this.Enemies.indexOf(prime);
                                        if (index !== -1) {
                                            this.Enemies.splice(index, 1);
                                        }
                                        prime.targeted.forEach(function(anti_malware) {
                                            anti_malware.targets = anti_malware.targets.filter(function(e) {
                                                return e !== prime;
                                            });
                                        });
                                        prime.destroy();
                                        this.money += 10;
                                    }
                                });
                                anti_malware.lastFired = this.time.now;
                            }

                        }
                    }
                } else {
                    if (anti_malware.primeTarget) {
                        anti_malware.primeTarget = null;
                    }
                }
            }
        }   
        if (this.destroyAllTowers && this.SecurePasswords.length == 0) {
            for (let i = 0; i < this.Ranges.length; i ++ ) {
                const anti_malware = this.Ranges[i].AntiMalware;
                anti_malware.primeTarget = null;
                anti_malware.targets= [];
                anti_malware.destroy();
                this.Ranges[i].destroy();
            }
            this.Ranges = [];
            for (let i = 0; i < this.Firewalls.length; i++) {
                const firewall = this.Firewalls[i];
                firewall.destroy();
                this.Firewalls.splice(i,1);
            }
            this.Firewalls = [];
            for (let i = 0; i < this.PenetrationTestings.length;i++) {
                const penetrationTesting = this.PenetrationTestings[i];
                penetrationTesting.destroy();
            }
            this.PenetrationTestings = [];
            for (let i = 0; i < this.AntiViruses.length; i++) {
                const antiVirus = this.AntiViruses[i];
                antiVirus.destroy();
            }
            this.AntiViruses = [];
            for (let i = 0; i < this.ERanges.length; i++) {
                const ERange = this.ERanges[i];
                ERange.destroy();
            }
            this.ERanges = [];
            for (let i = 0; i < this.Encryptions.length; i++) {
                const Encryption = this.Encryptions[i];
                Encryption.destroy();
            }
            this.Encryptions = [];
            this.destroyAllTowers = false;
        }
    }
}
}
