import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from '../widgets/profile/profile.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { User, RegisterUserModel } from 'src/app/models/user.model';
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
import { RegisterUserResponse, KYCDetails } from '../models/registeruser.model';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AddressProof } from '../models/addressproof.model';
import { IdProof } from '../models/idproof.model';
import { AuthService } from '../services/auth.service/auth.service';

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
  public oldImage: string;

  public idProofs: Array<IdProof> = [];
  public addressProofs: Array<AddressProof> = [];
  public selectedIdProof: IdProof;
  public selectedAddressProof: AddressProof;
  public idProofUploadpath: string;
  public addressProofUploadpath: string;
  private rootURL = environment.baseUrl;
  userDetails: RegisterUserModel;
  viewMode: string;
  adminMode: boolean;
  infoMode: boolean;
  kycMode: boolean;
  public isAdmin: boolean;
  public isSuperAdmin: boolean;
  public isUser: boolean;


  constructor(private common: CommonService, private profileService: ProfileService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private data: DataService, private userService: UserService,
    private loadingScreenService: LoadingScreenService, private router: Router, private auth: AuthService) {
    this.name = '';
    this.full_name = '';
  }

  ngOnInit() {
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.isUser = false;
    this.user_id = this.storage.get('user_id');
    this.clearUploadVariables();
    this.initiateRegitrationForm();
    this.viewMode = 'Basic Info';
    this.infoMode = false;
    this.adminMode = false;
    this.kycMode = true;
    this.userDetails = new RegisterUserModel();
    this.getUser();
    this.GetUserRoleInformaion();
  }


  get f() { return this.registerForm.controls; }

  private clearUploadVariables() {
    this.idProofUploadpath = '';
    this.addressProofUploadpath = '';
    this.photoUploadPath = '';
    this.messageAddressProof = '';
    this.messageIdProof = '';
    this.messagePhoto = '';
  }

  public onIdProofChanged(event: any) {
    if (event.target.value !== '0') {
      this.selectedIdProof = this.idProofs.find(n => n.id_proof_id === event.target.value);
      this.registerForm.controls['uploaddocumentid'].enable();

    } else {
      this.registerForm.controls['uploaddocumentid'].disable();
      this.idProofUploadpath = '';
    }
  }

  private GetUserRoleInformaion(): void {
    this.name = this.storage.get('login_user');
    this.loadingScreenService.startLoading();
    this.profileService.GetUser(this.name)
      .subscribe((response: User) => {
        this.loadingScreenService.stopLoading();
        this.role = response.role_name;
        if (this.role === 'employee') {
          this.isEmployee = true;
        } else {
          if (this.role === 'super admin') {
            this.isSuperAdmin = true;
          } else if (this.role === 'admin') {
            this.isAdmin = true;
          } else if (this.role === 'user') {
            this.isUser = true;
          } else {
            this.isSuperAdmin = false;
            this.isEmployee = false;
            this.isAdmin = false;
            this.isUser = false;
          }
        }
        this.storage.set('username', response.first_name + ' ' + response.last_name);
        this.storage.set('mobileno', response.mobile_number);
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public onAddressProofChanged(event: any) {
    if (event.target.value !== '0') {
      this.selectedAddressProof = this.addressProofs.find(n => n.address_proof_id === event.target.value);
      this.registerForm.controls['uploaddocumentaddress'].enable();
    } else {
      this.registerForm.controls['uploaddocumentaddress'].disable();
      this.addressProofUploadpath = '';
    }
  }

  public logout() {
    this.storage.set('is_login', false);
    this.auth.logout();
  }

  public uploadIdProof(files) {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    this.loadingScreenService.startLoading();
    this.common.upload('idProof', formData)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          this.idProofUploadpath = event.toString();
        }
        this.messageIdProof = 'Upload successful';
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public uploadAddressProof(files) {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }

    this.loadingScreenService.startLoading();
    this.common.upload('addressProof', formData)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          this.addressProofUploadpath = event.toString();
        }
        this.messageAddressProof = 'Upload successful';
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private InitialLoad() {
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
        this.dob = response.dob;
        this.state = response.state_name;
        this.pincode = response.pin;
        this.state_name = response.state_name;
        this.mobile = response.mobile_number;
        this.email = response.email;
        this.sex = response.sex;
        this.role = response.role_name;
        this.photo = response.photo;
        this.oldImage = this.photo;
        this.photo = this.rootURL + this.photo;
        this.storage.set('role', this.role);
        this.storage.set('user_id', this.user_id);
        const message: User = response;
        this.data.changeMessage(this.role);
        this.getWalletBalance();
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }


  public onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // stop here if form is invalid

    const formDataregister: FormData = new FormData();

    formDataregister.append('idprooftype', this.registerForm.get('idproof').value);
    formDataregister.append('idproof', this.idProofUploadpath);
    formDataregister.append('addressprooftype', this.registerForm.get('addressproof').value);
    formDataregister.append('addressproof', this.addressProofUploadpath);

    formDataregister.append('bankdetails', this.registerForm.get('bankdetails').value);
    this.loadingScreenService.startLoading();
    this.userService.addKYC(this.user_id, formDataregister)
      .subscribe((response: RegisterUserResponse) => {
        this.loadingScreenService.stopLoading();
        if (response.message === 'KYC detail added.') {

        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public reUploadPhoto(files) {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    for (const file of files) {
      formData.append(this.name, file);
    }
    this.loadingScreenService.startLoading();
    let extension = this.file_get_ext(this.oldImage);
    const fileInitial = this.oldImage.split('.' + extension)[0];
    let fileOriginalName = fileInitial.split('photo/')[1];
    if (fileOriginalName === undefined) {
      fileOriginalName = 'empty';
      extension = 'empty';
    }

    this.common.reUploadPhoto(this.name, 'photo',
      this.name + Math.floor(Math.random() * (999999 - 100000)) + 100000, fileOriginalName, extension, formData)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          this.photoUploadPath = event.toString();
          this.photo = this.rootURL + this.photoUploadPath;
          this.messagePhoto = 'Upload successful';
          this.router.navigate(['/profile']);
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private file_get_ext(filename) {
    return typeof filename !== 'undefined' ? filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLowerCase() : false;
  }

  private initiateRegitrationForm() {
    this.registerForm = this.formBuilder.group({
      idproof: ['0'],
      uploaddocumentid: [''],
      addressproof: ['0'],
      uploaddocumentaddress: [''],
      bankdetails: [''],
    });
    forkJoin(this.userService.getKYC(this.user_id), this.common.getIdProof(),
      this.common.getAddressProof())
      .subscribe(([responsekyc, responseIdProof, responseAddressProof]) => {
        this.idProofs = responseIdProof;
        this.addressProofs = responseAddressProof;
        this.registerForm.controls['uploaddocumentid'].disable();
        this.registerForm.controls['uploaddocumentaddress'].disable();
        this.InitialLoad();
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

  handleEditUserOutput(userUpdated: boolean): void {
    if (userUpdated) {
      this.getUser();
    }
  }

  /**Changes the mode of the view */
  changeView(mode: string): void {
    this.viewMode = mode;
    switch (this.viewMode) {
      case 'Basic Info': this.infoMode = true; this.adminMode = false; this.kycMode = false;
        break;
      case 'Admin View': this.infoMode = false; this.adminMode = true; this.kycMode = false;
        break;
      case 'KYC': this.kycMode = true; this.infoMode = false; this.adminMode = false;
    }
  }

  getUser(): void {
    this.loadingScreenService.startLoading();
    this.userService.getUserDetails(this.user_id).subscribe((response: RegisterUserModel) => {
      this.loadingScreenService.stopLoading();
      this.userDetails = response;
    }, (err) => {
      this.loadingScreenService.stopLoading();
      console.log('error occured in profile section', err);
    });
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
