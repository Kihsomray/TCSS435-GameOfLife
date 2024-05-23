class Automata {

    WIDTH = 240;
    HEIGHT = 135;

    blocks;
    speed;
    intervalCounter;
    ticks;

    constructor() {

        this.blocks = this.blocks = Array.from({length: this.WIDTH + 2}, () => new Array(this.HEIGHT + 2).fill(0));
        this.speed = 25;
        this.intervalCounter = 0;
        this.ticks = 0;

        // set up randomness betwen all the blocks
        for (let i = 1; i < this.WIDTH + 1; i++) {
            for (let j = 1; j < this.HEIGHT + 1; j++) {
                this.blocks[i][j] = Math.random() < 0.5 ? 1 : 0;
            }
        }
        this.draw(gameEngine.ctx, gameEngine)
    }


    update() {
        this.speed = 120 - document.getElementById('speed').value;

        if (++this.intervalCounter % this.speed != 0) return;
        else this.ticks++;

        // perform the game of life rules

        // set up a new array to store the new blocks
        let newBlocks = Array.from({length: this.WIDTH + 2}, () => new Array(this.HEIGHT + 2).fill(0));

        // iterate through all the blocks
        for (let i = 1; i < this.WIDTH + 1; i++) {
            for (let j = 1; j < this.HEIGHT + 1; j++) {

                // calculate neighbor count
                let neighbors = 0;
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        if (x == 0 && y == 0) continue;
                        if (this.blocks[i + x][j + y] == 1) neighbors++;
                    }
                }

                // if cell is alive
                if (this.blocks[i][j] == 1) {

                    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                    if (neighbors < 2) newBlocks[i][j] = 0;

                    // Any live cell with two or three live neighbors survives to the next generation.
                    else if (neighbors < 4) newBlocks[i][j] = 1;

                    // Any live cell with more than three live neighbors dies, as if by overpopulation.
                    else newBlocks[i][j] = 0;

                } else {

                    // Any dead cell with exactly three live neighbors becomes alive, as if by reproduction.
                    if (neighbors == 3) newBlocks[i][j] = 1;
                    else newBlocks[i][j] = 0;

                }
            }
        }

        // set the new blocks
        this.blocks = newBlocks;
    }

    draw(ctx, engine) {

        // change the ticks in the html div called ticks
        document.getElementById('ticks').innerHTML = `Ticks: ${this.ticks}`;

        // draw the blocks
        for (let i = 1; i < this.WIDTH + 1; i++) {
            for (let j = 1; j < this.HEIGHT + 1; j++) {

                // if the block is alive, draw it
                if (this.blocks[i][j] == 1) {
                    ctx.fillStyle = "black";
                    ctx.fillRect((i - 1) * 6, (j - 1) * 6, 5, 5);
                }
            }
        }

    }

}