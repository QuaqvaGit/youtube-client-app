import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import LoginPageComponent from './pages/login-page/login-page.component';
import AuthRoutingModule from './auth-routing.module';

import LoginMessagePipe from './pipes/login-message.pipe';
import PasswordValidationMessagePipe from './pipes/password-validation-message.pipe';
import SharedModule from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginMessagePipe,
    PasswordValidationMessagePipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent],
})
export default class AuthModule {}
