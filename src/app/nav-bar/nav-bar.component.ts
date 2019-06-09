import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service/data.service';
import { AuthService } from '../services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { AdminApprovalNotificationResponse, WithdrawalWallet } from '../models/admin-approval-notification-response.model';
import { Router } from '@angular/router';
import { AdminWalletAddApprovalNotificationResponse, AddWallet } from '../models/admin-wallet-add-notification.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLogin: boolean = false;
  public withdrawalnotificationcount: number = 0;
  public addwalletnotificationcount: number = 0;
  public withdrawal_detail_messages: Array<WithdrawalWallet> = [];
  public add_wallet_detail_messages: Array<AddWallet> = [];
  constructor(private router: Router, private common: CommonService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      if (this.storage.get('login_user') != undefined) {
        this.isLogin = true;
        this.getWithdrawalNotification(this.storage.get('user_id'));
        this.getAddWalletNotification(this.storage.get('user_id'));
      }
      else {
        this.isLogin = false;
      }
    });
  }


  logout() {
    this.isLogin = false;
    this.auth.logout();
  }

  private getWithdrawalNotification(userId: number): void {
    this.common.adminWalletWithdrawalApprovalNotification(userId)
      .subscribe((event: AdminApprovalNotificationResponse) => {
        if (event != undefined)
          if (event.message == 'success') {
            this.withdrawalnotificationcount = event.withdrawalRequestCount;
            this.withdrawal_detail_messages = event.withdrawalWalletModels;
          }
      });
  }

  private getAddWalletNotification(userId: number): void {
    this.common.adminWalletAddApprovalNotification(userId)
      .subscribe((event: AdminWalletAddApprovalNotificationResponse) => {
        if (event != undefined)
          if (event.message == 'success') {
            this.addwalletnotificationcount = event.addRequestCount;
            this.add_wallet_detail_messages = event.addWalletModels;
          }
      });
  }

  public gotoWalletApproval(): void {
    this.router.navigate(['/wallet-approval']);
  }

  public gotoWalletAdd(): void {
    this.router.navigate(['/wallet-add']);
  }

}
