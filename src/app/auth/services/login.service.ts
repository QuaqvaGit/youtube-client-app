import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// idk why it gives error, the library is listed in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export default class LoginService {
  private static TOKEN_STORAGE_KEY = 'youtube-client:auth-token';

  private static CYPHER_KEY = 'ergergerga';

  private user: UserData | null = null;

  public get userName(): string | null {
    return this.user?.login || null;
  }

  public get loggedIn(): Observable<boolean> {
    return new BehaviorSubject<boolean>(this.user !== null).asObservable();
  }

  constructor() {
    const encryptedJson = localStorage.getItem(LoginService.TOKEN_STORAGE_KEY);
    if (!encryptedJson) this.user = null;
    else {
      const userJson = CryptoJS.AES.decrypt(
        encryptedJson,
        LoginService.CYPHER_KEY,
      ).toString(CryptoJS.enc.Utf8);
      this.user = JSON.parse(userJson);
    }
  }

  login(login: string, password: string): void {
    this.user = { login, password };
    const cipher = CryptoJS.AES.encrypt(
      JSON.stringify(this.user),
      LoginService.CYPHER_KEY,
    );
    localStorage.setItem(LoginService.TOKEN_STORAGE_KEY, cipher.toString());
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem(LoginService.TOKEN_STORAGE_KEY);
  }
}
