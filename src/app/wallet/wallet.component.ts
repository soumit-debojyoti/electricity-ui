import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { WalletWidthdrawalResponse } from '../models/wallet-widthdrawal-response.model';
import { BalanceRequestResponse } from '../models/balance-request-response.model';
import { AlertService } from '../services/common.service/alert.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public header: string;
  public userId: number;
  public walletType: any = '';
  public isWithdrawalWallet: boolean;
  public isBalanceRequest: boolean;
  public isDeductWallet: boolean;
  public isAddBalanceRequest: boolean;
  public wallet_balance: string;
  constructor(private common: CommonService,
    private route: ActivatedRoute, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private alertService: AlertService) { }

  ngOnInit() {
    this.userId = 0;
    this.initializeOption();
    this.userId = this.storage.get('user_id');
    this.route.paramMap.subscribe(params => {
      this.walletType = params.get('type');
      // #region withdrawal
      if (this.walletType === 'withdrawal') {
        this.initializeOption();
        this.isWithdrawalWallet = true;
        this.header = 'Wallet Witdrawal!';
      }
      if (this.walletType === 'balance') {
        this.initializeOption();
        this.isBalanceRequest = true;
        this.header = 'Balance Request!';

      }
      // #endregion
      // #region Balance request
      if (this.walletType === 'add_wallet') {
        this.initializeOption();
        this.isAddBalanceRequest = true;
        this.header = 'Wallet Add!';
      }
      if (this.walletType === 'deduct') {
        this.initializeOption();
        this.isDeductWallet = true;
        this.header = 'Wallet Deduct!';
      }
      // #endregion
    });
  }

  // #region withdrawal
  public widthdraw(comment: any): void {
    const commentFinal = comment.value;
    this.addWalletWithdrawalRequest(this.userId, commentFinal);
  }

  public deduct(comment: any, amount: any): void {
    const commentFinal = comment.value;
    const amountDeduct = amount.value;
    this.walletDeductRequest(this.userId, commentFinal, amountDeduct);
  }

  private addWalletWithdrawalRequest(userId: number, comment: string): void {
    this.common.addWalletWithdrawalRequest(userId, comment)
      .subscribe((response: WalletWidthdrawalResponse) => {
        if (response !== undefined) {
          if (response.message === 'success') {
            let message = '';
            if (comment === '') {
              message = `A request has been send to super admin to grant an amount of
              ${response.amount_wallet_widthdraw} to be widthdran. Waiting for the confirmation. `;

            } else {
              message = `A request has been send to super admin to grant an amount of
              ${response.amount_wallet_widthdraw} to be widthdran. Waiting for the confirmation.
              The justification for the widthdrawal is as '${comment}'`;

            }
            this.addWalletTransaction(response.amount_wallet_widthdraw, userId, message, 'credit', 'Withdrawal');
          } else {
            this.alertService.confirmationMessage('', response.message, 'success', true, false);
          }
        }


      });
  }

  private walletDeductRequest(userId: number, comment: string, amountDeduct: string): void {
    this.common.walletDeductRequest(userId, comment, +amountDeduct)
      .subscribe((response: WalletWidthdrawalResponse) => {
        if (response !== undefined) {
          if (response.message === 'success') {
            let message = '';
            if (comment === '') {
              if (response.amount_wallet_widthdraw !== undefined) {
                message = `A request has been send to super admin to grant an amount of
                ${response.amount_wallet_widthdraw} to be deduct. Waiting for the confirmation. `;
                this.addWalletTransaction(response.amount_wallet_widthdraw, userId, message, 'credit', 'Deduct');
              } else {
                message = `A request has been send to super admin to grant an amount o
                 ${response.amount_requested} to be deduct. Waiting for the confirmation. `;
                this.addWalletTransaction(response.amount_requested, userId, message, 'credit', 'Deduct');
              }

            } else {
              if (response.amount_wallet_widthdraw !== undefined) {
                message = `A request has been send to super admin to grant an amount of
                ${response.amount_wallet_widthdraw} to be deduct. Waiting for the confirmation.
                The justification for the deduction is as '${comment}'`;
                this.addWalletTransaction(response.amount_wallet_widthdraw, userId, message, 'credit', 'Deduct');
              } else {
                message = `A request has been send to super admin to grant an amount of
                ${response.amount_requested} to be deduct. Waiting for the confirmation.
                The justification for the deduction is as '${comment}'`;
                this.addWalletTransaction(response.amount_requested, userId, message, 'credit', 'Deduct');
              }
            }
          } else {
            this.alertService.confirmationMessage('', response.message, 'success', true, false);
          }
        }
      });
  }

  // #endregion

  // #region Balance request
  public balanceRequest(amount: any, comment: any): void {
    this.requestBalance(this.userId, amount.value, comment.value);
  }

  private requestBalance(userId: number, amount: number, comment: string): void {
    this.common.requestBalance(userId, +amount, comment)
      .subscribe((response: BalanceRequestResponse) => {
        if (response !== undefined) {
          if (response.message === 'success') {
            let message = '';
            if (comment === '') {
              message = `A request has been send to super admin to grant an amount of
              ${response.amount_requested} to be added to the wallet. Waiting for the confirmation. `;

            } else {
              message = `A request has been send to super admin to grant an amount of
              ${response.amount_requested} to be added to the wallet. Waiting for the confirmation.
              The justification for the widthdrawal is as '${comment}'`;

            }
            this.addWalletTransaction(response.amount_requested, userId, message, 'debit', 'Add balance');
            this.alertService.confirmationMessage('', message, 'success', true, false);
          } else {
            this.alertService.confirmationMessage('', response.message, 'error', true, false);
          }
        }
      });
  }


  // #endregion



  private addWalletTransaction(amount: number, userId: number, message: string, transactionMode: string, requestType: string): void {
    this.common.addWalletTransaction(amount, userId, message, transactionMode)
      .subscribe((event: any) => {
        if (event !== undefined) {
          if (event.message === 'success') {
            this.alertService.confirmationMessage('',
              `${requestType} request has been successfully placed. Please wait for the super admin to confirm the same.`,
              'success', true, false);
            this.router.navigate(['/login']);
          }
        }
      });
  }

  private initializeOption(): void {
    this.wallet_balance = '';
    this.header = '';
    this.walletType = '';
    this.isWithdrawalWallet = false;

    this.isBalanceRequest = false;
    this.isAddBalanceRequest = false;
    this.isDeductWallet = false;
  }
}
