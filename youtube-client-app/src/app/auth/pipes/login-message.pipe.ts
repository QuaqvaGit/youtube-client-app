/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import ValidationMessagePipe from 'src/app/shared/pipes/validation-message.pipe';

@Pipe({
  name: 'loginValidationMessage',
})
export default class LoginValidationMessagePipe
  extends ValidationMessagePipe
  implements PipeTransform
{
  override getErrorMessage(errors: ValidationErrors): string {
    if (errors['required']) return 'Please enter a login email';
    return 'Your email is invalid';
  }
}
