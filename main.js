/*const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Who are you?', name => {
    console.log(`Hey there ${name}!`);
    readline.close();
  });*/

const prompt = require('prompt-sync')();

/*const name = prompt('What is your name? ');
console.log(`Hey there ${name}`);*/


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }

    print () {
        const strField = this.field;
        for(let item in this.field){
            console.log(strField[item].join(''));
        }
    }
}

const gameArea = new Field([
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, pathCharacter, fieldCharacter],
])

gameArea.print();
