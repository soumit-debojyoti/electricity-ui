import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { TokenParams } from '../Classes/TokenParam';
import { AuthService } from '../services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLogin: boolean = true;
  public islog: boolean = false;
  public isRegis: boolean = false;
  public errorMsg;
  public isLoggedIn: boolean;
  public introducer_code: string;
  constructor(private auth: AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }

  ngOnInit() {
  }

  public isRegister(): void {
    this.isLogin = false;
    this.islog = false;
    this.isRegis = true;
  }
  public isLog_in(): void {
    this.isLogin = true;
    this.islog = true;
    this.isRegis = false;
  }


  public login($event, username: any, password: any): void {
    debugger;
    this.islog = true;
    this.auth.login(username.value, password.value)
      .subscribe((res) => {
        debugger;


        this.storage.set("access_token", res.access_token);
        //alert("Login success....");
        this.router.navigate(['/dashboard']);
      },
        error => {
          debugger;
          this.errorMsg = error;
          console.log("We got error", error.message);
          console.log("Error type", error.stack);

        }, _ => {

        });
  }

  public register(token: any): void {
    debugger;
    this.introducer_code = token.value;
    this.auth.register(token.value)
      .subscribe((response: boolean) => {
        debugger;
        if (response) {
          this.storage.set("introducer_code", this.introducer_code);
          this.router.navigateByUrl('/register');
        }
        else {
          alert("Token is not valid........");
        }
      });



  }





}




