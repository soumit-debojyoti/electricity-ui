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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient, private baseService: BaseService) { }


  public registerUser(formdata: FormData) {
    var url: string = `user/registeruser`;
    let params = new HttpParams();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.baseService.post(url, {}, options, JSON.stringify(formdata), true);
  }
}
