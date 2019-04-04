import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { User } from 'src/app/models/user.model';
import { DataService } from "../../services/data.service/data.service";
// import { StoreService } from 'src/app/store/store.service';
// import { ChannelNameEnum, Message } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public city: string;
  public state_name: string;
  public dob: string;
  public sex: string;
  public role: string;
  public name: string;
  constructor(private profileService: ProfileService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService) {
    this.name = ''
    this.full_name = '';
  }

  ngOnInit() {
    debugger;
    this.name = this.storage.get('login_user');
    this.profileService.GetUser(this.name)
      .subscribe((response: User) => {
        debugger;
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.full_name = this.first_name + " " + this.last_name;
        this.city = response.city;
        this.state_name = response.state_name;
        this.dob = response.dob;
        this.sex = response.sex;
        this.role = response.role_name;
        this.storage.set('role', this.role);
        const message: User = response;

        this.data.changeMessage(this.role);
        // this.storeService.SetData(message, ChannelNameEnum.profile_to_dashboard.toString());
      });
  }

}
