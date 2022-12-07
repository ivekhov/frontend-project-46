
const stringify = (value, replacer = ' ', spacesCount = 2) => {
  if (!_.isObject(value)) {
    return `${value}`
  };
  let result = '';
  const crawler = (item, accumulator, depth) => {

    accumulator += '{\n';
    const entries = Object.entries(item);

    for (const [keyInternal, valueInternal] of entries) {

      if (_.isObject(valueInternal)) {
        if (valueInternal !== null ) {

          accumulator += `${replacer.repeat(spacesCount * depth)}${keyInternal}: ${crawler(
            valueInternal,
            "",
            depth + 1
          )}\n${replacer.repeat(spacesCount * (depth - 1))}}`;
          return accumulator;
        }
      };
      accumulator += `${replacer.repeat(spacesCount * depth)}${keyInternal}: ${valueInternal}\n`;
    };

    accumulator += `${replacer.repeat(spacesCount * (depth - 1))}}`;
    return accumulator;

  }
  result += crawler(value, result, 1);
  return result;
};
