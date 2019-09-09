import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private queryParam = {};
  public AccessToken: string;
  private rootURL = environment.apiUrl;
  private httpClient: HttpClient;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient, private handler: HttpBackend) {
    this.AccessToken = '';
  }

  get(url: string, urlParamObject: any, queryparam: any, bypassInterceptor: boolean = false): Observable<any> {
    if (queryparam.updates != null) {
      this.queryParam = { params: queryparam };
    } else {
      this.queryParam = {};
    }

    if (bypassInterceptor) {
      this.httpClient = new HttpClient(this.handler);
      return this.httpClient.get(url, this.queryParam)
        .catch(this.errorHandler);
    } else {
      return this.http.get(url, this.queryParam)
        .catch(this.errorHandler);
    }


  }
  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error....');

  }

  post(url: string, formBody: any, bypassInterceptor: boolean = false): Observable<any> {
    if (bypassInterceptor) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('access-control-allow-origin', '*');
      this.httpClient = new HttpClient(this.handler);
      return this.httpClient.post(url, formBody, { headers: headers })
        .pipe(
          catchError(this.errorHandler));
    } else {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('access-control-allow-origin', '*');
      return this.http.post<any>(url, formBody, { headers: headers })
        .catch(this.errorHandler);
    }
  }

  // post1(url: string, formBody: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers.set('content-type', 'application/json');
  //   //headers.append('access-control-allow-origin', '*');
  //   this.httpClient = new HttpClient(this.handler);
  //   return this.httpClient.post(url, formBody, { headers })
  //     .catch(this.errorHandler);


  // }

  put(url: string, formBody: any, bypassInterceptor: boolean = false): Observable<any> {
    if (bypassInterceptor) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('access-control-allow-origin', '*');
      this.httpClient = new HttpClient(this.handler);
      return this.httpClient.put(url, formBody, { headers: headers })
        .pipe(
          catchError(this.errorHandler));
    } else {
      return this.http.put<any>(url, formBody, this.queryParam)
        .catch(this.errorHandler);
    }
  }

}
