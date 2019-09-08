import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from '../services/common.service/common.service';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { RechargeAPI } from '../models/common.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserService } from '../services/user.service/user.service';
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  public apiInfoList: Array<RechargeAPI> = [];
  public rechargeTypes: Array<string>;
  public rechargeMode: string;
  public operatorName: string;
  public mobileNumber: number;
  public rechargeAmount: number;
  public customerName: string;
  public customerMobile: string;
  public consumerNumber: number;
  public insufficientBalance: boolean = false;
  public joloTransactionStatus: string = '' ;
  constructor(private common: CommonService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private userService: UserService) { }

  ngOnInit() {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID', 'ELECTRICITY', 'GAS', 'WATER'];
  }
  changeRechargeType(): void {
    this.fetchRechargeAPIInfo(this.rechargeMode);
  }
  fetchRechargeAPIInfo(rechargeMode: string): void {
    this.common.getRechargeAPIInfo(rechargeMode).subscribe((response: Array<RechargeAPI>) => {
      this.apiInfoList = response;
    });

  }

  recharge(): void {
    const rechargeAPI = this.apiInfoList.find( x => x.operatorName === this.operatorName);
    let transactionMessage = '';
    rechargeAPI.apiValue = rechargeAPI.apiValue.toLowerCase();
    const userID = this.storage.get('user_id');
    this.common.insertTransaction(this.rechargeMode, userID, this.rechargeAmount.toString()).subscribe(
      (response: number) => {
        switch (this.rechargeMode) {
          case 'PREPAID':
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#mobile#', this.mobileNumber.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#amount#', this.rechargeAmount.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#order#', response.toString());
          console.log(rechargeAPI.apiValue );
          transactionMessage = `PREPAID TRANSACTION - ${this.mobileNumber}`;
          break;
          case 'WATER':
          case 'GAS':
          case 'ELECTRICITY':
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#consumer_number#', this.consumerNumber.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#amount#', this.rechargeAmount.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#order#', response.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#customer_mobile#', this.customerMobile.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#customer_name#', this.customerName.toString());
          transactionMessage = `UTILITY TRANSACTION - ${this.consumerNumber}`;
          break;
        }

        this.common.recharge(rechargeAPI.apiValue).subscribe( (innerResponse: any) => {
          if ( innerResponse.status === 'FAILED') {
            this.joloTransactionStatus = 'FAILURE';
          }
          if ( innerResponse.status === 'SUCCESS') {
            this.joloTransactionStatus = 'SUCCESS';
            this.common.deductBalanceTransaction(userID, this.rechargeAmount.toString(),
            transactionMessage).subscribe( (balance: any) => {
              console.log('Balance Deducted', balance);
            })
          }
          this.common.updateTransaction(response.toString(),
           this.joloTransactionStatus, innerResponse.error.toString()).subscribe( (transactionUpdate: any) => {
             console.log('Update Transaction Status Called', transactionUpdate);
           });
        }, (err) => {
          console.log('error has occured in recharge page -', err);
        });
      }
    );
  }

  checkAndDeductBalance(): void {
    const userID = this.storage.get('user_id');
    this.userService.getWalletBalance(userID).subscribe( (response: any) => {
      if (+response.walletBalance >= this.rechargeAmount) {
        this.recharge();
      } else {
        this.insufficientBalance = true;
      }
    });
  }

  resetInputValue(): void {
    // Implementation needed
  }

}
