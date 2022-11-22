import _ from 'lodash';

const compare = (objectOld, objectNew) => {
  const diff = [];

  // create uniq keys
  const keys = _.union(Object.keys(objectOld), Object.keys(objectNew));
  // go through values
  keys.map((key) => {
    // keys and objects in both places
    if ( (Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key) ) && (typeof objectNew[key] === 'object' && typeof objectOld[key] === 'object')) {
      // object
      diff.push({
        node: key,
        status: 'nested',
        value: compare(objectOld[key], objectNew[key]),
      });
    }


      // unchanged
      else if ( (Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key) ) && (objectNew[key] === objectOld[key])) {
        diff.push({
          node: key,
          status: 'unchanged',
          value: objectNew[key],
        });
      }
      // updated
      else if ( (Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key) ) && (objectNew[key] !== objectOld[key])) {
        diff.push({
          node: key,
          status: 'updated',
          value: objectNew[key],
        });

        if (Object.hasOwn(objectOld, key)) {
          diff.push({
            node: key,
            status: 'deleted',
            value: objectOld[key],
          });
        }
    }
      // status added
      else if (Object.hasOwn(objectNew, key) && !Object.hasOwn(objectOld, key)) {
        diff.push({
          node: key,
          status: 'added',
          value: objectNew[key],
        });
      }
      // status deleted
      else if (!Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) {
        diff.push({
          node: key,
          status: 'deleted',
          value: objectOld[key],
        });
      }
  });
  return diff;
};

export { compare };
