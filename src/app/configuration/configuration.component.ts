import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service/common.service';
import { ConfigurationModel } from '../models/configuration.model';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IntroducerBonus } from '../models/common.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  public referal_wallet_balance_deduct_amount: number;
  public down_side_direct_numer_of_joinee: number;
  public down_side_direct_of_joinee_point: number;
  public point_unit_price: number;
  public first_registration_wallet_balance: number;
  public wallet_approver_role: number;
  public kyc_submission_days: number;
  public config: ConfigurationModel;
  // Added for Bonus Information
  public viewBonusInfoForm: FormGroup;
  public levelBonusInfoList: Array<IntroducerBonus>;
  public bonusMode: boolean;
  public configMode: boolean;
  constructor(private common: CommonService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.referal_wallet_balance_deduct_amount = 0;
    this.down_side_direct_numer_of_joinee = 0;
    this.down_side_direct_of_joinee_point = 0;
    this.point_unit_price = 0;
    this.first_registration_wallet_balance = 0;
    this.wallet_approver_role = 0;
    this.kyc_submission_days = 0;
    this.getConfiguration();
    this.viewBonusInfoForm = this.formBuilder.group( {
      referralAmount: ['', Validators.required],
      monthlyAmount: ['', Validators.required]
    });
    this.levelBonusInfoList = [];
    this.bonusMode = false;
    this.configMode = true;

  }
  get viewFormControl() {
    return this.viewBonusInfoForm.controls;
  }
  private getConfiguration() {
    this.loadingScreenService.startLoading();
    this.common.getConfiguration()
      .subscribe((configuration: ConfigurationModel) => {
        this.loadingScreenService.stopLoading();
        this.referal_wallet_balance_deduct_amount = configuration.referal_wallet_balance_deduct_amount;
        this.down_side_direct_numer_of_joinee = configuration.down_side_direct_numer_of_joinee;
        this.down_side_direct_of_joinee_point = configuration.down_side_direct_of_joinee_point;
        this.point_unit_price = configuration.point_unit_price;
        this.first_registration_wallet_balance = configuration.first_registration_wallet_balance;
        this.wallet_approver_role = configuration.wallet_approver_role;
        this.kyc_submission_days = configuration.kyc_submission_days;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public submitConfiguration() {
    this.config = {
      referal_wallet_balance_deduct_amount: +this.referal_wallet_balance_deduct_amount,
      down_side_direct_numer_of_joinee: +this.down_side_direct_numer_of_joinee,
      down_side_direct_of_joinee_point: +this.down_side_direct_of_joinee_point,
      point_unit_price: +this.point_unit_price,
      first_registration_wallet_balance: +this.first_registration_wallet_balance,
      wallet_approver_role: +this.wallet_approver_role,
      kyc_submission_days: +this.kyc_submission_days
    };
    this.loadingScreenService.startLoading();
    this.common.setConfiguration(this.config)
      .subscribe(result => {
        this.loadingScreenService.stopLoading();
        if (result === 'success') {
          this.alertService.confirmationMessage('',
            'The configuration setting has been updated. Please logout and login again for better effect of configuration.',
            'success', true, false);
          this.getConfiguration();
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public fetchBonusInfo(): void {
    this.loadingScreenService.startLoading();
    this.common.fetchLevelInfo().subscribe( (response: Array<IntroducerBonus>) => {
      this.levelBonusInfoList = response;
      this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
    });
  }

  public changeView(viewMode: string): void {
    if ( viewMode === 'Bonus Info') {
      this.bonusMode = true;
      this.configMode = false;
      this.fetchBonusInfo();
    }
    if ( viewMode === 'Registration Info') {
      this.bonusMode = false;
      this.configMode = true;
    }
  }

  public checkValidNumber(info: IntroducerBonus): void {
    info.validBonus = true;
  }

  updateLevel(info: IntroducerBonus, referralAmount: number, monthlyAmount: number, rc: any, pc: any): void {
    console.log('update level called.');
    if ( this.viewFormControl.referralAmount.touched &&
      this.viewFormControl.referralAmount.status === 'VALID') {
        info.referralBonus = referralAmount;
      }
      if ( this.viewFormControl.monthlyAmount.touched &&
        this.viewFormControl.monthlyAmount.status === 'VALID') {
          info.monthlyPayout = monthlyAmount;
        }
    this.loadingScreenService.startLoading();
    this.common.updateLevelInfo(info).subscribe( (response: boolean) => {
      this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
    });
  }
}
