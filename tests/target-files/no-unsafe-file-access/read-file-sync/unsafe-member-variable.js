import * as fs from "fs";

const fileName = fetch('https://evilcorp.com/hacky-hacky');

const fileContents = fs.readFileSync(fileName);
console.log(fileContents);