import * as fs from "fs";

const fileName = fetch('https://evilcorp.com/hacky-hacky');

fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    console.log(data);
});