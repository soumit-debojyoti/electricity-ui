import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { ApiUrlService } from '../api.url.service';
import { CommonService } from '../common.service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean;
  public AccessToken: string;
  private rootURL = environment.apiUrl + 'auth';
  private username: string;
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private http: HttpClient, private commonService: CommonService,
    private baseService: BaseService, private apiUrlService: ApiUrlService) {
    this.loggedIn = false;
  }

  login(userName: string, password: string): any {
    this.username = userName;
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Basic-Auth': 'True', 'responseType': 'json', 'Authorization': 'Basic ' + btoa(userName + ':' + password)
    });
    return this.http.post(this.rootURL + '/token', {}, { headers: reqHeader }).pipe(map((response: any) => {
      this.storage.set('login_user', this.username);
      this.storage.set('role_id', response.role_id);
      this.storage.set('user_id', response.user_id);
      this.loggedIn = true;

      return response;
    }))
      .catch(this.errorHandler);
  }

  logout() {
    this.loggedIn = false;
    this.commonService.clearAllSession();
    this.router.navigateByUrl('/login');
  }

  register(token: string): Observable<any> {
    const params = new HttpParams();
    const urlStringObject = {
      token: token
    };
    const mainURL = this.apiUrlService.getFullURL('VALIDATE_TOKEN', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }




  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error....');

  }

}
