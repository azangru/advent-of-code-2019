import { isValidPassword, isValidPassword2 } from './password-checker';
import { findValidPasswords } from './find-passwords';

const lowerLimit = 156218;
const upperLimit = 652527;

// console.log(findValidPasswords(lowerLimit, upperLimit, isValidPassword));
console.log(findValidPasswords(lowerLimit, upperLimit, isValidPassword2));
