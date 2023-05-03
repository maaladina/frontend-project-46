import _ from 'lodash';

const PADDING_STEP = 4;

const pad = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, value1]) => `${pad(depth)}  ${key}: ${stringify(value1, depth + 1)}`);
  return `{\n${result.join('\n')}\n${pad(depth - 1)}  }`;
};

const stylish = (diff) => {
  const iter = (diffObj, depth) => {
    const stylishDiff = diffObj.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${pad(depth)}  ${item.key}: ${stringify(iter(item.children, depth + 1))}`;
        case 'deleted':
          return `${pad(depth)}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'added':
          return `${pad(depth)}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'changed':
          return [
            `${pad(depth)}- ${item.key}: ${stringify(item.value1, depth + 1)}`,
            `${pad(depth)}+ ${item.key}: ${stringify(item.value2, depth + 1)}`,
          ];
        default:
          return `${pad(depth)}  ${item.key}: ${stringify(item.value)}`;
      }
    });
    return `{\n${stylishDiff.join('\n')}\n${' '.repeat((depth - 1) * PADDING_STEP)}}`;
  };
  return iter(diff, 1);
};

export default stylish;
