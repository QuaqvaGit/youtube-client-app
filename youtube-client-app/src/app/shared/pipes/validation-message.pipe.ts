import { PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

export default abstract class ValidationMessagePipe implements PipeTransform {
    transform(errors: ValidationErrors | null, isDirty: boolean): string {
      if (!errors || !isDirty) return '';
      return this.getErrorMessage(errors);
    }

    abstract getErrorMessage(errors: ValidationErrors): string;
}