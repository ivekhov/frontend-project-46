import _ from 'lodash';

const compareObjects = (objectOld, objectNew) => {
  const keys = _.union(Object.keys(objectOld), Object.keys(objectNew));

  return keys.map((key) => {
    if (!Object.hasOwn(objectOld, key)) {
      return {
         node: key,
         status: 'added',
         value: objectNew[key],
      };
    }:
    if (!Object.hasOwn(objectNew, key)) {
      return {
        node: key,
        status: 'deleted',
        value: objectOld[key],
      };
    };
    if (_.isObject(objectNew[key]) && _.isObject(objectOld[key])) {
      return {
        node: key,
        status: 'nested',
        value: compareObjects(objectOld[key], objectNew[key]),
      };
    };
    if (objectNew[key] === objectOld[key]) {
      return {
        node: key,
        status: 'unchanged',
        value: objectOld[key],
      };
    };
    if (objectNew[key] !== objectOld[key]) {
      if (Object.hasOwn(objectNew, key)) {
        return {
          node: key,
          status: 'updated',
          valueOld: objectOld[key],
          valueNew: objectNew[key]
        };
      };
    };
  });
};

export { compareObjects };

