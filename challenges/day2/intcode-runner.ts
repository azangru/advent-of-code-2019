export const executeIntcode = (input: number[]) => {
  const instructions = parseInstructions(input, []);
  console.log('instructions', instructions);
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

const readInstruction(instuction: number[], input: number[]) => {
  const operation = instuction[0];
}
