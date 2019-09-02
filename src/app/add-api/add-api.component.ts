import { Component, OnInit } from '@angular/core';
import { RechargeType } from '../../app/models/common.model';
@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent implements OnInit {
  public rechargeType: string;
  public rechargeTypes: Array<string>;
  constructor() {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID'];
  }

  ngOnInit() {
  }
/**
 * Recharge Type
 */
  changeRechargeType(selectedType: string): void {
    console.log(selectedType);
  }
}
