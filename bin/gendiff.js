#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'node:path';
import gendiff from '../src/gendiff.js';
import { stylish, plain, jsonish } from '../src/formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .version('output the version number')
  .action((args) => {
    const pathOldFile = path.resolve(program.args[0]);
    const pathNewFile = path.resolve(program.args[1]);
    const options = program.opts();
    let formatName;

    switch (options.format) {
      case 'stylish':
        formatName = stylish;
        break;
      case 'plain':
        formatName = plain;
        break;
      case 'json':
        formatName = jsonish;
        break;
      default:
        formatName = stylish;
    }
    const diff = gendiff(pathOldFile, pathNewFile, formatName);
    console.log(diff);
  });
program.parse();
