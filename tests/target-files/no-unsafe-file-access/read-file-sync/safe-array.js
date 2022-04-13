import { readFileSync } from 'fs';

const files = ['/etc/passwd', '/etc/my-file'];

const fileContents = readFileSync(files[0]);
console.log(fileContents);