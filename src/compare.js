import _ from 'lodash';

const getType = (obj1, obj2, key) => {
  if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
    return 'deleted';
  }
  if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
    return 'added';
  }
  if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
    return 'check';
  }
  if (obj1[key] !== obj2[key]) {
    return 'changed';
  }
  return 'unchanged';
};

const compare = (obj1, obj2) => {
  const obj = { ...obj1, ...obj2 };
  const sortedKeys = _.sortBy(Object.keys(obj));
  const diffObj = sortedKeys.flatMap((key) => {
    switch (getType(obj1, obj2, key)) {
      case 'check':
        return { key, value: compare(obj1[key], obj2[key]), type: 'check' };
      case 'deleted':
        return { key, value: obj1[key], type: 'deleted' };
      case 'added':
        return { key, value: obj2[key], type: 'added' };
      case 'changed':
        return {
          key, value1: obj1[key], value2: obj2[key], type: 'changed',
        };
      default:
        return { key, value: obj1[key], type: 'unchanged' };
    }
  });
  return diffObj;
};

export default compare;
