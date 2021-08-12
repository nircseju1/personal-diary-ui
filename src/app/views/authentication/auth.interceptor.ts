import { Injectable } from '@angular/core';
import {JwtTokenStorageService} from "./service/jwt-token-storage.service";
import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: JwtTokenStorageService, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    let authReq = req;
    const token = this.token.getToken();
    const currentUser = this.token.getUsername();
    const isLoggedIn = currentUser && token;

    if (isLoggedIn ) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    } else {
      throwError('');
    }

    return next.handle(authReq)
      .pipe(catchError(err => {
        console.log(err);
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.token.signOut();
        }

        // const errorMessage = this.getServerErrorMessage(err.error);
        // this.toastr.error(errorMessage);
        return throwError(err.error);
      }));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      case 400: {
        return `Validation: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
