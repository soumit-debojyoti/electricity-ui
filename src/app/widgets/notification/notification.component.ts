import { Component, OnInit, Inject } from '@angular/core';
import { AdminApprovalNotificationResponse, WithdrawalWallet } from 'src/app/models/admin-approval-notification-response.model';
import { addDeductWalletModel, AdminWalletAddDeductApprovalNotificationResponse } from 'src/app/models/admin-wallet-add-notification.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service/common.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { DataService } from 'src/app/services/data.service/data.service';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public isLogin: boolean = false;
  public withdrawalnotificationcount: number = 0;
  public addwalletnotificationcount: number = 0;
  public withdrawal_detail_messages: Array<WithdrawalWallet> = [];
  public add_wallet_detail_messages: Array<addDeductWalletModel> = [];
  constructor(private router: Router, private common: CommonService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      if (this.storage.get('login_user') != undefined) {
        this.isLogin = true;
        this.getWithdrawalNotification(this.storage.get('user_id'));
        this.getAddDeductWalletNotification(this.storage.get('user_id'));
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

  private getAddDeductWalletNotification(userId: number): void {
    this.common.adminWalletAddDeductApprovalNotification(userId)
      .subscribe((event: AdminWalletAddDeductApprovalNotificationResponse) => {
        if (event != undefined)
          if (event.message == 'success') {
            this.addwalletnotificationcount = event.addRequestCount;
            this.add_wallet_detail_messages = event.addDeductWalletModels;
          }
      });
  }

  public gotoWalletApproval(): void {
    this.router.navigate(['/wallet-withdrawal-approval']);
  }

  public gotoWalletAddDeduct(): void {
    this.router.navigate(['/wallet-add-deduct-approval']);
  }


}
