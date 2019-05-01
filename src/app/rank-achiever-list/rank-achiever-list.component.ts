import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service/data.service';
import { UserService } from '../services/user.service/user.service';
import { SiblingModel, ChildModel, ParentModel, RankAchieverModel, OwnModel } from '../models/rank-chiever.model';

@Component({
  selector: 'app-rank-achiever-list',
  templateUrl: './rank-achiever-list.component.html',
  styleUrls: ['./rank-achiever-list.component.css']
})
export class RankAchieverListComponent implements OnInit {
  public user_id: number;
  public parent: ParentModel;
  public self: OwnModel;
  public children: Array<ChildModel>;
  public siblings: Array<SiblingModel>;
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private data: DataService) { }

  ngOnInit() {
    if (this.storage.get('user_id') != undefined) {
      this.user_id = this.storage.get('user_id');
      this.getRankAchieverList(this.user_id);
    }
  }
  private getRankAchieverList(user_id: number): void {
    debugger;
    this.userService.getRankAchieverList(user_id)
      .subscribe((response: RankAchieverModel) => {
        debugger;
        this.self = response.self;
        this.parent = response.parent;
        this.children = response.children;
        this.siblings = response.siblings;
      });
  }
}
