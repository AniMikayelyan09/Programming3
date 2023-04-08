var socket = io();
var side = 25



function setup() {
    frameRate(15)
    createCanvas(30 * side, 30 * side)

}


function changeColors(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green")
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            } else if (matrix[y][x] == 4) {
                fill("orange")
            } else if (matrix[y][x] == 5) {
                fill("black")
            }

            else {
                fill("gray")
            }
            rect(x * side, y * side, side, side)
        }

    }

}
socket.on("send matrix", changeColors);


function kill() {
    socket.emit("delete")
  }
  
  function addGrass() {
    socket.emit("add Grass")
  }
  
  function addGrassEater() {
    socket.emit("add GrassEater")
  }
  
  function addPredator() {
    socket.emit("add Predator")
  }
  
  function addRabbit() {
    socket.emit("add Rabbit")
  }
  
  function addCow() {
    socket.emit("add Cow")
  }



