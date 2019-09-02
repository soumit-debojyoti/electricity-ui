import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { TokenParams } from '../Classes/TokenParam';
import { AuthService } from '../services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ValidateReferalTokenResponse } from '../models/validatereferaltokenresponse.model';
import { FindUserResponse } from '../models/find-user-response.model';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { SweetAlertType } from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string;
  public isLoginSuccess: boolean;
  public isRegisterSuccess: boolean;
  public isLogin: boolean;
  public islog: boolean;
  public isRegis: boolean;
  public errorMsg;
  public isLoggedIn: boolean;
  public introducer_code: string;
  constructor(private auth: AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.isLogin = true;
    this.islog = false;
    this.isRegis = false;
    this.errorMessage = '';
    this.isLoginSuccess = true;
    this.isRegisterSuccess = true;
    this.auth.logout();
  }

  public isRegister(): void {
    this.isLoginSuccess = true;
    this.isRegisterSuccess = true;
    this.isLogin = false;
    this.islog = false;
    this.isRegis = true;

  }
  public isLog_in(): void {
    this.isLoginSuccess = true;
    this.isRegisterSuccess = true;
    this.isLogin = true;
    this.islog = true;
    this.isRegis = false;

  }


  public login($event, username: any, password: any): void {
    this.islog = true;
    this.loadingScreenService.startLoading();
    this.auth.login(username.value, password.value)
      .subscribe((res: any) => {
        this.loadingScreenService.stopLoading();
        if (res.isLoginSuccess === true) {
          this.isLoginSuccess = true;

          this.storage.set('access_token', res.access_token);
          if (res.message !== '') {
            if (res.isLoginSuccess) {
              let timerInterval;
              Swal.fire({
                title: 'KYC Check!!',
                html: res.message,
                timer: 5000,
                onBeforeOpen: () => {
                  Swal.showLoading();
                  timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft().toString();
                  }, 100);
                },
                onClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {
                if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.timer
                ) {
                  console.log('I was closed by the timer')
                }
              })
            } else {
              this.alertService.confirmationMessage('', res.message, 'success', true, false);
            }

          }

          this.router.navigate(['/dashboard']);
        } else {
          this.isLoginSuccess = false;
          this.errorMessage = res.message;
        }
      },
        error => {
          this.loadingScreenService.stopLoading();
          this.isLoginSuccess = false;
          this.errorMessage = 'Username or password are invalid....';
          console.log('We got error', error.message);
          console.log('Error type', error.stack);

        }, _ => {

        });
  }

  public register(token: any): void {
    this.introducer_code = token.value;
    this.loadingScreenService.startLoading();
    this.auth.register(token.value)
      .subscribe((response: ValidateReferalTokenResponse) => {
        this.loadingScreenService.stopLoading();
        this.isRegisterSuccess = true;
        if (response.is_valid) {
          this.storage.remove('is_employee');
          this.storage.set('introducer_code', this.introducer_code);
          this.storage.set('introducer_name', response.introducer_name);
          this.storage.set('security_token', token.value);
          this.router.navigateByUrl('/register');
        } else {
          this.alertService.confirmationMessage('', 'Token is not valid........', 'error', true, false);
        }
      }, () => {
        this.isRegisterSuccess = false;
        this.loadingScreenService.stopLoading();
      });
  }
}




