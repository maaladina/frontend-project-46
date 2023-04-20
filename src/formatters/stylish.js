#!/usr/bin/env node

import _ from 'lodash';

const try1Stylish = (value, spacesCount = 4) => {
  if (!_.isArray(value)) {
    return value;
  }
  console.log(value);
  const stylishValue = value.reduce((acc, currentValue) => {
    if (currentValue.type === 'changed') {
      const decoratedValue1 = try1Stylish(currentValue.value1);
      const decoratedValue2 = try1Stylish(currentValue.value2);
      return `${acc}${' '.repeat(spacesCount - 2)}- ${currentValue.key}: ${decoratedValue1}\n${' '.repeat(spacesCount - 2)}+ ${currentValue.key}: ${decoratedValue2}\n`;
    }
    const decoratedValue = try1Stylish(currentValue.value);
    if (currentValue.type === 'deleted') {
      return `${acc}${' '.repeat(spacesCount - 2)}- ${currentValue.key}: ${decoratedValue}\n`;
    }
    if (currentValue.type === 'added') {
      return `${acc}${' '.repeat(spacesCount - 2)}+ ${currentValue.key}: ${decoratedValue}\n`;
    }
    return `${acc}${' '.repeat(spacesCount)}${currentValue.key}: ${decoratedValue}\n`;
  }, '');
  return `{\n${stylishValue}${' '.repeat(spacesCount - 4)}}`;
};

const gendiff = (file1, file2) => {
  const file = { ...file1, ...file2 };
  const sortedKeys = _.sortBy(Object.keys(file));
  const result = sortedKeys.flatMap((key) => {
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, value: gendiff(file1[key], file2[key]), type: 'check' };
    }
    if (file1[key] === file2[key]) {
      return { key, value: file1[key], type: 'unchanged' };
    }
    return {
      key, value1: file1[key], value2: file2[key], type: 'changed',
    };
  });
  return result;
};

const file1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const file2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

console.log(try1Stylish(gendiff(file1, file2)));
