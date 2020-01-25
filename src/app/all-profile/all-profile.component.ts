import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegisterUserModel } from '../models/user.model';
import { UserService } from '../services/user.service/user.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-all-profile',
  templateUrl: './all-profile.component.html',
  styleUrls: ['./all-profile.component.css']
})
export class AllProfileComponent implements OnInit {
  users: Array<RegisterUserModel>;
  selectedUser: RegisterUserModel;
  dataSourceForUsersDetails: MatTableDataSource<RegisterUserModel>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: Array<string>;
  extensionDays: Array<number>;
  loginStatus: string;
  extensionDaysControl = new FormControl('', [Validators.required]);
  daysExtended: boolean;
  extensionSubmitted: boolean;
  constructor(private userService: UserService, private loadingScreenService: LoadingScreenService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.users = new Array<RegisterUserModel>();
    this.selectedUser = new RegisterUserModel();
    this.displayedColumns = ['fisrtName', 'lastName', 'username', 'email', 'mobile', 'action'];
    this.extensionDays = [3, 5, 7];
    this.fetchAllUserDetails();
  }

  fetchAllUserDetails(): void {
    this.loadingScreenService.startLoading();
    this.userService.getAllUsersDetails().subscribe( (response: Array<RegisterUserModel>) => {
      this.users = response;
      this.loadingScreenService.stopLoading();
      this.dataSourceForUsersDetails = new MatTableDataSource(this.users);
      this.dataSourceForUsersDetails.paginator = this.paginator;
      this.dataSourceForUsersDetails.sort = this.sort;
      console.log(this.users);
    }, (err) => {
      console.log('error occured in all-profile-section', err);
      this.loadingScreenService.stopLoading();
    });
  }

  editUserRowData(user: RegisterUserModel): void {
    this.selectedUser = user;
  }
  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }

  handleEditUserOutput(userUpdated: boolean): void {
    if (userUpdated) {
      this.fetchAllUserDetails();
    }
  }

  extendKYCTimeLine(user: RegisterUserModel): void {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.loginStatus = this.selectedUser.kycID > 0 ?
    'Active' : (new Date() > this.selectedUser.extendedDate) ? 'Suspended' : 'Active';
  }

  updateKYCTimeLine(): void {
    if (this.extensionDaysControl.status === 'INVALID') {
      alert('please select for how many days the extension to be');
      return;
    }
    this.selectedUser.extendedDate = new Date(this.selectedUser.extendedDate);
    this.selectedUser.extendedDate = new
    Date(this.selectedUser.extendedDate.setDate(this.selectedUser.extendedDate.getDate() + +this.extensionDaysControl.value));
    this.extensionSubmitted = true;
    this.loadingScreenService.startLoading();
    this.userService.extendKYCSubmissionDate(this.selectedUser.username, this.selectedUser.extendedDate).subscribe(
      (response: boolean) => {
        this.loadingScreenService.stopLoading();
        this.daysExtended = response;
      }, (err) => {
        console.log(err, 'error occured in kyc submission date extension page');
        this.loadingScreenService.stopLoading();
      }
    );
  }
}
