import { readFileSync } from 'node:fs';
import path from 'node:path';
import compareObjects from './comparators.js';
import parseFile from './parsers.js';
import formatDiff from './formatters.js';

const getFilePath = (file) => path.resolve(process.cwd(), file);
const readFileContent = (filePath) => readFileSync(filePath, 'utf-8');
const getFileExtension = (pathFile) => path.extname(pathFile);

export default (fileOld, fileNew, formatter = 'stylish') => {
  const pathFileOld = getFilePath(fileOld);
  const pathFileNew = getFilePath(fileNew);

  const fileContentOld = readFileContent(pathFileOld);
  const fileContentNew = readFileContent(pathFileNew);

  const fileOldExtension = getFileExtension(pathFileOld);
  const fileNewExtension = getFileExtension(pathFileNew);

  if (fileOldExtension !== fileNewExtension) {
    throw new Error(`File extensions are not equal: ${fileOldExtension}, ${fileNewExtension}.`);
  }

  const objectOld = parseFile(fileContentOld, fileOldExtension);
  const objectNew = parseFile(fileContentNew, fileNewExtension);

  const diff = compareObjects(objectOld, objectNew);

  return formatDiff(diff, formatter);
};
