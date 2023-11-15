import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import ValidationMessagePipe from './validation-message.pipe';

@Pipe({
  name: 'genericValidationMessage'
})

export default class GenericValidationMessagePipe extends ValidationMessagePipe implements PipeTransform {
  public inputName = '';

  override getErrorMessage(errors: ValidationErrors): string {
    let message;
    switch(true) {
      case errors['required']:
        message = `Please enter a ${this.inputName}`;
        break;
      case Boolean(errors['maxlength']):
        message = `${this.inputName} is too long`;
        break;
      case Boolean(errors['minlength']):
        message = `${this.inputName} is too short`;
        break;
      default:
        message = `${this.inputName} is not valid`;
        break;
    }
    return message;
  }
}
