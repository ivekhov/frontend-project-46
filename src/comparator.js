import _ from 'lodash';

const compare = (objectOld, objectNew) => {
  const diff = [];

  // create uniq keys
  const keys = _.union(Object.keys(objectOld), Object.keys(objectNew));
  // go through values
  keys.map((key) => {
    // status added
    if (Object.hasOwn(objectNew, key) && !Object.hasOwn(objectOld, key)) {
      diff.push({
        node: key,
        status: 'added',
        value: objectNew[key],
      });
    }
    // status deleted
    if (!Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) {
      diff.push({
        node: key,
        status: 'deleted',
        value: objectOld[key],
      });
    }
    // status unchanged or updated
    if (Object.hasOwn(objectNew, key) && Object.hasOwn(objectOld, key)) {
      if (typeof objectNew[key] === 'object' && typeof objectOld[key] === 'object') {
        diff.push({
          node: key,
          status: 'unchanged',
          value: compare(objectOld[key], objectOld[key]),
        });
        // return;
      } else if (objectNew[key] === objectOld[key]) {
        diff.push({
          node: key,
          status: 'unchanged',
          value: objectNew[key],
        });
      }
      // } else {
      //   diff.push({
      //     node: key,
      //     status: 'updated',
      //     value: objectNew[key],
      //   });
      //   diff.push({
      //     node: key,
      //     status: 'deleted',
      //     value: objectOld[key],
      //   });
      // }
    }
  });
  return diff;
};

export { compare };
