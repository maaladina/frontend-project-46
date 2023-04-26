import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedResult = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'json') {
    return json(diff);
  }
  throw Error(`unknown format: ${format}`);
};

export default getFormattedResult;
