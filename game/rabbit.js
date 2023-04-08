let LivingCreature = require("./LivingCreature")
module.exports = class Rabbit extends LivingCreature{
    constructor(x,y){
              super(x,y)
              this.energy = 20
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

        random(ch){
            let found = this.chooseCell(ch);
            let result = Math.floor(Math.random()*found.length)
            return found[result];
            }
          
  mul() {
    // let emptyCell = this.chooseCell(0);
    // let newCell = random(emptyCell)
    let newCell = this.random(0)

    if (newCell && this.energy > 5) {
        let newX = newCell[0];
        let newY = newCell[1];

        let rab = new Rabbit(newX, newY);
        matrix[newY][newX] = 5;
       rabbitArr.push(rab);

        this.energy = 20;
    }
}

eat() {
    // let emptyCell = this.chooseCell(1);
    // let newCell = random(emptyCell)
    let newCell = this.random(1)

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

        matrix[newY][newX] = 5;
        matrix[this.y][this.x] = 0;

        this.x = newX;
        this.y = newY;

        if (this.energy > 30) {
            this.mul()
        }
     } else {
        this.move()
    }
}
move() {
    // let emptyCell = this.chooseCell(0);
    // let newCell = random(emptyCell)
    let newCell = this.random(0)

    if (newCell) {
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[newY][newX] = 5;
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
    for (let i = 0; i < rabbitArr.length; i++) {
        if (rabbitArr[i].x == this.x && rabbitArr[i].y == this.y) {
           rabbitArr.splice(i, 1)
        }
    }
    matrix[this.y][this.x] = 0
}
}