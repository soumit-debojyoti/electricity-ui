import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge-transaction-report',
  templateUrl: './recharge-transaction-report.component.html',
  styleUrls: ['./recharge-transaction-report.component.css']
})
export class RechargeTransactionReportComponent implements OnInit {

  constructor(private auth: AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }

  ngOnInit() {
  }

  public walletpage(): void {
    this.router.navigate(['/wallet', { type: 'rechargetransactionreport' }]);
  }

}
