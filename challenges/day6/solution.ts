import path from 'path';

import { readLines } from '../../shared/file-reader';

import { parseInput } from './parser';
import { buildTree, countAllOrbits, findNumberOfOrbitalTransfers } from './tree';

const pathToFile = path.resolve(__dirname, './input.txt');
const input = readLines(pathToFile);

const solution1 = () => {
  const tree = buildTree(parseInput(input));
  return countAllOrbits(tree);
};

const solution2 = () => {
  const tree = buildTree(parseInput(input));
  return findNumberOfOrbitalTransfers(tree);
}

// console.log('solution to part 1 is', solution1());
console.log('solution to part 2 is', solution2());
