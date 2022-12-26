import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import * as path from 'node:path';
import { compare } from './comparator.js';
import { stylish, plain, jsonish  } from './formatters/index.js';


const getFilePath = (file) => path.resolve(file);

const getFileExtension = (filePath) => filePath.split('.').slice(-1)[0];

const parseFile = (filePath, fileExtension) => {
  const fileContent = readFileSync(filePath, 'utf8');
  switch (fileExtension) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yaml':
      return yaml.load(fileContent);
    case 'yml':
      return yaml.load(fileContent);
  }
};


export default (fileOld, fileNew, formatter = 'stylish') => {

  const pathFileOld = getFilePath(fileOld);
  const pathOldNew = getFilePath(fileNew);

  const fileExtensionOld = getFileExtension(pathFileOld);
  const fileExtensionNew = getFileExtension(pathOldNew);
  
  const objectOld = parseFile(pathFileOld, fileExtensionOld);
  const objectNew = parseFile(pathOldNew, fileExtensionNew);

  const diff = compare(objectOld, objectNew);

  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonish(diff);
    default:
      return stylish(diff);
  }
};
