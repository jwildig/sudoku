const boxes = document.querySelectorAll(".box");
const solveButton = document.querySelector("[solve]");
const clearButton = document.querySelector("[clear]");
const fillButton = document.querySelector("[fill]");



solveButton.addEventListener('click', complete);
clearButton.addEventListener('click', clear);
fillButton.addEventListener('click', fill);

var selected;

boxes.forEach(box => {
    box.addEventListener('click', () => {
        selected = box;
        colorBoxes()
    })
})


function fill() {
    document.getElementById("0000").innerHTML = "5";
    document.getElementById("0001").innerHTML = "3";
    document.getElementById("0010").innerHTML = "6";
    document.getElementById("0021").innerHTML = "9";
    document.getElementById("0022").innerHTML = "8";

    document.getElementById("0101").innerHTML = "7";
    document.getElementById("0110").innerHTML = "1";
    document.getElementById("0111").innerHTML = "9";
    document.getElementById("0112").innerHTML = "5";

    document.getElementById("0221").innerHTML = "6";

    document.getElementById("1000").innerHTML = "8";
    document.getElementById("1010").innerHTML = "4";
    document.getElementById("1020").innerHTML = "7";

    document.getElementById("1101").innerHTML = "6";
    document.getElementById("1110").innerHTML = "8";
    document.getElementById("1112").innerHTML = "3";
    document.getElementById("1121").innerHTML = "2";

    document.getElementById("1202").innerHTML = "3";
    document.getElementById("1212").innerHTML = "1";
    document.getElementById("1222").innerHTML = "6";

    document.getElementById("2001").innerHTML = "6";

    document.getElementById("2110").innerHTML = "4";
    document.getElementById("2111").innerHTML = "1";
    document.getElementById("2112").innerHTML = "9";
    document.getElementById("2121").innerHTML = "8";

    document.getElementById("2200").innerHTML = "2";
    document.getElementById("2201").innerHTML = "8";
    document.getElementById("2212").innerHTML = "5";
    document.getElementById("2221").innerHTML = "7";
    document.getElementById("2222").innerHTML = "9";




}

function clear() {
    var blockY, boxY, blockX, boxX;
    for (blockY = 0; blockY < 3; blockY++) {
        for(boxY = 0; boxY < 3; boxY++) {
            for (blockX = 0; blockX < 3; blockX++) {
                for(boxX = 0; boxX < 3; boxX++) {
                    theBox = document.getElementById(blockY + "" + blockX + "" + boxY + "" + boxX)
                    theBox.innerHTML = "";
                }
            } 
        }
    }
}


function complete() {
    var m = [];
    var theBox;
    var myBoard;
    var blockY, boxY, blockX, boxX;
    for (blockY = 0; blockY < 3; blockY++) {
        for(boxY = 0; boxY < 3; boxY++) {
            m[blockY * 3 + boxY] = [];
            for (blockX = 0; blockX < 3; blockX++) {
                for(boxX = 0; boxX < 3; boxX++) {

                    theBox = document.getElementById(blockY + "" + blockX + "" + boxY + "" + boxX)
                    //console.log(theBox.innerHTML);
                    m[blockY * 3 + boxY][blockX * 3 + boxX] = theBox.innerHTML.trim() ? parseInt(theBox.innerHTML) : 0;
                }
            } 
        }
    }

    console.log(m);
    myBoard = new board(m);
    console.log(myBoard);

    backtrack([], 0, myBoard);
    

}








function colorBoxes() {
    boxes.forEach(box => {
        
        box.style.backgroundColor = "white"
            
    })
    
    selected.style.backgroundColor = "#BBCCFF";
    
    
}

window.onkeypress = function(event) {
    if (event.keyCode >= 49 && event.keyCode < 58) {
        this.selected.innerHTML = event.keyCode - 48;
    }

    
 }

 window.onkeydown = function(event) {
    var x, y;
    var id;



    var c = event.keyCode;
    var lr, dr;

    var blockY, blockX, Y, X;


    if (c >= 37 && c < 41) {

        id = this.selected.id;

        blockY = id[0];
        blockX = id[1];
        Y = id[2];
        X = id[3];

        y = parseInt(blockY) * 3 + parseInt(Y);
        x = parseInt(blockX) * 3 + parseInt(X);
        
        lr = c % 2;

        dr = (c - 38 + lr) / 2;

        if (lr) {
            
            if (dr) {
                x = Math.min(8, x + 1);
            } else {
                x = Math.max(0, x - 1);
            }
        } else { // up-down
            if (dr) {
                y = Math.min(8, y + 1);
            } else {
                y = Math.max(0, y - 1);
            }
        }

        blockY = Math.floor(y / 3);
        blockX = Math.floor(x / 3);

        Y = y % 3;
        X = x % 3;

        selected = document.getElementById(blockY + "" + blockX + "" + Y + "" + X);
        
        //console.log("moved");
        this.colorBoxes();
     }

 }