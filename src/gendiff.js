import fileParser from './parsers.js';
import { compare } from './comparator.js';
import { stylish } from './formatters/index.js';

export default (pathOldFile, pathNewFile, outputFormatter = stylish) => {
  const objectOld = fileParser(pathOldFile);
  const objectNew = fileParser(pathNewFile);
  const diff = compare(objectOld, objectNew);
  return outputFormatter(diff);
};
