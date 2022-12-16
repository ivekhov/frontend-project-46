import _ from 'lodash';

const sortTree = (tree) => {
  if (tree.status === 'nested') {
    return sortTree(tree.value);
  }
  const myOrderedTree = _.sortBy(tree, (item) => item.node);
  return myOrderedTree;
};

const jsonish = (diffTree) => {
  /**
   * return json object?
   * create object {} and put in it keys and values ?
   */
  const crawler = (items, storage) => {
    const sortedItems = sortTree(items);
    sortedItems.map((node) => {
      switch (node.status) {
        case 'added':
          storage[`+ ${node.node}`] = node.value;
          break;
        case 'deleted':
          storage[`- ${node.node}`] = node.value;
          break;
        case 'unchanged':
          storage[`  ${node.node}`] = node.value;
          break;
        case 'updated':
          storage[`- ${node.node}`] = node.valueOld;
          storage[`+ ${node.node}`] = node.valueNew;
          break;
        case 'nested':
          storage[`  ${node.node}`] = {};
          crawler(node.value, storage[`  ${node.node}`]);
          break;
      }
    });
  };
  const result = {};
  crawler(diffTree, result);
  return JSON.stringify(result);
};

export { jsonish };
