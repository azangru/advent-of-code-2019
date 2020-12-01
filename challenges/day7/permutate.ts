export const permutate = <T>(items: T[]): T[][] => {
  if (!items.length || items.length === 1) {
    return [items];
  }

  const permutations = [];

  const [firstItem, ...rest] = items;

  const remainingPermutations = permutate(rest);

  for (let permutation of remainingPermutations) {
    for (let i = 0; i <= permutation.length; i++) {
      const newPermutation = permutation.slice(0,i).concat([firstItem]).concat(permutation.slice(i));
      permutations.push(newPermutation);
    }
  }

  return permutations;
}
