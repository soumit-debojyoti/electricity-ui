import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { Router } from "@angular/router";
import { BaseService } from '../base.service';
import { ApiUrlService } from '../api.url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private http: HttpClient,
    private baseService: BaseService, private apiUrlService: ApiUrlService) { }


  public registerUser(formdata: FormData): Observable<any> {
    const urlStringObject = {

    };
    const mainURL = this.apiUrlService.getFullURL('REGISTER_USER', urlStringObject);
    return this.baseService.post(mainURL, formdata, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getRankAchieverList(user_id: number): Observable<any> {
    let params = new HttpParams();
    const urlStringObject = {
      userId: user_id
    };
    const mainURL = this.apiUrlService.getFullURL('RANK_ACHIEVER_LIST', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response;
      }));
  }

  public getRankAchieverCount(user_id: number): Observable<any> {
    let params = new HttpParams();
    const urlStringObject = {
      userId: user_id
    };
    const mainURL = this.apiUrlService.getFullURL('RANK_ACHIEVER_COUNT', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response;
      }));
  }
  public findUserExist(user_name: string): Observable<any> {
    let params = new HttpParams();
    const urlStringObject = {
      userName: user_name
    };
    const mainURL = this.apiUrlService.getFullURL('FIND_USER', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response;
      }));
  }

  public fetchUserRank(userID: number): Observable<any> {
    const urlConfig = {
      userID: userID
    };
    const mainURL = this.apiUrlService.getFullURL('GET_USER_RANK', urlConfig);
    return this.http.get(mainURL)
      .pipe(map(response => {
        return response;
      }));
  }





}
