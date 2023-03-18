let LivingCreature = require("./LivingCreature ")
module.exports = class Cow extends LivingCreature{
    constructor(x,y){
           super(x,y)
              this.energy = 15
              this.directions = []
    }
 

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


  chooseCell(char) {
    this.getNewCoordinates();
   return super.chooseCell(char)
}

mul() {
    let emptyCell = this.chooseCell(0);
    let newCell = random(emptyCell)
    if (newCell && this.energy > 10) {
        let newX = newCell[0];
        let newY = newCell[1];

        let cowEat = new Cow(newX, newY);
        matrix[newY][newX] = 4;
        cowArr.push(cowEat);

        this.energy = 20;
    }
}

eat() {
    let emptyCell = this.chooseCell(1);
    let newCell = random(emptyCell)

    if (newCell) {
        this.energy += 5;
        let newX = newCell[0];
        let newY = newCell[1];

        for (let i = 0; i < grassArr.length; i++) {
            if (grassArr[i].x == newX && grassArr[i].y == newY) {
                grassArr.splice(i, 1)
                break;
            }
        }


        matrix[newY][newX] = 4;
        matrix[this.y][this.x] = 0;

        this.x = newX;
        this.y = newY;

        if (this.energy > 20) {
            this.mul()
        }
    } else{
        this.move()
    }
}

move() {
    let emptyCell = this.chooseCell(0);
    let newCell = random(emptyCell)

    if (newCell) {
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[newY][newX] = 4;
        matrix[this.y][this.x] = 0;

       
        this.x = newX;
        this.y = newY;

        this.energy--

        if (this.energy < 0) {
            this.die()
        }
    } 
}




die() {
    for (let i = 0; i < predatorArr.length; i++) {
        if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
           predatorArr.splice(i, 1)
        }
    }
    matrix[this.y][this.x] = 0;
}
}