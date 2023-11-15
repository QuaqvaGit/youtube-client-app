import { AbstractControl, ValidatorFn } from "@angular/forms";

const passwordValidator: ValidatorFn = (control: AbstractControl) => {
  const {value} = control;

  const isEightChars = value.length >= 8;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);

  const hasLetters = /[a-zA-Z]/.test(value);
  const hasNumbers = /\d/.test(value);

  const hasSpecialChars = /\W/.test(value);

  if (isEightChars && hasUpperCase && hasLowerCase && hasLetters && hasNumbers && hasSpecialChars) return null;
  return {
    noEightChars: !isEightChars,
    noUpperCase: !hasUpperCase,
    noLowerCase: !hasLowerCase,
    noLetters: !hasLetters,
    noNumbers: !hasNumbers,
    noSpecialChars: !hasSpecialChars
  }
};

export default passwordValidator;