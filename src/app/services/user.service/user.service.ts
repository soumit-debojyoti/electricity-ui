import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { ApiUrlService } from '../api.url.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

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

  public addKYC(userId: number, formdata: FormData): Observable<any> {
    const urlStringObject = {
      userId: userId
    };
    const mainURL = this.apiUrlService.getFullURL('ADD_KYC', urlStringObject);
    return this.baseService.post(mainURL, formdata, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getKYC(userId: number): Observable<any> {
    const urlStringObject = {
      userId: userId
    };
    const params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('GET_KYC', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public walletDeductRequest(userId: number, comment: string, amountDeduct: number): Observable<any> {
    const urlStringObject = {
      requestInitiatorId: userId,
      amount: amountDeduct,
      comment: comment,

    };
    const mainURL = this.apiUrlService.getFullURL('DEDUCT_BALANCE_REQUEST', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public walletTransferRequest(senderId: number, receiverId: number, amount: number, comment: string): Observable<any> {
    const urlStringObject = {
      senderId: senderId,
      receiverId: receiverId,
      amount: amount,
      comment: comment
    };
    const mainURL = this.apiUrlService.getFullURL('WALLET_BALANCE_TRANSFER', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getWalletBalance(userId: number): Observable<any> {
    const urlStringObject = {
      userId: userId
    };
    const params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('WALLET_BALANCE', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public requestBalance(userId: number, amount: number, comment: string): Observable<any> {
    const urlStringObject = {
      requestInitiatorId: userId,
      amount: amount,
      comment: comment
    };
    const mainURL = this.apiUrlService.getFullURL('ADD_BALANCE_REQUEST', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getWalletBalanceReport(userId: number, startDate: string, endDate: string): Observable<any> {

    const urlStringObject = {
      userId: userId,
      startDate: startDate,
      endDate: endDate
    };
    const params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('WALLET_BALANCE_REPORT', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getRankAchieverList(user_id: number): Observable<any> {
    const params = new HttpParams();
    const urlStringObject = {
      userId: user_id
    };
    const mainURL = this.apiUrlService.getFullURL('RANK_ACHIEVER_LIST', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response;
      }));
  }

  public getUnusedTokenGenericInformation(): Observable<any> {
    const params = new HttpParams();
    const urlStringObject = {};
    const mainURL = this.apiUrlService.getFullURL('GET_UNUSED_TOKEN_GENERIC', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response;
      }));
  }

  public getUnusedTokenSpecificInformation(token: string): Observable<any> {
    const params = new HttpParams();
    const urlStringObject = {
      token: token
    };
    const mainURL = this.apiUrlService.getFullURL('GET_UNUSED_TOKEN_SPECIFIC', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response;
      }));
  }

  public reactivateToken(token: string): Observable<any> {
    const urlStringObject = {
      token: token
    };
    const mainURL = this.apiUrlService.getFullURL('REACTIVATE_TOKEN', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public deactivateToken(token: string): Observable<any> {
    const urlStringObject = {
      token: token
    };
    const mainURL = this.apiUrlService.getFullURL('DEACTIVATE_TOKEN', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }


  public surrenderToken(token: string): Observable<any> {
    const urlStringObject = {
      token: token
    };
    const mainURL = this.apiUrlService.getFullURL('SURRENDER_TOKEN', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getRankAchieverCount(user_id: number): Observable<any> {
    const params = new HttpParams();
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
    const params = new HttpParams();
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

  public getAllUsers(): Observable<any> {
    // var url: string = `user/users/${user_name}`;
    const params = new HttpParams();
    const urlStringObject = {};
    const mainURL = this.apiUrlService.getFullURL('GET_USERS', urlStringObject);
    return this.baseService.get(mainURL, {}, params);
  }

  public getSearchUsers(name: string): Observable<any> {
    if (name === '') {
      name = 'all';
    }

    // var url: string = `user/users/${user_name}`;
    const params = new HttpParams();
    const urlStringObject = {
      name: name
    };
    const mainURL = this.apiUrlService.getFullURL('SEARCH_USERS', urlStringObject);
    return this.baseService.get(mainURL, {}, params).pipe(
      debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
      map(
        (data: any) => {
          return (
            data.length !== 0 ? data as any[] : [{ 'user_name': 'No Record Found', 'user_id': 0 } as any]
          );
        }
      ));
  }



}
