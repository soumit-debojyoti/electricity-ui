import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { WalletWidthdrawalResponse } from '../models/wallet-widthdrawal-response.model';
import { BalanceRequestResponse } from '../models/balance-request-response.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public userId: number = 0;
  public walletType: any = '';
  public isWithdrawalWallet: boolean = false;
  public isBalanceRequest: boolean = false;
  constructor(private common: CommonService, private route: ActivatedRoute, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    // #region withdrawal
    this.isWithdrawalWallet = false;
    // #endregion
    // #region Balance request
    this.isBalanceRequest = false;
    // #endregion
    this.walletType = '';
    this.userId = this.storage.get("user_id");
    this.route.paramMap.subscribe(params => {
      this.walletType = params.get("type");
      // #region withdrawal
      if (this.walletType === 'withdrawal') {
        this.isWithdrawalWallet = true;
      }
      // #endregion
      // #region Balance request
      if (this.walletType === 'balance') {
        this.isBalanceRequest = true;
      }
      // #endregion
    });
  }

  // #region withdrawal
  public widthdraw(comment: any): void {
    var commentFinal = comment.value;
    this.addWalletWithdrawalRequest(this.userId, commentFinal);
  }

  private addWalletWithdrawalRequest(userId: number, comment: string): void {
    this.common.addWalletWithdrawalRequest(userId, comment)
      .subscribe((response: WalletWidthdrawalResponse) => {
        if (response != undefined)

          if (response.message == 'success') {
            var message: string = '';
            if (comment == '') {
              message = `A request has been send to super admin to grant an amount of ${response.amount_wallet_widthdraw} to be widthdran. Waiting for the confirmation. `;

            } else {
              message = `A request has been send to super admin to grant an amount of ${response.amount_wallet_widthdraw} to be widthdran. Waiting for the confirmation. The justification for the widthdrawal is as '${comment}'`;

            }
            this.addWalletTransaction(response.amount_wallet_widthdraw, userId, message, 'credit', 'Withdrawal');
          } else {
            alert(response.message);
          }
      });
  }


  // #endregion

  // #region Balance request
  public balanceRequest(amount: any, comment: any): void {
    this.requestBalance(this.userId, amount.value, comment.value);
  }

  private requestBalance(userId: number, amount: number, comment: string): void {
    debugger;
    this.common.requestBalance(userId, +amount, comment)
      .subscribe((response: BalanceRequestResponse) => {
        debugger;
        if (response != undefined)

          if (response.message == 'success') {
            var message: string = '';
            if (comment == '') {
              message = `A request has been send to super admin to grant an amount of ${response.amount_requested} to be added to the wallet. Waiting for the confirmation. `;

            } else {
              message = `A request has been send to super admin to grant an amount of ${response.amount_requested} to be added to the wallet. Waiting for the confirmation. The justification for the widthdrawal is as '${comment}'`;

            }
            this.addWalletTransaction(response.amount_requested, userId, message, 'debit', 'Add balance');
            alert(message);
          } else {
            alert(response.message);
          }
      });
  }


  // #endregion



  private addWalletTransaction(amount: number, userId: number, message: string, transactionMode: string, requestType: string): void {
    this.common.addWalletTransaction(amount, userId, message, transactionMode)
      .subscribe((event: any) => {
        if (event != undefined)
          if (event.message == 'success') {
            alert(`${requestType} request has been successfully placed. Please wait for the super admin to confirm the same.`);
            this.router.navigate(['/login']);
          }
      });
  }
}
