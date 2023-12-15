import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    component.validationMessagePipe = new GenericValidationMessagePipe();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
