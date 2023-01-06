import { beforeAll, test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const extension = ['json', 'yml'];
let correctPathStylish;
let correctStylish;
let correctPathPlain;
let correctPlain;

beforeAll(() => {
  correctPathStylish = getFixturePath('result_stylish.txt');
  correctStylish = readFileSync(correctPathStylish, 'utf8').trim();
  correctPathPlain = getFixturePath('result_plain.txt');
  correctPlain = readFileSync(correctPathPlain, 'utf8').trim();
});

test.each(extension)('test stylish', (ext) => {
  const fileAfter = getFixturePath(`fileAfter.${ext}`);
  const fileBefore = getFixturePath(`fileBefore.${ext}`);
  expect(gendiff(fileBefore, fileAfter)).toEqual(correctStylish);
});

test.each(extension)('test plain', (ext) => {
  const fileAfter = getFixturePath(`fileAfter.${ext}`);
  const fileBefore = getFixturePath(`fileBefore.${ext}`);
  expect(gendiff(fileBefore, fileAfter, 'plain')).toEqual(correctPlain);
});
