import fs from 'fs';

export const readLines = (path: string) => {
  const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
  return fileContent.split('\n').filter(Boolean);
}
