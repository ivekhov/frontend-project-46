import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
// import gendiff from '../src/gendiff.js';
import gendiff from '../src/gendiffDev.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

// test('test_json_simple', () => {
//   const correctPath = getFixturePath('test_01_correct.txt');
//   const correct = readFileSync(correctPath, 'utf8');
//
//   const pathFirstFile = getFixturePath('file01.json');
//   const pathSecondFile = getFixturePath('file02.json');
//
//   expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
// });
//
// test('test_yml_simple', () => {
//   const correctPath = getFixturePath('test_01_correct.txt');
//   const correct = readFileSync(correctPath, 'utf8');
//
//   const pathFirstFile = getFixturePath('file03.yml');
//   const pathSecondFile = getFixturePath('file04.yml');
//
//   expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
// });

test('test_json_large_part', () => {

  const correctPath = getFixturePath('test_03_correct.txt');
  const correct = readFileSync(correctPath, 'utf8');

  const pathFirstFile = getFixturePath('file05-2.json');
  const pathSecondFile = getFixturePath('file06-2.json');

  console.log(correct);
  console.log(gendiff(pathFirstFile, pathSecondFile));
  // expect(createDiff(pathFirstFile, pathSecondFile)).toEqual(correct);
});

// test('test_json_large', () => {

//   const correctPath = getFixturePath('test_02_correct.txt');
//   const correct = readFileSync(correctPath, 'utf8');

//   const pathFirstFile = getFixturePath('file05.json');
//   const pathSecondFile = getFixturePath('file06.json');

//   expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
// });

// test('test_yml_large', () => {

//   const correctPath = getFixturePath('test_02_correct.txt');
//   const correct = readFileSync(correctPath, 'utf8');

//   const pathFirstFile = getFixturePath('file07.yml');
//   const pathSecondFile = getFixturePath('file08.yml');

//   expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
// });

// gendiff __tests__/__fixtures__/file05.json __tests__/__fixtures__/file06.json

// gendiff __tests__/__fixtures__/file05-2.json __tests__/__fixtures__/file06-2.json
