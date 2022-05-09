import * as fs from 'fs';

const fileName = '/etc/passwd';

const fileContents = fs.readFileSync(fileName);
console.log(fileContents);
