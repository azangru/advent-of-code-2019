import { parseInput } from './parser';
import { buildTree, countAllOrbits, findNumberOfOrbitalTransfers } from './tree';


describe('countAllOrbits', () => {

  const example = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L'
  ];

  it('counts all direct and indirect orbits', () => {
    const tree = buildTree(parseInput(example));
    expect(countAllOrbits(tree)).toBe(42);
  });

});

describe('findNumberOfOrbitalTransfers', () => {

  const example = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
    'K)YOU',
    'I)SAN'
  ];

  it('finds the distance between parents of YOU and SAN nodes', () => {
    const tree = buildTree(parseInput(example));
    expect(findNumberOfOrbitalTransfers(tree)).toBe(4);
  });
});
