import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import ValidatedInputComponent from './validated-input.component';
import GenericValidationMessagePipe from '../../pipes/generic-validation-message.pipe';

describe('ValidatedInputComponent', () => {
  let component: ValidatedInputComponent;
  let fixture: ComponentFixture<ValidatedInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ValidatedInputComponent],
    });
    fixture = TestBed.createComponent(ValidatedInputComponent);
    component = fixture.componentInstance;
    component.inputControl = new FormControl();
    component.inputControl.setValidators([Validators.minLength(5)]);
    component.validationMessagePipe = new GenericValidationMessagePipe();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('generates input with specified type', () => {
    expect(
      fixture.nativeElement.querySelector(`input[type="${component.type}"]`),
    ).toBeTruthy();
  });

  it('adds validation message if value is not valid', () => {
    component.inputControl.setValue('not5');
    component.inputControl.updateValueAndValidity();
    fixture.detectChanges();
    setTimeout(() => {
      expect(
        fixture.nativeElement.querySelector('.input-validation-message')
          .textContent,
      ).toBeTruthy();
    });
  });
});
