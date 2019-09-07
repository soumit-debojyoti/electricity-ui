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
  public insufficientBalance: boolean = false;
  constructor(private common: CommonService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private userService: UserService) { }

  ngOnInit() {
    this.rechargeTypes = ['PREPAID', 'DTH', 'POSTPAID'];
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
    const userID = this.storage.get('user_id');
    this.common.insertTransaction(this.rechargeMode, userID, this.rechargeAmount.toString()).subscribe(
      (response: number) => {
        rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#Mobile#', this.mobileNumber.toString());
        rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#Amount#', this.rechargeAmount.toString());
        rechargeAPI.apiValue = rechargeAPI.apiValue.replace('#Order#', response.toString());
        console.log(rechargeAPI.apiValue );
        this.common.recharge(rechargeAPI.apiValue).subscribe( (innerResponse: any) => {
          console.log('Recharge Sub called');
          console.log(innerResponse);
        }, (err) => {
          console.log('error has occured in recharge page -', err);
        });
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

}
