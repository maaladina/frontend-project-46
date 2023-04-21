import _ from 'lodash';

const compare = (obj1, obj2) => {
  const obj = { ...obj1, ...obj2 };
  const sortedKeys = _.sortBy(Object.keys(obj));
  const diffObj = sortedKeys.flatMap((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: compare(obj1[key], obj2[key]), type: 'check' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, value1: obj1[key], value2: obj2[key], type: 'changed',
      };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });
  return diffObj;
};

export default compare;
