// 1 walk through objects in list
// 2 create formatter per object with recursive

const stylish = (items) => {
  const EMPTY = '  ';
  const PLUS = '+ ';
  const MINUS = '- ';
  const TAB = '  ';
  let mainResult = '';

  // Function #1 for object formatting
  const crawler = (item, accumulator, depth) => {
    switch (item.status) {
      case 'deleted':
        return `${TAB.repeat(depth)}${MINUS}${item.node}: ${item.value}\n`;
      case 'added':
        return `${TAB.repeat(depth)}${PLUS}${item.node}: ${item.value}\n`;
      case 'unchanged':
        return `${TAB.repeat(depth)}${EMPTY}${item.node}: ${item.value}\n`;
      case 'updated':
        return `${TAB.repeat(depth)}${MINUS}${item.node}: ${item.value[1]}\n${TAB.repeat(depth)}${PLUS}${item.node}: ${item.value[0]}\n`;
      case 'nested':
        // ToDo: walk through list if nested
        accumulator += `${TAB.repeat(depth)}${EMPTY}${item.node}: {\n`;

        for (const itemInternal of item.value) {
          accumulator += `${TAB.repeat(depth)}${crawler(
            itemInternal,
            '',
            depth + 1
          )}${TAB.repeat(depth - 1)}`;
        }
        accumulator += `${TAB.repeat(depth)}${EMPTY}}\n`;
    }
    accumulator += `${TAB.repeat(depth - 1)}${EMPTY}}\n`;
    return accumulator;
  };

  // ToDo: Function #2 - walk through items in list
  for (const item of items) {
    mainResult += `${crawler(item, '', 1)}`;
  }
  return mainResult;
};

export { stylish };
