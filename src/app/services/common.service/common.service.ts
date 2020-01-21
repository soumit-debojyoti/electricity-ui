import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { ApiUrlService } from '../api.url.service';
import { ConfigurationModel } from '../../models/configuration.model';
import {
  RechargeAPI, NewsFeed, IntroducerBonus, BankDetails,
  RechargeTransaction, Complaint, BankTransaction, CommissionSetting, PageAccessInfo
} from 'src/app/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  AccessToken: string;
  private rootURL = environment.apiUrl + 'auth';
  private username: string;
  private corsByPass = 'https://cors-anywhere.herokuapp.com/';
  private complaintStatus: [
    { 'value': 'Acknowledged', 'key': 1 },
    { 'value': 'Assigned', 'key': 2 },
    { 'value': 'Work In Progress', 'key': 3 },
    { 'value': 'Resolved', 'key': 4 },
  ];
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private http: HttpClient, private baseService: BaseService,
    private apiUrlService: ApiUrlService) { }

  getAddressProof(): Observable<any> {
    // var url: string = `common/addressproofs`;
    const urlStringObject = {
    };
    const params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('ADDRESSPROOF_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }

  getIdProof(): Observable<any> {
    // var url: string = `common/idproofs`;
    const params = new HttpParams();
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('IDPROOF_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }

  getState(): Observable<any> {
    // var url: string = `common/states`;
    const params = new HttpParams();
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('STATES_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params, true);
  }

  upload(fileType: string, formdata: FormData) {
    const urlStringObject = {
      fileType: fileType
    };
    // var url: string = `common/upload/${fileType}`;
    // let params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('FILE_UPLOAD', urlStringObject);
    return this.baseService.post(mainURL, formdata, true);
  }

  uploadPhoto(fileType: string, fileName: string, formdata: FormData) {
    const urlStringObject = {
      fileType: fileType,
      fileName: fileName
    };
    const mainURL = this.apiUrlService.getFullURL('PHOTO_UPLOAD', urlStringObject);
    return this.baseService.post(mainURL, formdata, true);
  }

  reUploadPhoto(userName: string, fileType: string, fileName: string, oldImageName: string, oldImageExtension: string, formdata: FormData) {
    const urlStringObject = {
      userName: userName,
      fileType: fileType,
      fileName: fileName,
      oldfileName: oldImageName,
      oldfileExtension: oldImageExtension
    };
    const mainURL = this.apiUrlService.getFullURL('PHOTO_REUPLOAD', urlStringObject);
    return this.baseService.post(mainURL, formdata, true);
  }

  public clearAllSession() {
    this.storage.remove('login_user');
    this.storage.remove('role');
    this.storage.remove('user_id');
    this.storage.remove('access_token');
    this.storage.remove('introducer_code');
    this.storage.remove('introducer_name');
    this.storage.remove('role_id');
    this.storage.remove('security_token');
    this.storage.remove('is_login');
  }

  public getPagePermission(pageOrWidgetName: string): Observable<any> {
    const role_id = this.storage.get('role_id');
    const urlStringObject = {
      roleId: role_id
    };
    // var url: string = `common/upload/${fileType}`;
    const params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('PAGE_PERMISSION', urlStringObject);
    return this.baseService.get(mainURL, {}, params);
  }

  public addWallet(user_security_stamp: string): Observable<any> {
    const urlStringObject = {
      user_security_stamp: user_security_stamp
    };
    const mainURL = this.apiUrlService.getFullURL('ADD_WALLET', urlStringObject);
    return this.baseService.post(mainURL, {}, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public addWalletTransaction(amount: number, userId: number, message: string, transactionMode: string): Observable<any> {
    const formDataregister: FormData = new FormData();
    formDataregister.append('amount', amount.toString());
    formDataregister.append('userId', userId.toString());
    formDataregister.append('message', message.toString());
    formDataregister.append('transactionMode', transactionMode.toString());
    const urlStringObject = {

    };
    const mainURL = this.apiUrlService.getFullURL('ADD_WALLET_TRANSACTION', urlStringObject);
    return this.baseService.post(mainURL, formDataregister, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public addWalletWithdrawalRequest(userId: number, comment: string): Observable<any> {
    const urlStringObject = {
      requestInitiatorId: userId,
      comment: comment
    };
    const mainURL = this.apiUrlService.getFullURL('ADD_WALLET_WITHDRAWAL_REQUEST', urlStringObject);
    return this.baseService.post(mainURL, {}, false)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public adminWalletApproval(withdrawalWalleta: any): Observable<any> {
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('ADMIN_WALLET_APPROVAL', urlStringObject);
    return this.baseService.post(mainURL, withdrawalWalleta, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public adminWalletAddDeductApproval(withdrawalWallet: any): Observable<any> {
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('ADMIN_ADD_DEDUCT_WALLET_APPROVAL', urlStringObject);
    return this.baseService.post(mainURL, withdrawalWallet, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }


  public adminWalletWithdrawalApprovalNotification(userId: number): Observable<any> {
    const urlStringObject = {
      userId: userId
    };
    const mainURL = this.apiUrlService.getFullURL('ADMIN_WALLET_WITHDRAWAL_APPROVAL_NOTIFICATION', urlStringObject);
    const params = new HttpParams();
    return this.baseService.get(mainURL, {}, params)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public adminWalletAddDeductApprovalNotification(userId: number): Observable<any> {
    const urlStringObject = {
      userId: userId
    };
    const mainURL = this.apiUrlService.getFullURL('ADMIN_WALLET_ADD_DEDUCT_APPROVAL_NOTIFICATION', urlStringObject);
    const params = new HttpParams();
    return this.baseService.get(mainURL, {}, params)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getWithdrawalRequestFinder(userId: number): Observable<any> {
    const urlStringObject = {
      userId: userId
    };
    const mainURL = this.apiUrlService.getFullURL('WITHDRAWAL_REQUEST_FINDER', urlStringObject);
    const params = new HttpParams();
    return this.baseService.get(mainURL, {}, params)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public getConfiguration(): Observable<any> {
    const urlStringObject = {
    };
    const params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('GET_CONFIGURATION', urlStringObject);
    return this.baseService.get(mainURL, {}, params);
  }

  public setConfiguration(configuration: ConfigurationModel): Observable<any> {
    const urlStringObject = {
    };
    const mainURL = this.apiUrlService.getFullURL('SET_CONFIGURATION', urlStringObject);
    return this.baseService.post(mainURL, configuration, true)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public saveRechargeAPI(rechargeOption: string, operatorname: string, apiValue: string): Observable<any> {
    const rechargeApiObject = new RechargeAPI();
    rechargeApiObject.apiValue = apiValue;
    rechargeApiObject.rechargeMode = rechargeOption;
    rechargeApiObject.operatorName = operatorname;
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_API');
    return this.baseService.post(mainURL, rechargeApiObject, true);
  }

  public getRechargeAPIInfo(rechargeMode: string): Observable<Array<RechargeAPI>> {
    const urlStringObject = {
      rechargeMode: rechargeMode
    };
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_API_FETCH', urlStringObject);
    return this.baseService.get(mainURL, {}, true);
  }

  public insertTransaction(rechargeMode: string, userId: number,
    rechargeAmount: string, serviceNumber: string): Observable<number> {
    const urlStringObject = {
      userID: userId,
      rechargeMode: rechargeMode,
      rechargeAmount: rechargeAmount,
      serviceNumber: serviceNumber
    };
    const mainURL = this.apiUrlService.getFullURL('INSERT_TRANSACTION', urlStringObject);
    return this.baseService.post(mainURL, {}, true);
  }

  public recharge(rechargeURL: string): Observable<any> {
    return this.http.post(this.corsByPass + rechargeURL, {});
  }

  public rechargeService(rechargeType: string, rechargeObject: any): Observable<any> {
    const urlStringObject = {
      rechargetype: rechargeType
    };
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_SERVICE', urlStringObject);
    return this.baseService.post(mainURL, rechargeObject, true);
  }

  public updateTransaction(orderID: string, transactionStatus: string, errorMessage: string) {
    const urlStringObject = {
      orderID: orderID,
      transactionStatus: transactionStatus,
      errorMessage: errorMessage
    };
    const mainURL = this.apiUrlService.getFullURL('UPDATE_TRANSACTION', urlStringObject);
    return this.baseService.post(mainURL, {}, true);
  }
  public deductBalanceTransaction(userID: string, amount: string, message: string) {
    const urlStringObject = {
      userID: userID,
      amount: amount,
      message: message
    };
    const mainURL = this.apiUrlService.getFullURL('DEDUCT_WALLET_BALANCE_TRANSACTION', urlStringObject);
    return this.baseService.post(mainURL, {}, true);
  }

  public saveRechargeAPIValidation(rechargeOption: string, operatorName: string, apiValue: string): Observable<any> {
    const rechargeApiObject = new RechargeAPI();
    rechargeApiObject.apiValue = apiValue;
    rechargeApiObject.rechargeMode = rechargeOption;
    rechargeApiObject.operatorName = operatorName;
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_API_VALIDATION');
    return this.baseService.post(mainURL, rechargeApiObject, true);
  }

  public fetchValidationAPIDetails(rechargeMode: string, operatorName: string): Observable<any> {
    const urlStringObject = {
      rechargeMode: rechargeMode,
      operatorName: operatorName
    };
    const mainURL = this.apiUrlService.getFullURL('FETCH_RECHARGE_API_VALIDATION', urlStringObject);
    return this.baseService.get(mainURL, {}, true);
  }

  public fetchAllTransaction(requestorID: number, startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams();
    const urlStringObject = {
      requestorID: requestorID,
      startDate: startDate,
      endDate: endDate
    };
    const mainURL = this.apiUrlService.getFullURL('FETCH_ALL_TRANSACTION', urlStringObject);
    return this.baseService.get(mainURL, {}, params);
  }

  public postNews(newsFeed: NewsFeed): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('NEWS_FEED');
    return this.baseService.post(mainURL, newsFeed, true);
  }

  public fetchNews(): Observable<Array<NewsFeed>> {
    const mainURL = this.apiUrlService.getFullURL('NEWS_FEED');
    return this.baseService.get(mainURL, {}, true);
  }

  public updateNews(newsFeed: NewsFeed): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('NEWS_FEED_UPDATE');
    return this.baseService.post(mainURL, newsFeed, true);
  }
  public fetchLevelInfo(): Observable<Array<IntroducerBonus>> {
    const mainURL = this.apiUrlService.getFullURL('LEVEL_BONUS_INFO');
    return this.baseService.get(mainURL, {}, true);
  }

  public updateLevelInfo(levelBonusInfo: IntroducerBonus): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('LEVEL_BONUS_INFO_UPDATE');
    return this.baseService.post(mainURL, levelBonusInfo, true);
  }

  public updateRechargeAPIValidation(rechargeOption: string, operatorName: string, apiValue: string): Observable<any> {
    const rechargeApiObject = new RechargeAPI();
    rechargeApiObject.apiValue = apiValue;
    rechargeApiObject.rechargeMode = rechargeOption;
    rechargeApiObject.operatorName = operatorName;
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_API_VALIDATION_UPDATE');
    return this.baseService.post(mainURL, rechargeApiObject, true);
  }

  public updateRechargeAPI(rechargeOption: string, operatorname: string, apiValue: string): Observable<any> {
    const rechargeApiObject = new RechargeAPI();
    rechargeApiObject.apiValue = apiValue;
    rechargeApiObject.rechargeMode = rechargeOption;
    rechargeApiObject.operatorName = operatorname;
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_API_UPDATE');
    return this.baseService.post(mainURL, rechargeApiObject, true);
  }

  public addBankDetails(bankDetails: BankDetails): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('ADMIN_BANK_INFO');
    return this.baseService.post(mainURL, bankDetails, true);
  }

  public fetchBankDetails(): Observable<Array<BankDetails>> {
    const mainURL = this.apiUrlService.getFullURL('ADMIN_BANK_INFO');
    return this.baseService.get(mainURL, {}, true);
  }

  public fetchRechargeTransactionHistory(stratDate: string, endDate: string): Observable<RechargeTransaction> {
    const urlStringObject = {
      endDate: endDate,
      startDate: stratDate
    };
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_TRANSACTION', urlStringObject);
    return this.baseService.get(mainURL, {}, true);
  }

  public fetchUserRechargeTransactionHistory(userID: number, stratDate: string, endDate: string): Observable<RechargeTransaction> {
    const urlStringObject = {
      userID: userID,
      endDate: endDate,
      startDate: stratDate
    };
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_TRANSACTION_USER', urlStringObject);
    return this.baseService.get(mainURL, {}, true);
  }

  public addComplaint(complaint: Complaint): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_COMPALINT');
    return this.baseService.post(mainURL, complaint, true);
  }

  public fetchUserComplaints(userID: number): Observable<Array<Complaint>> {
    const urlStringObject = {
      userid: userID
    };
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_COMPALINT_USER', urlStringObject);
    return this.baseService.get(mainURL, {}, true);
  }

  public fetchAdminComplaints(): Observable<Array<Complaint>> {
    const mainURL = this.apiUrlService.getFullURL('RECHARGE_COMPALINT_ADMIN');
    return this.baseService.get(mainURL, {}, true);
  }

  public getComplaintStatus(): Array<any> {
    return this.complaintStatus;
  }

  public updateUserComplaint(complaint: Complaint): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('COMPLAINT_UPDATE');
    return this.baseService.post(mainURL, complaint, true);
  }

  public fetchRecentTransactionID(): Observable<number> {
    const mainURL = this.apiUrlService.getFullURL('RECENT_TRANSACTION');
    return this.baseService.get(mainURL, {}, true);
  }
  public addBankTransaction(ba: BankTransaction): Observable<boolean> {
    const mainURL = this.apiUrlService.getFullURL('BANK_TRANSACTION');
    return this.baseService.post(mainURL, ba, true);
  }

  public validateUtilityService(rechargeType: string, operatorName: string,
    consumer_number: string, customer_mobile: string): Observable<any> {
    const urlStringObject = {
      rechargetype: rechargeType,
      operatorName: operatorName,
      consumer_number: consumer_number,
      customer_mobile: customer_mobile
    };
    const mainURL = this.apiUrlService.getFullURL('VALIDATE_UTILITY_SERVICE', urlStringObject);
    return this.baseService.post(mainURL, {}, true);
  }

  public validateMobileNumberInputString(data: string): boolean {
    if (!isNaN(+data)) {
      return true;
    } else {
      return false;
    }
  }

  public payoutCommission(userID: number,
    rechargeOption: string, operatorname: string, transactionAmount: number): Observable<boolean> {
      const urlStringObject = {
        userID: userID,
        rechargeType: rechargeOption,
        operatorName: operatorname,
        transactionAmount: transactionAmount
      };
      const mainURL = this.apiUrlService.getFullURL('PAYOUT_COMMISSION', urlStringObject);
      return this.baseService.post(mainURL, {}, true);
    }

  public addCommissionSetting(cs: CommissionSetting): Observable<boolean> {
      const mainURL = this.apiUrlService.getFullURL('COMMISSION_SETTING', {});
      return this.baseService.post(mainURL, cs, true);
  }
  public fetchCommissionSetting(): Observable<Array<CommissionSetting>> {
    const mainURL = this.apiUrlService.getFullURL('COMMISSION_SETTING', {});
    return this.baseService.get(mainURL, {}, true);
}
public fetchPageAccess(): Observable<Array<PageAccessInfo>> {
  const mainURL = this.apiUrlService.getFullURL('PAGE_ACCESS');
  const params = new HttpParams();
  return this.baseService.get(mainURL, {}, params)
    .pipe(map((response: Array<PageAccessInfo>) => {
      return response;
    }));
}
public removeCommissionSetting(cs: CommissionSetting): Observable<boolean> {
  const mainURL = this.apiUrlService.getFullURL('REMOVE_COMMISSION_SETTING', {});
  return this.baseService.post(mainURL, cs, true);
}

}
