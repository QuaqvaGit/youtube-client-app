/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import ValidationMessagePipe from 'src/app/shared/pipes/validation-message.pipe';

@Pipe({
  name: 'passwordValidationMessage'
})
export default class PasswordValidationMessagePipe extends ValidationMessagePipe implements PipeTransform {
  override getErrorMessage(errors: ValidationErrors): string {
    if (errors['required']) return 'Please enter a password';
    let message;
    switch(true) {
      case errors['noEightChars']:
        message = 'eight characters';
        break;
      case errors['noLetters']:
        message = 'one letter';
        break;
      case errors['noUpperCase']:
        message = 'one uppercase letter';
        break;
      case errors['noLowerCase']:
        message = 'one lowercase letter';
        break;
      case errors['noNumbers']:
        message = 'one digit';
        break;
      default:
        message = 'one special character';
        break;
    }
    return `Your password is not strong enough. It should have at least ${message}`;
  }

}
