import { Component, OnInit } from '@angular/core';
import { RechargeType } from '../../app/models/common.model';
import { CommonService } from '../services/common.service/common.service';
@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent implements OnInit {
  public rechargeType: string;
  public operatorName: string;
  public apiValue: string;
  public apiAddedSuccessfully: boolean = false;
  public rechargeTypes: Array<string>;
  constructor(private commonService: CommonService) {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID'];
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
      }
    )
  }
}
