const prompt = require('prompt-sync')();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const player = 'P';

class Field {
    constructor(field) {
        this.field = field;
    }

    print () {
        const strField = this.field;
        for(let row in this.field){
            console.log(strField[row].join(''));
        }
    }

    move () {
        const direction = prompt("Where would you like to move next? ");
        console.log();

        let xPos = 0;
        let yPos = 0;

        let r;
        let c;
        let playerInHole = false;
        let playerOffBoard = false;

        let findPlayer = function (target) {
            for (let row in target.field){
                for (let column in target.field[row]){
                    if (target.field[row][column] === player){
                        r = row;
                        c = column;
                    }
                }
            }
        }
        
        let markPath = function (target) {
            target.field[r][c] = pathCharacter;
        }
        
        let moveCharacter = function (target) {
            r = r-yPos;
            c = c-xPos;
            if (r > target.field.length - 1 || r < 0) {
                playerOffBoard = true;
            } else if (c > target.field[r].length - 1 || c < 0) {
                playerOffBoard = true;
            } else {
                if (target.field[r][c] === hole){
                    playerInHole = true;
                } else {
                    target.field[r][c] = player;
                }                
            }
        }

        let endOfRound = function (target) {
            if (playerInHole === true){
                console.log('You fell in a hole! Game over.')
            } else if (playerOffBoard === true) {
                console.log('You fell out of bounds! Game over.')
            } else {
                target.move();
            }
        }

        if (direction.toLowerCase() === 'up'){
            yPos = 1;
        } else if (direction.toLowerCase() === 'down'){
            yPos = -1;
        } else if (direction.toLowerCase() === 'left'){
            xPos = 1;
        } else if (direction.toLowerCase() === 'right'){
            xPos = -1;
        }

        findPlayer(this)
        markPath(this);
        moveCharacter(this);
        this.print();
        endOfRound(this);
        
    }


    play () {
        this.print();
        this.move();
    }
    
    generateField (rows, columns, percentage) {
        for (let i = 0; i < rows; i++){
            this.field[rows] = fieldCharacter;
            for (let i = 1; i < columns; i++){
                this.field[rows][columns] = fieldCharacter;
            }
        }

        

    }
}

const gameArea = new Field([
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, player, hole],
    [fieldCharacter, pathCharacter, fieldCharacter],
]);

gameArea.play();