import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';

export default (path) => {
  const fileType = path.split('.').slice(-1)[0];

  const fileContent = readFileSync(path, 'utf8');
  let obj;
  if (fileType === 'json') {
    obj = JSON.parse(fileContent);
  } else if (fileType === 'yaml' || fileType === 'yml' ) {
    obj = yaml.load(fileContent);
  }

  return obj;
};