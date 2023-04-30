import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (diff, formatName) => {
  if (formatName === 'plain') {
    return plain(diff);
  }
  if (formatName === 'json') {
    return json(diff);
  }
  return stylish(diff);
};

export default format;
