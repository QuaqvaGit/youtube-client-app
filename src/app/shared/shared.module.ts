import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import ButtonComponent from './components/button/button.component';
import ValidatedInputComponent from './components/validated-input/validated-input.component';
import FormComponent from './components/form/form.component';

@NgModule({
  declarations: [ValidatedInputComponent, FormComponent],
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  exports: [ButtonComponent, FormComponent, ValidatedInputComponent],
})
export default class SharedModule {}
