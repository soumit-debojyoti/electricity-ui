import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deduct-wallet-balance',
  templateUrl: './deduct-wallet-balance.component.html',
  styleUrls: ['./deduct-wallet-balance.component.css']
})
export class DeductWalletBalanceComponent implements OnInit {

  constructor(private auth: AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }



  ngOnInit() {
  }

  public walletpage(): void {
    this.router.navigate(['/wallet', { type: 'deduct' }]);
  }


}
