type State = {
  program: number[],
  cursor: number,
  input: number,
  output: number[],
  continue: boolean
};

export const runProgram = (program: number[], input: number = 0) => {
  const initialState = {
    program,
    input,
    cursor: 0,
    output: [],
    continue: true
  };
  const finalState = executeProgram(initialState);
  return finalState;
}

export const executeProgram = (state: State): State => {
  const updatedState = executeInstruction(state);
  if (!updatedState.continue) {
    return updatedState;
  } else {
    return executeProgram(updatedState);
  }
};

const executeInstruction = (state: State) => {
  const { program, cursor } = state;
  if (cursor > program.length) {
    throw "Cursor out of bounds";
  }
  if (program[cursor] === 99) {
    return { ...state, continue: false };
  } else {
    const { operation, modes } = readOpcode(program[cursor]);
    const executor = instructionMap[operation];
    return {
      ...state,
      ...executor(state, modes)
    }
  }
};

const readOpcode = (code: number) => {
  console.log('code', code);
  const stringifiedOpcode = code.toString();
  if (stringifiedOpcode.length === 1) {
    return { operation: code, modes: [] };
  } else {
    let operation = parseInt(stringifiedOpcode.substring(stringifiedOpcode.length - 2), 10);
    const modes = stringifiedOpcode
      .split('')
      .slice(0, stringifiedOpcode.length - 2)
      .reverse()
      .map((mode) => parseInt(mode, 10));
    return { operation, modes };
  }
};

const add = (state: State, modes: number[]) => {
  const {program, cursor} = state;
  const [ mode1 = 0, mode2 = 0, mode3 = 0 ] = modes;
  const x = mode1 === 0 ? program[program[cursor + 1]] : program[cursor + 1];
  const y = mode2 === 0 ? program[program[cursor + 2]] : program[cursor + 2];
  const sum = x + y;
  const position = mode3 === 0 ? program[cursor + 3] : cursor + 3;
  program[position] = sum;
  return { ...state, cursor: cursor + 4 };
};

const multiply = (state: State, modes: number[]) => {
  const {program, cursor} = state;
  const [ mode1 = 0, mode2 = 0, mode3 = 0 ] = modes;
  const x = mode1 === 0 ? program[program[cursor + 1]] : program[cursor + 1];
  const y = mode2 === 0 ? program[program[cursor + 2]] : program[cursor + 2];
  const product = x * y;
  const position = mode3 === 0 ? program[cursor + 3] : cursor + 3;
  program[position] = product;
  return { ...state, cursor: cursor + 4 };
};

const jumpIfTrue = (state: State, modes: number[]) => {
  let {program, cursor} = state;
  const [ mode1 = 0, mode2 = 0 ] = modes;
  const first = mode1 === 0 ? program[program[cursor + 1]] : program[cursor + 1];
  const second = mode2 === 0 ? program[program[cursor + 2]] : program[cursor + 2];
  if (first) {
    cursor = second;
  } else {
    cursor = cursor + 3;
  }
  return { ...state, cursor };
};

const jumpIfFalse = (state: State, modes: number[]) => {
  let {program, cursor} = state;
  const [ mode1 = 0, mode2 = 0 ] = modes;
  const first = mode1 === 0 ? program[program[cursor + 1]] : program[cursor + 1];
  const second = mode2 === 0 ? program[program[cursor + 2]] : program[cursor + 2];
  if (!first) {
    cursor = second;
  } else {
    cursor = cursor + 3;
  }
  return { ...state, cursor };
};

const lessThan = (state: State, modes: number[]) => {
  let {program, cursor} = state;
  const [ mode1 = 0, mode2 = 0 ] = modes;
  const first = mode1 === 0 ? program[program[cursor + 1]] : program[cursor + 1];
  const second = mode2 === 0 ? program[program[cursor + 2]] : program[cursor + 2];
  const position = program[cursor + 3];
  program[position] = first < second ? 1 : 0;
  return { ...state, cursor: cursor + 4 };
};

const equals = (state: State, modes: number[]) => {
  let {program, cursor} = state;
  const [ mode1 = 0, mode2 = 0 ] = modes;
  const first = mode1 === 0 ? program[program[cursor + 1]] : program[cursor + 1];
  const second = mode2 === 0 ? program[program[cursor + 2]] : program[cursor + 2];
  const position = program[cursor + 3];
  program[position] = first === second ? 1 : 0;
  return { ...state, cursor: cursor + 4 };
};

const readInput = (state: State) => {
  const { program, cursor, input } = state;
  const position = program[cursor + 1];
  program[position] = input;
  return { ...state, cursor: cursor + 2 };
};

const writeOutput = (state: State) => {
  const { program, cursor, output } = state;
  const position = program[cursor + 1]
  output.push(program[position]);
  return { ...state, cursor: cursor + 2 };
};


const instructionMap = {
  1: add,
  2: multiply,
  3: readInput,
  4: writeOutput,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals
};
