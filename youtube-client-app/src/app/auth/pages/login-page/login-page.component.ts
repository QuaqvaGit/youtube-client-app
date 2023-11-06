import { Component } from '@angular/core';
import { Router } from '@angular/router';
import LoginService from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export default class LoginPageComponent {
  login = '';

  password = '';

  constructor(private router: Router, private service: LoginService) {}

  onLogin(): void {
    this.service.login(this.login, this.password);
    this.router.navigate(['../']);
  }
}
