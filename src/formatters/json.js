import _ from 'lodash';

const sortTree = (tree) => {
  if (tree.status === 'nested') {
    return sortTree(tree.value);
  }
  return _.sortBy(tree, (item) => item.node);
};

/* eslint fp/no-mutation: "error" */
export default (diffTree) => {
  const crawler = (items, storage) => {
    const sortedItems = sortTree(items);
    const result = sortedItems.reduce((acc, node) => {
      switch (node.status) {
        case 'added':
          // eslint-disable-next-line fp/no-mutation
          storage[`+ ${node.node}`] = node.value;
          break;
        case 'deleted':
          // eslint-disable-next-line fp/no-mutation
          storage[`- ${node.node}`] = node.value;
          break;
        case 'unchanged':
          // eslint-disable-next-line fp/no-mutation
          storage[`  ${node.node}`] = node.value;
          break;
        case 'updated':
          // eslint-disable-next-line fp/no-mutation
          storage[`- ${node.node}`] = node.valueOld;
          // eslint-disable-next-line fp/no-mutation
          storage[`+ ${node.node}`] = node.valueNew;
          break;
        case 'nested':
          // eslint-disable-next-line fp/no-mutation
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
