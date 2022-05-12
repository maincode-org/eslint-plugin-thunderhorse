import { readFile } from 'fs';

const userInput = prompt('User input');

readFile(userInput, (err, data) => {
  if (err) throw err;
  console.log(data);
});
