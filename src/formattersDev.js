const stylish = (items) => {
  const obj = {};
  for (const item of items) {

    if (item.status === 'nested') {
      obj[`  ${item.node}\n`] = stylish(item.value);
    } else if (item.status === 'unchanged') {
      obj[`  ${item.node}`] = item.value;
    } else if (item.status === 'deleted') {
      obj[`- ${item.node}`] = item.value;
    } else if (item.status === 'added') {
      obj[`+ ${item.node}`] = item.value;
    } else if (item.status === 'updated') {
      obj[`+ ${item.node}`] = item.value;
    }
  }
  // return obj;

  let diff = JSON.stringify(obj, undefined, 4);


  // let diff = JSON.stringify(obj, undefined, 4);
  // let diff = JSON.stringify(obj, '"', '');
  // diff = diff.replaceAll('\n', '');
  // diff = diff.replaceAll('\\', '');
  // diff = diff.replaceAll('"', '');
  // diff = diff.replaceAll(',', '');
  // diff = diff.replaceAll('{', {\n');
  // diff = diff.replaceAll('}', '}\n');

  // return output;

  return diff;
};

export { stylish };
