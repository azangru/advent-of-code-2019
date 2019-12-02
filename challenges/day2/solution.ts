import { executeIntcode } from './intcode-runner';

const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,19,5,23,2,6,23,27,1,6,27,31,2,31,9,35,1,35,6,39,1,10,39,43,2,9,43,47,1,5,47,51,2,51,6,55,1,5,55,59,2,13,59,63,1,63,5,67,2,67,13,71,1,71,9,75,1,75,6,79,2,79,6,83,1,83,5,87,2,87,9,91,2,9,91,95,1,5,95,99,2,99,13,103,1,103,5,107,1,2,107,111,1,111,5,0,99,2,14,0,0];

const solvePart1 = () => {
  const input1 = input;
  input1[1] = 12;
  input1[2] = 2;
  return executeIntcode(input1);
};

const solvePart2 = () => {

  for (let x = 0; x <= 99; x++) {
    for (let y = 0; y <= 99; y++) {
      const testInput = input;
      testInput[1] = x;
      testInput[2] = y;
      const result = executeIntcode(testInput);
      if (result[0] === 19690720) {
        return result[1] * 100 + result[2];
      }
    }
  }
};

// console.log(solvePart1()[0]);
console.log(solvePart2());
