import { executeIntcode } from './intcode-runner';


describe('executeIntcode', () => {
  test('runs correctly', () => {
    const input1 = [1,9,10,3,2,3,11,0,99,30,40,50];
    const output1 = [3500,9,10,70,2,3,11,0,99,30,40,50];

    expect(executeIntcode(input1)).toEqual(output1);
  });
});
