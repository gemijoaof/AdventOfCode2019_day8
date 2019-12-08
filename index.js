const fs = require('fs');
const input = fs
  .readFileSync('./input.txt')
  .toString()
  .replace('\n', '');

const pixelsWidepart1 = 25;
const pixelsTallpart1 = 6;

const calcFewestZeroDigitsLayer = listLayers => {
  let outputLayer = [];
  let total = 0;

  for (const layer of listLayers) {
    let count = calcNumDigits(layer, 0);
    if (total === 0) {
      total = count;
      outputLayer = [...layer];
    } else if (count < total) {
      total = count;
      outputLayer = [...layer];
    }
  }

  return outputLayer;
};

const calcListLayers = (imageData, pixelsWide, pixelsTall) => {
  let list = [];
  let layer = [];
  let row = [];
  let countPixelsWide = 0;
  let countRows = 0;

  for (let index = 0; index < imageData.length; index++) {
    row.push(Number(imageData[index]));
    countPixelsWide++;

    if (countPixelsWide === pixelsWide) {
      layer.push(row);
      row = [];
      countPixelsWide = 0;
      countRows++;
    }

    if (countRows === pixelsTall) {
      list.push(layer);
      layer = [];
      countRows = 0;
    }
  }

  return list;
};

const calcNumDigits = (layer, num) => {
  total = layer.flat().reduce((acc, digit) => {
    if (digit === num) {
      acc++;
    }
    return acc;
  }, 0);
  return total;
};

const checkImageCorruption = (imageData, pixelsWide, pixelsTall) => {
  let listLayers = calcListLayers(imageData, pixelsWide, pixelsTall);
  let layerFewestZeroDigits = calcFewestZeroDigitsLayer(listLayers);
  let numOneDigits = calcNumDigits(layerFewestZeroDigits, 1);
  let numTwoDigits = calcNumDigits(layerFewestZeroDigits, 2);

  return numOneDigits * numTwoDigits;
};

const prettifyImage = strBinaryImage => {
  let str = '';

  for (const char of strBinaryImage) {
    str += char.replace('0', ' ').replace('1', '#');
  }

  return str;
};

const decodePos = (listLayers, indexRow, index) => {
  for (const layer of listLayers) {
    if (layer[indexRow][index] !== 2) {
      return layer[indexRow][index];
    }
  }
};

const decodeImage = (imageData, pixelsWide, pixelsTall) => {
  let listLayers = calcListLayers(imageData, pixelsWide, pixelsTall);
  let strImageBinary = '';

  for (let indexRow = 0; indexRow < pixelsTall; indexRow++) {
    for (let index = 0; index < pixelsWide; index++) {
      strImageBinary += decodePos(listLayers, indexRow, index);
    }
    strImageBinary += '\n';
  }

  strImageBinary = prettifyImage(strImageBinary);
  return strImageBinary;
};

console.time('time part1');
console.log(checkImageCorruption(input, pixelsWidepart1, pixelsTallpart1));
console.timeEnd('time part1');
console.log(' ');
console.time('time part2');
console.log(decodeImage(input, pixelsWidepart1, pixelsTallpart1));
console.timeEnd('time part2');
