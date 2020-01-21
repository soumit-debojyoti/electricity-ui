import { Component, OnInit, Inject } from '@angular/core';
// import { Message, ChannelNameEnum } from '../store/models/message.model';
import { DataService } from '../services/data.service/data.service';
import { User } from '../models/user.model';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { ProfileService } from '../widgets/profile/profile.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service/common.service';
import { AuthService } from '../services/auth.service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isLogin: boolean;
  public isEmployee: boolean;
  public isAdmin: boolean;
  public isSuperAdmin: boolean;
  public isUser: boolean;
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public city: string;
  public state_name: string;
  public dob: string;
  public sex: string;
  public role: string;
  public name: string;
  public photo: string;
  public loggedInUserRoleID: number;
  public withdrawalnotificationcount: number;
  public addwalletnotificationcount: number;
  public selectedComponetForActionArea: string;
  constructor(private profileService: ProfileService,
    private data: DataService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private loadingScreenService: LoadingScreenService, private router: Router, private common: CommonService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.isLogin = false;
    this.isEmployee = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.isUser = false;
    this.GetUserRoleInformaion();
    this.loggedInUserRoleID = this.storage.get('role_id');
    this.selectedComponetForActionArea = 'RECHARGE';
    this.isLogin = false;
    this.data.currentMessage.subscribe(message => {
      if (message === 'login-done') {
        const is_login = this.storage.get('is_login');
        this.isLogin = is_login;
      } else if (message === 'default message') {
        this.logout();
      }
    });
    this.isLogin = false;
    this.withdrawalnotificationcount = 0;
    this.addwalletnotificationcount = 0;
    this.loadingScreenService.startLoading();
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      if (this.storage === undefined) {
        this.isLogin = false;
      } else if (typeof (this.storage.get('login_user')) === 'string') {
        this.isLogin = true;
        // this.getWithdrawalNotification(this.storage.get('user_id'));
        // this.getAddDeductWalletNotification(this.storage.get('user_id'));
      } else {
        this.isLogin = false;
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }

  logout() {
    this.isLogin = false;
    this.storage.set('is_login', false);
    this.auth.logout();
  }

  private GetUserRoleInformaion(): void {
    this.name = this.storage.get('login_user');
    this.loadingScreenService.startLoading();
    this.profileService.GetUser(this.name)
      .subscribe((response: User) => {
        this.loadingScreenService.stopLoading();
        this.role = response.role_name;
        if (this.role === 'employee') {
          this.isEmployee = true;
        } else {
          if (this.role === 'super admin') {
            this.isSuperAdmin = true;
          } else if (this.role === 'admin') {
            this.isAdmin = true;
          } else if (this.role === 'user') {
            this.isUser = true;
          } else {
            this.isSuperAdmin = false;
            this.isEmployee = false;
            this.isAdmin = false;
            this.isUser = false;
          }
        }
        this.storage.set('username', response.first_name + ' ' + response.last_name);
        this.storage.set('mobileno', response.mobile_number);
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  getComponentSelected(name): void {
    this.selectedComponetForActionArea = name;
  }

  getPageAccessInfo(): void {
    this.loadingScreenService.startLoading();
    this.common.fetchPageAccess().subscribe( response => {
    this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
    });
  }
}
