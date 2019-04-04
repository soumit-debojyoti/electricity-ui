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
  public isAdmin: boolean = false;
  constructor(private data: DataService) {
    debugger;
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      debugger;
      if (message == 'admin') {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
    });
  }

}
