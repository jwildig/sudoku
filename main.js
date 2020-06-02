const boxes = document.querySelectorAll(".box")




var selected;



boxes.forEach(box => {
    box.addEventListener('click', () => {
        selected = box;
        colorBoxes()
    })
})




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
        
        console.log("moved");
        this.colorBoxes();
     }

 }