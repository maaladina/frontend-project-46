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
  const file1Path = getFixturePath(`file1.${extension}`);
  const file2Path = getFixturePath(`file2.${extension}`);
  expect(genDiff(file1Path, file2Path)).toEqual(readFile('stylish_result.txt').trim());
  expect(genDiff(file1Path, file2Path, 'stylish')).toEqual(readFile('stylish_result.txt').trim());
  expect(genDiff(file1Path, file2Path, 'plain')).toEqual(readFile('plain_result.txt'));
  expect(genDiff(file1Path, file2Path, 'json')).toEqual(readFile('json_result.txt'));
});
