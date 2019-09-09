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
  public validationReferenceID: string;
  public insufficientBalance: boolean = false;
  public joloTransactionStatus: string = '' ;
  public billDue: boolean = true;
  public utilityTransactionValidated: boolean = false;
  public utilityTransactionErrorMessage: string;
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
    // rechargeAPI.apiValue = rechargeAPI.apiValue.toLowerCase();
    const userID = this.storage.get('user_id');
    this.loadingScreenService.startLoading();
    this.common.insertTransaction(this.rechargeMode, userID, this.rechargeAmount.toString()).subscribe(
      (response: number) => {
        switch (this.rechargeMode) {
          case 'PREPAID':
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#Mobile#', this.mobileNumber.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#Amount#', this.rechargeAmount.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#Order#', response.toString());
          console.log(rechargeAPI.apiValue );
          transactionMessage = `PREPAID TRANSACTION - ${this.mobileNumber}`;
          break;
          case 'WATER':
          case 'GAS':
          case 'ELECTRICITY':
            debugger;
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#consumer_number#', this.consumerNumber.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#amount#', this.rechargeAmount.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#order#', response.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#customer_mobile#', this.customerMobile.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#customer_name#', this.customerName.toString());
          rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#reference_id#', this.validationReferenceID.toString());
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
            });
          }
          this.common.updateTransaction(response.toString(),
           this.joloTransactionStatus, innerResponse.error.toString()).subscribe( (transactionUpdate: any) => {
             console.log('Update Transaction Status Called', transactionUpdate);
           });
           this.loadingScreenService.stopLoading();
        }, (err) => {
          console.log('error has occured in recharge page -', err);
          this.loadingScreenService.stopLoading();
        });
      }, (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
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

  validateTransaction(): void {
    debugger;
    this.loadingScreenService.startLoading();
    this.common.fetchValidationAPIDetails(this.rechargeMode, this.operatorName).subscribe(
      (response: RechargeAPI) => {
        console.log('inside validate transaction', response);
        this.common.recharge(this.createValidateAPIUrlUtility(response.apiValue)).subscribe( (innerResponse: any) => {
          console.log('after validation', innerResponse);
          this.utilityTransactionValidated = true;
          if ( innerResponse.status === 'SUCCESS') {
            this.billDue = true;
            this.rechargeAmount = innerResponse.dueamount;
            this.customerName = innerResponse.customername;
            this.validationReferenceID = innerResponse.reference_id;
          } else if ( innerResponse.status === 'FAILED') {
            this.billDue = false;
            this.utilityTransactionErrorMessage = innerResponse.error;
          }
          this.loadingScreenService.stopLoading();
        }, (err) => {
          console.log(err);
          this.loadingScreenService.stopLoading();
        });
      }, (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
      }
    );
  }

  createValidateAPIUrlUtility(apiValue: string): string {
    let returnApiValue = apiValue;
    returnApiValue = returnApiValue.replace('#consumer_number#', this.consumerNumber.toString());
    returnApiValue = returnApiValue.replace('#customer_mobile#', this.customerMobile.toString());
    returnApiValue = returnApiValue.replace('#order#', '001');
    returnApiValue = returnApiValue.replace('#customer_name#', 'xx');
    return returnApiValue;
  }

}
