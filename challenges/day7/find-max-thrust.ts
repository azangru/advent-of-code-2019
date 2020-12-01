import { IntcodeComputer } from './intcode-computer/intcode-computer';
import { permutate } from './permutate';

export type Phases = [
  number,
  number,
  number,
  number,
  number
]

export const calculateThrustForPhases = (program: number[], phases: Phases) => {
  let input = 0;
  for (let phase of phases) {
    const computer = new IntcodeComputer(program);
    computer.takeInput(phase);
    computer.takeInput(input);
    computer.runProgram();
    input = computer.getOutput();
  }

  return input;
};

export const findMaximumThrust = (program: number[]) => {
  const thrusts = getFivePhaseCombinations()
    .map(phases => calculateThrustForPhases(program, phases as Phases));
  return Math.max(...thrusts);
};

const getFivePhaseCombinations = () => {
  const phases = [0, 1, 2, 3, 4];
  return permutate(phases);
};
