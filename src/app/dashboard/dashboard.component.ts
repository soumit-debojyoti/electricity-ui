import { Component, OnInit, Inject } from '@angular/core';
// import { Message, ChannelNameEnum } from '../store/models/message.model';
import { DataService } from '../services/data.service/data.service';
import { User } from '../models/user.model';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { ProfileService } from '../widgets/profile/profile.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isEmployee: boolean;
  public isAdmin: boolean;
  public isSuperAdmin: boolean;
  public isUser: boolean;
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public city: string;
  public state_name: string;
  public dob: string;
  public sex: string;
  public role: string;
  public name: string;
  public photo: string;
  constructor(private profileService: ProfileService,
    private data: DataService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
    this.isEmployee = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.isUser = false;
    this.GetUserRoleInformaion();

    // this.data.currentMessage.subscribe(message => {

    // });
  }

  private GetUserRoleInformaion(): void {
    this.name = this.storage.get('login_user');
    this.loadingScreenService.startLoading();
    this.profileService.GetUser(this.name)
      .subscribe((response: User) => {
        this.loadingScreenService.stopLoading();
        this.role = response.role_name;
        if (this.role === 'employee') {
          this.isEmployee = true;
        } else {
          if (this.role === 'super admin') {
            this.isSuperAdmin = true;
          } else if (this.role === 'admin') {
            this.isAdmin = true;
          } else if (this.role === 'user') {
            this.isUser = true;
          } else {
            this.isSuperAdmin = false;
            this.isEmployee = false;
            this.isAdmin = false;
            this.isUser = false;
          }
        }
        this.storage.set('username', response.first_name + ' ' + response.last_name);
        this.storage.set('mobileno', response.mobile_number);
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

}
