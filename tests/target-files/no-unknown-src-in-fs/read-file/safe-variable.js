import { readFile } from 'fs';

const fileName = '/etc/passwd';

readFile(fileName, (err, data) => {
  if (err) throw err;
});
