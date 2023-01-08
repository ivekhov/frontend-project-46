import {
  jsonish, jsonishMarkers, plain, stylish,
} from './formatters/index.js';

export default (diff, formatter) => {
  switch (formatter) {
    case 'json':
      return jsonish(diff);
    case 'jsonMarkers':
      return jsonishMarkers(diff);
    case 'plain':
      return plain(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown formatter name ${formatter}.`);
  }
};
