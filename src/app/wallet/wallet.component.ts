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
import { WalletTransaction, RechargeTransaction, Complaint } from '../models/common.model';
import { ProfileService } from '../widgets/profile/profile.service';
import { DatePipe } from '@angular/common';
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
  public isRechargetransactionReport: boolean;
  public wallet_balance: string;
  public isSuperAdmin: boolean;
  public startDate: Date;
  public endDate: Date;
  public maxStartDate: Date;
  public today: Date;
  public users: Array<UserLog>;
  public wallettransactions: Array<WalletLog>;
  public datelogs: Array<DateLog>;
  public allTransaction: Array<WalletTransaction> = [];
  public viewMode: string = 'self';
  public role_id: number;
  public selectedUser: any;
  public user_name: string;
  public name: string;
  public transactions: Array<RechargeTransaction>;
  public selectedUserID: number;
  public selectedTransactionRowdata: RechargeTransaction;
  public ticketPriorityText: string = 'Low';
  public ticketPriorityList: Array<any>;
  public userComplaintComment: string;
  public userComplaintContactNumber: number;
  public ticketCreated: boolean;
  constructor(private datePipe: DatePipe, private common: CommonService, private userService: UserService,
    private route: ActivatedRoute, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService, private profileService: ProfileService) { }

  ngOnInit() {
    this.endDate = new Date();
    this.ticketCreated = false;
    this.transactions = [];
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 5);
    this.today = new Date();
    this.maxStartDate = this.today;
    this.selectedIndex = 0;
    this.initialLoad = false;
    this.userChange = false;
    this.isSuperAdmin = false;
    this.userId = 0;
    this.user_name = this.storage.get('login_user');
    this.initializeOption();
    this.userId = this.storage.get('user_id');
    this.role_id = this.storage.get('role_id');
    this.deductWalletBalanceUserIDChange();
    this.selectedUser = {};
    this.selectedTransactionRowdata = new RechargeTransaction();
    this.selectedUserID = this.userId;
    this.ticketPriorityList = [{ priority: 3 , text: 'High'},
    { priority: 2 , text: 'Medium'},
    { priority: 1 , text: 'Low'}];
    debugger;
    /** fetching all user list for admin deduct balance*/
    this.userService.getAllUsers().subscribe((response: Array<UserLog>) => {
      this.users = response;
      console.log('All users called', this.users);
    });
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
        this.header = 'Deduct amount from user wallet!';
      }
      // #endregion
      if (this.walletType === 'wallettransactionreport') {
        this.initializeOption();
        this.isBalanceRequestReport = true;
        this.wallettransactions = [];
        this.datelogs = [];
        this.users = [];
        this.header = 'Wallet Transaction History!';
        this.initialLoad = true;
        this.userChange = true;
        this.userId = this.storage.get('user_id');
        this.userName = this.storage.get('login_user');
        const role = this.storage.get('role');
        if (role === 'super admin') {
          this.isSuperAdmin = true;
          this.getWalletBalanceReport(this.userId, 'all', 'all');
        } 
        this.fetchAllTransaction();
      }
      if (this.walletType === 'rechargetransactionreport') {
        this.initializeOption();
        this.isRechargetransactionReport = true;
        this.wallettransactions = [];
        this.datelogs = [];
        this.users = [];
        this.header = 'Recharge Transaction History!';
        this.initialLoad = true;
        this.userChange = true;
        this.userId = this.storage.get('user_id');
        this.userName = this.storage.get('login_user');
        const role = this.storage.get('role');
        if (role === 'super admin') {
          this.isSuperAdmin = true;
          this.fetchAllRechargeTransaction();
        } else {
          this.fetchUserRechargeTransaction(this.userId);
        }
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }
  public deductWalletBalanceUserIDChange(): void {
    this.loadingScreenService.startLoading();
    this.profileService.GetUser(this.user_name).subscribe(
      (response: any) => {
        if ( response !== null) {
          this.selectedUser = response;
          this.name = this.selectedUser.first_name + ' ' + this.selectedUser.last_name;
        }
        this.loadingScreenService.stopLoading();
      } , (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
      }
    );
  }
  ngAfterViewInit() {
    // this.device.nativeElement.value = this.selectedIndex;
  }

  private getWalletBalanceReport(userId: number, startDate: string, endDate: string): void {
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalanceReport(userId, startDate, endDate)
      .subscribe((response: WalletReportResponse) => {
        this.loadingScreenService.stopLoading();
        if (response !== undefined) {
          if (response.user_logs.length > 0) {
            this.users = response.user_logs;
          }

          this.wallettransactions = response.wallet_logs;
          if (this.initialLoad || this.userChange) {
            // this.datelogs = response.date_logs;
            // this.selectedIndex = 0; // this.datelogs.length - 1;
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
      this.getWalletBalanceReport(this.userId, '2019-08-02', '2018-07-07');
      // sthis.getWalletBalanceReport(monthNumber);
    } else {
      this.wallettransactions = [];
    }
  }

  public search(): void {
    if (this.viewMode.toLowerCase() === 'admin') {
      this.initialLoad = false;
      this.userChange = false;
      this.getWalletBalanceReport(this.userId, this.formatDate(this.startDate), this.formatDate(this.endDate));
    } else {
      this.fetchAllTransaction();
    }
  }

  // public fetchTransaction(): void {
  //   debugger;
  //   console.log(this.startDate);
  //   console.log(this.endDate);
  //   console.log(this.userId);
  //   if (this.isSuperAdmin) {
  //     this.fetchAllRechargeTransaction();
  //   } else {
  //     this.fetchUserRechargeTransaction(this.selectedUser);
  //   }
  // }


  public fetchUserTransaction(): void {
    if (this.isSuperAdmin) {
      this.fetchUserRechargeTransaction(this.selectedUserID);
    } else {
      this.fetchUserRechargeTransaction(this.userId);
    }
  }





  public changeUser($event, userId): void {
    this.userId = userId;
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
  /** Deduct balance for admin - from user account selected */
  public deductBalanceFromUser(comment: any, amount: any): void {
    this.common.deductBalanceTransaction(this.userId.toString(), amount.value, comment.value).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }
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

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

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
    this.isRechargetransactionReport = false;
    this.isAddBalanceRequest = false;
    this.isDeductWallet = false;
  }
  /**
   * Fetches user specific transaction for specific period
   */
  public fetchAllTransaction(): void {
    this.loadingScreenService.startLoading();
    this.common.fetchAllTransaction(this.userId, this.startDate.toDateString()
      , this.endDate.toDateString()).subscribe((response) => {
        this.loadingScreenService.stopLoading();
        this.allTransaction = response;
      }, (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
      });
  }

  public changeView(value: string) {
    this.viewMode = value;
    console.log('change view called', this.viewMode);
  }

  public fetchAllRechargeTransaction(): void {
    this.loadingScreenService.startLoading();
    this.common.fetchRechargeTransactionHistory(this.endDate.toDateString()
    , this.startDate.toDateString()).subscribe( (response: any) => {
      this.loadingScreenService.stopLoading();
      this.transactions = response;
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    });
  }
  public fetchUserRechargeTransaction(userID: number): void {
    this.loadingScreenService.startLoading();
    this.common.fetchUserRechargeTransactionHistory(userID,
      this.endDate.toDateString()
    , this.startDate.toDateString()).subscribe( (response: any) => {
      this.loadingScreenService.stopLoading();
      this.transactions = response;
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    });
  }

  raiseComplaint(): void {
    console.log('Raise Complaint called');
    // Open popup and raise complain
    const c = new Complaint();
    c.tID = this.selectedTransactionRowdata.transactionID;
    c.cStatus = 1;
    c.assignedTo = 1;
    c.raisedBy = this.userId;
    c.resolvedBy = 0;
    c.resolverComment = 'Your ticket has been acknowledged, our team will start working on it very soon.';
    c.userComment = this.userComplaintComment;
    c.userContactNumber = this.selectedUser.mobile_number;
    c.cPriority = +this.ticketPriorityText;
    this.loadingScreenService.startLoading();
    this.common.addComplaint(c).subscribe( (response: boolean) => {
      this.loadingScreenService.stopLoading();
      this.ticketCreated = response;
      this.ticketPriorityText = '3';
      this.userComplaintComment = '';
    }, (err) => {
      this.loadingScreenService.stopLoading();
    });
  }

  editTransactionRowData(rowData: any): void {
    var t = this.selectedUser;
    this.name = this.selectedUser.first_name + ' ' + this.selectedUser.last_name;
    this.selectedTransactionRowdata = rowData;
    this.selectedTransactionRowdata.transactionDateText =
    this.datePipe.transform(this.selectedTransactionRowdata.transactionDate, 'dd-MM-yyyy');
  }

  changePriority(priority: any): void {
    this.ticketPriorityText = priority;

  }
}
