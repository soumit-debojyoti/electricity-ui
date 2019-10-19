import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { environment } from '../environments/environment';
// import { AutoLogoutService } from './services/auto-logout-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'innovation-proj';
  public statusOnline: boolean;
  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.statusOnline = true;
    this.connectionService.monitor().subscribe(isConnected => {
      this.statusOnline = isConnected;
    });
  }
}
