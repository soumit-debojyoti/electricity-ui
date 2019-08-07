import { Component, OnInit, Inject } from '@angular/core';
import { GenerateTokenService } from './generate-token.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/common.service/alert.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { DataService } from 'src/app/services/data.service/data.service';
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {
  public name: string;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private generateTokenService: GenerateTokenService, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService, private data: DataService) { }

  ngOnInit() {
    this.name = this.storage.get('login_user');
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
  }
}
