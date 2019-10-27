import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service/common.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AdminApprovalNotificationResponse, WithdrawalWallet } from '../models/admin-approval-notification-response.model';
import { DataService } from '../services/data.service/data.service';
import { AuthService } from '../services/auth.service/auth.service';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-wallet-approval',
  templateUrl: './wallet-withdrawal-approval.component.html',
  styleUrls: ['./wallet-withdrawal-approval.component.css']
})
export class WalletWithdrawalApprovalComponent implements OnInit {
  public notificationcount: number;
  public detail_messages: Array<WithdrawalWallet> = [];
  constructor(private router: Router, private common: CommonService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService,
    private auth: AuthService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService) { }


  ngOnInit() {
    this.notificationcount = 0;
    this.getNotification(this.storage.get('user_id'));
  }

  private getNotification(userId: number): void {
    this.loadingScreenService.startLoading();
    this.common.adminWalletWithdrawalApprovalNotification(userId)
      .subscribe((event: AdminApprovalNotificationResponse) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success') {
            this.notificationcount = event.withdrawalRequestCount;
            this.detail_messages = event.withdrawalWalletModels;
            this.detail_messages.map(item => {
              item.approved = false;
            });
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public onChange(detail_message: WithdrawalWallet): void {

    detail_message.approved = !detail_message.approved;
    if (!detail_message.approved) {
      detail_message.admincomment = '';
    } else {
      detail_message.rejected = false;
    }
  }

  public onChangeReject(detail_message: WithdrawalWallet): void {

    detail_message.rejected = !detail_message.rejected;
    if (!detail_message.rejected) {


    } else {
      detail_message.approved = false;
      detail_message.admincomment = '';
    }
  }

  public submit(): void {
    const data: WithdrawalWallet[] = [];

    this.detail_messages.forEach((item: WithdrawalWallet) => {
      const itemObject: WithdrawalWallet = {
        withdrawalid: item.withdrawalid,
        firstname: item.firstname,
        middlename: item.middlename,
        lastname: item.lastname,
        comment: item.comment,
        approved: item.approved,
        rejected: item.rejected,
        admincomment: (!item.admincomment) ? '' : item.admincomment,
        request_initiator_id: item.request_initiator_id,
        wallet_balance: item.wallet_balance
      };
      if (item.approved || item.rejected) {
        data.push(itemObject);
      }

    });
    this.loadingScreenService.startLoading();
    this.common.adminWalletApproval(data)
      .subscribe((event: Array<WithdrawalWallet>) => {
        this.loadingScreenService.stopLoading();
        this.alertService.confirmationMessage('',
          `Widthdrawal approver request has been successfully placed.`,
          'success', true, false);
        this.router.navigate(['/dashboard']);
      }, () => {
        this.loadingScreenService.stopLoading();
      });
    // });

  }
  public logout() {
    this.storage.set('is_login', false);
    this.auth.logout();
  }

  public IsDisabled(item: WithdrawalWallet): boolean {
    if (item.approved) {
      return false;
    } else if (item.rejected) {
      return false;
    } else {
      return true;
    }

  }
}
