import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { AdminApprovalNotificationResponse, WithdrawalWallet } from 'src/app/models/admin-approval-notification-response.model';
import { CommonService } from 'src/app/services/common.service/common.service';
import { DataService } from 'src/app/services/data.service/data.service';

@Component({
  selector: 'app-wallet-withdrawal-approval',
  templateUrl: './wallet-withdrawal-approval.component.html',
  styleUrls: ['./wallet-withdrawal-approval.component.css']
})
export class WalletWithdrawalApprovalComponent implements OnInit {
  public withdrawalnotificationcount: number;
  public withdrawal_detail_messages: Array<WithdrawalWallet> = [];
  constructor(private auth: AuthService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router, private common: CommonService, private data: DataService,
    private loadingScreenService: LoadingScreenService) { }



  ngOnInit() {
    this.withdrawalnotificationcount = 0;
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      if (this.storage === undefined) {
      } else if (typeof (this.storage.get('login_user')) === 'string') {
        this.getWithdrawalNotification(this.storage.get('user_id'));
      } else {
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }

  public walletwithdrawalapprovalpage(): void {
    this.router.navigate(['/wallet-withdrawal-approval']);
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
}
