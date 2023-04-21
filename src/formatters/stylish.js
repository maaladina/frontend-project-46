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

const stylish = (diffObj, spacesCount = 4) => {
  const basePadding = `${pad(spacesCount - DECORATION_STEP)}`;
  const paddingAdded = `${basePadding}+ `;
  const paddingDeleted = `${basePadding}- `;
  const paddingNoChange = pad(spacesCount);
  const nextLevelSpacesCount = spacesCount + PADDING_STEP;

  const stylishDiff = diffObj.reduce((acc, item) => {
    switch (item.type) {
      case 'check':
        return acc
          + ppKeyValue(item.key, stylish(item.value, nextLevelSpacesCount), paddingNoChange);
      case 'deleted':
        return acc
          + ppKeyValue(item.key, item.value, paddingDeleted, nextLevelSpacesCount);
      case 'added':
        return acc
          + ppKeyValue(item.key, item.value, paddingAdded, nextLevelSpacesCount);
      case 'changed':
        return acc
          + ppKeyValue(item.key, item.value1, paddingDeleted, nextLevelSpacesCount)
          + ppKeyValue(item.key, item.value2, paddingAdded, nextLevelSpacesCount);
      default:
        return acc
          + ppKeyValue(item.key, item.value, paddingNoChange);
    }
  }, '');
  return `{\n${stylishDiff}${pad(spacesCount - 4)}}`;
};

export default stylish;
