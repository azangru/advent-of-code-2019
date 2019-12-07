import { runProgram } from './intcode-runner';


describe('program executor', () => {
  test('runs tests from day 2 correctly', () => {
    const input1 = [1,9,10,3,2,3,11,0,99,30,40,50];
    const output1 = [3500,9,10,70,2,3,11,0,99,30,40,50];

    const input2 = [1,0,0,0,99];
    const output2 = [2,0,0,0,99];

    const input3 = [2,3,0,3,99];
    const output3 = [2,3,0,6,99];

    const input4 = [2,4,4,5,99,0];
    const output4 = [2,4,4,5,99,9801];

    const input5 = [1,1,1,4,99,5,6,0,99];
    const output5 = [30,1,1,4,2,5,6,0,99];

    expect(runProgram(input1).program).toEqual(output1);
    expect(runProgram(input2).program).toEqual(output2);
    expect(runProgram(input3).program).toEqual(output3);
    expect(runProgram(input4).program).toEqual(output4);
    expect(runProgram(input5).program).toEqual(output5);
  });

  test('program `3,0,4,0,99` outputs whatever it gets as input', () => {
    const program = [3,0,4,0,99];
    const input = 5;

    expect(runProgram(program, input).output[0]).toEqual(input);
  });

  test('correctly uses modes', () => {
    const program = [1002,4,3,4,33];
    const expectedResult = [1002,4,3,4,99];
    expect(runProgram(program).program).toEqual(expectedResult);
  });

  test('equal to in position mode', () => {
    const program = [3,9,8,9,10,9,4,9,99,-1,8];

    expect(runProgram(program, 8).output[0]).toBe(1);
    expect(runProgram(program, 7).output[0]).toBe(0);
  });

  test('equal to in immediate mode', () => {
    const program = [3,3,1108,-1,8,3,4,3,99];

    expect(runProgram(program, 8).output[0]).toBe(1);
    expect(runProgram(program, 7).output[0]).toBe(0);
  });

  test('less than in position mode', () => {
    const program = [3,9,7,9,10,9,4,9,99,-1,8];

    expect(runProgram(program, 7).output[0]).toBe(1);
    expect(runProgram(program, 8).output[0]).toBe(0);
  });

  test('less than in immediate mode', () => {
    const program = [3,3,1107,-1,8,3,4,3,99];

    expect(runProgram(program, 7).output[0]).toBe(1);
    expect(runProgram(program, 8).output[0]).toBe(0);
  });


  test('jump, using position mode', () => {
    const program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];

    expect(runProgram([...program], 0).output[0]).toBe(0);
    expect(runProgram([...program], 2).output[0]).toBe(1);
  });

  test('jump, using immediate mode', () => {
    const program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];

    expect(runProgram([...program], 0).output[0]).toBe(0);
    expect(runProgram([...program], 2).output[0]).toBe(1);
  });

  test.only('larger example', () => {
    const program = [
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    ];

    // expect(runProgram([...program], 7).output[0]).toBe(999);
    expect(runProgram([...program], 8).output[0]).toBe(1000);
    expect(runProgram([...program], 9).output[0]).toBe(1001);
  });

});
