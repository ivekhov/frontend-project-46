import fileParser from './parsers.js';
import { stylish } from './formatters.js';
import { compare } from './comparator.js';

export default (pathOldFile, pathNewFile, outputFormatter = stylish) => {
  const objectOld = fileParser(pathOldFile);
  const objectNew = fileParser(pathNewFile);

  const diff = compare(objectOld, objectNew);
  return diff;
  // diff = outputFormatter(result);
};
