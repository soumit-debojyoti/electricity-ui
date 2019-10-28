import { Component, OnInit, Inject } from '@angular/core';
import { GenerateTokenService } from './generate-token.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AlertService } from 'src/app/services/common.service/alert.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { DataService } from 'src/app/services/data.service/data.service';
import { UserLog } from 'src/app/models/wallet-balance-report.model';
import { UserService } from 'src/app/services/user.service/user.service';
import { TalkBackService } from 'src/app/services/user.service/talk-back.service';
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {
  public privilageAccess: boolean;
  public name: string;
  users: UserLog[];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private generateTokenService: GenerateTokenService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService, private data: DataService,
    private userService: UserService, private talkService: TalkBackService) { }

  ngOnInit() {
    this.name = this.storage.get('login_user');
    this.storage.get('role_id') === 4 ? this.privilageAccess = true : this.privilageAccess = false;
    this.userService.getAllUsers().subscribe((response: Array<UserLog>) => {
      this.users = response;
    });
  }

  generateToken() {
    this.alertService.confirmationPromissMessage('', 'Are you sure you want to generate token!!!!',
      'warning', true, true, 'Generate Token', 'Cancel')
      .then((result) => {
        if (result.value) {
          this.loadingScreenService.startLoading();
          this.generateTokenService.GetToken(this.name)
            .subscribe((response: any) => {
              this.loadingScreenService.stopLoading();
              if (response) {
                if (response === 'suspend') {
                  this.ErrorSuspend();
                } else if (response === 'insufficient_balance') {
                  this.ErrorGenerateToken();
                } else {
                  this.Success(response);
                }
              } else {
                this.ErrorGenerateToken();
              }
            }, () => {
              this.loadingScreenService.stopLoading();
            });
        }
      });
  }

  private ErrorGenerateToken() {
    this.alertService.confirmationMessage('', 'You dont have sufficient balance to generate token!',
      'error', true, false, 'Ok', '', 'Please add balance to generate token.');
  }

  private ErrorSuspend() {
    this.alertService.confirmationMessage('', 'Your wallet is suspended.!',
      'error', true, false, 'Ok', '', '');
  }
  private Success(token: string) {
    this.alertService.confirmationMessage('Token', `Your token is ${token}`,
      'success', true, false, 'Ok', '', '');
    this.data.changeMessage('token-generate');
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalance(this.storage.get('user_id'))
      .subscribe(responseBalance => {
        this.loadingScreenService.stopLoading();
        this.userService.setLocalWalletBalance(responseBalance.walletBalance);
        this.talkService.newTokenGenerated.next(true);
        // this.balance = responseBalance.walletBalance;
      }, (err) => {
        console.log('Error occured while generating token', err);
      });
  }

  private changeUser(user_name: string): void {
    this.name = user_name;
  }
}
