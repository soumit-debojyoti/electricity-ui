import { Component, OnInit, Inject } from '@angular/core';
import { Complaint, RechargeTransaction } from '../models/common.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service/auth.service';
@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit {
  public userComplaints: Array<Complaint>;
  public adminComplaints: Array<Complaint>;
  public userView: boolean;
  public adminView: boolean;
  public selectedTransaction: RechargeTransaction;
  public complaintForm: FormGroup;
  public complaintSubmitted = false;
  public complaintStatusList: Array<any> = [];
  public loggedInUserRoleID: number;
  public adminSearchText: string = '';
  public userComplaintsUnFiltered: Array<Complaint>;
  public adminComplaintsUnFiltered: Array<Complaint>;
  public searchText: string = '';
  selectedComplaint: Complaint;
  constructor(private datePipe: DatePipe, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private common: CommonService
    , private loadingScreenService: LoadingScreenService, private formBuilder: FormBuilder
    , private auth: AuthService) { }

  ngOnInit() {
    this.adminComplaints = [];
    this.userComplaints = [];
    this.adminView = false;
    this.userView = true;
    this.selectedTransaction = new RechargeTransaction();
    this.selectedComplaint = new Complaint();
    this.fetchUserComplaints(this.storage.get('user_id'));
    this.fetchAdminComplaints();
    this.complaintStatusList = [{ 'value': 'Acknowledged', 'key': 1 },
    { 'value': 'Assigned', 'key': 2 },
    { 'value': 'Work In Progress', 'key': 3 },
    { 'value': 'Resolved', 'key': 4 },
    ];
    this.complaintForm = this.formBuilder.group({
      cStatus: ['', Validators.required],
      cComment: ['', Validators.required]
    });
    this.loggedInUserRoleID = +this.storage.get('role_id');
  }
  public filterAdminView(): void {
  this.adminComplaints = this.adminComplaints.filter(x => x.cid === +this.adminSearchText);
  }
  public resetAdminView(): void {
    this.adminComplaints = JSON.parse(JSON.stringify(this.adminComplaintsUnFiltered));
    this.adminSearchText = '';
  }
  public filterUserView(): void {
    this.userComplaints = this.userComplaints.filter(x => x.cid === +this.searchText);
    }
    public resetUserView(): void {
      this.userComplaints = JSON.parse(JSON.stringify(this.userComplaintsUnFiltered));
      this.searchText = '';
    }
  public fetchUserComplaints(userID: number): void {
    this.loadingScreenService.startLoading();
    this.common.fetchUserComplaints(userID).subscribe((response: Array<Complaint>) => {
      this.userComplaints = response;
      this.userComplaintsUnFiltered = response;
      this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    });
  }

  public fetchAdminComplaints(): void {
    this.loadingScreenService.startLoading();
    this.common.fetchAdminComplaints().subscribe((response: Array<Complaint>) => {
      this.adminComplaints = response;
      this.adminComplaintsUnFiltered = response;
      this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    });
  }

  public changeView(text: string): void {
    switch (text) {
      case 'Complaints': this.userView = true;
        this.adminView = false;
        break;
      case 'Admin': this.adminView = true;
        this.userView = false;
        break;
    }
  }
  public logout() {
    this.storage.set('is_login', false);
    this.auth.logout();
  }
  public changeTransactionID(transaction: any): void {
    this.selectedTransaction = transaction;
    this.selectedTransaction.transactionDateText =
      this.datePipe.transform(this.selectedTransaction.transactionDate, 'dd-MM-yyyy');
  }

  changeComplaint(complaint: Complaint): void {
    this.selectedComplaint = complaint;
  }
  get f() { return this.complaintForm.controls; }
  onSubmit(): void {
    this.loadingScreenService.startLoading();
    this.complaintSubmitted = true;
    var t = this.f;
    // stop here if form is invalid
    if (this.complaintForm.invalid) {
      if (t.cStatus.invalid && t.cComment.invalid) {
        alert('Error: 1. Status is required \n2. Update comment is required');
        this.complaintForm.reset();
        return;
      }
      if (t.cComment.invalid) {
        alert('Error: Update comment is required');
        this.complaintForm.reset();
        return;
      }
      if (t.cStatus.invalid) {
        alert('Error: Status is required');
        this.complaintForm.reset();
        return;
      }
    } else {
      this.selectedComplaint.resolverComment = t.cComment.value;
      this.selectedComplaint.cStatus = +t.cStatus.value;
      this.selectedComplaint.assignedTo = this.storage.get('user_id');
      if (+t.cStatus.value === 4) {
        this.selectedComplaint.resolvedBy = this.storage.get('user_id');
      } else {
        this.selectedComplaint.resolvedBy = 0;
      }
    }
    this.complaintForm.reset();
    console.log(this.selectedComplaint);
    this.common.updateUserComplaint(this.selectedComplaint).subscribe((response: boolean) => {
      if (response) {
        this.fetchAdminComplaints();
        this.fetchUserComplaints(this.storage.get('user_id'));
      }
      this.loadingScreenService.stopLoading();
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log(err);
    });
  }

  public goHome(): void {
    console.log('Home clicked');
  }
}
