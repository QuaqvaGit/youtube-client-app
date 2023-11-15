import { AbstractControl, ValidatorFn } from "@angular/forms";

const pastDateValidator: ValidatorFn = (control: AbstractControl) => {
  const date = new Date(control.value);
  const curDate = Date.now();
  return +date <= curDate ? null : { futureDate: true }; 
}

export default pastDateValidator;