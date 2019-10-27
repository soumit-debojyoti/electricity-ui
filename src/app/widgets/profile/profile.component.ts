import { Component, OnInit, Directive, Inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { User } from 'src/app/models/user.model';
import { forkJoin } from 'rxjs';
import { DataService } from '../../services/data.service/data.service';
// import { StoreService } from 'src/app/store/store.service';
// import { ChannelNameEnum, Message } from 'src/app/store/models/message.model';
import { environment } from '../../../environments/environment';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { UserWalletBalanceResponse } from 'src/app/models/user-wallet-balance-response.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public city: string;
  public state_name: string;
  public dob: string;
  public sex: string;
  public email: string;
  public role: string;
  public name: string;
  public mobile: string;
  public photo: string;
  public balance: number;
  public userRank: number;
  private rootURL = environment.baseUrl;
  constructor(private profileService: ProfileService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private userService: UserService,
    private loadingScreenService: LoadingScreenService) {
    this.name = '';
    this.full_name = '';
  }

  ngOnInit() {
    this.userRank = 0;
    this.data.currentMessage.subscribe(message => {
      if (message === 'token-generate') {
        this.getWalletBalance();
      }
    });
    this.name = this.storage.get('login_user');
    this.user_id = this.storage.get('user_id');
    this.loadingScreenService.startLoading();
    forkJoin(this.profileService.GetUser(this.name), this.userService.fetchUserRank(this.user_id))
      .subscribe(([response, responseRank]) => {
        this.loadingScreenService.stopLoading();
        this.user_id = response.user_id;
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.full_name = this.first_name + ' ' + this.last_name;
        this.city = response.city;
        this.state_name = response.state_name;
        this.mobile = response.mobile_number;
        this.dob = response.dob;
        this.sex = response.sex;
        this.email = response.email;
        this.role = response.role_name;
        this.photo = response.photo;
        this.photo = this.rootURL + this.photo;
        this.storage.set('role', this.role);
        // this.storage.set('user_id', this.user_id);
        const message: User = response;
        this.data.changeMessage(this.role);
        if (responseRank !== undefined) {
          this.userRank = responseRank;
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private getWalletBalance(): void {
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalance(this.user_id)
      .subscribe((response: UserWalletBalanceResponse) => {
        this.loadingScreenService.stopLoading();
        if (response !== undefined) {
          this.balance = response.walletBalance;
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

}
