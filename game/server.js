var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});


server.listen(3003);

function matrixGenerator(matrixSize, grass, grassEater, predator, rabbit, cow) {
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


    for (let i = 0; i < rabbit; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4


    }
    for (let i = 0; i < cow; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5


    }

    io.emit("send matrix", matrix)

    return matrix
}

matrix = matrixGenerator(30, 40, 15, 8, 10, 10)

grassArr = []
grassEaterArr = []
predatorArr = []
rabbitArr = []
cowArr = []

const Grass = require("./grass")
const GrassEater = require("./grasseater")
const Predator = require("./predator")
const Rabbit = require("./rabbit")
const Cow = require("./cow")

function createObj() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {


            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)

            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)

            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                var rab = new Rabbit(x, y)
                rabbitArr.push(rab)

            }
            else if (matrix[y][x] == 5) {
                var c = new Cow(x, y)
                cowArr.push(c)
            }

        }
    }
    io.emit("send matrix", matrix)

}
function AddCharacter(character, count) {
    for (let i = 0; i < count; i++) {
        let x = Math.floor(Math.random() * matrix[0].length);
        let y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = character;
    }
}


createObj()

function gameMove() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i in rabbitArr) {
        rabbitArr[i].eat()
    }

    for (let i in cowArr) {
        cowArr[i].eat()
    }

    io.emit("send matrix", matrix)
}

setInterval(gameMove, 300)

function alldatas() {
    countd = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        predator: predatorArr.length,
        rabbit: rabbitArr.length,
        cow: cowArr.length

    }
    fs.writeFile("state.json", JSON.stringify(countd), function () {
        io.emit("send datas", countd)
    })

}



function AddGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            var grEater = new GrassEater(x, y);
            GrassEaterArr.push(grEater);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddRabbit() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            var rab = new Rabbit(x, y);
            RabbitArr.push(rab);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function AddCow() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            var c = new Cow(x, y);
            CowArr.push(c);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            var pred = new Predator(x, y);
            predatorArr.push(pred);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    rabbitArr = [];
    cowArr = [];


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("matrix", matrix);
}






io.on('connection', function (socket) {
    createObj(matrix)

    socket.on("addGrass", AddGrass);
    socket.on("addGrassEater", AddGrassEater);
    socket.on("addRabbit", AddRabbit);
    socket.on("addCow", AddCow);
    socket.on("addPredator", AddPredator);
    socket.on("delete", kill);
})

var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.cow = cowArr.length;
    statistics.predator = predatorArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);


function addChar(n) {


    let x = Math.floor(Math.random() * 30)
    let y = Math.floor(Math.random() * 30)
    matrix[y][x] = n
    if (n == 1) {
        var gr = new Grass(x, y)
        grassArr.push(gr)
    }
    else if (n == 2) {
        var grEat = new GrassEater(x, y)
        grassEaterArr.push(grEat)
    }
    else if (n == 3) {
        var pred = new Predator(x, y)
        predatorArr.push(pred)
    } else if (n == 4) {

        var cow = new Cow(x, y)
        cowArr.push(cow)

    } else if (n == 5) {
        var rabbit = new Rabbit(x, y)
        rabbitArr.push(rabbit)
    }

}
io.on('connection', function (socket) {

    socket.on("send button", addChar);
})

setInterval(alldatas, 300);