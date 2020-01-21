import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RechargeAPI, CommissionSetting } from '../models/common.model';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { CommonService } from '../services/common.service/common.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-commission-setting',
  templateUrl: './commission-setting.component.html',
  styleUrls: ['./commission-setting.component.css']
})
export class CommissionSettingComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  removed = false;
  public apiInfoList: Array<RechargeAPI>;
  public commissionType: Array<string>;
  public paymentType: Array<string>;
  public addedSuccessfully = false;
  public removeSuccessfully = false;
  public addedCommissions: Array<CommissionSetting>;
  servicesColumn: string[];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSourceForCommissionSetting: MatTableDataSource<CommissionSetting>;
  constructor(private formBuilder: FormBuilder, private common: CommonService,
    private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
    this.apiInfoList = new Array<RechargeAPI>();
    this.dynamicForm = this.formBuilder.group({
      rechargeType: ['', Validators.required],
      operatorName: ['', Validators.required],
      commissionType: ['', Validators.required],
      paymentType: ['', Validators.required],
      amount: ['', Validators.required],
      levelPayoutType: ['', Validators.required],
      levelPayoutAmount: ['', Validators.required]
    });
    this.commissionType = ['Service Charge', 'Commission'];
    this.paymentType = ['Percentage', 'Amount'];
    this.servicesColumn =
            ['rechargeType', 'operatorName', 'commissionType',
              'calculationType', 'value',
              'levelPayoutType', 'levelPayoutValue', 'action'];
    this.addedCommissions = new Array<CommissionSetting>();
    this.getAllCommissionsAdded();
  }
  changeRechargeType(): void {
    this.loadingScreenService.startLoading();
    this.common.getRechargeAPIInfo(this.f.rechargeType.value).subscribe((response: Array<RechargeAPI>) => {
      this.apiInfoList = response;
      this.loadingScreenService.stopLoading();
      if (this.apiInfoList.length > 0) {
        this.dynamicForm.controls.operatorName.setValue(this.apiInfoList[0].operatorName);
      }
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    }
    );
  }
  get f() { return this.dynamicForm.controls; }
  addCommission(): void {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      alert('Invalid form can not be submitted!!');
      return;
    }
    var cs = new CommissionSetting();
    cs.rechargeType = this.dynamicForm.controls.rechargeType.value;
    cs.operatorName = this.dynamicForm.controls.operatorName.value;
    cs.commissionType = this.dynamicForm.controls.commissionType.value;
    cs.calculationType = this.dynamicForm.controls.paymentType.value;
    cs.value = this.dynamicForm.controls.amount.value;
    cs.levelPayoutType = this.dynamicForm.controls.levelPayoutType.value;
    cs.levelPayoutValue = this.dynamicForm.controls.levelPayoutAmount.value;
    this.loadingScreenService.startLoading();
    this.common.addCommissionSetting(
      cs
    ).subscribe((response: boolean) => {
      this.loadingScreenService.stopLoading();
      this.addedSuccessfully = response;
      if (response) {
        this.dynamicForm.reset();
        this.dynamicForm.markAsUntouched();
        this.getAllCommissionsAdded();
      }
      this.removed = !response;
    }, (err) => {
      console.log('Error occured while adding commission details', err);
      this.loadingScreenService.stopLoading();
    });
  }

  onReset(): void {
    this.dynamicForm.reset();
  }

  getAllCommissionsAdded(): void {
    this.loadingScreenService.startLoading();
    this.common.fetchCommissionSetting().subscribe(
      (response: Array<CommissionSetting>) => {
        this.addedCommissions = response;
        this.loadingScreenService.stopLoading();
        this.dataSourceForCommissionSetting = new MatTableDataSource(response);
        this.dataSourceForCommissionSetting.paginator = this.paginator;
    }, (err) => {
      console.log('error occured while fetching all commissions added', err);
      this.loadingScreenService.stopLoading();
    });
  }
  removeCS(cs: CommissionSetting): void {
    this.removed = true;
    this.loadingScreenService.startLoading();
    this.common.removeCommissionSetting(cs).subscribe(response => {
      this.removeSuccessfully = response;
      this.loadingScreenService.stopLoading();
      if ( response) {
        this.getAllCommissionsAdded();
      }
      this.submitted = !response;
    }, (err) => {
      console.log(err, ' occured at commission setting while removing');
      this.loadingScreenService.stopLoading();
    });
  }

  public logout() {
    //needs to implemented
    console.log('Seperate component');
  }
}
