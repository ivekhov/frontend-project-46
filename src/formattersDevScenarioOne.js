// const data = [
//   {
//     node: 'setting5',
//     status: 'nested',
//     value: [ 
//       {
//         node: 'number', status: 'added', value: 45
//       }
//      ]
//   }
// ]
  // + setting5: {
  //       number: 45
  //   }


const stringify = (value, replacer = ' ', spacesCount = 1) => {

  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }
    
    const indentSize = depth * spacesCount;
    // const indentSize = depth;
    
    const currentIndent = replacer.repeat(indentSize);

    // const bracketIndent = replacer.repeat(indentSize);    
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => 
      `${currentIndent}${key}: ` +
      `${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');

  };  
  return iter(value, 1);
};


const stylish = (diffTree) => {
  const TAB = '    ';

  const crawler = (list, depth) => {

    const currentIndent = TAB.repeat(depth);
    // const currentIndent = TAB;

    const bracketIndent = TAB.repeat(depth - 1);
    // const bracketIndent = TAB;


    const lines = list
      .map((currentItem) => {

        switch (currentItem.status) {
          case 'deleted':
            // return `${stringify(currentItem.value, currentIndent.slice(0, -2), depth+1)}`

            return `${currentIndent.slice(0, -2)}- ${currentItem.node}: ${stringify(currentItem.value, currentIndent, depth)}`;
          case 'added':
            return `${currentIndent.slice(0, -2)}+ ${currentItem.node}: ${stringify(currentItem.value, currentIndent, depth)}`;
          case 'updated':
            return `${currentIndent.slice(0, -2)}- ${currentItem.node}: ${stringify(currentItem.valueOld)}\n${currentIndent.slice(0, -2)}+ ${currentItem.node}: ${stringify(currentItem.valueNew)}`;
          case 'unchanged':
            return `${currentIndent}${currentItem.node}: ${stringify(currentItem.value)}`;
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
