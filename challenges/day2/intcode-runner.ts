export const executeIntcode = (input: number[], cursor: number = 0): number[] => {
  const instruction = input.slice(cursor, cursor + 4);
  if (instruction[0] === 99) {
    return input;
  } else {
    input = readInstruction(instruction, input);
    return executeIntcode(input, cursor + 4);
  }
};

const parseInstructions = (input: number[], output: Array<number[]>): Array<number[]> => {
  if (input.length <= 4) {
    return [...output, input];
  } else {
    const [one, two, three, four, ...rest] = input;
    const instruction = [one, two, three, four];
    const newOutput = [...output, instruction];
    return parseInstructions(rest, newOutput);
  }
};

const readInstruction = (instruction: number[], input: number[]) => {
  const operationType = instruction[0];
  if (operationType === 1) {
    return operation(instruction, input, 'add');
  } else if (operationType === 2) {
    return operation(instruction, input, 'multiply');
  } else {
    throw `invalid opcode: ${instruction[0]}`;
  }
};

const operation = (instruction: number[], input: number[], type: 'add' | 'multiply') => {
  const operation = type === 'add' ? add : multiply;
  const result = operation(input[instruction[1]], input[instruction[2]]);
  const insertIndex = instruction[3];
  return [...input.slice(0, insertIndex), result, ...input.slice(insertIndex + 1)];
};

const add = (x: number, y: number) => x + y;

const multiply = (x: number, y: number) => x * y;
