import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserModel } from '../models/user.model';
import { UserService } from '../services/user.service/user.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: RegisterUserModel;
  @Input('user')
  set userValue(value: RegisterUserModel) {
    debugger;
    this.user = value;
    this.userDetails = JSON.parse(JSON.stringify(this.user));
    this.submitted = false;
    if (this.userDetails.username !== undefined) {
      this.customCalendarSelectedStartDate = new Date(this.userDetails.dob);
      this.setValue();
    }
  }
  @Output() userEdited = new EventEmitter<boolean>();
  registerForm: FormGroup;
  submitted = false;
  error: string;
  customCalendarSelectedStartDate: Date;
  pagePersonalInfo: boolean;
  pageAddressInfo: boolean;
  userDetails: RegisterUserModel;
  message: string;
  updateSuccessful: boolean;
  maxDOB = new Date(); // current date - as user's age can not be negetive.
  selectedDOB: Date;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private loadingScreenService: LoadingScreenService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
      this.userDetails = new RegisterUserModel();
    }

  ngOnInit() {
    this.pagePersonalInfo = true;
    this.pageAddressInfo = false;
    this.userDetails = new RegisterUserModel();
    if (this.registerForm === undefined) {
      this.createFormValidation();
    }
    this.message = '';
    this.updateSuccessful = false;
  }
  createFormValidation(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      po: ['', Validators.required],
      ps: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit(userID: string) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      alert('The form is invalid');
      return;
    }
    this.loadingScreenService.startLoading();
    this.getControlValue();
    // this.updateUserProfileForAdmin();
    this.userService.updateUserDetails(+userID, this.userDetails).subscribe(
      (response: boolean) => {
        this.loadingScreenService.stopLoading();
        response ? this.message = 'user details updated successfully.' :
          this.message = 'something went wrong, please try later.';
        this.updateSuccessful = response;
        this.userEdited.emit(response);
      }, (err) => {
        console.log('error occured in edit profile page', err);
        this.userEdited.emit(false);
      }
    );
  }

  /** Changes page view */
  changePage(page: string): void {
    switch (page) {
      case 'Personal': this.pagePersonalInfo = true;
        this.pageAddressInfo = false;
        break;
      case 'Address': this.pagePersonalInfo = false;
        this.pageAddressInfo = true;
        break;
    }
  }
  /** Setting the default value of form */
  public setValue(): void {
    if (this.registerForm === undefined) {
      this.createFormValidation();
    }
    this.f.firstName.setValue(this.userDetails.firstName);
    this.f.lastName.setValue(this.userDetails.lastName);
    this.f.username.setValue(this.userDetails.username);
    this.f.password.setValue(this.userDetails.password);
    this.f.email.setValue(this.userDetails.email);
    this.f.mobile.setValue(this.userDetails.mobile);
    this.f.gender.setValue(this.userDetails.gender.toString());
    this.f.dob.setValue(this.userDetails.dob);
    this.selectedDOB = new Date(this.userDetails.dob);
    this.f.address.setValue(this.userDetails.address);
    this.f.po.setValue(this.userDetails.po);
    this.f.ps.setValue(this.userDetails.ps);
    this.f.district.setValue(this.userDetails.district);
    this.f.city.setValue(this.userDetails.city);
    this.f.pincode.setValue(this.userDetails.pincode);
  }
  /** Resets the form with default value */
  resetForm(): void {
    this.userDetails = JSON.parse(JSON.stringify(this.user));
    this.setValue();
  }
  ngOndestroy() {
    console.log('Edit User destroyed!');
  }
  public getControlValue(): void {
    this.userDetails.firstName = this.f.firstName.value;
    this.userDetails.lastName = this.f.lastName.value;
    this.userDetails.username = this.f.username.value;
    this.userDetails.password = this.f.password.value;
    this.userDetails.email = this.f.email.value;
    this.userDetails.mobile = this.f.mobile.value;
    this.userDetails.gender = +this.f.gender.value;
    this.userDetails.dob = this.selectedDOB.toDateString();
    this.userDetails.address = this.f.address.value;
    this.userDetails.po = this.f.po.value;
    this.userDetails.ps = this.f.ps.value;
    this.userDetails.district = this.f.district.value;
    this.userDetails.city = this.f.city.value;
    this.userDetails.pincode = this.f.pincode.value;
  }

  changeDate(date: any): void {
    this.selectedDOB = date.value;
  }

  updateUserProfileForAdmin(): void {
    this.loadingScreenService.startLoading();
    console.log(this.user);
    this.userService.getSearchUsers(this.userDetails.username).subscribe(
      userInfo => {
        console.log(userInfo);
        this.loadingScreenService.stopLoading();
        if (userInfo[0].user_id === 0) {
          this.onSubmit(this.storage.get('user_id'));
        } else {
          this.onSubmit(userInfo[0].user_id);
        }
      }, (err) => {
        console.log('error occured while fetching user details', err);
        this.loadingScreenService.stopLoading();
      }
    );
  }
}
