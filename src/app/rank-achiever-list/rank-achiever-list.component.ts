import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service/data.service';
import { UserService } from '../services/user.service/user.service';
import { SiblingModel, ChildModel, ParentModel, RankAchieverModel, OwnModel } from '../models/rank-chiever.model';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { RankAchiever } from '../models/common.model';
import { AuthService } from '../services/auth.service/auth.service';

@Component({
  selector: 'app-rank-achiever-list',
  templateUrl: './rank-achiever-list.component.html',
  styleUrls: ['./rank-achiever-list.component.css']
})
export class RankAchieverListComponent implements OnInit {
  public user_id: number;
  public parent: ParentModel;
  public self: OwnModel;
  public children: Array<ChildModel> = [];
  public siblings: Array<SiblingModel> = [];
  public rankAchievers: Array<RankAchiever> = [];
  public viewMode: string = 'self';
  public role_id = 0;
  constructor(private userService: UserService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
    private data: DataService, private auth: AuthService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    if (this.storage.get('user_id') !== undefined) {
      this.user_id = this.storage.get('user_id');
      this.getRankAchieverList(this.user_id);
    }
    this.role_id = this.storage.get('role_id');
    this.getAllRankAchiever();
  }
  private getRankAchieverList(user_id: number): void {
    this.loadingScreenService.startLoading();
    this.userService.getRankAchieverList(user_id)
      .subscribe((response: RankAchieverModel) => {
        this.loadingScreenService.stopLoading();
        this.self = response.self;
        this.parent = response.parent;
        this.children = response.children;
        this.siblings = response.siblings;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public getAllRankAchiever(): void {
    this.userService.getRankAchiever().subscribe((response: Array<RankAchiever>) => {
      this.rankAchievers = response;
      console.log(this.rankAchievers);
    });
  }
  public logout() {
    this.storage.set('is_login', false);
    this.auth.logout();
  }
  public changeView(value: string) {
    this.viewMode = value;
    console.log('change view called', this.viewMode);
  }
}
