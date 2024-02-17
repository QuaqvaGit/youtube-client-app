import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import LoginService from '../../services/login.service';
import passwordValidator from '../../validators/password-validator';

import LoginValidationMessagePipe from '../../pipes/login-message.pipe';
import PasswordValidationMessagePipe from '../../pipes/password-validation-message.pipe';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export default class LoginPageComponent {
  form = this.formBuilder.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator]],
  });

  controlNames = ['login', 'password'];

  controlPipes = [
    new LoginValidationMessagePipe(),
    new PasswordValidationMessagePipe(),
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService,
  ) {}

  onLogin(): void {
    const { login, password } = this.form.value;
    this.service.login(login || '', password || '');
    this.router.navigate(['../']);
  }
}
