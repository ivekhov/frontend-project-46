import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('test_json_stylish', () => {
  const correctPath = getFixturePath('result_stylish.txt');
  const correctRaw = readFileSync(correctPath, 'utf8');
  const correct = correctRaw.trim();
  const pathFirstFile = getFixturePath('file1.json');
  const pathSecondFile = getFixturePath('file2.json');
  expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
});

test('test_yml_stylish', () => {
  const correctPath = getFixturePath('result_stylish.txt');
  const correctRaw = readFileSync(correctPath, 'utf8');
  const correct = correctRaw.trim();
  const pathFirstFile = getFixturePath('file1.yml');
  const pathSecondFile = getFixturePath('file2.yml');
  expect(gendiff(pathFirstFile, pathSecondFile)).toEqual(correct);
});

test('test_json_plain', () => {
  const correctPath = getFixturePath('result_plain.txt');
  const correctRaw = readFileSync(correctPath, 'utf8');
  const correct = correctRaw.trim();
  const pathFirstFile = getFixturePath('file1.json');
  const pathSecondFile = getFixturePath('file2.json');
  expect(gendiff(pathFirstFile, pathSecondFile, 'plain')).toEqual(correct);
});

test('test_yml_plain', () => {
  const correctPath = getFixturePath('result_plain.txt');
  const correctRaw = readFileSync(correctPath, 'utf8');
  const correct = correctRaw.trim();
  const pathFirstFile = getFixturePath('file1.yml');
  const pathSecondFile = getFixturePath('file2.yml');
  expect(gendiff(pathFirstFile, pathSecondFile, 'plain')).toEqual(correct);
});
