import { readFileSync } from 'fs';

const fileName = '/etc/passwd';

const fileContents = readFileSync(fileName);
console.log(fileContents);