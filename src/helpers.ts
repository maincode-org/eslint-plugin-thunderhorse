import { readdirSync, readFileSync } from 'fs';

export const allowAllFilesInDir = (path: string) => {
  const files = readdirSync(path);
  return files.map((name) => ({ code: readFileSync(`${path}/${name}`, 'utf-8') }));
};
