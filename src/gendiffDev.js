import fileParser from './parsers.js';
import { compare } from './comparator.js';
// import { stylish } from './formatters.js';
// import { stylish } from './formattersDev.js';
import { stylish } from './formattersDevScenarioOne.js';
// import { stylish } from './formattersDevScenarioTwo.js';

export default (pathOldFile, pathNewFile, outputFormatter = stylish) => {
  const objectOld = fileParser(pathOldFile);
  const objectNew = fileParser(pathNewFile);
  const diff = compare(objectOld, objectNew);

  // return diff;

  const result = outputFormatter(diff);
  return result;
};
