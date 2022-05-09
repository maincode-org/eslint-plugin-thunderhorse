import * as fs from 'fs';

const userInput = prompt('User input');

const fileContents = fs.readFileSync(userInput);
console.log(fileContents);
