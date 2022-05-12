import * as fs from 'fs';

const userInput = prompt('User input');

fs.readFile(userInput, (err, data) => {
  if (err) throw err;
  console.log(data);
});
