export const findValidPasswords = (lowerLimit: number, upperLimit: number, test: (x: string) => boolean) => {
  const validPasswords = [];
  for (let n = lowerLimit; n <= upperLimit; n++) {
    const password = n.toString();
    if (test(password)) {
      validPasswords.push(password);
    }
  }

  return validPasswords.length;
};
