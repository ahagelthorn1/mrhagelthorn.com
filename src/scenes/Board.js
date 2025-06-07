import { Slot } from './Slot.js'
import { Pipe } from './Pipe.js'
import { Valve } from './Valve.js'
export class Board
{
    constructor (scene,screen_width,scaling_factor,x_offset,y_offset,pixel_grid,valve)
    {
        scene.add.existing(this)
        this.screen_width = screen_width;
        this.scaling_factor = scaling_factor;
        this.x_offset = x_offset;
        this.y_offset = y_offset;
        this.pixel_grid = pixel_grid;
        this.valve = valve;
        this.not_trail = [];
        this.activePipes= [];
        this.activeGates = [];
        this.flowingPipes = [];
        this.tanks = [];
        this.stop = false;
        this.lastPipeCount = 0;
        this.framesSinceLastProgress = 0;

        const calculate_x_coordinate = (x_coordinate,x_offset) => {
            return x_offset + (x_offset * (2 * x_coordinate));

        }
        const calculate_y_coordinate = (y_coordinate, y_offset) => {
            return y_offset + (y_offset * (2 * y_coordinate));
        }
        const get_neighbors = (y,x) => {
            const neighbors = [null,null,null,null];
            if(x < this.pixel_grid.length - 1) {
                neighbors[1] = this.pixel_grid[y][x + 1];
            }
            if (x != 0) {
                neighbors[3] = this.pixel_grid[y][x-1]; 
            }
            if (y < this.pixel_grid[y].length - 1) {
                neighbors[2] = this.pixel_grid[y+1][x];
            }
            if (y != 0) {
                neighbors[0] = this.pixel_grid[y-1][x];
            }
            return neighbors
        }
        for (let y=0;y<this.pixel_grid.length;y++) {
            for(let x=0;x<this.pixel_grid[y].length;x++) {
                if (this.pixel_grid[y][x] != ' ') {
                    this.pixel_grid[y][x]= new Slot(scene, calculate_x_coordinate(x,this.x_offset), calculate_y_coordinate(y,this.y_offset),this.pixel_grid[y][x], this.scaling_factor,this);
                    if (this.pixel_grid[y][x].symbol == "<") {
                        this.valve.start = this.pixel_grid[y][x];
                    }
                    if (this.pixel_grid[y][x].symbol == ">") {
                        this.tanks.push(this.pixel_grid[y][x]);
                    }
                }
            }
        }
        for (let y=0;y<this.pixel_grid.length;y++) {
            for(let x=0;x<this.pixel_grid[y].length;x++) {
                if (typeof this.pixel_grid[y][x] == 'object') {
                    const neighbors = get_neighbors(y,x);
                    this.pixel_grid[y][x].N = neighbors[0];
                    this.pixel_grid[y][x].E = neighbors[1];
                    this.pixel_grid[y][x].S = neighbors[2];
                    this.pixel_grid[y][x].W = neighbors[3];
                    this.pixel_grid[y][x].neighbors = neighbors;
                    if (this.pixel_grid[y][x].pipe != null) {
                        this.pixel_grid[y][x].play()
                    }
                }
            }
        }
    }
    checkWin () {
        for(let i = 0; i < this.tanks.length; i++) {
            if (!this.tanks[i].pipe.win) {
                return false;
            }
        }
        return true;
    }
    play () {
        if (this.valve.flow_start == 1) {
            if (this.activePipes.length > this.lastPipeCount) {
                this.framesSinceLastProgress = 0;
                this.lastPipeCount = this.activePipes.length;
            } else {
                this.framesSinceLastProgress++;
            }
        }
        for (let y=0;y<this.pixel_grid.length;y++) {
            for(let x=0;x<this.pixel_grid[y].length;x++) {
                if (this.pixel_grid[y][x].pipe != null) {
                    this.pixel_grid[y][x].play()
                }
            }
        }
    }
}