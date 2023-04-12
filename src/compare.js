import _ from 'lodash';

const genStr = (key, value, sign = ' ') => `  ${sign} ${key}: ${value}\n`;

const differenceForKey = (key, file1, file2) => {
  if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
    if (file1[key] === file2[key]) {
      return genStr(key, file1[key]);
    }
    return `${genStr(key, file1[key], '-')}${genStr(key, file2[key], '+')}`;
  } if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
    return genStr(key, file1[key], '-');
  }
  return genStr(key, file2[key], '+');
};

const compare = (file1, file2) => {
  const file = { ...file1, ...file2 };
  const sortedKeys = _.sortBy(Object.keys(file));
  const result = sortedKeys.reduce((acc, key) => acc + differenceForKey(key, file1, file2), '');
  return `{\n${result}}`;
};

export default compare;
