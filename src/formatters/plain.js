import _ from 'lodash';

const sortTree = (tree) => {
  if (tree.status === 'nested') {
    return sortTree(tree.value);
  }
  const myOrderedTree = _.sortBy(tree, (item) => item.node);
  return myOrderedTree;
};

const plainStringify = (item) => {
  if (typeof item === 'object' && item !== null) {
    return '[complex value]';
  } else if (item === null) {
    return 'null';
  } else if (typeof item === 'boolean') {
    return item;
  } else {
    return `'${item}'`;
  }
};

const plain = (diffTree) => {
  // eslint-disable-next-line no-unused-vars
  const crawler = (items, keys) => {
    const sortedItems = sortTree(items);
    const lines = sortedItems
      // eslint-disable-next-line array-callback-return,consistent-return
      .map((currentNode) => {
        // eslint-disable-next-line default-case
        switch (currentNode.status) {
          case 'added':
            return `Property '${[...keys, currentNode.node].join('.')}' was added with value: ${plainStringify(currentNode.value)}`;
          case 'deleted':
            return `Property '${[...keys, currentNode.node].join('.')}' was removed`;
          case 'updated':
            return `Property '${[...keys, currentNode.node].join('.')}' was updated. From ${plainStringify(currentNode.valueOld)} to ${plainStringify(currentNode.valueNew)}`;
          case 'nested':
            return crawler(currentNode.value, [...keys, currentNode.node]);
        }
      });
    return [
      ...lines.filter((item) => typeof item === 'string'),
    ].join('\n');
  };
  return crawler(diffTree, []);
};

// eslint-disable-next-line import/prefer-default-export
export { plain };
