import { executeIntcode } from './intcode-runner';


describe('executeIntcode', () => {
  test('runs correctly', () => {
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

    expect(executeIntcode(input1)).toEqual(output1);
    expect(executeIntcode(input2)).toEqual(output2);
    expect(executeIntcode(input3)).toEqual(output3);
    expect(executeIntcode(input4)).toEqual(output4);
    expect(executeIntcode(input5)).toEqual(output5);
  });
});
