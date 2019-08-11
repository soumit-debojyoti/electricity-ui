import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/common.service/alert.service';
import { CommonService } from 'src/app/services/common.service/common.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-balance-transfer',
  templateUrl: './balance-transfer.component.html',
  styleUrls: ['./balance-transfer.component.css']
})
export class BalanceTransferComponent implements OnInit {

  constructor(private router: Router) { }



  ngOnInit() {
  }

  public transferWalletBalances(): void {
    // this.router.navigate(['/transfer-amount']);
  }

}
