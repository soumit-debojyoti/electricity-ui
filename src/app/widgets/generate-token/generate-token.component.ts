import { Component, OnInit, Inject } from '@angular/core';
import { GenerateTokenService } from './generate-token.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

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
            alert(`Your wallet is suspended.`);
          }
          else if (response == 'insufficient_balance') {
            alert(`You dont have sufficient balance to generate token.`);
          } else {
            alert(`Your token is ${response}`);
          }
        }
        else {
          alert(`You dont have sufficient balance to generate token.`);
        }
      }, () => {
      })
  }

}
