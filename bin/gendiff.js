#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';
import * as path from 'node:path';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .version('output the version number')
  .action( (args) => {
    const pathFirstFile = path.resolve(program.args[0]);
    const pathSecondFile = path.resolve(program.args[1]);

    const result = gendiff(pathFirstFile, pathSecondFile);
    console.log(result);
  });
program.parse();
