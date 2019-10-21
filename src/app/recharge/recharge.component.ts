import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from '../services/common.service/common.service';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { RechargeAPI, PrepaidRecharge, UtilityRecharge } from '../models/common.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserService } from '../services/user.service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public joloTransactionStatus: string = '';
  public billDue: boolean = true;
  public utilityTransactionValidated: boolean = false;
  public utilityTransactionErrorMessage: string;
  public rechargeObject: any;
  public prepaidRechargeForm: FormGroup;
  public utilityRechargeForm: FormGroup;
  public formSubmitted = false;
  public validationFailed = false;
  constructor(private common: CommonService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private userService: UserService) { }

  ngOnInit() {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID', 'ELECTRICITY', 'GAS', 'WATER'];
    this.rechargeMode = 'PREPAID';
    this.changeRechargeType();
    // Form - Controls
    this.prepaidRechargeForm = this.formBuilder.group(
      {
        operatorName: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        rechargeAmount: ['', [Validators.required, Validators.min(10)]],
      }
    );
    this.utilityRechargeForm = this.formBuilder.group(
      {
        operatorName: ['', Validators.required],
        consumerNumber: ['', Validators.required],
        rechargeAmount: ['', [Validators.required, Validators.min(10)]],
        customerName: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
      }
    );
  }
  changeRechargeType(): void {
    this.fetchRechargeAPIInfo(this.rechargeMode);
    // this.resetInputValue();
  }
  fetchRechargeAPIInfo(rechargeMode: string): void {
    this.loadingScreenService.startLoading();
    this.common.getRechargeAPIInfo(rechargeMode).subscribe((response: Array<RechargeAPI>) => {
      this.apiInfoList = response;
      this.loadingScreenService.stopLoading();
      this.prepaidRechargeForm.controls.operatorName.setValue(this.apiInfoList[0].operatorName);
      this.utilityRechargeForm.controls.operatorName.setValue(this.apiInfoList[0].operatorName);
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    }
    );

  }
  get fPrepaidRecharge() { return this.prepaidRechargeForm.controls; }
  get fUtilityRecharge() { return this.utilityRechargeForm.controls; }
  recharge(): void {
    let transactionMessage = '';
    const userID = this.storage.get('user_id');
    this.loadingScreenService.startLoading();
    // const rechargeAmount = this.fPrepaidRecharge.rechargeAmount.value;
    this.common.insertTransaction(this.rechargeMode, userID, this.rechargeAmount.toString()).subscribe(
      (response: number) => {
        switch (this.rechargeMode) {
          case 'PREPAID':
            this.rechargeObject = new PrepaidRecharge();
            this.rechargeObject.mobileNumber = this.fPrepaidRecharge.mobileNumber.value.toString();
            this.rechargeObject.amount = this.fPrepaidRecharge.rechargeAmount.value.toString();
            this.rechargeObject.orderNumber = response.toString();
            this.rechargeObject.operatorName = this.fPrepaidRecharge.operatorName.value;
            transactionMessage = `PREPAID TRANSACTION - ${this.mobileNumber}`;
            break;
          case 'WATER':
          case 'GAS':
          case 'ELECTRICITY':
            // rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#consumer_number#', this.consumerNumber.toString());
            // rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#amount#', this.rechargeAmount.toString());
            // rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#order#', response.toString());
            // rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#customer_mobile#', this.customerMobile.toString());
            // rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#customer_name#', this.customerName.toString());
            // rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#reference_id#', this.validationReferenceID.toString());
            transactionMessage = `UTILITY TRANSACTION - ${this.fUtilityRecharge.consumerNumber.value.toString()}`;
            this.rechargeObject = new UtilityRecharge();
            this.rechargeObject.consumerNumber = this.fUtilityRecharge.consumerNumber.value.toString();
            this.rechargeObject.amount = this.fUtilityRecharge.rechargeAmount.value.toString();
            this.rechargeObject.orderNumber = response.toString();
            this.rechargeObject.customerMobileNumber = this.fUtilityRecharge.mobileNumber.value.toString();
            this.rechargeObject.customerName = this.fUtilityRecharge.customerName.value.toString();
            this.rechargeObject.validationReferenceID = this.validationReferenceID.toString();
            this.rechargeObject.operatorName = this.fUtilityRecharge.operatorName.value.toString();
            break;
        }

        this.common.rechargeService(this.rechargeMode, this.rechargeObject).subscribe((innerResponse: any) => {
          if (innerResponse.status === 'FAILED') {
            this.joloTransactionStatus = 'FAILURE';
          }
          if (innerResponse.status === 'SUCCESS') {
            this.joloTransactionStatus = 'SUCCESS';
            this.common.deductBalanceTransaction(userID, this.rechargeAmount.toString(),
              transactionMessage).subscribe((balance: any) => {
                console.log('Balance Deducted', balance);
              });
          }
          this.common.updateTransaction(response.toString(),
            this.joloTransactionStatus, innerResponse.error.toString()).subscribe((transactionUpdate: any) => {
              console.log('Update Transaction Status Called', transactionUpdate);
            });
          this.loadingScreenService.stopLoading();
          this.resetInputValue();
          this.formSubmitted = false;
          this.utilityTransactionValidated = false;
        }, (err) => {
          console.log('error has occured in recharge page -', err);
          this.loadingScreenService.stopLoading();
          this.resetInputValue();
          this.formSubmitted = false;
          this.utilityTransactionValidated = false;
        });
      }, (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
        this.resetInputValue();
        this.formSubmitted = false;
        this.utilityTransactionValidated = false;
      }
    );
  }

  checkAndDeductBalance(): void {
    this.formSubmitted = true;
    const userID = this.storage.get('user_id');
    switch ( this.rechargeMode) {
      case 'DTH':
      case 'PREPAID': this.rechargeAmount = this.fPrepaidRecharge.rechargeAmount.value;
                      if ( this.prepaidRechargeForm.status === 'INVALID') {
                        alert('Invalid form can not be submitted');
                        return;
                      }
                      break;
      case 'WATER':
      case 'GAS':
      case 'ELECTRICITY': this.rechargeAmount = this.fUtilityRecharge.rechargeAmount.value;
                          if ( this.utilityRechargeForm.status === 'INVALID') {
                            alert('Invalid form can not be submitted');
                            return;
                          }
                          break;
    }
    this.userService.getWalletBalance(userID).subscribe((response: any) => {
      if (+response.walletBalance >= this.rechargeAmount) {
        this.recharge();
      } else {
        this.insufficientBalance = true;
      }
    });
  }

  resetInputValue(): void {
    this.utilityRechargeForm.reset();
    this.prepaidRechargeForm.reset();
  }

  validateTransaction(): void {
    if (!this.common.validateMobileNumberInputString(this.fUtilityRecharge.mobileNumber.value.toString())) {
      alert('Invalid form data');
      this.fUtilityRecharge.mobileNumber.setErrors({'incorrect': true});
      return;
    }
    this.loadingScreenService.startLoading();
        this.common.validateUtilityService(this.rechargeMode,
          this.fUtilityRecharge.operatorName.value.toString(),
          this.fUtilityRecharge.consumerNumber.value.toString(),
          this.fUtilityRecharge.mobileNumber.value.toString()).subscribe((innerResponse: any) => {
          this.utilityTransactionValidated = true;
          if (innerResponse.status === 'SUCCESS') {
            this.billDue = true;
            this.rechargeAmount = innerResponse.dueamount;
            this.fUtilityRecharge.rechargeAmount.setValue(innerResponse.dueamount);
            this.fUtilityRecharge.customerName.setValue(innerResponse.customername);
            this.validationReferenceID = innerResponse.reference_id;
            this.validationFailed = false;
          } else if (innerResponse.status === 'FAILED') {
            this.billDue = false;
            this.utilityTransactionErrorMessage = innerResponse.error;
            this.utilityRechargeForm.reset();
            this.utilityTransactionValidated = false;
            this.validationFailed = true;
          }
          this.loadingScreenService.stopLoading();
        }, (err) => {
          console.log('error occured inside validate utility recharge api', err);
          this.loadingScreenService.stopLoading();
          this.utilityRechargeForm.reset();
        });
  }

  createValidateAPIUrlUtility(apiValue: string): string {
    let returnApiValue = apiValue;
    returnApiValue = returnApiValue.replace('#consumer_number#', this.fUtilityRecharge.consumerNumber.value.toString());
    returnApiValue = returnApiValue.replace('#customer_mobile#', this.fUtilityRecharge.mobileNumber.value.toString());
    returnApiValue = returnApiValue.replace('#order#', '001');
    returnApiValue = returnApiValue.replace('#customer_name#', 'xx');
    return returnApiValue;
  }

  changeView(mode: string): void {
    this.rechargeMode = mode;
    this.changeRechargeType();
    this.joloTransactionStatus = '';
    this.validationFailed = false;
  }
  validateAmount(): void {
  }
}
