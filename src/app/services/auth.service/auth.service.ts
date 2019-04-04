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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AccessToken: string = "";
  private rootURL = environment.apiUrl + "auth";
  private username: string;
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient, private baseService: BaseService) { }

  login(userName: string, password: string): any {
    this.username = userName;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Basic-Auth': 'True', 'responseType': 'json', 'Authorization': 'Basic ' + btoa(userName + ":" + password) });
    return this.http.post(this.rootURL + '/token', {}, { headers: reqHeader }).pipe(map(response => {
      debugger;
      this.storage.set('login_user', this.username);

      return response;
    }))
      .catch(this.errorHandler);
  }

  logout() {
    this.storage.remove('login_user');
    this.storage.remove('role');
    this.storage.remove('access_token');
    this.storage.remove('introducer_code');
    this.router.navigateByUrl('/login');
  }

  register(token: string): Observable<any> {
    debugger;
    var url: string = `user/validatetoken/${token}`;
    let params = new HttpParams();
    // params = params.append('token', 'tytytyt');
    // params = params.append('text1', 'bocachoda');
    return this.baseService.get(url, {}, params, true);
  }




  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error....");

  }

}
