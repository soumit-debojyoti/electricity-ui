import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { UserWalletBalanceResponse } from 'src/app/models/user-wallet-balance-response.model';
import { AlertService } from 'src/app/services/common.service/alert.service';
import { CommonService } from 'src/app/services/common.service/common.service';
import { UserService } from 'src/app/services/user.service/user.service';

@Component({
  selector: 'app-balance-request',
  templateUrl: './balance-request.component.html',
  styleUrls: ['./balance-request.component.css']
})
export class BalanceRequestComponent implements OnInit {
  public userId: number;
  constructor(private common: CommonService, private auth: AuthService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private userService: UserService,
    private router: Router,
    private alertService: AlertService) { }



  ngOnInit() {
    this.userId = 0;
  }

  // public walletpage(): void {
  //   this.router.navigate(['/wallet', { type: 'balance' }]);
  // }

  public getWalletBalances(): void {
    this.userId = this.storage.get('user_id');
    this.getWalletBalance();
  }

  private getWalletBalance(): void {
    this.userService.getWalletBalance(this.userId)
      .subscribe((response: UserWalletBalanceResponse) => {
        if (response !== undefined) {
          let html = '';
          if (response.walletBalance > 100) {
            html = `Your wallet balance is <span style='font-weight:bold;'><strong>${response.walletBalance}</strong></span>`;
          } else {
            html = `Your wallet balance is <span style='font-weight:bold;color:red;'><strong>${response.walletBalance}</strong></span>`;
          }
          this.alertService.confirmationMessageHTML('', html, 'success', true, false);
        }
      });
  }

}
