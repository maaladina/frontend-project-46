import { fileURLToPath } from 'url';
import fs from 'fs';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff .json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expResult = readFile('expected_file.json').trim();
  const result = genDiff(file1, file2, 'stylish');
  expect(result).toEqual(expResult);
});

test('genDiff .yml', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expResult = readFile('expected_file.json').trim();
  const result = genDiff(file1, file2, 'stylish');
  expect(result).toEqual(expResult);
});

test('genDiff .json plain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expResult = readFile('plain_result.txt').trim();
  const result = genDiff(file1, file2, 'plain');
  expect(result).toEqual(expResult);
});

test('genDiff .yml plain', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expResult = readFile('plain_result.txt').trim();
  const result = genDiff(file1, file2, 'plain');
  expect(result).toEqual(expResult);
});

test('genDiff .json json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expResult = readFile('json_result.txt').trim();
  const result = genDiff(file1, file2, 'json');
  expect(result).toEqual(expResult);
});

test('genDiff .yml json', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expResult = readFile('json_result.txt').trim();
  const result = genDiff(file1, file2, 'json');
  expect(result).toEqual(expResult);
});
