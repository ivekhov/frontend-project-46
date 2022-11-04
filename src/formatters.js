import * as yaml from 'js-yaml';

const stylish = (obj) => {
  let diff;
  diff = JSON.stringify(obj, null, '\  ');
  diff = diff.replaceAll('"', '');
  diff = diff.replaceAll(',', '');
  return diff;
};

export { stylish };
