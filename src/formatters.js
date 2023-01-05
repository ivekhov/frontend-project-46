import { jsonish, plain, stylish } from './formatters/index.js';

export default (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonish(diff);
    default:
      throw new Error(`Unknown formatter name ${formatter}.`);
  }
};
