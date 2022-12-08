// ToDo:
// 1. В кейсе setting3 в текущей реализации диффа у меня в поле значения список с 2 значениями (старое и новое)
//    этот случай нужно ЛИБО обрабатывать специально форматтером, ЛИБО изменить структуру диффа на этапе его построения
//    чтобы форматтер не спотыкался об него
// 2. Пофиксить кейс setting5, когда в диффе в поле его значения хранится объект, а не список. 
//    Вероятно, это нужно в форматтере, т к по условию задачи и идее диффа в значении объекта м б и объект, к-й явл-ся 
//    "правильным" значением
// 3. Настроить рекурсивный обход списка в случаях, где список является значением в диффе


const data = [
  { node: 'setting1', status: 'unchanged', value: 'Value 1' },
  { node: 'setting2', status: 'deleted', value: 200 },
  { node: 'setting3', status: 'updated', value: [true, false]  },
  {
    node: 'setting6',
    status: 'nested',
    value: [ 
      {
        node: 'setting6', status: 'deleted', value: 42 
      }
     ]
  },
  { node: 'follow', status: 'added', value: false },
]

const stylish = (diffTree) => {

  // console.log(items);

  // const EMPTY = '    ';
  // const PLUS = '  + ';
  // const MINUS = '  - ';
  const TAB = '    ';

  // const getIndentType = (status) => {
  //   switch (status) {
  //     case 'deleted':
  //       return MINUS;
  //     case 'added':
  //       return PLUS;
  //     case 'unchanged':
  //       return '  ';
  //     case 'updated':
  //       return MINUS;
  //     case 'nested':
  //       return EMPTY;
  //     default:
  //       return;
  //   }
  // };

  // object to string formatting
  const crawler = (list, depth) => {

    const currentIndent = TAB.repeat(depth);
    const bracketIndent = TAB.repeat(depth - 1);

    // mapping through lines
    const lines = list
      .map((currentItem) => {

        switch (currentItem.status) {
          case 'deleted':
            return `${currentIndent.slice(0, -2)}- ${currentItem.node}: ${currentItem.value}`;
          case 'added':
            return `${currentIndent.slice(0, -2)}+ ${currentItem.node}: ${currentItem.value}`;
          case 'updated':
            return `${currentIndent.slice(0, -2)}- ${currentItem.node}: ${currentItem.valueOld}\n${currentIndent.slice(0, -2)}+ ${currentItem.node}: ${currentItem.valueNew}`;
          case 'unchanged':
            return `${currentIndent}${currentItem.node}: ${currentItem.value}`;
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


// console.log(stylish(data));


export { stylish };
