import { Component, OnInit } from '@angular/core';
import { RechargeType } from '../../app/models/common.model';
import { CommonService } from '../services/common.service/common.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
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
  constructor(private commonService: CommonService, private loadingScreenService: LoadingScreenService) {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID', 'ELECTRICITY', 'GAS', 'WATER'];
    this.confirmationTypes = ['Yes', 'No'];
  }

  ngOnInit() {
  }
/**
 * Recharge Type
 */
  changeRechargeType(): void {
    console.log(this.rechargeType);
  }

  AddAPI(): void {
    console.log('Add API submit button clicked');
    this.commonService.saveRechargeAPI(this.rechargeType, this.operatorName, this.apiValue).subscribe(
      (response: boolean) => {
        console.log( response );
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
}
