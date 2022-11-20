const stylish = (items) => {
  const obj = {};
  for (const item of items) {
    if (item.status === 'unchanged') {
      obj[`  ${item.node}`] = item.value;
    } else if (item.status === 'deleted') {
      obj[`- ${item.node}`] = item.value;
    } else if (item.status === 'added') {
      obj[`+ ${item.node}`] = item.value;
    } else if (item.status === 'updated') {
      obj[`+ ${item.node}`] = item.value;
    }
  }
  let diff = JSON.stringify(obj, null, '\  ');
  diff = diff.replaceAll('"', '');
  diff = diff.replaceAll(',', '');
  return diff;
};

export { stylish };
