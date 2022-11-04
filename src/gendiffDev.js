import fileParser from './parsers.js';
import { stylish } from './formatters.js';
import { createDiff } from './comparator.js';

export default (pathFirstFile, pathSecondFile, outputFormatter = stylish) => {
  const objectFirst = fileParser(pathFirstFile);
  const objectSecond = fileParser(pathSecondFile);

  const result = createDiff(objectFirst, objectSecond);

  const diff = outputFormatter(result);

  return diff;

};
