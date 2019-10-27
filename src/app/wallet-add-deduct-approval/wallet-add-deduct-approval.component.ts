import { Component, OnInit, Inject } from '@angular/core';
import { AddDeductWalletModel, AdminWalletAddDeductApprovalNotificationResponse } from '../models/admin-wallet-add-notification.model';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service/common.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataService } from '../services/data.service/data.service';
import { AuthService } from '../services/auth.service/auth.service';
import { AlertService } from '../services/common.service/alert.service';
import Swal from 'sweetalert2';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-wallet-add-deduct-approval',
  templateUrl: './wallet-add-deduct-approval.component.html',
  styleUrls: ['./wallet-add-deduct-approval.component.css']
})
export class WalletAddDeductApprovalComponent implements OnInit {
  public notificationcount: number;
  public detail_messages: Array<AddDeductWalletModel> = [];
  constructor(private router: Router, private common: CommonService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private data: DataService, private auth: AuthService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService) { }


  ngOnInit() {
    this.notificationcount = 0;
    this.getNotification(this.storage.get('user_id'));
  }

  private getNotification(userId: number): void {
    this.loadingScreenService.startLoading();
    this.common.adminWalletAddDeductApprovalNotification(userId)
      .subscribe((event: AdminWalletAddDeductApprovalNotificationResponse) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success') {
            this.notificationcount = event.addRequestCount;
            this.detail_messages = event.addDeductWalletModels;
            this.detail_messages.map(item => {
              item.approved = false;
            });
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public onChange(detail_message: AddDeductWalletModel): void {
    detail_message.approved = !detail_message.approved;
    if (!detail_message.approved) {
      detail_message.admin_comment = '';
    } else {
      detail_message.rejected = false;
    }
  }

  public onChangeReject(detail_message: AddDeductWalletModel): void {
    detail_message.rejected = !detail_message.rejected;
    if (!detail_message.rejected) {

    } else {
      detail_message.approved = false;
      detail_message.admin_comment = '';
    }
  }

  public submit(): void {
    this.alertService.confirmationPromissMessage('Are you sure to approve?', `You won't be able to revert this!`,
      'warning', true, true, 'Yes, approve it!', 'No, cancel!').then((result) => {
        if (result.value) {
          this.Approve();
          this.alertService.confirmationMessage('Approved!', 'Your changes has been submitted.', 'success', false, false);
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.alertService.confirmationMessage('Cancelled', 'Your changes will not update :', 'error', false, false);
        }
      });
  }

  public IsDisabled(item: AddDeductWalletModel): boolean {
    if (item.approved) {
      return false;
    } else if (item.rejected) {
      return false;
    } else {
      return true;
    }
  }
  public logout() {
    this.storage.set('is_login', false);
    this.auth.logout();
  }
  private Approve(): void {
    const data: AddDeductWalletModel[] = [];
    this.detail_messages.forEach((item: AddDeductWalletModel) => {
      const itemObject: AddDeductWalletModel = {
        addwalletid: item.addwalletid,
        firstname: item.firstname,
        middlename: item.middlename,
        lastname: item.lastname,
        comment: item.comment,
        approved: item.approved,
        rejected: item.rejected,
        admin_comment: (!item.admin_comment) ? '' : item.admin_comment,
        request_initiator_id: item.request_initiator_id,
        wallet_balance: item.wallet_balance,
        balance_request_type: item.balance_request_type
      };
      if (item.approved || item.rejected) {
        data.push(itemObject);
      }

    });
    this.loadingScreenService.startLoading();
    this.common.adminWalletAddDeductApproval(data)
      .subscribe((event: Array<AddDeductWalletModel>) => {
        this.loadingScreenService.stopLoading();
        this.alertService.confirmationMessage('', 'Add deduct wallet approver request has been successfully placed.'
          , 'success', false, false);
        this.router.navigate(['/dashboard']);
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }
}
