import { readFileSync } from 'fs';

const userInput = prompt('User input');

const fileContents = readFileSync(userInput);
console.log(fileContents);
