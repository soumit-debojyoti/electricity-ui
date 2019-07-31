import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { WalletWidthdrawalResponse } from '../models/wallet-widthdrawal-response.model';
import { BalanceRequestResponse } from '../models/balance-request-response.model';
import { AlertService } from '../services/common.service/alert.service';
import { UserService } from '../services/user.service/user.service';
import { WalletReportResponse, UserLog, WalletLog, DateLog } from '../models/wallet-balance-report.model';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, AfterViewInit {
  public descendants: boolean;
  public first: boolean;
  public read: any;
  public isViewQuery: boolean;
  public selector: any;
  public selectedIndex: number;
  @ViewChild('device', { static: false }) device: ElementRef;
  public initialLoad: boolean;
  public userChange: boolean;
  public header: string;
  public userId: number;
  public userName: string;
  public walletType: any = '';
  public isWithdrawalWallet: boolean;
  public isDeductWallet: boolean;
  public isAddBalanceRequest: boolean;
  public isBalanceRequestReport: boolean;
  public wallet_balance: string;
  public isSuperAdmin: boolean;

  public users: Array<UserLog>;
  public wallettransactions: Array<WalletLog>;
  public datelogs: Array<DateLog>;
  constructor(private common: CommonService, private userService: UserService,
    private route: ActivatedRoute, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.initialLoad = false;
    this.userChange = false;
    this.isSuperAdmin = false;
    this.userId = 0;
    this.initializeOption();
    this.userId = this.storage.get('user_id');
    this.loadingScreenService.startLoading();
    this.route.paramMap.subscribe(params => {
      this.loadingScreenService.stopLoading();
      this.walletType = params.get('type');
      // #region withdrawal
      if (this.walletType === 'withdrawal') {
        this.initializeOption();
        this.isWithdrawalWallet = true;
        this.header = 'Wallet Witdrawal!';
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
      if (this.walletType === 'report') {
        this.initializeOption();
        this.isBalanceRequestReport = true;
        this.wallettransactions = [];
        this.datelogs = [];
        this.users = [];
        this.header = 'Wallet Balance Report!';
        this.initialLoad = true;
        this.userChange = true;
        this.userId = this.storage.get('user_id');
        this.userName = this.storage.get('login_user');
        const role = this.storage.get('role');
        if (role === 'super admin') {
          this.isSuperAdmin = true;
        }

        this.getWalletBalanceReport(this.userId, 0, 0);
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }

  ngAfterViewInit() {
    this.device.nativeElement.value = this.selectedIndex;
  }

  private getWalletBalanceReport(userId: number, monthNumber: number, yearNumber: number): void {
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalanceReport(userId, monthNumber, yearNumber)
      .subscribe((response: WalletReportResponse) => {
        this.loadingScreenService.stopLoading();
        if (response !== undefined) {
          if (response.user_logs.length > 0) {
            this.users = response.user_logs;
          }

          this.wallettransactions = response.wallet_logs;
          if (this.initialLoad || this.userChange) {
            this.datelogs = response.date_logs;
            this.selectedIndex = 0; // this.datelogs.length - 1;
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public changeDate($event, deviceindex): void {
    if (deviceindex > -1) {
      this.initialLoad = false;
      this.userChange = false;
      const dateLog = this.datelogs[+deviceindex];
      this.getWalletBalanceReport(this.userId, dateLog.month_number, +dateLog.year_name);
      // sthis.getWalletBalanceReport(monthNumber);
    } else {
      this.wallettransactions = [];
    }
  }
  public changeUser($event, userId): void {
    if (userId > -1) {
      this.initialLoad = false;
      this.userChange = true;
      this.userId = +userId;
      this.getWalletBalanceReport(this.userId, 0, 0);
      // sthis.getWalletBalanceReport(monthNumber);
    } else {
      this.wallettransactions = [];
    }
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
    this.loadingScreenService.startLoading();
    this.common.addWalletWithdrawalRequest(userId, comment)
      .subscribe((response: WalletWidthdrawalResponse) => {
        this.loadingScreenService.stopLoading();
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


      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private walletDeductRequest(userId: number, comment: string, amountDeduct: string): void {
    if (+amountDeduct < 0) {
      this.alertService.confirmationMessage('', 'You can not add negative number.', 'warning', true, false);
    } else {
      this.loadingScreenService.startLoading();
      this.userService.walletDeductRequest(userId, comment, +amountDeduct)
        .subscribe((response: WalletWidthdrawalResponse) => {
          this.loadingScreenService.stopLoading();
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
        }, () => {
          this.loadingScreenService.stopLoading();
        });
    }
  }

  // #endregion

  // #region Balance request
  public balanceRequest(amount: any, comment: any): void {
    this.requestBalance(this.userId, amount.value, comment.value);
  }

  private requestBalance(userId: number, amount: number, comment: string): void {
    if (amount < 0) {
      this.alertService.confirmationMessage('', 'You can not add negative number.', 'warning', true, false);
    } else {
      this.loadingScreenService.startLoading();
      this.userService.requestBalance(userId, +amount, comment)
        .subscribe((response: BalanceRequestResponse) => {
          this.loadingScreenService.stopLoading();
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
        }, () => {
          this.loadingScreenService.stopLoading();
        });
    }

  }


  // #endregion



  private addWalletTransaction(amount: number, userId: number, message: string, transactionMode: string, requestType: string): void {
    this.loadingScreenService.startLoading();
    this.common.addWalletTransaction(amount, userId, message, transactionMode)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success') {
            this.alertService.confirmationMessage('',
              `${requestType} request has been successfully placed. Please wait for the super admin to confirm the same.`,
              'success', true, false);
            this.router.navigate(['/dashboard']);
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private initializeOption(): void {
    this.wallet_balance = '';
    this.header = '';
    this.walletType = '';
    this.isWithdrawalWallet = false;

    this.isBalanceRequestReport = false;
    this.isAddBalanceRequest = false;
    this.isDeductWallet = false;
  }
}
