import * as fs from 'fs';

const fileName = '/etc/passwd';

fs.readFile(fileName, (err, data) => {
  if (err) throw err;
  console.log(data);
});
