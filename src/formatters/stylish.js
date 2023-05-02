import _ from 'lodash';

const PADDING_STEP = 4;
const DECORATION_STEP = 2;

const stringify = (value, spacesCount) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, value1]) => `${' '.repeat(spacesCount)}${key}: ${stringify(value1, spacesCount + PADDING_STEP)}\n`);
  return `{\n${result.join('')}${' '.repeat(spacesCount - PADDING_STEP)}}`;
};

const getPadding = (depth) => {
  const pad = (count) => ' '.repeat(count);
  const spacesCount = depth * PADDING_STEP;
  const basePadding = `${pad((spacesCount) - DECORATION_STEP)}`;
  return {
    added: `${basePadding}`,
    deleted: `${basePadding}`,
    noChange: pad(spacesCount),
    nextLevel: spacesCount + PADDING_STEP,
    bracket: pad(spacesCount - PADDING_STEP),
  };
};

const stylish = (diff) => {
  const iter = (diffObj, depth) => {
    const padding = getPadding(depth);
    const stylishDiff = diffObj.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${padding.noChange}${item.key}: ${stringify(iter(item.children, depth + 1))}\n`;
        case 'deleted':
          return `${padding.deleted}- ${item.key}: ${stringify(item.value, padding.nextLevel)}\n`;
        case 'added':
          return `${padding.added}+ ${item.key}: ${stringify(item.value, padding.nextLevel)}\n`;
        case 'changed':
          return [
            `${padding.deleted}- ${item.key}: ${stringify(item.value1, padding.nextLevel)}\n`,
            `${padding.added}+ ${item.key}: ${stringify(item.value2, padding.nextLevel)}\n`,
          ];
        default:
          return `${padding.noChange}${item.key}: ${stringify(item.value)}\n`;
      }
    });
    return `{\n${stylishDiff.join('')}${padding.bracket}}`;
  };
  return iter(diff, 1);
};

export default stylish;
