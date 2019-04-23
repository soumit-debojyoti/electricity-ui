import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { Router } from "@angular/router";
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { ApiUrlService } from '../api.url.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  AccessToken: string = "";
  private rootURL = environment.apiUrl + "auth";
  private username: string;
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private http: HttpClient, private baseService: BaseService,
    private apiUrlService: ApiUrlService) { }

  getAddressProof(): Observable<any> {
    //var url: string = `common/addressproofs`;
    const urlStringObject = {
    };
    let params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('ADDRESSPROOF_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }

  getIdProof(): Observable<any> {
    //var url: string = `common/idproofs`;
    let params = new HttpParams();
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('IDPROOF_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }

  getState(): Observable<any> {
    //var url: string = `common/states`;
    let params = new HttpParams();
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('STATES_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }

  upload(fileType: string, formdata: FormData) {
    const urlStringObject = {
      fileType: fileType
    };
    //var url: string = `common/upload/${fileType}`;
    //let params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('FILE_UPLOAD', urlStringObject);
    return this.baseService.post(mainURL, formdata, true);
  }

  public clearAllSession() {
    this.storage.remove('login_user');
    this.storage.remove('role');
    this.storage.remove('access_token');
    this.storage.remove('introducer_code');
    this.storage.remove('introducer_name');
    this.storage.remove('role_id');
    this.storage.remove('security_token');
  }

  public getPagePermission(pageOrWidgetName: string): Observable<any> {
    const role_id = this.storage.get('role_id');
    const urlStringObject = {
      roleId: role_id
    };
    //var url: string = `common/upload/${fileType}`;
    let params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('PAGE_PERMISSION', urlStringObject);
    return this.baseService.get(mainURL, {}, params);
  }

}
