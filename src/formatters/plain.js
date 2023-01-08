import _ from 'lodash';

const sortTree = (tree) => {
  if (tree.status === 'nested') {
    return sortTree(tree.value);
  }
  return _.sortBy(tree, (item) => item.node);
};

const plainStringify = (item) => {
  if (typeof item === 'object' && item !== null) return '[complex value]';
  if (item === null) return 'null';
  if (typeof item === 'boolean') return item;
  if (typeof item === 'number') return `${item}`;
  return `'${item}'`;
};

/* eslint-disable array-callback-return, consistent-return */
export default (diffTree) => {
  const crawler = (items, keys) => {
    const sortedItems = sortTree(items);
    const lines = sortedItems
      .map((currentNode) => {
        switch (currentNode.status) {
          case 'added':
            return `Property '${[...keys, currentNode.node].join('.')}' was added with value: ${plainStringify(currentNode.value)}`;
          case 'deleted':
            return `Property '${[...keys, currentNode.node].join('.')}' was removed`;
          case 'updated':
            return `Property '${[...keys, currentNode.node].join('.')}' was updated. From ${plainStringify(currentNode.valueOld)} to ${plainStringify(currentNode.valueNew)}`;
          case 'nested':
            return crawler(currentNode.value, [...keys, currentNode.node]);
          case 'unchanged':
            break;
          default:
            throw new Error(`Unknown node status ${currentNode.status}`);
        }
      });
    return [
      ...lines.filter((item) => typeof item === 'string'),
    ].join('\n');
  };
  return crawler(diffTree, []);
};
