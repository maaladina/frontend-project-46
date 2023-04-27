import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formats = {
  stylish,
  plain,
  json,
};

const getFormattedResult = (diff, format) => formats[format](diff);

export default getFormattedResult;
