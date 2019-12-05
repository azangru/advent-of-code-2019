import { isValidPassword, isValidPassword2 } from './password-checker';

describe('isValidPassword', () => {

  test('111111 is valid', () => {
    expect(isValidPassword('111111')).toBe(true);
  });

  test('223450 is invalid', () => {
    // contains descending digits sequence "50"
    expect(isValidPassword('223450')).toBe(false);
  });

  test('123789 is invalid', () => {
    // does not have at least one doublet
    expect(isValidPassword('123789')).toBe(false);
  });

});

describe('isValidPassword2', () => {

  test('112233 is valid', () => {
    expect(isValidPassword2('112233')).toBe(true);
  });

  test('123444 is invalid', () => {
    expect(isValidPassword2('123444')).toBe(false);
  });

  test('111122 is valid', () => {
    // although number 1 repeats more than two times in a row, number 2 is a strict duplicate
    expect(isValidPassword2('111122')).toBe(true);
  });

});
