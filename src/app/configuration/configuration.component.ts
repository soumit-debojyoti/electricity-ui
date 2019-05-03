import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service/common.service';
import { ConfigurationModel } from '../models/configuration.model';

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
  public config: ConfigurationModel;
  constructor(private common: CommonService) {
  }

  ngOnInit() {
    this.referal_wallet_balance_deduct_amount = 0;
    this.down_side_direct_numer_of_joinee = 0;
    this.down_side_direct_of_joinee_point = 0;
    this.point_unit_price = 0;
    this.first_registration_wallet_balance = 0;
    this.getConfiguration();
  }

  private getConfiguration() {
    this.common.getConfiguration()
      .subscribe((configuration: ConfigurationModel) => {
        this.referal_wallet_balance_deduct_amount = configuration.referal_wallet_balance_deduct_amount;
        this.down_side_direct_numer_of_joinee = configuration.down_side_direct_numer_of_joinee;
        this.down_side_direct_of_joinee_point = configuration.down_side_direct_of_joinee_point;
        this.point_unit_price = configuration.point_unit_price;
        this.first_registration_wallet_balance = configuration.first_registration_wallet_balance;
      });
  }

  public submitConfiguration() {
    this.config =
      {
        referal_wallet_balance_deduct_amount: +this.referal_wallet_balance_deduct_amount,
        down_side_direct_numer_of_joinee: +this.down_side_direct_numer_of_joinee,
        down_side_direct_of_joinee_point: +this.down_side_direct_of_joinee_point,
        point_unit_price: +this.point_unit_price,
        first_registration_wallet_balance: +this.first_registration_wallet_balance
      };
    this.common.setConfiguration(this.config)
      .subscribe(result => {
        if (result == 'success') {
          this.getConfiguration();
        }
      });
  }
}
