import { Component, OnInit } from '@angular/core';
// import { Message, ChannelNameEnum } from '../store/models/message.model';
import { DataService } from "../services/data.service/data.service";
// import { StoreService } from '../store/store.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isEmployee: boolean = false;
  public isSuperAdmin: boolean = false;
  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      if (message == 'employee') {
        this.isEmployee = true;
      }
      else {
        if (message == 'super admin') {
          this.isSuperAdmin = true;
        }
        else {
          this.isSuperAdmin = false;
          this.isEmployee = false;
        }

      }
    });
  }

}
