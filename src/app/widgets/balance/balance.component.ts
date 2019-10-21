import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataService } from 'src/app/services/data.service/data.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  public user_id: number;
  public balance: number;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private data: DataService, private userService: UserService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.user_id = this.storage.get('user_id');
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalance(this.user_id)
      .subscribe(responseBalance => {
        this.loadingScreenService.stopLoading();
        this.balance = responseBalance.walletBalance;
      });
  }

}
