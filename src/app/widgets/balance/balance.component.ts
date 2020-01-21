import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataService } from 'src/app/services/data.service/data.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { TalkBackService } from 'src/app/services/user.service/talk-back.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit, OnDestroy  {
  public user_id: number;
  public balance: number;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private data: DataService, private userService: UserService,
    private loadingScreenService: LoadingScreenService, private talkService: TalkBackService) {
      this.talkService.newTokenGenerated.subscribe( (response: boolean) => {
        if (response) {
          this.balance = this.userService.getLocalWalletBalance();
        }
      });
    }

  ngOnInit() {
    this.user_id = this.storage.get('user_id');
    this.fetchBalance();
  }
  ngOnDestroy() {
}
fetchBalance(): void {
  this.loadingScreenService.startLoading();
    this.userService.getWalletBalance(this.user_id)
      .subscribe(responseBalance => {
        this.loadingScreenService.stopLoading();
        this.userService.setLocalWalletBalance(responseBalance.walletBalance);
        // this.balance = responseBalance.walletBalance;
        this.balance = this.userService.getLocalWalletBalance();
      }, (err) => {
        this.loadingScreenService.stopLoading();
        console.log(err);
      });
}
    refreshBalance(): void {
      this.fetchBalance();
    }
}
