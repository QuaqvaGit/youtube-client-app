import { Injectable } from '@angular/core';
// idk why it gives error, the library is listed in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export default class LoginService {
  private static TOKEN_STORAGE_KEY = 'youtube-client:auth-token';

  private static CYPHER_KEY = 'ergergerga';

  private user: UserData | null;

  public get loggedIn(): boolean {
    return this.user !== null;
  }

  constructor() { 
    this.user = JSON.parse(localStorage.getItem(CryptoJS.AES.decrypt(LoginService.TOKEN_STORAGE_KEY, LoginService.CYPHER_KEY).toString()) || 'null');
  }

  login(login: string, password: string): void {
    this.user = { login, password };
    localStorage.setItem(LoginService.TOKEN_STORAGE_KEY, CryptoJS.AES.encrypt(JSON.stringify(this.user), LoginService.CYPHER_KEY).toString());
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem(LoginService.TOKEN_STORAGE_KEY);
  }
}
