import _ from 'lodash';

const PADDING_STEP = 4;
const DECORATION_STEP = 2;

const pad = (count) => ' '.repeat(count);

const stringify = (value, spacesCount) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const result = entries.reduce((acc, [key, value1]) => `${acc}${pad(spacesCount)}${key}: ${stringify(value1, spacesCount + PADDING_STEP)}\n`, '');
  return `{\n${result}${pad(spacesCount - 4)}}`;
};

const ppKeyValue = (key, value, padding, spaces) => `${padding}${key}: ${stringify(value, spaces)}\n`;

const getPadding = (spacesCount) => {
  const basePadding = `${pad(spacesCount - DECORATION_STEP)}`;
  return {
    added: `${basePadding}+ `,
    deleted: `${basePadding}- `,
    noChange: pad(spacesCount),
    nextLevel: spacesCount + PADDING_STEP,
  };
};

const stylish = (diffObj, spacesCount = 4) => {
  const padding = getPadding(spacesCount);
  const stylishDiff = diffObj.map((item) => {
    switch (item.type) {
      case 'nested':
        return ppKeyValue(item.key, stylish(item.children, padding.nextLevel), padding.noChange);
      case 'deleted':
        return ppKeyValue(item.key, item.value, padding.deleted, padding.nextLevel);
      case 'added':
        return ppKeyValue(item.key, item.value, padding.added, padding.nextLevel);
      case 'changed':
        return ppKeyValue(item.key, item.value1, padding.deleted, padding.nextLevel)
          + ppKeyValue(item.key, item.value2, padding.added, padding.nextLevel);
      default:
        return ppKeyValue(item.key, item.value, padding.noChange);
    }
  });
  return `{\n${stylishDiff.join('')}${pad(spacesCount - 4)}}`;
};

export default stylish;
