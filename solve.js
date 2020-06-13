const DIMENSION = 9;
const NCELLS = DIMENSION * DIMENSION;

var finished = false;



class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class board {
    constructor(m) {
        var x, y;
        this.m = m;
        this.freecount = 0;
        for (y = 0; y < 9; y++) {
            for (x = 0; x < 9; x++) {
                if (available(x, y, m)) {
                    this.freecount++;
                }
            }
        }
        this.move = [];
    }
}

function available(y, x, m) {
    return (m[y][x] == 0);
}

function possible_values(y, x, b) {
    var possible = [];
    var blockY, boxY, blockX, boxX, d;
    var p;

    
    loop1:
    for (d = 1; d <= 9; d++) {
        blockY = Math.floor(y/ 3);
        blockX = Math.floor(x/ 3);
        loop2:

        // Check Block
        for (boxY = 0; boxY < 3; boxY++) {
            loop3:
            for (boxX = 0; boxX < 3; boxX++) {
                if (b.m[blockY * 3 + boxY][blockX * 3 + boxX] == d) {
                    possible[d] = false;
                    continue loop1;
                }
            }
        }

        // Check Column
        for (blockY = 0; blockY < 3; blockY++) {
            for(boxY = 0; boxY < 3; boxY++) {
                if (b.m[blockY * 3 + boxY][x] == d) {
                    possible[d] = false;
                    continue loop1;

                }
            }
        }

        // Check Row
        for (blockX = 0; blockX < 3; blockX++) {
            for(boxX = 0; boxX < 3; boxX++) {
                if (b.m[y][blockX * 3 + boxX] == d) {
                    possible[d] = false;
                    continue loop1;

                }
            }
        }
        possible[d] = true;      
    }


    return possible;


}


function next_square(b) {
    var blockY, boxY, blockX, boxX, d;

    var c, cmin;

    var constrained = new point();


    var possible = [];

    cmin = DIMENSION + 1;

    for (blockY = 0; blockY < 3; blockY++) {
        for(boxY = 0; boxY < 3; boxY++) {
            for (blockX = 0; blockX < 3; blockX++) {
                for(boxX = 0; boxX < 3; boxX++) {
                    c = 0;


                    if (available(blockY * 3 + boxY, blockX * 3 + boxX, b.m)) {
                        possible = possible_values(blockY * 3 + boxY, blockX * 3 + boxX, b);


                        for (d = 1; d <= DIMENSION; d++) {
                            if (possible[d]) {
                                c++;
                            }
                        }

                        if (c < cmin) {
                            cmin = c;
                            constrained.x = blockX * 3 + boxX;
                            constrained.y = blockY * 3 + boxY
                        }
                    }
                }
            } 
        }
    }

    return constrained;
    

}


function construct_candidates(k, b) {
    var next = next_square(b);
    
    var c = [];

    b.move[k] = next;

    var ncandidates = 0;

    var possible = possible_values(b.move[k].y, b.move[k].x, b);

    for (i = 1; i <= DIMENSION; i++) {
        if (possible[i]) {
            c[ncandidates] = i;
            ncandidates++
        }
    }

    return c;

}



function make_move(a, k, b) {
    b.m[b.move[k].y][b.move[k].x] = a[k];
    b.freecount--;
}

function unmake_move(k, b) {
    b.m[b.move[k].y][b.move[k].x] = 0;
    b.freecount++;
}

function is_a_solution(b) {
    //console.log(b.m);
    return b.freecount == 0;
}

function process_solution(b) {
    boxes.forEach(box => {
        box.innerHTML = b.m[parseInt(box.id[0]) * 3 + parseInt(box.id[2])][parseInt(box.id[1]) * 3 + parseInt(box.id[3])];
    })
    finished = true;
}

var boardcount = 0;

function backtrack(a, k, b) {
    var candidates;

    if (is_a_solution(b)) {
        process_solution(b);
    } else {
        k++;
        candidates = construct_candidates(k, b)

        candidates.forEach(candidate => {
            a[k] = candidate;

            make_move(a, k, b);

            backtrack(a, k, b);
            unmake_move(k, b);
            if (finished) return;
        })
    }
}

