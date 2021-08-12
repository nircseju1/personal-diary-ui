import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const NAME_KEY = 'AuthName';
const EMAIL_KEY = 'AuthEmail';
const USER_PHOTO_NAME_KEY = 'AuthUserPhotoName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})

export class JwtTokenStorageService {
  private roles: any = [];
  constructor(private router: Router) { }

  signOut() {
    window.localStorage.clear();
    this.router.navigate(['/login'],
      {
        queryParamsHandling: 'merge'
      }
    );
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveLoggedUserName(name: string) {
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY, name);
  }

  public getLoggedUserName(): string {
    return localStorage.getItem(NAME_KEY);
  }

  public saveLoggedUserEmail(email: string) {
    window.localStorage.removeItem(EMAIL_KEY);
    window.localStorage.setItem(EMAIL_KEY, email);
  }

  public getLoggedUserEmail(): string {
    return localStorage.getItem(EMAIL_KEY);
  }

  public saveLoggedUserPhotoName(userPhotoName: string) {
    window.localStorage.removeItem(USER_PHOTO_NAME_KEY);
    window.localStorage.setItem(USER_PHOTO_NAME_KEY, userPhotoName);
  }

  public getLoggedUserPhotoName() {
    return localStorage.getItem(USER_PHOTO_NAME_KEY);
  }


  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
