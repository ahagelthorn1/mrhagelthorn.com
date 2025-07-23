import { Gate } from './Gate.js';
import { Pipe } from './Pipe.js';
export class Slot
{
    constructor (scene, x, y, symbol,scaling_factor,board)
    {
        this.scene = scene;
        scene.add.existing(this)
        this.symbol = symbol;
        this.scaling_factor = scaling_factor;
        this.pipe = null;
        this.board = board;
        this.y_offset = 1280/2;
        this.relevantNeighbors = [];
        if (this.symbol == '<') {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'start',this.scaling_factor,'start',this);
        } else if (this.symbol == '-') {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'standard',this.scaling_factor,'standard',this);
        } else if (this.symbol == 'T') {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'curved',this.scaling_factor,'curved',this);
        } else if (this.symbol == '>') {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'tank',this.scaling_factor,'tank',this);
        } else if (this.symbol == 'L') {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'bent',this.scaling_factor,'bent',this);
        } else if (this.symbol == "A") {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'curved', this.scaling_factor, 'and', this);
            this.gate = new Gate(scene,x,y+this.y_offset,'and', this.scaling_factor, 'and');
        } else if (this.symbol == "O") {
            this.pipe = new Pipe(scene,x,y+this.y_offset,'curved', this.scaling_factor, 'or', this);
            this.gate = new Gate(scene,x,y+this.y_offset,'or', this.scaling_factor, 'or');
        } else if (this.symbol == "N") {
            this.pipe = new Pipe(scene,x,y+this.y_offset, 'standard', this.scaling_factor, 'not' ,this);
            this.gate = new Gate(scene,x,y+this.y_offset,'not', this.scaling_factor, 'not');
        }
        if (this.pipe != null) {
            this.pipe.original_y = this.pipe.y;
            this.board.activePipes.push(this.pipe);
        }
        if (this.gate != null) {
            this.board.activeGates.push(this.gate);
        }
        this.N = null;
        this.E = null;
        this.S = null;
        this.W = null;
        this.neighbors = [];
    }
    getSymbol () {
        return this.symbol;
    }
    out () {
        if (this.pipe != null) {
            this.pipe.out();
        }
    }
    play () {
        if (this.pipe.type == "not") {
            if (!this.checkNot()) {
                for (let i = 0; i < this.board.not_trail.length; i++) {
                    this.board.not_trail[i].pipe.flow_signal = 0;
                    this.board.not_trail[i].pipe.unPlay();
                }
            }
        }
        if (this.checkNeighborsAreFlowing()) {
            setTimeout(() => {
                if (this.scene) {
                    this.scene.time.delayedCall(100, () => {
                        this.pipe.play();
                        this.pipe.flow_signal = 1;
                    }, [], this.scene);
                }
            }, 0);
        } else if (this.pipe.flow_signal == 1) {
            if (this.pipe.type != "start") {
                this.pipe.flow_signal = 0;
                this.pipe.unPlay();
            }
        }
    }

    checkNot() {
        if (!this.board.not_trail.includes(this)) {
            this.board.not_trail.push(this);
        }
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 3) {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                return false;
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "start") {
                        if (i == 3) {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                return false;
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 3) {
                            if (this.neighbors[i].pipe.rotationState != 3 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                return false;
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i === 3) {
                            if ((this.pipe.rotationState == 0 || this.pipe.rotationState == 2) && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 2)) {
                                return false;
                           }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 3) {
                            if (this.neighbors[i].pipe.rotationState != 3 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                return false;
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "or") {
                        if (i == 3) {
                            if (this.neighbors[i].pipe.rotationState != 3 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                return false;
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "not") {
                        if (i == 3) {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                if (!this.board.not_trail.includes(this)) {
                                    this.board.not_trail.push(this);
                                }
                                return false;
                            }
                        }
                    }
                }
            }
        }     
        return true;      
     }
    checkOr() {
        let relevantNeighbors = [];
        let truein = 0;
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]); 
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "start") {
                        if (i == 3) {
                            if ((this.pipe.rotationState != 1 )) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1 && this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0) && (this.neighbors[i].pipe.rotationState != 2 && this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "not") {
                        if (i == 3) {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                truein += 1; 
                                if (!this.board.not_trail.includes(this)) {
                                    this.board.not_trail.push(this);
                                }
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < relevantNeighbors.length; i++) {
            if (this.board.not_trail.includes(relevantNeighbors[i])) {
                if (!this.board.not_trail.includes(this)) {
                    this.board.not_trail.push(this);
                }
            }
        }
        return truein > 0;
    }
    checkAnd() {
        let relevantNeighbors = [];
        let truein = 0;
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                truein += 1; 
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "start") {
                        if (i == 3) {
                            if ((this.pipe.rotationState != 1 )) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1 && this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0) && (this.neighbors[i].pipe.rotationState != 2 && this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "or") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                truein += 1;
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.flow_signal == 1) {
                        if (this.neighbors[i].pipe.type == "not") {
                            if (i == 3) {
                                if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                    truein += 1; 
                                    if (!this.board.not_trail.includes(this)) {
                                        this.board.not_trail.push(this);
                                    }
                                }
                            }
                    }
                }
                }
            }
        }
        for (let i = 0; i < relevantNeighbors.length; i++) {
            if (this.board.not_trail.includes(relevantNeighbors[i])) {
                if (!this.board.not_trail.includes(this)) {
                    this.board.not_trail.push(this);
                }
            }
        }
        return truein > 1;
    }
    checkBent() {
        let relevantNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 1) && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1 && this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                        
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 0)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0) && (this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1 && this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "start") {
                        if (i == 1) {
                            if (this.pipe.rotationState != 0 && this.pipe.rotationState != 3) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if (this.pipe.rotationState != 1 && this.pipe.rotationState != 2) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1 && this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 1) && (this.neighbors[i].pipe.rotationState != 2 && this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1 && this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 0)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0) && (this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1 && this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (this.neighbors[i].pipe.type == "or") {
                            if (i == 0) {
                                if ((this.pipe.rotationState != 2 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 0)) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            } else if (i == 1) {
                                if ((this.pipe.rotationState != 0 && this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1)) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            } else if (i == 2) {
                                if ((this.pipe.rotationState != 0) && (this.neighbors[i].pipe.rotationState != 2)) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            } else if (i == 3) {
                                if ((this.pipe.rotationState != 1 && this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 3)) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "not") {
                        if (i == 3) {
                            if ((this.pipe.rotationState != 1 && this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                if (!this.board.not_trail.includes(this)) {
                                    this.board.not_trail.push(this);
                                }
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                        
                    }
                }
            }
        }
        for (let i = 0; i < relevantNeighbors.length; i++) {
            if (this.board.not_trail.includes(relevantNeighbors[i])) {
                if (!this.board.not_trail.includes(this)) {
                    this.board.not_trail.push(this);
                }
            }
        }
        return relevantNeighbors.length > 0;
    }
    checkTank() {
        let relevantNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 0) {
                            if (this.pipe.rotationState == 1) {
                                if (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState == 2) {
                                if (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState == 3) {
                                if (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 3) {
                            if (this.pipe.rotationState == 0) {
                                if (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 0) {
                            if (this.pipe.rotationState == 1) {
                                if (this.neighbors[i].pipe.rotationState != 0) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState == 2) {
                                if (this.neighbors[i].pipe.rotationState != 1) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState==3) {
                                if (this.neighbors[i].pipe.rotationState != 2) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 3) {
                            if (this.pipe.rotationState == 0) {
                                if (this.neighbors[i].pipe.rotationState != 3) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i == 0) {
                            if (this.pipe.rotationState == 1) {
                                if (this.neighbors[i].pipe.rotationState == 2 || this.neighbors[i].pipe.rotationState == 3) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState == 2) {
                                if (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 3) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState == 3) {
                                if (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 1) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        } else if (i == 3) {
                            if (this.pipe.rotationState == 0) {
                                if (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 2) {
                                    relevantNeighbors.push(this.neighbors[i]);
                                }
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 3) {
                            if (this.neighbors[i].pipe.rotationState != 3) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "or") {
                        if (i == 3) {
                            if (this.neighbors[i].pipe.rotationState != 3) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "not") {
                        if (i == 3) {
                            if (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) {
                                if (!this.board.not_trail.includes(this)) {
                                    this.board.not_trail.push(this);
                                }
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < relevantNeighbors.length; i++) {
            if (this.board.not_trail.includes(relevantNeighbors[i])) {
                if (!this.board.not_trail.includes(this)) {
                    this.board.not_trail.push(this);
                }
            }
        }
        return relevantNeighbors.length > 0;
    }
    checkCurvedPipe() {
        let relevantNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "start") {
                        if (i == 3) {
                            if ((this.pipe.rotationState != 1 )) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i == 0) {
                            if ((this.pipe.rotationState != 2) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState != 3) && (this.neighbors[i].pipe.rotationState != 1 && this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState != 0) && (this.neighbors[i].pipe.rotationState != 2 && this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 3) {
                            if ((this.pipe.rotationState != 1) && (this.neighbors[i].pipe.rotationState != 0 && this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    }
                    else if (this.neighbors[i].pipe.type == "or") {
                        if (i == 0) {
                            if (this.pipe.rotationState != 2 && (this.neighbors[i].pipe.rotationState != 0)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 1) {
                            if (this.pipe.rotationState != 3 && (this.neighbors[i].pipe.rotationState != 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if (i == 2) {
                            if (this.pipe.rotationState != 0 && (this.neighbors[i].pipe.rotationState != 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState != 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "not") {
                        if (i == 3) {
                            if (this.pipe.rotationState != 1 && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2)) {
                                if (!this.board.not_trail.includes(this)) {
                                    this.board.not_trail.push(this);
                                }
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < relevantNeighbors.length; i++) {
            if (this.board.not_trail.includes(relevantNeighbors[i])) {
                if (!this.board.not_trail.includes(this)) {
                    this.board.not_trail.push(this);
                }
            }
        }
        return relevantNeighbors.length > 0;
    }
    checkStandardPipe() {
        let relevantNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].pipe != null) {
                if (this.neighbors[i].pipe.flow_signal == 1) {
                    if (this.neighbors[i].pipe.type == "standard") {
                        if (i == 0) {
                            if ((this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3) && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 1) {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 2) {
                            if ((this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3) && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "start") {
                        if (i == 0) {
                            if ((this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3) && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 1) {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 2) {
                            if ((this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 3) && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "curved") {
                        if (i == 0) {
                            if (this.neighbors[i].pipe.rotationState != 0 && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 1) {
                            if (this.neighbors[i].pipe.rotationState != 1 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 2) {
                            if (this.neighbors[i].pipe.rotationState != 2 && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.neighbors[i].pipe.rotationState != 3 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "bent") {
                        if (i == 0) {
                           if ((this.pipe.rotationState == 1 || this.pipe.rotationState == 3) && (this.neighbors[i].pipe.rotationState == 2 || this.neighbors[i].pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                           }
                        } else if (i == 1) {
                            if ((this.pipe.rotationState == 0 || this.pipe.rotationState == 2) && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                           }
                        } else if (i == 2) {
                            if ((this.pipe.rotationState == 1 || this.pipe.rotationState == 3) && (this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 1)) {
                                relevantNeighbors.push(this.neighbors[i]);
                           }
                        } else if (i === 3) {
                            if ((this.pipe.rotationState == 0 || this.pipe.rotationState == 2) && (this.neighbors[i].pipe.rotationState == 1 || this.neighbors[i].pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                           }
                        }
                    } else if (this.neighbors[i].pipe.type == "and") {
                        if (i == 0) {
                            if (this.neighbors[i].pipe.rotationState != 0 && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 1) {
                            if (this.neighbors[i].pipe.rotationState != 1 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 2) {
                            if (this.neighbors[i].pipe.rotationState != 2 && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.neighbors[i].pipe.rotationState != 3 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "or") {
                        if (i == 0) {
                            if (this.neighbors[i].pipe.rotationState != 0 && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 1) {
                            if (this.neighbors[i].pipe.rotationState != 1 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else if(i == 2) {
                            if (this.neighbors[i].pipe.rotationState != 2 && (this.pipe.rotationState == 1 || this.pipe.rotationState == 3)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        } else {
                            if (this.neighbors[i].pipe.rotationState != 3 && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    } else if (this.neighbors[i].pipe.type == "not") {
                        if (i == 3) {
                            if ((this.neighbors[i].pipe.rotationState == 0 || this.neighbors[i].pipe.rotationState == 2) && (this.pipe.rotationState == 0 || this.pipe.rotationState == 2)) {
                                if (!this.board.not_trail.includes(this)) {
                                    this.board.not_trail.push(this);
                                }
                                relevantNeighbors.push(this.neighbors[i]);
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < relevantNeighbors.length; i++) {
            if (this.board.not_trail.includes(relevantNeighbors[i])) {
                if (!this.board.not_trail.includes(this)) {
                    this.board.not_trail.push(this);
                }
            }
        }
        return relevantNeighbors.length > 0;           
     }
    checkNeighborsAreFlowing () {
        let answer = false;
            if (this.pipe.type == "standard") {
                 answer = this.checkStandardPipe();
            } else if (this.pipe.type == "curved") {
                answer = this.checkCurvedPipe();
            } else if (this.pipe.type == "tank") {
                answer = this.checkTank();
            } else if (this.pipe.type == "bent") {
                answer = this.checkBent();
            } else if (this.pipe.type == "and") {
                answer = this.checkAnd();
            } else if (this.pipe.type == "or") {
                answer = this.checkOr();
            } else if (this.pipe.type == "not") {
                answer = this.checkNot();
            }
        return answer;
    }
    addedToScene ()
    {
        super.addedToScene();

    }

    removedFromScene ()
    {
        super.removedFromScene();
    }
}