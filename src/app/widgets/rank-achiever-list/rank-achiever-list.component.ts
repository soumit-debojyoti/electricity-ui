import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service/user.service';
import { FormBuilder } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { RankAchieverModel, ParentModel, ChildModel, SiblingModel, RankAchieverCountModel } from '../../models/rank-chiever.model';
import { DataService } from '../../services/data.service/data.service';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-rank-achiever-list',
  templateUrl: './rank-achiever-list.component.html',
  styleUrls: ['./rank-achiever-list.component.css']
})
export class RankAchieverListComponent implements OnInit {
  public user_id: number;
  public childrenCount: number;
  public siblingsCount: number;
  public userRank: number;
  constructor(private userService: UserService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private data: DataService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.userRank = 0;
    this.childrenCount = 0;
    this.siblingsCount = 0;
    this.loadingScreenService.startLoading();
    this.data.currentMessage.subscribe(message => {
      this.loadingScreenService.stopLoading();
      if (this.storage.get('user_id') !== undefined) {
        this.user_id = this.storage.get('user_id');
        this.getRankAchieverCount(this.user_id);
        this.fetchUserRank(this.user_id);
      }
    }, () => {
      this.loadingScreenService.stopLoading();
    });


  }

  private getRankAchieverCount(user_id: number): void {
    this.loadingScreenService.startLoading();
    this.userService.getRankAchieverCount(user_id)
      .subscribe((response: RankAchieverCountModel) => {
        this.loadingScreenService.stopLoading();
        this.childrenCount = response.childrenCount;
        this.siblingsCount = response.siblingsCount;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public details() {
    this.router.navigate(['/rank-achiever-list']);
  }

  private fetchUserRank(user_id: number): void {
    this.loadingScreenService.startLoading();
    this.userService.fetchUserRank(user_id).subscribe(
      response => {
        this.loadingScreenService.stopLoading();
        this.userRank = response;
      }, () => {
        this.loadingScreenService.stopLoading();
      }
    );
  }
}
