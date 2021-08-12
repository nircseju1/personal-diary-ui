import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../authentication/service/auth.service";
import {JwtTokenStorageService} from "../authentication/service/jwt-token-storage.service";
import {Router} from "@angular/router";
import {LoginInfo} from "../authentication/login-info.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loginInfo: LoginInfo;

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: JwtTokenStorageService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }

    this.loginForm = this.fromBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    });
  }

  get frm() { return this.loginForm.controls; }

  onSubmitLoginInfo() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginInfo = this.loginForm.getRawValue();
    this.authService.login(this.loginInfo).subscribe(
      data => {
        console.log(data);
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUsername(data.username);
        this.tokenStorageService.saveLoggedUserName(data.name);
        this.tokenStorageService.saveLoggedUserEmail(data.email);
        this.tokenStorageService.saveLoggedUserPhotoName(data.userPhotoName);
        this.tokenStorageService.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getAuthorities();

        this.router.navigate(['/dashboard']);
        return false;
      },
      error => {
        this.toastr.error('Login credentials is not correct. Please check username and password and try again.', 'Login');
        this.isLoginFailed = true;
      }
    );

  }
}
