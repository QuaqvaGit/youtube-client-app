import { TestBed } from '@angular/core/testing';

import LoginService from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can login with credentials', () => {
    service.login('login', 'password');
    service.loggedIn.subscribe((isLoggedIn) => expect(isLoggedIn).toBe(true));
  });

  it('saves user data in instance', () => {
    expect(service.userName).toBe('login');
  });

  it('saves user data in localstorage', () => {
    expect(localStorage.getItem('youtube-client:auth-token')).toBeTruthy();
  });

  it('can logout', () => {
    service.logout();
    expect(service.userName).toBeFalsy();
    expect(localStorage.getItem('youtube-client:auth-token')).toBeFalsy();
  });
});
