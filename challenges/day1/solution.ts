import path from 'path';

import { countFuel, countTotalFuel } from './fuel-counter';

import { readLines } from '../../shared/file-reader';

const pathToFile = path.resolve(__dirname, './input.txt');
const input = readLines(pathToFile);

const solution1 = () => {
  return input
    .map((value) => parseInt(value, 10))
    .reduce((result, mass) => result + countFuel(mass), 0);
};

const solution2 = () => {
  return input
    .map((value) => parseInt(value, 10))
    .reduce((result, mass) => result + countTotalFuel(mass), 0);
};

console.log('solution to part 1: ', solution1());
console.log('solution to part 2: ', solution2());
