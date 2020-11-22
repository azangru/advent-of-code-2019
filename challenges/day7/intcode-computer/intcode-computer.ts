type ModedExecutor = (modes: number[]) => unknown;
type ModelessExecutor = () => unknown;
type Executor = ModedExecutor | ModelessExecutor;

type OperationCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class IntcodeComputer {

  // starts off with the same value as the program but is mutated during execution
  private memory: number[] = [];

  private pointerPosition = 0;

  private inputs: number[] = [];
  private outputs: number[] = [];

  constructor(program: number[]) {
    this.memory = [...program];
  }

  getCurrentMemory = () => {
    return this.memory;
  }

  runProgram = () => {
    while (this.pointerPosition < this.memory.length && this.memory[this.pointerPosition] !== 99) {
      const opcode = this.memory[this.pointerPosition];
      const { operation, modes } = this.readOpcode(opcode);
      const executor = this.opcodeMap[operation as OperationCode];
      executor(modes);
    }
    return this;
  }

  readOpcode = (code: number) => {
    const stringifiedOpcode = code.toString();
    if (stringifiedOpcode.length <= 2) {
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
  }

  takeInput = (input: number | number[]) => {
    if (typeof input === 'number') {
      this.inputs.push(input);
    } else {
      this.inputs = this.inputs.concat(input);
    }
  }

  getOutput = () => {
    const lastOutput = this.outputs[this.outputs.length - 1];
    return lastOutput;
  }

  add = (modes: number[]) => {
    const pointer = this.pointerPosition;
    const [
      firstParameter,
      secondParameter,
      destination
    ] = [
      this.memory[pointer + 1],
      this.memory[pointer + 2],
      this.memory[pointer + 3]
    ]
    const firstParameterMode = modes[0] || 0;
    const secondParameterMode = modes[1] || 0;
    const a = firstParameterMode ? firstParameter : this.memory[firstParameter];
    const b = secondParameterMode ? secondParameter : this.memory[secondParameter];
    const sum = a + b;
    if (destination === this.pointerPosition) console.log('whoa!');
    this.memory[destination] = sum;
    this.pointerPosition = pointer + 4;
  }

  multiply = (modes: number[]) => {
    const pointer = this.pointerPosition;
    const [
      firstParameter,
      secondParameter,
      destination
    ] = [
      this.memory[pointer + 1],
      this.memory[pointer + 2],
      this.memory[pointer + 3]
    ]
    const firstParameterMode = modes[0] || 0;
    const secondParameterMode = modes[1] || 0;
    const a = firstParameterMode ? firstParameter : this.memory[firstParameter];
    const b = secondParameterMode ? secondParameter : this.memory[secondParameter];
    const product = a * b;
    if (destination === this.pointerPosition) console.log('whoa!');
    this.memory[destination] = product;
    this.pointerPosition = pointer + 4;
  }

  saveInput = () => {
    const pointer = this.pointerPosition;
    const input = this.inputs.shift();
    const savePosition = this.memory[pointer + 1];
    if (typeof input !== 'number') {
      console.log('Input is not a number! Panic!')
    } else {
      this.memory[savePosition] = input;
    }
    this.pointerPosition = pointer + 2;
  }

  saveOutput = (modes: number[]) => {
    const pointer = this.pointerPosition;
    const parameter = this.memory[pointer + 1];
    const parameterMode = modes[0] || 0;
    const value = parameterMode ? parameter : this.memory[parameter];
    this.outputs.push(value);
    this.pointerPosition = pointer + 2;
  }

  jumpIfTrue = (modes: number[]) => {
    const firstNumberMode = modes[0] || 0;
    const positionMode = modes[1] || 0;
    const pointer = this.pointerPosition;
    const number = firstNumberMode ? this.memory[pointer + 1] : this.memory[this.memory[pointer + 1]];
    const jumpPosition = positionMode ? this.memory[pointer + 2] : this.memory[this.memory[pointer + 2]];
    if (Boolean(number)) {
      this.pointerPosition = jumpPosition;
    } else {
      this.pointerPosition = pointer + 3;
    }
  }

  jumpIfFalse = (modes: number[]) => {
    const firstNumberMode = modes[0] || 0;
    const positionMode = modes[1] || 0;
    const pointer = this.pointerPosition;
    const number = firstNumberMode ? this.memory[pointer + 1] : this.memory[this.memory[pointer + 1]];
    const jumpPosition = positionMode ? this.memory[pointer + 2] : this.memory[this.memory[pointer + 2]];
    if (!Boolean(number)) {
      this.pointerPosition = jumpPosition;
    } else {
      this.pointerPosition = pointer + 3;
    }
  }

  lessThan = (modes: number[]) => {
    const pointer = this.pointerPosition;
    const firstNumberMode = modes[0] || 0;
    const secondNumberMode = modes[1] || 0;

    const first = firstNumberMode ? this.memory[pointer + 1] : this.memory[this.memory[pointer + 1]];
    const second = secondNumberMode ? this.memory[pointer + 2] : this.memory[this.memory[pointer + 2]];
    const memoryPosition = this.memory[pointer + 3];

    if (memoryPosition === this.pointerPosition) console.log('whoa!');

    if (first < second) {
      this.memory[memoryPosition] = 1;
    } else {
      this.memory[memoryPosition] = 0;
    }
    this.pointerPosition = pointer + 4;
  }

  equals = (modes: number[]) => {
    const pointer = this.pointerPosition;
    const firstNumberMode = modes[0] || 0;
    const secondNumberMode = modes[1] || 0;
    const first = firstNumberMode ? this.memory[pointer + 1] : this.memory[this.memory[pointer + 1]];
    const second = secondNumberMode ? this.memory[pointer + 2] : this.memory[this.memory[pointer + 2]];
    const memoryPosition = this.memory[pointer + 3];

    if (memoryPosition === this.pointerPosition) console.log('whoa!');

    if (first === second) {
      this.memory[memoryPosition] = 1;
    } else {
      this.memory[memoryPosition] = 0;
    }
    this.pointerPosition = pointer + 4;
  }

  opcodeMap: Record<OperationCode, Executor> = {
    1: this.add,
    2: this.multiply,
    3: this.saveInput,
    4: this.saveOutput,
    5: this.jumpIfTrue,
    6: this.jumpIfFalse,
    7: this.lessThan,
    8: this.equals
  }


}
