import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user; // local copy of user from Localstorage

  private LOGIN_URL = 'http://localhost:3030/authentication';
  private REGISTRATION_URL = 'http://localhost:3030/users/';

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  login(user) {
    return this.httpClient.post(this.LOGIN_URL, user);
  }

  register(user) {
    return this.httpClient.post(this.REGISTRATION_URL, user);
  }

  getUser() {
    if (this._user) {
      return this._user;
    } else {
      this._user = JSON.parse(localStorage.getItem('user'));
      return this._user;
    }
  }

  public setUser(user) {
    this._user = user;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

}
