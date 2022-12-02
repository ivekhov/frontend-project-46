import _ from 'lodash';

const compare = (objectOld, objectNew) => {
  const keys = _.union(Object.keys(objectOld), Object.keys(objectNew));

  return keys.map((key) => {
    if ((Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) && (typeof objectNew[key] === 'object' && typeof objectOld[key] === 'object')) {
      return {
        node: key,
        status: 'nested',
        value: compare(objectOld[key], objectNew[key]),
      };
    }
    if ((Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) && (objectNew[key] === objectOld[key])) {
      return {
        node: key,
        status: 'unchanged',
        value: objectOld[key],
      }
    }
    if ((Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) && (objectNew[key] !== objectOld[key])) {
      if (Object.hasOwn(objectNew, key)) {
        return {
          node: key,
          status: 'updated',
          value: [objectNew[key], objectOld[key]],
        };
      };
    }
    if (Object.hasOwn(objectNew, key) && !Object.hasOwn(objectOld, key)) {
      return {
        node: key,
        status: 'added',
        value: objectNew[key],
      };
    }
    if (!Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) {
      return {
        node: key,
        status: 'deleted',
        value: objectOld[key],
      };
    }
  });
};

export { compare };
