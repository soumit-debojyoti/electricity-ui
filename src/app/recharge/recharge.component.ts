import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from '../services/common.service/common.service';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { RechargeAPI, PrepaidRecharge, UtilityRecharge, PostpaidRecharge, LandlineRecharge } from '../models/common.model';
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
  public postpaidRechargeForm: FormGroup;
  public landLineRechargeForm: FormGroup;
  public formSubmitted = false;
  public validationFailed = false;
  public serviceNumber = '';
  constructor(private common: CommonService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private userService: UserService) { }

  ngOnInit() {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID', 'ELECTRICITY', 'GAS', 'WATER', 'LANDLINE'];
    this.rechargeMode = 'PREPAID';
    this.changeRechargeType();
    // Form - Controls
    this.prepaidRechargeForm = this.formBuilder.group(
      {
        operatorName: ['', Validators.required],
        dthServiceNumber: ['', Validators.required],
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
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        invoiceNumber: ['', Validators.required],
        dueDate: ['', Validators.required],
      }
    );
    this.postpaidRechargeForm = this.formBuilder.group(
      {
        operatorName: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        rechargeAmount: ['', [Validators.required, Validators.min(10)]],
        customerName: ['', Validators.required],
        customerMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
      }
    );
    this.landLineRechargeForm = this.formBuilder.group(
      {
        operatorName: ['', Validators.required],
        landLineNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        rechargeAmount: ['', [Validators.required, Validators.min(10)]],
        customerName: ['', Validators.required],
        customerMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        stdCode: ['', Validators.required],
        accountNumber: ['', Validators.required]
      }
    );
  }
  changeRechargeType(): void {
    console.log(this.rechargeMode);
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
      this.postpaidRechargeForm.controls.operatorName.setValue(this.apiInfoList[0].operatorName);
      this.landLineRechargeForm.controls.operatorName.setValue(this.apiInfoList[0].operatorName);
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    }
    );

  }
  get fPrepaidRecharge() { return this.prepaidRechargeForm.controls; }
  get fUtilityRecharge() { return this.utilityRechargeForm.controls; }
  get fPostpaidRecharge() { return this.postpaidRechargeForm.controls; }
  get fLandlineRecharge() { return this.landLineRechargeForm.controls; }
  recharge(): void {
    let transactionMessage = '';
    const userID = this.storage.get('user_id');
    this.loadingScreenService.startLoading();
    // const rechargeAmount = this.fPrepaidRecharge.rechargeAmount.value;
    this.common.insertTransaction(this.rechargeMode, userID, this.rechargeAmount.toString(), this.serviceNumber).subscribe(
      (response: number) => {
        switch (this.rechargeMode) {
          case 'DTH':
              this.rechargeObject = new PrepaidRecharge();
              this.rechargeObject.mobileNumber = this.fPrepaidRecharge.dthServiceNumber.value.toString();
              this.rechargeObject.amount = this.fPrepaidRecharge.rechargeAmount.value.toString();
              this.rechargeObject.orderNumber = response.toString();
              this.rechargeObject.operatorName = this.fPrepaidRecharge.operatorName.value;
              transactionMessage = `DTH TRANSACTION - ${this.rechargeObject.mobileNumber}`;
              break;
          case 'PREPAID':
            this.rechargeObject = new PrepaidRecharge();
            this.rechargeObject.mobileNumber = this.fPrepaidRecharge.mobileNumber.value.toString();
            this.rechargeObject.amount = this.fPrepaidRecharge.rechargeAmount.value.toString();
            this.rechargeObject.orderNumber = response.toString();
            this.rechargeObject.operatorName = this.fPrepaidRecharge.operatorName.value;
            transactionMessage = `PREPAID TRANSACTION - ${this.rechargeObject.mobileNumber}`;
            break;
          case 'WATER':
          case 'GAS':
          case 'ELECTRICITY':
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
          case 'POSTPAID':
            this.rechargeObject = new PostpaidRecharge();
            this.rechargeObject.operatorName = this.fPostpaidRecharge.operatorName.value.toString();
            this.rechargeObject.rechargeMobileNumber = this.fPostpaidRecharge.mobileNumber.value.toString();
            this.rechargeObject.amount = this.fPostpaidRecharge.rechargeAmount.value.toString();
            this.rechargeObject.customerMobileNumber = this.fPostpaidRecharge.customerMobile.value.toString();
            this.rechargeObject.customerName = this.fPostpaidRecharge.customerName.value.toString();
            this.rechargeObject.orderNumber = response.toString();
            transactionMessage = `POSTPAID TRANSACTION - ${this.rechargeObject.rechargeMobileNumber.toString()}`;
            break;
            case 'LANDLINE':
            this.rechargeObject = new LandlineRecharge();
            this.rechargeObject.operatorName = this.fLandlineRecharge.operatorName.value.toString();
            this.rechargeObject.rechargeMobileNumber = this.fLandlineRecharge.landLineNumber.value.toString();
            this.rechargeObject.amount = this.fLandlineRecharge.rechargeAmount.value.toString();
            this.rechargeObject.customerMobileNumber = this.fLandlineRecharge.customerMobile.value.toString();
            this.rechargeObject.customerName = this.fLandlineRecharge.customerName.value.toString();
            this.rechargeObject.stdCode = this.fLandlineRecharge.stdCode.value.toString();
            this.rechargeObject.accountNumber = this.fLandlineRecharge.accountNumber.value.toString();
            this.rechargeObject.orderNumber = response.toString();
            transactionMessage = `LANDLINE TRANSACTION - ${this.rechargeObject.rechargeMobileNumber.toString()}`;
            break;
        }
        this.common.rechargeService(this.rechargeMode, this.rechargeObject).subscribe((innerResponse: any) => {
          debugger;
          if (innerResponse.status === 'FAILED') {
            this.joloTransactionStatus = 'FAILURE';
          }
          if (innerResponse.status === 'SUCCESS') {
            this.joloTransactionStatus = 'SUCCESS';
            this.common.deductBalanceTransaction(userID, this.rechargeAmount.toString(),
              transactionMessage).subscribe((balance: any) => {
                console.log('Balance Deducted', balance);
              }, (err) => {
                console.log('error occured in balance deduction after recharge', err);
              });
              this.common.payoutCommission(userID,
                this.rechargeMode, this.rechargeObject.operatorName, this.rechargeObject.amount).subscribe(
                  payoutresponse => {
                    console.log('recharge - pay out', payoutresponse);
                  }, (err) => {
                    console.log('error occured in pay out commission', err);
                  }
                );
          }
          this.resetInputValue();
          this.common.updateTransaction(response.toString(),
            this.joloTransactionStatus, innerResponse.error.toString()).subscribe((transactionUpdate: any) => {
              console.log('Update Transaction Status Called', transactionUpdate);
            });
          this.loadingScreenService.stopLoading();
          this.resetInputValue();
          this.formSubmitted = false;
          this.utilityTransactionValidated = false;
          if (this.rechargeMode === 'WATER' || this.rechargeMode === 'GAS' || this.rechargeMode === 'ELECTRICITY') {
            this.resetUtilityControl();
          }
        }, (err) => {
          console.log('error has occured in recharge page -', err);
          this.loadingScreenService.stopLoading();
          this.resetInputValue();
          this.formSubmitted = false;
          this.utilityTransactionValidated = false;
          if (this.rechargeMode === 'WATER' || this.rechargeMode === 'GAS' || this.rechargeMode === 'ELECTRICITY') {
            this.resetUtilityControl();
          }
        });
      }, (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
        this.resetInputValue();
        this.formSubmitted = false;
        this.utilityTransactionValidated = false;
        if (this.rechargeMode === 'WATER' || this.rechargeMode === 'GAS' || this.rechargeMode === 'ELECTRICITY') {
          this.resetUtilityControl();
        }
      }
    );
  }

  checkAndDeductBalance(): void {
    this.formSubmitted = true;
    const userID = this.storage.get('user_id');
    switch ( this.rechargeMode) {
      case 'DTH': this.prepaidRechargeForm.controls.mobileNumber.setValue(1234567890);
      this.rechargeAmount = this.fPrepaidRecharge.rechargeAmount.value;
                      if ( this.prepaidRechargeForm.status === 'INVALID') {
                        alert('Invalid form can not be submitted');
                        return;
                      }
                      this.serviceNumber = this.fPrepaidRecharge.dthServiceNumber.value;
                      break;
      case 'PREPAID': this.prepaidRechargeForm.controls.dthServiceNumber.setValue(1234567890);
      this.rechargeAmount = this.fPrepaidRecharge.rechargeAmount.value;
                      if ( this.prepaidRechargeForm.status === 'INVALID') {
                        alert('Invalid form can not be submitted');
                        return;
                      }
                      this.serviceNumber = this.fPrepaidRecharge.mobileNumber.value;
                      break;
      case 'WATER':
      case 'GAS':
      case 'ELECTRICITY': this.rechargeAmount = this.fUtilityRecharge.rechargeAmount.value;
                          if ( this.utilityRechargeForm.status === 'INVALID') {
                            alert('Invalid form can not be submitted');
                            return;
                          }
                          this.serviceNumber = this.fUtilityRecharge.consumerNumber.value;
                          break;
      case 'POSTPAID': this.rechargeAmount = this.fPostpaidRecharge.rechargeAmount.value;
      if ( this.postpaidRechargeForm.status === 'INVALID') {
        alert('Invalid form can not be submitted');
        return;
      }
      this.serviceNumber = this.fPostpaidRecharge.mobileNumber.value;
      break;
      case 'LANDLINE': this.rechargeAmount = this.fLandlineRecharge.rechargeAmount.value;
      if ( this.landLineRechargeForm.status === 'INVALID') {
        alert('Invalid form can not be submitted');
        return;
      }
      this.serviceNumber = this.fLandlineRecharge.landLineNumber.value;
      break;
    }
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalance(userID).subscribe((response: any) => {
      this.loadingScreenService.stopLoading();
      if (+response.walletBalance >= this.rechargeAmount) {
        this.recharge();
      } else {
        this.insufficientBalance = true;
        this.resetInputValue();
      }
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log('Error occured while checking wallet balance!', err);
      this.resetInputValue();
    });
  }

  resetInputValue(): void {
    this.utilityRechargeForm.reset();
    this.prepaidRechargeForm.reset();
    this.postpaidRechargeForm.reset();
    this.landLineRechargeForm.reset();
    this.utilityTransactionValidated = false;
    this.resetUtilityControl();
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
            this.fUtilityRecharge.invoiceNumber.setValue(innerResponse.billnumber);
            this.fUtilityRecharge.dueDate.setValue(innerResponse.duedate);
            this.validationReferenceID = innerResponse.reference_id;
            this.validationFailed = false;
            this.disableControls();
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
    this.resetInputValue();
    if (this.rechargeMode === 'WATER' || this.rechargeMode === 'GAS' || this.rechargeMode === 'ELECTRICITY') {
      this.resetUtilityControl();
    }
  }
  validateAmount(): void {
  }

  disableControls(): void {
    this.fUtilityRecharge.rechargeAmount.disable();
    this.fUtilityRecharge.customerName.disable();
    this.fUtilityRecharge.invoiceNumber.disable();
    this.fUtilityRecharge.dueDate.disable();
    this.fUtilityRecharge.operatorName.disable();
    this.fUtilityRecharge.consumerNumber.disable();
    this.fUtilityRecharge.mobileNumber.disable();
  }
  enableControls(): void {
    this.fUtilityRecharge.rechargeAmount.enable();
    this.fUtilityRecharge.customerName.enable();
    this.fUtilityRecharge.invoiceNumber.enable();
    this.fUtilityRecharge.dueDate.enable();
    this.fUtilityRecharge.operatorName.enable();
    this.fUtilityRecharge.consumerNumber.enable();
    this.fUtilityRecharge.mobileNumber.enable();
  }
  resetUtilityControl(): void {
    this.enableControls();
    // this.changeView(this.rechargeMode);
  }
}
