import { IntcodeComputer } from './intcode-computer';

describe('IntcodeComputer', () => {

  it('works with addition, multiplication and halting', () => {
    const program1 = [1,9,10,3,2,3,11,0,99,30,40,50];
    const updatedProgram1 = [3500,9,10,70,2,3,11,0,99,30,40,50];

    const program2 = [1,0,0,0,99];
    const updatedProgram2 = [2,0,0,0,99];

    const program3 = [2,3,0,3,99];
    const updatedProgram3 = [2,3,0,6,99];

    const program4 = [2,4,4,5,99,0];
    const updatedProgram4 = [2,4,4,5,99,9801];

    const program5 = [1,1,1,4,99,5,6,0,99];
    const updatedProgram5 = [30,1,1,4,2,5,6,0,99];

    expect(new IntcodeComputer(program1).runProgram().getCurrentMemory()).toEqual(updatedProgram1);
    expect(new IntcodeComputer(program2).runProgram().getCurrentMemory()).toEqual(updatedProgram2);
    expect(new IntcodeComputer(program3).runProgram().getCurrentMemory()).toEqual(updatedProgram3);
    expect(new IntcodeComputer(program4).runProgram().getCurrentMemory()).toEqual(updatedProgram4);
    expect(new IntcodeComputer(program5).runProgram().getCurrentMemory()).toEqual(updatedProgram5);
  });

  test('program `3,0,4,0,99` outputs whatever it gets as input', () => {
    const program = [3,0,4,0,99];
    const input = 5;

    const computer = new IntcodeComputer(program);
    computer.takeInput(input);
    computer.runProgram();

    expect(computer.getOutput()).toEqual(input);
  });

  it('correctly uses modes', () => {
    const program = [1002,4,3,4,33];
    const expectedResult = [1002,4,3,4,99];

    const computer = new IntcodeComputer(program);
    computer.runProgram();
    expect(computer.getCurrentMemory()).toEqual(expectedResult);
  });

  it('correctly performs equality test in position mode', () => {
    const program = [3,9,8,9,10,9,4,9,99,-1,8];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(8);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(1);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(7);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(0);
  });

  it('correctly performs equality test in immediate mode', () => {
    const program = [3,3,1108,-1,8,3,4,3,99];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(8);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(1);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(7);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(0);
  });

  it('correctly performs less than test in position mode', () => {
    const program = [3,9,7,9,10,9,4,9,99,-1,8];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(7);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(1);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(8);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(0);
  });

  it('correctly performs less than test in immediate mode', () => {
    const program = [3,3,1107,-1,8,3,4,3,99];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(7);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(1);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(8);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(0);
  });

  test('jump, using position mode', () => {
    const program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(0);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(0);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(2);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(1);
  });

  test('jump, using immediate mode', () => {
    const program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(0);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(0);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(2);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(1);
  });

  test('larger example', () => {
    const program = [
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    ];

    const computer1 = new IntcodeComputer(program);
    computer1.takeInput(8);
    computer1.runProgram();
    expect(computer1.getOutput()).toEqual(1000);

    const computer2 = new IntcodeComputer(program);
    computer2.takeInput(9);
    computer2.runProgram();
    expect(computer2.getOutput()).toEqual(1001);

    const computer3 = new IntcodeComputer(program);
    computer3.takeInput(7);
    computer3.runProgram();
    expect(computer3.getOutput()).toEqual(999);
  });

});
