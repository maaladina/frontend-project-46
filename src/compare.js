import _ from 'lodash';

const compare = (data1, data2) => {
  const data = { ...data1, ...data2 };
  const sortedKeys = _.sortBy(Object.keys(data));
  const diffObj = sortedKeys.flatMap((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: compare(data1[key], data2[key]), type: 'nested' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });
  return diffObj;
};

export default compare;
