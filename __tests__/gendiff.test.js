import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import gendiff from '../bin/gendiff.js';

test('gendiff', () => {
  const dirTests = './__tests__/__fixtures__';

  const pathCorrectJson = `${dirTests}/test_01_correct.txt`
  const right = readFileSync(pathCorrectJson, 'utf8');

  const pathFileInputFirst = `${dirTests}/file01.json`;
  const pathFileInputSecond = `${dirTests}/file02.json`;

  // ToDo: get args from cli
  // expect(gendiff(pathFileInputFirst, pathFileInputSecond)).toEqual(right);

});

