const { count } = require('console');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

// io.on('connection', function (socket) {
//     for (var i in messages) {
//         socket.emit("display message", messages[i]);
//     }
//     socket.on("send message", function (data) {
//         messages.push(data);
//         io.sockets.emit("display message", data);
//     });
// });


function matrixGenerator(matrixSize, grass, grassEater, predator, cow, rabbit) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }
    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3


    }


    for (let i = 0; i < cow; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4
    }
    for (let i = 0; i < rabbit; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5


    }


    return matrix
}


matrix = matrixGenerator(30, 40, 15, 5, 6, 8)
grassArr = []
grassEaterArr = []
predatorArr = []
cowArr = []
rabbitArr = []

const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Cow = require("./cow")
const Predator = require("./predator")
const Rabbit = require("./rabbit")
function createObj() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            } else if (matrix[y][x] == 4) {
                var cow = new Cow(x, y)
                cowArr.push(cow)
            } else if (matrix[y][x] == 5) {
                var rab = new Rabbit(x, y)
                rabbitArr.push(rab)

            }
        }
    }




}

createObj()

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()

    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    console.log(cowArr.length);
    for (let i in cowArr) {
        cowArr[i].eat()
    }
    for (let i in rabbitArr) {
        rabbitArr[i].eat()
    }

}

setInterval(game, 1000)










