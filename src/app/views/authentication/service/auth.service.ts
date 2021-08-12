import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInfo } from '../user-info.model';
import { Observable } from 'rxjs';
import { LoginInfo } from '../login-info.model';
import { JwtResponse } from '../jwt-response.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  readonly rootUrl = environment.apiUrl + 'auth';

  constructor(private http: HttpClient) {}

  login(loginInfo: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.rootUrl + '/login', JSON.stringify(loginInfo), httpOptions);
  }
}
