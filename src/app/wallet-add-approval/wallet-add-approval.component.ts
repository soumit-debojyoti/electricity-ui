import { Component, OnInit, Inject } from '@angular/core';
import { AddWallet, AdminWalletAddApprovalNotificationResponse } from '../models/admin-wallet-add-notification.model';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service/common.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataService } from '../services/data.service/data.service';
import { AuthService } from '../services/auth.service/auth.service';

@Component({
  selector: 'app-wallet-add-approval',
  templateUrl: './wallet-add-approval.component.html',
  styleUrls: ['./wallet-add-approval.component.css']
})
export class WalletAddApprovalComponent implements OnInit {
  public notificationcount: number = 0;
  public detail_messages: Array<AddWallet> = [];
  constructor(private router: Router, private common: CommonService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private auth: AuthService) { }


  ngOnInit() {
    this.getNotification(this.storage.get('user_id'));
  }

  private getNotification(userId: number): void {
    debugger;
    this.common.adminWalletAddApprovalNotification(userId)
      .subscribe((event: AdminWalletAddApprovalNotificationResponse) => {
        debugger;
        if (event != undefined)
          if (event.message == 'success') {
            this.notificationcount = event.addRequestCount;
            this.detail_messages = event.addWalletModels;
            this.detail_messages.map(item => {
              item.approved = false;
            });
          }
      });
  }

  public onChange(detail_message: AddWallet): void {
    debugger;

    detail_message.approved = !detail_message.approved;
    if (!detail_message.approved) {
      detail_message.admin_comment = '';
    } else {
      detail_message.rejected = false;
    }
  }

  public onChangeReject(detail_message: AddWallet): void {
    debugger;

    detail_message.rejected = !detail_message.rejected;
    if (!detail_message.rejected) {


    } else {
      detail_message.approved = false;
      detail_message.admin_comment = '';
    }
  }

  public submit(): void {
    debugger;
    var data: AddWallet[] = [];

    this.detail_messages.forEach((item: AddWallet) => {
      var itemObject: AddWallet = {
        addwalletid: item.addwalletid,
        firstname: item.firstname,
        middlename: item.middlename,
        lastname: item.lastname,
        comment: item.comment,
        approved: item.approved,
        rejected: item.rejected,
        admin_comment: (!item.admin_comment) ? '' : item.admin_comment,
        request_initiator_id: item.request_initiator_id,
        wallet_balance: item.wallet_balance
      };
      if (item.approved || item.rejected) {
        data.push(itemObject);
      }

    });

    this.common.adminWalletAddApproval(data)
      .subscribe((event: Array<AddWallet>) => {
        debugger;
        alert('Add wallet approver request has been successfully placed.');
        this.router.navigate(['/login']);
        // data.forEach((item: WithdrawalWallet) => {
        //   debugger;
        //   if (item.approved == true) {
        //     this.common.addWalletTransaction(item.wallet_balance, item.request_initiator_id, `${item.wallet_balance} amount withdrawal approved.`, 'credit');
        //   }

        // });
        // if (event != undefined)
        //   if (event.message == 'success') {
        //     this.notificationcount = event.withdrawalRequestCount;
        //     this.detail_messages = event.withdrawalWalletModels;
        //     this.detail_messages.map(item => {
        //       item.approved = false;
        //       //item.admin_comment = '';
        //     });
        //   }
      });
    //});

  }

  public IsDisabled(item: AddWallet): boolean {
    if (item.approved) {
      return false;
    } else if (item.rejected) {
      return false;
    } else {
      return true;
    }

  }
}
