import _ from 'lodash';
import fileParser from './parsers.js';
import { stylish } from './formatters.js';

export default (pathFirstFile, pathSecondFile, outputFormatter = stylish) => {
  const objectFirst = fileParser(pathFirstFile);
  const objectSecond = fileParser(pathSecondFile);

  const entriesSecond = Object.entries(objectSecond);
  const entriesFirst = Object.entries(objectFirst);

  const keysAll = {
    common: [],
    new: [],
    deleted: [],
  };

  const commonItems = {};
  const newItems = {};
  const deletedItems = {};

  for (const [key, value] of entriesSecond) {
    if (Object.hasOwn(objectFirst, key)) {
      if (value === objectFirst[key]) {
        keysAll.common.push(key);
        commonItems[key] = value;
      } else {
        keysAll.new.push(key);
        newItems[key] = value;
        keysAll.deleted.push(key);
        deletedItems[key] = objectFirst[key];
      }
    } else {
      keysAll.new.push(key);
      newItems[key] = value;
    }
  }

  for (const [key, value] of entriesFirst) {
    if (!Object.hasOwn(objectSecond, key)) {
      keysAll.deleted.push(key);
      deletedItems[key] = value;
    }
  }

  const keysUnique = _.union(keysAll.common, keysAll.deleted, keysAll.new).sort();

  const orderedResult = {};

  for (const key of keysUnique) {
    if (Object.hasOwn(deletedItems, key)) {
      orderedResult[`- ${key}`] = deletedItems[key];
    }
    if (Object.hasOwn(newItems, key)) {
      orderedResult[`+ ${key}`] = newItems[key];
    }
    if (Object.hasOwn(commonItems, key)) {
      orderedResult[`  ${key}`] = commonItems[key];
    }
  }

  const diff = outputFormatter(orderedResult);

  return diff;
};
