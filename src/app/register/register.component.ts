import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { AddressProof } from '../models/addressproof.model';
import { IdProof } from '../models/idproof.model';
import { HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service/user.service';
import { State } from '../models/state.model';
import { Router } from '@angular/router';
import { RegisterUserResponse } from '../models/registeruser.model';
import { AlertService } from '../services/common.service/alert.service';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';
import { MobileUniqueValidationResponse, TodayUserJoinCountResponse } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isfirst: boolean;
  submitted = false;
  ismobileexist: boolean;
  public mobExist: boolean;
  public introducer_code: string;
  public is_employee_value: string;
  public isEmployee: boolean;
  public introducer_name: string;
  public user_name: string;
  public genders: any;
  public idProofs: Array<IdProof> = [];
  public states: Array<State> = [];
  public addressProofs: Array<AddressProof> = [];
  public selectedIdProof: IdProof;
  public selectedAddressProof: AddressProof;
  public idProofUploadpath: string;
  public addressProofUploadpath: string;
  public photoUploadPath: string;
  public messageIdProof: string;
  public messageAddressProof: string;
  public messagePhoto: string;
  public isKYCLater: boolean;

  constructor(private common: CommonService,
    private userService: UserService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router, private alertService: AlertService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.isfirst = false;
    this.ismobileexist = false;
    this.isKYCLater = false;
    this.clearUploadVariables();
    this.genders = [
      { 'id': 1, 'name': 'Male' },
      { 'id': 2, 'name': 'Female' },
      { 'id': 3, 'name': 'Trans' },
      { 'id': 4, 'name': 'NA' }
    ];
    this.is_employee_value = this.storage.get('is_employee');
    if (this.is_employee_value === 'true') {
      this.isEmployee = true;
    }
    this.introducer_code = this.storage.get('introducer_code');
    this.introducer_name = this.storage.get('introducer_name');
    this.initiateRegitrationForm();
    this.registerForm.controls['uploaddocumentid'].disable();
    this.registerForm.controls['uploaddocumentaddress'].disable();
    this.getAddressProof();
    this.getIdProof();
    this.getStates();
    this.formControlValueChanged();

  }

  public changeKYC(isKYC: any) {
    this.isKYCLater = isKYC.checked;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.useridFormation();
  }

  public dateChange() {
    const fname = this.registerForm.controls['firstName'].value.toLowerCase().substring(0, 3);
    const lname = this.registerForm.controls['lastName'].value.toLowerCase().substring(0, 3);

  }

  public formControlValueChanged() {
    this.registerForm.get('mobile').valueChanges
      .subscribe(
        (mobile: string) => {
          console.log(mobile);
          if (mobile.length === 10) {
            // this.validateUniqueMobilePrivate(mobile);
          }


        });
  }

  // public mobileChange() {
  //   const mobile = this.registerForm.controls['mobile'].value.toLowerCase();
  //   this.validateUniqueMobile(mobile);
  //   return false;
  // }

  public onIdProofChanged(event: any) {
    if (event.target.value !== '0') {
      this.selectedIdProof = this.idProofs.find(n => n.id_proof_id === event.target.value);
      this.registerForm.controls['uploaddocumentid'].enable();

    } else {
      this.registerForm.controls['uploaddocumentid'].disable();
      this.idProofUploadpath = '';
    }
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

  public getAddressProof(): void {
    this.loadingScreenService.startLoading();
    this.common.getAddressProof()
      .subscribe((response: Array<AddressProof>) => {
        this.loadingScreenService.stopLoading();
        this.addressProofs = response;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public getIdProof(): void {
    this.loadingScreenService.startLoading();
    this.common.getIdProof()
      .subscribe((response: Array<IdProof>) => {
        this.loadingScreenService.stopLoading();
        this.idProofs = response;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
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

  public uploadPhoto(files) {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    for (const file of files) {
      formData.append(this.user_name, file);
    }
    this.loadingScreenService.startLoading();
    this.common.uploadPhoto('photo', this.user_name, formData)
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

  private clearUploadVariables() {
    this.idProofUploadpath = '';
    this.addressProofUploadpath = '';
    this.photoUploadPath = '';
    this.messageAddressProof = '';
    this.messageIdProof = '';
    this.messagePhoto = '';
  }

  private getStates(): void {
    this.loadingScreenService.startLoading();
    this.common.getState()
      .subscribe((response: Array<State>) => {
        this.loadingScreenService.stopLoading();
        this.states = response;
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private useridFormation(): void {
    this.userService.GetTodayUserJoinCount()
      .subscribe((res: TodayUserJoinCountResponse) => {
        this.loadingScreenService.stopLoading();
        debugger;
        const x = new Date();
        const y = x.getFullYear().toString().substr(-2);
        let m = (x.getMonth() + 1).toString();
        let d = x.getDate().toString();
        (d.length === 1) ? (d = '0' + d) : (d = d);
        (m.length === 1) ? (m = '0' + m) : (m = m);
        const yyyymmdd = y + m + d;
        this.user_name = yyyymmdd + '' + (res.count + 1);
        // this.registerForm.controls['username'].setValue(this.user_name); // = this.user_name;
        this.userService.validateUniqueMobile(this.registerForm.get('mobile').value)
          .subscribe((event: MobileUniqueValidationResponse) => {
            this.loadingScreenService.stopLoading();
            const phoneControl = this.registerForm.get('mobile');
            if (event.has_present) {
              this.isfirst = true;
              this.ismobileexist = true;
              this.mobExist = !this.ismobileexist;
              this.alertService.confirmationMessage('',
                `Mobile number exist.`,
                'error', true, false);
              return;
            } else {
              this.isfirst = true;
              this.ismobileexist = false;
              this.mobExist = !this.ismobileexist;
              const formDataregister: FormData = new FormData();
              if (!this.isEmployee) {
                formDataregister.append('introcode', this.registerForm.get('introcode').value);
                formDataregister.append('introname', this.registerForm.get('introname').value);
              }
              formDataregister.append('isEmployee', this.isEmployee ? 'true' : 'false');

              formDataregister.append('username', this.user_name);
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
              formDataregister.append('bankname', this.registerForm.get('bankname').value);
              formDataregister.append('accholdername', this.registerForm.get('accholdername').value);
              formDataregister.append('accnumber', this.registerForm.get('accnumber').value);
              formDataregister.append('ifsc', this.registerForm.get('ifsc').value);
              formDataregister.append('branch', this.registerForm.get('branch').value);
              formDataregister.append('photo', this.photoUploadPath);
              formDataregister.append('isKYCLater', this.isKYCLater.toString());
              if (!this.isKYCLater) {
                formDataregister.append('idprooftype', this.registerForm.get('idproof').value);
                formDataregister.append('idproof', this.idProofUploadpath);
                formDataregister.append('addressprooftype', this.registerForm.get('addressproof').value);
                formDataregister.append('addressproof', this.addressProofUploadpath);

                formDataregister.append('bankdetails', this.registerForm.get('bankdetails').value);
              }
              formDataregister.append('payonline', this.registerForm.get('payonline').value);
              this.loadingScreenService.startLoading();
              this.userService.registerUser(formDataregister)
                .subscribe((response: RegisterUserResponse) => {
                  this.loadingScreenService.stopLoading();
                  if (response.message === 'Registered.') {
                    this.addWallet(response);
                  }
                }, () => {
                  this.loadingScreenService.stopLoading();
                });

            }
          }, () => {
            this.loadingScreenService.stopLoading();
          });
        // stop here if form is invalid
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  private initiateRegitrationForm() {
    if (this.isEmployee) {
      this.registerForm = this.formBuilder.group({
        // introcode: new FormControl({ value: this.introducer_code, disabled: true }, Validators.required),
        // introname: new FormControl({ value: this.introducer_name, disabled: true }, Validators.required),
        // username: new FormControl({ value: this.user_name, disabled: true }, Validators.required),
        password: ['', [Validators.required, Validators.minLength(6)]],
        cpassword: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        fathername: ['', Validators.required],
        gender: ['0'],
        dob: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.minLength(10)]],
        // mobile: ['', [Validators.required, Validators.minLength(10), this.mobileexistvalidator]],
        email: [''],
        pancard: [''],
        aadharcard: [''],
        address: [''],
        po: [''],
        ps: [''],
        district: [''],
        city: [''],
        state: [''],
        pincode: [''],
        bankname: [''],
        accholdername: [''],
        accnumber: [''],
        ifsc: [''],
        branch: [''],
        idproof: ['0'],
        uploaddocumentid: [''],
        photo: [''],
        addressproof: ['0'],
        uploaddocumentaddress: [''],
        bankdetails: [''],
        payonline: ['']
      }, {
        validator: mustMatch('password', 'cpassword')
      });
    } else {
      this.registerForm = this.formBuilder.group({
        introcode: new FormControl({ value: this.introducer_code, disabled: true }, Validators.required),
        introname: new FormControl({ value: this.introducer_name, disabled: true }, Validators.required),
        // username: new FormControl({ value: this.user_name, disabled: true }, Validators.required),
        password: ['', [Validators.required, Validators.minLength(6)]],
        cpassword: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        fathername: ['', Validators.required],
        gender: ['0'],
        dob: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.minLength(10)]],
        // mobile: ['', [Validators.required, Validators.minLength(10), this.mobileexistvalidator]],
        email: [''],
        pancard: [''],
        aadharcard: [''],
        address: [''],
        po: [''],
        ps: [''],
        district: [''],
        city: [''],
        state: [''],
        pincode: [''],
        bankname: [''],
        accholdername: [''],
        accnumber: [''],
        ifsc: [''],
        branch: [''],
        idproof: ['0'],
        uploaddocumentid: [''],
        photo: [''],
        addressproof: ['0'],
        uploaddocumentaddress: [''],
        bankdetails: [''],
        payonline: ['']
      }, {
        validator: mustMatch('password', 'cpassword')
      });
    }
  }

  private addWallet(register: RegisterUserResponse): void {
    this.loadingScreenService.startLoading();
    this.common.addWallet(register.user_security_stamp)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success' && register.message === 'Registered.') {
            this.addWalletTransaction(event.amount_wallet_for_registration, event.user_id,
              'Amount added to open a wallet with initial amount.', 'credit');
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
      });
  }

  public mobileexistvalidator(control: FormControl): boolean {
    if (control.value !== '') {
      if (control.value.length === 10) {
        this.userService.validateUniqueMobile(control.value)
          .subscribe((event: MobileUniqueValidationResponse) => {
            this.loadingScreenService.stopLoading();
            const phoneControl = this.registerForm.get('mobile');
            if (event.has_present) {
              this.isfirst = true;
              this.ismobileexist = true;
              this.mobExist = !this.ismobileexist;
              return this.mobExist;
            } else {
              this.isfirst = true;
              this.ismobileexist = false;
              phoneControl.clearValidators();
              this.mobExist = !this.ismobileexist;
              return this.mobExist;

            }
          }, () => {
            this.loadingScreenService.stopLoading();
          });
      } else {
        return null;
      }
    } else {
      return null;
    }

    return null;
  }

  public validateUniqueMobilePrivate(mobile: any): Observable<any> {
    return this.userService.validateUniqueMobile(mobile);

  }

  private addWalletTransaction(amount: number, userId: number, message: string, transactionMode: string): void {
    this.loadingScreenService.startLoading();
    this.common.addWalletTransaction(amount, userId, message, transactionMode)
      .subscribe((event: any) => {
        this.loadingScreenService.stopLoading();
        if (event !== undefined) {
          if (event.message === 'success') {
            this.alertService.confirmationMessage('',
              `Registration SUCCESS!!. Please click ok to go to login page.
              Please note that you will able to login with your username and password. 
              Your newly generated user name is ${this.user_name}`,
              'success', true, false);
            this.router.navigate(['/login']);
          }
        }
      }, () => {
        this.loadingScreenService.stopLoading();
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
