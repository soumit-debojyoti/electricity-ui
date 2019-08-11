import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/common.service/alert.service';
import { CommonService } from 'src/app/services/common.service/common.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-revive-token',
  templateUrl: './revive-token.component.html',
  styleUrls: ['./revive-token.component.css']
})
export class ReviveTokenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public reviveToken(): void {
    this.router.navigate(['/reactivate-token']);
  }

}
