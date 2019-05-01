import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service/user.service'
import { FormBuilder } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { RankAchieverModel, ParentModel, ChildModel, SiblingModel } from '../../models/rank-chiever.model';
import { DataService } from '../../services/data.service/data.service';

@Component({
  selector: 'app-rank-achiever-list',
  templateUrl: './rank-achiever-list.component.html',
  styleUrls: ['./rank-achiever-list.component.css']
})
export class RankAchieverListComponent implements OnInit {
  public user_id: number;
  public parent: ParentModel;
  public children: Array<ChildModel>;
  public siblings: Array<SiblingModel>;
  constructor(private userService: UserService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private data: DataService) { }

  ngOnInit() {
    debugger;

    this.data.currentMessage.subscribe(message => {
      if (this.storage.get('user_id') != undefined) {
        this.user_id = this.storage.get('user_id');
        this.getRankAchieverList(this.user_id);
      }
    });

  }

  private getRankAchieverList(user_id: number): void {
    debugger;
    this.userService.getRankAchieverList(user_id)
      .subscribe((response: RankAchieverModel) => {
        debugger;
        this.parent = response.parent;
        this.children = response.children;
        this.siblings = response.siblings;
        ///this.addressProofs = response;
      });
  }

  public details() {
    this.router.navigate(['/rank-achiever-list']);
  }
}
