import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import LoginPageComponent from './pages/login-page/login-page.component';
import AuthRoutingModule from './auth-routing.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  exports: [LoginPageComponent],
})
export default class AuthModule {}
