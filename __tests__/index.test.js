import { fileURLToPath } from 'url';
import fs from 'fs';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileExtensions = ['json', 'yml'];

const expStylish = readFile('stylish_result.txt').trim();
const expPlain = readFile('plain_result.txt');
const expJson = readFile('json_result.txt');

test.each(fileExtensions)('Compare %s files', (extension) => {
  const file1Path = getFixturePath(`file1.${extension}`);
  const file2Path = getFixturePath(`file2.${extension}`);
  expect(genDiff(file1Path, file2Path)).toEqual(expStylish);
  expect(genDiff(file1Path, file2Path, 'stylish')).toEqual(expStylish);
  expect(genDiff(file1Path, file2Path, 'plain')).toEqual(expPlain);
  expect(genDiff(file1Path, file2Path, 'json')).toEqual(expJson);
});
