const stringify = (currentValue, replacer = '    ', depth = 1) => {

  if (typeof currentValue !== 'object' || currentValue === null) {
    return `${currentValue}`;
  }

  const indentSize = depth;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - 1); 

  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => 
      `${currentIndent}${key}: ` + 
      `${stringify(val, replacer, depth + 1)}`
    );
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diffTree) => {
  const TAB = '    ';

  const crawler = (list, depth) => {
    const currentIndent = TAB.repeat(depth );
    const bracketIndent = TAB.repeat(depth - 1);

    const lines = list
      .map((currentItem) => {
        switch (currentItem.status) {
          case 'added':
            return `${currentIndent.slice(0, -2)}+ ${currentItem.node}: ${stringify(currentItem.value, TAB, depth + 1)}`;
          case 'deleted':
            return `${currentIndent.slice(0, -2)}- ${currentItem.node}: ${stringify(currentItem.value, TAB, depth + 1)}`;         
          case 'updated':
            return `${currentIndent.slice(0, -2)}- ${currentItem.node}: ${stringify(currentItem.valueOld, TAB, depth + 1)}\n${currentIndent.slice(0, -2)}+ ${currentItem.node}: ${stringify(currentItem.valueNew, TAB, depth + 1)}`;
          case 'unchanged':
            return `${currentIndent}${currentItem.node}: ${stringify(currentItem.value, TAB, depth + 1)}`;
          case 'nested':
            return `${currentIndent}${currentItem.node}: ${crawler(currentItem.value, depth + 1)}`;            
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  }
  
  return crawler(diffTree, 1);
}

export { stylish };
