import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';
import { plain, stylish, jsonish } from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

// test('test_json_simple', () => {
//   const correctPath = getFixturePath('test_01_correct.txt');
//   const correct = readFileSync(correctPath, 'utf8');

//   const pathFirstFile = getFixturePath('file01.json');
//   const pathSecondFile = getFixturePath('file02.json');

//   expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
// });

// test('test_yml_simple', () => {
//   const correctPath = getFixturePath('test_01_correct.txt');
//   const correct = readFileSync(correctPath, 'utf8');

//   const pathFirstFile = getFixturePath('file03.yml');
//   const pathSecondFile = getFixturePath('file04.yml');

//   expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
// });

test('test_yml_large', () => {

  const correctPath = getFixturePath('test_02_correct.txt');
  const correct = readFileSync(correctPath, 'utf8');

  const pathFirstFile = getFixturePath('file07.yml');
  const pathSecondFile = getFixturePath('file08.yml');
  // console.log(gendiff(pathFirstFile, pathSecondFile));

  expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
});

test('test_stylish', () => {
  const correctPath = getFixturePath('test_02_correct.txt');
  const correct = readFileSync(correctPath, 'utf8');

  const pathFirstFile = getFixturePath('file05.json');
  const pathSecondFile = getFixturePath('file06.json');
  // console.log(gendiff(pathFirstFile, pathSecondFile, stylish));
  expect(gendiff(pathFirstFile, pathSecondFile, stylish)).toEqual(correct);
});

test('test_plain', () => {
  const correctPath = getFixturePath('test_04_correct.txt');
  const correct = readFileSync(correctPath, 'utf8');

  const pathFirstFile = getFixturePath('file05.json');
  const pathSecondFile = getFixturePath('file06.json');
  // console.log(gendiff(pathFirstFile, pathSecondFile, plain));
  expect(gendiff(pathFirstFile, pathSecondFile, plain)).toEqual(correct);
});

test('test_json', () => {
  const correctPath = getFixturePath('test_05_correct.txt');
  const correct = readFileSync(correctPath, 'utf8');

  const pathFirstFile = getFixturePath('file05.json');
  const pathSecondFile = getFixturePath('file06.json');
  // console.log(gendiff(pathFirstFile, pathSecondFile, plain));
  expect(gendiff(pathFirstFile, pathSecondFile, jsonish)).toEqual(correct);
});


