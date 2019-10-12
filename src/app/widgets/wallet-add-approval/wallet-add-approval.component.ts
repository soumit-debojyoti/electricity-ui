import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AddDeductWalletModel, AdminWalletAddDeductApprovalNotificationResponse } from 'src/app/models/admin-wallet-add-notification.model';
import { CommonService } from 'src/app/services/common.service/common.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { DataService } from 'src/app/services/data.service/data.service';

@Component({
  selector: 'app-wallet-add-approval',
  templateUrl: './wallet-add-approval.component.html',
  styleUrls: ['./wallet-add-approval.component.css']
})
export class WalletAddApprovalComponent implements OnInit {
  public addwalletnotificationcount: number;
  public add_wallet_detail_messages: Array<AddDeductWalletModel> = [];
  constructor(private auth: AuthService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router, private common: CommonService,
    private data: DataService, private loadingScreenService: LoadingScreenService) { }



  ngOnInit() {
    this.addwalletnotificationcount = 0;
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      if (this.storage === undefined) {
      } else if (typeof (this.storage.get('login_user')) === 'string') {
        this.getAddDeductWalletNotification(this.storage.get('user_id'));
      } else {
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

  public walletaddapprovalpage(): void {
    this.router.navigate(['/wallet-add-deduct-approval']);
  }

}
