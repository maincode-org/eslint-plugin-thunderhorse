import * as fs from 'fs';

const files = ['/etc/passwd', '/etc/my-file'];

const fileContents = fs.readFileSync(files[0]);
