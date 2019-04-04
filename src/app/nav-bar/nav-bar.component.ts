import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service/data.service';
import { AuthService } from '../services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLogin: boolean = false;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      debugger;
      if (this.storage.get('login_user') != undefined) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    });
  }


  logout() {
    this.isLogin = false;
    this.auth.logout();
  }

}
