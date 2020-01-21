import { Component, OnInit, ViewChild } from '@angular/core';
import { RechargeAPI } from '../../app/models/common.model';
import { CommonService } from '../services/common.service/common.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent implements OnInit {
  public rechargeType: string;
  public operatorName: string;
  public apiValue: string;
  public confirmation: string;
  public validationApiValue: string;
  public validationRequired: boolean;
  public confirmationTypes: Array<string>;
  public apiAddedSuccessfully: boolean = false;
  public rechargeTypes: Array<string>;
  // Added for update API info
  @ViewChild('f',  {static: false}) public userFrm: NgForm;
  public apiInfoList: Array<RechargeAPI> = [];
  public selectedRechargeAPI: RechargeAPI;
  public filteredApiInfoList: Array<RechargeAPI> = [];
  public add: boolean;
  public update: boolean;
  public apiUpdatedSuccessfully: boolean = false;
  constructor(private commonService: CommonService, private loadingScreenService: LoadingScreenService) {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID', 'ELECTRICITY', 'GAS', 'WATER', 'LANDLINE'];
    this.confirmationTypes = ['Yes', 'No'];
  }

  ngOnInit() {
    this.update = false;
    this.add = true;
  }
/**
 * Recharge Type
 */
  changeRechargeType(rechargeTypeControl: any): void {
    console.log(this.rechargeType);
    this.fetchRechargeAPIInfo(this.rechargeType);
  }

  AddAPI(): void {
    console.log('Add API submit button clicked');
    this.loadingScreenService.startLoading();
    this.commonService.saveRechargeAPI(this.rechargeType, this.operatorName, this.apiValue).subscribe(
      (response: boolean) => {
        this.loadingScreenService.stopLoading();
        this.apiAddedSuccessfully = response;
        if (response) {
          if ( this.confirmation.toLowerCase() === 'yes') {
            this.loadingScreenService.startLoading();
            this.commonService.saveRechargeAPIValidation(this.rechargeType, this.operatorName, this.validationApiValue).subscribe(
              (innerResponse: boolean) => {
                this.loadingScreenService.stopLoading();
                console.log( innerResponse );
              }, (err) => {
                console.log(err);
                this.loadingScreenService.stopLoading();
              }
            );
          }
        }
      }, (err) => {
        console.log(err);
        this.loadingScreenService.stopLoading();
      }
    );
  }
  changeConfirmation(): void {
    if ( this.confirmation.toLowerCase() === 'yes') {
      this.validationRequired = true;
    } else {
      this.validationRequired = false;
    }
  }

  /**
   * Added for Update recharge API info
   */

  fetchRechargeAPIInfo(rechargeMode: string): void {
    this.loadingScreenService.startLoading();
    this.commonService.getRechargeAPIInfo(rechargeMode).subscribe((response: Array<RechargeAPI>) => {
      this.apiInfoList = response;
      this.filteredApiInfoList = this.apiInfoList.filter( x => x.rechargeMode);
      this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    }
    );

  }

  changeOperatorName(): void {
    this.selectedRechargeAPI = this.filteredApiInfoList.find( x => x.operatorName === this.operatorName &&
      x.rechargeMode === this.rechargeType);
      this.apiValue = this.selectedRechargeAPI.apiValue.toString();
      this.fetchApiValidationInfo();
  }

  fetchApiValidationInfo(): void {
    this.commonService.fetchValidationAPIDetails(this.rechargeType, this.operatorName).subscribe(
      (response: any) => {
        this.validationApiValue = response.apiValue;
      }, (err) => {
        console.log('error occured', err);
      }
    );
  }
  changeView(mode: string): void {
    if ( mode === 'add') {
       this.add = true;
       this.update = false;
    } else {
      this.update = true;
      this.add = false;
    }
  }

  updateAPI(f: any): void {
    this.commonService.updateRechargeAPI(this.rechargeType, this.operatorName, this.apiValue).subscribe
    ( (response: boolean) => {
      if ( response && this.validationApiValue) {
        this.commonService.updateRechargeAPIValidation(
          this.rechargeType, this.operatorName, this.validationApiValue
        ).subscribe((innerResponse: boolean) => {
            this.apiUpdatedSuccessfully = innerResponse;
        }, (err) => {
          console.log('error occured while updating validation api', err);
        });
      } else {
        console.log('No Validation API to update');
        this.apiUpdatedSuccessfully = response;
      }
      this.userFrm.reset();
    }, (err) => {
      console.log('error occured while updating recharge api', err);
    });
  }
}
