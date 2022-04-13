import * as fs from "fs";

const files = ['/etc/passwd', '/etc/my-file'];

fs.readFile(files[0], (err, data) => {
    if (err) throw err;
    console.log(data);
});