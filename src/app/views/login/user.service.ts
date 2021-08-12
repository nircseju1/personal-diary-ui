import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  formData: User;
  readonly rootUrl = 'http://localhost:3000/users/authenticate';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  authenticate(formData: User): Observable<User> {
    return this.http.post<User>(this.rootUrl, JSON.stringify(formData), this.httpOptions);
  }

}
