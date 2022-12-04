const stylish = (items) => {
  // iterate per lines and call crawler per each line
  // stylish get list of objects
  // crawler get list of objects and depth
  // crawler call map inside itself and iterate per object


  const EMPTY = '  ';
  const PLUS = '+ ';
  const MINUS = '- ';
  const TAB = '  ';

  const getIndentType = (status) => {
    switch (status) {
      case 'deleted':
        return MINUS;
      case 'added':
        return PLUS;
      case 'unchanged':
        return EMPTY;
      case 'updated':
        return MINUS;
      case 'nested':
        return EMPTY;
      default:
        return;
    }
  };

  // object to string formatting
  const crawler = (list, depth) => {

    const currentIndent = TAB.repeat(depth);
    const bracketIndent = TAB.repeat(depth - 1);

    // mapping through lines
    // const lines = list.map((currentItem) => console.log(currentItem));

    // ToDo: error 'list.map is not a function'
    const lines = list.map((currentItem) => `${currentIndent}${getIndentType(currentItem.status)}${currentItem.node}: ${crawler(currentItem.value, depth + 1)}`);

    // return result
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  }

  // call crawler
  return crawler(items, 1);
};

export { stylish };
