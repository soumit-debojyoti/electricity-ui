import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service/common.service';
import { DataService } from 'src/app/services/data.service/data.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-widthdrawal-request',
  templateUrl: './widthdrawal-request.component.html',
  styleUrls: ['./widthdrawal-request.component.css']
})
export class WidthdrawalRequestComponent implements OnInit {
  public user_id: number;
  public isWithdrawalRequestSend: boolean;
  constructor(private auth: AuthService, private common: CommonService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private data: DataService,
    private loadingScreenService: LoadingScreenService) { }



  ngOnInit() {
    this.isWithdrawalRequestSend = false;
    this.loadingScreenService.startLoading();
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      this.user_id = this.storage.get('user_id');
      this.getWithdrawalRequestFinder(this.user_id);
    }, () => {
      this.loadingScreenService.stopLoading();
    });
  }

  public walletpage(): void {
    this.router.navigate(['/wallet', { type: 'withdrawal' }]);
  }

  private getWithdrawalRequestFinder(userId: number): void {
    this.loadingScreenService.startLoading();
    this.common.getWithdrawalRequestFinder(userId)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event === true) {
            this.isWithdrawalRequestSend = true;
          } else {
            this.isWithdrawalRequestSend = false;
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

}
