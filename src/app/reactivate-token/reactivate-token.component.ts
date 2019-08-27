import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service/data.service';
import { UserService } from '../services/user.service/user.service';
import { SiblingModel, ChildModel, ParentModel, RankAchieverModel, OwnModel } from '../models/rank-chiever.model';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { TokenDetailsGeneric, TokenDetailsSpecific } from '../models/token.model';
import { AlertService } from '../services/common.service/alert.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-reactivate-token',
  templateUrl: './reactivate-token.component.html',
  styleUrls: ['./reactivate-token.component.css']
})
export class ReactivateTokenComponent implements OnInit {
  public token: string;
  public user_id: number;
  public genericTokenList: Array<TokenDetailsGeneric>;
  public specificToken: TokenDetailsSpecific;
  constructor(private userService: UserService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private alertService: AlertService,
    private router: Router, private data: DataService,
    private loadingScreenService: LoadingScreenService, private clipboardService: ClipboardService) { }

  ngOnInit() {
    this.token = '';
    this.genericTokenList = [];
    if (this.storage.get('user_id') !== undefined) {
      this.user_id = this.storage.get('user_id');
      this.getUnusedTokenGenericInformation();
    }
  }

  public reactivate(token: string): void {
    this.userService.reactivateToken(token)
      .subscribe((response: any) => {
        this.loadingScreenService.stopLoading();
        this.alertService.confirmationMessage('',
          response.message,
          'success', true, false);
        this.getUnusedTokenGenericInformation();
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public deactivate(token: string): void {
    this.userService.deactivateToken(token)
      .subscribe((response: any) => {
        this.loadingScreenService.stopLoading();
        this.alertService.confirmationMessage('',
          response.message,
          'success', true, false);
        this.getUnusedTokenGenericInformation();
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public surrender(token: string): void {
    this.userService.surrenderToken(token)
      .subscribe((response: any) => {
        this.loadingScreenService.stopLoading();
        this.alertService.confirmationMessage('',
          response.message,
          'success', true, false);
        this.getUnusedTokenGenericInformation();
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public getSpecificTokenInformation(token: string): void {
    this.getUnusedTokenSpecificInformation(token);
  }

  public copyMessageToClipboard(token: number): void {
    this.clipboardService.copyFromContent(token.toString());
    this.alertService.confirmationMessage('', 'Clipboard copy successful.', 'success', true, false);
  }


  private getUnusedTokenGenericInformation(): void {
    this.loadingScreenService.startLoading();
    this.userService.getUnusedTokenGenericInformation()
      .subscribe((response: Array<TokenDetailsGeneric>) => {
        this.loadingScreenService.stopLoading();
        this.genericTokenList = response;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private getUnusedTokenSpecificInformation(token: string): void {
    this.loadingScreenService.startLoading();
    this.userService.getUnusedTokenSpecificInformation(token)
      .subscribe((response: Array<TokenDetailsSpecific>) => {
        this.loadingScreenService.stopLoading();
        this.specificToken = response[0];
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }
}
