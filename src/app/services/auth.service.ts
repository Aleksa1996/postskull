import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { BackendUrl } from './backendUrl';

import { LoginModel } from '../components/auth/login/login.model';
import { TokenModel } from '../components/auth/token.model';

@Injectable()
export class AuthService {
  public token: TokenModel = null;
  private logoutTimer;

  constructor(private httpClient: HttpClient, private router: Router) {
    let lsToken = JSON.parse(localStorage.getItem('jwtAuth'));
    if (lsToken != null) {
      let expires = new Date(lsToken.expires_in_date);
      if (expires.getTime() > new Date().getTime()) {
        lsToken.expires_in = (expires.getTime() - new Date().getTime()) / 1000;
        this.setToken(lsToken);
        this.login();
      } else {
        this.logout();
      }
    }
  }

  get isAuthenticated() {
    return this.token != null;
  }

  isInRole(role: string): boolean {
    if (this.isAuthenticated) {
      return this.token.role === role;
    }
    return false;
  }

  attempt(data: LoginModel) {
    return this.httpClient
      .post<TokenModel>(`${BackendUrl.AuthUrl}/login`, data)
      .toPromise()
      .then(token => {
        this.setToken(token);
        this.login();
        this.router.navigate(['/']);
      });
  }

  register(data) {
    return this.httpClient
      .post<TokenModel>(`${BackendUrl.AuthUrl}/register`, data)
      .toPromise()
      .then(token => {
        this.setToken(token);
        this.login();
        this.router.navigate(['/']);
      });
  }

  login() {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, this.token.expires_in * 1000);
  }

  logout() {
    this.httpClient.post(`${BackendUrl.AuthUrl}/logout`, {}).subscribe(res => {});
    this.unsetToken();
    clearTimeout(this.logoutTimer);

    this.router.navigate(['/login']);
  }

  setToken(token: TokenModel) {
    this.token = token;
    localStorage.setItem('jwtAuth', JSON.stringify(token));
  }

  unsetToken() {
    this.token = null;
    localStorage.removeItem('jwtAuth');
  }
}
