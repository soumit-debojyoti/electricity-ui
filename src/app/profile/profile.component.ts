import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from '../widgets/profile/profile.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { User } from 'src/app/models/user.model';
import { DataService } from '../services/data.service/data.service';
// import { StoreService } from 'src/app/store/store.service';
// import { ChannelNameEnum, Message } from 'src/app/store/models/message.model';
import { environment } from '../../environments/environment';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { UserWalletBalanceResponse } from 'src/app/models/user-wallet-balance-response.model';
import { CommonService } from '../services/common.service/common.service';
import { State } from '../models/state.model';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterUserResponse } from '../models/registeruser.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public middle_name: string;
  public father_name: string;
  public full_name: string;
  public city: string;
  public state_name: string;
  public dob: string;
  public sex: string;
  public role: string;
  public name: string;
  public photo: string;
  public mobile: string;
  public email: string;
  public address: string;
  public district: string;
  public state: string;
  public pincode: string;
  public balance: number;
  public introducer_code: string;
  public is_employee_value: string;
  public isEmployee: boolean;
  public introducer_name: string;
  public user_name: string;
  public genders: any;
  public states: Array<State> = [];
  public photoUploadPath: string;
  public messageIdProof: string;
  public messageAddressProof: string;
  public messagePhoto: string;
  private rootURL = environment.baseUrl;
  constructor(private common: CommonService, private profileService: ProfileService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private userService: UserService,
    private loadingScreenService: LoadingScreenService) {
    this.name = '';
    this.full_name = '';
  }

  ngOnInit() {
    this.genders = [
      { 'id': 1, 'name': 'Male' },
      { 'id': 2, 'name': 'Female' },
      { 'id': 3, 'name': 'Trans' },
      { 'id': 4, 'name': 'NA' }
    ];
    // this.getStates();
    // convenience getter for easy access to form fields

    // this.registerForm.controls['uploaddocumentid'].disable();
    // this.registerForm.controls['uploaddocumentaddress'].disable();
    this.photoUploadPath = '';
    this.messagePhoto = '';
    this.name = this.storage.get('login_user');
    this.loadingScreenService.startLoading();
    forkJoin(this.common.getState(), this.profileService.GetUser(this.name))
      .subscribe(([responseStates, response]) => {
        this.states = responseStates;
        this.loadingScreenService.stopLoading();
        this.user_id = response.user_id;
        this.first_name = response.first_name;
        this.middle_name = response.middle_name;
        this.last_name = response.last_name;
        this.father_name = response.father_name;
        this.full_name = this.first_name + ' ' + this.last_name;
        this.city = response.city;
        this.address = response.address;
        this.district = response.district;
        this.state = response.state_name;
        this.pincode = response.pin;
        this.state_name = response.state_name;
        this.mobile = response.mobile_number;
        this.email = response.email;
        // this.dob = response.dob;
        this.sex = response.sex;
        this.role = response.role_name;
        this.photo = response.photo;
        this.photo = this.rootURL + this.photo;
        this.storage.set('role', this.role);
        this.storage.set('user_id', this.user_id);
        const message: User = response;
        this.data.changeMessage(this.role);
        this.initiateRegitrationForm();
        this.getWalletBalance();
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }


  get f() { return this.registerForm.controls; }

  public uploadPhoto(files) {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    for (const file of files) {
      formData.append(this.name, file);
    }
    this.loadingScreenService.startLoading();
    this.common.uploadPhoto('photo', this.name, formData)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          // this.photoUploadPath = environment.baseUrl + event.toString();
          this.photoUploadPath = event.toString();
          // this.download('photo', this.photoUploadPath);
          this.messagePhoto = 'Upload successful';
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  onSubmit() {
    return false;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // stop here if form is invalid

    const formDataregister: FormData = new FormData();
    formDataregister.append('username', this.registerForm.get('username').value);
    formDataregister.append('password', this.registerForm.get('password').value);
    formDataregister.append('firstName', this.registerForm.get('firstName').value);
    formDataregister.append('middleName', this.registerForm.get('middleName').value);
    formDataregister.append('lastName', this.registerForm.get('lastName').value);
    formDataregister.append('fathername', this.registerForm.get('fathername').value);
    formDataregister.append('gender', this.registerForm.get('gender').value);
    formDataregister.append('dob', this.registerForm.get('dob').value);
    formDataregister.append('mobile', this.registerForm.get('mobile').value);
    formDataregister.append('email', this.registerForm.get('email').value);
    formDataregister.append('pancard', this.registerForm.get('pancard').value);
    formDataregister.append('aadharcard', this.registerForm.get('aadharcard').value);
    formDataregister.append('address', this.registerForm.get('address').value);
    formDataregister.append('po', this.registerForm.get('po').value);
    formDataregister.append('ps', this.registerForm.get('ps').value);
    formDataregister.append('district', this.registerForm.get('district').value);
    formDataregister.append('city', this.registerForm.get('city').value);
    formDataregister.append('state', this.registerForm.get('state').value);
    formDataregister.append('pincode', this.registerForm.get('pincode').value);
    formDataregister.append('photo', this.photoUploadPath);
    this.loadingScreenService.startLoading();
    this.userService.registerUser(formDataregister)
      .subscribe((response: RegisterUserResponse) => {
        this.loadingScreenService.stopLoading();
        if (response.message === 'Registered.') {
          // this.addWallet(response);
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  // private getStates(): void {
  //   this.loadingScreenService.startLoading();
  //   this.common.getState()
  //     .subscribe((response: Array<State>) => {
  //       this.loadingScreenService.stopLoading();
  //       this.states = response;
  //     }, () => {
  //       this.loadingScreenService.stopLoading();
  //     });
  // }

  private initiateRegitrationForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl({ value: this.name, disabled: true }, Validators.required),
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: new FormControl({ value: this.first_name, disabled: false }, Validators.required),
      middleName: new FormControl({ value: this.middle_name, disabled: false }, Validators.required),
      lastName: new FormControl({ value: this.last_name, disabled: false }, Validators.required),
      fathername: new FormControl({ value: this.father_name, disabled: false }, Validators.required),
      gender: new FormControl({ value: this.genders.find(x => x.name === this.sex).id, disabled: false }, Validators.required),
      // dob: new FormControl({ value: this.dob, disabled: false }, Validators.required),
      mobile: new FormControl({ value: this.mobile, disabled: false }, Validators.required),
      email: new FormControl({ value: this.email, disabled: false }, Validators.required),
      address: new FormControl({ value: this.address, disabled: false }, Validators.required),
      district: new FormControl({ value: this.district, disabled: false }, Validators.required),
      city: new FormControl({ value: this.city, disabled: false }, Validators.required),
      state: new FormControl({ value: this.states.find(x => x.state_name === this.state).state_id, disabled: false }, Validators.required),
      pincode: new FormControl({ value: this.pincode, disabled: false }, Validators.required),
      photo: new FormControl({ value: this.photoUploadPath, disabled: false }, Validators.required),
    }, {
        validator: mustMatch('password', 'cpassword')
      });
  }

  private getWalletBalance(): void {
    this.loadingScreenService.startLoading();
    this.userService.getWalletBalance(this.user_id)
      .subscribe((response: UserWalletBalanceResponse) => {
        this.loadingScreenService.stopLoading();
        if (response !== undefined) {
          this.balance = response.walletBalance;
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private updateUserDetails() {

  }

}
// custom validator to check that two fields match
export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
