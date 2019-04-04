import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private queryParam = {};
  AccessToken: string = "";
  private rootURL = environment.apiUrl;
  private httpClient: HttpClient;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient, private handler: HttpBackend) { }

  get(url: string, urlParamObject: any, queryparam: any, bypassInterceptor: boolean = false): Observable<any> {
    debugger;
    if (queryparam.updates != null) {
      this.queryParam = { params: queryparam };
    }
    else {
      this.queryParam = {};
    }

    if (bypassInterceptor) {
      this.httpClient = new HttpClient(this.handler);
      return this.httpClient.get(this.rootURL + url, this.queryParam)
        .catch(this.errorHandler);
    }
    else {
      return this.http.get(this.rootURL + url, this.queryParam)
        .catch(this.errorHandler);
    }


  }
  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error....");

  }

  post(url: string, urlParamObject: any, queryparam: any, formBody: any, bypassInterceptor: boolean = false): Observable<any> {
    debugger;
    if (queryparam.updates != null) {
      this.queryParam = { params: queryparam };
    }
    else {
      this.queryParam = {};
    }

    if (bypassInterceptor) {
      this.httpClient = new HttpClient(this.handler);
      return this.httpClient.post(this.rootURL + url, formBody, this.queryParam)
        .catch(this.errorHandler);
    }
    else {
      return this.http.post(this.rootURL + url, formBody, this.queryParam)
        .catch(this.errorHandler);
    }


  }

}
