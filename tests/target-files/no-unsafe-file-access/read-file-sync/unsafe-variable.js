import { readFileSync } from 'fs';

const fileName = fetch('https://evilcorp.com/hacky-hacky');

const fileContents = readFileSync(fileName);
console.log(fileContents);