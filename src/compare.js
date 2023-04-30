import _ from 'lodash';

const getType = (data1, data2, key) => {
  if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
    return 'deleted';
  }
  if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
    return 'added';
  }
  if (_.isObject(data1[key]) && _.isObject(data2[key])) {
    return 'check';
  }
  if (data1[key] !== data2[key]) {
    return 'changed';
  }
  return 'unchanged';
};

const compare = (data1, data2) => {
  const obj = { ...data1, ...data2 };
  const sortedKeys = _.sortBy(Object.keys(obj));
  const diffObj = sortedKeys.flatMap((key) => {
    switch (getType(data1, data2, key)) {
      case 'check':
        return { key, value: compare(data1[key], data2[key]), type: 'check' };
      case 'deleted':
        return { key, value: data1[key], type: 'deleted' };
      case 'added':
        return { key, value: data2[key], type: 'added' };
      case 'changed':
        return {
          key, value1: data1[key], value2: data2[key], type: 'changed',
        };
      default:
        return { key, value: data1[key], type: 'unchanged' };
    }
  });
  return diffObj;
};

export default compare;
