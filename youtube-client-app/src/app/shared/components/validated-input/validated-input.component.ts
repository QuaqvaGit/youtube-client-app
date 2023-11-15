import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import ValidationMessagePipe from '../../pipes/validation-message.pipe';

@Component({
  selector: 'app-validated-input',
  templateUrl: './validated-input.component.html',
  styleUrls: ['./validated-input.component.scss']
})
export default class ValidatedInputComponent implements OnInit {
  @Input({ required: true }) name!: string;

  @Input() type = 'text';

  @Input({ required: true }) inputControl!: AbstractControl;

  @Input({ required: true }) validationMessagePipe!: ValidationMessagePipe;

  public isRequired = false;

  public control!: FormControl;

  ngOnInit(): void {
    this.control = this.inputControl as FormControl;
    this.isRequired = this.inputControl.hasValidator(Validators.required);
  }
}
