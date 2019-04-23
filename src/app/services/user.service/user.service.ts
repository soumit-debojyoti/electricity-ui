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
}
