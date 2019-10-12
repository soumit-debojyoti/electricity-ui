import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service/data.service';
import { AuthService } from '../services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { AdminApprovalNotificationResponse, WithdrawalWallet } from '../models/admin-approval-notification-response.model';
import { Router } from '@angular/router';
import { AdminWalletAddDeductApprovalNotificationResponse, AddDeductWalletModel } from '../models/admin-wallet-add-notification.model';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLogin: boolean;
  public withdrawalnotificationcount: number;
  public addwalletnotificationcount: number;
  public withdrawal_detail_messages: Array<WithdrawalWallet> = [];
  public add_wallet_detail_messages: Array<AddDeductWalletModel> = [];
  constructor(private router: Router, private common: CommonService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private auth: AuthService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
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

  private getWithdrawalNotification(userId: number): void {
    this.loadingScreenService.startLoading();
    this.common.adminWalletWithdrawalApprovalNotification(userId)
      .subscribe((event: AdminApprovalNotificationResponse) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success') {
            this.withdrawalnotificationcount = event.withdrawalRequestCount;
            this.withdrawal_detail_messages = event.withdrawalWalletModels;
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public gotoProfile() {
    this.router.navigate(['/profile']);
  }

  private getAddDeductWalletNotification(userId: number): void {
    this.loadingScreenService.startLoading();
    this.common.adminWalletAddDeductApprovalNotification(userId)
      .subscribe((event: AdminWalletAddDeductApprovalNotificationResponse) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success') {
            this.addwalletnotificationcount = event.addRequestCount;
            this.add_wallet_detail_messages = event.addDeductWalletModels;
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public gotoWalletApproval(): void {
    this.router.navigate(['/wallet-withdrawal-approval']);
  }

  public gotoWalletAddDeduct(): void {
    this.router.navigate(['/wallet-add-deduct-approval']);
  }

}
