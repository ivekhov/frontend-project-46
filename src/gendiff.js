import fileParser from './parsers.js';
import { compare } from './comparator.js';
import { stylish } from './formatters.js';

export default (pathOldFile, pathNewFile, outputFormatter = stylish) => {
  const objectOld = fileParser(pathOldFile);
  const objectNew = fileParser(pathNewFile);
  const diff = compare(objectOld, objectNew);
  const result = outputFormatter(diff);
  return result;
};
