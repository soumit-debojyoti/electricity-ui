import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CommonService } from '../services/common.service/common.service';
import { AddressProof } from '../models/addressproof.model';
import { IdProof } from '../models/idproof.model';
import { HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service/user.service';
import { State } from '../models/state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  introducer_code: string;
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

  constructor(private common: CommonService,
    private userService: UserService, private formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }

  ngOnInit() {

    this.clearUploadVariables();
    this.genders = [
      { 'id': 1, 'name': 'Male' },
      { 'id': 2, 'name': 'Female' },
      { 'id': 3, 'name': 'Trans' },
      { 'id': 4, 'name': 'NA' }
    ];
    this.introducer_code = this.storage.get("introducer_code");
    this.initiateRegitrationForm();;
    this.registerForm.controls['uploaddocumentid'].disable();
    this.registerForm.controls['uploaddocumentaddress'].disable();
    this.getAddressProof();
    this.getIdProof();
    this.getStates();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid

    let formDataregister: FormData = new FormData();
    formDataregister.append('introcode', this.registerForm.get('introcode').value);
    formDataregister.append('introname', this.registerForm.get('introname').value);
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
    formDataregister.append('bankname', this.registerForm.get('bankname').value);
    formDataregister.append('accholdername', this.registerForm.get('accholdername').value);
    formDataregister.append('accnumber', this.registerForm.get('accnumber').value);
    formDataregister.append('ifsc', this.registerForm.get('ifsc').value);
    formDataregister.append('branch', this.registerForm.get('branch').value);
    formDataregister.append('idprooftype', this.registerForm.get('idproof').value);
    formDataregister.append('idproof', this.idProofUploadpath);
    formDataregister.append('addressprooftype', this.registerForm.get('addressproof').value);
    formDataregister.append('addressproof', this.addressProofUploadpath);
    formDataregister.append('photo', this.photoUploadPath);

    formDataregister.append('bankdetails', this.registerForm.get('bankdetails').value);
    formDataregister.append('payonline', this.registerForm.get('payonline').value);

    this.userService.registerUser(formDataregister)
      .subscribe((response) => {
        debugger;
        alert('Registration SUCCESS!!. Please click ok to go to login page. Please note that you will able to login with your username and password.')
        this.router.navigate(['/login']);
      });




  }


  private initiateRegitrationForm() {
    this.registerForm = this.formBuilder.group({
      introcode: new FormControl({ value: this.introducer_code, disabled: true }, Validators.required),
      introname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      fathername: ['', Validators.required],
      gender: ['0'],
      dob: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pancard: ['', Validators.required],
      aadharcard: ['', Validators.required],
      address: ['', Validators.required],
      po: ['', Validators.required],
      ps: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      bankname: ['', Validators.required],
      accholdername: ['', Validators.required],
      accnumber: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
      idproof: ['0', Validators.required],
      uploaddocumentid: ['', Validators.required],
      photo: ['', Validators.required],
      addressproof: ['0', Validators.required],
      uploaddocumentaddress: ['', Validators.required],
      bankdetails: ['', Validators.required],
      payonline: ['', Validators.required]
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

  public onIdProofChanged(event: any) {
    debugger;
    if (event.target.value != '0') {
      this.selectedIdProof = this.idProofs.find(n => n.id_proof_id == event.target.value);
      this.registerForm.controls['uploaddocumentid'].enable();

    }
    else {
      this.registerForm.controls['uploaddocumentid'].disable();
      this.idProofUploadpath = '';
    }
  }

  public onAddressProofChanged(event: any) {
    debugger;
    if (event.target.value != '0') {
      this.selectedAddressProof = this.addressProofs.find(n => n.address_proof_id == event.target.value);
      this.registerForm.controls['uploaddocumentaddress'].enable();
    }
    else {
      this.registerForm.controls['uploaddocumentaddress'].disable();
      this.addressProofUploadpath = '';
    }
  }

  public getAddressProof(): void {
    debugger;
    this.common.getAddressProof()
      .subscribe((response: Array<AddressProof>) => {
        debugger;
        this.addressProofs = response;
      });
  }

  public getIdProof(): void {
    debugger;
    this.common.getIdProof()
      .subscribe((response: Array<IdProof>) => {
        debugger;
        this.idProofs = response;
      });
  }

  public getStates(): void {
    debugger;
    this.common.getState()
      .subscribe((response: Array<State>) => {
        debugger;
        this.states = response;
      });
  }

  uploadIdProof(files) {
    debugger;
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
    this.common.upload('idProof', formData)
      .subscribe((event: any) => {
        debugger;
        if (event != undefined)
          this.idProofUploadpath = event.toString();
        this.messageIdProof = 'Upload successful';
      });
  }

  uploadAddressProof(files) {
    debugger;
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
    this.common.upload('addressProof', formData)
      .subscribe((event: any) => {
        debugger;
        if (event != undefined)
          this.addressProofUploadpath = event.toString();
        this.messageAddressProof = 'Upload successful';
      });
  }

  uploadPhoto(files) {
    debugger;
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
    this.common.upload('photo', formData)
      .subscribe((event: any) => {
        debugger;
        if (event != undefined) {
          //this.photoUploadPath = environment.baseUrl + event.toString();

          this.photoUploadPath = event.toString();
          //this.download('photo', this.photoUploadPath);
          this.messagePhoto = 'Upload successful';
        }


      });
  }




}
