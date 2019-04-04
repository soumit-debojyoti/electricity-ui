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
    debugger;
    this.generateTokenService.GetToken(this.name)
      .subscribe((response) => {
        debugger;
        alert(`Your token is ${response}`);
      })
  }

}
