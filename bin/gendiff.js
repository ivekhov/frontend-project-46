#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'node:path';
import gendiff from '../src/gendiffDev.js';
import { stylish } from '../src/formatters.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .version('output the version number')
  .action( (args) => {
    const pathOldFile = path.resolve(program.args[0]);
    const pathNewFile = path.resolve(program.args[1]);
    const result = gendiff(pathOldFile, pathNewFile, stylish);
    console.log(result);
  });
program.parse();
