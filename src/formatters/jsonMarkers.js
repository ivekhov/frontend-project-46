import _ from 'lodash';

const sortTree = (tree) => {
  if (tree.status === 'nested') {
    return sortTree(tree.value);
  }
  return _.sortBy(tree, (item) => item.node);
};

/* eslint no-param-reassign: "error" */
/* eslint-disable fp/no-mutation */
export default (diffTree) => {
  const crawler = (items, storage) => {
    const sortedItems = sortTree(items);
    const result = sortedItems.reduce((acc, node) => {
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
        default:
          break;
      }
      return acc;
    }, storage);
    return result;
  };
  return JSON.stringify(crawler(diffTree, {}));
};
