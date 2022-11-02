import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import gendiff from '../bin/gendiff.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);


test('test_json_large', () => {

  const correct_path = getFixturePath('test_02_correct.txt');
  const correct = readFileSync(correct_path_1, 'utf8');

  const input_path_1 = getFixturePath('file05.json');
  const input_path_2 = getFixturePath('file06.json');  

  // ToDo: get args from cli
  // expect(gendiff(input_path_1, input_path_2)).toEqual(correct);
});

test('test_json_simple', () => {

  const correct_path = getFixturePath('test_01_correct.txt');
  const correct = readFileSync(correct_path, 'utf8');

  const input_path_1 = getFixturePath('file01.json');
  const input_path_2 = getFixturePath('file02.json');  

  // ToDo: get args from cli
  // expect(gendiff(input_path_1, input_path_2)).toEqual(correct);
});

test('test_yml_simple', () => {

  const correct_path = getFixturePath('test_01_correct.txt');
  const correct = readFileSync(correct_path, 'utf8');

  const input_path_1 = getFixturePath('file03.yml');
  const input_path_2 = getFixturePath('file04.yml');  

  // ToDo: get args from cli
  // expect(gendiff(input_path_1, input_path_2)).toEqual(correct);
});


