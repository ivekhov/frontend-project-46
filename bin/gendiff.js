#!/usr/bin/env node

import { Command } from 'commander';
import { existsSync, readFileSync } from 'node:fs';
import * as path from 'node:path';
import _ from 'lodash';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .version('output the version number')
  .action( (args) => {

    // ToDo: get paths of files. Abs or relative. Done.
    const path_1 = path.resolve(program.args[0]);
    const path_2 = path.resolve(program.args[1]);

    // ToDo: Read files. Return objects. Done. 
    const file_1 = readFileSync(path_1, 'utf8');
    const obj_1 = JSON.parse(file_1);

    const file_2 = readFileSync(path_2, 'utf8');
    const obj_2 = JSON.parse(file_2);

    // ToDo: define file extension. Done.
    const fileType = path_1.split('.').slice(-1);

    // ToDo: analyze and compare file content. Done.
    const entries_2 = Object.entries(obj_2);
    const entries_1 = Object.entries(obj_1);

    const keysAll = {
      common : [],
      new: [],
      deleted: []
    };

    const commonItems = {};
    const newItems = {};
    const deletedItems = {};
    
    // Go through second file
    for (const [key, value] of entries_2) {
      if (Object.hasOwn(obj_1, key)) {
        if (value === obj_1[key]) {
          keysAll.common.push(key);
          commonItems[key] = value

        } else {
          keysAll.new.push(key);
          newItems[key] = value;
          keysAll.deleted.push(key);
          deletedItems[key] = obj_1[key];
        }
      } else {
        keysAll.new.push(key);
        newItems[key] = value;
      }
    }

    //Go through first file - seek deleted keys
    for (const[key, value] of entries_1) {
      if (!Object.hasOwn(obj_2, key)) {
        keysAll.deleted.push(key);
        deletedItems[key] = value;
      }
    }

    // ToDo: sort obect by keys. Done.
    const keysUnique = _.union(keysAll.common, keysAll.deleted, keysAll.new).sort();
    
    const orderedResult = {};

    for (const key of keysUnique) {
        if (Object.hasOwn(deletedItems, key)) {
          orderedResult[`- ${key}`] = deletedItems[key];
        } 
        if (Object.hasOwn(newItems, key)) {
          orderedResult[`+ ${key}`] = newItems[key];
        } 
        if (Object.hasOwn(commonItems, key)) {
          orderedResult[`  ${key}`] = commonItems[key];
        } 
    }

    // ToDo: Convert Object to string and polishing output
    let diff = JSON.stringify(orderedResult, null, '\  ');
    diff = diff.replaceAll('"', '');
    diff = diff.replaceAll(',', '');
    console.log(diff);
    // return diff;
  });

export default () => program.parse();
