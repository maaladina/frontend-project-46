import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import getFormattedResult from './formatters/index.js';
import parse from './parser.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (file) => fs.readFileSync(getPath(file));
const getType = (filename) => path.extname(filename).slice(1);

const genDiff = (file1Path, file2Path, formatName = 'stylish') => {
  const data1 = readFile(file1Path);
  const data2 = readFile(file2Path);
  const parsedData1 = parse(data1, getType(file1Path));
  const parsedData2 = parse(data2, getType(file2Path));
  const diff = compare(parsedData1, parsedData2);
  const result = getFormattedResult(diff, formatName);
  return result;
};

export default genDiff;
