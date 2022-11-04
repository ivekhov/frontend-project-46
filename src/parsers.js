import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';

export default (filePath) => {
  const fileType = filePath.split('.').slice(-1)[0];

  const fileContent = readFileSync(filePath, 'utf8');
  let obj;
  if (fileType === 'json') {
    obj = JSON.parse(fileContent);
  } else if (fileType === 'yaml' || fileType === 'yml') {
    obj = yaml.load(fileContent);
  }

  return obj;
};
