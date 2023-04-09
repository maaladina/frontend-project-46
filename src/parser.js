import yaml from 'js-yaml';

const parse = (data, type) => {
  if (type === 'json') {
    return JSON.parse(data);
  }
  if (type === 'yaml' || type === 'yml') {
    return yaml.load(data);
  }
  throw Error(`Unknown format: ${type}!`);
};

export default parse;
