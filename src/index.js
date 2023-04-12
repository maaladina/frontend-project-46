import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import parse from './parser.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (file) => fs.readFileSync(getPath(file));
const getfFormat = (filename) => filename.split('.')[1];

const genDiff = (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const parsedData1 = parse(data1, getfFormat(file1));
  const parsedData2 = parse(data2, getfFormat(file2));
  const result = compare(parsedData1, parsedData2);
  return result;
};

export default genDiff;
