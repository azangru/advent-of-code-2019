export const isValidPassword = (password: string) => {
  return hasNoDescendingSequence(password) && hasDuplicate(password);
};

export const isValidPassword2 = (password: string) => {
  return hasNoDescendingSequence(password)
    && hasDuplicate(password)
    && hasStrictDuplicate(password);
};

const hasNoDescendingSequence = (password: string) => {
  for (let i = 1; i < password.length; i++) {
    if (password[i] < password[i-1]) {
      return false;
    }
  }
  return true;
};

const hasDuplicate = (password: string) => {
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i-1]) {
      return true;
    }
  }
  return false;
};

// assuming that hasDuplicate has passed
const hasStrictDuplicate = (password: string) => {
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i-1]) {
      // duplicate
      const digit = password[i];
      const regex = new RegExp(`(${digit}+)`);
      const matchLength = (password.match(regex) as RegExpMatchArray)[0].length;
      if (matchLength === 2) {
        return true;
      }
    }
  }
  return false;
};
