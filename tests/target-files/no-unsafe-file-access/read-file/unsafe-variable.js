import { readFile } from 'fs';

const fileName = fetch('https://evilcorp.com/hacky-hacky');

readFile(fileName, (err, data) => {
  if (err) throw err;
  console.log(data);
});
