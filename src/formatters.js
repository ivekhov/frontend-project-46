import * as yaml from 'js-yaml';

export default (obj) => {
  let diff;
  diff = JSON.stringify(obj, null, '\  ');
  diff = diff.replaceAll('"', '');
  diff = diff.replaceAll(',', '');
  return diff;
};
