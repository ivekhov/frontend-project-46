import _ from 'lodash';

const sortTree = (tree) => {
  if (tree.status === 'nested') {
    return sortTree(tree.value);
  }
  return _.sortBy(tree, (item) => item.node);
};

export default (diffTree) => JSON.stringify(sortTree(diffTree));
