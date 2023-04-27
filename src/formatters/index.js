import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedResult = (diff, format) => {
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'json') {
    return json(diff);
  }
  return stylish(diff);
};

export default getFormattedResult;
