import { Component, OnInit, Inject } from '@angular/core';
import { GenerateTokenService } from './generate-token.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {
  public name: string;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private generateTokenService: GenerateTokenService) { }

  ngOnInit() {
    this.name = this.storage.get('login_user');
  }

  generateToken() {
    this.generateTokenService.GetToken(this.name)
      .subscribe((response: any) => {
        if (response) {
          if (response == 'suspend') {
            this.ErrorSuspend();
          }
          else if (response == 'insufficient_balance') {
            this.ErrorGenerateToken();
          } else {
            this.Success(response);
            //alert(`Your token is ${response}`);
          }
        }
        else {
          this.ErrorGenerateToken();
        }
      }, () => {
      })
  }

  private ErrorGenerateToken() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'You dont have sufficient balance to generate token!',
      footer: 'Please add balance to generate token.'
    })
  }

  private ErrorSuspend() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Your wallet is suspended.!'
    })
  }
  private Success(token: string) {
    Swal.fire({
      type: 'success',
      title: 'Token',
      text: `Your token is ${token}`
    })
  }

}
