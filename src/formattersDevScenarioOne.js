// ToDo:
// 1. В кейсе setting3 в текущей реализации диффа у меня в поле значения список с 2 значениями (старое и новое)
//    этот случай нужно ЛИБО обрабатывать специально форматтером, ЛИБО изменить структуру диффа на этапе его построения
//    чтобы форматтер не спотыкался об него
// 2. Пофиксить кейс setting5, когда в диффе в поле его значения хранится объект, а не список. 
//    Вероятно, это нужно в форматтере, т к по условию задачи и идее диффа в значении объекта м б и объект, к-й явл-ся 
//    "правильным" значением
// 3. Настроить рекурсивный обход списка в случаях, где список является значением в диффе

const stylish = (items) => {

  // console.log(items);

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
    const lines = list
      .map((currentItem) => {
        let result = `${currentIndent}${getIndentType(currentItem.status)}` +
        `${currentItem.node}: `;
        if (Array.isArray(currentItem.value)) {
          // if (currentItem.value === null) {

            // console.log(`!!!!!!!!!!!${currentItem.node}: ${currentItem}`);

            // result += `${crawler(currentItem.value, depth + 1)}`;

          // }
        } else if (typeof currentItem.value === 'object' || currentItem.value === null) {
          // result += `${currentItem.value}`;
          result += `${crawler(currentItem.value, depth + 1)}`;
        } 

        return result;
      }
    );

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  }
  return crawler(items, 1);
}


export { stylish };


// [
//   {
//     node: 
//     key: 'status', 
//     value: primitive or an array 
//   }, 
//   {

//   }, 
// ]