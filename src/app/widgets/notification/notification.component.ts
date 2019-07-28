import { Component, OnInit, Inject } from '@angular/core';
import { AdminApprovalNotificationResponse, WithdrawalWallet } from 'src/app/models/admin-approval-notification-response.model';
import { AddDeductWalletModel, AdminWalletAddDeductApprovalNotificationResponse } from 'src/app/models/admin-wallet-add-notification.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service/common.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { DataService } from 'src/app/services/data.service/data.service';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

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
    this.withdrawalnotificationcount = 0;
    this.addwalletnotificationcount = 0;
    this.loadingScreenService.startLoading();
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      if (this.storage.get('login_user') !== undefined) {
        this.isLogin = true;
        this.getWithdrawalNotification(this.storage.get('user_id'));
        this.getAddDeductWalletNotification(this.storage.get('user_id'));
      } else {
        this.isLogin = false;
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }


  logout() {
    this.isLogin = false;
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
