#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';


const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .version('output the version number')
  .action((args) => {
    const diff = gendiff(program.args[0], program.args[1], program.opts().format);
    console.log(diff);
  });
program.parse();
