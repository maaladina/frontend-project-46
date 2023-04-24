import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import getFormattedResult from './formatters/index.js';
import parse from './parser.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (file) => fs.readFileSync(getPath(file));
const getfFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (file1, file2, format) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const parsedData1 = parse(data1, getfFormat(file1));
  const parsedData2 = parse(data2, getfFormat(file2));
  const diff = compare(parsedData1, parsedData2);
  const result = getFormattedResult(diff, format);
  return result;
};

export default genDiff;
