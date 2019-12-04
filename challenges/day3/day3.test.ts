import { findNearestManhattanDistance, findFewestCombinedSteps } from './find-intersections';

describe('findNearestManhattanDistance', () => {

  test('example1', () => {
    const instructions1 = 'R8,U5,L5,D3';
    const instructions2 = 'U7,R6,D4,L4';
    expect(findNearestManhattanDistance(instructions1, instructions2)).toBe(6);
  });

  test('example2', () => {
    const instructions1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const instructions2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
    expect(findNearestManhattanDistance(instructions1, instructions2)).toBe(159);
  });

  test('example3', () => {
    const instructions1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    const instructions2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
    expect(findNearestManhattanDistance(instructions1, instructions2)).toBe(135);
  });

});

describe('findFewestCombinedSteps', () => {

  test('example1', () => {
    const instructions1 = 'R8,U5,L5,D3';
    const instructions2 = 'U7,R6,D4,L4';
    expect(findFewestCombinedSteps(instructions1, instructions2)).toBe(30);
  });

  test('example2', () => {
    const instructions1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const instructions2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
    expect(findFewestCombinedSteps(instructions1, instructions2)).toBe(610);
  });

  test('example3', () => {
    const instructions1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    const instructions2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
    expect(findFewestCombinedSteps(instructions1, instructions2)).toBe(410);
  });

});
