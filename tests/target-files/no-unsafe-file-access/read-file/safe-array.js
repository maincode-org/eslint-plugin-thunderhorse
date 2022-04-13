import { readFile } from 'fs';

const files = ['/etc/passwd', '/etc/my-file'];

readFile(files[0], (err, data) => {
    if (err) throw err;
    console.log(data);
});