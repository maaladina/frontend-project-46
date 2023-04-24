import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (obj, path = []) => {
  const plainResult = obj.map((item) => {
    const newPath = path.concat(item.key);
    const keyPath = newPath.join('.');
    switch (item.type) {
      case 'check':
        return `${plain(item.value, newPath)}`;
      case 'deleted':
        return `Property '${keyPath}' was removed\n`;
      case 'added':
        return `Property '${keyPath}' was added with value: ${getValue(item.value)}\n`;
      case 'changed':
        return `Property '${keyPath}' was updated. From ${getValue(item.value1)} to ${getValue(item.value2)}\n`;
      default:
        return '';
    }
  }).join('');
  return plainResult;
};

export default plain;
