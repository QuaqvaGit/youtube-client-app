import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import LoginService from 'src/app/auth/services/login.service';
import HeaderComponent from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login button if not authorized', () => {
    expect(
      fixture.nativeElement.querySelector('.header__not-logged-in'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.header__account-info'),
    ).toBeFalsy();
  });

  it('should render account info if authorized', () => {
    loginService.login('bla bla', 'password');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.header__account-info'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.header__not-logged-in'),
    ).toBeFalsy();
  });
});
