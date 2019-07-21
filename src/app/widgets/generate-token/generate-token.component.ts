import { Component, OnInit, Inject } from '@angular/core';
import { GenerateTokenService } from './generate-token.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/common.service/alert.service';
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {
  public name: string;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private generateTokenService: GenerateTokenService, private alertService: AlertService) { }

  ngOnInit() {
    this.name = this.storage.get('login_user');
  }

  generateToken() {
    this.generateTokenService.GetToken(this.name)
      .subscribe((response: any) => {
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
      });
  }

  private ErrorGenerateToken() {
    this.alertService.confirmationMessage('', 'You dont have sufficient balance to generate token!',
      'error', true, false, '', '', 'Please add balance to generate token.');
  }

  private ErrorSuspend() {
    this.alertService.confirmationMessage('', 'Your wallet is suspended.!',
      'error', true, false, '', '', '');
  }
  private Success(token: string) {
    this.alertService.confirmationMessage('Token', `Your token is ${token}`,
      'success', true, false, '', '', '');
  }
}
