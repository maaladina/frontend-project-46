import { fileURLToPath } from 'url';
import fs from 'fs';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileExtensions = ['json', 'yml'];

test.each(fileExtensions)('Compare %s files', (extension) => {
  const file1 = getFixturePath(`file1.${extension}`);
  const file2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(file1, file2)).toEqual(readFile('stylish_result.txt').trim());
  expect(genDiff(file1, file2, 'stylish')).toEqual(readFile('stylish_result.txt').trim());
  expect(genDiff(file1, file2, 'plain')).toEqual(readFile('plain_result.txt'));
  expect(genDiff(file1, file2, 'json')).toEqual(readFile('json_result.txt'));
});
