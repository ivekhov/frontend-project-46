import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { compareObjects } from './comparators.js';
import parseFile from './parsers.js';
import formatDiff from './formatters.js';

const getFilePath = (file) => path.resolve(process.cwd(), file);

const readFileContent = (filePath) => readFileSync(filePath, 'utf-8');

export default (fileOld, fileNew, formatter = 'stylish') => {

  const pathFileOld = getFilePath(fileOld);
  const pathOldNew = getFilePath(fileNew);

  const fileExtensionOld = path.extname(fileOld);
  const fileExtensionNew = path.extname(fileNew);
  
  const fileContentOld = readFileContent(pathFileOld);
  const fileContentNew = readFileContent(pathOldNew);

  const objectOld = parseFile(fileContentOld, fileExtensionOld);
  const objectNew = parseFile(fileContentNew, fileExtensionNew);

  const diff = compareObjects(objectOld, objectNew);

  return formatDiff(diff, formatter);
};

