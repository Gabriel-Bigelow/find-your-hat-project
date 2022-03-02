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
        this.timesPrompted += 1;

        let xPos = 0;
        let yPos = 0;

        let r;
        let c;
        let playerInHole = false;
        let playerOffBoard = false;

        
    
        for (let row in this.field){
            for (let column in this.field[row]){
                if (this.field[row][column] === player){
                    r = row;
                    c = column;
                }
            }
        }
        
        let markPath = function (target) {
            target.field[r][c] = pathCharacter;
        }
        
        let moveCharacter = function (target) {
            r = r-yPos;
            c = c-xPos;

            if (target.field[r][c] === hole){
                playerInHole = true;
            } else if (r > target.field.length - 1 || r < 0) {
                playerOffBoard = true;
            } else if (c > target.field[r].length - 1 || c < 0) {
                playerOffBoard = true;
            } else {
                target.field[r][c] = player;
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

        markPath(this);
        moveCharacter(this);
        this.print();

        let endOfRound = function (target) {
            if (playerInHole === true){
                console.log('You fell in a hole!')
                const playAgain = prompt("Would you like to try again? Yes/No: ");
                if (playAgain.toLowerCase() === 'yes'){

                }
            } else if (playerOffBoard === true) {
                console.log('You fell out of bounds!')
            } else {
                target.move();
            }
        }

        endOfRound(this);
        
    }

    generateField () {

    }
}

const gameArea = new Field([
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, player, hole],
    [fieldCharacter, pathCharacter, fieldCharacter],
])

gameArea.print();

gameArea.move();